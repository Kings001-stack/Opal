"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { addAdminByEmail } from "@/app/admin/actions";
import { ArrowLeft, Save, Loader2, UserPlus, Mail, User, ShieldCheck, Lock } from "lucide-react";

export default function AdminForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        role: "admin",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await addAdminByEmail(formData.email, formData.firstName, formData.lastName, formData.role, formData.password);
            router.push("/admin/admins");
            router.refresh();
        } catch (err: any) {
            console.error("Error adding admin:", err);
            setError(err.message || "Error adding admin. Ensure the user has signed up first.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                    <Link href="/admin/admins">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Add New <span className="gradient-text">Admin</span>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Grant administrative access to an existing user.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/admins">
                        <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
                    </Link>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="h-12 px-8 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 font-bold shadow-lg shadow-[#E91E8C]/20 border-0"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        Add Admin
                    </Button>
                </div>
            </div>

            <div className="max-w-2xl">
                <section className="premium-card p-8 bg-white/[0.02] border-white/5">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                            <UserPlus size={20} />
                        </div>
                        <h3 className="text-xl font-bold">Admin Information</h3>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">User Email</Label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="user@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">User Password</Label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                                />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">If the user doesn't exist, an account will be created automatically.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Dashboard Role</Label>
                            <div className="relative">
                                <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="admin" className="bg-[#0A0A0A]">Standard Admin</option>
                                    <option value="super_admin" className="bg-[#0A0A0A]">Super Admin</option>
                                </select>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-1">Super Admins can manage other admins and security settings.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">First Name</Label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Last Name</Label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="h-12 pl-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
