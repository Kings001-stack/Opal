"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
]

export default function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                            <div className="relative w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                                <span className="text-white font-bold text-sm">OP</span>
                            </div>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            <span className="text-white">OP</span>
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                                AL
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-500 rounded-full ${isActive
                                        ? "text-white bg-white/10"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span className="relative">{link.label}</span>
                                    {isActive && (
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E91E8C] rounded-full shadow-[0_0_10px_#E91E8C]" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/contact">
                            <Button className="premium-btn text-xs px-8 py-5 h-auto">
                                <span className="relative z-10">Start a Project</span>
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:text-[#E91E8C] transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-6">
                    {navLinks.map((link, index) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-3xl font-bold transition-all duration-300 ${isActive ? "text-[#E91E8C]" : "text-white hover:text-[#E91E8C]"
                                    }`}
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                }}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-8"
                        style={{
                            transitionDelay: "300ms",
                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: isMobileMenuOpen ? 1 : 0,
                        }}
                    >
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium">
                            Get in Touch
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
