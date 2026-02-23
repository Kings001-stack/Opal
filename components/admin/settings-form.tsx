"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveSettings } from "@/app/admin/actions";
import ImageUpload from "./image-upload";
import { Save, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>(initialSettings);

    const handleImageUpload = (key: string, url: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: url,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await saveSettings(formData);
            router.refresh();
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Error saving settings");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Hero Card {num}</span>
                            {formData[`hero_image_${num}`] && (
                                <Sparkles size={14} className="text-[#E91E8C]" />
                            )}
                        </div>
                        <div className="relative group">
                            <ImageUpload
                                onUpload={(url) => handleImageUpload(`hero_image_${num}`, url)}
                                bucket="site-content"
                                folder="hero"
                                currentImage={formData[`hero_image_${num}`]}
                                label={`Hero Photo ${num}`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-10 border-t border-white/5 flex items-center justify-between bg-white/[0.01] -mx-8 -mb-8 p-8 rounded-b-[2rem]">
                <div className="flex items-center gap-3 text-gray-500 max-w-md">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <p className="text-xs leading-relaxed">
                        Changes to hero images will be reflected immediately on the homepage.
                        Recommended size: 600x800px or similar aspect ratio.
                    </p>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="h-14 px-10 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-2xl gap-3 font-bold shadow-xl shadow-[#E91E8C]/20 border-0 transition-all active:scale-95"
                >
                    {isLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Save size={20} />
                    )}
                    Save All Changes
                </Button>
            </div>
        </div>
    );
}
