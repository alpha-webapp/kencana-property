import Image from "next/image";

export interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  priceLabel?: string; // e.g., "/bulan" for rent
  location: string;
  district: string;
  imageUrl: string;
  propertyType: string;
  transactionType: "dijual" | "disewa";
  bedrooms?: number;
  bathrooms?: number;
  landSize?: number; // LT in m²
  buildingSize?: number; // LB in m²
}

export default function PropertyCard({
  title,
  price,
  priceLabel = "",
  location,
  district,
  imageUrl,
  propertyType,
  transactionType,
  bedrooms,
  bathrooms,
  landSize,
  buildingSize,
}: PropertyCardProps) {
  // Format price to Indonesian Rupiah
  const formatPrice = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
    } else if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(0)} Juta`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Transaction Badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded ${
            transactionType === "dijual"
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {transactionType === "dijual" ? "Dijual" : "Disewa"}
        </span>
        {/* Property Type Badge */}
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded">
          {propertyType}
        </span>
        {/* Favorite Button */}
        <button className="absolute bottom-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <p className="text-lg font-bold text-gray-900">
          {formatPrice(price)}
          {priceLabel && (
            <span className="text-sm font-normal text-gray-500">
              {priceLabel}
            </span>
          )}
        </p>

        {/* Title */}
        <h3 className="text-gray-800 font-medium mt-1 line-clamp-1">{title}</h3>

        {/* Location */}
        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}, {district}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
          {bedrooms !== undefined && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {bedrooms} KT
            </span>
          )}
          {bathrooms !== undefined && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              {bathrooms} KM
            </span>
          )}
          {landSize !== undefined && (
            <span className="flex items-center gap-1">
              LT {landSize}m²
            </span>
          )}
          {buildingSize !== undefined && (
            <span className="flex items-center gap-1">
              LB {buildingSize}m²
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
