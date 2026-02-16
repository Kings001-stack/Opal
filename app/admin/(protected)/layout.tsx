import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Double check admin role with better error handling
  const supabase = await createClient();
  try {
    const { data: adminData, error } = await supabase
      .from("admins")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !adminData) {
      console.warn("[AdminLayout] Admin check failed:", error);
      redirect("/admin/login");
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <AdminSidebar firstName={adminData.first_name || "Admin"} />
        <main className="lg:ml-64 min-h-screen">{children}</main>
      </div>
    );
  } catch (error) {
    console.error("[AdminLayout] Database error:", error);
    redirect("/admin/login");
  }
}
