import Image from "next/image";
import Link from "next/link";

export default function TentangPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tentang Kencana Property
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Platform properti terpercaya untuk membantu Anda menemukan hunian
            impian di Yogyakarta dan sekitarnya
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Misi Kami
              </h2>
              <p className="text-gray-600 mb-4">
                Kencana Property hadir untuk menjembatani kebutuhan properti
                masyarakat Yogyakarta. Kami percaya bahwa setiap orang berhak
                mendapatkan akses informasi properti yang transparan, lengkap,
                dan terpercaya.
              </p>
              <p className="text-gray-600 mb-6">
                Dengan teknologi modern dan jaringan agen profesional, kami
                berkomitmen memberikan pengalaman jual-beli properti yang mudah,
                aman, dan menyenangkan.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-sm text-gray-600">Properti Listing</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">50+</div>
                  <div className="text-sm text-gray-600">Agen Partner</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">1000+</div>
                  <div className="text-sm text-gray-600">Klien Puas</div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
                alt="Kencana Property Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Terpercaya
              </h3>
              <p className="text-gray-600 text-sm">
                Semua listing diverifikasi oleh tim kami untuk memastikan
                keakuratan informasi dan legalitas properti.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cepat & Mudah
              </h3>
              <p className="text-gray-600 text-sm">
                Proses pencarian dan listing properti yang simpel dengan
                teknologi modern untuk pengalaman terbaik.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Profesional
              </h3>
              <p className="text-gray-600 text-sm">
                Tim dan agen partner kami siap membantu dengan layanan
                konsultasi profesional dan ramah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Tim Kami
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Orang-orang di balik Kencana Property
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Budi Santoso",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
              },
              {
                name: "Dewi Lestari",
                role: "Head of Sales",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
              },
              {
                name: "Andi Wijaya",
                role: "Head of Operations",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
              },
              {
                name: "Sari Rahayu",
                role: "Marketing Manager",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Siap Menemukan Properti Impian Anda?
          </h2>
          <p className="text-emerald-100 mb-8">
            Hubungi kami atau mulai cari properti sekarang
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/properti"
              className="inline-flex items-center justify-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Cari Properti
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
