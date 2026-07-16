"use strict";

/* =========================================================
   NİYET - KUR'AN İÇERİĞİ
   Kaynak: Al Quran Cloud
   Meal: Elmalılı Hamdi Yazır - tr.yazir
========================================================= */

const NIYET_QURAN_API =
  "https://api.alquran.cloud/v1";

/*
  Günlük içerikte gösterilecek ayetler.

  Bütün Kur'an'dan rastgele ayet seçmiyoruz.
  Çünkü bazı ayetlerin anlaşılması için önceki ve sonraki
  ayetlerin bağlamı gerekebilir.

  Buradaki referanslar zamanla çoğaltılabilir.
*/
const NIYET_DAILY_AYAH_REFERENCES = [
  "2:152",
  "2:153",
  "2:186",
  "2:286",
  "3:8",
  "3:26",
  "3:31",
  "3:92",
  "3:103",
  "3:134",
  "3:139",
  "3:159",
  "3:173",
  "5:8",
  "5:35",
  "7:23",
  "7:56",
  "8:2",
  "8:46",
  "9:40",
  "9:51",
  "9:71",
  "10:57",
  "10:62",
  "10:107",
  "11:6",
  "11:88",
  "12:87",
  "13:11",
  "13:28",
  "13:29",
  "14:7",
  "14:40",
  "15:49",
  "16:18",
  "16:90",
  "16:97",
  "17:23",
  "17:24",
  "17:70",
  "18:10",
  "18:46",
  "20:25",
  "20:26",
  "20:114",
  "21:83",
  "21:87",
  "21:89",
  "22:40",
  "23:1",
  "23:8",
  "24:22",
  "24:35",
  "25:63",
  "25:74",
  "26:80",
  "27:19",
  "28:24",
  "28:77",
  "29:45",
  "29:69",
  "30:21",
  "30:60",
  "31:17",
  "31:18",
  "33:21",
  "33:35",
  "33:41",
  "33:56",
  "35:15",
  "39:9",
  "39:10",
  "39:53",
  "40:44",
  "40:60",
  "41:30",
  "41:34",
  "42:38",
  "48:4",
  "49:10",
  "49:12",
  "50:16",
  "51:56",
  "53:39",
  "55:13",
  "57:4",
  "57:20",
  "57:23",
  "59:18",
  "59:21",
  "64:15",
  "65:2",
  "65:3",
  "65:7",
  "66:8",
  "67:2",
  "68:4",
  "73:8",
  "89:27",
  "89:28",
  "93:3",
  "93:5",
  "93:11",
  "94:5",
  "94:6",
  "94:7",
  "94:8",
  "97:1",
  "103:1",
  "103:2",
  "103:3",
  "108:1",
  "112:1"
];

function getNiyetDayNumber(date = new Date()) {
  const start =
    new Date(
      date.getFullYear(),
      0,
      0
    );

  const difference =
    date - start;

  return Math.floor(
    difference /
      (1000 * 60 * 60 * 24)
  );
}

function getNiyetDailyAyahReference() {
  const dayNumber =
    getNiyetDayNumber();

  const index =
    dayNumber %
    NIYET_DAILY_AYAH_REFERENCES.length;

  return NIYET_DAILY_AYAH_REFERENCES[
    index
  ];
}

async function fetchQuranEdition(
  reference,
  edition
) {
  const response =
    await fetch(
      `${NIYET_QURAN_API}/ayah/${encodeURIComponent(
        reference
      )}/${encodeURIComponent(
        edition
      )}`
    );

  if (!response.ok) {
    throw new Error(
      `Kur'an API isteği başarısız oldu: ${response.status}`
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
      "Ayet verisi alınamadı."
    );
  }

  return result.data;
}

async function loadNiyetDailyAyah() {
  const reference =
    getNiyetDailyAyahReference();

  const [
    arabicAyah,
    elmaliliAyah
  ] = await Promise.all([
    fetchQuranEdition(
      reference,
      "quran-uthmani"
    ),

    fetchQuranEdition(
      reference,
      "tr.yazir"
    )
  ]);

  return {
    reference,

    surahNumber:
      arabicAyah.surah.number,

    surahName:
      arabicAyah.surah.englishName,

    surahArabicName:
      arabicAyah.surah.name,

    ayahNumber:
      arabicAyah.numberInSurah,

    arabicText:
      arabicAyah.text,

    translation:
      elmaliliAyah.text,

    translationSource:
      "Elmalılı Hamdi Yazır",

    apiSource:
      "Al Quran Cloud"
  };
}

window.niyetQuran = {
  loadDailyAyah:
    loadNiyetDailyAyah,

  getDailyReference:
    getNiyetDailyAyahReference
};
