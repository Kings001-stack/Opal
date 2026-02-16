"use client";

import { Project } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteProject } from "@/app/admin/actions";
import { useState } from "react";
import {
  Pencil,
  Trash2,
  Loader2,
  ExternalLink,
  Eye,
  MoreVertical,
  Calendar,
  User as UserIcon,
  Layers
} from "lucide-react";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(id);
    try {
      await deleteProject(id);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/[0.01]">
          <tr className="border-b border-white/5">
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Project</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Category</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Client</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((project) => (
            <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-5 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <Layers size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#E91E8C] transition-colors">{project.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">{project.description}</p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E91E8C]/10 text-[#E91E8C] border border-[#E91E8C]/20">
                  {project.category}
                </span>
              </td>
              <td className="py-5 px-6 font-medium text-gray-300 text-sm">
                {project.client_name ? (
                  <div className="flex items-center gap-2">
                    <UserIcon size={14} className="text-gray-600" />
                    {project.client_name}
                  </div>
                ) : (
                  <span className="text-gray-600 italic">No client</span>
                )}
              </td>
              <td className="py-5 px-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Link href={`/work/${project.id}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                    >
                      <Eye size={18} />
                    </Button>
                  </Link>
                  <Link href={`/admin/projects/${project.id}`}>
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
                    onClick={() => handleDelete(project.id)}
                    disabled={loading === project.id}
                  >
                    {loading === project.id ? (
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

      {projects.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
            <Layers size={32} />
          </div>
          <p className="text-gray-500 font-medium">No projects found.</p>
          <p className="text-gray-600 text-sm mt-1">Start by adding your first project.</p>
        </div>
      )}
    </div>
  );
}
