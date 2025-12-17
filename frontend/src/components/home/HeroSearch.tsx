"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<"beli" | "sewa">("beli");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // Map beli/sewa to dijual/disewa
    if (transactionType === "beli") {
      params.set("transaction", "dijual");
    } else {
      params.set("transaction", "disewa");
    }
    
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (priceRange) params.set("price", priceRange);

    router.push(`/properti?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Temukan Properti Impian Anda
        </h1>
        <p className="text-gray-600 mb-8">
          Cari rumah, apartemen, tanah, dan properti lainnya di Yogyakarta
        </p>

        {/* Transaction Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTransactionType("beli")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                transactionType === "beli"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Beli
            </button>
            <button
              onClick={() => setTransactionType("sewa")}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                transactionType === "sewa"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sewa
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi
              </label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Pilih Lokasi</option>
                <option value="sleman">Sleman</option>
                <option value="kota-yogyakarta">Kota Yogyakarta</option>
                <option value="bantul">Bantul</option>
                <option value="gunung-kidul">Gunung Kidul</option>
                <option value="kulon-progo">Kulon Progo</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Properti
              </label>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Semua Tipe</option>
                <option value="rumah">Rumah</option>
                <option value="apartemen">Apartemen</option>
                <option value="tanah">Tanah</option>
                <option value="villa">Villa</option>
                <option value="ruko">Ruko</option>
                <option value="kos">Kos</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="text-left">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Range Harga
              </label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Semua Harga</option>
                {transactionType === "beli" ? (
                  <>
                    <option value="0-500jt">Di bawah 500 Juta</option>
                    <option value="500jt-1m">500 Juta - 1 Miliar</option>
                    <option value="1m-2m">1 - 2 Miliar</option>
                    <option value="2m+">Di atas 2 Miliar</option>
                  </>
                ) : (
                  <>
                    <option value="0-2jt">Di bawah 2 Juta/bulan</option>
                    <option value="2jt-5jt">2 - 5 Juta/bulan</option>
                    <option value="5jt-10jt">5 - 10 Juta/bulan</option>
                    <option value="10jt+">Di atas 10 Juta/bulan</option>
                  </>
                )}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                className="w-full bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
