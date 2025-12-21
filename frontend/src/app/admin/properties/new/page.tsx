"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PROPERTY_TYPES = [
  { value: "rumah", label: "Rumah" },
  { value: "apartemen", label: "Apartemen" },
  { value: "tanah", label: "Tanah" },
  { value: "villa", label: "Villa" },
  { value: "ruko", label: "Ruko" },
  { value: "kos", label: "Kos" },
];

const DISTRICTS = [
  "Sleman",
  "Kota Yogyakarta",
  "Bantul",
  "Gunung Kidul",
  "Kulon Progo",
];

const TRANSACTION_TYPES = [
  { value: "dijual", label: "Dijual" },
  { value: "disewa", label: "Disewa" },
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    transaction_type: "dijual",
    property_type: "rumah",
    price: "",
    price_label: "",
    address: "",
    district: "Sleman",
    sub_district: "",
    land_size: "",
    building_size: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    certificate: "",
    electricity: "",
    furnished: "",
    facing: "",
    year_built: "",
    featured_image: "",
    features: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        title: formData.title,
        description: formData.description || null,
        transaction_type: formData.transaction_type,
        property_type: formData.property_type,
        price: parseInt(formData.price) || 0,
        price_label: formData.price_label || null,
        address: formData.address,
        district: formData.district,
        sub_district: formData.sub_district || null,
        land_size: formData.land_size ? parseInt(formData.land_size) : null,
        building_size: formData.building_size ? parseInt(formData.building_size) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        floors: formData.floors ? parseInt(formData.floors) : null,
        certificate: formData.certificate || null,
        electricity: formData.electricity ? parseInt(formData.electricity) : null,
        furnished: formData.furnished || null,
        facing: formData.facing || null,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        featured_image: formData.featured_image || null,
        features: formData.features
          ? formData.features.split(",").map((f) => f.trim()).filter(Boolean)
          : [],
      };

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Gagal menyimpan properti");
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-xl font-bold text-emerald-600">
            Kencana Admin
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/admin/properties" className="text-gray-600 hover:text-gray-800">
            Properti
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Tambah</span>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Tambah Properti Baru</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Properti <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Rumah Mewah 2 Lantai di Sleman"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Transaksi <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.transaction_type}
                    onChange={(e) => updateField("transaction_type", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  >
                    {TRANSACTION_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Properti <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => updateField("property_type", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Deskripsi lengkap properti..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Harga</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => updateField("price", e.target.value)}
                    placeholder="1500000000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label Harga
                  </label>
                  <input
                    type="text"
                    value={formData.price_label}
                    onChange={(e) => updateField("price_label", e.target.value)}
                    placeholder="/bulan, /tahun (untuk sewa)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Lokasi</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Jl. Kaliurang KM 10, Ngaglik"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kabupaten/Kota <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => updateField("district", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    value={formData.sub_district}
                    onChange={(e) => updateField("sub_district", e.target.value)}
                    placeholder="Ngaglik"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Spesifikasi</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Luas Tanah (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.land_size}
                    onChange={(e) => updateField("land_size", e.target.value)}
                    placeholder="200"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Luas Bangunan (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.building_size}
                    onChange={(e) => updateField("building_size", e.target.value)}
                    placeholder="150"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kamar Tidur
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => updateField("bedrooms", e.target.value)}
                    placeholder="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kamar Mandi
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => updateField("bathrooms", e.target.value)}
                    placeholder="2"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Lantai
                  </label>
                  <input
                    type="number"
                    value={formData.floors}
                    onChange={(e) => updateField("floors", e.target.value)}
                    placeholder="2"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sertifikat
                  </label>
                  <input
                    type="text"
                    value={formData.certificate}
                    onChange={(e) => updateField("certificate", e.target.value)}
                    placeholder="SHM, HGB"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Listrik (Watt)
                  </label>
                  <input
                    type="number"
                    value={formData.electricity}
                    onChange={(e) => updateField("electricity", e.target.value)}
                    placeholder="2200"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tahun Dibangun
                  </label>
                  <input
                    type="number"
                    value={formData.year_built}
                    onChange={(e) => updateField("year_built", e.target.value)}
                    placeholder="2020"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Furnish
                  </label>
                  <select
                    value={formData.furnished}
                    onChange={(e) => updateField("furnished", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  >
                    <option value="">Pilih</option>
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hadap
                  </label>
                  <input
                    type="text"
                    value={formData.facing}
                    onChange={(e) => updateField("facing", e.target.value)}
                    placeholder="Timur, Barat, dll"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
              </div>
            </section>

            {/* Media */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Media</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Gambar Utama
                </label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => updateField("featured_image", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload gambar akan tersedia di versi berikutnya
                </p>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Fitur</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fitur Properti
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => updateField("features", e.target.value)}
                  placeholder="Garasi, Taman, Kolam Renang, CCTV (pisahkan dengan koma)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                />
              </div>
            </section>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan sebagai Draft"}
              </button>
              <Link
                href="/admin/properties"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
