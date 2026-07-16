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

  activeUser =
    authenticatedUser.username;

  await initializeApplication();
});

async function initializeApplication() {
  applySavedTheme();
  renderCurrentDate();
  renderCurrentYear();
  renderDailyContent();
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

function renderDailyContent() {
  const today = new Date();

  const dayNumber =
    getDayNumberOfYear(today);

  const content =
    DAILY_CONTENT[
      dayNumber %
        DAILY_CONTENT.length
    ];

  setText(
    "dailyEsmaName",
    content.esma.name
  );

  setText(
    "dailyEsmaArabic",
    content.esma.arabic
  );

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
    new Date(
      date.getFullYear(),
      0,
      0
    );

  const difference =
    date - startOfYear;

  const oneDay =
    1000 * 60 * 60 * 24;

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
  const profileId =
    profileIds[activeUser];

  if (!profileId) {
    showToast(
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
    window
      .niyetAuthenticatedUser
      ?.username;

  if (
    !authenticatedUsername ||
    !USERS[
      authenticatedUsername
    ] ||
    userId !==
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

async function loadProfileIds() {
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
        String(
          profile.username
        ).toLowerCase();

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
    profileIds[userId];

  if (!profileId) {
    throw new Error(
      "Kullanıcı profil ID'si bulunamadı."
    );
  }

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

  const fromProfileId =
    profileIds[fromUser];

  const toProfileId =
    profileIds[toUser];

  if (
    !fromProfileId ||
    !toProfileId
  ) {
    showToast(
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
  const profileId =
    profileIds[activeUser];

  if (!profileId) {
    showToast(
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

  const profileId =
    profileIds[activeUser];

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

  const profileId =
    profileIds[activeUser];

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

  const cursor =
    new Date();

  cursor.setHours(
    0,
    0,
    0,
    0
  );

  while (true) {
    const dateKey =
      formatDateKey(cursor);

    const dayRecords =
      dailyRecordsCache[
        dateKey
      ];

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
