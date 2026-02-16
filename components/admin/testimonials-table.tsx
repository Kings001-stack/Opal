"use client";

import { Testimonial } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteTestimonial } from "@/app/admin/actions";
import { useState } from "react";
import { Pencil, Trash2, Loader2, Star, User, Building2, Quote } from "lucide-react";

export default function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setLoading(id);
    try {
      await deleteTestimonial(id);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/[0.01]">
          <tr className="border-b border-white/5">
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Client</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Affiliation</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Rating</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                    {testimonial.image_url ? (
                      <img src={testimonial.image_url} alt={testimonial.client_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#E91E8C] transition-colors">{testimonial.client_name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px] flex items-center gap-1">
                      <Quote size={10} /> {testimonial.content}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div>
                  <p className="text-sm text-gray-300 font-medium">{testimonial.client_title || "Client"}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-600 uppercase tracking-widest mt-1">
                    <Building2 size={10} />
                    <span>{testimonial.company_name || "—"}</span>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}
                    />
                  ))}
                </div>
              </td>
              <td className="py-5 px-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/testimonials/${testimonial.id}`}>
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
                    onClick={() => handleDelete(testimonial.id)}
                    disabled={loading === testimonial.id}
                  >
                    {loading === testimonial.id ? (
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

      {testimonials.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
            <Quote size={32} />
          </div>
          <p className="text-gray-500 font-medium">No testimonials yet.</p>
        </div>
      )}
    </div>
  );
}
