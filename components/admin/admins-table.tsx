"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { removeAdmin, removePendingAdmin } from "@/app/admin/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, ShieldCheck, Mail, Calendar, Clock } from "lucide-react";

export default function AdminsTable({ admins, pendingAdmins = [], currentUserId }: { admins: any[], pendingAdmins?: any[], currentUserId: string }) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string, isPending: boolean = false, email?: string) => {
        if (!isPending && id === currentUserId) {
            alert("You cannot remove yourself as an admin.");
            return;
        }

        const message = isPending
            ? "Are you sure you want to remove this pending admin invitation?"
            : "Are you sure you want to remove this admin? They will lose dashboard access immediately.";

        if (!confirm(message)) return;

        setLoading(isPending ? email || id : id);
        try {
            if (isPending && email) {
                await removePendingAdmin(email);
            } else {
                await removeAdmin(id);
            }
            router.refresh();
        } catch (err: any) {
            console.error("Error removing admin:", err);
            alert("Failed to remove admin.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.01]">
                    <tr className="border-b border-white/5">
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Admin User</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Role / Status</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Date</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {/* Active Admins */}
                    {admins.map((admin) => (
                        <tr key={admin.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {admin.first_name} {admin.last_name}
                                            {admin.id === currentUserId && <span className="ml-2 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">You</span>}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5 font-mono">
                                            ID: {admin.id.substring(0, 8)}...
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-5 px-6">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${admin.role === 'super_admin'
                                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                    {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                </span>
                            </td>
                            <td className="py-5 px-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-600" />
                                    {new Date(admin.created_at).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="py-5 px-6 text-right">
                                {admin.id !== currentUserId && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                        onClick={() => handleDelete(admin.id)}
                                        disabled={loading === admin.id}
                                    >
                                        {loading === admin.id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}

                    {/* Pending Admins */}
                    {pendingAdmins.map((pending) => (
                        <tr key={pending.email} className="group hover:bg-white/[0.02] transition-colors border-l-2 border-yellow-500/30">
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-300">
                                            {pending.first_name} {pending.last_name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                                            <Mail size={12} />
                                            <span>{pending.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-5 px-6">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                    Pending Signup
                                </span>
                            </td>
                            <td className="py-5 px-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-600" />
                                    {new Date(pending.created_at).toLocaleDateString()}
                                </div>
                            </td>
                            <td className="py-5 px-6 text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                    onClick={() => handleDelete("", true, pending.email)}
                                    disabled={loading === pending.email}
                                >
                                    {loading === pending.email ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Trash2 size={18} />
                                    )}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {admins.length === 0 && pendingAdmins.length === 0 && (
                <div className="text-center py-20 bg-white/[0.01]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
                        <ShieldCheck size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No admins found.</p>
                </div>
            )}
        </div>
    );
}
