"use client";

import { useState } from "react";
import Link from "next/link";

// Form data type
interface PropertyFormData {
  // Step 1: Basic Info
  listingType: "dijual" | "disewakan" | "";
  propertyType: string;

  // Step 2: Location
  address: string;
  district: string;
  subDistrict: string;

  // Step 3: Details
  price: string;
  landArea: string;
  buildingArea: string;
  bedrooms: string;
  bathrooms: string;
  certificate: string;

  // Step 4: Description & Images
  title: string;
  description: string;
  features: string;

  // Step 5: Contact
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

const initialFormData: PropertyFormData = {
  listingType: "",
  propertyType: "",
  address: "",
  district: "",
  subDistrict: "",
  price: "",
  landArea: "",
  buildingArea: "",
  bedrooms: "",
  bathrooms: "",
  certificate: "",
  title: "",
  description: "",
  features: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
};

const propertyTypes = [
  { value: "rumah", label: "Rumah", icon: "🏠" },
  { value: "apartemen", label: "Apartemen", icon: "🏢" },
  { value: "tanah", label: "Tanah", icon: "🌳" },
  { value: "ruko", label: "Ruko", icon: "🏪" },
  { value: "kost", label: "Kost", icon: "🏨" },
  { value: "villa", label: "Villa", icon: "🏡" },
];

const districts = [
  "Sleman",
  "Bantul",
  "Kota Yogyakarta",
  "Gunung Kidul",
  "Kulon Progo",
];

const certificates = [
  { value: "shm", label: "SHM (Sertifikat Hak Milik)" },
  { value: "shgb", label: "SHGB (Sertifikat Hak Guna Bangunan)" },
  { value: "shp", label: "SHP (Sertifikat Hak Pakai)" },
  { value: "girik", label: "Girik / Letter C" },
  { value: "ppjb", label: "PPJB" },
  { value: "lainnya", label: "Lainnya" },
];

export default function JualPropertiPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<PropertyFormData>>({});

  const totalSteps = 5;

  const updateFormData = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<PropertyFormData> = {};

    switch (step) {
      case 1:
        if (!formData.listingType) newErrors.listingType = "Pilih tipe listing";
        if (!formData.propertyType)
          newErrors.propertyType = "Pilih tipe properti";
        break;
      case 2:
        if (!formData.address) newErrors.address = "Alamat wajib diisi";
        if (!formData.district) newErrors.district = "Pilih kabupaten/kota";
        break;
      case 3:
        if (!formData.price) newErrors.price = "Harga wajib diisi";
        if (!formData.landArea) newErrors.landArea = "Luas tanah wajib diisi";
        break;
      case 4:
        if (!formData.title) newErrors.title = "Judul iklan wajib diisi";
        if (!formData.description)
          newErrors.description = "Deskripsi wajib diisi";
        break;
      case 5:
        if (!formData.ownerName) newErrors.ownerName = "Nama wajib diisi";
        if (!formData.ownerPhone)
          newErrors.ownerPhone = "Nomor telepon wajib diisi";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // In real app, this would send to API
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  // Format price to Indonesian Rupiah
  const formatPrice = (value: string) => {
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (isSubmitted) {
    return <SuccessPage formData={formData} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Pasang Iklan Properti
          </h1>
          <p className="text-gray-600">
            Jual atau sewakan properti Anda dengan mudah
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step < currentStep
                      ? "bg-emerald-600 text-white"
                      : step === currentStep
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 5 && (
                  <div
                    className={`hidden sm:block w-12 md:w-20 h-1 mx-1 ${
                      step < currentStep ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Tipe</span>
            <span>Lokasi</span>
            <span>Detail</span>
            <span>Deskripsi</span>
            <span>Kontak</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Step 1: Listing Type & Property Type */}
          {currentStep === 1 && (
            <Step1
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {/* Step 3: Property Details */}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              formatPrice={formatPrice}
            />
          )}

          {/* Step 4: Description & Images */}
          {currentStep === 4 && (
            <Step4
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {/* Step 5: Contact Info */}
          {currentStep === 5 && (
            <Step5
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Kembali
              </button>
            ) : (
              <Link
                href="/"
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Batal
              </Link>
            )}

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Lanjut →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Kirim Iklan
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Step 1: Listing Type & Property Type
function Step1({
  formData,
  updateFormData,
  errors,
}: {
  formData: PropertyFormData;
  updateFormData: (field: keyof PropertyFormData, value: string) => void;
  errors: Partial<PropertyFormData>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Apa yang ingin Anda lakukan?
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateFormData("listingType", "dijual")}
            className={`p-4 border-2 rounded-xl text-center transition-colors ${
              formData.listingType === "dijual"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl mb-2 block">💰</span>
            <span className="font-medium text-gray-900">Jual Properti</span>
          </button>
          <button
            type="button"
            onClick={() => updateFormData("listingType", "disewakan")}
            className={`p-4 border-2 rounded-xl text-center transition-colors ${
              formData.listingType === "disewakan"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl mb-2 block">🔑</span>
            <span className="font-medium text-gray-900">Sewakan Properti</span>
          </button>
        </div>
        {errors.listingType && (
          <p className="text-red-500 text-sm mt-2">{errors.listingType}</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tipe Properti
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updateFormData("propertyType", type.value)}
              className={`p-3 border-2 rounded-xl text-center transition-colors ${
                formData.propertyType === type.value
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-xl mb-1 block">{type.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {type.label}
              </span>
            </button>
          ))}
        </div>
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>
        )}
      </div>
    </div>
  );
}

// Step 2: Location
function Step2({
  formData,
  updateFormData,
  errors,
}: {
  formData: PropertyFormData;
  updateFormData: (field: keyof PropertyFormData, value: string) => void;
  errors: Partial<PropertyFormData>;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Lokasi Properti
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Kabupaten/Kota <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.district}
          onChange={(e) => updateFormData("district", e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.district ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Pilih Kabupaten/Kota</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="text-red-500 text-sm mt-1">{errors.district}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Kecamatan
        </label>
        <input
          type="text"
          value={formData.subDistrict}
          onChange={(e) => updateFormData("subDistrict", e.target.value)}
          placeholder="Contoh: Depok, Mlati, Ngaglik"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => updateFormData("address", e.target.value)}
          placeholder="Masukkan alamat lengkap properti (tanpa nomor rumah jika privasi)"
          rows={3}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>
    </div>
  );
}

// Step 3: Property Details
function Step3({
  formData,
  updateFormData,
  errors,
  formatPrice,
}: {
  formData: PropertyFormData;
  updateFormData: (field: keyof PropertyFormData, value: string) => void;
  errors: Partial<PropertyFormData>;
  formatPrice: (value: string) => string;
}) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    updateFormData("price", formatted);
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Detail Properti
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Harga{" "}
          {formData.listingType === "disewakan" ? "(per tahun)" : "(Rupiah)"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            Rp
          </span>
          <input
            type="text"
            value={formData.price}
            onChange={handlePriceChange}
            placeholder="0"
            className={`w-full pl-12 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Luas Tanah (m²) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.landArea}
            onChange={(e) => updateFormData("landArea", e.target.value)}
            placeholder="100"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.landArea ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.landArea && (
            <p className="text-red-500 text-sm mt-1">{errors.landArea}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Luas Bangunan (m²)
          </label>
          <input
            type="number"
            value={formData.buildingArea}
            onChange={(e) => updateFormData("buildingArea", e.target.value)}
            placeholder="80"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {formData.propertyType !== "tanah" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Kamar Tidur
            </label>
            <select
              value={formData.bedrooms}
              onChange={(e) => updateFormData("bedrooms", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Pilih</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n} {n > 1 ? "Kamar" : "Kamar"}
                </option>
              ))}
              <option value="10+">10+ Kamar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Kamar Mandi
            </label>
            <select
              value={formData.bathrooms}
              onChange={(e) => updateFormData("bathrooms", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Pilih</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n} Kamar Mandi
                </option>
              ))}
              <option value="10+">10+ Kamar Mandi</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Sertifikat
        </label>
        <select
          value={formData.certificate}
          onChange={(e) => updateFormData("certificate", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Pilih Jenis Sertifikat</option>
          {certificates.map((cert) => (
            <option key={cert.value} value={cert.value}>
              {cert.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Step 4: Description & Images
function Step4({
  formData,
  updateFormData,
  errors,
}: {
  formData: PropertyFormData;
  updateFormData: (field: keyof PropertyFormData, value: string) => void;
  errors: Partial<PropertyFormData>;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Deskripsi Properti
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Judul Iklan <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          placeholder="Contoh: Rumah Minimalis 2 Lantai di Jalan Kaliurang"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Deskripsi Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="Jelaskan detail properti Anda: kondisi, kelebihan, akses jalan, fasilitas terdekat, dll."
          rows={5}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Minimal 50 karakter. Saat ini: {formData.description.length} karakter
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Fitur & Fasilitas
        </label>
        <textarea
          value={formData.features}
          onChange={(e) => updateFormData("features", e.target.value)}
          placeholder="Contoh: Carport 2 mobil, Taman depan & belakang, AC 3 unit, Water heater, CCTV"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Pisahkan dengan koma untuk setiap fitur
        </p>
      </div>

      {/* Image Upload Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Foto Properti
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">📷</div>
          <p className="text-gray-600 mb-2">
            Upload foto properti Anda di sini
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Maksimal 10 foto, format JPG/PNG, ukuran max 5MB per foto
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Pilih Foto
          </button>
          <p className="text-xs text-amber-600 mt-4">
            ⚠️ Fitur upload akan tersedia setelah integrasi backend
          </p>
        </div>
      </div>
    </div>
  );
}

// Step 5: Contact Info
function Step5({
  formData,
  updateFormData,
  errors,
}: {
  formData: PropertyFormData;
  updateFormData: (field: keyof PropertyFormData, value: string) => void;
  errors: Partial<PropertyFormData>;
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Informasi Kontak
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Informasi ini akan digunakan untuk menghubungi Anda terkait listing
        properti.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.ownerName}
          onChange={(e) => updateFormData("ownerName", e.target.value)}
          placeholder="Nama Anda"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.ownerName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.ownerName && (
          <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nomor WhatsApp / Telepon <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          value={formData.ownerPhone}
          onChange={(e) => updateFormData("ownerPhone", e.target.value)}
          placeholder="08123456789"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            errors.ownerPhone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.ownerPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.ownerPhone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={formData.ownerEmail}
          onChange={(e) => updateFormData("ownerEmail", e.target.value)}
          placeholder="email@contoh.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">🔒 Privasi:</span> Informasi kontak Anda
          hanya akan digunakan untuk keperluan verifikasi dan tidak akan
          ditampilkan publik tanpa persetujuan Anda.
        </p>
      </div>
    </div>
  );
}

// Success Page Component
function SuccessPage({ formData }: { formData: PropertyFormData }) {
  const whatsappNumber = "6281234567890";
  const whatsappMessage = encodeURIComponent(
    `Halo, saya baru saja submit listing properti:\n\n` +
      `📍 ${formData.title}\n` +
      `📌 ${formData.district}\n` +
      `💰 Rp ${formData.price}\n\n` +
      `Mohon informasi selanjutnya. Terima kasih!`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Iklan Berhasil Dikirim!
          </h1>
          <p className="text-gray-600 mb-6">
            Terima kasih telah mendaftarkan properti Anda. Tim kami akan
            meninjau dan menghubungi Anda dalam 1x24 jam.
          </p>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Ringkasan Listing:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium">Judul:</span> {formData.title}
              </li>
              <li>
                <span className="font-medium">Tipe:</span>{" "}
                {formData.listingType === "dijual" ? "Dijual" : "Disewakan"}
              </li>
              <li>
                <span className="font-medium">Lokasi:</span> {formData.district}
              </li>
              <li>
                <span className="font-medium">Harga:</span> Rp {formData.price}
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-emerald-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-emerald-800 mb-2">
              Langkah Selanjutnya:
            </h3>
            <ol className="text-sm text-emerald-700 space-y-2">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <span>Tim kami akan meninjau data properti Anda</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <span>Anda akan dihubungi untuk verifikasi & upload foto</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <span>Setelah disetujui, iklan akan tayang di website</span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hubungi via WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
