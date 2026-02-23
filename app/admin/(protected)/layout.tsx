import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminMobileHeader } from "@/components/admin/admin-mobile-header";

/**
 * Navigation-Safe Admin Layout
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Authoritative check (Priority: Proxy Headers -> Passive Session)
  const user = await getUser();

  // If there's absolutely no session found, only then do we redirect.
  if (!user) {
    console.log("[AdminLayout] No session detected. Redirecting to login.");
    redirect("/admin/login");
  }

  // 2. Optimized Admin Check
  // We use a local cache/singleton client to avoid redundant DB hits during navigation.
  let adminData: any = null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data && !error) {
      adminData = data;
    } else {
      console.warn("[AdminLayout] User is authenticated but no record found in 'admins' table.");
      // If user exists in Auth but not in Admins table, they shouldn't be here.
      if (error?.code === 'PGRST116') {
        redirect("/admin/login");
      }

      // Fallback: If it's a transient DB error, don't crash the session.
      adminData = { first_name: "User", role: "admin" };
    }
  } catch (err) {
    console.error("[AdminLayout] Transient database error during navigation.");
    adminData = { first_name: "User", role: "admin" };
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar
        firstName={adminData.first_name || "Admin"}
        email={user.email || ""}
        role={adminData.role}
      />
      <AdminMobileHeader
        firstName={adminData.first_name || "Admin"}
        email={user.email || ""}
        role={adminData.role}
      />
      <main className="pt-16 lg:pt-0 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
