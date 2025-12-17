// Extended property data for detail pages
export interface PropertyDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  location: string;
  district: string;
  province: string;
  address: string;
  propertyType: string;
  transactionType: "dijual" | "disewa";
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;
  floors?: number;
  certificate?: string;
  electricity?: number;
  furnished?: "furnished" | "semi-furnished" | "unfurnished";
  facing?: string;
  yearBuilt?: number;
  images: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  createdAt: string;
}

export const propertyDetails: PropertyDetail[] = [
  {
    id: "1",
    title: "Rumah Mewah di Jalan Kaliurang",
    description: `Rumah mewah 2 lantai dengan desain modern minimalis di kawasan elite Jalan Kaliurang. Lokasi sangat strategis, dekat dengan berbagai fasilitas umum seperti kampus UGM, rumah sakit, pusat perbelanjaan, dan akses jalan tol.

Rumah ini dibangun dengan material berkualitas tinggi dan finishing premium. Cocok untuk keluarga yang menginginkan hunian nyaman dengan lingkungan yang asri dan aman.

Fasilitas lengkap termasuk carport untuk 2 mobil, taman depan dan belakang, serta sistem keamanan 24 jam di lingkungan perumahan.`,
    price: 1500000000,
    location: "Ngaglik",
    district: "Sleman",
    province: "DI Yogyakarta",
    address: "Jl. Kaliurang KM 8.5, Ngaglik, Sleman",
    propertyType: "Rumah",
    transactionType: "dijual",
    bedrooms: 4,
    bathrooms: 3,
    landSize: 200,
    buildingSize: 180,
    floors: 2,
    certificate: "SHM",
    electricity: 2200,
    furnished: "semi-furnished",
    facing: "Selatan",
    yearBuilt: 2020,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    features: [
      "Carport 2 mobil",
      "Taman depan & belakang",
      "Dapur bersih & kotor",
      "Ruang tamu luas",
      "Kamar tidur utama dengan walk-in closet",
      "Water heater",
      "AC di setiap kamar",
      "CCTV",
      "Sumur bor & PAM",
    ],
    agent: {
      name: "Budi Santoso",
      phone: "+6281234567890",
      whatsapp: "6281234567890",
    },
    createdAt: "2024-11-15",
  },
  {
    id: "2",
    title: "Tanah Strategis dekat UGM",
    description: `Tanah kavling strategis berlokasi di area Caturtunggal, hanya 10 menit dari kampus UGM. Sangat cocok untuk investasi atau membangun hunian impian Anda.

Lokasi berada di pinggir jalan aspal, akses mudah, dan sudah tersedia jaringan listrik PLN serta air PDAM. Lingkungan sekitar sudah ramai penduduk dan dekat dengan berbagai fasilitas.

Sertifikat sudah SHM (Sertifikat Hak Milik), siap untuk proses jual beli.`,
    price: 850000000,
    location: "Caturtunggal",
    district: "Sleman",
    province: "DI Yogyakarta",
    address: "Jl. Perumnas, Caturtunggal, Depok, Sleman",
    propertyType: "Tanah",
    transactionType: "dijual",
    landSize: 500,
    certificate: "SHM",
    facing: "Timur",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=1200&q=80",
      "https://images.unsplash.com/photo-1595880375766-f0f4d2cf6563?w=1200&q=80",
    ],
    features: [
      "Pinggir jalan aspal",
      "Listrik PLN tersedia",
      "Air PDAM tersedia",
      "Lingkungan aman",
      "Dekat kampus UGM",
      "Dekat pusat perbelanjaan",
    ],
    agent: {
      name: "Siti Rahayu",
      phone: "+6281234567891",
      whatsapp: "6281234567891",
    },
    createdAt: "2024-11-20",
  },
  {
    id: "3",
    title: "Kos Eksklusif 12 Kamar Full Furnished",
    description: `Kos eksklusif dengan fasilitas lengkap di kawasan Condongcatur. Sangat dekat dengan kampus UPN, STIE YKPN, dan area perkantoran.

Setiap kamar dilengkapi dengan AC, kasur, lemari, meja belajar, dan kamar mandi dalam. Tersedia juga WiFi unlimited, parkir motor & mobil, serta dapur bersama.

Lingkungan aman dengan sistem one gate dan penjaga 24 jam. Cocok untuk mahasiswa atau karyawan yang mencari hunian nyaman.`,
    price: 5000000,
    priceLabel: "/bulan",
    location: "Condongcatur",
    district: "Sleman",
    province: "DI Yogyakarta",
    address: "Jl. Seturan Raya, Condongcatur, Depok, Sleman",
    propertyType: "Kos",
    transactionType: "disewa",
    bedrooms: 1,
    bathrooms: 1,
    buildingSize: 20,
    electricity: 450,
    furnished: "furnished",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    features: [
      "Full furnished",
      "AC",
      "Kamar mandi dalam",
      "WiFi unlimited",
      "Parkir motor & mobil",
      "Dapur bersama",
      "Laundry",
      "Cleaning service",
      "Keamanan 24 jam",
    ],
    agent: {
      name: "Dewi Kusuma",
      phone: "+6281234567892",
      whatsapp: "6281234567892",
    },
    createdAt: "2024-11-25",
  },
  {
    id: "4",
    title: "Rumah Minimalis Siap Huni",
    description: `Rumah minimalis modern siap huni di kawasan Sewon, Bantul. Desain contemporary dengan pencahayaan alami yang optimal.

Lokasi tenang dan asri, cocok untuk keluarga muda. Akses mudah ke Ring Road Selatan dan berbagai fasilitas umum. Lingkungan perumahan dengan keamanan terjaga.

Bangunan masih baru dengan kondisi sangat terawat, siap untuk langsung ditempati.`,
    price: 650000000,
    location: "Sewon",
    district: "Bantul",
    province: "DI Yogyakarta",
    address: "Perum Griya Asri, Sewon, Bantul",
    propertyType: "Rumah",
    transactionType: "dijual",
    bedrooms: 3,
    bathrooms: 2,
    landSize: 120,
    buildingSize: 90,
    floors: 1,
    certificate: "SHM",
    electricity: 1300,
    furnished: "unfurnished",
    facing: "Utara",
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
    ],
    features: [
      "Carport",
      "Taman depan",
      "Dapur",
      "Ruang tamu",
      "Kamar mandi dalam (master)",
      "Sumur bor",
      "Lingkungan perumahan",
    ],
    agent: {
      name: "Budi Santoso",
      phone: "+6281234567890",
      whatsapp: "6281234567890",
    },
    createdAt: "2024-11-28",
  },
  {
    id: "5",
    title: "Villa View Sawah di Pakem",
    description: `Villa mewah dengan pemandangan sawah dan Gunung Merapi yang spektakuler. Lokasi di kawasan wisata Pakem yang sejuk dan asri.

Desain arsitektur Jawa modern dengan sentuhan kontemporer. Halaman luas dengan kolam renang private, gazebo, dan taman tropis. Cocok untuk hunian mewah atau villa wisata.

Akses jalan bagus, hanya 30 menit dari pusat kota Yogyakarta.`,
    price: 2500000000,
    location: "Pakem",
    district: "Sleman",
    province: "DI Yogyakarta",
    address: "Jl. Kaliurang KM 19, Pakem, Sleman",
    propertyType: "Villa",
    transactionType: "dijual",
    bedrooms: 5,
    bathrooms: 4,
    landSize: 800,
    buildingSize: 350,
    floors: 2,
    certificate: "SHM",
    electricity: 5500,
    furnished: "furnished",
    facing: "Utara",
    yearBuilt: 2019,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    features: [
      "Kolam renang private",
      "View sawah & Gunung Merapi",
      "Gazebo",
      "Taman tropis",
      "Carport 3 mobil",
      "Dapur bersih & kotor",
      "Ruang keluarga luas",
      "Kamar tidur utama suite",
      "Water heater",
      "AC di setiap kamar",
      "CCTV",
      "Genset backup",
    ],
    agent: {
      name: "Siti Rahayu",
      phone: "+6281234567891",
      whatsapp: "6281234567891",
    },
    createdAt: "2024-11-10",
  },
  {
    id: "6",
    title: "Ruko 2 Lantai Jalan Utama",
    description: `Ruko strategis di jalan utama Umbulharjo, cocok untuk berbagai jenis usaha. Lokasi ramai dengan traffic tinggi.

Bangunan 2 lantai dengan kondisi siap pakai. Lantai 1 cocok untuk toko/showroom, lantai 2 bisa untuk kantor atau gudang.

Tersedia lahan parkir depan yang cukup luas. Listrik 3 phase sudah terpasang.`,
    price: 15000000,
    priceLabel: "/bulan",
    location: "Umbulharjo",
    district: "Kota Yogyakarta",
    province: "DI Yogyakarta",
    address: "Jl. Kusumanegara, Umbulharjo, Yogyakarta",
    propertyType: "Ruko",
    transactionType: "disewa",
    landSize: 100,
    buildingSize: 200,
    floors: 2,
    electricity: 3500,
    furnished: "unfurnished",
    facing: "Barat",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    ],
    features: [
      "Lokasi jalan utama",
      "2 lantai",
      "Parkir depan luas",
      "Listrik 3 phase",
      "Toilet di setiap lantai",
      "Rolling door",
      "Dekat pusat kota",
    ],
    agent: {
      name: "Dewi Kusuma",
      phone: "+6281234567892",
      whatsapp: "6281234567892",
    },
    createdAt: "2024-11-22",
  },
];

// Helper function to get property by ID
export function getPropertyById(id: string): PropertyDetail | undefined {
  return propertyDetails.find((p) => p.id === id);
}

// Helper function to get similar properties
export function getSimilarProperties(
  currentId: string,
  propertyType: string,
  limit: number = 3
): PropertyDetail[] {
  return propertyDetails
    .filter((p) => p.id !== currentId && p.propertyType === propertyType)
    .slice(0, limit);
}
