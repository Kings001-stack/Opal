"use client";

import { Service } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/app/admin/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2, Briefcase } from "lucide-react";

export default function ServicesTable({ services }: { services: Service[] }) {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        setLoading(id);
        try {
            await deleteService(id);
            router.refresh();
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.01]">
                    <tr className="border-b border-white/5">
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] w-16">#</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Service</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Description</th>
                        <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {services.map((service) => (
                        <tr key={service.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-5 px-6 font-mono text-xs text-gray-500">
                                {service.order_index}
                            </td>
                            <td className="py-5 px-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#E91E8C]/10 border border-[#E91E8C]/20 flex items-center justify-center text-[#E91E8C]">
                                        <Briefcase size={18} />
                                    </div>
                                    <span className="font-bold text-white group-hover:text-[#E91E8C] transition-colors">
                                        {service.title}
                                    </span>
                                </div>
                            </td>
                            <td className="py-5 px-6 text-gray-400 text-sm max-w-xs truncate">
                                {service.description}
                            </td>
                            <td className="py-5 px-6 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/services/${service.id}`}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                        >
                                            <Pencil size={18} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                        onClick={() => handleDelete(service.id)}
                                        disabled={loading === service.id}
                                    >
                                        {loading === service.id ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {services.length === 0 && (
                <div className="text-center py-20 bg-white/[0.01]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
                        <Briefcase size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No services listed yet.</p>
                </div>
            )}
        </div>
    );
}
