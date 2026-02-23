"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Play, Star } from "lucide-react"
import { Project, Testimonial, Service } from "@/lib/types"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"


interface HomeClientProps {
  initialProjects: Project[]
  initialTestimonials: Testimonial[]
  initialServices: Service[]
  settings?: Record<string, string>
}

export default function HomeClient({
  initialProjects,
  initialTestimonials,
  initialServices,
  settings
}: HomeClientProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!isAutoplay || initialTestimonials.length === 0) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % initialTestimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoplay, initialTestimonials.length])

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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-radial from-pink-600/20 via-transparent to-transparent blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles size={14} className="text-[#E91E8C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E91E8C]">Creative Agency</span>
              </div>

              <h1 className="text-6xl lg:text-9xl font-bold leading-[0.85] tracking-tighter">
                Crafting
                <span className="block gradient-text">Digital</span>
                <span className="block">Excellence</span>
              </h1>

              <p className="text-gray-400 text-xl leading-relaxed max-w-xl font-light">
                <span className="text-white font-medium">Opal</span> is a premium design powerhouse
                crafting world-class digital products that define the future of interaction.
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <Link href="/work">
                  <Button className="premium-btn text-lg px-10 py-7">
                    Explore Our Work
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/contact" className="group flex items-center gap-3 text-white font-semibold hover:text-[#E91E8C] transition-colors">
                  <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/5 group-hover:border-[#E91E8C]/30 transition-all">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <span>Start a Project</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-16 pt-10 border-t border-white/5">
                {[
                  { number: "50+", label: "Elite Projects" },
                  { number: "30+", label: "Global Clients" },
                  { number: "5+", label: "Expert Years" },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="text-4xl font-bold text-white group-hover:gradient-text transition-all duration-500">{stat.number}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative h-[700px] hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-[4rem] blur-3xl opacity-50" />

              {/* Floating Cards - Premium Layout */}
              <div className="relative w-full h-full perspective-1000">
                <div className="absolute top-[5%] left-[10%] w-[280px] h-[380px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] animate-float z-20">
                  <img src={settings?.hero_image_1 || "/mobile-app-dashboard.png"} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-[20%] right-[0%] w-[320px] h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] animate-float z-10" style={{ animationDelay: "1.5s" }}>
                  <img src={settings?.hero_image_2 || "/mobile-app-ui.png"} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[5%] left-[0%] w-[300px] h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] animate-float z-30" style={{ animationDelay: "3s" }}>
                  <img src={settings?.hero_image_3 || "/web-dashboard.jpg"} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[10%] right-[10%] w-[260px] h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] animate-float z-20" style={{ animationDelay: "0.8s" }}>
                  <img src={settings?.hero_image_4 || "/small-phone-ui.jpg"} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll Down</span>
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#E91E8C] to-transparent" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" data-animate className="py-32 px-6 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-600/10 via-transparent to-transparent blur-3xl" />

        <div className={`max-w-7xl mx-auto relative transition-all duration-1000 ${isVisible["services"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Our Expertise</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight">Limitless <span className="gradient-text">Design</span> Services</h2>
            </div>
            <p className="text-gray-500 text-lg max-w-sm font-light">
              We bridge the gap between complex problems and elegant solutions through iterative design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialServices.map((service, index) => (
              <div
                key={service.id}
                className="group relative h-[400px] premium-card p-10 flex flex-col justify-end overflow-hidden hover:bg-[#E91E8C]/5 transition-all duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-10 right-10 text-7xl font-bold text-white opacity-[0.03] group-hover:opacity-10 group-hover:scale-125 transition-all duration-700">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#E91E8C]/10 flex items-center justify-center mb-8 group-hover:bg-[#E91E8C] transition-all duration-500">
                  <Sparkles size={20} className="text-[#E91E8C] group-hover:text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#E91E8C] transition-colors leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                <div className="mt-8 overflow-hidden h-1 w-0 bg-[#E91E8C] group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <Link href="/services">
              <Button variant="outline" className="h-16 px-12 rounded-full border-white/10 hover:bg-white/5 hover:border-[#E91E8C]/30 text-lg transition-all">
                Discover All Services
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section intro */}
          <div className="text-center mb-16">
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Explore our latest work and see how we create exceptional digital experiences
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {initialProjects.slice(0, 6).map((project, index) => (
              <Link key={project.id} href={`/work/${project.id}`}>
                <article
                  className="group relative flex flex-col h-full premium-card overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                      src={project.featured_image_url || project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      {project.category && (
                        <span className="px-3 py-1 bg-[#E91E8C] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                          {project.category}
                        </span>
                      )}
                    </div>
                    {/* Index number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-white/10 group-hover:text-[#E91E8C]/20 transition-colors duration-500 z-20">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E91E8C] transition-colors line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">View Project</span>
                      <ArrowRight size={16} className="text-gray-600 group-hover:text-[#E91E8C] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="text-center">
            <Link href="/work">
              <Button className="premium-btn text-base px-10 py-6">
                View All Projects
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-animate className="py-32 px-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-600/10 via-transparent to-transparent blur-3xl opacity-50" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-orange-500/10 via-transparent to-transparent blur-3xl opacity-50" />

        <div className={`max-w-5xl mx-auto relative transition-all duration-1000 ${isVisible["testimonials"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
          <div className="text-center mb-16">
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Proven Success</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Client <span className="gradient-text">Voices</span></h2>
          </div>

          {initialTestimonials.length > 0 && (
            <div className="relative">
              <div className="premium-card p-12 md:p-20 text-center bg-white/[0.01] border-white/5 backdrop-blur-sm">
                {/* Decoration */}
                <div className="absolute top-10 left-10 text-8xl text-[#E91E8C] opacity-20 font-serif select-none">“</div>
                <div className="absolute bottom-4 right-10 text-8xl text-[#E91E8C] opacity-20 font-serif select-none">”</div>

                {/* Quote */}
                <p className="text-2xl md:text-4xl text-gray-100 mb-12 leading-tight font-light tracking-tight italic relative z-10">
                  {initialTestimonials[currentTestimonial].content}
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-md opacity-50" />
                    <div className="relative w-20 h-20 rounded-full bg-black border-2 border-white/20 overflow-hidden">
                      {initialTestimonials[currentTestimonial].image_url ? (
                        <img src={initialTestimonials[currentTestimonial].image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-600/20">
                          <span className="text-white font-bold text-2xl">
                            {initialTestimonials[currentTestimonial].client_name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h4 className="font-bold text-xl text-white mb-1 uppercase tracking-wider">
                    {initialTestimonials[currentTestimonial].client_name}
                  </h4>
                  <p className="text-[#E91E8C] text-sm font-semibold uppercase tracking-widest">
                    {initialTestimonials[currentTestimonial].client_title} <span className="text-gray-600 mx-2">|</span> {initialTestimonials[currentTestimonial].company_name}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between absolute top-1/2 -left-6 -right-6 -translate-y-1/2 md:-left-12 md:-right-12">
                <button
                  onClick={() => {
                    setIsAutoplay(false)
                    setCurrentTestimonial((prev) => (prev - 1 + initialTestimonials.length) % initialTestimonials.length)
                  }}
                  className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#E91E8C] hover:border-[#E91E8C]/50 hover:bg-white/5 transition-all hidden md:flex"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => {
                    setIsAutoplay(false)
                    setCurrentTestimonial((prev) => (prev + 1) % initialTestimonials.length)
                  }}
                  className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#E91E8C] hover:border-[#E91E8C]/50 hover:bg-white/5 transition-all hidden md:flex"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-3 mt-12">
                {initialTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoplay(false)
                      setCurrentTestimonial(i)
                    }}
                    className={`h-1.5 transition-all duration-500 rounded-full ${i === currentTestimonial ? "bg-[#E91E8C] w-12" : "bg-white/10 w-4 hover:bg-white/30"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="premium-card p-20 md:p-32 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E91E8C]/10 via-purple-600/5 to-transparent transition-all duration-1000 group-hover:scale-110" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E91E8C]/10 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

            <div className="relative z-10">
              <span className="text-[#E91E8C] text-sm font-bold uppercase tracking-[0.5em] mb-8 block">Ready for Greatness?</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">
                Let's Build Your<br />
                <span className="gradient-text">Next Revolution</span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Connect with Opal's elite design team and transform your brand
                into a digital masterpiece that scales beyond limits.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/contact">
                  <Button className="premium-btn text-xl px-12 py-8 h-auto shadow-[0_20px_50px_rgba(233,30,140,0.3)]">
                    Get in Touch
                    <ArrowRight size={24} className="ml-3" />
                  </Button>
                </Link>
                <Link href="/work" className="text-gray-500 hover:text-white font-semibold transition-colors uppercase tracking-widest text-sm">
                  Explore Full Portfolio
                </Link>
              </div>
            </div>

            {/* Design detail */}
            <div className="absolute bottom-10 right-10 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E91E8C]/20" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
