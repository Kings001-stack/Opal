"use client";

import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteBlogPost } from "@/app/admin/actions";
import { useState } from "react";
import { Pencil, Trash2, Loader2, FileText, Eye, Clock, Hash } from "lucide-react";

export default function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setLoading(id);
    try {
      await deleteBlogPost(id);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/[0.01]">
          <tr className="border-b border-white/5">
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Article</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Status</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Published</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {posts.map((post) => (
            <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                    {post.featured_image_url ? (
                      <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold bg-gradient-to-br from-white/5 to-white/[0.02]">
                        <FileText size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#E91E8C] transition-colors">{post.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                      <Hash size={12} />
                      <span>{post.slug}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${post.published
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="py-5 px-6 text-gray-400 text-sm font-medium whitespace-nowrap">
                {post.published_at ? (
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-600" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                ) : (
                  <span className="text-gray-600">—</span>
                )}
              </td>
              <td className="py-5 px-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                    >
                      <Eye size={18} />
                    </Button>
                  </Link>
                  <Link href={`/admin/blog/${post.id}`}>
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
                    onClick={() => handleDelete(post.id)}
                    disabled={loading === post.id}
                  >
                    {loading === post.id ? (
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

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
            <FileText size={32} />
          </div>
          <p className="text-gray-500 font-medium">No articles yet.</p>
          <p className="text-gray-600 text-sm mt-1">Start writing your first insight.</p>
        </div>
      )}
    </div>
  );
}
