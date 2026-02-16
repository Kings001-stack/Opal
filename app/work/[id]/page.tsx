import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Project } from "@/lib/types";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ArrowLeft, ArrowRight, Calendar, User, Layers } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  const typedProject = project as Project;

  // Get related projects
  const { data: relatedProjects } = await supabase
    .from("projects")
    .select("*")
    .neq("id", id)
    .eq("category", typedProject.category)
    .limit(3);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E91E8C] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>

          <div className="space-y-6 mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#E91E8C]/10 text-[#E91E8C] rounded-full text-xs font-bold uppercase tracking-wider">
              {typedProject.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              {typedProject.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {typedProject.description}
            </p>
          </div>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {typedProject.client_name && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <User size={18} className="text-[#E91E8C]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Client</p>
                  <p className="text-white font-medium">{typedProject.client_name}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Layers size={18} className="text-[#E91E8C]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Category</p>
                <p className="text-white font-medium">{typedProject.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Calendar size={18} className="text-[#E91E8C]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Year</p>
                <p className="text-white font-medium">
                  {new Date(typedProject.created_at).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {(typedProject.featured_image_url || typedProject.image_url) && (
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 z-10" />
              <img
                src={typedProject.featured_image_url || typedProject.image_url || "/placeholder.svg"}
                alt={typedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {typedProject.technologies && typedProject.technologies.length > 0 && (
        <section className="py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {typedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-[#E91E8C]/50 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {typedProject.results && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="premium-card p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C]/10 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#E91E8C] mb-6">Project Results</h2>
                <p className="text-xl md:text-2xl text-gray-200 whitespace-pre-line leading-relaxed">
                  {typedProject.results}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold">Related Projects</h2>
              <Link href="/work">
                <Button variant="outline" size="sm" className="border-white/10 text-gray-400 hover:text-white">
                  View All
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject: Project) => (
                <Link key={relatedProject.id} href={`/work/${relatedProject.id}`}>
                  <div className="premium-card overflow-hidden group cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedProject.featured_image_url || relatedProject.image_url || "/placeholder.svg"}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-[#E91E8C] text-xs font-bold uppercase tracking-wider mb-2">
                        {relatedProject.category}
                      </p>
                      <h3 className="font-bold group-hover:text-[#E91E8C] transition-colors">
                        {relatedProject.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="premium-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Start Your Project</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Let's collaborate to bring your vision to life with stunning design.
              </p>
              <Link href="/contact">
                <Button className="premium-btn text-lg px-10 py-6">
                  Get in Touch
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
