import Link from "next/link";
import { getPropertyCountsByType } from "@/lib/data/properties";

export default async function CategorySection() {
  const categories = await getPropertyCountsByType();

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Cari Berdasarkan Tipe
        </h2>
        
        {/* Scrollable on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-4 md:grid md:grid-cols-6 gap-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/properti?type=${category.id}`}
              className="flex-shrink-0 w-32 md:w-auto"
            >
              <div className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium text-gray-800">{category.label}</span>
                <span className="text-sm text-gray-500">{category.count} properti</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
