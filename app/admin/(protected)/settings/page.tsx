import { createClient } from "@/lib/supabase/server";
import { Settings as SettingsIcon, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SettingsForm from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
    const supabase = await createClient();

    const { data: settings, error } = await supabase
        .from("settings")
        .select("*");

    if (error) {
        console.error("[AdminSettingsPage] Failed to load settings:", error.message);
    }

    // Transform array of {key, value} rows into a plain object
    const settingsMap = (settings || []).reduce((acc: Record<string, string>, item: any) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    return (
        <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                        <SettingsIcon size={14} className="text-[#E91E8C]" />
                        <span className="uppercase tracking-widest text-xs">Configuration</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Site <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Manage global site content, including hero images displayed on the homepage.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/dashboard">
                        <Button variant="outline" className="h-11 px-5 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
                            <ArrowLeft size={16} />
                            Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <section className="premium-card p-8 bg-white/[0.02] border-white/5">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Hero Gallery</h3>
                            <p className="text-gray-500 text-sm mt-0.5">
                                These 4 images appear as floating cards in the hero section of your homepage.
                            </p>
                        </div>
                    </div>

                    <SettingsForm initialSettings={settingsMap} />
                </section>
            </div>
        </div>
    );
}
