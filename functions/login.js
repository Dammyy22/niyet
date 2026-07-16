"use strict";

/* =========================================================
   NİYET - DEMO GİRİŞ SİSTEMİ
========================================================= */

const LOGIN_STORAGE_KEYS = {
  activeUser: "niyet_active_user",
  session: "niyet_session"
};

/*
  Bu bilgiler yalnızca geçici demo içindir.

  Cloudflare D1 bağlantısı kurulduğunda kullanıcı adı ve şifre
  kontrolü sunucu tarafında yapılacak. Gerçek projede şifreler
  JavaScript dosyasının içinde tutulmamalıdır.
*/
const DEMO_USERS = {
  damla: {
    id: "damla",
    name: "Damla",
    username: "damla",
    password: "niyetdamla"
  },

  hilal: {
    id: "hilal",
    name: "Hilal",
    username: "hilal",
    password: "niyethilal"
  }
};

let selectedUser = "damla";
let toastTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  initializeLoginPage();
});

function initializeLoginPage() {
  applySavedTheme();
  bindUserSelection();
  bindPasswordToggle();
  bindLoginForm();
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

      if (!DEMO_USERS[userId]) {
        return;
      }

      selectedUser = userId;

      updateSelectedUserInterface();
      fillSelectedUsername();
      clearLoginErrors();
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

  usernameInput.value = DEMO_USERS[selectedUser].username;
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
    const isPasswordVisible =
      passwordInput.type === "text";

    passwordInput.type = isPasswordVisible
      ? "password"
      : "text";

    passwordToggle.textContent = isPasswordVisible
      ? "👁"
      : "🙈";

    passwordToggle.setAttribute(
      "aria-label",
      isPasswordVisible
        ? "Şifreyi göster"
        : "Şifreyi gizle"
    );

    passwordToggle.title = isPasswordVisible
      ? "Şifreyi göster"
      : "Şifreyi gizle";
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

  loginForm.addEventListener("submit", event => {
    event.preventDefault();

    clearLoginErrors();

    const usernameInput =
      document.getElementById("username");

    const passwordInput =
      document.getElementById("password");

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

    authenticateUser(username, password);
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

  if (!password) {
    setFieldError(
      "password",
      "passwordError",
      "Şifreni yazmalısın."
    );

    isValid = false;
  }

  return isValid;
}

function authenticateUser(username, password) {
  const selectedAccount = DEMO_USERS[selectedUser];

  if (!selectedAccount) {
    showLoginMessage(
      "Seçilen kullanıcı bulunamadı.",
      "error"
    );

    return;
  }

  const usernameMatches =
    username === selectedAccount.username;

  const passwordMatches =
    password === selectedAccount.password;

  if (!usernameMatches || !passwordMatches) {
    showLoginMessage(
      "Kullanıcı adı veya şifre hatalı.",
      "error"
    );

    shakeLoginCard();

    return;
  }

  createDemoSession(selectedAccount);

  showLoginMessage(
    `Hoş geldin ${selectedAccount.name}. Yönlendiriliyorsun...`,
    "success"
  );

  showToast(
    `${selectedAccount.name} hesabına giriş yapıldı. 🌙`
  );

  window.setTimeout(() => {
    window.location.href = "../index.html";
  }, 700);
}

/* =========================================================
   DEMO OTURUM
========================================================= */

function createDemoSession(user) {
  const session = {
    userId: user.id,
    name: user.name,
    loggedIn: true,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem(
    LOGIN_STORAGE_KEYS.activeUser,
    user.id
  );

  localStorage.setItem(
    LOGIN_STORAGE_KEYS.session,
    JSON.stringify(session)
  );
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
  const errorElement =
    document.getElementById(errorElementId);

  input?.classList.add("invalid");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearLoginErrors() {
  const invalidInputs =
    document.querySelectorAll(".input-wrapper input");

  invalidInputs.forEach(input => {
    input.classList.remove("invalid");
  });

  const fieldErrors =
    document.querySelectorAll(".field-error");

  fieldErrors.forEach(errorElement => {
    errorElement.textContent = "";
  });

  const loginMessage =
    document.getElementById("loginMessage");

  if (loginMessage) {
    loginMessage.textContent = "";
    loginMessage.classList.add("hidden");
    loginMessage.classList.remove(
      "error",
      "success"
    );
  }
}

function showLoginMessage(message, type) {
  const loginMessage =
    document.getElementById("loginMessage");

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
  const loginCard =
    document.querySelector(".login-card");

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
  const toastMessage =
    document.getElementById("toastMessage");

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
