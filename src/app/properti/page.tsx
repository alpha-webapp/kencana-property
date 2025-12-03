"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import FilterSidebar, { FilterState } from "@/components/property/FilterSidebar";
import { mockProperties } from "@/lib/mock-data";

type SortOption = "newest" | "price-asc" | "price-desc";

// Loading skeleton for the property grid
function PropertyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function PropertyListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Cari Properti</h1>
          <p className="text-gray-600 mt-1">
            Temukan properti impian Anda di Yogyakarta
          </p>
        </div>
      </div>
      
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-6">
          <PropertyGridSkeleton />
        </div>
      }>
        <PropertyListingContent />
      </Suspense>
    </div>
  );
}

function PropertyListingContent() {
  const searchParams = useSearchParams();
  
  // Initialize filters from URL params
  const getInitialFilters = (): FilterState => {
    const transaction = searchParams.get("transaction");
    return {
      transactionType: (transaction as "dijual" | "disewa") || "all",
      propertyType: searchParams.get("type") || "",
      location: searchParams.get("location") || "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
    };
  };

  const [filters, setFilters] = useState<FilterState>(getInitialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Update filters when URL params change
  useEffect(() => {
    setFilters(getInitialFilters());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties];

    // Filter by transaction type
    if (filters.transactionType !== "all") {
      result = result.filter((p) => p.transactionType === filters.transactionType);
    }

    // Filter by property type
    if (filters.propertyType) {
      result = result.filter(
        (p) => p.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Filter by location (district)
    if (filters.location) {
      result = result.filter(
        (p) => p.district.toLowerCase().replace(" ", "-") === filters.location.toLowerCase()
      );
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      const minBedrooms = parseInt(filters.bedrooms);
      if (filters.bedrooms === "5") {
        result = result.filter((p) => p.bedrooms && p.bedrooms >= 5);
      } else {
        result = result.filter((p) => p.bedrooms && p.bedrooms >= minBedrooms);
      }
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      const minBathrooms = parseInt(filters.bathrooms);
      if (filters.bathrooms === "4") {
        result = result.filter((p) => p.bathrooms && p.bathrooms >= 4);
      } else {
        result = result.filter((p) => p.bathrooms && p.bathrooms >= minBathrooms);
      }
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // Keep original order (assuming newer items are added later)
        result.reverse();
        break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="lg:flex lg:gap-6">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0 mb-6 lg:mb-0">
          <FilterSidebar initialFilters={filters} onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-gray-600">
              Menampilkan{" "}
              <span className="font-semibold text-gray-900">
                {filteredProperties.length}
              </span>{" "}
              properti
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="newest">Terbaru</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Link key={property.id} href={`/properti/${property.id}`}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Tidak ada properti ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah filter untuk melihat lebih banyak hasil
              </p>
            </div>
          )}

          {/* Load More (placeholder for pagination) */}
          {filteredProperties.length > 0 && filteredProperties.length >= 6 && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Muat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
