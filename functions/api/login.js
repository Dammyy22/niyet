```javascript
"use strict";

/* =========================================================
   NİYET - GERÇEK GİRİŞ API'Sİ
   Dosya: functions/api/login.js

   Endpoint:
   POST /api/login

   Gerekli D1 binding adı:
   DB
========================================================= */

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;
const MAX_USERNAME_LENGTH = 50;
const MAX_PASSWORD_LENGTH = 200;

/* =========================================================
   CLOUDFLARE PAGES FUNCTION
========================================================= */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.DB) {
      return jsonResponse(
        {
          success: false,
          message: "Veritabanı bağlantısı yapılandırılmamış."
        },
        500
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonResponse(
        {
          success: false,
          message: "İstek JSON formatında gönderilmelidir."
        },
        415
      );
    }

    const body = await readJsonBody(request);

    if (!body) {
      return jsonResponse(
        {
          success: false,
          message: "Gönderilen bilgiler okunamadı."
        },
        400
      );
    }

    const username = normalizeUsername(body.username);
    const password =
      typeof body.password === "string" ? body.password : "";

    const validationError = validateCredentials(
      username,
      password
    );

    if (validationError) {
      return jsonResponse(
        {
          success: false,
          message: validationError
        },
        400
      );
    }

    /*
      bind() kullanmamız kullanıcı girdisinin doğrudan SQL
      sorgusuna eklenmesini önler.
    */
    const user = await env.DB
      .prepare(`
        SELECT
          id,
          name,
          username,
          password_hash,
          is_active
        FROM users
        WHERE username = ?
        LIMIT 1
      `)
      .bind(username)
      .first();

    /*
      Kullanıcının bulunup bulunmadığını ayrı ayrı açıklamıyoruz.
      Böylece sistemde hangi kullanıcı adlarının kayıtlı olduğu
      dışarıdan kolayca öğrenilemez.
    */
    if (!user || user.is_active !== 1) {
      await performDummyPasswordVerification(password);

      return invalidCredentialsResponse();
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return invalidCredentialsResponse();
    }

    const sessionToken = createSecureToken();
    const sessionTokenHash = await sha256Hex(sessionToken);

    const now = new Date();

    const expiresAt = new Date(
      now.getTime() + SESSION_DURATION_SECONDS * 1000
    ).toISOString();

    /*
      Süresi geçmiş oturumları fırsat buldukça temizliyoruz.
      Bu sorgunun başarısız olması giriş işlemini durdurmaz.
    */
    try {
      await env.DB
        .prepare(`
          DELETE FROM sessions
          WHERE expires_at <= ?
        `)
        .bind(now.toISOString())
        .run();
    } catch (cleanupError) {
      console.warn(
        "Eski oturumlar temizlenemedi:",
        cleanupError
      );
    }

    await env.DB
      .prepare(`
        INSERT INTO sessions (
          user_id,
          token_hash,
          expires_at,
          created_at,
          last_used_at
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .bind(
        user.id,
        sessionTokenHash,
        expiresAt,
        now.toISOString(),
        now.toISOString()
      )
      .run();

    const sessionCookie = createSessionCookie(sessionToken);

    return jsonResponse(
      {
        success: true,
        message: `Hoş geldin ${user.name}.`,
        user: {
          id: user.id,
          name: user.name,
          username: user.username
        }
      },
      200,
      {
        "Set-Cookie": sessionCookie
      }
    );
  } catch (error) {
    console.error("Giriş işlemi başarısız:", error);

    return jsonResponse(
      {
        success: false,
        message:
          "Giriş sırasında beklenmeyen bir sorun oluştu."
      },
      500
    );
  }
}

/* =========================================================
   DESTEKLENMEYEN HTTP METOTLARI
========================================================= */

export function onRequestGet() {
  return methodNotAllowedResponse();
}

export function onRequestPut() {
  return methodNotAllowedResponse();
}

export function onRequestPatch() {
  return methodNotAllowedResponse();
}

export function onRequestDelete() {
  return methodNotAllowedResponse();
}

function methodNotAllowedResponse() {
  return jsonResponse(
    {
      success: false,
      message: "Bu endpoint yalnızca POST isteği kabul eder."
    },
    405,
    {
      Allow: "POST"
    }
  );
}

/* =========================================================
   İSTEK OKUMA VE DOĞRULAMA
========================================================= */

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function normalizeUsername(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .toLocaleLowerCase("tr-TR");
}

function validateCredentials(username, password) {
  if (!username || !password) {
    return "Kullanıcı adı ve şifre zorunludur.";
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return "Kullanıcı adı izin verilen uzunluğu aşıyor.";
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return "Şifre izin verilen uzunluğu aşıyor.";
  }

  /*
    Projede yalnızca Damla ve Hilal bulunacak olsa da burada
    sabit isim kontrolü yapmıyoruz. Yetkili kullanıcıları
    veritabanındaki users tablosu belirliyor.
  */

  return null;
}

/* =========================================================
   ŞİFRE DOĞRULAMA
========================================================= */

/*
  Beklenen password_hash biçimi:

  pbkdf2$310000$BASE64_SALT$BASE64_HASH

  Örnek:

  pbkdf2$310000$abc123...$xyz456...
*/
async function verifyPassword(password, storedPasswordHash) {
  if (
    typeof password !== "string" ||
    typeof storedPasswordHash !== "string"
  ) {
    return false;
  }

  const parts = storedPasswordHash.split("$");

  if (parts.length !== 4) {
    return false;
  }

  const [
    algorithm,
    iterationsText,
    saltBase64,
    expectedHashBase64
  ] = parts;

  if (algorithm !== "pbkdf2") {
    return false;
  }

  const iterations = Number(iterationsText);

  if (
    !Number.isInteger(iterations) ||
    iterations < 100000 ||
    iterations > 1000000
  ) {
    return false;
  }

  try {
    const salt = base64ToUint8Array(saltBase64);
    const expectedHash = base64ToUint8Array(
      expectedHashBase64
    );

    if (salt.length < 16 || expectedHash.length !== 32) {
      return false;
    }

    const passwordKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      {
        name: "PBKDF2"
      },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt,
        iterations
      },
      passwordKey,
      256
    );

    const actualHash = new Uint8Array(derivedBits);

    return timingSafeEqual(actualHash, expectedHash);
  } catch (error) {
    console.error("Şifre doğrulanamadı:", error);
    return false;
  }
}

/*
  Kullanıcı bulunmadığında da benzer bir kriptografik işlem
  gerçekleştiriyoruz. Bu, yanıt süresinden kullanıcı adının
  varlığının tahmin edilmesini bir miktar zorlaştırır.
*/
async function performDummyPasswordVerification(password) {
  try {
    const dummySalt = new TextEncoder().encode(
      "niyet-dummy-salt-2026"
    );

    const passwordKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password || "invalid"),
      {
        name: "PBKDF2"
      },
      false,
      ["deriveBits"]
    );

    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: dummySalt,
        iterations: 100000
      },
      passwordKey,
      256
    );
  } catch {
    /*
      Dummy işlem başarısız olsa bile kullanıcıya teknik ayrıntı
      döndürülmez.
    */
  }
}

function timingSafeEqual(first, second) {
  if (
    !(first instanceof Uint8Array) ||
    !(second instanceof Uint8Array) ||
    first.length !== second.length
  ) {
    return false;
  }

  let difference = 0;

  for (let index = 0; index < first.length; index += 1) {
    difference |= first[index] ^ second[index];
  }

  return difference === 0;
}

/* =========================================================
   OTURUM OLUŞTURMA
========================================================= */

function createSecureToken() {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);

  return uint8ArrayToBase64Url(randomBytes);
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );

  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createSessionCookie(sessionToken) {
  return [
    `niyet_session=${encodeURIComponent(sessionToken)}`,
    "Path=/",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict"
  ].join("; ");
}

/* =========================================================
   BASE64 YARDIMCILARI
========================================================= */

function base64ToUint8Array(base64Value) {
  const normalizedValue = base64Value
    .replaceAll("-", "+")
    .replaceAll("_", "/");

  const paddedValue = normalizedValue.padEnd(
    Math.ceil(normalizedValue.length / 4) * 4,
    "="
  );

  const binaryString = atob(paddedValue);

  return Uint8Array.from(
    binaryString,
    character => character.charCodeAt(0)
  );
}

function uint8ArrayToBase64Url(bytes) {
  let binaryString = "";

  for (const byte of bytes) {
    binaryString += String.fromCharCode(byte);
  }

  return btoa(binaryString)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

/* =========================================================
   HTTP YANITLARI
========================================================= */

function invalidCredentialsResponse() {
  return jsonResponse(
    {
      success: false,
      message: "Kullanıcı adı veya şifre hatalı."
    },
    401
  );
}

function jsonResponse(
  data,
  status = 200,
  additionalHeaders = {}
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...additionalHeaders
    }
  });
}
```
