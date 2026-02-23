"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Briefcase,
    FolderKanban,
    FileText,
    MessageSquare,
    Calendar,
    Home,
    ShieldCheck,
    LogOut,
    LayoutDashboard,
    Settings,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function AdminSidebar({ firstName, email, role }: { firstName: string, email?: string, role?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const isSuperAdmin = role === "super_admin";

    const navItems = [
        { href: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
        { href: "/admin/services", icon: Briefcase, label: "Services" },
        { href: "/admin/projects", icon: FolderKanban, label: "Projects" },
        { href: "/admin/blog", icon: FileText, label: "Blog Posts" },
        { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
        { href: "/admin/bookings", icon: Calendar, label: "Bookings" },
        ...(isSuperAdmin ? [
            { href: "/admin/admins", icon: ShieldCheck, label: "Admins" },
            { href: "/admin/settings", icon: Settings, label: "Site Settings" }
        ] : []),
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0A] border-r border-white/5 hidden lg:flex flex-col z-40">
            <div className="p-6 border-b border-white/5">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">OP</span>
                    </div>
                    <span className="text-xl font-bold">
                        <span className="text-white">OP</span>
                        <span className="text-[#E91E8C]">AL</span>
                    </span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto p-4 mt-2 custom-scrollbar">
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${isSuperAdmin ? "bg-[#E91E8C]" : "bg-blue-500"}`} />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            {isSuperAdmin ? "Super Admin" : "Administrator"}
                        </p>
                    </div>
                    <p className="text-sm font-bold text-white truncate">{firstName}</p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{email}</p>
                </div>

                <nav className="space-y-1">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Management</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? "bg-gradient-to-r from-[#E91E8C]/10 to-transparent text-white border-l-2 border-[#E91E8C]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={18} className={isActive ? "text-[#E91E8C]" : "group-hover:text-[#E91E8C]"} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-6">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">System</p>
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <Home size={18} className="group-hover:text-[#E91E8C]" />
                            <span className="text-sm font-medium">View Website</span>
                            <ArrowUpRight size={14} className="ml-auto opacity-50" />
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-white/5">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 transition-all rounded-xl h-12"
                >
                    <LogOut size={18} className="mr-3" />
                    <span className="text-sm font-medium">Logout</span>
                </Button>
            </div>
        </aside>
    );
}
