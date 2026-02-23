"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X, LayoutDashboard, Briefcase, FolderKanban, FileText, MessageSquare, Calendar, ShieldCheck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AdminMobileHeader({ firstName, email, role }: { firstName: string, email?: string, role?: string }) {
    const [isOpen, setIsOpen] = useState(false);
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
        ...(isSuperAdmin ? [{ href: "/admin/admins", icon: ShieldCheck, label: "Admins" }] : []),
    ];

    return (
        <div className="lg:hidden">
            {/* Header Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 z-50">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">OP</span>
                    </div>
                    <span className="font-bold text-lg">OPAL</span>
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black z-40 pt-20 pb-6 px-6 overflow-y-auto">
                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${isSuperAdmin ? "bg-[#E91E8C]" : "bg-blue-500"}`} />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    {isSuperAdmin ? "Super Admin" : "Administrator"}
                                </p>
                            </div>
                            <p className="text-sm font-bold text-white">{firstName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{email}</p>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    <item.icon size={20} className="text-[#E91E8C]" />
                                    <span className="text-base font-medium">{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="pt-6 border-t border-white/5 space-y-2">
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <Home size={20} />
                                <span className="text-base font-medium">View Website</span>
                            </Link>
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="w-full justify-start text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-xl h-12"
                            >
                                <LogOut size={20} className="mr-3" />
                                <span className="text-base font-medium">Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
