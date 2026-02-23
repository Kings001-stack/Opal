"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Service } from "@/lib/types";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { useState, useEffect, useRef } from "react";

export default function ServicesClient({ services }: { services: Service[] }) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const processSteps = [
    {
      step: "01",
      title: "Discovery",
      description: "We dive deep into your business, users, and goals",
    },
    {
      step: "02",
      title: "Strategy",
      description: "Develop a comprehensive design and UX strategy",
    },
    {
      step: "03",
      title: "Design",
      description: "Create stunning visuals and intuitive interfaces",
    },
    {
      step: "04",
      title: "Deliver",
      description: "Launch your product and provide ongoing support",
    },
  ];

  const benefits = [
    "User-Centered Design Approach",
    "Data-Driven Decision Making",
    "Agile & Iterative Process",
    "Cross-Platform Excellence",
    "Accessibility Compliance",
    "Performance Optimization",
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Mobile Responsive */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-radial from-pink-500/20 via-transparent to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl opacity-50" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#E91E8C]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Our Expertise
            </span>
          </div>

          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]">
            Limitless
            <span className="block gradient-text">Design</span>
            Solutions
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
            We bridge the gap between complex business challenges and intuitive
            human experiences through world-class design strategy and execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="premium-btn text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 w-full sm:w-auto">
                Start a Project
                <ArrowRight size={20} className="ml-3" />
              </Button>
            </Link>
            <Link
              href="/work"
              className="flex items-center justify-center px-8 sm:px-10 py-6 sm:py-0 h-auto sm:h-auto border border-white/10 rounded-full hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid - Mobile Responsive */}
      <section
        id="services-grid"
        data-animate
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(233,30,140,0.03)_0%,transparent_70%)]" />

        <div
          className={`max-w-6xl mx-auto relative transition-all duration-1000 ${isVisible["services-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20 border-b border-white/5 pb-8 sm:pb-10 md:pb-12">
            <div className="max-w-2xl">
              <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.4em] mb-3 sm:mb-4 block">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                Our <span className="gradient-text">Services</span>
              </h2>
            </div>
            <p className="text-gray-500 font-light text-sm sm:text-base max-w-xs italic">
              "Design is not just what it looks like and feels like. Design is
              how it works."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() =>
                  setHoveredService(hoveredService === i ? null : i)
                }
                className={`group relative flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-10 p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border transition-all duration-700 overflow-hidden cursor-pointer ${hoveredService === i
                    ? "bg-white/[0.03] border-[#E91E8C]/30 shadow-2xl shadow-[#E91E8C]/5"
                    : "bg-white/[0.01] border-white/5"
                  }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Service Number */}
                <div className="flex flex-row md:flex-col items-center gap-4 shrink-0">
                  <div
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-700 leading-none ${hoveredService === i
                        ? "gradient-text opacity-100 scale-110"
                        : "text-white/5"
                      }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Service Content */}
                <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-2 h-2 rounded-full bg-[#E91E8C] transition-all duration-500 shrink-0 ${hoveredService === i ? "scale-100" : "scale-0"}`}
                    />
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-500 break-words ${hoveredService === i ? "text-[#E91E8C]" : "text-white"
                        }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-light group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4">
                    {["Premium UI", "UX Research", "Modern Tech"].map(
                      (tag, j) => (
                        <span
                          key={j}
                          className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-600 bg-white/5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full border border-white/5 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Action Arrow - Hidden on mobile */}
                <div
                  className={`hidden lg:flex w-16 h-16 xl:w-20 xl:h-20 rounded-full border items-center justify-center transition-all duration-500 transform shrink-0 ${hoveredService === i
                      ? "bg-[#E91E8C] border-[#E91E8C] text-white rotate-0 scale-110"
                      : "border-white/10 text-gray-500 rotate-45"
                    }`}
                >
                  <ArrowRight size={28} className="xl:w-8 xl:h-8" />
                </div>
                {/* Hover Glow Decoration */}
                {hoveredService === i && (
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E91E8C]/10 rounded-full blur-[80px] pointer-events-none hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Mobile Responsive */}
      <section
        id="process"
        data-animate
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-white/[0.01]"
      >
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[600px] sm:h-[800px] md:h-[1000px] bg-gradient-radial from-purple-600/5 via-transparent to-transparent blur-3xl opacity-50" />

        <div
          className={`max-w-6xl mx-auto relative transition-all duration-1000 ${isVisible["process"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
              Iterative Method
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight px-4">
              The <span className="gradient-text">Opal</span> Way
            </h2>
            <p className="text-gray-500 text-base sm:text-lg md:text-xl font-light mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
              A meticulous process optimized for quality, speed, and disruptive
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] bg-black border border-white/5 hover:border-[#E91E8C]/30 transition-all duration-700 overflow-hidden"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-6xl sm:text-7xl md:text-8xl font-black absolute -top-2 sm:-top-4 -right-2 sm:-right-4 text-white/[0.02] group-hover:text-[#E91E8C]/5 transition-all duration-700 group-hover:scale-150">
                  {step.step}
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#E91E8C]/5 flex items-center justify-center mb-6 sm:mb-8 border border-[#E91E8C]/10 group-hover:bg-[#E91E8C] group-hover:shadow-[0_0_30px_rgba(233,30,140,0.3)] transition-all duration-500">
                  <Sparkles
                    size={20}
                    className="sm:w-6 sm:h-6 text-[#E91E8C] group-hover:text-white"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-[#E91E8C] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-light group-hover:text-gray-400 transition-colors">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Mobile Responsive */}
      <section
        id="benefits"
        data-animate
        className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative"
      >
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible["benefits"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div>
                <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.5em] mb-4 sm:mb-6 block">
                  Why Partner With Us
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 sm:mb-8 leading-[0.9]">
                  Uncompromising
                  <br />
                  <span className="gradient-text">Excellence</span>
                </h2>
                <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                  We don't just design interfaces; we build digital legacies.
                  Our commitment to precision, innovation, and user psychology
                  ensures your product doesn't just compete—it dominates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#E91E8C]/20 group-hover:border-[#E91E8C]/30 transition-all">
                      <CheckCircle
                        size={16}
                        className="sm:w-[18px] sm:h-[18px] text-[#E91E8C]"
                      />
                    </div>
                    <span className="text-gray-300 text-sm sm:text-base font-medium tracking-tight">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="inline-block w-full sm:w-auto">
                <Button className="premium-btn text-base sm:text-lg px-8 sm:px-10 md:px-12 py-6 sm:py-7 w-full sm:w-auto">
                  Experience the Difference
                  <ArrowRight size={20} className="ml-3" />
                </Button>
              </Link>
            </div>

            {/* Visual - Premium Composition - Hidden on small mobile */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E91E8C]/20 to-purple-600/20 rounded-[4rem] blur-[100px] opacity-30" />
              <div className="relative grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-1 md:col-span-7 space-y-4 md:space-y-6">
                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                    <img
                      src="/mobile-app-dashboard.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform md:translate-x-12 hover:scale-[1.02] transition-transform duration-700">
                    <img
                      src="/web-dashboard.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-5 space-y-4 md:space-y-6 pt-8 md:pt-16">
                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
                    <img
                      src="/mobile-app-ui.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transform md:-translate-x-6 hover:scale-[1.02] transition-transform duration-700">
                    <img
                      src="/small-phone-ui.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="premium-card p-10 sm:p-16 md:p-20 lg:p-32 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E91E8C]/15 via-purple-600/5 to-transparent group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#E91E8C]/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-glow" />
            <div
              className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-glow"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10">
              <span className="text-[#E91E8C] text-xs sm:text-sm font-bold uppercase tracking-[0.5em] mb-6 sm:mb-8 block">
                Project Inquiry
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-8 sm:mb-10 leading-[0.9] px-4">
                Transform Your
                <br />
                <span className="gradient-text">Brand Vision</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-4">
                Let's discuss how our design expertise can help transform your
                digital presence and drive unprecedented growth.
              </p>
              <Link href="/contact" className="inline-block w-full sm:w-auto">
                <Button className="premium-btn text-base sm:text-lg md:text-xl px-10 sm:px-12 md:px-14 py-6 sm:py-7 md:py-8 h-auto shadow-[0_20px_50px_rgba(233,30,140,0.3)] w-full sm:w-auto">
                  Start Your Project
                  <ArrowRight size={20} className="sm:w-6 sm:h-6 ml-3" />
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
