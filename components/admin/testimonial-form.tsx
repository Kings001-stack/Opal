"use client";

import { Testimonial } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { saveTestimonial } from "@/app/admin/actions";
import ImageUpload from "./image-upload";
import { ArrowLeft, Save, Loader2, MessageSquare, Star, User, Building2, Sparkles, Settings } from "lucide-react";

export default function TestimonialForm({ initialData }: { initialData?: Testimonial }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_name: initialData?.client_name || "",
    client_title: initialData?.client_title || "",
    company_name: initialData?.company_name || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    image_url: initialData?.image_url || "",
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["rating", "order_index"].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveTestimonial(formData, initialData?.id);
      router.push("/admin/testimonials");
      router.refresh();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Error saving testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <Link href="/admin/testimonials">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {initialData ? "Edit" : "New"} <span className="gradient-text">Testimonial</span>
            </h1>
            <p className="text-gray-500 mt-1">
              {initialData ? "Update client feedback details." : "Add a new client success story."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/testimonials">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-12 px-8 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 font-bold shadow-lg shadow-[#E91E8C]/20 border-0"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {initialData ? "Update Review" : "Save Review"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-xl font-bold">Review Content</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Client Words</Label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="What did the client say about working with you?"
                  rows={8}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all resize-none"
                  required
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Label htmlFor="rating" className="text-gray-500 text-xs font-bold uppercase block mb-3">Client Rating</Label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, rating: num }))}
                        className={`p-1.5 transition-all ${formData.rating >= num ? "text-yellow-500 scale-110" : "text-gray-700"}`}
                      >
                        <Star size={24} fill={formData.rating >= num ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order_index" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Priority</Label>
                  <Input
                    id="order_index"
                    name="order_index"
                    type="number"
                    min={0}
                    value={formData.order_index}
                    onChange={handleChange}
                    className="h-12 bg-white/5 border-white/10 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Client Identity */}
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <User size={20} />
              </div>
              <h3 className="text-xl font-bold">Client Identity</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="client_name" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Full Name</Label>
                <Input
                  id="client_name"
                  name="client_name"
                  placeholder="John Doe"
                  required
                  value={formData.client_name}
                  onChange={handleChange}
                  className="h-12 bg-white/5 border-white/10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_title" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Job Title</Label>
                <Input
                  id="client_title"
                  name="client_title"
                  placeholder="CEO, Founder, etc."
                  value={formData.client_title}
                  onChange={handleChange}
                  className="h-12 bg-white/5 border-white/10 rounded-xl"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company_name" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Company Name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  placeholder="Acme Inc."
                  value={formData.company_name}
                  onChange={handleChange}
                  className="h-12 bg-white/5 border-white/10 rounded-xl"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Visuals & Tips */}
        <div className="space-y-8">
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Settings size={18} />
              </div>
              <h3 className="text-lg font-bold">Avatar</h3>
            </div>

            <div className="flex flex-col items-center gap-6">
              <ImageUpload
                onUpload={handleImageUpload}
                bucket="testimonials"
                folder="avatars"
                currentImage={formData.image_url}
                label="Client Profile Photo"
              />
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">Use a 1:1 square photo for best results.</p>
            </div>
          </section>

          <div className="bg-gradient-to-br from-[#E91E8C]/20 to-transparent p-6 rounded-[2rem] border border-[#E91E8C]/10 text-center">
            <Sparkles size={24} className="text-[#E91E8C] mx-auto mb-3" />
            <h4 className="font-bold text-sm text-white mb-2">Social Proof Tip</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Testimonials with client photos and company names are perceived as significantly more trustworthy by potential clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
