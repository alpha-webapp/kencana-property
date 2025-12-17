import Link from "next/link";
import Image from "next/image";
import { yogyakartaDistricts } from "@/lib/mock-data";

export default function PopularLocations() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Cari Berdasarkan Lokasi
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {yogyakartaDistricts.map((district) => (
            <Link
              key={district.id}
              href={`/properti?location=${district.id}`}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={district.imageUrl}
                  alt={district.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{district.name}</h3>
                  <p className="text-sm text-white/80">
                    {district.propertyCount} properti
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
