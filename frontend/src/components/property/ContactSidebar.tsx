"use client";

import { useState } from "react";

interface ContactSidebarProps {
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
  };
  propertyId: string;
  propertyTitle: string;
  price: number;
  priceLabel?: string;
}

export default function ContactSidebar({
  agent,
  propertyId,
  propertyTitle,
  price,
  priceLabel = "",
}: ContactSidebarProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Halo, saya tertarik dengan properti "${propertyTitle}". Mohon informasi lebih lanjut.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format price
  const formatPrice = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)} Miliar`;
    } else if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(0)} Juta`;
    }
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  // WhatsApp link
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan properti "${propertyTitle}" (${formatPrice(price)}${priceLabel}). Mohon informasi lebih lanjut.`
  );
  const whatsappLink = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "property",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          property_id: propertyId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Gagal mengirim pesan");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
      {/* Price */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Harga</p>
        <p className="text-2xl font-bold text-gray-900">
          {formatPrice(price)}
          {priceLabel && (
            <span className="text-base font-normal text-gray-500">
              {priceLabel}
            </span>
          )}
        </p>
      </div>

      {/* Agent Info */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-emerald-600 font-semibold text-lg">
            {agent.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{agent.name}</p>
          <p className="text-sm text-gray-500">Agen Properti</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>

        <a
          href={`tel:${agent.phone}`}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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

        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-600 py-3 px-4 rounded-lg font-medium transition-colors"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Kirim Pesan
        </button>
      </div>

      {/* Contact Form */}
      {showForm && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-medium text-gray-900 mb-1">Pesan Terkirim!</p>
              <p className="text-sm text-gray-600">Tim kami akan menghubungi Anda segera.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="email@contoh.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="08xxxxxxxxxx (opsional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
