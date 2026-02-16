"use client"

import { useRef, useEffect, useState, ReactNode } from "react"

interface HorizontalScrollProps {
    children: ReactNode
    className?: string
}

export default function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        const scrollContent = scrollRef.current
        if (!container || !scrollContent) return

        const handleScroll = () => {
            const rect = container.getBoundingClientRect()
            const scrollWidth = scrollContent.scrollWidth - window.innerWidth
            const containerHeight = container.offsetHeight - window.innerHeight

            // Calculate how far into the section we've scrolled
            const scrolled = -rect.top
            const progress = Math.max(0, Math.min(1, scrolled / containerHeight))

            setScrollProgress(progress)

            // Apply horizontal transform
            if (scrollContent) {
                scrollContent.style.transform = `translateX(${-progress * scrollWidth}px)`
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll() // Initial calculation

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: "300vh" }} // Creates the scroll space
        >
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div
                    ref={scrollRef}
                    className="flex gap-8 pl-6 pr-[50vw] transition-transform duration-100 ease-out will-change-transform"
                >
                    {children}
                </div>
            </div>

            {/* Progress indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10">
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-100"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                        {Math.round(scrollProgress * 100)}%
                    </span>
                </div>
            </div>
        </div>
    )
}

// Horizontal scroll card component
export function HScrollCard({
    title,
    subtitle,
    image,
    index,
    href,
    category
}: {
    title: string
    subtitle?: string
    image: string
    index: number
    href?: string
    category?: string
}) {
    const cardContent = (
        <div
            className="group relative w-[80vw] md:w-[50vw] lg:w-[35vw] h-[70vh] flex-shrink-0 rounded-3xl overflow-hidden cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Index number */}
            <div className="absolute top-6 left-6 text-8xl font-bold text-white/10 group-hover:text-[#E91E8C]/20 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                {category && (
                    <span className="inline-block px-3 py-1 bg-[#E91E8C]/20 text-[#E91E8C] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        {category}
                    </span>
                )}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#E91E8C] transition-colors">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-gray-400 text-lg line-clamp-2">{subtitle}</p>
                )}

                {/* Hover indicator */}
                <div className="mt-6 flex items-center gap-2 text-[#E91E8C] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium">View Project</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#E91E8C]/50 transition-colors duration-300" />
        </div>
    )

    if (href) {
        return <a href={href}>{cardContent}</a>
    }

    return cardContent
}

// Text reveal animation component for horizontal scroll sections
export function HScrollText({
    eyebrow,
    title,
    description
}: {
    eyebrow?: string
    title: string
    description?: string
}) {
    return (
        <div className="w-[90vw] md:w-[60vw] lg:w-[40vw] h-[70vh] flex-shrink-0 flex flex-col justify-center px-8">
            {eyebrow && (
                <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                    {eyebrow}
                </span>
            )}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {title.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-4">
                        {i % 2 === 0 ? (
                            <span className="gradient-text">{word}</span>
                        ) : (
                            word
                        )}
                    </span>
                ))}
            </h2>
            {description && (
                <p className="text-gray-400 text-xl leading-relaxed max-w-lg">
                    {description}
                </p>
            )}
        </div>
    )
}
