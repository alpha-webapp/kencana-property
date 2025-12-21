import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  // Get quick stats
  const [propertiesResult, inquiriesResult] = await Promise.all([
    supabase.from("properties").select("id, status", { count: "exact" }),
    supabase.from("inquiries").select("id, status", { count: "exact" }),
  ]);

  const properties = propertiesResult.data || [];
  const inquiries = inquiriesResult.data || [];

  const stats = {
    totalProperties: properties.length,
    publishedProperties: properties.filter(p => p.status === "published").length,
    draftProperties: properties.filter(p => p.status === "draft").length,
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter(i => i.status === "new").length,
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xl font-bold text-emerald-600">
              Kencana Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {profile.full_name || profile.email}
            </span>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Properti"
            value={stats.totalProperties}
            icon="🏠"
          />
          <StatCard
            title="Properti Aktif"
            value={stats.publishedProperties}
            icon="✅"
            subtitle={`${stats.draftProperties} draft`}
          />
          <StatCard
            title="Total Pesan"
            value={stats.totalInquiries}
            icon="📨"
          />
          <StatCard
            title="Pesan Baru"
            value={stats.newInquiries}
            icon="🔔"
            highlight={stats.newInquiries > 0}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Aksi Cepat
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/properties"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <span>🏠</span>
              Kelola Properti
            </Link>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>📨</span>
              Lihat Pesan
              {stats.newInquiries > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.newInquiries}
                </span>
              )}
            </Link>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>➕</span>
              Tambah Properti
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  subtitle,
  highlight,
}: {
  title: string;
  value: number;
  icon: string;
  subtitle?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${highlight ? "ring-2 ring-emerald-500" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
