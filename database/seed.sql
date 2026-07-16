```sql
-- =========================================================
-- NİYET - BAŞLANGIÇ VERİLERİ
-- database/seed.sql
-- =========================================================

PRAGMA foreign_keys = ON;

-- =========================================================
-- DEMO KULLANICILAR
-- =========================================================
--
-- ÖNEMLİ:
-- Aşağıdaki password_hash değerleri şimdilik geçici örnektir.
-- Gerçek kullanıcılar oluşturulurken şifreler sunucu tarafında
-- PBKDF2, bcrypt, Argon2 veya benzeri güvenli bir yöntemle
-- hashlenmelidir.
--
-- Düz şifreler doğrudan veritabanına yazılmamalıdır.
-- =========================================================

INSERT OR IGNORE INTO users (
  id,
  name,
  username,
  password_hash,
  is_active
)
VALUES
  (
    1,
    'Damla',
    'damla',
    'DEMO_PASSWORD_HASH_DAMLA',
    1
  ),
  (
    2,
    'Hilal',
    'hilal',
    'DEMO_PASSWORD_HASH_HILAL',
    1
  );

-- =========================================================
-- ROZETLER
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
-- UYGULAMA AYARLARI
-- =========================================================

INSERT OR IGNORE INTO settings (
  setting_key,
  setting_value
)
VALUES
  ('application_name', 'Niyet'),
  ('default_theme', 'dark'),
  ('default_language', 'tr'),
  ('garden_seed_level', '0'),
  ('garden_sapling_level', '7'),
  ('garden_flower_level', '14'),
  ('garden_tree_level', '30'),
  ('garden_fruit_tree_level', '60'),
  ('streak_requires_both_users', 'true'),
  ('competition_mode', 'false'),
  ('guilt_language_enabled', 'false');

-- =========================================================
-- ÖRNEK GÜNLÜK İÇERİKLER
-- =========================================================
--
-- Tarihler örnek olarak eklenmiştir.
-- Gerçek kullanımda Cloudflare Function her gün ilgili tarihi
-- okuyabilir veya içerikleri sırayla döndürebilir.
-- =========================================================

INSERT OR IGNORE INTO daily_content (
  date,
  asma_name,
  asma_arabic,
  asma_meaning,
  asma_count,
  verse_surah,
  verse_number,
  verse_arabic,
  verse_reading,
  verse_translation,
  verse_tafsir,
  daily_dua,
  challenge
)
VALUES
  (
    '2026-07-16',
    'Er-Rahmân',
    'الرَّحْمَنُ',
    'Dünyada bütün kullarına merhamet eden.',
    100,
    'Ra''d Suresi',
    '28',
    'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    'Elâ bi zikrillâhi tatmainnul kulûb.',
    'Bilesiniz ki kalpler ancak Allah''ı anmakla huzur bulur.',
    'İnsan kalbi yalnızca maddi imkânlarla tam anlamıyla huzura kavuşmaz. Allah''ı hatırlamak, O''na güvenmek ve hayatın her anında O''nun yakınlığını hissetmek kalbe gerçek bir sükûnet kazandırır.',
    'Allah''ım, kalbimize huzur, niyetlerimize samimiyet ve adımlarımıza istikrar nasip et.',
    'Bugün bir kişiye içtenlikle güzel bir söz söyle.'
  ),
  (
    '2026-07-17',
    'El-Vedûd',
    'الْوَدُودُ',
    'Kullarını seven ve sevilmeye en layık olan.',
    100,
    'İnşirah Suresi',
    '5',
    'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    'Fe inne me''al usri yusrâ.',
    'Şüphesiz güçlükle beraber bir kolaylık vardır.',
    'Zorluklar tek başına değildir. Her sıkıntının içinde veya ardından Allah''ın takdir ettiği bir kolaylık bulunur. Mümin, umudunu kaybetmeden yoluna devam eder.',
    'Allah''ım, zorluklarımızı kolaylaştır, gönlümüzdeki ağırlıkları hafiflet ve bizi ümitsizliğe düşürme.',
    'Bugün uzun zamandır aramadığın bir yakınını ara.'
  ),
  (
    '2026-07-18',
    'El-Gafûr',
    'الْغَفُورُ',
    'Kullarının hata ve günahlarını çokça bağışlayan.',
    100,
    'Zümer Suresi',
    '53',
    'لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ',
    'Lâ taknatû min rahmetillâh.',
    'Allah''ın rahmetinden ümit kesmeyin.',
    'İnsan hata yapabilir; fakat dönüş kapısı açıktır. Samimi pişmanlık, tövbe ve yeniden yöneliş Allah''ın rahmetine ulaşmanın yollarındandır.',
    'Allah''ım, bilerek veya bilmeyerek yaptığımız hataları bağışla ve bizi güzel bir dönüşle Sana yönelt.',
    'Bugün kırdığını düşündüğün birinden gönülden özür dile.'
  ),
  (
    '2026-07-19',
    'Es-Sabûr',
    'الصَّبُورُ',
    'Cezayı erteleyen ve kullarına mühlet veren.',
    100,
    'Bakara Suresi',
    '153',
    'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    'İnnallâhe me''as sâbirîn.',
    'Şüphesiz Allah sabredenlerle beraberdir.',
    'Sabır yalnızca beklemek değil; doğru olanı koruyarak, ümit ve teslimiyetle devam edebilmektir.',
    'Allah''ım, bize güzel sabır, doğru karar ve gönül genişliği nasip et.',
    'Bugün seni zorlayan bir konuda acele karar vermeden önce durup düşün.'
  ),
  (
    '2026-07-20',
    'El-Hafîz',
    'الْحَفِيظُ',
    'Her şeyi koruyan ve gözeten.',
    99,
    'Tevbe Suresi',
    '51',
    'قُلْ لَنْ يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا',
    'Kul len yusîbenâ illâ mâ keteballâhu lenâ.',
    'De ki: Allah''ın bizim için yazdığından başkası bize asla erişmez.',
    'Tevekkül, tedbiri bırakmak değil; gerekeni yaptıktan sonra sonucu Allah''a emanet etmektir.',
    'Allah''ım, bizi ve sevdiklerimizi görünen ve görünmeyen kötülüklerden muhafaza et.',
    'Bugün bir yakının için haberi olmadan dua et.'
  ),
  (
    '2026-07-21',
    'El-Latîf',
    'اللَّطِيفُ',
    'Lütfu kullarına gizli ve ince yollarla ulaşan.',
    129,
    'Şûrâ Suresi',
    '19',
    'اللَّهُ لَطِيفٌ بِعِبَادِهِ',
    'Allâhu latîfun bi ibâdih.',
    'Allah kullarına karşı çok lütufkârdır.',
    'İnsan bazen Allah''ın lütfunu hemen göremeyebilir. Fakat hayatın içindeki küçük kolaylıklar, korunmalar ve güzel karşılaşmalar da ilahi lütfun işaretleridir.',
    'Allah''ım, bize lütfunu fark eden bir kalp ve nimetlerine şükreden bir dil nasip et.',
    'Bugün sahip olduğun üç nimeti yaz ve bunlar için şükret.'
  ),
  (
    '2026-07-22',
    'El-Fettâh',
    'الْفَتَّاحُ',
    'Hayır kapılarını açan ve hükmeden.',
    71,
    'Talâk Suresi',
    '2-3',
    'وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا',
    'Ve men yettekıllâhe yec''al lehû mahrecâ.',
    'Kim Allah''a karşı gelmekten sakınırsa Allah ona bir çıkış yolu açar.',
    'Takva, insanın davranışlarında Allah''ın rızasını gözetmesidir. Samimi ve doğru bir yöneliş, beklenmedik kolaylıkların kapısını açabilir.',
    'Allah''ım, önümüzdeki hayırlı kapıları aç, bize doğru yolu göster ve işlerimizi kolaylaştır.',
    'Bugün ertelediğin küçük ama hayırlı bir işi tamamla.'
  );

-- =========================================================
-- TEST AMAÇLI ÖRNEK GÜNLÜK KAYITLAR
-- =========================================================
--
-- Bunları gerçek kullanıma geçmeden önce silebilirsin.
-- Arayüzde istatistik, takvim ve bahçe testleri için eklenmiştir.
-- =========================================================

INSERT OR IGNORE INTO daily_checks (
  user_id,
  date,
  fajr,
  dhuhr,
  asr,
  maghrib,
  isha,
  asma,
  quran,
  tafsir,
  dua,
  tafakkur,
  challenge,
  daily_prayer_amen
)
VALUES
  (
    1,
    '2026-07-14',
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1
  ),
  (
    2,
    '2026-07-14',
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1
  ),
  (
    1,
    '2026-07-15',
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1
  ),
  (
    2,
    '2026-07-15',
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1
  );

-- =========================================================
-- TEST AMAÇLI BİRBİRİNE DUA KAYITLARI
-- =========================================================

INSERT OR IGNORE INTO prayers (
  from_user_id,
  to_user_id,
  date
)
VALUES
  (
    1,
    2,
    '2026-07-15'
  ),
  (
    2,
    1,
    '2026-07-15'
  );

-- =========================================================
-- TEST AMAÇLI ORTAK DUA
-- =========================================================

INSERT OR IGNORE INTO shared_prayers (
  id,
  user_id,
  prayer_text
)
VALUES
  (
    1,
    1,
    'Allah''ım, kalplerimize huzur, evlerimize bereket ve yolumuza hayırlı insanlar nasip et.'
  );

INSERT OR IGNORE INTO prayer_amens (
  prayer_id,
  user_id
)
VALUES
  (
    1,
    2
  );

-- =========================================================
-- TEST AMAÇLI GÜNLÜK NOTLAR
-- =========================================================

INSERT OR IGNORE INTO daily_notes (
  user_id,
  date,
  note_text
)
VALUES
  (
    1,
    '2026-07-15',
    'Bugün sabırlı olmanın sadece beklemek değil, güzel kalmaya devam etmek olduğunu düşündüm.'
  ),
  (
    2,
    '2026-07-15',
    'Bugün küçük şeyler için daha çok şükretmek istedim.'
  );
```
