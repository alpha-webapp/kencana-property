"use client";

import { useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import { mockProperties } from "@/lib/mock-data";

interface FeaturedListingsProps {
  title: string;
  showFilter?: boolean;
}

export default function FeaturedListings({
  title,
  showFilter = false,
}: FeaturedListingsProps) {
  const [filter, setFilter] = useState<"all" | "dijual" | "disewa">("all");

  const filteredProperties =
    filter === "all"
      ? mockProperties
      : mockProperties.filter((p) => p.transactionType === filter);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

          {showFilter && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter("dijual")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "dijual"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Dijual
              </button>
              <button
                onClick={() => setFilter("disewa")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "disewa"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Disewa
              </button>
            </div>
          )}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.slice(0, 6).map((property) => (
            <Link key={property.id} href={`/properti/${property.id}`}>
              <PropertyCard {...property} />
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/properti"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Lihat Semua Properti
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
