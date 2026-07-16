"use strict";

/* =========================================================
   NİYET - ANA JAVASCRIPT DOSYASI
========================================================= */

const STORAGE_KEYS = {
  activeUser: "niyet_active_user",
  dailyRecords: "niyet_daily_records",
  mutualPrayers: "niyet_mutual_prayers",
  sharedPrayers: "niyet_shared_prayers",
  dailyNotes: "niyet_daily_notes",
  theme: "niyet_theme",
  dailyContentActions: "niyet_daily_content_actions"
};

const USERS = {
  damla: {
    id: "damla",
    name: "Damla",
    initial: "D"
  },
  hilal: {
    id: "hilal",
    name: "Hilal",
    initial: "H"
  }
};

const CHECK_FIELDS = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
  "asma",
  "quran",
  "tafsir",
  "dua",
  "tafakkur"
];

const FIELD_LABELS = {
  fajr: "Sabah",
  dhuhr: "Öğle",
  asr: "İkindi",
  maghrib: "Akşam",
  isha: "Yatsı",
  asma: "Esma",
  quran: "Kur'an",
  tafsir: "Tefsir",
  dua: "Dua",
  tafakkur: "Tefekkür"
};

const DAILY_CONTENT = [
  {
    esma: {
      name: "Er-Rahmân",
      arabic: "الرَّحْمَنُ",
      meaning: "Dünyada bütün kullarına merhamet eden.",
      count: "100 defa"
    },
    verse: {
      source: "Ra'd Suresi, 28",
      arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
      reading: "Elâ bi zikrillâhi tatmainnul kulûb.",
      translation:
        "Bilesiniz ki kalpler ancak Allah'ı anmakla huzur bulur.",
      tafsir:
        "İnsan kalbi yalnızca maddi imkânlarla tam anlamıyla huzura kavuşmaz. Allah'ı hatırlamak, O'na güvenmek ve O'nun yakınlığını hissetmek kalbe sükûnet kazandırır."
    },
    prayer:
      "Allah'ım, kalbimize huzur, niyetlerimize samimiyet ve adımlarımıza istikrar nasip et.",
    challenge:
      "Bugün bir kişiye içtenlikle güzel bir söz söyle."
  },
  {
    esma: {
      name: "El-Vedûd",
      arabic: "الْوَدُودُ",
      meaning: "Kullarını seven ve sevilmeye en layık olan.",
      count: "100 defa"
    },
    verse: {
      source: "İnşirah Suresi, 5",
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      reading: "Fe inne me'al usri yusrâ.",
      translation:
        "Şüphesiz güçlükle beraber bir kolaylık vardır.",
      tafsir:
        "Zorluklar tek başına değildir. Her sıkıntının içinde veya ardından Allah'ın takdir ettiği bir kolaylık bulunur. Mümin, umudunu kaybetmeden yoluna devam eder."
    },
    prayer:
      "Allah'ım, zorluklarımızı kolaylaştır, gönlümüzdeki ağırlıkları hafiflet ve bizi ümitsizliğe düşürme.",
    challenge:
      "Bugün uzun zamandır aramadığın bir yakınını ara."
  },
  {
    esma: {
      name: "El-Gafûr",
      arabic: "الْغَفُورُ",
      meaning: "Kullarının hata ve günahlarını çokça bağışlayan.",
      count: "100 defa"
    },
    verse: {
      source: "Zümer Suresi, 53",
      arabic: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ",
      reading: "Lâ taknatû min rahmetillâh.",
      translation:
        "Allah'ın rahmetinden ümit kesmeyin.",
      tafsir:
        "İnsan hata yapabilir; fakat dönüş kapısı açıktır. Samimi pişmanlık, tövbe ve yeniden yöneliş Allah'ın rahmetine ulaşmanın yollarındandır."
    },
    prayer:
      "Allah'ım, bilerek veya bilmeyerek yaptığımız hataları bağışla ve bizi güzel bir dönüşle Sana yönelt.",
    challenge:
      "Bugün kırdığını düşündüğün birinden gönülden özür dile."
  },
  {
    esma: {
      name: "Es-Sabûr",
      arabic: "الصَّبُورُ",
      meaning: "Cezayı erteleyen ve kullarına mühlet veren.",
      count: "100 defa"
    },
    verse: {
      source: "Bakara Suresi, 153",
      arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      reading: "İnnallâhe me'as sâbirîn.",
      translation:
        "Şüphesiz Allah sabredenlerle beraberdir.",
      tafsir:
        "Sabır yalnızca beklemek değil; doğru olanı koruyarak, ümit ve teslimiyetle devam edebilmektir."
    },
    prayer:
      "Allah'ım, bize güzel sabır, doğru karar ve gönül genişliği nasip et.",
    challenge:
      "Bugün seni zorlayan bir konuda acele karar vermeden önce durup düşün."
  },
  {
    esma: {
      name: "El-Hafîz",
      arabic: "الْحَفِيظُ",
      meaning: "Her şeyi koruyan ve gözeten.",
      count: "99 defa"
    },
    verse: {
      source: "Tevbe Suresi, 51",
      arabic: "قُلْ لَنْ يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا",
      reading:
        "Kul len yusîbenâ illâ mâ keteballâhu lenâ.",
      translation:
        "De ki: Allah'ın bizim için yazdığından başkası bize asla erişmez.",
      tafsir:
        "Tevekkül, tedbiri bırakmak değil; gerekeni yaptıktan sonra sonucu Allah'a emanet etmektir."
    },
    prayer:
      "Allah'ım, bizi ve sevdiklerimizi görünen ve görünmeyen kötülüklerden muhafaza et.",
    challenge:
      "Bugün bir yakının için haberi olmadan dua et."
  },
  {
    esma: {
      name: "El-Latîf",
      arabic: "اللَّطِيفُ",
      meaning: "Lütfu kullarına gizli ve ince yollarla ulaşan.",
      count: "129 defa"
    },
    verse: {
      source: "Şûrâ Suresi, 19",
      arabic: "اللَّهُ لَطِيفٌ بِعِبَادِهِ",
      reading: "Allâhu latîfun bi ibâdih.",
      translation:
        "Allah kullarına karşı çok lütufkârdır.",
      tafsir:
        "İnsan bazen Allah'ın lütfunu hemen göremeyebilir. Fakat hayatın içindeki küçük kolaylıklar, korunmalar ve güzel karşılaşmalar da ilahi lütfun işaretleridir."
    },
    prayer:
      "Allah'ım, bize lütfunu fark eden bir kalp ve nimetlerine şükreden bir dil nasip et.",
    challenge:
      "Bugün sahip olduğun üç nimeti yaz ve bunlar için şükret."
  },
  {
    esma: {
      name: "El-Fettâh",
      arabic: "الْفَتَّاحُ",
      meaning: "Hayır kapılarını açan ve hükmeden.",
      count: "71 defa"
    },
    verse: {
      source: "Talâk Suresi, 2-3",
      arabic:
        "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا",
      reading:
        "Ve men yettekıllâhe yec'al lehû mahrecâ.",
      translation:
        "Kim Allah'a karşı gelmekten sakınırsa Allah ona bir çıkış yolu açar.",
      tafsir:
        "Takva, insanın davranışlarında Allah'ın rızasını gözetmesidir. Samimi ve doğru bir yöneliş, beklenmedik kolaylıkların kapısını açabilir."
    },
    prayer:
      "Allah'ım, önümüzdeki hayırlı kapıları aç, bize doğru yolu göster ve işlerimizi kolaylaştır.",
    challenge:
      "Bugün ertelediğin küçük ama hayırlı bir işi tamamla."
  }
];

let activeUser = getStoredActiveUser();
let calendarDate = new Date();
let toastTimer = null;

let dailyRecordsCache = {};
let profileIds = {};
/* =========================================================
   SAYFA BAŞLANGICI
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const authenticatedUser =
    await window.niyetAuthReady;

  if (!authenticatedUser) {
    return;
  }

  activeUser = authenticatedUser.username;

  initializeApplication();
});

function initializeApplication() {
  applySavedTheme();
  renderCurrentDate();
  renderCurrentYear();
  renderDailyContent();
  setActiveUser(activeUser);
  loadDailyRecords();
  loadDailyContentActions();
  loadMutualPrayers();
  loadSharedPrayers();
  loadDailyNote();
  updateAllProgress();
  calculateMonthlyStatistics();
  calculateSharedStreak();
  updateGarden();
  updateBadges();
  renderCalendar();
  bindEvents();
}

/* =========================================================
   EVENTLER
========================================================= */

function bindEvents() {
  bindProfileMenuEvents();
  bindThemeEvents();
  bindCheckboxEvents();
  bindDailyContentEvents();
  bindMutualPrayerEvents();
  bindSharedPrayerEvents();
  bindDailyNoteEvents();
  bindCalendarEvents();
  bindModalEvents();
}

function bindProfileMenuEvents() {
  const profileButton = document.getElementById("profileButton");
  const profileMenu = document.getElementById("profileMenu");

  profileButton?.addEventListener("click", event => {
    event.stopPropagation();
    profileMenu?.classList.toggle("hidden");
  });

  document.addEventListener("click", event => {
    if (
      profileMenu &&
      profileButton &&
      !profileMenu.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      profileMenu.classList.add("hidden");
    }
  });
}

function bindThemeEvents() {
  const themeToggleButton = document.getElementById("themeToggleButton");

  themeToggleButton?.addEventListener("click", toggleTheme);
}

function bindCheckboxEvents() {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][data-user][data-check]'
  );

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const userId = checkbox.dataset.user;
      const checkName = checkbox.dataset.check;

      if (userId !== activeUser) {
        checkbox.checked = !checkbox.checked;
        showToast("Yalnızca kendi kayıtlarını değiştirebilirsin.");
        return;
      }

      updateDailyCheck(userId, checkName, checkbox.checked);
      updateUserProgress(userId);
      calculateMonthlyStatistics();
      calculateSharedStreak();
      updateGarden();
      updateBadges();
      renderCalendar();

      const message = checkbox.checked
        ? `${FIELD_LABELS[checkName]} kaydedildi. 🌿`
        : `${FIELD_LABELS[checkName]} işareti kaldırıldı.`;

      showToast(message);
    });
  });
}

function bindDailyContentEvents() {
  const markEsmaButton = document.getElementById(
    "markEsmaCompleteButton"
  );

  const markChallengeButton = document.getElementById(
    "markChallengeCompleteButton"
  );

  const dailyPrayerAmenButton = document.getElementById(
    "dailyPrayerAmenButton"
  );

  markEsmaButton?.addEventListener("click", () => {
    toggleDailyContentAction(
      "esma",
      markEsmaButton,
      "Esma kaydedildi."
    );

    synchronizeCheckboxWithContent("asma");
  });

  markChallengeButton?.addEventListener("click", () => {
    toggleDailyContentAction(
      "challenge",
      markChallengeButton,
      "Bugünün güzel adımı kaydedildi."
    );
  });

  dailyPrayerAmenButton?.addEventListener("click", () => {
    toggleDailyContentAction(
      "dailyPrayerAmen",
      dailyPrayerAmenButton,
      "Âmin. 🤍"
    );
  });
}

function bindMutualPrayerEvents() {
  const mutualPrayerButtons = document.querySelectorAll(
    "[data-prayer-from][data-prayer-to]"
  );

  mutualPrayerButtons.forEach(button => {
    button.addEventListener("click", () => {
      const fromUser = button.dataset.prayerFrom;
      const toUser = button.dataset.prayerTo;

      if (fromUser !== activeUser) {
        showToast("Bu dua butonu diğer kullanıcıya ait.");
        return;
      }

      saveMutualPrayer(fromUser, toUser);
    });
  });
}

function bindSharedPrayerEvents() {
  const sharedPrayerForm =
    document.getElementById("sharedPrayerForm");

  const sharedPrayerInput =
    document.getElementById("sharedPrayerInput");

  const prayerCharacterCount =
    document.getElementById("prayerCharacterCount");

  sharedPrayerInput?.addEventListener("input", () => {
    if (prayerCharacterCount) {
      prayerCharacterCount.textContent =
        sharedPrayerInput.value.length.toString();
    }
  });

  sharedPrayerForm?.addEventListener("submit", event => {
    event.preventDefault();

    const prayerText =
      sharedPrayerInput?.value.trim();

    if (!prayerText) {
      showToast(
        "Önce paylaşmak istediğin duayı yaz."
      );

      sharedPrayerInput?.focus();
      return;
    }

    saveSharedPrayer(prayerText);

    sharedPrayerInput.value = "";

    if (prayerCharacterCount) {
      prayerCharacterCount.textContent = "0";
    }
  });
}

function bindDailyNoteEvents() {
  const saveDailyNoteButton =
    document.getElementById("saveDailyNoteButton");

  saveDailyNoteButton?.addEventListener(
    "click",
    saveDailyNote
  );
}

function bindCalendarEvents() {
  const previousMonthButton =
    document.getElementById("previousMonthButton");

  const nextMonthButton =
    document.getElementById("nextMonthButton");

  const openCalendarButton =
    document.getElementById("openCalendarButton");

  previousMonthButton?.addEventListener("click", () => {
    calendarDate.setMonth(
      calendarDate.getMonth() - 1
    );

    renderCalendar();
  });

  nextMonthButton?.addEventListener("click", () => {
    calendarDate.setMonth(
      calendarDate.getMonth() + 1
    );

    renderCalendar();
  });

  openCalendarButton?.addEventListener("click", () => {
    document
      .getElementById("calendarSection")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  });
}

function bindModalEvents() {
  const dayDetailModal =
    document.getElementById("dayDetailModal");

  const closeDayDetailButton =
    document.getElementById("closeDayDetailButton");

  closeDayDetailButton?.addEventListener(
    "click",
    closeDayDetailModal
  );

  dayDetailModal?.addEventListener("click", event => {
    if (event.target === dayDetailModal) {
      closeDayDetailModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "Escape" &&
      dayDetailModal &&
      !dayDetailModal.classList.contains("hidden")
    ) {
      closeDayDetailModal();
    }
  });
}

/* =========================================================
   TARİH
========================================================= */

function renderCurrentDate() {
  const currentDateElement =
    document.getElementById("currentDate");

  const currentHijriDateElement =
    document.getElementById("currentHijriDate");

  const today = new Date();

  if (currentDateElement) {
    currentDateElement.textContent =
      new Intl.DateTimeFormat("tr-TR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(today);
  }

  if (currentHijriDateElement) {
    try {
      const hijriDate =
        new Intl.DateTimeFormat(
          "tr-TR-u-ca-islamic",
          {
            day: "numeric",
            month: "long",
            year: "numeric"
          }
        ).format(today);

      currentHijriDateElement.textContent =
        hijriDate;
    } catch (error) {
      currentHijriDateElement.textContent =
        "Hicri tarih görüntülenemedi";
    }
  }
}

function renderCurrentYear() {
  const currentYearElement =
    document.getElementById("currentYear");

  if (currentYearElement) {
    currentYearElement.textContent =
      new Date().getFullYear().toString();
  }
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function formatDateKey(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] =
    dateKey.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatReadableDate(dateKey) {
  return new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parseDateKey(dateKey));
}
/* =========================================================
   GÜNLÜK İÇERİK
========================================================= */

function renderDailyContent() {
  const today = new Date();
  const dayNumber = getDayNumberOfYear(today);

  const content =
    DAILY_CONTENT[
      dayNumber % DAILY_CONTENT.length
    ];

  setText("dailyEsmaName", content.esma.name);
  setText("dailyEsmaArabic", content.esma.arabic);
  setText(
    "dailyEsmaMeaning",
    content.esma.meaning
  );
  setText(
    "dailyEsmaCount",
    content.esma.count
  );

  setText(
    "dailyVerseSource",
    content.verse.source
  );

  setText(
    "dailyVerseArabic",
    content.verse.arabic
  );

  setText(
    "dailyVerseReading",
    content.verse.reading
  );

  setText(
    "dailyVerseTranslation",
    `“${content.verse.translation}”`
  );

  setText(
    "dailyVerseTafsir",
    content.verse.tafsir
  );

  setText(
    "dailyPrayerText",
    content.prayer
  );

  setText(
    "dailyChallengeText",
    content.challenge
  );
}

function getDayNumberOfYear(date) {
  const startOfYear =
    new Date(date.getFullYear(), 0, 0);

  const difference =
    date - startOfYear;

  const oneDay =
    1000 * 60 * 60 * 24;

  return Math.floor(
    difference / oneDay
  );
}

function getDailyContentActions() {
  return getStorageObject(
    STORAGE_KEYS.dailyContentActions,
    {}
  );
}

function loadDailyContentActions() {
  const actions =
    getDailyContentActions();

  const todayActions =
    actions[getTodayKey()]?.[activeUser] || {};

  updateContentActionButton(
    "markEsmaCompleteButton",
    Boolean(todayActions.esma),
    "Okudum",
    "Okundu"
  );

  updateContentActionButton(
    "markChallengeCompleteButton",
    Boolean(todayActions.challenge),
    "Yaptım",
    "Tamamlandı"
  );

  updateContentActionButton(
    "dailyPrayerAmenButton",
    Boolean(todayActions.dailyPrayerAmen),
    "Âmin",
    "Âmin dedin"
  );
}

function toggleDailyContentAction(
  actionName,
  button,
  message
) {
  const allActions =
    getDailyContentActions();

  const todayKey =
    getTodayKey();

  if (!allActions[todayKey]) {
    allActions[todayKey] = {};
  }

  if (!allActions[todayKey][activeUser]) {
    allActions[todayKey][activeUser] = {};
  }

  const currentValue = Boolean(
    allActions[todayKey][activeUser][actionName]
  );

  allActions[todayKey][activeUser][actionName] =
    !currentValue;

  setStorageObject(
    STORAGE_KEYS.dailyContentActions,
    allActions
  );

  loadDailyContentActions();

  showToast(
    currentValue
      ? "İşaret kaldırıldı."
      : message
  );
}

function updateContentActionButton(
  buttonId,
  completed,
  defaultText,
  completedText
) {
  const button =
    document.getElementById(buttonId);

  if (!button) {
    return;
  }

  button.classList.toggle(
    "completed",
    completed
  );

  const icon =
    buttonId === "dailyPrayerAmenButton"
      ? "🤍"
      : "✓";

  button.innerHTML = `
    <span aria-hidden="true">${icon}</span>
    ${completed ? completedText : defaultText}
  `;
}

function synchronizeCheckboxWithContent(
  checkName
) {
  const actions =
    getDailyContentActions();

  const todayActions =
    actions[getTodayKey()]?.[activeUser] || {};

  const checkbox =
    document.querySelector(
      `input[data-user="${activeUser}"][data-check="${checkName}"]`
    );

  if (!checkbox) {
    return;
  }

  const newValue =
    Boolean(todayActions.esma);

  checkbox.checked = newValue;

  updateDailyCheck(
    activeUser,
    checkName,
    newValue
  );

  updateAllProgress();
  calculateMonthlyStatistics();
  calculateSharedStreak();
  updateGarden();
  updateBadges();
  renderCalendar();
}

/* =========================================================
   AKTİF KULLANICI
========================================================= */

function getStoredActiveUser() {
  const storedUser =
    localStorage.getItem(
      STORAGE_KEYS.activeUser
    );

  return USERS[storedUser]
    ? storedUser
    : "damla";
}

function setActiveUser(userId) {
  const authenticatedUsername =
    window.niyetAuthenticatedUser?.username;

  if (
    !authenticatedUsername ||
    userId !== authenticatedUsername ||
    !USERS[authenticatedUsername]
  ) {
    return;
  }

  activeUser =
    authenticatedUsername;

  localStorage.setItem(
    STORAGE_KEYS.activeUser,
    activeUser
  );

  updateHeaderUser();
  updateProfileMenu();
  updateUserCards();
  updateEditableAreas();
  loadDailyContentActions();
  loadDailyNote();
  loadMutualPrayers();
}

function updateHeaderUser() {
  const user =
    USERS[activeUser];

  if (!user) {
    return;
  }

  setText(
    "headerProfileName",
    user.name
  );

  setText(
    "headerProfileAvatar",
    user.initial
  );

  setText(
    "menuProfileName",
    user.name
  );

  setText(
    "menuProfileAvatar",
    user.initial
  );
}

function updateProfileMenu() {
  const profileItems =
    document.querySelectorAll(
      "[data-user-switch]"
    );

  profileItems.forEach(item => {
    const userId =
      item.dataset.userSwitch;

    const isActive =
      userId === activeUser;

    item.classList.toggle(
      "active",
      isActive
    );

    item.hidden = !isActive;
  });
}

function updateUserCards() {
  Object.keys(USERS).forEach(userId => {
    const card =
      document.querySelector(
        `[data-user-card="${userId}"]`
      );

    const badge =
      document.querySelector(
        `[data-active-badge="${userId}"]`
      );

    const isActive =
      userId === activeUser;

    card?.classList.toggle(
      "active-user-card",
      isActive
    );

    card?.classList.toggle(
      "locked-user-card",
      !isActive
    );

    badge?.classList.toggle(
      "hidden",
      !isActive
    );
  });
}

function updateEditableAreas() {
  const checkboxes =
    document.querySelectorAll(
      'input[type="checkbox"][data-user]'
    );

  checkboxes.forEach(checkbox => {
    checkbox.disabled =
      checkbox.dataset.user !== activeUser;
  });

  const prayerButtons =
    document.querySelectorAll(
      "[data-prayer-from]"
    );

  prayerButtons.forEach(button => {
    const fromUser =
      button.dataset.prayerFrom;

    const prayerAlreadyCompleted =
      getMutualPrayerStatus(fromUser);

    button.disabled =
      fromUser !== activeUser ||
      prayerAlreadyCompleted;
  });
}

/* =========================================================
   GÜNLÜK KAYITLAR
========================================================= */

function getDailyRecords() {
  return getStorageObject(
    STORAGE_KEYS.dailyRecords,
    {}
  );
}

function createEmptyDailyRecord() {
  return CHECK_FIELDS.reduce(
    (record, field) => {
      record[field] = false;
      return record;
    },
    {}
  );
}

function loadDailyRecords() {
  const records =
    getDailyRecords();

  const todayKey =
    getTodayKey();

  Object.keys(USERS).forEach(userId => {
    const userRecord =
      records[todayKey]?.[userId] ||
      createEmptyDailyRecord();

    CHECK_FIELDS.forEach(field => {
      const checkbox =
        document.querySelector(
          `input[data-user="${userId}"][data-check="${field}"]`
        );

      if (checkbox) {
        checkbox.checked =
          Boolean(userRecord[field]);
      }
    });
  });
}

function updateDailyCheck(
  userId,
  checkName,
  checked
) {
  const records =
    getDailyRecords();

  const todayKey =
    getTodayKey();

  if (!records[todayKey]) {
    records[todayKey] = {};
  }

  if (!records[todayKey][userId]) {
    records[todayKey][userId] =
      createEmptyDailyRecord();
  }

  records[todayKey][userId][checkName] =
    Boolean(checked);

  setStorageObject(
    STORAGE_KEYS.dailyRecords,
    records
  );
}

function updateAllProgress() {
  Object.keys(USERS).forEach(
    updateUserProgress
  );
}

function updateUserProgress(userId) {
  const records =
    getDailyRecords();

  const todayRecord =
    records[getTodayKey()]?.[userId] ||
    createEmptyDailyRecord();

  const completedCount =
    CHECK_FIELDS.filter(
      field => todayRecord[field]
    ).length;

  const percentage =
    Math.round(
      (completedCount /
        CHECK_FIELDS.length) *
        100
    );

  setText(
    `${userId}ProgressText`,
    `${completedCount} / ${CHECK_FIELDS.length}`
  );

  const progressFill =
    document.getElementById(
      `${userId}ProgressFill`
    );

  if (progressFill) {
    progressFill.style.width =
      `${percentage}%`;

    const progressBar =
      progressFill.parentElement;

    progressBar?.setAttribute(
      "aria-valuenow",
      percentage.toString()
    );
  }
}

/* =========================================================
   BİRBİRİNE DUA ET
========================================================= */

function getMutualPrayers() {
  return getStorageObject(
    STORAGE_KEYS.mutualPrayers,
    {}
  );
}

function getMutualPrayerStatus(userId) {
  const prayers =
    getMutualPrayers();

  return Boolean(
    prayers[getTodayKey()]?.[userId]
  );
}

function saveMutualPrayer(
  fromUser,
  toUser
) {
  const prayers =
    getMutualPrayers();

  const todayKey =
    getTodayKey();

  if (!prayers[todayKey]) {
    prayers[todayKey] = {};
  }

  prayers[todayKey][fromUser] = {
    from: fromUser,
    to: toUser,
    createdAt: new Date().toISOString()
  };

  setStorageObject(
    STORAGE_KEYS.mutualPrayers,
    prayers
  );

  loadMutualPrayers();
  calculateMonthlyStatistics();
  updateBadges();

  showToast(
    `${USERS[toUser].name} için ettiğin dua kaydedildi. 🤍`
  );
}

function loadMutualPrayers() {
  const damlaCompleted =
    getMutualPrayerStatus("damla");

  const hilalCompleted =
    getMutualPrayerStatus("hilal");

  updateMutualPrayerButton(
    "damla",
    damlaCompleted
  );

  updateMutualPrayerButton(
    "hilal",
    hilalCompleted
  );

  const result =
    document.getElementById(
      "mutualPrayerResult"
    );

  if (!result) {
    return;
  }

  if (
    damlaCompleted &&
    hilalCompleted
  ) {
    result.innerHTML = `
      <span class="result-icon" aria-hidden="true">🤍</span>

      <div>
        <strong>Bugün birbiriniz için dua ettiniz.</strong>
        <p>
          Allah dualarınızı kabul, kalplerinizi birbirine yakın eylesin.
        </p>
      </div>
    `;

    result.classList.add("completed");
  } else if (
    damlaCompleted ||
    hilalCompleted
  ) {
    const completedUser =
      damlaCompleted
        ? "Damla"
        : "Hilal";

    result.innerHTML = `
      <span class="result-icon" aria-hidden="true">🌙</span>

      <div>
        <strong>${completedUser} bugün dua etti.</strong>
        <p>
          Diğer dua da tamamlandığında ortak mesajınız burada görünecek.
        </p>
      </div>
    `;

    result.classList.remove(
      "completed"
    );
  } else {
    result.innerHTML = `
      <span class="result-icon" aria-hidden="true">🤍</span>

      <div>
        <strong>Dualar kalpleri birbirine yaklaştırır.</strong>
        <p>
          İkiniz de dua ettiğinizde burada ortak mesajınız görünecek.
        </p>
      </div>
    `;

    result.classList.remove(
      "completed"
    );
  }

  updateEditableAreas();
}

function updateMutualPrayerButton(
  userId,
  completed
) {
  const button =
    document.querySelector(
      `[data-prayer-from="${userId}"]`
    );

  if (!button) {
    return;
  }

  const targetUser =
    button.dataset.prayerTo;

  button.innerHTML =
    completed
      ? `
        <span aria-hidden="true">✓</span>
        Dua edildi
      `
      : `
        <span aria-hidden="true">🤲</span>
        ${USERS[targetUser].name} için dua ettim
      `;

  button.disabled =
    userId !== activeUser ||
    completed;
}
/* =========================================================
   ORTAK DUALAR
========================================================= */

function getSharedPrayers() {
  return getStorageArray(
    STORAGE_KEYS.sharedPrayers
  );
}

function saveSharedPrayer(prayerText) {
  const prayers =
    getSharedPrayers();

  prayers.unshift({
    id: createId(),
    author: activeUser,
    text: prayerText,
    createdAt: new Date().toISOString(),
    amenBy: []
  });

  setStorageObject(
    STORAGE_KEYS.sharedPrayers,
    prayers
  );

  loadSharedPrayers();

  showToast(
    "Duan paylaşıldı. 🤲"
  );
}

function loadSharedPrayers() {
  const container =
    document.getElementById(
      "sharedPrayersList"
    );

  if (!container) {
    return;
  }

  const prayers =
    getSharedPrayers();

  if (prayers.length === 0) {
    container.innerHTML = `
      <article class="shared-prayer-empty">
        <span aria-hidden="true">🤲</span>
        <h3>Henüz ortak dua yok</h3>
        <p>
          İlk duayı yazdığınızda burada birlikte “Âmin” diyebileceksiniz.
        </p>
      </article>
    `;

    return;
  }

  container.innerHTML =
    prayers
      .map(
        prayer =>
          createSharedPrayerHtml(prayer)
      )
      .join("");

  container
    .querySelectorAll(
      "[data-amen-prayer-id]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          toggleAmen(
            button.dataset.amenPrayerId
          );
        }
      );
    });
}

function createSharedPrayerHtml(prayer) {
  const author =
    USERS[prayer.author] ||
    USERS.damla;

  const hasSaidAmen =
    prayer.amenBy.includes(activeUser);

  const amenCount =
    prayer.amenBy.length;

  const formattedDate =
    new Intl.DateTimeFormat(
      "tr-TR",
      {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }
    ).format(
      new Date(prayer.createdAt)
    );

  return `
    <article class="shared-prayer-item">
      <div class="shared-prayer-item-header">
        <strong>
          ${escapeHtml(author.name)}
        </strong>

        <time
          datetime="${escapeHtml(
            prayer.createdAt
          )}"
        >
          ${escapeHtml(formattedDate)}
        </time>
      </div>

      <p>
        ${escapeHtml(prayer.text)}
      </p>

      <button
        type="button"
        class="amen-button ${
          hasSaidAmen
            ? "completed"
            : ""
        }"
        data-amen-prayer-id="${escapeHtml(
          prayer.id
        )}"
      >
        <span aria-hidden="true">
          ${hasSaidAmen ? "🤍" : "🤲"}
        </span>

        ${
          hasSaidAmen
            ? "Âmin dedin"
            : "Âmin"
        }

        ${
          amenCount > 0
            ? `<small>${amenCount}</small>`
            : ""
        }
      </button>
    </article>
  `;
}

function toggleAmen(prayerId) {
  const prayers =
    getSharedPrayers();

  const prayer =
    prayers.find(
      item => item.id === prayerId
    );

  if (!prayer) {
    return;
  }

  const userIndex =
    prayer.amenBy.indexOf(activeUser);

  if (userIndex >= 0) {
    prayer.amenBy.splice(
      userIndex,
      1
    );

    showToast(
      "Âmin işareti kaldırıldı."
    );
  } else {
    prayer.amenBy.push(activeUser);

    showToast("Âmin. 🤍");
  }

  setStorageObject(
    STORAGE_KEYS.sharedPrayers,
    prayers
  );

  loadSharedPrayers();
}

/* =========================================================
   GÜNLÜK NOT
========================================================= */

function getDailyNotes() {
  return getStorageObject(
    STORAGE_KEYS.dailyNotes,
    {}
  );
}

function loadDailyNote() {
  const notes =
    getDailyNotes();

  const noteInput =
    document.getElementById(
      "dailyNoteInput"
    );

  const saveStatus =
    document.getElementById(
      "noteSaveStatus"
    );

  const note =
    notes[getTodayKey()]?.[activeUser]
      ?.text || "";

  if (noteInput) {
    noteInput.value = note;
  }

  if (saveStatus) {
    saveStatus.textContent =
      note
        ? "Bugünkü notun kayıtlı"
        : "Henüz kaydedilmedi";
  }
}

function saveDailyNote() {
  const noteInput =
    document.getElementById(
      "dailyNoteInput"
    );

  const saveStatus =
    document.getElementById(
      "noteSaveStatus"
    );

  if (!noteInput) {
    return;
  }

  const notes =
    getDailyNotes();

  const todayKey =
    getTodayKey();

  const text =
    noteInput.value.trim();

  if (!notes[todayKey]) {
    notes[todayKey] = {};
  }

  notes[todayKey][activeUser] = {
    text,
    updatedAt:
      new Date().toISOString()
  };

  setStorageObject(
    STORAGE_KEYS.dailyNotes,
    notes
  );

  if (saveStatus) {
    saveStatus.textContent =
      text
        ? "Şimdi kaydedildi"
        : "Boş not kaydedildi";
  }

  showToast(
    text
      ? "Kalbindeki not kaydedildi."
      : "Bugünkü not temizlendi."
  );
}

/* =========================================================
   AYLIK İSTATİSTİKLER
========================================================= */

function calculateMonthlyStatistics() {
  const records =
    getDailyRecords();

  const mutualPrayers =
    getMutualPrayers();

  const currentDate =
    new Date();

  const currentYear =
    currentDate.getFullYear();

  const currentMonth =
    currentDate.getMonth();

  let prayerCount = 0;
  let quranCount = 0;
  let esmaCount = 0;
  let duaCount = 0;

  Object.entries(records).forEach(
    ([dateKey, users]) => {
      const date =
        parseDateKey(dateKey);

      if (
        date.getFullYear() !==
          currentYear ||
        date.getMonth() !==
          currentMonth
      ) {
        return;
      }

      Object.values(users).forEach(
        record => {
          prayerCount += [
            "fajr",
            "dhuhr",
            "asr",
            "maghrib",
            "isha"
          ].filter(
            field => record[field]
          ).length;

          if (record.quran) {
            quranCount += 1;
          }

          if (record.asma) {
            esmaCount += 1;
          }

          if (record.dua) {
            duaCount += 1;
          }
        }
      );
    }
  );

  Object.entries(mutualPrayers).forEach(
    ([dateKey, users]) => {
      const date =
        parseDateKey(dateKey);

      if (
        date.getFullYear() ===
          currentYear &&
        date.getMonth() ===
          currentMonth
      ) {
        duaCount +=
          Object.keys(users).length;
      }
    }
  );

  setText(
    "monthlyPrayerCount",
    prayerCount.toString()
  );

  setText(
    "monthlyQuranCount",
    quranCount.toString()
  );

  setText(
    "monthlyEsmaCount",
    esmaCount.toString()
  );

  setText(
    "monthlyDuaCount",
    duaCount.toString()
  );
}

/* =========================================================
   SERİ
========================================================= */

function calculateSharedStreak() {
  const records =
    getDailyRecords();

  let streak = 0;

  const cursor =
    new Date();

  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const dateKey =
      formatDateKey(cursor);

    const dayRecords =
      records[dateKey];

    if (!dayRecords) {
      break;
    }

    const damlaHasActivity =
      hasAnyCompletedCheck(
        dayRecords.damla
      );

    const hilalHasActivity =
      hasAnyCompletedCheck(
        dayRecords.hilal
      );

    if (
      !damlaHasActivity ||
      !hilalHasActivity
    ) {
      break;
    }

    streak += 1;

    cursor.setDate(
      cursor.getDate() - 1
    );
  }

  setText(
    "sharedStreakCount",
    streak.toString()
  );

  const streakMessage =
    document.getElementById(
      "sharedStreakMessage"
    );

  if (!streakMessage) {
    return streak;
  }

  if (streak === 0) {
    streakMessage.textContent =
      "Bugün yeniden niyet edebilirsiniz. Her başlangıç kıymetlidir.";
  } else if (streak < 7) {
    streakMessage.textContent =
      "Küçük adımlarınız birlikte güzel bir alışkanlığa dönüşüyor.";
  } else if (streak < 30) {
    streakMessage.textContent =
      "Birlikte devam ettiğiniz her gün manevi bahçenizi büyütüyor.";
  } else {
    streakMessage.textContent =
      "Uzun süredir birbirinize destek olarak devam ediyorsunuz.";
  }

  return streak;
}

function hasAnyCompletedCheck(record) {
  if (!record) {
    return false;
  }

  return CHECK_FIELDS.some(
    field => Boolean(record[field])
  );
}

/* =========================================================
   MANEVİ BAHÇE
========================================================= */

function getSharedActiveDayCount() {
  const records =
    getDailyRecords();

  return Object.values(records).filter(
    dayRecords => {
      return (
        hasAnyCompletedCheck(
          dayRecords.damla
        ) &&
        hasAnyCompletedCheck(
          dayRecords.hilal
        )
      );
    }
  ).length;
}

function updateGarden() {
  const sharedDays =
    getSharedActiveDayCount();

  let title =
    "Yeni Bir Tohum";

  let description =
    "Birlikte devam ettikçe bahçeniz büyüyecek.";

  let visual = "🌱";
  let progress = 0;

  let progressText =
    "İlk fideye 7 ortak gün kaldı.";

  if (sharedDays < 7) {
    progress =
      (sharedDays / 7) * 100;

    progressText =
      `İlk fideye ${
        7 - sharedDays
      } ortak gün kaldı.`;
  } else if (sharedDays < 14) {
    title =
      "Küçük Bir Fide";

    description =
      "Niyetleriniz kök salmaya ve güçlenmeye başladı.";

    visual = "🌿";

    progress =
      ((sharedDays - 7) / 7) *
      100;

    progressText =
      `İlk çiçeğe ${
        14 - sharedDays
      } ortak gün kaldı.`;
  } else if (sharedDays < 30) {
    title =
      "Açan Bir Çiçek";

    description =
      "Birlikte gösterdiğiniz istikrar güzelliklere dönüşüyor.";

    visual = "🌷";

    progress =
      ((sharedDays - 14) / 16) *
      100;

    progressText =
      `Ağaca ${
        30 - sharedDays
      } ortak gün kaldı.`;
  } else if (sharedDays < 60) {
    title =
      "Güçlü Bir Ağaç";

    description =
      "Manevi yolculuğunuz artık sağlam dallara sahip.";

    visual = "🌳";

    progress =
      ((sharedDays - 30) / 30) *
      100;

    progressText =
      `Meyve veren ağaca ${
        60 - sharedDays
      } ortak gün kaldı.`;
  } else {
    title =
      "Meyve Veren Ağaç";

    description =
      "Sabırla sürdürdüğünüz yolculuk güzel meyveler verdi.";

    visual = "🌳";
    progress = 100;

    progressText =
      `${sharedDays} ortak gün biriktirdiniz.`;
  }

  setText(
    "gardenLevelTitle",
    title
  );

  setText(
    "gardenLevelDescription",
    description
  );

  setText(
    "gardenProgressText",
    progressText
  );

  const gardenVisual =
    document.querySelector(
      "#gardenVisual .garden-plant"
    );

  if (gardenVisual) {
    gardenVisual.textContent =
      visual;
  }

  const gardenProgressFill =
    document.getElementById(
      "gardenProgressFill"
    );

  if (gardenProgressFill) {
    const safeProgress =
      Math.max(
        0,
        Math.min(progress, 100)
      );

    gardenProgressFill.style.width =
      `${safeProgress}%`;

    gardenProgressFill
      .parentElement
      ?.setAttribute(
        "aria-valuenow",
        Math.round(
          safeProgress
        ).toString()
      );
  }
}

/* =========================================================
   ROZETLER
========================================================= */

function updateBadges() {
  const records =
    getDailyRecords();

  const mutualPrayers =
    getMutualPrayers();

  const sharedDays =
    getSharedActiveDayCount();

  let quranCount = 0;
  let esmaCount = 0;
  let prayerCount = 0;

  Object.values(records).forEach(
    dayRecords => {
      Object.values(dayRecords).forEach(
        record => {
          if (record.quran) {
            quranCount += 1;
          }

          if (record.asma) {
            esmaCount += 1;
          }

          prayerCount += [
            "fajr",
            "dhuhr",
            "asr",
            "maghrib",
            "isha"
          ].filter(
            field => record[field]
          ).length;
        }
      );
    }
  );

  const mutualPrayerCount =
    Object.values(
      mutualPrayers
    ).reduce(
      (total, dayPrayers) =>
        total +
        Object.keys(
          dayPrayers
        ).length,
      0
    );

  setBadgeState(
    "first-seven-days",
    sharedDays >= 7
  );

  setBadgeState(
    "thirty-days",
    sharedDays >= 30
  );

  setBadgeState(
    "quran-friend",
    quranCount >= 20
  );

  setBadgeState(
    "asma-traveler",
    esmaCount >= 20
  );

  setBadgeState(
    "prayer-streak",
    prayerCount >= 100
  );

  setBadgeState(
    "dua-traveler",
    mutualPrayerCount >= 20
  );
}

function setBadgeState(
  badgeName,
  unlocked
) {
  const badge =
    document.querySelector(
      `[data-badge="${badgeName}"]`
    );

  if (!badge) {
    return;
  }

  badge.classList.toggle(
    "unlocked",
    unlocked
  );

  badge.classList.toggle(
    "locked",
    !unlocked
  );

  const status =
    badge.querySelector(
      ".badge-status"
    );

  if (status) {
    status.textContent =
      unlocked
        ? "Kazanıldı"
        : "Kilitli";
  }
}
/* =========================================================
   TAKVİM
========================================================= */

function renderCalendar() {
  const calendarDays =
    document.getElementById(
      "calendarDays"
    );

  const calendarMonthTitle =
    document.getElementById(
      "calendarMonthTitle"
    );

  if (
    !calendarDays ||
    !calendarMonthTitle
  ) {
    return;
  }

  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();

  calendarMonthTitle.textContent =
    new Intl.DateTimeFormat(
      "tr-TR",
      {
        month: "long",
        year: "numeric"
      }
    ).format(calendarDate);

  calendarDays.innerHTML = "";

  const firstDayOfMonth =
    new Date(year, month, 1);

  const lastDayOfMonth =
    new Date(year, month + 1, 0);

  const totalDays =
    lastDayOfMonth.getDate();

  let startingDay =
    firstDayOfMonth.getDay();

  startingDay =
    startingDay === 0
      ? 6
      : startingDay - 1;

  for (
    let index = 0;
    index < startingDay;
    index += 1
  ) {
    const emptyDay =
      document.createElement("div");

    emptyDay.className =
      "calendar-day empty";

    calendarDays.appendChild(
      emptyDay
    );
  }

  for (
    let day = 1;
    day <= totalDays;
    day += 1
  ) {
    const date =
      new Date(year, month, day);

    const dateKey =
      formatDateKey(date);

    calendarDays.appendChild(
      createCalendarDay(
        date,
        dateKey,
        day
      )
    );
  }
}

function createCalendarDay(
  date,
  dateKey,
  dayNumber
) {
  const records =
    getDailyRecords();

  const dayRecords =
    records[dateKey] || {};

  const damlaActive =
    hasAnyCompletedCheck(
      dayRecords.damla
    );

  const hilalActive =
    hasAnyCompletedCheck(
      dayRecords.hilal
    );

  const button =
    document.createElement("button");

  button.type = "button";
  button.className = "calendar-day";
  button.dataset.date = dateKey;

  button.setAttribute(
    "aria-label",
    `${formatReadableDate(
      dateKey
    )} kayıtlarını görüntüle`
  );

  if (
    dateKey === getTodayKey()
  ) {
    button.classList.add(
      "today"
    );
  }

  if (
    damlaActive &&
    hilalActive
  ) {
    button.classList.add(
      "completed"
    );
  }

  button.innerHTML = `
    <span class="calendar-day-number">
      ${dayNumber}
    </span>

    <span
      class="calendar-day-status"
      aria-hidden="true"
    >
      ${
        damlaActive
          ? '<span class="damla-status"></span>'
          : ""
      }

      ${
        hilalActive
          ? '<span class="hilal-status"></span>'
          : ""
      }
    </span>
  `;

  button.addEventListener(
    "click",
    () => {
      openDayDetailModal(
        dateKey
      );
    }
  );

  return button;
}

/* =========================================================
   GÜN DETAY MODALI
========================================================= */

function openDayDetailModal(
  dateKey
) {
  const modal =
    document.getElementById(
      "dayDetailModal"
    );

  const title =
    document.getElementById(
      "dayDetailTitle"
    );

  const content =
    document.getElementById(
      "dayDetailContent"
    );

  if (
    !modal ||
    !title ||
    !content
  ) {
    return;
  }

  title.textContent =
    formatReadableDate(dateKey);

  content.innerHTML =
    createDayDetailHtml(dateKey);

  modal.classList.remove(
    "hidden"
  );

  document.body.style.overflow =
    "hidden";
}

function closeDayDetailModal() {
  const modal =
    document.getElementById(
      "dayDetailModal"
    );

  modal?.classList.add(
    "hidden"
  );

  document.body.style.overflow =
    "";
}

function createDayDetailHtml(
  dateKey
) {
  const records =
    getDailyRecords();

  const notes =
    getDailyNotes();

  const mutualPrayers =
    getMutualPrayers();

  return Object.keys(USERS)
    .map(userId => {
      const user =
        USERS[userId];

      const record =
        records[dateKey]?.[userId] ||
        createEmptyDailyRecord();

      const completedFields =
        CHECK_FIELDS.filter(
          field => record[field]
        );

      const note =
        notes[dateKey]?.[userId]
          ?.text || "";

      const prayedForFriend =
        Boolean(
          mutualPrayers[dateKey]
            ?.[userId]
        );

      const completedHtml =
        completedFields.length > 0
          ? completedFields
              .map(
                field => `
                  <span class="day-detail-item">
                    ${escapeHtml(
                      FIELD_LABELS[field]
                    )}
                  </span>
                `
              )
              .join("")
          : `
              <span class="day-detail-empty">
                Bu gün için kayıt bulunmuyor.
              </span>
            `;

      return `
        <section class="day-detail-user">
          <h3>
            ${escapeHtml(user.name)}
          </h3>

          <div class="day-detail-list">
            ${completedHtml}

            ${
              prayedForFriend
                ? `
                  <span class="day-detail-item">
                    🤲 Birbirine dua
                  </span>
                `
                : ""
            }
          </div>

          ${
            note
              ? `
                <blockquote>
                  ${escapeHtml(note)}
                </blockquote>
              `
              : ""
          }
        </section>
      `;
    })
    .join("");
}

/* =========================================================
   TEMA
========================================================= */

function applySavedTheme() {
  const savedTheme =
    localStorage.getItem(
      STORAGE_KEYS.theme
    ) || "dark";

  document.body.classList.toggle(
    "light-theme",
    savedTheme === "light"
  );

  updateThemeButton(
    savedTheme
  );
}

function toggleTheme() {
  const isLightTheme =
    document.body.classList.toggle(
      "light-theme"
    );

  const newTheme =
    isLightTheme
      ? "light"
      : "dark";

  localStorage.setItem(
    STORAGE_KEYS.theme,
    newTheme
  );

  updateThemeButton(newTheme);

  showToast(
    isLightTheme
      ? "Açık tema etkinleştirildi."
      : "Koyu tema etkinleştirildi."
  );
}

function updateThemeButton(theme) {
  const themeToggleButton =
    document.getElementById(
      "themeToggleButton"
    );

  if (!themeToggleButton) {
    return;
  }

  const isLight =
    theme === "light";

  themeToggleButton.innerHTML = `
    <span aria-hidden="true">
      ${isLight ? "🌙" : "☀️"}
    </span>
  `;

  themeToggleButton.setAttribute(
    "aria-label",
    isLight
      ? "Koyu temaya geç"
      : "Açık temaya geç"
  );

  themeToggleButton.title =
    isLight
      ? "Koyu temaya geç"
      : "Açık temaya geç";
}

/* =========================================================
   TOAST MESAJLARI
========================================================= */

function showToast(message) {
  const toast =
    document.getElementById(
      "toast"
    );

  const toastMessage =
    document.getElementById(
      "toastMessage"
    );

  if (
    !toast ||
    !toastMessage
  ) {
    return;
  }

  toastMessage.textContent =
    message;

  toast.classList.add(
    "show"
  );

  window.clearTimeout(
    toastTimer
  );

  toastTimer =
    window.setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      2800
    );
}

/* =========================================================
   LOCALSTORAGE YARDIMCILARI
========================================================= */

function getStorageObject(
  key,
  fallbackValue = {}
) {
  try {
    const storedValue =
      localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    const parsedValue =
      JSON.parse(storedValue);

    return (
      parsedValue ??
      fallbackValue
    );
  } catch (error) {
    console.error(
      `${key} okunamadı:`,
      error
    );

    return fallbackValue;
  }
}

function getStorageArray(key) {
  const value =
    getStorageObject(
      key,
      []
    );

  return Array.isArray(value)
    ? value
    : [];
}

function setStorageObject(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `${key} kaydedilemedi:`,
      error
    );

    showToast(
      "Kayıt sırasında bir sorun oluştu."
    );
  }
}

/* =========================================================
   GENEL YARDIMCILAR
========================================================= */

function setText(
  elementId,
  value
) {
  const element =
    document.getElementById(
      elementId
    );

  if (element) {
    element.textContent =
      value;
  }
}

function createId() {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function escapeHtml(value) {
  const text =
    String(value);

  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
