"use client";

import { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { saveService } from "@/app/admin/actions";
import { ArrowLeft, Save, Loader2, Briefcase, Layout, Palette, Globe, Layers, Settings, Sparkles } from "lucide-react";

export default function ServiceForm({ initialData }: { initialData?: Service }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        icon_url: initialData?.icon_url || "",
        order_index: initialData?.order_index || 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "order_index" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await saveService(formData, initialData?.id);
            router.push("/admin/services");
            router.refresh();
        } catch (error) {
            console.error("Error saving service:", error);
            alert("Error saving service");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                    <Link href="/admin/services">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {initialData ? "Edit" : "New"} <span className="gradient-text">Service</span>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {initialData ? "Update your service offering details." : "Add a new service to your agency."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/services">
                        <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
                    </Link>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="h-12 px-8 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 font-bold shadow-lg shadow-[#E91E8C]/20 border-0"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {initialData ? "Update Service" : "Create Service"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="premium-card p-8 bg-white/[0.02] border-white/5">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                                <Briefcase size={20} />
                            </div>
                            <h3 className="text-xl font-bold">Service Definition</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Service Name</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g., Enterprise UI/UX Design"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="What does this service entail?"
                                    rows={8}
                                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all resize-none"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <section className="premium-card p-6 bg-white/[0.02] border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                <Settings size={18} />
                            </div>
                            <h3 className="text-lg font-bold">Metadata</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="icon_url" className="text-gray-500 text-xs font-bold uppercase">Icon Name (Lucide)</Label>
                                <div className="relative">
                                    <Input
                                        id="icon_url"
                                        name="icon_url"
                                        placeholder="Layout, Palette, etc."
                                        value={formData.icon_url}
                                        onChange={handleChange}
                                        className="h-11 bg-white/3 border-white/10 rounded-xl pl-10"
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                                        <Layers size={16} />
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-600 mt-1 italic">Reference Lucide icon names.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order_index" className="text-gray-500 text-xs font-bold uppercase">Display Priority</Label>
                                <Input
                                    id="order_index"
                                    name="order_index"
                                    type="number"
                                    min={0}
                                    value={formData.order_index}
                                    onChange={handleChange}
                                    className="h-11 bg-white/3 border-white/10 rounded-xl"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="bg-gradient-to-br from-[#E91E8C]/20 to-transparent p-6 rounded-[2rem] border border-[#E91E8C]/10 text-center">
                        <Sparkles size={24} className="text-[#E91E8C] mx-auto mb-3" />
                        <h4 className="font-bold text-sm text-white mb-2">Service Excellence</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Clear and concise descriptions help conversion. Keep it benefit-oriented for the client.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
