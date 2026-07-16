"use strict";

/* =========================================================
   NİYET - GİRİŞ SAYFASI
   Dosya: functions/login.js

   Arayüz:
   https://dammyy22.github.io/niyet/login.html

   API:
   https://niyet.pages.dev/api/login
========================================================= */

const LOGIN_API_URL = "https://niyet.pages.dev/api/login";

const LOGIN_STORAGE_KEYS = {
  activeUser: "niyet_active_user",
  session: "niyet_session"
};

const ALLOWED_USERS = {
  damla: {
    id: "damla",
    name: "Damla"
  },

  hilal: {
    id: "hilal",
    name: "Hilal"
  }
};

let selectedUser = "damla";
let toastTimer = null;

/* =========================================================
   SAYFA BAŞLANGICI
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeLoginPage();
});

function initializeLoginPage() {
  applySavedTheme();
  bindUserSelection();
  bindPasswordToggle();
  bindLoginForm();
  bindInputEvents();
  updateSelectedUserInterface();
  fillSelectedUsername();
}

/* =========================================================
   KULLANICI SEÇİMİ
========================================================= */

function bindUserSelection() {
  const userOptions = document.querySelectorAll(
    "[data-login-user]"
  );

  userOptions.forEach(option => {
    option.addEventListener("click", () => {
      const userId = option.dataset.loginUser;

      if (!ALLOWED_USERS[userId]) {
        return;
      }

      selectedUser = userId;

      updateSelectedUserInterface();
      fillSelectedUsername();
      clearLoginErrors();

      const passwordInput = document.getElementById("password");

      if (passwordInput) {
        passwordInput.value = "";
        passwordInput.focus();
      }
    });
  });
}

function updateSelectedUserInterface() {
  const userOptions = document.querySelectorAll(
    "[data-login-user]"
  );

  const selectedLoginUserInput = document.getElementById(
    "selectedLoginUser"
  );

  userOptions.forEach(option => {
    const isSelected =
      option.dataset.loginUser === selectedUser;

    option.classList.toggle("active", isSelected);

    option.setAttribute(
      "aria-pressed",
      isSelected ? "true" : "false"
    );
  });

  if (selectedLoginUserInput) {
    selectedLoginUserInput.value = selectedUser;
  }
}

function fillSelectedUsername() {
  const usernameInput = document.getElementById("username");

  if (!usernameInput) {
    return;
  }

  usernameInput.value = selectedUser;
}

/* =========================================================
   ŞİFREYİ GÖSTER / GİZLE
========================================================= */

function bindPasswordToggle() {
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.getElementById(
    "passwordToggle"
  );

  if (!passwordInput || !passwordToggle) {
    return;
  }

  passwordToggle.addEventListener("click", () => {
    const passwordIsVisible =
      passwordInput.type === "text";

    passwordInput.type = passwordIsVisible
      ? "password"
      : "text";

    passwordToggle.textContent = passwordIsVisible
      ? "👁"
      : "🙈";

    passwordToggle.setAttribute(
      "aria-label",
      passwordIsVisible
        ? "Şifreyi göster"
        : "Şifreyi gizle"
    );

    passwordToggle.title = passwordIsVisible
      ? "Şifreyi göster"
      : "Şifreyi gizle";
  });
}

/* =========================================================
   INPUT DAVRANIŞLARI
========================================================= */

function bindInputEvents() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  usernameInput?.addEventListener("input", () => {
    clearFieldError("username", "usernameError");
    hideLoginMessage();
  });

  passwordInput?.addEventListener("input", () => {
    clearFieldError("password", "passwordError");
    hideLoginMessage();
  });
}

/* =========================================================
   GİRİŞ FORMU
========================================================= */

function bindLoginForm() {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    clearLoginErrors();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) {
      showLoginMessage(
        "Giriş formu yüklenirken bir sorun oluştu.",
        "error"
      );

      return;
    }

    const username = usernameInput.value
      .trim()
      .toLocaleLowerCase("tr-TR");

    const password = passwordInput.value;

    const formIsValid = validateLoginForm(
      username,
      password
    );

    if (!formIsValid) {
      return;
    }

    /*
      Kullanıcı seçim kartı ile kullanıcı adı alanının
      uyuşmasını sağlıyoruz.
    */
    if (username !== selectedUser) {
      showLoginMessage(
        `Seçili hesap ${ALLOWED_USERS[selectedUser].name}. Kullanıcı adı “${selectedUser}” olmalı.`,
        "error"
      );

      setFieldError(
        "username",
        "usernameError",
        "Kullanıcı adı seçili hesapla uyuşmuyor."
      );

      return;
    }

    await authenticateUser(username, password);
  });
}

function validateLoginForm(username, password) {
  let isValid = true;

  if (!username) {
    setFieldError(
      "username",
      "usernameError",
      "Kullanıcı adını yazmalısın."
    );

    isValid = false;
  }

  if (!ALLOWED_USERS[username]) {
    setFieldError(
      "username",
      "usernameError",
      "Yalnızca Damla veya Hilal hesabıyla giriş yapılabilir."
    );

    isValid = false;
  }

  if (!password) {
    setFieldError(
      "password",
      "passwordError",
      "Şifreni yazmalısın."
    );

    isValid = false;
  }

  if (password.length > 200) {
    setFieldError(
      "password",
      "passwordError",
      "Şifre izin verilen uzunluğu aşıyor."
    );

    isValid = false;
  }

  return isValid;
}

/* =========================================================
   GERÇEK API GİRİŞİ
========================================================= */

async function authenticateUser(username, password) {
  const submitButton = document.querySelector(
    ".login-submit-button"
  );

  setSubmitButtonLoading(submitButton, true);

  showLoginMessage(
    "Bilgilerin kontrol ediliyor...",
    "success"
  );

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username,
        password
      })
    });

    const result = await readJsonResponse(response);

    if (!response.ok || !result?.success) {
      const errorMessage =
        result?.message ||
        "Kullanıcı adı veya şifre hatalı.";

      showLoginMessage(errorMessage, "error");
      shakeLoginCard();

      return;
    }

    if (
      !result.user ||
      !result.user.username ||
      !result.token ||
      !result.expiresAt
    ) {
      showLoginMessage(
        "Sunucudan eksik oturum bilgisi geldi.",
        "error"
      );

      return;
    }

    saveSession(result);

    showLoginMessage(
      `Hoş geldin ${result.user.name}.`,
      "success"
    );

    showToast(
      `${result.user.name} hesabına giriş yapıldı. 🌙`
    );

    window.setTimeout(() => {
      window.location.href = "/niyet/index.html";
    }, 700);
  } catch (error) {
    console.error("Giriş isteği başarısız:", error);

    showLoginMessage(
      "Giriş sunucusuna ulaşılamadı. Cloudflare bağlantısı veya internet erişimi engellenmiş olabilir.",
      "error"
    );

    shakeLoginCard();
  } finally {
    setSubmitButtonLoading(submitButton, false);
  }
}

async function readJsonResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

/* =========================================================
   OTURUM KAYDI
========================================================= */

function saveSession(result) {
  const normalizedUsername = result.user.username
    .trim()
    .toLocaleLowerCase("tr-TR");

  const session = {
    token: result.token,
    expiresAt: result.expiresAt,

    user: {
      id: result.user.id,
      name: result.user.name,
      username: normalizedUsername
    },

    loggedIn: true,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(
    LOGIN_STORAGE_KEYS.activeUser,
    normalizedUsername
  );

  localStorage.setItem(
    LOGIN_STORAGE_KEYS.session,
    JSON.stringify(session)
  );
}

/* =========================================================
   GÖNDER BUTONU
========================================================= */

function setSubmitButtonLoading(button, isLoading) {
  if (!button) {
    return;
  }

  button.disabled = isLoading;

  button.innerHTML = isLoading
    ? `
      <span aria-hidden="true">⏳</span>
      Giriş yapılıyor...
    `
    : `
      <span aria-hidden="true">🌙</span>
      Giriş Yap
    `;
}

/* =========================================================
   HATA VE MESAJ YÖNETİMİ
========================================================= */

function setFieldError(
  inputId,
  errorElementId,
  message
) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(
    errorElementId
  );

  input?.classList.add("invalid");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearFieldError(inputId, errorElementId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(
    errorElementId
  );

  input?.classList.remove("invalid");

  if (errorElement) {
    errorElement.textContent = "";
  }
}

function clearLoginErrors() {
  clearFieldError("username", "usernameError");
  clearFieldError("password", "passwordError");
  hideLoginMessage();
}

function hideLoginMessage() {
  const loginMessage = document.getElementById(
    "loginMessage"
  );

  if (!loginMessage) {
    return;
  }

  loginMessage.textContent = "";
  loginMessage.classList.add("hidden");
  loginMessage.classList.remove("error", "success");
}

function showLoginMessage(message, type) {
  const loginMessage = document.getElementById(
    "loginMessage"
  );

  if (!loginMessage) {
    return;
  }

  loginMessage.textContent = message;

  loginMessage.classList.remove(
    "hidden",
    "error",
    "success"
  );

  loginMessage.classList.add(type);
}

function shakeLoginCard() {
  const loginCard = document.querySelector(".login-card");

  if (!loginCard) {
    return;
  }

  loginCard.classList.remove("login-shake");

  window.requestAnimationFrame(() => {
    loginCard.classList.add("login-shake");
  });

  window.setTimeout(() => {
    loginCard.classList.remove("login-shake");
  }, 450);
}

/* =========================================================
   TEMA
========================================================= */

function applySavedTheme() {
  const savedTheme =
    localStorage.getItem("niyet_theme") || "dark";

  document.body.classList.toggle(
    "light-theme",
    savedTheme === "light"
  );
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById(
    "toastMessage"
  );

  if (!toast || !toastMessage) {
    return;
  }

  toastMessage.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
