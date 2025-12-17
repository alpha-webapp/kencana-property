INSERT INTO properties (
  title, slug, description, transaction_type, property_type, status,
  price, address, sub_district, district, 
  land_size, building_size, bedrooms, bathrooms, floors,
  certificate, electricity, furnished, facing, year_built,
  featured_image, features, published_at
) VALUES
-- Property 1: Rumah Mewah
(
  'Rumah Mewah di Jalan Kaliurang',
  'rumah-mewah-di-jalan-kaliurang',
  'Rumah mewah 2 lantai dengan desain modern minimalis di kawasan elite Jalan Kaliurang. Lokasi sangat strategis, dekat dengan berbagai fasilitas umum seperti kampus UGM, rumah sakit, pusat perbelanjaan, dan akses jalan tol.

Rumah ini dibangun dengan material berkualitas tinggi dan finishing premium. Cocok untuk keluarga yang menginginkan hunian nyaman dengan lingkungan yang asri dan aman.

Fasilitas lengkap termasuk carport untuk 2 mobil, taman depan dan belakang, serta sistem keamanan 24 jam di lingkungan perumahan.',
  'dijual', 'rumah', 'published',
  1500000000,
  'Jl. Kaliurang KM 8.5, Ngaglik, Sleman',
  'Ngaglik', 'Sleman',
  200, 180, 4, 3, 2,
  'shm', 2200, 'semi-furnished', 'Selatan', 2020,
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
  '["Carport 2 mobil", "Taman depan & belakang", "Dapur bersih & kotor", "Ruang tamu luas", "Kamar tidur utama dengan walk-in closet", "Water heater", "AC di setiap kamar", "CCTV", "Sumur bor & PAM"]'::jsonb,
  NOW()
),

-- Property 2: Tanah Strategis
(
  'Tanah Strategis dekat UGM',
  'tanah-strategis-dekat-ugm',
  'Tanah kavling strategis berlokasi di area Caturtunggal, hanya 10 menit dari kampus UGM. Sangat cocok untuk investasi atau membangun hunian impian Anda.

Lokasi berada di pinggir jalan aspal, akses mudah, dan sudah tersedia jaringan listrik PLN serta air PDAM. Lingkungan sekitar sudah ramai penduduk dan dekat dengan berbagai fasilitas.

Sertifikat sudah SHM (Sertifikat Hak Milik), siap untuk proses jual beli.',
  'dijual', 'tanah', 'published',
  850000000,
  'Jl. Perumnas, Caturtunggal, Depok, Sleman',
  'Caturtunggal', 'Sleman',
  500, NULL, NULL, NULL, NULL,
  'shm', NULL, NULL, NULL, NULL,
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  '["Pinggir jalan aspal", "Listrik PLN tersedia", "Air PDAM tersedia", "Lingkungan ramai", "Dekat kampus UGM"]'::jsonb,
  NOW()
),

-- Property 3: Kos Eksklusif
(
  'Kos Eksklusif 12 Kamar Full Furnished',
  'kos-eksklusif-12-kamar-full-furnished',
  'Kos eksklusif dengan fasilitas lengkap di area Condongcatur. Cocok untuk mahasiswa atau pekerja profesional yang menginginkan kenyamanan dan privasi.

Setiap kamar dilengkapi dengan AC, kamar mandi dalam, meja belajar, lemari, dan kasur. Fasilitas bersama meliputi dapur, ruang tamu, dan area parkir motor.',
  'disewa', 'kos', 'published',
  5000000,
  '/bulan',
  'Jl. Anggajaya, Condongcatur, Depok, Sleman',
  'Condongcatur', 'Sleman',
  NULL, 20, 1, 1, NULL,
  NULL, 450, 'furnished', NULL, 2019,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
  '["AC", "Kamar mandi dalam", "Meja belajar", "Lemari", "Kasur", "WiFi", "Dapur bersama", "Parkir motor"]'::jsonb,
  NOW()
),

-- Property 4: Rumah Minimalis
(
  'Rumah Minimalis Siap Huni',
  'rumah-minimalis-siap-huni',
  'Rumah minimalis modern siap huni di kawasan Sewon, Bantul. Desain simpel namun elegan, cocok untuk keluarga muda yang menginginkan hunian praktis dan nyaman.',
  'dijual', 'rumah', 'published',
  650000000,
  'Jl. Bantul KM 5, Sewon, Bantul',
  'Sewon', 'Bantul',
  120, 90, 3, 2, 1,
  'shm', 1300, 'unfurnished', 'Timur', 2022,
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
  '["Carport", "Taman kecil", "Dapur", "Ruang tamu", "2 kamar tidur + 1 kamar utama"]'::jsonb,
  NOW()
),

-- Property 5: Villa View Sawah
(
  'Villa View Sawah di Pakem',
  'villa-view-sawah-di-pakem',
  'Villa mewah dengan pemandangan sawah yang asri di kawasan Pakem. Udara sejuk pegunungan dan suasana tenang, cocok untuk investasi villa atau hunian keluarga yang menginginkan suasana pedesaan.',
  'dijual', 'villa', 'published',
  2500000000,
  'Jl. Kaliurang KM 20, Pakem, Sleman',
  'Pakem', 'Sleman',
  800, 350, 5, 4, 2,
  'shm', 3500, 'furnished', 'Utara', 2018,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  '["Private pool", "Gazebo", "Taman luas", "View sawah", "Garasi 2 mobil", "Kamar pembantu", "Fully furnished", "CCTV"]'::jsonb,
  NOW()
),

-- Property 6: Ruko 2 Lantai (Sewa)
(
  'Ruko 2 Lantai Jalan Utama',
  'ruko-2-lantai-jalan-utama',
  'Ruko strategis 2 lantai di jalan utama Umbulharjo. Cocok untuk berbagai jenis usaha seperti toko, kantor, atau klinik. Lokasi ramai dan mudah diakses.',
  'disewa', 'ruko', 'published',
  15000000,
  'Jl. Kusumanegara, Umbulharjo, Yogyakarta',
  'Umbulharjo', 'Kota Yogyakarta',
  100, 200, NULL, 2, 2,
  'shgb', 2200, 'unfurnished', 'Barat', 2015,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  '["Jalan utama", "Parkir luas", "2 toilet", "Listrik 2200W", "Air PAM"]'::jsonb,
  NOW()
);

-- Add sample images for the first property
INSERT INTO property_images (property_id, url, alt_text, sort_order)
SELECT 
  id,
  unnest(ARRAY[
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  ]),
  unnest(ARRAY[
    'Tampak depan rumah',
    'Ruang tamu',
    'Dapur modern',
    'Kamar tidur utama',
    'Tampak belakang dengan taman'
  ]),
  unnest(ARRAY[0, 1, 2, 3, 4])
FROM properties
WHERE slug = 'rumah-mewah-di-jalan-kaliurang';
