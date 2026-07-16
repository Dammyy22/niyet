"use strict";

const AUTH_USERS = {
  "damla@niyet.local": {
    username: "damla",
    name: "Damla",
    initial: "D"
  },

  "hilal@niyet.local": {
    username: "hilal",
    name: "Hilal",
    initial: "H"
  }
};

window.niyetAuthReady = initializeAuth();

async function initializeAuth() {
  if (!window.niyetSupabase) {
    console.error("Supabase bağlantısı bulunamadı.");
    redirectToLogin();
    return null;
  }

  try {
    const {
      data: { session },
      error
    } = await window.niyetSupabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!session?.user?.email) {
      redirectToLogin();
      return null;
    }

    const email = session.user.email.toLowerCase();
    const appUser = AUTH_USERS[email];

    if (!appUser) {
      await window.niyetSupabase.auth.signOut();
      redirectToLogin();
      return null;
    }

    localStorage.setItem(
      "niyet_active_user",
      appUser.username
    );

    window.niyetAuthenticatedUser = {
      id: session.user.id,
      email,
      username: appUser.username,
      name: appUser.name,
      initial: appUser.initial
    };

    document.documentElement.dataset.authReady = "true";

    return window.niyetAuthenticatedUser;
  } catch (error) {
    console.error("Oturum kontrolü başarısız:", error);
    redirectToLogin();
    return null;
  }
}

function redirectToLogin() {
  const currentPath = window.location.pathname;

  if (!currentPath.endsWith("/login.html")) {
    window.location.replace("./login.html");
  }
}

async function logoutFromNiyet() {
  const logoutButton =
    document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.disabled = true;
    logoutButton.textContent = "Çıkış yapılıyor...";
  }

  try {
    await window.niyetSupabase.auth.signOut();
  } catch (error) {
    console.error("Çıkış hatası:", error);
  } finally {
    localStorage.removeItem("niyet_active_user");
    window.location.replace("./login.html");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton =
    document.getElementById("logoutButton");

  logoutButton?.addEventListener(
    "click",
    logoutFromNiyet
  );
});
