import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminsTable from "@/components/admin/admins-table";
import { Plus, ShieldCheck, ArrowLeft } from "lucide-react";
import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminAdminsPage() {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) redirect("/admin/login");

    // Check if current user is super admin
    const { data: currentAdmin } = await supabase
        .from("admins")
        .select("role")
        .eq("id", user.id)
        .single();

    if (currentAdmin?.role !== "super_admin") {
        redirect("/admin/dashboard");
    }

    const { data: admins } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

    const { data: pendingAdmins } = await supabase
        .from("pending_admins")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                        <ShieldCheck size={14} className="text-[#E91E8C]" />
                        <span className="uppercase tracking-widest text-xs">Security & Access</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Manage <span className="gradient-text">Admins</span>
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Control who has access to this administration dashboard.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/dashboard">
                        <Button variant="outline" className="h-11 px-5 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                    </Link>
                    <Link href="/admin/admins/new">
                        <Button className="h-11 px-6 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 border-0">
                            <Plus size={18} />
                            Add Admin
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Table Card */}
            <div className="premium-card bg-white/[0.02] border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/[0.01]">
                    <h3 className="font-bold text-lg">Platform Administrators ({admins?.length || 0})</h3>
                </div>
                <div className="p-0">
                    <AdminsTable
                        admins={admins || []}
                        pendingAdmins={pendingAdmins || []}
                        currentUserId={user?.id || ""}
                    />
                </div>
            </div>
        </div>
    );
}
