import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogPostsTable from "@/components/admin/blog-posts-table";
import { Plus, FileText, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
            <FileText size={14} className="text-[#E91E8C]" />
            <span className="uppercase tracking-widest text-xs">Editorial Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Manage <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Create and publish insights to build your agency's authority.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="h-11 px-5 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button className="h-11 px-6 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 border-0">
              <Plus size={18} />
              New Article
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="premium-card bg-white/[0.02] border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01]">
          <h3 className="font-bold text-lg">Published Articles ({posts?.length || 0})</h3>
        </div>
        <div className="p-0">
          <BlogPostsTable posts={posts || []} />
        </div>
      </div>

    </div>
  );
}
