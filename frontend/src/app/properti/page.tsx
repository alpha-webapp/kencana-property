import { getProperties } from "@/lib/data";
import PropertyListingClient from "@/components/property/PropertyListingClient";

interface PageProps {
  searchParams: Promise<{
    transaction?: string;
    type?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    sort?: string;
  }>;
}

// Map URL location values to database district values
const locationToDistrict: Record<string, string> = {
  sleman: "Sleman",
  bantul: "Bantul",
  "kota-yogyakarta": "Kota Yogyakarta",
  "gunung-kidul": "Gunung Kidul",
  "kulon-progo": "Kulon Progo",
};

export default async function PropertyListingPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Build query options from search params
  const properties = await getProperties({
    transactionType: params.transaction as "dijual" | "disewa" | undefined,
    propertyType: params.type || undefined,
    district: params.location ? locationToDistrict[params.location] : undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
    bedrooms: params.bedrooms ? parseInt(params.bedrooms) : undefined,
    bathrooms: params.bathrooms ? parseInt(params.bathrooms) : undefined,
    sortBy: (params.sort as "newest" | "price-asc" | "price-desc") || "newest",
  });

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

      {/* Client component handles filters and display */}
      <PropertyListingClient properties={properties} />
    </div>
  );
}

