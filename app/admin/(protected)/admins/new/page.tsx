import AdminForm from "@/components/admin/admin-form";
import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewAdminPage() {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) redirect("/admin/login");

    const { data: currentAdmin } = await supabase
        .from("admins")
        .select("role")
        .eq("id", user.id)
        .single();

    if (currentAdmin?.role !== "super_admin") {
        redirect("/admin/dashboard");
    }

    return (
        <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
            <AdminForm />
        </div>
    );
}
