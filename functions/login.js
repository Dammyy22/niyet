"use strict";

const USERS = {
  damla: {
    username: "damla",
    name: "Damla",
    email: "damla@niyet.local"
  },

  hilal: {
    username: "hilal",
    name: "Hilal",
    email: "hilal@niyet.local"
  }
};

let selectedUser = "damla";
let toastTimer = null;

document.addEventListener("DOMContentLoaded", async () => {
  initializeLoginPage();
  await redirectAuthenticatedUser();
});

function initializeLoginPage() {
  bindUserSelection();
  bindPasswordToggle();
  bindLoginForm();
  updateSelectedUserInterface();
  fillSelectedUsername();
}

async function redirectAuthenticatedUser() {
  if (!window.niyetSupabase) {
    return;
  }

  const {
    data: { session }
  } = await window.niyetSupabase.auth.getSession();

  if (session) {
    window.location.replace("./index.html");
  }
}

function bindUserSelection() {
  const userButtons = document.querySelectorAll(
    "[data-login-user]"
  );

  userButtons.forEach(button => {
    button.addEventListener("click", () => {
      const userId = button.dataset.loginUser;

      if (!USERS[userId]) {
        return;
      }

      selectedUser = userId;

      updateSelectedUserInterface();
      fillSelectedUsername();
      clearMessages();

      const passwordInput =
        document.getElementById("password");

      if (passwordInput) {
        passwordInput.value = "";
        passwordInput.focus();
      }
    });
  });
}

function updateSelectedUserInterface() {
  const userButtons = document.querySelectorAll(
    "[data-login-user]"
  );

  userButtons.forEach(button => {
    const isSelected =
      button.dataset.loginUser === selectedUser;

    button.classList.toggle("active", isSelected);

    button.setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  });

  const selectedUserInput =
    document.getElementById("selectedLoginUser");

  if (selectedUserInput) {
    selectedUserInput.value = selectedUser;
  }
}

function fillSelectedUsername() {
  const usernameInput =
    document.getElementById("username");

  if (usernameInput) {
    usernameInput.value = selectedUser;
  }
}

function bindPasswordToggle() {
  const passwordInput =
    document.getElementById("password");

  const passwordToggle =
    document.getElementById("passwordToggle");

  if (!passwordInput || !passwordToggle) {
    return;
  }

  passwordToggle.addEventListener("click", () => {
    const isVisible =
      passwordInput.type === "text";

    passwordInput.type = isVisible
      ? "password"
      : "text";

    passwordToggle.textContent = isVisible
      ? "👁"
      : "🙈";

    passwordToggle.setAttribute(
      "aria-label",
      isVisible
        ? "Şifreyi göster"
        : "Şifreyi gizle"
    );
  });
}

function bindLoginForm() {
  const loginForm =
    document.getElementById("loginForm");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessages();

    const usernameInput =
      document.getElementById("username");

    const passwordInput =
      document.getElementById("password");

    const username = usernameInput?.value
      .trim()
      .toLocaleLowerCase("tr-TR");

    const password = passwordInput?.value || "";

    if (!USERS[username]) {
      showMessage(
        "Damla veya Hilal hesabını seçmelisin.",
        "error"
      );

      return;
    }

    if (username !== selectedUser) {
      showMessage(
        `Seçili hesap ${USERS[selectedUser].name}.`,
        "error"
      );

      return;
    }

    if (!password) {
      showMessage(
        "Şifreni yazmalısın.",
        "error"
      );

      passwordInput?.focus();
      return;
    }

    await loginWithSupabase(username, password);
  });
}

async function loginWithSupabase(username, password) {
  if (!window.niyetSupabase) {
    showMessage(
      "Supabase bağlantısı yüklenemedi.",
      "error"
    );

    return;
  }

  const submitButton = document.querySelector(
    ".login-submit-button"
  );

  setLoading(submitButton, true);

  showMessage(
    "Giriş bilgilerin kontrol ediliyor...",
    "success"
  );

  try {
    const user = USERS[username];

    const { data, error } =
      await window.niyetSupabase.auth.signInWithPassword({
        email: user.email,
        password
      });

    if (error) {
      console.error("Supabase giriş hatası:", error);

      showMessage(
        getReadableLoginError(error),
        "error"
      );

      shakeLoginCard();
      return;
    }

    if (!data.session || !data.user) {
      showMessage(
        "Oturum oluşturulamadı.",
        "error"
      );

      return;
    }

    localStorage.setItem(
      "niyet_active_user",
      username
    );

    showMessage(
      `Hoş geldin ${user.name}.`,
      "success"
    );

    showToast(
      `${user.name} hesabına giriş yapıldı. 🌙`
    );

    window.setTimeout(() => {
      window.location.replace("./index.html");
    }, 600);
  } catch (error) {
    console.error("Giriş bağlantı hatası:", error);

    showMessage(
      "Supabase sunucusuna ulaşılamadı. İnternet bağlantını kontrol et.",
      "error"
    );
  } finally {
    setLoading(submitButton, false);
  }
}

function getReadableLoginError(error) {
  const message =
    String(error?.message || "").toLowerCase();

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials")
  ) {
    return "Şifre hatalı.";
  }

  if (message.includes("email not confirmed")) {
    return "Bu kullanıcı hesabı henüz onaylanmamış.";
  }

  if (message.includes("rate limit")) {
    return "Çok fazla giriş denemesi yapıldı. Biraz sonra tekrar dene.";
  }

  return "Giriş yapılamadı. Bilgilerini kontrol et.";
}

function setLoading(button, isLoading) {
  if (!button) {
    return;
  }

  button.disabled = isLoading;

  button.innerHTML = isLoading
    ? "<span>⏳</span> Giriş yapılıyor..."
    : "<span>🌙</span> Giriş Yap";
}

function showMessage(message, type) {
  const messageElement =
    document.getElementById("loginMessage");

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;

  messageElement.classList.remove(
    "hidden",
    "error",
    "success"
  );

  messageElement.classList.add(type);
}

function clearMessages() {
  const messageElement =
    document.getElementById("loginMessage");

  if (!messageElement) {
    return;
  }

  messageElement.textContent = "";

  messageElement.classList.add("hidden");

  messageElement.classList.remove(
    "error",
    "success"
  );
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

function showToast(message) {
  const toast =
    document.getElementById("toast");

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
  }, 2500);
}
