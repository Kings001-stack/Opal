"use client";

import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { saveProject } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "./image-upload";
import { ArrowLeft, Save, Loader2, Image, FileText, Tag, Users, Layers, X, Plus, Sparkles } from "lucide-react";

export default function ProjectForm({ initialData }: { initialData?: Project }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || []);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    client_name: initialData?.client_name || "",
    featured_image_url: initialData?.featured_image_url || "",
    image_url: initialData?.image_url || "",
    results: initialData?.results || "",
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order_index" ? parseInt(value) : value,
    }));
  };

  const handleImageUpload = (url: string, field: "featured_image_url" | "image_url") => {
    setFormData((prev) => ({
      ...prev,
      [field]: url,
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Force refresh the session locally to ensure the cookie is up-to-date
      // BEFORE sending the server action request.
      const supabase = createClient();
      await supabase.auth.getSession();

      await saveProject(
        {
          ...formData,
          technologies,
        },
        initialData?.id
      );
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "Web Design",
    "Mobile App",
    "Branding",
    "UI/UX Design",
    "Product Design",
    "E-Commerce",
    "Dashboard",
    "Other"
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <Link href="/admin/projects">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {initialData ? "Edit" : "New"} <span className="gradient-text">Project</span>
            </h1>
            <p className="text-gray-500 mt-1">
              {initialData ? "Update existing project information." : "Add a new masterpiece to your portfolio."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/projects">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-12 px-8 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 font-bold shadow-lg shadow-[#E91E8C]/20 border-0"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-8">

          {/* Main Info */}
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                <FileText size={20} />
              </div>
              <h3 className="text-xl font-bold">Project Content</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Luxury Real Estate Platform"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-[#E91E8C]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Category</Label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-black">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-black">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Project Overview</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell the story of this project..."
                  rows={6}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all resize-none"
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Key Results</Label>
                <textarea
                  id="results"
                  name="results"
                  placeholder="What were the outcomes? (e.g., +50% conversion rate)"
                  rows={4}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all resize-none"
                  value={formData.results}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Visuals */}
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Image size={20} />
              </div>
              <h3 className="text-xl font-bold">Media Showcase</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Main Preview</p>
                <ImageUpload
                  onUpload={(url) => handleImageUpload(url, "featured_image_url")}
                  bucket="projects"
                  folder="featured"
                  currentImage={formData.featured_image_url}
                  label="Cover Image"
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Mockup Display</p>
                <ImageUpload
                  onUpload={(url) => handleImageUpload(url, "image_url")}
                  bucket="projects"
                  folder="additional"
                  currentImage={formData.image_url}
                  label="Inner Showcase"
                />
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Settings & Tech */}
        <div className="space-y-8">

          {/* Client & Order */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Users size={18} />
              </div>
              <h3 className="text-lg font-bold">Project Details</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="client_name" className="text-gray-500 text-xs font-bold uppercase">Client</Label>
                <Input
                  id="client_name"
                  name="client_name"
                  placeholder="Client or Project Name"
                  value={formData.client_name}
                  onChange={handleChange}
                  className="h-11 bg-white/3 border-white/10 rounded-xl"
                />
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

          {/* Tech Stack */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Layers size={18} />
                </div>
                <h3 className="text-lg font-bold">Tech Stack</h3>
              </div>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-500 font-bold uppercase tracking-widest">{technologies.length} Tools</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tool (e.g. Next.js)"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  className="h-11 bg-white/3 border-white/10 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  variant="outline"
                  className="h-11 w-11 rounded-xl p-0 border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Plus size={18} />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="group/tech flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 hover:border-[#E91E8C]/30 rounded-xl transition-all"
                  >
                    <span className="text-xs font-medium text-gray-300 group-hover/tech:text-white transition-colors">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {technologies.length === 0 && (
                  <p className="text-xs text-gray-600 italic py-2">No technologies added yet.</p>
                )}
              </div>
            </div>
          </section>

          {/* Pro Tip */}
          <div className="bg-gradient-to-br from-[#E91E8C]/20 to-transparent p-6 rounded-[2rem] border border-[#E91E8C]/10">
            <div className="flex items-center gap-3 mb-2 text-[#E91E8C]">
              <Sparkles size={18} />
              <h4 className="font-bold text-sm">Pro Tip</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Use high-resolution mockups (2500x1800px) for the best display quality.
              Adding results helps potential clients understand your value.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
