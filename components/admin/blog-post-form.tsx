"use client";

import { BlogPost } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { saveBlogPost } from "@/app/admin/actions";
import ImageUpload from "./image-upload";
import { ArrowLeft, Save, Loader2, FileText, Image, Globe, CheckCircle2, AlertCircle, Sparkles, Hash, AlignLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function BlogPostForm({ initialData }: { initialData?: BlogPost }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    featured_image_url: initialData?.featured_image_url || "",
    published: initialData?.published || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      featured_image_url: url,
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveBlogPost(
        {
          ...formData,
          published_at: formData.published ? (initialData?.published_at || new Date().toISOString()) : null,
        },
        initialData?.id
      );
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <Link href="/admin/blog">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {initialData ? "Edit" : "New"} <span className="gradient-text">Article</span>
            </h1>
            <p className="text-gray-500 mt-1">
              {initialData ? "Refine your thoughts and insights." : "Share your expertise with the world."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Cancel</Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-12 px-8 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 font-bold shadow-lg shadow-[#E91E8C]/20 border-0"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {initialData ? "Update Article" : "Publish Article"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Main Editor */}
        <div className="lg:col-span-3 space-y-8">

          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Article Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., The Future of Digital Experiences"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={!formData.slug ? generateSlug : undefined}
                  className="h-14 text-xl font-bold bg-transparent border-0 border-b border-white/10 rounded-none focus:ring-0 focus:border-[#E91E8C] transition-all px-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-gray-500 text-xs font-bold uppercase flex items-center gap-1">
                    <Hash size={12} /> Slug
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="article-url-slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="h-11 bg-white/5 border-white/10 rounded-xl text-gray-400 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-gray-500 text-xs font-bold uppercase flex items-center gap-1">
                    <AlignLeft size={12} /> Summary
                  </Label>
                  <Input
                    id="excerpt"
                    name="excerpt"
                    placeholder="A brief hook for your readers..."
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="h-11 bg-white/5 border-white/10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Content</Label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Start writing your masterpiece..."
                  rows={20}
                  className="w-full px-0 bg-transparent border-0 text-gray-300 focus:ring-0 text-lg leading-relaxed resize-none min-h-[500px]"
                  required
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

        </div>

        {/* Article Settings */}
        <div className="space-y-8">

          {/* Status & Visibility */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Globe size={18} />
              </div>
              <h3 className="text-lg font-bold">Publishing</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="space-y-0.5">
                  <Label htmlFor="published" className="text-sm font-bold">Status</Label>
                  <p className="text-[10px] text-gray-500">{formData.published ? "Visible to public" : "Draft mode"}</p>
                </div>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={handleSwitchChange}
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-blue-400">
                {formData.published ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {formData.published ? "Ready to Go Live" : "Drafting in Progress"}
                </span>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                <Image size={18} />
              </div>
              <h3 className="text-lg font-bold">Cover Image</h3>
            </div>

            <ImageUpload
              onUpload={handleImageUpload}
              bucket="blog"
              folder="featured"
              currentImage={formData.featured_image_url}
              label="Article Thumbnail"
            />
          </section>

          {/* Tips */}
          <div className="bg-gradient-to-br from-[#E91E8C]/20 to-transparent p-6 rounded-[2rem] border border-[#E91E8C]/10">
            <div className="flex items-center gap-3 mb-2 text-[#E91E8C]">
              <Sparkles size={18} />
              <h4 className="font-bold text-sm">Writing Tips</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Break up long text with headings. Use short paragraphs to keep engagement high on mobile devices.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
