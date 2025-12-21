import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/");

  // Fetch all inquiries
  const adminClient = await createAdminClient();
  const { data: inquiries } = await adminClient
    .from("inquiries")
    .select("*, properties(title, slug)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-xl font-bold text-emerald-600">
            Kencana Admin
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Pesan Masuk</span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Pengirim
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Pesan
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Tipe
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Tanggal
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries && inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id} 
                    className={`hover:bg-gray-50 ${inquiry.status === "new" ? "bg-emerald-50" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{inquiry.name}</p>
                        <p className="text-sm text-gray-500">{inquiry.email}</p>
                        {inquiry.phone && (
                          <p className="text-sm text-gray-500">{inquiry.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {inquiry.subject && (
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {inquiry.subject}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 truncate">
                        {inquiry.message}
                      </p>
                      {inquiry.properties && (
                        <Link
                          href={`/properti/${inquiry.properties.slug}`}
                          target="_blank"
                          className="text-xs text-emerald-600 hover:underline"
                        >
                          📍 {inquiry.properties.title}
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        inquiry.type === "property" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {inquiry.type === "property" ? "Properti" : "Kontak"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={inquiry.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(inquiry.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inquiry.status === "new" && (
                          <StatusButton 
                            id={inquiry.id} 
                            newStatus="read" 
                            label="Tandai Dibaca"
                            emoji="✓"
                          />
                        )}
                        {inquiry.status === "read" && (
                          <StatusButton 
                            id={inquiry.id} 
                            newStatus="replied" 
                            label="Tandai Dibalas"
                            emoji="↩"
                          />
                        )}
                        {inquiry.status !== "closed" && (
                          <StatusButton 
                            id={inquiry.id} 
                            newStatus="closed" 
                            label="Tutup"
                            emoji="✕"
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Belum ada pesan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-emerald-100 text-emerald-800",
    read: "bg-blue-100 text-blue-800",
    replied: "bg-purple-100 text-purple-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const labels: Record<string, string> = {
    new: "Baru",
    read: "Dibaca",
    replied: "Dibalas",
    closed: "Ditutup",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100"}`}>
      {labels[status] || status}
    </span>
  );
}

function StatusButton({ 
  id, 
  newStatus, 
  label, 
  emoji 
}: { 
  id: string; 
  newStatus: string; 
  label: string;
  emoji: string;
}) {
  async function updateStatus() {
    "use server";
    const { createAdminClient } = await import("@/lib/supabase/server");
    const supabase = await createAdminClient();
    
    const updateData: Record<string, unknown> = { status: newStatus };
    if (newStatus === "read") {
      updateData.read_at = new Date().toISOString();
    } else if (newStatus === "replied") {
      updateData.replied_at = new Date().toISOString();
    }
    
    await supabase
      .from("inquiries")
      .update(updateData)
      .eq("id", id);
    
    revalidatePath("/admin/inquiries");
  }

  return (
    <form action={updateStatus}>
      <button
        type="submit"
        className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
        title={label}
      >
        {emoji}
      </button>
    </form>
  );
}
