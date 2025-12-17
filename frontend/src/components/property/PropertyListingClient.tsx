"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyCard from "@/components/property/PropertyCard";
import FilterSidebar from "@/components/property/FilterSidebar";
import type { Property } from "@/lib/data";
import type { FilterState } from "@/components/property/FilterSidebar";

type SortOption = "newest" | "price-asc" | "price-desc";

interface PropertyListingClientProps {
  properties: Property[];
}

function PropertyListingInner({ properties }: PropertyListingClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current sort from URL
  const sortBy = (searchParams.get("sort") as SortOption) || "newest";

  // Get current filters from URL for sidebar
  const currentFilters: FilterState = {
    transactionType: (searchParams.get("transaction") as "dijual" | "disewa") || "all",
    propertyType: searchParams.get("type") || "",
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
  };

  // Build URL from filters
  const buildUrl = (filters: FilterState, sort?: SortOption) => {
    const params = new URLSearchParams();

    if (filters.transactionType !== "all") {
      params.set("transaction", filters.transactionType);
    }
    if (filters.propertyType) params.set("type", filters.propertyType);
    if (filters.location) params.set("location", filters.location);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);
    if (sort && sort !== "newest") params.set("sort", sort);

    const queryString = params.toString();
    return queryString ? `/properti?${queryString}` : "/properti";
  };

  const handleFilterChange = (filters: FilterState) => {
    router.push(buildUrl(filters, sortBy));
  };

  const handleSortChange = (newSort: SortOption) => {
    router.push(buildUrl(currentFilters, newSort));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="lg:flex lg:gap-6">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0 mb-6 lg:mb-0">
          <FilterSidebar 
            initialFilters={currentFilters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <p className="text-gray-600">
              Menampilkan{" "}
              <span className="font-semibold text-gray-900">
                {properties.length}
              </span>{" "}
              properti
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Urutkan:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="newest">Terbaru</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link key={property.id} href={`/properti/${property.slug}`}>
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    priceLabel={property.priceLabel || undefined}
                    location={property.location}
                    district={property.district}
                    imageUrl={property.imageUrl}
                    propertyType={property.propertyType}
                    transactionType={property.transactionType}
                    bedrooms={property.bedrooms || undefined}
                    bathrooms={property.bathrooms || undefined}
                    landSize={property.landSize || undefined}
                    buildingSize={property.buildingSize || undefined}
                  />
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
        </div>
      </div>
    </div>
  );
}

// Loading skeleton
function PropertyGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="lg:flex lg:gap-6">
        <div className="lg:w-72 flex-shrink-0 mb-6 lg:mb-0">
          <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-20 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyListingClient({ properties }: PropertyListingClientProps) {
  return (
    <Suspense fallback={<PropertyGridSkeleton />}>
      <PropertyListingInner properties={properties} />
    </Suspense>
  );
}
