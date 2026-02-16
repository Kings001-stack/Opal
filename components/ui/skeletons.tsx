"use client"

export function CardSkeleton() {
    return (
        <div className="premium-card overflow-hidden animate-pulse">
            <div className="aspect-video bg-white/5" />
            <div className="p-6 space-y-3">
                <div className="h-4 bg-white/5 rounded w-1/4" />
                <div className="h-6 bg-white/5 rounded w-3/4" />
                <div className="h-4 bg-white/5 rounded w-full" />
            </div>
        </div>
    )
}

export function ProjectGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    )
}

export function ServiceSkeleton() {
    return (
        <div className="premium-card p-8 animate-pulse">
            <div className="h-12 w-12 bg-white/5 rounded-xl mb-6" />
            <div className="h-6 bg-white/5 rounded w-1/2 mb-3" />
            <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
            </div>
        </div>
    )
}

export function TestimonialSkeleton() {
    return (
        <div className="premium-card p-10 text-center animate-pulse">
            <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-white/5 rounded" />
                ))}
            </div>
            <div className="space-y-3 mb-10 max-w-2xl mx-auto">
                <div className="h-6 bg-white/5 rounded w-full" />
                <div className="h-6 bg-white/5 rounded w-5/6 mx-auto" />
                <div className="h-6 bg-white/5 rounded w-4/6 mx-auto" />
            </div>
            <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-4" />
            <div className="h-5 bg-white/5 rounded w-32 mx-auto mb-2" />
            <div className="h-4 bg-white/5 rounded w-40 mx-auto" />
        </div>
    )
}

export function BlogCardSkeleton() {
    return (
        <div className="premium-card overflow-hidden animate-pulse">
            <div className="aspect-video bg-white/5" />
            <div className="p-6 space-y-3">
                <div className="flex gap-3">
                    <div className="h-4 bg-white/5 rounded w-16" />
                    <div className="h-4 bg-white/5 rounded w-20" />
                </div>
                <div className="h-6 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-3/4" />
            </div>
        </div>
    )
}

export function FormSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded w-24" />
                    <div className="h-12 bg-white/5 rounded-xl" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-white/5 rounded w-20" />
                    <div className="h-12 bg-white/5 rounded-xl" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded w-16" />
                <div className="h-12 bg-white/5 rounded-xl" />
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded w-28" />
                <div className="h-32 bg-white/5 rounded-xl" />
            </div>
            <div className="h-14 bg-white/5 rounded-full w-48" />
        </div>
    )
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-2 border-white/10 border-t-[#E91E8C] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#E91E8C]">OP</span>
                </div>
            </div>
        </div>
    )
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                    <div className="h-12 bg-white/5 rounded w-20 mx-auto mb-3" />
                    <div className="h-4 bg-white/5 rounded w-24 mx-auto" />
                </div>
            ))}
        </div>
    )
}
