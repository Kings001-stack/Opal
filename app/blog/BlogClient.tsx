"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogPost } from "@/lib/types"
import { format } from "date-fns"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"
import { ArrowRight, Calendar, Clock, Tag, Sparkles, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Get unique categories
    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))]

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = activeCategory === "All" || post.category === activeCategory
        return matchesSearch && matchesCategory
    })

    const featuredPost = filteredPosts[0]
    const otherPosts = filteredPosts.slice(1)

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
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-radial from-pink-500/15 via-transparent to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-purple-600/15 via-transparent to-transparent blur-3xl" />

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Sparkles size={14} className="text-[#E91E8C]" />
                        <span className="text-xs font-medium text-gray-400">Insights & Inspiration</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Design
                        <span className="block gradient-text">Blog</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                        Explore the latest trends, insights, and best practices in UI/UX design,
                        branding, and digital product development.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#E91E8C]/50 transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-6 px-6 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === category
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section id="featured" data-animate className="py-20 px-6">
                    <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible["featured"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <div className="group premium-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="aspect-video lg:aspect-auto overflow-hidden">
                                    <img
                                        src={featuredPost.featured_image_url || "/placeholder.svg"}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-[#E91E8C]/20 text-[#E91E8C] rounded-full text-xs font-medium">
                                            Featured
                                        </span>
                                        {featuredPost.category && (
                                            <span className="text-gray-500 text-xs flex items-center gap-1">
                                                <Tag size={12} />
                                                {featuredPost.category}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4 group-hover:text-[#E91E8C] transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 text-gray-500 text-sm">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {format(new Date(featuredPost.published_at || featuredPost.created_at), "MMM dd, yyyy")}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock size={14} />
                                            5 min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section id="posts" data-animate className="py-24 px-6">
                <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible["posts"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold">Latest Articles</h2>
                        <span className="text-gray-500 text-sm font-medium">{filteredPosts.length} posts found</span>
                    </div>

                    {otherPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post, i) => (
                                <Link key={post.id} href={`/blog/${post.slug}`}>
                                    <article
                                        className="group relative flex flex-col h-full premium-card overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                            <img
                                                src={post.featured_image_url || "/placeholder.svg"}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            <div className="absolute bottom-4 left-4 z-20">
                                                {post.category && (
                                                    <span className="px-3 py-1 bg-[#E91E8C] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-[#E91E8C]" />
                                                    {format(new Date(post.published_at || post.created_at), "MMM dd, yyyy")}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={12} />
                                                    5 min read
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 group-hover:text-[#E91E8C] transition-colors line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-0.5">
                                                        <img src="/aisha-portrait.jpg" className="w-full h-full rounded-full object-cover" />
                                                    </div>
                                                    <span className="text-xs text-gray-400">Aisha</span>
                                                </div>
                                                <ArrowRight size={16} className="text-gray-600 group-hover:text-[#E91E8C] group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 premium-card bg-white/[0.02] border-dashed border-white/10">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={24} className="text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">
                                We couldn't find any articles matching your search. Try different keywords or check back later.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 border-white/10 hover:bg-[#E91E8C]/10 hover:text-[#E91E8C] rounded-full"
                                onClick={() => { setSearchTerm(""); setActiveCategory("All") }}
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="premium-card p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E91E8C]/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

                        <div className="relative">
                            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Stay Updated</span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Subscribe to Our Newsletter
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                                Get the latest design insights, trends, and tips delivered straight to your inbox.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#E91E8C]/50"
                                />
                                <Button className="premium-btn px-8 py-4">
                                    Subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
