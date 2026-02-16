"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Filter } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/types"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function WorkClient({ projects }: { projects: Project[] }) {
    const [currentPage, setCurrentPage] = useState(0)
    const [activeFilter, setActiveFilter] = useState("All")
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
    const observerRef = useRef<IntersectionObserver | null>(null)
    const projectsPerPage = 6

    // Get unique categories
    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]

    // Filter projects
    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter)

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
    const displayedProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    )

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
                    }
                })
            },
            { threshold: 0.1 }
        )

        document.querySelectorAll("[data-animate]").forEach((el) => {
            observerRef.current?.observe(el)
        })

        return () => observerRef.current?.disconnect()
    }, [])

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(0)
    }, [activeFilter])

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl" />

                <div className="relative max-w-6xl mx-auto">
                    <div className="flex flex-col items-start gap-4 mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <Sparkles size={14} className="text-[#E91E8C]" />
                            <span className="text-xs font-medium text-gray-400">Portfolio</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
                            Our <span className="gradient-text">Work</span>
                        </h1>
                    </div>

                    <p className="text-gray-400 text-xl max-w-2xl leading-relaxed font-light">
                        A curated showcase of digital products and brand experiences
                        that bridge the gap between imagination and reality.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="sticky top-20 z-40 py-6 px-6 bg-black/80 backdrop-blur-md border-y border-white/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 flex-wrap">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-500 ${activeFilter === category
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 scale-105"
                                    : "bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <div className="w-8 h-px bg-white/10" />
                        <span>Showing {filteredProjects.length} Projects</span>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section id="projects" data-animate className="py-24 px-6">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible["projects"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
                    {displayedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {displayedProjects.map((project, i) => (
                                <Link key={project.id} href={`/work/${project.id}`}>
                                    <div
                                        className="group relative flex flex-col h-full bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5 hover:border-[#E91E8C]/30 transition-all duration-700"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-90 transition-opacity" />
                                            <img
                                                src={project.featured_image_url || project.image_url || "/placeholder.svg"}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />

                                            {/* Hover overlay content */}
                                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white font-bold text-lg select-none">View Case Study</span>
                                                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                                        <ArrowUpRight size={20} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category Tag */}
                                            <div className="absolute top-6 left-6 z-20">
                                                <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8">
                                            <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                                                <span className="uppercase tracking-widest font-bold text-[#E91E8C]">{project.client_name || "Internal"}</span>
                                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                                <span>2024</span>
                                            </div>
                                            <h3 className="text-2xl font-bold group-hover:text-[#E91E8C] transition-colors mb-3 leading-tight">{project.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">{project.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-40 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Filter size={32} className="text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">No matching projects</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mb-10">We haven't found any projects in this category yet. Try another one or view all our work.</p>
                            <Button
                                variant="outline"
                                className="rounded-full border-white/20 px-10 h-14 hover:bg-[#E91E8C] hover:border-[#E91E8C] transition-all"
                                onClick={() => setActiveFilter("All")}
                            >
                                See All Projects
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-16">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:border-[#E91E8C]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentPage ? "bg-[#E91E8C] w-8" : "bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:border-[#E91E8C]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="premium-card p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C]/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

                        <div className="relative">
                            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Start Your Project</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Let's Create Something<br />Amazing Together
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                                Ready to transform your digital presence? Let's discuss how we can
                                bring your vision to life.
                            </p>
                            <Link href="/contact">
                                <Button className="premium-btn text-lg px-10 py-6">
                                    Get in Touch
                                    <ArrowUpRight size={20} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
