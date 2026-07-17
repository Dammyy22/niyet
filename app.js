"use strict";

/* =========================================================
   NİYET - ANA JAVASCRIPT DOSYASI
========================================================= */

const STORAGE_KEYS = {
  activeUser: "niyet_active_user",
  theme: "niyet_theme"
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
let dailyActionsCache = {};
let mutualPrayersCache = {};
let sharedPrayersCache = [];
let dailyNotesCache = {};

let profileIds = {};
let usernameByProfileId = {};

/* =========================================================
   SAYFA BAŞLANGICI
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const authenticatedUser =
    await window.niyetAuthReady;

  if (!authenticatedUser) {
    return;
  }

  activeUser = normalizeUsername(
    authenticatedUser.username
  );

  if (!USERS[activeUser]) {
    activeUser = getStoredActiveUser();
  }

  await initializeApplication();
});

async function initializeApplication() {
  applySavedTheme();
  renderCurrentDate();
  renderCurrentYear();
  await renderDailyContent();
  setActiveUser(activeUser);

  try {
    await loadProfileIds();

    await Promise.all([
      loadDailyRecords(),
      loadDailyContentActions(),
      loadMutualPrayers(),
      loadSharedPrayers(),
      loadDailyNote()
    ]);
  } catch (error) {
    console.error(
      "Supabase verileri yüklenemedi:",
      error
    );

    showToast(
      `Veriler yüklenemedi: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );
  }

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
  const profileButton =
    document.getElementById(
      "profileButton"
    );

  const profileMenu =
    document.getElementById(
      "profileMenu"
    );

  profileButton?.addEventListener(
    "click",
    event => {
      event.stopPropagation();

      profileMenu?.classList.toggle(
        "hidden"
      );
    }
  );

  document.addEventListener(
    "click",
    event => {
      if (
        profileMenu &&
        profileButton &&
        !profileMenu.contains(
          event.target
        ) &&
        !profileButton.contains(
          event.target
        )
      ) {
        profileMenu.classList.add(
          "hidden"
        );
      }
    }
  );
}

function bindThemeEvents() {
  const themeToggleButton =
    document.getElementById(
      "themeToggleButton"
    );

  themeToggleButton?.addEventListener(
    "click",
    toggleTheme
  );
}

function bindCheckboxEvents() {
  const checkboxes =
    document.querySelectorAll(
      'input[type="checkbox"][data-user][data-check]'
    );

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener(
      "change",
      async () => {
        const userId =
          checkbox.dataset.user;

        const checkName =
          checkbox.dataset.check;

        const checked =
          checkbox.checked;

        if (userId !== activeUser) {
          checkbox.checked =
            !checked;

          showToast(
            "Yalnızca kendi kayıtlarını değiştirebilirsin."
          );

          return;
        }

        checkbox.disabled = true;

        try {
          await updateDailyCheck(
            userId,
            checkName,
            checked
          );

          updateUserProgress(
            userId
          );

          calculateMonthlyStatistics();
          calculateSharedStreak();
          updateGarden();
          updateBadges();
          renderCalendar();

          showToast(
            checked
              ? `${FIELD_LABELS[checkName]} kaydedildi. 🌿`
              : `${FIELD_LABELS[checkName]} işareti kaldırıldı.`
          );
        } catch (error) {
          console.error(
            "Supabase günlük kayıt hatası:",
            error
          );

          checkbox.checked =
            !checked;

          showToast(
            `Kayıt yapılamadı: ${
              error.message ||
              "Bilinmeyen hata"
            }`
          );
        } finally {
          updateEditableAreas();
        }
      }
    );
  });
}

function bindDailyContentEvents() {
  const markEsmaButton =
    document.getElementById(
      "markEsmaCompleteButton"
    );

  const markChallengeButton =
    document.getElementById(
      "markChallengeCompleteButton"
    );

  const dailyPrayerAmenButton =
    document.getElementById(
      "dailyPrayerAmenButton"
    );

  markEsmaButton?.addEventListener(
    "click",
    async () => {
      const newValue =
        await toggleDailyContentAction(
          "esma",
          markEsmaButton,
          "Esma kaydedildi."
        );

      await synchronizeCheckboxWithContent(
        "asma",
        newValue
      );
    }
  );

  markChallengeButton?.addEventListener(
    "click",
    async () => {
      await toggleDailyContentAction(
        "challenge",
        markChallengeButton,
        "Bugünün güzel adımı kaydedildi."
      );
    }
  );

  dailyPrayerAmenButton?.addEventListener(
    "click",
    async () => {
      await toggleDailyContentAction(
        "dailyPrayerAmen",
        dailyPrayerAmenButton,
        "Âmin. 🤍"
      );
    }
  );
}

function bindMutualPrayerEvents() {
  const mutualPrayerButtons =
    document.querySelectorAll(
      "[data-prayer-from][data-prayer-to]"
    );

  mutualPrayerButtons.forEach(
    button => {
      button.addEventListener(
        "click",
        async () => {
          const fromUser =
            button.dataset.prayerFrom;

          const toUser =
            button.dataset.prayerTo;

          if (
            fromUser !== activeUser
          ) {
            showToast(
              "Bu dua butonu diğer kullanıcıya ait."
            );

            return;
          }

          button.disabled = true;

          await saveMutualPrayer(
            fromUser,
            toUser
          );

          updateEditableAreas();
        }
      );
    }
  );
}

function bindSharedPrayerEvents() {
  const sharedPrayerForm =
    document.getElementById(
      "sharedPrayerForm"
    );

  const sharedPrayerInput =
    document.getElementById(
      "sharedPrayerInput"
    );

  const prayerCharacterCount =
    document.getElementById(
      "prayerCharacterCount"
    );

  sharedPrayerInput?.addEventListener(
    "input",
    () => {
      if (
        prayerCharacterCount
      ) {
        prayerCharacterCount.textContent =
          sharedPrayerInput.value
            .length
            .toString();
      }
    }
  );

  sharedPrayerForm?.addEventListener(
    "submit",
    async event => {
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

      const submitButton =
        sharedPrayerForm.querySelector(
          'button[type="submit"]'
        );

      if (submitButton) {
        submitButton.disabled = true;
      }

      const saved =
        await saveSharedPrayer(
          prayerText
        );

      if (saved) {
        sharedPrayerInput.value =
          "";

        if (
          prayerCharacterCount
        ) {
          prayerCharacterCount.textContent =
            "0";
        }
      }

      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  );
}

function bindDailyNoteEvents() {
  const saveDailyNoteButton =
    document.getElementById(
      "saveDailyNoteButton"
    );

  saveDailyNoteButton?.addEventListener(
    "click",
    saveDailyNote
  );
}

function bindCalendarEvents() {
  const previousMonthButton =
    document.getElementById(
      "previousMonthButton"
    );

  const nextMonthButton =
    document.getElementById(
      "nextMonthButton"
    );

  const openCalendarButton =
    document.getElementById(
      "openCalendarButton"
    );

  previousMonthButton?.addEventListener(
    "click",
    () => {
      calendarDate.setMonth(
        calendarDate.getMonth() - 1
      );

      renderCalendar();
    }
  );

  nextMonthButton?.addEventListener(
    "click",
    () => {
      calendarDate.setMonth(
        calendarDate.getMonth() + 1
      );

      renderCalendar();
    }
  );

  openCalendarButton?.addEventListener(
    "click",
    () => {
      document
        .getElementById(
          "calendarSection"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }
  );
}

function bindModalEvents() {
  const dayDetailModal =
    document.getElementById(
      "dayDetailModal"
    );

  const closeDayDetailButton =
    document.getElementById(
      "closeDayDetailButton"
    );

  closeDayDetailButton?.addEventListener(
    "click",
    closeDayDetailModal
  );

  dayDetailModal?.addEventListener(
    "click",
    event => {
      if (
        event.target ===
        dayDetailModal
      ) {
        closeDayDetailModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape" &&
        dayDetailModal &&
        !dayDetailModal.classList.contains(
          "hidden"
        )
      ) {
        closeDayDetailModal();
      }
    }
  );
}

/* =========================================================
   TARİH
========================================================= */

function renderCurrentDate() {
  const currentDateElement =
    document.getElementById(
      "currentDate"
    );

  const currentHijriDateElement =
    document.getElementById(
      "currentHijriDate"
    );

  const today = new Date();

  if (currentDateElement) {
    currentDateElement.textContent =
      new Intl.DateTimeFormat(
        "tr-TR",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }
      ).format(today);
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
    document.getElementById(
      "currentYear"
    );

  if (currentYearElement) {
    currentYearElement.textContent =
      new Date()
        .getFullYear()
        .toString();
  }
}

function getTodayKey() {
  return formatDateKey(
    new Date()
  );
}

function formatDateKey(date) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] =
    dateKey
      .split("-")
      .map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
}

function formatReadableDate(
  dateKey
) {
  return new Intl.DateTimeFormat(
    "tr-TR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  ).format(
    parseDateKey(dateKey)
  );
}
/* =========================================================
   GÜNLÜK İÇERİK
========================================================= */

function getDayNumberOfYear(date) {
  const startOfYear = new Date(
    date.getFullYear(),
    0,
    0
  );

  const difference = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.floor(
    difference / oneDay
  );
}

async function loadDailyContentActions() {
  const { data, error } =
    await window.niyetSupabase
      .from("daily_actions")
      .select(
        "user_id, action_date, action_key, completed"
      );

  if (error) {
    throw error;
  }

  dailyActionsCache = {};

  (data || []).forEach(row => {
    const username =
      usernameByProfileId[
        row.user_id
      ];

    if (!username) {
      return;
    }

    if (
      !dailyActionsCache[
        row.action_date
      ]
    ) {
      dailyActionsCache[
        row.action_date
      ] = {};
    }

    if (
      !dailyActionsCache[
        row.action_date
      ][username]
    ) {
      dailyActionsCache[
        row.action_date
      ][username] = {};
    }

    dailyActionsCache[
      row.action_date
    ][username][
      row.action_key
    ] = Boolean(
      row.completed
    );
  });

  renderDailyContentActions();
}

function renderDailyContentActions() {
  const todayActions =
    dailyActionsCache[
      getTodayKey()
    ]?.[activeUser] || {};

  updateContentActionButton(
    "markEsmaCompleteButton",
    Boolean(
      todayActions.esma
    ),
    "Okudum",
    "Okundu"
  );

  updateContentActionButton(
    "markChallengeCompleteButton",
    Boolean(
      todayActions.challenge
    ),
    "Yaptım",
    "Tamamlandı"
  );

  updateContentActionButton(
    "dailyPrayerAmenButton",
    Boolean(
      todayActions.dailyPrayerAmen
    ),
    "Âmin",
    "Âmin dedin"
  );
}

async function toggleDailyContentAction(
  actionName,
  button,
  message
) {
  let profileId;

  try {
    profileId =
      await ensureProfileId(
        activeUser
      );
  } catch (error) {
    console.error(
      "Aktif kullanıcı profili yüklenemedi:",
      error
    );

    showToast(
      error.message ||
      "Aktif kullanıcı profili bulunamadı."
    );

    return false;
  }

  const todayKey =
    getTodayKey();

  const currentValue =
    Boolean(
      dailyActionsCache[
        todayKey
      ]?.[activeUser]?.[
        actionName
      ]
    );

  const newValue =
    !currentValue;

  button.disabled = true;

  try {
    const { error } =
      await window.niyetSupabase
        .from("daily_actions")
        .upsert(
          {
            user_id:
              profileId,

            action_date:
              todayKey,

            action_key:
              actionName,

            completed:
              newValue
          },
          {
            onConflict:
              "user_id,action_date,action_key"
          }
        );

    if (error) {
      throw error;
    }

    if (
      !dailyActionsCache[
        todayKey
      ]
    ) {
      dailyActionsCache[
        todayKey
      ] = {};
    }

    if (
      !dailyActionsCache[
        todayKey
      ][activeUser]
    ) {
      dailyActionsCache[
        todayKey
      ][activeUser] = {};
    }

    dailyActionsCache[
      todayKey
    ][activeUser][
      actionName
    ] = newValue;

    renderDailyContentActions();

    showToast(
      newValue
        ? message
        : "İşaret kaldırıldı."
    );

    return newValue;
  } catch (error) {
    console.error(
      "Günlük içerik kaydedilemedi:",
      error
    );

    showToast(
      `Kayıt yapılamadı: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );

    return currentValue;
  } finally {
    button.disabled = false;
  }
}

function updateContentActionButton(
  buttonId,
  completed,
  defaultText,
  completedText
) {
  const button =
    document.getElementById(
      buttonId
    );

  if (!button) {
    return;
  }

  button.classList.toggle(
    "completed",
    completed
  );

  const icon =
    buttonId ===
    "dailyPrayerAmenButton"
      ? "🤍"
      : "✓";

  button.innerHTML = `
    <span aria-hidden="true">
      ${icon}
    </span>

    ${
      completed
        ? completedText
        : defaultText
    }
  `;
}

async function synchronizeCheckboxWithContent(
  checkName,
  newValue
) {
  const checkbox =
    document.querySelector(
      `input[data-user="${activeUser}"][data-check="${checkName}"]`
    );

  if (!checkbox) {
    return;
  }

  const oldValue =
    checkbox.checked;

  checkbox.checked =
    newValue;

  checkbox.disabled =
    true;

  try {
    await updateDailyCheck(
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
  } catch (error) {
    checkbox.checked =
      oldValue;

    console.error(
      "Esma kutusu güncellenemedi:",
      error
    );

    showToast(
      `Esma kaydı yapılamadı: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );
  } finally {
    updateEditableAreas();
  }
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
    normalizeUsername(
      window
        .niyetAuthenticatedUser
        ?.username
    );

  const normalizedUserId =
    normalizeUsername(userId);

  if (
    !authenticatedUsername ||
    !USERS[
      authenticatedUsername
    ] ||
    normalizedUserId !==
      authenticatedUsername
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

  profileItems.forEach(
    item => {
      const userId =
        item.dataset.userSwitch;

      const isActive =
        userId === activeUser;

      item.classList.toggle(
        "active",
        isActive
      );

      item.hidden =
        !isActive;
    }
  );
}

function updateUserCards() {
  Object.keys(
    USERS
  ).forEach(userId => {
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

  checkboxes.forEach(
    checkbox => {
      checkbox.disabled =
        checkbox.dataset.user !==
        activeUser;
    }
  );

  const prayerButtons =
    document.querySelectorAll(
      "[data-prayer-from]"
    );

  prayerButtons.forEach(
    button => {
      const fromUser =
        button.dataset.prayerFrom;

      const completed =
        getMutualPrayerStatus(
          fromUser
        );

      button.disabled =
        fromUser !== activeUser ||
        completed;
    }
  );
}

/* =========================================================
   PROFİLLER
========================================================= */

function normalizeUsername(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("tr-TR");
}

async function ensureProfileId(
  username = activeUser
) {
  const normalizedUsername =
    normalizeUsername(username);

  if (
    profileIds[
      normalizedUsername
    ]
  ) {
    return profileIds[
      normalizedUsername
    ];
  }

  await loadProfileIds();

  const profileId =
    profileIds[
      normalizedUsername
    ];

  if (!profileId) {
    throw new Error(
      `${normalizedUsername || "Aktif kullanıcı"} profil ID'si bulunamadı.`
    );
  }

  return profileId;
}

async function loadProfileIds() {
  activeUser =
    normalizeUsername(
      activeUser
    );

  const { data, error } =
    await window.niyetSupabase
      .from("profiles")
      .select(
        "id, username"
      );

  if (error) {
    throw error;
  }

  profileIds = {};
  usernameByProfileId = {};

  (data || []).forEach(
    profile => {
      const username =
        normalizeUsername(
          profile.username
        );

      if (
        !USERS[username]
      ) {
        return;
      }

      profileIds[
        username
      ] = profile.id;

      usernameByProfileId[
        profile.id
      ] = username;
    }
  );

  if (
    !profileIds[
      activeUser
    ]
  ) {
    throw new Error(
      `${activeUser} profili bulunamadı.`
    );
  }
}

/* =========================================================
   GÜNLÜK KAYITLAR
========================================================= */

function getDailyRecords() {
  return dailyRecordsCache;
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

async function loadDailyRecords() {
  const { data, error } =
    await window.niyetSupabase
      .from("daily_checks")
      .select(
        "user_id, check_date, item_key, completed"
      )
      .order(
        "check_date",
        {
          ascending: true
        }
      );

  if (error) {
    throw error;
  }

  dailyRecordsCache = {};

  (data || []).forEach(
    row => {
      const username =
        usernameByProfileId[
          row.user_id
        ];

      if (
        !username ||
        !CHECK_FIELDS.includes(
          row.item_key
        )
      ) {
        return;
      }

      if (
        !dailyRecordsCache[
          row.check_date
        ]
      ) {
        dailyRecordsCache[
          row.check_date
        ] = {};
      }

      if (
        !dailyRecordsCache[
          row.check_date
        ][username]
      ) {
        dailyRecordsCache[
          row.check_date
        ][username] =
          createEmptyDailyRecord();
      }

      dailyRecordsCache[
        row.check_date
      ][username][
        row.item_key
      ] = Boolean(
        row.completed
      );
    }
  );

  renderDailyRecordCheckboxes();
}

function renderDailyRecordCheckboxes() {
  const todayKey =
    getTodayKey();

  Object.keys(
    USERS
  ).forEach(userId => {
    const record =
      dailyRecordsCache[
        todayKey
      ]?.[userId] ||
      createEmptyDailyRecord();

    CHECK_FIELDS.forEach(
      field => {
        const checkbox =
          document.querySelector(
            `input[data-user="${userId}"][data-check="${field}"]`
          );

        if (checkbox) {
          checkbox.checked =
            Boolean(
              record[field]
            );
        }
      }
    );
  });

  updateEditableAreas();
}

async function updateDailyCheck(
  userId,
  checkName,
  checked
) {
  if (
    userId !== activeUser
  ) {
    throw new Error(
      "Başka kullanıcının kaydı değiştirilemez."
    );
  }

  if (
    !CHECK_FIELDS.includes(
      checkName
    )
  ) {
    throw new Error(
      "Geçersiz takip alanı."
    );
  }

  const profileId =
    await ensureProfileId(
      userId
    );

  const todayKey =
    getTodayKey();

  const { error } =
    await window.niyetSupabase
      .from("daily_checks")
      .upsert(
        {
          user_id:
            profileId,

          check_date:
            todayKey,

          item_key:
            checkName,

          item_label:
            FIELD_LABELS[
              checkName
            ],

          completed:
            Boolean(checked)
        },
        {
          onConflict:
            "user_id,check_date,item_key"
        }
      );

  if (error) {
    throw error;
  }

  if (
    !dailyRecordsCache[
      todayKey
    ]
  ) {
    dailyRecordsCache[
      todayKey
    ] = {};
  }

  if (
    !dailyRecordsCache[
      todayKey
    ][userId]
  ) {
    dailyRecordsCache[
      todayKey
    ][userId] =
      createEmptyDailyRecord();
  }

  dailyRecordsCache[
    todayKey
  ][userId][
    checkName
  ] = Boolean(checked);
}

function updateAllProgress() {
  Object.keys(
    USERS
  ).forEach(
    updateUserProgress
  );
}

function updateUserProgress(userId) {
  const todayRecord =
    dailyRecordsCache[
      getTodayKey()
    ]?.[userId] ||
    createEmptyDailyRecord();

  const completedCount =
    CHECK_FIELDS.filter(
      field =>
        todayRecord[field]
    ).length;

  const percentage =
    Math.round(
      (
        completedCount /
        CHECK_FIELDS.length
      ) * 100
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

    progressFill
      .parentElement
      ?.setAttribute(
        "aria-valuenow",
        percentage.toString()
      );
  }
}
/* =========================================================
   BİRBİRİNE DUA ET
========================================================= */

function getMutualPrayers() {
  return mutualPrayersCache;
}

function getMutualPrayerStatus(
  userId
) {
  return Boolean(
    mutualPrayersCache[
      getTodayKey()
    ]?.[userId]
  );
}

async function loadMutualPrayers() {
  const { data, error } =
    await window.niyetSupabase
      .from("mutual_prayers")
      .select(
        "id, from_user_id, to_user_id, prayer_date, created_at"
      );

  if (error) {
    throw error;
  }

  mutualPrayersCache = {};

  (data || []).forEach(
    row => {
      const fromUsername =
        usernameByProfileId[
          row.from_user_id
        ];

      const toUsername =
        usernameByProfileId[
          row.to_user_id
        ];

      if (
        !fromUsername ||
        !toUsername
      ) {
        return;
      }

      if (
        !mutualPrayersCache[
          row.prayer_date
        ]
      ) {
        mutualPrayersCache[
          row.prayer_date
        ] = {};
      }

      mutualPrayersCache[
        row.prayer_date
      ][fromUsername] = {
        id: row.id,
        from: fromUsername,
        to: toUsername,
        createdAt:
          row.created_at
      };
    }
  );

  renderMutualPrayers();
}

async function saveMutualPrayer(
  fromUser,
  toUser
) {
  if (
    fromUser !== activeUser
  ) {
    showToast(
      "Başka kullanıcı adına dua kaydedemezsin."
    );

    return;
  }

  let fromProfileId;
  let toProfileId;

  try {
    [
      fromProfileId,
      toProfileId
    ] = await Promise.all([
      ensureProfileId(
        fromUser
      ),
      ensureProfileId(
        toUser
      )
    ]);
  } catch (error) {
    console.error(
      "Kullanıcı profilleri yüklenemedi:",
      error
    );

    showToast(
      error.message ||
      "Kullanıcı profilleri bulunamadı."
    );

    return;
  }

  const todayKey =
    getTodayKey();

  try {
    const { data, error } =
      await window.niyetSupabase
        .from("mutual_prayers")
        .upsert(
          {
            from_user_id:
              fromProfileId,

            to_user_id:
              toProfileId,

            prayer_date:
              todayKey
          },
          {
            onConflict:
              "from_user_id,to_user_id,prayer_date"
          }
        )
        .select()
        .single();

    if (error) {
      throw error;
    }

    if (
      !mutualPrayersCache[
        todayKey
      ]
    ) {
      mutualPrayersCache[
        todayKey
      ] = {};
    }

    mutualPrayersCache[
      todayKey
    ][fromUser] = {
      id: data.id,
      from: fromUser,
      to: toUser,
      createdAt:
        data.created_at
    };

    renderMutualPrayers();
    calculateMonthlyStatistics();
    updateBadges();

    showToast(
      `${USERS[toUser].name} için ettiğin dua kaydedildi. 🤍`
    );
  } catch (error) {
    console.error(
      "Birbirine dua kaydı başarısız:",
      error
    );

    showToast(
      `Dua kaydedilemedi: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );
  }
}

function renderMutualPrayers() {
  const damlaCompleted =
    getMutualPrayerStatus(
      "damla"
    );

  const hilalCompleted =
    getMutualPrayerStatus(
      "hilal"
    );

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
      <span
        class="result-icon"
        aria-hidden="true"
      >
        🤍
      </span>

      <div>
        <strong>
          Bugün birbiriniz için dua ettiniz.
        </strong>

        <p>
          Allah dualarınızı kabul, kalplerinizi birbirine yakın eylesin.
        </p>
      </div>
    `;

    result.classList.add(
      "completed"
    );
  } else if (
    damlaCompleted ||
    hilalCompleted
  ) {
    const completedUser =
      damlaCompleted
        ? "Damla"
        : "Hilal";

    result.innerHTML = `
      <span
        class="result-icon"
        aria-hidden="true"
      >
        🌙
      </span>

      <div>
        <strong>
          ${completedUser} bugün dua etti.
        </strong>

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
      <span
        class="result-icon"
        aria-hidden="true"
      >
        🤍
      </span>

      <div>
        <strong>
          Dualar kalpleri birbirine yaklaştırır.
        </strong>

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
        <span aria-hidden="true">
          ✓
        </span>

        Dua edildi
      `
      : `
        <span aria-hidden="true">
          🤲
        </span>

        ${USERS[targetUser].name} için dua ettim
      `;

  button.disabled =
    userId !== activeUser ||
    completed;
}

/* =========================================================
   ORTAK DUALAR
========================================================= */

async function loadSharedPrayers() {
  const prayersResult =
    await window.niyetSupabase
      .from("prayers")
      .select(
        "id, user_id, title, content, is_shared, created_at"
      )
      .eq(
        "is_shared",
        true
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      );

  if (
    prayersResult.error
  ) {
    throw prayersResult.error;
  }

  const amensResult =
    await window.niyetSupabase
      .from("prayer_amens")
      .select(
        "prayer_id, user_id"
      );

  if (
    amensResult.error
  ) {
    throw amensResult.error;
  }

  const amens =
    amensResult.data || [];

  sharedPrayersCache =
    (
      prayersResult.data ||
      []
    ).map(prayer => {
      const author =
        usernameByProfileId[
          prayer.user_id
        ] || "damla";

      const amenBy =
        amens
          .filter(
            amen =>
              amen.prayer_id ===
              prayer.id
          )
          .map(
            amen =>
              usernameByProfileId[
                amen.user_id
              ]
          )
          .filter(Boolean);

      return {
        id:
          String(prayer.id),

        author,

        text:
          prayer.content,

        title:
          prayer.title,

        createdAt:
          prayer.created_at,

        amenBy
      };
    });

  renderSharedPrayers();
}

async function saveSharedPrayer(
  prayerText
) {
  let profileId;

  try {
    profileId =
      await ensureProfileId(
        activeUser
      );
  } catch (error) {
    console.error(
      "Aktif kullanıcı profili yüklenemedi:",
      error
    );

    showToast(
      error.message ||
      "Aktif kullanıcı profili bulunamadı."
    );

    return false;
  }

  try {
    const { data, error } =
      await window.niyetSupabase
        .from("prayers")
        .insert({
          user_id:
            profileId,

          title:
            "Ortak Dua",

          content:
            prayerText,

          is_shared:
            true
        })
        .select()
        .single();

    if (error) {
      throw error;
    }

    sharedPrayersCache.unshift({
      id:
        String(data.id),

      author:
        activeUser,

      text:
        data.content,

      title:
        data.title,

      createdAt:
        data.created_at,

      amenBy: []
    });

    renderSharedPrayers();

    showToast(
      "Duan paylaşıldı. 🤲"
    );

    return true;
  } catch (error) {
    console.error(
      "Ortak dua kaydı başarısız:",
      error
    );

    showToast(
      `Dua paylaşılamadı: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );

    return false;
  }
}

function renderSharedPrayers() {
  const container =
    document.getElementById(
      "sharedPrayersList"
    );

  if (!container) {
    return;
  }

  if (
    sharedPrayersCache.length ===
    0
  ) {
    container.innerHTML = `
      <article
        class="shared-prayer-empty"
      >
        <span aria-hidden="true">
          🤲
        </span>

        <h3>
          Henüz ortak dua yok
        </h3>

        <p>
          İlk duayı yazdığınızda burada birlikte “Âmin” diyebileceksiniz.
        </p>
      </article>
    `;

    return;
  }

  container.innerHTML =
    sharedPrayersCache
      .map(
        createSharedPrayerHtml
      )
      .join("");

  container
    .querySelectorAll(
      "[data-amen-prayer-id]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        async () => {
          button.disabled =
            true;

          await toggleAmen(
            button.dataset
              .amenPrayerId
          );
        }
      );
    });
}

function createSharedPrayerHtml(
  prayer
) {
  const author =
    USERS[prayer.author] ||
    USERS.damla;

  const hasSaidAmen =
    prayer.amenBy.includes(
      activeUser
    );

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
      new Date(
        prayer.createdAt
      )
    );

  return `
    <article
      class="shared-prayer-item"
    >
      <div
        class="shared-prayer-item-header"
      >
        <strong>
          ${escapeHtml(
            author.name
          )}
        </strong>

        <time
          datetime="${escapeHtml(
            prayer.createdAt
          )}"
        >
          ${escapeHtml(
            formattedDate
          )}
        </time>
      </div>

      <p>
        ${escapeHtml(
          prayer.text
        )}
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
          ${
            hasSaidAmen
              ? "🤍"
              : "🤲"
          }
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

async function toggleAmen(
  prayerId
) {
  const prayer =
    sharedPrayersCache.find(
      item =>
        String(item.id) ===
        String(prayerId)
    );

  if (!prayer) {
    return;
  }

  let profileId;

  try {
    profileId =
      await ensureProfileId(
        activeUser
      );
  } catch (error) {
    console.error(
      "Aktif kullanıcı profili yüklenemedi:",
      error
    );

    showToast(
      error.message ||
      "Aktif kullanıcı profili bulunamadı."
    );

    return;
  }

  const hasSaidAmen =
    prayer.amenBy.includes(
      activeUser
    );

  try {
    if (hasSaidAmen) {
      const { error } =
        await window.niyetSupabase
          .from(
            "prayer_amens"
          )
          .delete()
          .eq(
            "prayer_id",
            Number(prayerId)
          )
          .eq(
            "user_id",
            profileId
          );

      if (error) {
        throw error;
      }

      prayer.amenBy =
        prayer.amenBy.filter(
          username =>
            username !==
            activeUser
        );

      showToast(
        "Âmin işareti kaldırıldı."
      );
    } else {
      const { error } =
        await window.niyetSupabase
          .from(
            "prayer_amens"
          )
          .insert({
            prayer_id:
              Number(prayerId),

            user_id:
              profileId
          });

      if (error) {
        throw error;
      }

      prayer.amenBy.push(
        activeUser
      );

      showToast(
        "Âmin. 🤍"
      );
    }

    renderSharedPrayers();
  } catch (error) {
    console.error(
      "Âmin kaydı başarısız:",
      error
    );

    showToast(
      `Âmin kaydedilemedi: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );

    renderSharedPrayers();
  }
}

/* =========================================================
   GÜNLÜK NOT
========================================================= */

async function loadDailyNote() {
  const { data, error } =
    await window.niyetSupabase
      .from("notes")
      .select(
        "id, user_id, note_date, content, category, updated_at"
      )
      .eq(
        "category",
        "günlük"
      );

  if (error) {
    throw error;
  }

  dailyNotesCache = {};

  (data || []).forEach(
    note => {
      const username =
        usernameByProfileId[
          note.user_id
        ];

      if (!username) {
        return;
      }

      if (
        !dailyNotesCache[
          note.note_date
        ]
      ) {
        dailyNotesCache[
          note.note_date
        ] = {};
      }

      dailyNotesCache[
        note.note_date
      ][username] = {
        id: note.id,
        text:
          note.content,

        updatedAt:
          note.updated_at
      };
    }
  );

  renderDailyNote();
}

function renderDailyNote() {
  const noteInput =
    document.getElementById(
      "dailyNoteInput"
    );

  const saveStatus =
    document.getElementById(
      "noteSaveStatus"
    );

  const note =
    dailyNotesCache[
      getTodayKey()
    ]?.[activeUser]?.text ||
    "";

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

async function saveDailyNote() {
  const noteInput =
    document.getElementById(
      "dailyNoteInput"
    );

  const saveStatus =
    document.getElementById(
      "noteSaveStatus"
    );

  const saveButton =
    document.getElementById(
      "saveDailyNoteButton"
    );

  if (
    !noteInput ||
    !saveButton
  ) {
    return;
  }

  let profileId;

  try {
    profileId =
      await ensureProfileId(
        activeUser
      );
  } catch (error) {
    console.error(
      "Aktif kullanıcı profili yüklenemedi:",
      error
    );

    showToast(
      error.message ||
      "Aktif kullanıcı profili bulunamadı."
    );

    return;
  }

  const todayKey =
    getTodayKey();

  const text =
    noteInput.value.trim();

  saveButton.disabled =
    true;

  try {
    const { data, error } =
      await window.niyetSupabase
        .from("notes")
        .upsert(
          {
            user_id:
              profileId,

            note_date:
              todayKey,

            title:
              "Bugün Kalbimde",

            content:
              text,

            category:
              "günlük",

            is_shared:
              false
          },
          {
            onConflict:
              "user_id,note_date,category"
          }
        )
        .select()
        .single();

    if (error) {
      throw error;
    }

    if (
      !dailyNotesCache[
        todayKey
      ]
    ) {
      dailyNotesCache[
        todayKey
      ] = {};
    }

    dailyNotesCache[
      todayKey
    ][activeUser] = {
      id: data.id,
      text:
        data.content,

      updatedAt:
        data.updated_at
    };

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
  } catch (error) {
    console.error(
      "Not kaydı başarısız:",
      error
    );

    showToast(
      `Not kaydedilemedi: ${
        error.message ||
        "Bilinmeyen hata"
      }`
    );
  } finally {
    saveButton.disabled =
      false;
  }
}
/* =========================================================
   AYLIK İSTATİSTİKLER
========================================================= */

function calculateMonthlyStatistics() {
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

  Object.entries(
    dailyRecordsCache
  ).forEach(
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

      Object.values(
        users
      ).forEach(record => {
        prayerCount += [
          "fajr",
          "dhuhr",
          "asr",
          "maghrib",
          "isha"
        ].filter(
          field =>
            record[field]
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
      });
    }
  );

  Object.entries(
    mutualPrayersCache
  ).forEach(
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
          Object.keys(
            users
          ).length;
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
  let streak = 0;

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const todayKey =
    formatDateKey(
      today
    );

  const todayRecords =
    dailyRecordsCache[
      todayKey
    ];

  const damlaActiveToday =
    hasAnyCompletedCheck(
      todayRecords?.damla
    );

  const hilalActiveToday =
    hasAnyCompletedCheck(
      todayRecords?.hilal
    );

  const bothActiveToday =
    damlaActiveToday &&
    hilalActiveToday;

  const cursor =
    new Date(
      today
    );

  /*
    Bugün ikiniz de aktifseniz seri bugünden sayılır.
    Bugün yalnızca biriniz aktifse veya hiç kayıt yoksa,
    devam eden seri kaybolmasın diye dünden başlanır.
  */
  if (!bothActiveToday) {
    cursor.setDate(
      cursor.getDate() - 1
    );
  }

  while (true) {
    const dateKey =
      formatDateKey(
        cursor
      );

    const dayRecords =
      dailyRecordsCache[
        dateKey
      ];

    const damlaHasActivity =
      hasAnyCompletedCheck(
        dayRecords?.damla
      );

    const hilalHasActivity =
      hasAnyCompletedCheck(
        dayRecords?.hilal
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

  if (
    !bothActiveToday &&
    streak > 0
  ) {
    streakMessage.textContent =
      `${streak} günlük ortak seriniz devam ediyor. Bugünün tamamlanması için ikinizin de en az bir kayıt eklemesi gerekiyor.`;

    return streak;
  }

  if (streak === 0) {
    streakMessage.textContent =
      "Bugün birlikte en az birer adım attığınızda yeni seriniz başlayacak.";
  } else if (
    streak < 7
  ) {
    streakMessage.textContent =
      "Küçük adımlarınız birlikte güzel bir alışkanlığa dönüşüyor.";
  } else if (
    streak < 30
  ) {
    streakMessage.textContent =
      "Birlikte devam ettiğiniz her gün manevi bahçenizi büyütüyor.";
  } else {
    streakMessage.textContent =
      "Uzun süredir birbirinize destek olarak devam ediyorsunuz.";
  }

  return streak;
}

function hasAnyCompletedCheck(
  record
) {
  if (!record) {
    return false;
  }

  return CHECK_FIELDS.some(
    field =>
      Boolean(
        record[field]
      )
  );
}

/* =========================================================
   MANEVİ BAHÇE
========================================================= */

function getSharedActiveDayCount() {
  return Object.values(
    dailyRecordsCache
  ).filter(dayRecords => {
    return (
      hasAnyCompletedCheck(
        dayRecords.damla
      ) &&
      hasAnyCompletedCheck(
        dayRecords.hilal
      )
    );
  }).length;
}

function updateGarden() {
  const sharedDays =
    getSharedActiveDayCount();

  let title =
    "Yeni Bir Tohum";

  let description =
    "Birlikte devam ettikçe bahçeniz büyüyecek.";

  let visual =
    "🌱";

  let progress =
    0;

  let progressText =
    "İlk fideye 7 ortak gün kaldı.";

  if (
    sharedDays < 7
  ) {
    progress =
      (
        sharedDays /
        7
      ) * 100;

    progressText =
      `İlk fideye ${
        7 - sharedDays
      } ortak gün kaldı.`;
  } else if (
    sharedDays < 14
  ) {
    title =
      "Küçük Bir Fide";

    description =
      "Niyetleriniz kök salmaya ve güçlenmeye başladı.";

    visual =
      "🌿";

    progress =
      (
        (
          sharedDays -
          7
        ) /
        7
      ) * 100;

    progressText =
      `İlk çiçeğe ${
        14 - sharedDays
      } ortak gün kaldı.`;
  } else if (
    sharedDays < 30
  ) {
    title =
      "Açan Bir Çiçek";

    description =
      "Birlikte gösterdiğiniz istikrar güzelliklere dönüşüyor.";

    visual =
      "🌷";

    progress =
      (
        (
          sharedDays -
          14
        ) /
        16
      ) * 100;

    progressText =
      `Ağaca ${
        30 - sharedDays
      } ortak gün kaldı.`;
  } else if (
    sharedDays < 60
  ) {
    title =
      "Güçlü Bir Ağaç";

    description =
      "Manevi yolculuğunuz artık sağlam dallara sahip.";

    visual =
      "🌳";

    progress =
      (
        (
          sharedDays -
          30
        ) /
        30
      ) * 100;

    progressText =
      `Meyve veren ağaca ${
        60 - sharedDays
      } ortak gün kaldı.`;
  } else {
    title =
      "Meyve Veren Ağaç";

    description =
      "Sabırla sürdürdüğünüz yolculuk güzel meyveler verdi.";

    visual =
      "🌳";

    progress =
      100;

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
        Math.min(
          progress,
          100
        )
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
  const sharedDays =
    getSharedActiveDayCount();

  let quranCount = 0;
  let esmaCount = 0;
  let prayerCount = 0;

  Object.values(
    dailyRecordsCache
  ).forEach(dayRecords => {
    Object.values(
      dayRecords
    ).forEach(record => {
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
        field =>
          record[field]
      ).length;
    });
  });

  const mutualPrayerCount =
    Object.values(
      mutualPrayersCache
    ).reduce(
      (
        total,
        dayPrayers
      ) =>
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
function subscribeToRealtimeUpdates() {
  window.niyetSupabase
    .channel("niyet-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "daily_checks"
      },
      async () => {
        await loadDailyRecords();

        updateAllProgress();
        calculateMonthlyStatistics();
        calculateSharedStreak();
        updateGarden();
        updateBadges();
        renderCalendar();
      }
    )
    .subscribe();
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
    ).format(
      calendarDate
    );

  calendarDays.innerHTML =
    "";

  const firstDayOfMonth =
    new Date(
      year,
      month,
      1
    );

  const lastDayOfMonth =
    new Date(
      year,
      month + 1,
      0
    );

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
      document.createElement(
        "div"
      );

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
      new Date(
        year,
        month,
        day
      );

    const dateKey =
      formatDateKey(
        date
      );

    calendarDays.appendChild(
      createCalendarDay(
        dateKey,
        day
      )
    );
  }
}

function createCalendarDay(
  dateKey,
  dayNumber
) {
  const dayRecords =
    dailyRecordsCache[
      dateKey
    ] || {};

  const damlaActive =
    hasAnyCompletedCheck(
      dayRecords.damla
    );

  const hilalActive =
    hasAnyCompletedCheck(
      dayRecords.hilal
    );

  const button =
    document.createElement(
      "button"
    );

  button.type =
    "button";

  button.className =
    "calendar-day";

  button.dataset.date =
    dateKey;

  button.setAttribute(
    "aria-label",
    `${formatReadableDate(
      dateKey
    )} kayıtlarını görüntüle`
  );

  if (
    dateKey ===
    getTodayKey()
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
    <span
      class="calendar-day-number"
    >
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
    formatReadableDate(
      dateKey
    );

  content.innerHTML =
    createDayDetailHtml(
      dateKey
    );

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
  return Object.keys(
    USERS
  )
    .map(userId => {
      const user =
        USERS[userId];

      const record =
        dailyRecordsCache[
          dateKey
        ]?.[userId] ||
        createEmptyDailyRecord();

      const completedFields =
        CHECK_FIELDS.filter(
          field =>
            record[field]
        );

      const note =
        dailyNotesCache[
          dateKey
        ]?.[userId]?.text ||
        "";

      const prayedForFriend =
        Boolean(
          mutualPrayersCache[
            dateKey
          ]?.[userId]
        );

      const completedHtml =
        completedFields.length >
        0
          ? completedFields
              .map(
                field => `
                  <span
                    class="day-detail-item"
                  >
                    ${escapeHtml(
                      FIELD_LABELS[
                        field
                      ]
                    )}
                  </span>
                `
              )
              .join("")
          : `
              <span
                class="day-detail-empty"
              >
                Bu gün için kayıt bulunmuyor.
              </span>
            `;

      return `
        <section
          class="day-detail-user"
        >
          <h3>
            ${escapeHtml(
              user.name
            )}
          </h3>

          <div
            class="day-detail-list"
          >
            ${completedHtml}

            ${
              prayedForFriend
                ? `
                  <span
                    class="day-detail-item"
                  >
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
                  ${escapeHtml(
                    note
                  )}
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

  updateThemeButton(
    newTheme
  );

  showToast(
    isLightTheme
      ? "Açık tema etkinleştirildi."
      : "Koyu tema etkinleştirildi."
  );
}

function updateThemeButton(
  theme
) {
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
      ${
        isLight
          ? "🌙"
          : "☀️"
      }
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
   TOAST
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
   YARDIMCILAR
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

function escapeHtml(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
} 
/* =========================================================
   NİYET — GÜNÜN ESMASI VE GÜNÜN SURESİ
   BU BLOĞU APP.JS DOSYASININ EN ALTINA EKLE
========================================================= */

const NIYET_DAILY_START_DATE =
  new Date(2026, 6, 16);

const NIYET_QURAN_API =
  "https://api.alquran.cloud/v1";

const NIYET_SURAH_NAMES = [
  "Fâtiha",
  "Bakara",
  "Âl-i İmrân",
  "Nisâ",
  "Mâide",
  "En‘âm",
  "A‘râf",
  "Enfâl",
  "Tevbe",
  "Yûnus",
  "Hûd",
  "Yûsuf",
  "Ra‘d",
  "İbrâhîm",
  "Hicr",
  "Nahl",
  "İsrâ",
  "Kehf",
  "Meryem",
  "Tâhâ",
  "Enbiyâ",
  "Hac",
  "Mü’minûn",
  "Nûr",
  "Furkân",
  "Şuarâ",
  "Neml",
  "Kasas",
  "Ankebût",
  "Rûm",
  "Lokmân",
  "Secde",
  "Ahzâb",
  "Sebe’",
  "Fâtır",
  "Yâsîn",
  "Sâffât",
  "Sâd",
  "Zümer",
  "Mü’min",
  "Fussilet",
  "Şûrâ",
  "Zuhruf",
  "Duhân",
  "Câsiye",
  "Ahkâf",
  "Muhammed",
  "Fetih",
  "Hucurât",
  "Kâf",
  "Zâriyât",
  "Tûr",
  "Necm",
  "Kamer",
  "Rahmân",
  "Vâkıa",
  "Hadîd",
  "Mücâdele",
  "Haşr",
  "Mümtehine",
  "Saf",
  "Cum‘a",
  "Münâfikûn",
  "Tegābün",
  "Talâk",
  "Tahrîm",
  "Mülk",
  "Kalem",
  "Hâkka",
  "Meâric",
  "Nûh",
  "Cin",
  "Müzzemmil",
  "Müddessir",
  "Kıyâmet",
  "İnsân",
  "Mürselât",
  "Nebe’",
  "Nâziât",
  "Abese",
  "Tekvîr",
  "İnfitâr",
  "Mutaffifîn",
  "İnşikāk",
  "Bürûc",
  "Târık",
  "A‘lâ",
  "Gāşiye",
  "Fecr",
  "Beled",
  "Şems",
  "Leyl",
  "Duhâ",
  "İnşirâh",
  "Tîn",
  "Alak",
  "Kadir",
  "Beyyine",
  "Zilzâl",
  "Âdiyât",
  "Kāria",
  "Tekâsür",
  "Asr",
  "Hümeze",
  "Fîl",
  "Kureyş",
  "Mâûn",
  "Kevser",
  "Kâfirûn",
  "Nasr",
  "Tebbet",
  "İhlâs",
  "Felak",
  "Nâs"
];

function niyetGetPassedDayCount() {
  const now =
    new Date();

  const today =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

  const start =
    new Date(
      NIYET_DAILY_START_DATE.getFullYear(),
      NIYET_DAILY_START_DATE.getMonth(),
      NIYET_DAILY_START_DATE.getDate()
    );

  return Math.floor(
    (today - start) /
    (1000 * 60 * 60 * 24)
  );
}

function niyetSafeText(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return String(value);
}

function niyetSafeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function niyetRenderTags(items) {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return `
      <span class="niyet-esma-tag">
        Bilgi bulunmuyor
      </span>
    `;
  }

  return items
    .map(
      item => `
        <span class="niyet-esma-tag">
          ${niyetSafeHtml(item)}
        </span>
      `
    )
    .join("");
}

/* =========================================================
   ESMÂ KARTININ HTML YAPISI
========================================================= */

function niyetPrepareEsmaCard() {
  const oldName =
    document.getElementById(
      "dailyEsmaName"
    );

  const card =
    oldName?.closest(
      ".content-card"
    ) ||
    document.querySelector(
      ".esma-card"
    );

  if (!card) {
    console.error(
      "Esma kartı bulunamadı."
    );

    return null;
  }

  card.classList.add(
    "esma-card",
    "niyet-detailed-esma-card"
  );

  card.innerHTML = `
    <div class="content-card-header">
      <div
        class="content-icon"
        aria-hidden="true"
      >
        🌿
      </div>

      <div>
        <span class="content-label">
          Günün Esması
        </span>

        <h3 id="dailyEsmaName">
          Esma yükleniyor...
        </h3>

        <small id="dailyEsmaTransliteration">
          Günlük Esma hazırlanıyor
        </small>
      </div>
    </div>

    <div class="content-card-body">
      <p
        class="arabic-text"
        id="dailyEsmaArabic"
        lang="ar"
      >
        —
      </p>

      <p
        class="content-meaning"
        id="dailyEsmaMeaning"
      >
        Esmanın anlamı hazırlanıyor...
      </p>

      <div class="content-meta">
        <span>
          Geleneksel tekrar
        </span>

        <strong id="dailyEsmaCount">
          —
        </strong>
      </div>

      <p
        class="gentle-note"
        id="dailyEsmaCountNote"
      >
        Tekrar bilgisi hazırlanıyor...
      </p>

      <details class="niyet-esma-details">
        <summary>
          Esmayı ayrıntılı incele
        </summary>

        <div class="niyet-esma-detail-content">

          <section class="niyet-esma-section">
            <h4>Kısa anlamı</h4>
            <p id="dailyEsmaShortMeaning">—</p>
          </section>

          <section class="niyet-esma-section">
            <h4>Detaylı anlamı</h4>
            <p id="dailyEsmaDetailedMeaning">—</p>
          </section>

          <section class="niyet-esma-section">
            <h4>Bildirdiği ilahî sıfatlar</h4>
            <p id="dailyEsmaAttributes">—</p>
          </section>

          <section class="niyet-esma-section">
            <h4>Kur’an’daki bağlamı</h4>

            <p id="dailyEsmaQuranContext">
              —
            </p>

            <div
              class="niyet-esma-tags"
              id="dailyEsmaQuranReferences"
            ></div>
          </section>

          <section class="niyet-esma-section">
            <h4>İnsandaki güzel yansıması</h4>

            <p id="dailyEsmaHumanReflection">
              —
            </p>
          </section>

          <section class="niyet-esma-section">
            <h4>Bu yönün eksikliğinde</h4>

            <p id="dailyEsmaDeficiency">
              —
            </p>
          </section>

          <section class="niyet-esma-section">
            <h4>Dengenin bozulması hâlinde</h4>

            <p id="dailyEsmaExcess">
              —
            </p>
          </section>

          <section class="niyet-esma-section">
            <h4>Hangi konularda okunabilir?</h4>

            <div
              class="niyet-esma-tags"
              id="dailyEsmaTopics"
            ></div>
          </section>

          <section class="niyet-esma-section">
            <h4>Geleneksel kullanım alanı</h4>

            <p id="dailyEsmaTraditionalBenefits">
              —
            </p>
          </section>

          <section class="niyet-esma-section">
            <h4>Okuma biçimi</h4>

            <p id="dailyEsmaMethod">
              —
            </p>
          </section>

          <section class="niyet-esma-section">
            <h4>Önerilen zaman</h4>

            <p id="dailyEsmaSuggestedTime">
              —
            </p>
          </section>

          <section
            class="
              niyet-esma-section
              niyet-esma-prayer
            "
          >
            <h4>Bu Esma ile dua</h4>

            <blockquote id="dailyEsmaPrayer">
              —
            </blockquote>
          </section>

          <section class="niyet-esma-section">
            <h4>Bugünün tefekkürü</h4>

            <p id="dailyEsmaContemplation">
              —
            </p>
          </section>

          <details class="niyet-esma-sources">
            <summary>
              Kaynakları göster
            </summary>

            <div>
              <p>
                <strong>TDV:</strong>
                <span id="dailyEsmaTdvSource">—</span>
              </p>

              <p>
                <strong>Diyanet:</strong>
                <span id="dailyEsmaDiyanetSource">—</span>
              </p>

              <p>
                <strong>Gazzâlî:</strong>
                <span id="dailyEsmaGhazaliSource">—</span>
              </p>

              <p>
                <strong>Elmalılı:</strong>
                <span id="dailyEsmaElmaliliSource">—</span>
              </p>

              <p>
                <strong>Geleneksel kaynak:</strong>
                <span id="dailyEsmaTraditionalSource">—</span>
              </p>
            </div>
          </details>
        </div>
      </details>
    </div>

    <button
      type="button"
      class="soft-button"
      id="markEsmaCompleteButton"
    >
      <span aria-hidden="true">✓</span>
      Okudum
    </button>
  `;

  return card;
}

/* =========================================================
   ESMAYI SUPABASE'TEN GETİR
========================================================= */

async function niyetLoadDailyEsma() {
  if (
    !window.niyetSupabase ||
    typeof window.niyetSupabase
      .from !== "function"
  ) {
    throw new Error(
      "Supabase bağlantısı bulunamadı."
    );
  }

  const passedDays =
    niyetGetPassedDayCount();

  /*
    Şu anda 15 Esma var.
    İleride 99'a tamamlandığında bütün sıra
    otomatik olarak çalışacak.
  */
  const { data: availableNames, error: listError } =
    await window.niyetSupabase
      .from("divine_names")
      .select("display_order")
      .eq("is_active", true)
      .order("display_order", {
        ascending: true
      });

  if (listError) {
    throw listError;
  }

  if (
    !availableNames ||
    availableNames.length === 0
  ) {
    throw new Error(
      "Supabase divine_names tablosu boş."
    );
  }

  /*
    Listedeki bütün Esmalar tamamlanmadan
    hata vermemesi için mevcut kayıtlar içinde
    günlük sıra dönüyor.

    99 isim tamamlanınca 99 günlük döngü olur.
  */
  const listIndex =
    (
      (
        passedDays %
        availableNames.length
      ) +
      availableNames.length
    ) %
    availableNames.length;

  const requestedOrder =
    availableNames[listIndex]
      .display_order;

  const { data, error } =
    await window.niyetSupabase
      .from("divine_names")
      .select(`
        display_order,
        name_latin,
        name_arabic,
        transliteration,
        root_letters,
        short_meaning,
        detailed_meaning,
        divine_attributes,
        quran_context,
        quran_references,
        human_reflection,
        deficiency_effect,
        excess_effect,
        spiritual_topics,
        traditional_benefits,
        traditional_count,
        repetition_basis,
        repetition_note,
        recommended_method,
        suggested_time,
        prayer_example,
        contemplation_question,
        tdv_source,
        diyanet_source,
        ghazali_source,
        elmalili_source,
        traditional_source
      `)
      .eq(
        "display_order",
        requestedOrder
      )
      .eq("is_active", true)
      .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(
      "Bugünün Esması bulunamadı."
    );
  }

  niyetRenderDailyEsma(data);

  return data;
}

function niyetRenderDailyEsma(esma) {
  setText(
    "dailyEsmaName",
    niyetSafeText(
      esma.name_latin
    )
  );

  setText(
    "dailyEsmaArabic",
    niyetSafeText(
      esma.name_arabic
    )
  );

  setText(
    "dailyEsmaTransliteration",
    niyetSafeText(
      esma.transliteration
    )
  );

  setText(
    "dailyEsmaMeaning",
    niyetSafeText(
      esma.short_meaning
    )
  );

  setText(
    "dailyEsmaShortMeaning",
    niyetSafeText(
      esma.short_meaning
    )
  );

  setText(
    "dailyEsmaDetailedMeaning",
    niyetSafeText(
      esma.detailed_meaning
    )
  );

  setText(
    "dailyEsmaAttributes",
    niyetSafeText(
      esma.divine_attributes
    )
  );

  setText(
    "dailyEsmaQuranContext",
    niyetSafeText(
      esma.quran_context
    )
  );

  setText(
    "dailyEsmaHumanReflection",
    niyetSafeText(
      esma.human_reflection
    )
  );

  setText(
    "dailyEsmaDeficiency",
    niyetSafeText(
      esma.deficiency_effect
    )
  );

  setText(
    "dailyEsmaExcess",
    niyetSafeText(
      esma.excess_effect
    )
  );

  setText(
    "dailyEsmaTraditionalBenefits",
    niyetSafeText(
      esma.traditional_benefits
    )
  );

  setText(
    "dailyEsmaMethod",
    niyetSafeText(
      esma.recommended_method
    )
  );

  setText(
    "dailyEsmaSuggestedTime",
    niyetSafeText(
      esma.suggested_time
    )
  );

  setText(
    "dailyEsmaPrayer",
    niyetSafeText(
      esma.prayer_example
    )
  );

  setText(
    "dailyEsmaContemplation",
    niyetSafeText(
      esma.contemplation_question
    )
  );

  setText(
    "dailyEsmaTdvSource",
    niyetSafeText(
      esma.tdv_source
    )
  );

  setText(
    "dailyEsmaDiyanetSource",
    niyetSafeText(
      esma.diyanet_source
    )
  );

  setText(
    "dailyEsmaGhazaliSource",
    niyetSafeText(
      esma.ghazali_source
    )
  );

  setText(
    "dailyEsmaElmaliliSource",
    niyetSafeText(
      esma.elmalili_source
    )
  );

  setText(
    "dailyEsmaTraditionalSource",
    niyetSafeText(
      esma.traditional_source
    )
  );

  setText(
    "dailyEsmaCount",
    esma.traditional_count
      ? `${esma.traditional_count} defa`
      : "Belirli sayı yok"
  );

  setText(
    "dailyEsmaCountNote",
    niyetSafeText(
      esma.repetition_note
    )
  );

  const referenceContainer =
    document.getElementById(
      "dailyEsmaQuranReferences"
    );

  if (referenceContainer) {
    referenceContainer.innerHTML =
      niyetRenderTags(
        esma.quran_references
      );
  }

  const topicContainer =
    document.getElementById(
      "dailyEsmaTopics"
    );

  if (topicContainer) {
    topicContainer.innerHTML =
      niyetRenderTags(
        esma.spiritual_topics
      );
  }
}

/* =========================================================
   SURE KARTININ HTML YAPISI
========================================================= */

function niyetPrepareSurahCard() {
  const oldVerseElement =
    document.getElementById(
      "dailyVerseSource"
    ) ||
    document.getElementById(
      "dailyVerseArabic"
    );

  let card =
    oldVerseElement?.closest(
      ".content-card"
    );

  if (!card) {
    const cards =
      Array.from(
        document.querySelectorAll(
          ".daily-content-grid .content-card"
        )
      );

    card =
      cards.find(
        item =>
          item.textContent.includes(
            "Günün Ayeti"
          ) ||
          item.textContent.includes(
            "Günün Suresi"
          )
      );
  }

  if (!card) {
    console.error(
      "Sure kartı bulunamadı."
    );

    return null;
  }

  card.classList.add(
    "niyet-surah-card"
  );

  card.innerHTML = `
    <div class="content-card-header">
      <div
        class="content-icon"
        aria-hidden="true"
      >
        📖
      </div>

      <div>
        <span class="content-label">
          Günün Suresi
        </span>

        <h3 id="dailySurahName">
          Sure yükleniyor...
        </h3>

        <small id="dailySurahMeta">
          Kur’an verisi hazırlanıyor
        </small>
      </div>
    </div>

    <div class="content-card-body">
      <p
        class="gentle-note"
        id="dailySurahLoadingMessage"
      >
        Sure hazırlanıyor...
      </p>

      <details class="niyet-surah-details">
        <summary>
          Türkçe mealin tamamını oku
        </summary>

        <div
          class="niyet-surah-list"
          id="dailySurahTranslation"
        ></div>

        <p
          class="gentle-note"
          id="dailySurahTranslationSource"
        ></p>
      </details>

      <details class="niyet-surah-details">
        <summary>
          Arapça metni oku
        </summary>

        <div
          class="
            niyet-surah-list
            niyet-arabic-surah
          "
          id="dailySurahArabic"
          lang="ar"
        ></div>
      </details>

      <details class="niyet-surah-details">
        <summary>
          Kısa tefsiri oku
        </summary>

        <p id="dailySurahTafsir">
          Kısa tefsir daha sonra eklenecek.
        </p>

        <p
          class="gentle-note"
          id="dailySurahTafsirSource"
        >
          Tefsir kaynağı hazırlanıyor.
        </p>
      </details>
    </div>
  `;

  return card;
}

/* =========================================================
   GÜNÜN SURESİNİ GETİR
========================================================= */

function niyetGetDailySurahNumber() {
  const passedDays =
    niyetGetPassedDayCount();

  return (
    (
      (
        passedDays %
        114
      ) +
      114
    ) %
    114
  ) + 1;
}

async function niyetFetchJson(url) {
  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Kur’an servisi hata verdi: ${response.status}`
    );
  }

  const result =
    await response.json();

  if (
    result.code !== 200 ||
    !result.data
  ) {
    throw new Error(
      result.status ||
      "Kur’an verisi alınamadı."
    );
  }

  return result.data;
}

async function niyetLoadDailySurah() {
  const surahNumber =
    niyetGetDailySurahNumber();

  const [
    arabicData,
    translationData
  ] =
    await Promise.all([
      niyetFetchJson(
        `${NIYET_QURAN_API}/surah/${surahNumber}/quran-uthmani`
      ),

      niyetFetchJson(
        `${NIYET_QURAN_API}/surah/${surahNumber}/tr.yazir`
      )
    ]);

  const surahName =
    NIYET_SURAH_NAMES[
      surahNumber - 1
    ] ||
    translationData.englishName;

  setText(
    "dailySurahName",
    `${surahNumber}. ${surahName} Suresi`
  );

  const revelationText =
    translationData.revelationType ===
    "Meccan"
      ? "Mekkî"
      : translationData.revelationType ===
        "Medinan"
        ? "Medenî"
        : "Sure";

  setText(
    "dailySurahMeta",
    `${revelationText} · ${translationData.numberOfAyahs} ayet`
  );

  const translationContainer =
    document.getElementById(
      "dailySurahTranslation"
    );

  if (translationContainer) {
    translationContainer.innerHTML =
      translationData.ayahs
        .map(
          ayah => `
            <article class="niyet-surah-ayah">
              <span class="niyet-ayah-number">
                ${ayah.numberInSurah}
              </span>

              <p>
                ${niyetSafeHtml(
                  ayah.text
                )}
              </p>
            </article>
          `
        )
        .join("");
  }

  const arabicContainer =
    document.getElementById(
      "dailySurahArabic"
    );

  if (arabicContainer) {
    arabicContainer.innerHTML =
      arabicData.ayahs
        .map(
          ayah => `
            <article
              class="
                niyet-surah-ayah
                niyet-arabic-ayah
              "
            >
              <span class="niyet-ayah-number">
                ${ayah.numberInSurah}
              </span>

              <p lang="ar">
                ${niyetSafeHtml(
                  ayah.text
                )}
              </p>
            </article>
          `
        )
        .join("");
  }

  setText(
    "dailySurahTranslationSource",
    "Meal: Elmalılı Hamdi Yazır · Veri: Al Quran Cloud"
  );

  setText(
    "dailySurahLoadingMessage",
    ""
  );

  setText(
    "dailySurahTafsir",
    `${surahName} Suresi için kısa tefsir metni daha sonra eklenecek.`
  );

  setText(
    "dailySurahTafsirSource",
    "Kısa tefsir kaynağı hazırlanıyor."
  );
}

/* =========================================================
   GÜNLÜK DUA
========================================================= */

async function niyetLoadDailyPrayer() {
  if (
    !window.niyetSupabase ||
    typeof window.niyetSupabase
      .from !== "function"
  ) {
    return;
  }

  const { data, error } =
    await window.niyetSupabase
      .from("daily_prayers")
      .select(`
        title,
        content,
        source_name,
        source_reference,
        display_order
      `)
      .eq("is_active", true)
      .order("display_order", {
        ascending: true
      });

  if (
    error ||
    !data ||
    data.length === 0
  ) {
    if (error) {
      console.error(
        "Günün duası alınamadı:",
        error
      );
    }

    return;
  }

  const passedDays =
    niyetGetPassedDayCount();

  const prayerIndex =
    (
      (
        passedDays %
        data.length
      ) +
      data.length
    ) %
    data.length;

  const prayer =
    data[prayerIndex];

  setText(
    "dailyPrayerTitle",
    prayer.title
  );

  setText(
    "dailyPrayerText",
    prayer.content
  );

  const sourceParts = [
    prayer.source_name,
    prayer.source_reference
  ].filter(Boolean);

  setText(
    "dailyPrayerSource",
    sourceParts.length
      ? `Kaynak: ${sourceParts.join(" · ")}`
      : "Tür: Genel dua"
  );
}

/* =========================================================
   TÜM GÜNLÜK İÇERİĞİ YÜKLE
========================================================= */

async function renderDailyContent() {
  niyetPrepareEsmaCard();
  niyetPrepareSurahCard();

  const today =
    new Date();

  const dayNumber =
    getDayNumberOfYear(today);

  const fallbackContent =
    DAILY_CONTENT[
      dayNumber %
      DAILY_CONTENT.length
    ];

  const results =
    await Promise.allSettled([
      niyetLoadDailyEsma(),
      niyetLoadDailySurah(),
      niyetLoadDailyPrayer()
    ]);

  const [
    esmaResult,
    surahResult,
    prayerResult
  ] = results;

  if (
    esmaResult.status ===
    "rejected"
  ) {
    console.error(
      "Esma yüklenemedi:",
      esmaResult.reason
    );

    setText(
      "dailyEsmaName",
      fallbackContent.esma.name
    );

    setText(
      "dailyEsmaArabic",
      fallbackContent.esma.arabic
    );

    setText(
      "dailyEsmaMeaning",
      fallbackContent.esma.meaning
    );

    setText(
      "dailyEsmaCount",
      fallbackContent.esma.count
    );

    setText(
      "dailyEsmaCountNote",
      esmaResult.reason?.message ||
      "Supabase kaydı alınamadı."
    );
  }

  if (
    surahResult.status ===
    "rejected"
  ) {
    console.error(
      "Sure yüklenemedi:",
      surahResult.reason
    );

    setText(
      "dailySurahName",
      "Sure yüklenemedi"
    );

    setText(
      "dailySurahMeta",
      surahResult.reason?.message ||
      "Kur’an servisine ulaşılamadı."
    );

    setText(
      "dailySurahLoadingMessage",
      "Kur’an verisi alınamadı."
    );
  }

  if (
    prayerResult.status ===
    "rejected"
  ) {
    console.error(
      "Dua yüklenemedi:",
      prayerResult.reason
    );
  }

  setText(
    "dailyChallengeText",
    fallbackContent.challenge
  );

  /*
    Kartlar yeniden oluşturulduğu için
    günlük kart butonlarının olaylarını
    yeniden bağlıyoruz.
  */
  const markEsmaButton =
    document.getElementById(
      "markEsmaCompleteButton"
    );

  markEsmaButton?.addEventListener(
    "click",
    () => {
      toggleDailyContentAction(
        "esma",
        markEsmaButton,
        "Esma kaydedildi."
      );

      synchronizeCheckboxWithContent(
        "asma"
      );
    }
  );
}

/* =========================================================
   UYGULAMA BAŞLANGICINI ASENKRON HALE GETİR
========================================================= */

/* =========================================================
   GEREKLİ TASARIMI OTOMATİK EKLE
========================================================= */

(function niyetAddDailyContentStyles() {
  if (
    document.getElementById(
      "niyetDailyContentStyles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "niyetDailyContentStyles";

  style.textContent = `
    .niyet-detailed-esma-card,
    .niyet-surah-card {
      align-self: start;
    }

    #dailyEsmaTransliteration {
      display: block;
      margin-top: 4px;
      opacity: 0.72;
      font-size: 0.78rem;
    }

    .niyet-esma-details,
    .niyet-surah-details {
      margin-top: 16px;
    }

    .niyet-esma-details > summary,
    .niyet-surah-details > summary,
    .niyet-esma-sources > summary {
      cursor: pointer;
      font-weight: 700;
      line-height: 1.5;
    }

    .niyet-esma-detail-content {
      display: grid;
      gap: 14px;
      margin-top: 16px;
    }

    .niyet-esma-section {
      padding: 15px;
      border:
        1px solid
        rgba(140, 160, 130, 0.17);
      border-radius: 14px;
      background:
        rgba(140, 160, 130, 0.055);
    }

    .niyet-esma-section h4 {
      margin: 0 0 8px;
      font-size: 0.91rem;
    }

    .niyet-esma-section p {
      margin: 0;
      line-height: 1.75;
    }

    .niyet-esma-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .niyet-esma-tag {
      display: inline-flex;
      padding: 6px 10px;
      border:
        1px solid
        rgba(140, 160, 130, 0.2);
      border-radius: 999px;
      font-size: 0.77rem;
      line-height: 1.3;
    }

    .niyet-esma-prayer blockquote {
      margin: 0;
      padding-left: 14px;
      border-left:
        3px solid
        rgba(140, 170, 120, 0.55);
      line-height: 1.8;
    }

    .niyet-esma-sources {
      padding: 14px;
      border:
        1px dashed
        rgba(140, 160, 130, 0.25);
      border-radius: 14px;
    }

    .niyet-esma-sources div {
      display: grid;
      gap: 10px;
      margin-top: 14px;
    }

    .niyet-esma-sources p {
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.65;
    }

    .niyet-surah-list {
      display: grid;
      gap: 12px;
      max-height: 520px;
      margin-top: 16px;
      padding-right: 6px;
      overflow-y: auto;
    }

    .niyet-surah-ayah {
      display: grid;
      grid-template-columns:
        34px minmax(0, 1fr);
      gap: 10px;
      padding: 12px;
      border:
        1px solid
        rgba(140, 160, 130, 0.15);
      border-radius: 12px;
    }

    .niyet-surah-ayah p {
      margin: 0;
      line-height: 1.75;
    }

    .niyet-ayah-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background:
        rgba(140, 170, 120, 0.12);
      font-size: 0.72rem;
    }

    .niyet-arabic-ayah p {
      direction: rtl;
      text-align: right;
      font-size: 1.15rem;
      line-height: 2.15;
    }

    @media (max-width: 700px) {
      .niyet-surah-list {
        max-height: 430px;
      }

      .niyet-esma-section {
        padding: 13px;
      }
    }
  `;

  document.head.appendChild(style);
})();
