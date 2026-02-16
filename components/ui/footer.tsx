import Link from "next/link"
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/5 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-pink-900/20 via-transparent to-transparent blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold">OP</span>
                                </div>
                            </div>
                            <span className="text-3xl font-bold tracking-tighter">
                                <span className="text-white">OP</span>
                                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                                    AL
                                </span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-base leading-relaxed max-w-sm font-light">
                            Crafting elite digital experiences under the creative direction of
                            <span className="text-white font-medium"> Aisha</span>.
                            We bridge the gap between imagination and execution.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, href: "https://instagram.com/opal_ui_ux_1", label: "Instagram" },
                                { icon: Twitter, href: "#", label: "Twitter" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#E91E8C]/50 hover:bg-[#E91E8C] transition-all duration-500 group"
                                >
                                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Pages */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Navigation</h4>
                            <ul className="space-y-4">
                                {[
                                    { href: "/", label: "Home" },
                                    { href: "/about", label: "About Us" },
                                    { href: "/services", label: "Services" },
                                    { href: "/work", label: "Selected Work" },
                                    { href: "/blog", label: "Insights" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-500 hover:text-[#E91E8C] transition-colors duration-300 inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-[1px] bg-[#E91E8C] group-hover:w-4 transition-all duration-500" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Expertise</h4>
                            <ul className="space-y-4">
                                {["UI Design", "UX Research", "Identity", "Product", "Development"].map((service) => (
                                    <li key={service}>
                                        <Link
                                            href="/services"
                                            className="text-sm text-gray-500 hover:text-[#E91E8C] transition-colors duration-300 inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-[1px] bg-[#E91E8C] group-hover:w-4 transition-all duration-500" />
                                            {service}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Direct</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 group">
                                    <Mail size={16} className="text-[#E91E8C] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                    <a href="mailto:opaluiuxdesign@gmail.com" className="text-sm text-gray-500 hover:text-white transition-colors">
                                        opaluiuxdesign@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <Phone size={16} className="text-[#E91E8C] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-gray-500">+234 000 000 0000</span>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <MapPin size={16} className="text-[#E91E8C] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-gray-500">Lagos, Nigeria</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Connect</h4>
                            <p className="text-sm text-gray-500 font-light">Join our elite network for exclusive design insights.</p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E91E8C]/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="px-5 py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#E91E8C] hover:text-white transition-all duration-500 shadow-xl"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
                        © 2025 Aisha. All Creative Rights Reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/admin/login" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-[#E91E8C] transition-colors">
                            Admin Access
                        </Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors">
                            Security
                        </Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors">
                            Ethics
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
