import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/property/ImageGallery";
import ContactSidebar from "@/components/property/ContactSidebar";
import PropertyCard from "@/components/property/PropertyCard";
import {
  getPropertyDetailBySlug,
  getSimilarProperties,
  type Property,
} from "@/lib/data";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

// Default agent info until we have agents in the database
const defaultAgent = {
  name: "Kencana Property",
  phone: "+6281234567890",
  whatsapp: "6281234567890",
};

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { id } = await params;
  
  // id is now actually the slug from URL
  const property = await getPropertyDetailBySlug(id);

  if (!property) {
    notFound();
  }

  const similarProperties = await getSimilarProperties(
    property.id,
    property.propertyType
  );

  // Format price
  const formatPrice = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
    } else if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(0)} Juta`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  // Use default agent for now
  const agent = defaultAgent;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/properti" className="hover:text-emerald-600">
              Properti
            </Link>
            <span>/</span>
            <Link
              href={`/properti?type=${property.propertyType.toLowerCase()}`}
              className="hover:text-emerald-600"
            >
              {property.propertyType}
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[200px]">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Image Gallery */}
            <ImageGallery images={property.images} title={property.title} />

            {/* Title & Location */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    property.transactionType === "dijual"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {property.transactionType === "dijual" ? "Dijual" : "Disewa"}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {property.propertyType}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {property.title}
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-1">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {property.address}
              </p>

              {/* Mobile Price (shown only on mobile) */}
              <div className="lg:hidden mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">Harga</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(property.price)}
                  {property.priceLabel && (
                    <span className="text-base font-normal text-gray-500">
                      {property.priceLabel}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Key Specs */}
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-4">
                Spesifikasi Utama
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.landSize && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Luas Tanah</p>
                    <p className="font-semibold text-gray-900">
                      {property.landSize} m²
                    </p>
                  </div>
                )}
                {property.buildingSize && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Luas Bangunan</p>
                    <p className="font-semibold text-gray-900">
                      {property.buildingSize} m²
                    </p>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Kamar Tidur</p>
                    <p className="font-semibold text-gray-900">
                      {property.bedrooms} KT
                    </p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Kamar Mandi</p>
                    <p className="font-semibold text-gray-900">
                      {property.bathrooms} KM
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-4">Deskripsi</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {property.description}
              </div>
            </div>

            {/* Detailed Specs */}
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-4">
                Detail Properti
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Tipe Properti</span>
                  <span className="font-medium text-gray-900">
                    {property.propertyType}
                  </span>
                </div>
                {property.certificate && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Sertifikat</span>
                    <span className="font-medium text-gray-900">
                      {property.certificate}
                    </span>
                  </div>
                )}
                {property.landSize && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Luas Tanah</span>
                    <span className="font-medium text-gray-900">
                      {property.landSize} m²
                    </span>
                  </div>
                )}
                {property.buildingSize && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Luas Bangunan</span>
                    <span className="font-medium text-gray-900">
                      {property.buildingSize} m²
                    </span>
                  </div>
                )}
                {property.floors && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Jumlah Lantai</span>
                    <span className="font-medium text-gray-900">
                      {property.floors}
                    </span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Kamar Tidur</span>
                    <span className="font-medium text-gray-900">
                      {property.bedrooms}
                    </span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Kamar Mandi</span>
                    <span className="font-medium text-gray-900">
                      {property.bathrooms}
                    </span>
                  </div>
                )}
                {property.electricity && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Daya Listrik</span>
                    <span className="font-medium text-gray-900">
                      {property.electricity} Watt
                    </span>
                  </div>
                )}
                {property.furnished && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Perabotan</span>
                    <span className="font-medium text-gray-900 capitalize">
                      {property.furnished.replace("-", " ")}
                    </span>
                  </div>
                )}
                {property.facing && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Hadap</span>
                    <span className="font-medium text-gray-900">
                      {property.facing}
                    </span>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Tahun Dibangun</span>
                    <span className="font-medium text-gray-900">
                      {property.yearBuilt}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                <h2 className="font-semibold text-gray-900 mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h2 className="font-semibold text-gray-900 mb-4">Lokasi</h2>
              <p className="text-gray-700 mb-4">
                {property.address}, {property.district}, {property.province}
              </p>
              {/* Placeholder for map - in real app, embed Google Maps */}
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <p>Peta lokasi akan ditampilkan di sini</p>
                </div>
              </div>
            </div>

            {/* Mobile Contact Buttons */}
            <div className="lg:hidden mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">
                    {agent.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {agent.name}
                  </p>
                  <p className="text-sm text-gray-500">Agen Properti</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan properti "${property.title}"`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Telepon
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <ContactSidebar
              agent={agent}
              propertyId={property.id}
              propertyTitle={property.title}
              price={property.price}
              priceLabel={property.priceLabel || undefined}
            />
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Properti Serupa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <Link key={prop.id} href={`/properti/${prop.slug}`}>
                  <PropertyCard
                    id={prop.id}
                    title={prop.title}
                    price={prop.price}
                    priceLabel={prop.priceLabel || undefined}
                    location={prop.location}
                    district={prop.district}
                    imageUrl={prop.imageUrl}
                    propertyType={prop.propertyType}
                    transactionType={prop.transactionType}
                    bedrooms={prop.bedrooms || undefined}
                    bathrooms={prop.bathrooms || undefined}
                    landSize={prop.landSize || undefined}
                    buildingSize={prop.buildingSize || undefined}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
