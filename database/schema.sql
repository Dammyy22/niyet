
-- =========================================================
-- NİYET - CLOUDFLARE D1 VERİTABANI ŞEMASI
-- =========================================================

PRAGMA foreign_keys = ON;

-- =========================================================
-- KULLANICILAR
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT NOT NULL,

  username TEXT NOT NULL UNIQUE,

  password_hash TEXT NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  is_active INTEGER NOT NULL DEFAULT 1
    CHECK (is_active IN (0, 1))
);

-- =========================================================
-- GÜNLÜK İBADET VE GELİŞİM KAYITLARI
-- =========================================================

CREATE TABLE IF NOT EXISTS daily_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  date TEXT NOT NULL,

  fajr INTEGER NOT NULL DEFAULT 0
    CHECK (fajr IN (0, 1)),

  dhuhr INTEGER NOT NULL DEFAULT 0
    CHECK (dhuhr IN (0, 1)),

  asr INTEGER NOT NULL DEFAULT 0
    CHECK (asr IN (0, 1)),

  maghrib INTEGER NOT NULL DEFAULT 0
    CHECK (maghrib IN (0, 1)),

  isha INTEGER NOT NULL DEFAULT 0
    CHECK (isha IN (0, 1)),

  asma INTEGER NOT NULL DEFAULT 0
    CHECK (asma IN (0, 1)),

  quran INTEGER NOT NULL DEFAULT 0
    CHECK (quran IN (0, 1)),

  tafsir INTEGER NOT NULL DEFAULT 0
    CHECK (tafsir IN (0, 1)),

  dua INTEGER NOT NULL DEFAULT 0
    CHECK (dua IN (0, 1)),

  tafakkur INTEGER NOT NULL DEFAULT 0
    CHECK (tafakkur IN (0, 1)),

  challenge INTEGER NOT NULL DEFAULT 0
    CHECK (challenge IN (0, 1)),

  daily_prayer_amen INTEGER NOT NULL DEFAULT 0
    CHECK (daily_prayer_amen IN (0, 1)),

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  UNIQUE (user_id, date)
);

-- =========================================================
-- GÜNLÜK MANEVİ İÇERİK
-- =========================================================

CREATE TABLE IF NOT EXISTS daily_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  date TEXT NOT NULL UNIQUE,

  asma_name TEXT NOT NULL,

  asma_arabic TEXT,

  asma_meaning TEXT NOT NULL,

  asma_count INTEGER,

  verse_surah TEXT NOT NULL,

  verse_number TEXT,

  verse_arabic TEXT,

  verse_reading TEXT,

  verse_translation TEXT NOT NULL,

  verse_tafsir TEXT,

  daily_dua TEXT NOT NULL,

  challenge TEXT NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- BİRBİRİNE DUA ETME KAYITLARI
-- =========================================================

CREATE TABLE IF NOT EXISTS prayers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  from_user_id INTEGER NOT NULL,

  to_user_id INTEGER NOT NULL,

  date TEXT NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (from_user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (to_user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CHECK (from_user_id != to_user_id),

  UNIQUE (from_user_id, to_user_id, date)
);

-- =========================================================
-- ORTAK DUALAR
-- =========================================================

CREATE TABLE IF NOT EXISTS shared_prayers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  prayer_text TEXT NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  is_deleted INTEGER NOT NULL DEFAULT 0
    CHECK (is_deleted IN (0, 1)),

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================================================
-- ORTAK DUALARA ÂMİN KAYITLARI
-- =========================================================

CREATE TABLE IF NOT EXISTS prayer_amens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  prayer_id INTEGER NOT NULL,

  user_id INTEGER NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (prayer_id)
    REFERENCES shared_prayers(id)
    ON DELETE CASCADE,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  UNIQUE (prayer_id, user_id)
);

-- =========================================================
-- GÜNLÜK KİŞİSEL NOTLAR
-- =========================================================

CREATE TABLE IF NOT EXISTS daily_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  date TEXT NOT NULL,

  note_text TEXT NOT NULL DEFAULT "",

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  UNIQUE (user_id, date)
);

-- =========================================================
-- ROZETLER
-- =========================================================

CREATE TABLE IF NOT EXISTS badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  badge_key TEXT NOT NULL UNIQUE,

  title TEXT NOT NULL,

  description TEXT NOT NULL,

  icon TEXT,

  requirement_type TEXT NOT NULL,

  requirement_value INTEGER NOT NULL DEFAULT 1,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- KULLANICI ROZETLERİ
-- =========================================================

CREATE TABLE IF NOT EXISTS user_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  badge_id INTEGER NOT NULL,

  earned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (badge_id)
    REFERENCES badges(id)
    ON DELETE CASCADE,

  UNIQUE (user_id, badge_id)
);

-- =========================================================
-- ORTAK ROZETLER
-- =========================================================

CREATE TABLE IF NOT EXISTS shared_badges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  badge_id INTEGER NOT NULL,

  earned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (badge_id)
    REFERENCES badges(id)
    ON DELETE CASCADE,

  UNIQUE (badge_id)
);

-- =========================================================
-- OTURUM KAYITLARI
-- =========================================================

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  user_id INTEGER NOT NULL,

  token_hash TEXT NOT NULL UNIQUE,

  expires_at TEXT NOT NULL,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  last_used_at TEXT,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================================================
-- UYGULAMA AYARLARI
-- =========================================================

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  setting_key TEXT NOT NULL UNIQUE,

  setting_value TEXT,

  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- İNDEKSLER
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_daily_checks_date
ON daily_checks(date);

CREATE INDEX IF NOT EXISTS idx_daily_checks_user_date
ON daily_checks(user_id, date);

CREATE INDEX IF NOT EXISTS idx_daily_content_date
ON daily_content(date);

CREATE INDEX IF NOT EXISTS idx_prayers_date
ON prayers(date);

CREATE INDEX IF NOT EXISTS idx_prayers_from_user
ON prayers(from_user_id);

CREATE INDEX IF NOT EXISTS idx_prayers_to_user
ON prayers(to_user_id);

CREATE INDEX IF NOT EXISTS idx_shared_prayers_created_at
ON shared_prayers(created_at);

CREATE INDEX IF NOT EXISTS idx_daily_notes_user_date
ON daily_notes(user_id, date);

CREATE INDEX IF NOT EXISTS idx_sessions_user
ON sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at
ON sessions(expires_at);

-- =========================================================
-- BAŞLANGIÇ ROZETLERİ
-- =========================================================

INSERT OR IGNORE INTO badges (
  badge_key,
  title,
  description,
  icon,
  requirement_type,
  requirement_value
)
VALUES
  (
    'first-seven-days',
    'İlk 7 Gün',
    'Birlikte yedi gün boyunca manevi yolculuğa devam edin.',
    '🌙',
    'shared_days',
    7
  ),
  (
    'thirty-days',
    '30 Gün',
    'Birlikte otuz günlük yolculuğu tamamlayın.',
    '⭐',
    'shared_days',
    30
  ),
  (
    'quran-friend',
    'Kur''an Dostu',
    'Birlikte düzenli Kur''an okumaya devam edin.',
    '📖',
    'quran_count',
    20
  ),
  (
    'asma-traveler',
    'Esma Yolcusu',
    'Esma kayıtlarıyla manevi bahçeyi büyütün.',
    '🌿',
    'asma_count',
    20
  ),
  (
    'prayer-streak',
    'Namaz Serisi',
    'Namaz takibinde ortak istikrar oluşturun.',
    '🕌',
    'prayer_count',
    100
  ),
  (
    'dua-traveler',
    'Dua Yolcusu',
    'Birbiriniz için dua etmeye devam edin.',
    '🤲',
    'mutual_prayer_count',
    20
  );

-- =========================================================
-- VARSAYILAN UYGULAMA AYARLARI
-- =========================================================

INSERT OR IGNORE INTO settings (
  setting_key,
  setting_value
)
VALUES
  ('application_name', 'Niyet'),
  ('application_theme', 'dark'),
  ('garden_first_level', '7'),
  ('garden_second_level', '14'),
  ('garden_third_level', '30'),
  ('garden_final_level', '60');
