"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: "ui-design", label: "UI Design" },
    { value: "ux-research", label: "UX Research" },
    { value: "brand-strategy", label: "Brand Strategy" },
    { value: "product-design", label: "Product Design" },
    { value: "web-development", label: "Web Development" },
  ];

  const budgets = [
    { value: "under-500k", label: "Under ₦500,000" },
    { value: "500k-1m", label: "₦500,000 - ₦1,000,000" },
    { value: "1m-3m", label: "₦1,000,000 - ₦3,000,000" },
    { value: "3m-5m", label: "₦3,000,000 - ₦5,000,000" },
    { value: "5m+", label: "₦5,000,000+" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-purple-600/10 via-transparent to-transparent blur-[120px]" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles size={14} className="text-[#E91E8C]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Collaboration
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]">
            Let's Start Your
            <span className="block gradient-text">Revolution</span>
          </h1>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Ready to break the mold? Connect with{" "}
            <span className="text-white font-medium">Aisha's</span> elite design
            team and let's build something that defines the next decade.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <span className="text-[#E91E8C] text-sm font-bold uppercase tracking-[0.4em] block">
                  Connect
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">
                  Get in <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  Direct lines to our creative engine. We respond with the speed
                  of inspiration.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Mail,
                    label: "Official Email",
                    value: "opaluiuxdesign@gmail.com",
                    href: "mailto:opaluiuxdesign@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Direct Line",
                    value: "+234 8098800296",
                    href: "tel:+2348098800296",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Chat with us",
                    href: "https://wa.link/6i7r7s",
                  },
                  {
                    icon: MapPin,
                    label: "Global HQ",
                    value: "Abuja, Nigeria",
                    href: "#",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "WhatsApp" ? "_blank" : undefined}
                    rel={
                      item.label === "WhatsApp"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-[#E91E8C]/30 hover:bg-white/[0.03] transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#E91E8C] group-hover:scale-110 transition-all duration-500">
                      <item.icon
                        size={26}
                        className="text-[#E91E8C] group-hover:text-white"
                      />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] text-[#E91E8C] uppercase tracking-[0.3em] font-bold mb-1 opacity-70">
                        {item.label}
                      </p>
                      <p className="text-white text-lg font-medium tracking-tight whitespace-nowrap">
                        {item.value}
                      </p>
                    </div>
                    {/* Shadow Decor */}
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#E91E8C]/5 rounded-full blur-2xl group-hover:bg-[#E91E8C]/10 transition-all" />
                  </a>
                ))}
              </div>

              {/* Success Badge / Decorative Element */}
              <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-[#E91E8C]/10 to-purple-600/5 border border-white/5 overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E91E8C]/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="text-2xl font-bold mb-6 relative">
                  Why Work With Us?
                </h3>
                <ul className="space-y-4 relative">
                  {[
                    "Disruptive design strategies",
                    "Iterative delivery cycles",
                    "Conversion-led UX architecture",
                    "Global design standards",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-gray-400 group/item"
                    >
                      <div className="w-2 h-2 bg-[#E91E8C] rounded-full group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm font-medium tracking-wide group-hover/item:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="premium-card p-12 md:p-16 bg-white/[0.01] border-white/5 backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E91E8C]/5 rounded-bl-[4rem]" />

                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold tracking-tight">
                      Project <span className="text-[#E91E8C]">Details</span>
                    </h3>
                    <p className="text-gray-500 font-light">
                      Fields marked with an asterisk (*) are required for our
                      initial analysis.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 group/field">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within/field:text-[#E91E8C] transition-colors">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            className="premium-input bg-white/5 border-white/10 h-14 px-6 rounded-2xl focus:border-[#E91E8C]/50 transition-all font-light"
                          />
                          <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-[#E91E8C] transition-all duration-500 ${focusedField === "name" ? "w-full" : "w-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-3 group/field">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within/field:text-[#E91E8C] transition-colors">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            className="premium-input bg-white/5 border-white/10 h-14 px-6 rounded-2xl focus:border-[#E91E8C]/50 transition-all font-light"
                          />
                          <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-[#E91E8C] transition-all duration-500 ${focusedField === "email" ? "w-full" : "w-0"}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Service Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 group/field">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within/field:text-[#E91E8C] transition-colors">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+234 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                            className="premium-input bg-white/5 border-white/10 h-14 px-6 rounded-2xl focus:border-[#E91E8C]/50 transition-all font-light"
                          />
                          <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-[#E91E8C] transition-all duration-500 ${focusedField === "phone" ? "w-full" : "w-0"}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-3 group/field">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within/field:text-[#E91E8C] transition-colors">
                          Service Interest
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("service")}
                            onBlur={() => setFocusedField(null)}
                            className="premium-input bg-white/5 border-white/10 h-14 px-6 rounded-2xl focus:border-[#E91E8C]/50 transition-all font-light cursor-pointer appearance-none"
                          >
                            <option value="" className="bg-black">
                              Select a service
                            </option>
                            {services.map((service) => (
                              <option
                                key={service.value}
                                value={service.value}
                                className="bg-black"
                              >
                                {service.label}
                              </option>
                            ))}
                          </select>
                          <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-[#E91E8C] transition-all duration-500 ${focusedField === "service" ? "w-full" : "w-0"}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Budget Select */}
                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Anticipated Budget
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {budgets.map((budget) => (
                          <button
                            key={budget.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                budget: budget.value,
                              }))
                            }
                            className={`px-4 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest transition-all duration-500 border ${
                              formData.budget === budget.value
                                ? "bg-[#E91E8C] border-[#E91E8C] text-white shadow-[0_10px_20px_rgba(233,30,140,0.3)] scale-105"
                                : "bg-white/5 border-white/10 text-gray-500 hover:border-[#E91E8C]/30 hover:text-gray-300"
                            }`}
                          >
                            {budget.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-3 group/field">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within/field:text-[#E91E8C] transition-colors">
                        Brief Overview *
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          placeholder="What high-impact goals are we achieving together?"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          rows={6}
                          className="premium-input bg-white/5 border-white/10 p-6 rounded-[2rem] focus:border-[#E91E8C]/50 transition-all font-light resize-none"
                        />
                        <div
                          className={`absolute bottom-0 left-0 h-0.5 bg-[#E91E8C] transition-all duration-500 ${focusedField === "message" ? "w-full" : "w-0"}`}
                        />
                      </div>
                    </div>

                    {/* Feedback Status */}
                    {submitStatus !== "idle" && (
                      <div
                        className={`flex items-center gap-4 p-6 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 ${
                          submitStatus === "success"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {submitStatus === "success" ? (
                          <>
                            <CheckCircle size={24} />
                            <span className="font-medium">
                              Strategic transmission successful. We'll connect
                              shortly.
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={24} />
                            <span className="font-medium">
                              Transmission failure. Please re-attempt the
                              connection.
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full premium-btn text-xl h-auto py-8 rounded-[2rem] shadow-[0_20px_40px_rgba(233,30,140,0.2)]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Revolution...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Initiate Launch
                          <Send
                            size={24}
                            className="-rotate-12 group-hover:rotate-0 transition-transform"
                          />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
