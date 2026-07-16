"use strict";

/* =========================================================
   NİYET - GÜNÜN SURESİ
   Arapça: quran-uthmani
   Türkçe meal: Elmalılı Hamdi Yazır / tr.yazir
========================================================= */

const NIYET_QURAN_API =
  "https://api.alquran.cloud/v1";

/*
  1 Ocak 2026 tarihinde Fâtiha ile başlar.
  Her gün sıradaki sure gösterilir.
  114. sure sonrasında tekrar Fâtiha'ya döner.
*/
const NIYET_SURAH_START_DATE =
  new Date(2026, 0, 1);

function getNiyetDayDifference(
  date = new Date()
) {
  const currentDate =
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

  const startDate =
    new Date(
      NIYET_SURAH_START_DATE.getFullYear(),
      NIYET_SURAH_START_DATE.getMonth(),
      NIYET_SURAH_START_DATE.getDate()
    );

  const oneDay =
    1000 * 60 * 60 * 24;

  return Math.floor(
    (
      currentDate -
      startDate
    ) / oneDay
  );
}

function getNiyetDailySurahNumber() {
  const dayDifference =
    getNiyetDayDifference();

  /*
    Tarih başlangıçtan önce olsa bile
    sonucu 1-114 arasında tutar.
  */
  const normalizedIndex =
    (
      (
        dayDifference %
        114
      ) +
      114
    ) %
    114;

  return normalizedIndex + 1;
}

async function fetchSurahEdition(
  surahNumber,
  edition
) {
  const url =
    `${NIYET_QURAN_API}/surah/` +
    `${surahNumber}/` +
    `${encodeURIComponent(edition)}`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Kur'an servisi hata verdi: ${response.status}`
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
      "Sure verisi alınamadı."
    );
  }

  return result.data;
}

async function loadNiyetDailySurah() {
  const surahNumber =
    getNiyetDailySurahNumber();

  const [
    arabicSurah,
    translationSurah
  ] = await Promise.all([
    fetchSurahEdition(
      surahNumber,
      "quran-uthmani"
    ),

    fetchSurahEdition(
      surahNumber,
      "tr.yazir"
    )
  ]);

  return {
    number:
      arabicSurah.number,

    name:
      arabicSurah.englishName,

    turkishName:
      getTurkishSurahName(
        arabicSurah.number
      ),

    arabicName:
      arabicSurah.name,

    ayahCount:
      arabicSurah.numberOfAyahs,

    revelationType:
      arabicSurah.revelationType,

    arabicAyahs:
      arabicSurah.ayahs.map(
        ayah => ({
          number:
            ayah.numberInSurah,

          text:
            ayah.text
        })
      ),

    translationAyahs:
      translationSurah.ayahs.map(
        ayah => ({
          number:
            ayah.numberInSurah,

          text:
            ayah.text
        })
      ),

    translationSource:
      "Elmalılı Hamdi Yazır",

    dataSource:
      "Al Quran Cloud"
  };
}

function getTurkishSurahName(
  surahNumber
) {
  const names = [
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
    "İbrâhim",
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
    "Cuma",
    "Münâfikûn",
    "Tegâbün",
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
    "İnsan",
    "Mürselât",
    "Nebe’",
    "Nâziât",
    "Abese",
    "Tekvîr",
    "İnfitâr",
    "Mutaffifîn",
    "İnşikâk",
    "Bürûc",
    "Târık",
    "A‘lâ",
    "Gâşiye",
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
    "Kâria",
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

  return (
    names[
      surahNumber - 1
    ] ||
    `Sure ${surahNumber}`
  );
}

function getRevelationTypeText(
  revelationType
) {
  return revelationType ===
    "Meccan"
    ? "Mekke döneminde inmiştir"
    : "Medine döneminde inmiştir";
}

window.niyetQuran = {
  loadDailySurah:
    loadNiyetDailySurah,

  getDailySurahNumber:
    getNiyetDailySurahNumber,

  getRevelationTypeText
};
