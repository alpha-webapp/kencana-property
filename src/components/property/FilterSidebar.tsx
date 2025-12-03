"use client";

import { useState, useEffect } from "react";

interface FilterSidebarProps {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  transactionType: "all" | "dijual" | "disewa";
  propertyType: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

const defaultFilters: FilterState = {
  transactionType: "all",
  propertyType: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
};

export default function FilterSidebar({ initialFilters, onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || defaultFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with initialFilters when they change (e.g., from URL params)
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-4"
      >
        <span className="font-medium text-gray-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Content */}
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${isExpanded ? "block" : "hidden"} lg:block`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Filter</h3>
          <button
            onClick={resetFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Reset
          </button>
        </div>

        <div className="space-y-5">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe Transaksi
            </label>
            <div className="flex gap-2">
              {[
                { value: "all", label: "Semua" },
                { value: "dijual", label: "Dijual" },
                { value: "disewa", label: "Disewa" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("transactionType", option.value)}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    filters.transactionType === option.value
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-emerald-500"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Semua Lokasi</option>
              <option value="sleman">Sleman</option>
              <option value="kota-yogyakarta">Kota Yogyakarta</option>
              <option value="bantul">Bantul</option>
              <option value="gunung-kidul">Gunung Kidul</option>
              <option value="kulon-progo">Kulon Progo</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipe Properti
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Range Harga
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <span className="self-center text-gray-400">-</span>
              <input
                type="text"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kamar Tidur
            </label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Semua</option>
              <option value="1">1 KT</option>
              <option value="2">2 KT</option>
              <option value="3">3 KT</option>
              <option value="4">4 KT</option>
              <option value="5">5+ KT</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kamar Mandi
            </label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Semua</option>
              <option value="1">1 KM</option>
              <option value="2">2 KM</option>
              <option value="3">3 KM</option>
              <option value="4">4+ KM</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
