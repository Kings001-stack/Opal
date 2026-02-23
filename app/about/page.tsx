"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Target, Palette, Users, Award, Clock, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "30+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ]

  const values = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "We utilize agile methodologies to deliver high-quality designs at speed without compromising excellence.",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Target,
      title: "User-Centric",
      description: "Every design decision is backed by research and focused on creating exceptional user experiences.",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Palette,
      title: "Creative Excellence",
      description: "We push creative boundaries while maintaining practical functionality and brand consistency.",
      gradient: "from-pink-500/20 to-purple-500/20",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We work as an extension of your team, ensuring transparent communication throughout the project.",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
  ]

  const team = [
    {
      name: "Opal",
      role: "Founder & Creative Director",
      image: "/aisha-portrait.jpg",
      description: "Visionary leader with a passion for creating digital products that solve real-world problems through exceptional design.",
    },
    {
      name: "Gift Gagara",
      role: "Lead UI/UX Designer",
      image: "/asian-man-portrait.png",
      description: "Expert in crafting intuitive user interfaces and seamless experiences for web and mobile platforms.",
    },
    {
      name: "Zainab Wahab",
      role: "Branding Specialist",
      image: "/hijab-woman-portrait.jpg",
      description: "Dedicated to building strong brand identities that resonate with global audiences and drive growth.",
    },
  ]

  const services = [
    { title: "UI/UX Design", description: "Crafting beautiful, intuitive interfaces that users love to interact with." },
    { title: "Brand Identity", description: "Creating memorable logos and visual systems that define your brand's unique voice." },
    { title: "Product Strategy", description: "Helping brands navigate the digital landscape with data-driven product roadmaps." },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Award size={14} className="text-[#E91E8C]" />
              <span className="text-xs font-medium text-gray-400">Award-Winning Design Agency</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Empowering Brands
              <span className="block gradient-text">Beyond Limits</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Founded by Opal, we are a premier digital design agency dedicated to
              crafted exceptional digital experiences that transform modern brands and drive
              measurable success across the globe.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/work">
                <Button className="premium-btn">
                  View Our Work
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-4 rounded-full border-white/20 hover:bg-white/5">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl blur-3xl opacity-50" />
            <div className="relative grid grid-cols-4 gap-3">
              {["/mobile-app-dashboard.png", "/mobile-app-ui.png", "/web-dashboard.jpg", "/small-phone-ui.jpg"].map((img, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                id={`stat-${i}`}
                data-animate
                className={`text-center transition-all duration-700 ${isVisible[`stat-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-3xl" />

        <div className="max-w-6xl mx-auto">
          <div
            id="mission"
            data-animate
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible["mission"] ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-3xl opacity-50" />
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="/mobile-app-dashboard.png"
                  alt=""
                  className="w-full rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
                />
                <img
                  src="/mobile-app-ui.png"
                  alt=""
                  className="w-full rounded-2xl shadow-2xl border border-white/10 mt-8 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em]">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Bridging Vision & Excellence
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We combine deep user research with cutting-edge visual design to create products
                that are not only beautiful but also solve complex business challenges. Our mission
                is to bridge the gap between creative vision and functional excellence.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By understanding the unique needs of the African market while maintaining global
                standards, we deliver tailored solutions that resonate with users worldwide.
              </p>

              <div className="pt-4 space-y-3">
                {["User-First Design Philosophy", "Data-Driven Decisions", "Culturally Relevant Solutions"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle size={18} className="text-[#E91E8C]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          <div className="section-heading">
            <span className="eyebrow">What We Do</span>
            <h2>Our Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                id={`service-${i}`}
                data-animate
                className={`premium-card p-8 text-center group transition-all duration-700 ${isVisible[`service-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-6xl font-bold gradient-text mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#E91E8C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-heading">
            <span className="eyebrow">Our Values</span>
            <h2>Why Choose Opal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                id={`value-${i}`}
                data-animate
                className={`premium-card p-8 group transition-all duration-700 ${isVisible[`value-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="section-heading">
            <span className="eyebrow">The Team</span>
            <h2>Meet Our Experts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                id={`team-${i}`}
                data-animate
                className={`text-center group transition-all duration-700 ${isVisible[`team-${i}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity scale-110" />
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-[#E91E8C]/50 transition-all mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#E91E8C] text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{member.description}</p>
              </div>
            ))}
          </div>
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
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Let's create something amazing together. Reach out and let's discuss
                how we can bring your vision to life.
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
  )
}
