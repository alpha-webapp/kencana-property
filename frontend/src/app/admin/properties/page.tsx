"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const res = await fetch("/api/properties?all=true");
    const data = await res.json();
    if (data.success) {
      setProperties(data.data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus properti "${title}"?`)) return;
    
    const res = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
    });
    
    if (res.ok) {
      router.refresh();
      fetchProperties();
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xl font-bold text-emerald-600">
              Kencana Admin
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Properti</span>
          </div>
          <Link
            href="/admin/properties/new"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            + Tambah Properti
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Memuat...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Properti
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Tipe
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Harga
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.length > 0 ? (
                  properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {property.featured_image && (
                            <img
                              src={property.featured_image}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {property.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {property.district}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize">{property.property_type}</span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-sm text-gray-500">
                          {property.transaction_type === "dijual" ? "Dijual" : "Disewa"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium">
                          Rp {property.price.toLocaleString("id-ID")}
                        </span>
                        {property.price_label && (
                          <span className="text-gray-500">{property.price_label}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={property.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/properti/${property.slug}`}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-600"
                            title="Lihat"
                          >
                            👁
                          </Link>
                          <Link
                            href={`/admin/properties/${property.id}/edit`}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            ✏️
                          </Link>
                          <button
                            onClick={() => handleDelete(property.id, property.title)}
                            className="text-red-600 hover:text-red-800"
                            title="Hapus"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Belum ada properti. 
                      <Link href="/admin/properties/new" className="text-emerald-600 ml-1">
                        Tambah sekarang
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}

interface Property {
  id: string;
  title: string;
  slug: string;
  property_type: string;
  transaction_type: string;
  price: number;
  price_label: string | null;
  district: string;
  status: string;
  featured_image: string | null;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    sold: "bg-blue-100 text-blue-800",
    rented: "bg-purple-100 text-purple-800",
  };

  const labels: Record<string, string> = {
    published: "Aktif",
    draft: "Draft",
    sold: "Terjual",
    rented: "Tersewa",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
      {labels[status] || status}
    </span>
  );
}
