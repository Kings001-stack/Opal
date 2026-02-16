import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Calendar,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  User,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { createClient, getUser } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch admin profile for welcome message
  // Use cached getUser to prevent parallel refresh race conditions
  const user = await getUser();

  const { data: adminData } = await supabase
    .from("admins")
    .select("first_name")
    .eq("id", user?.id)
    .single();

  // Fetch dashboard statistics
  const [servicesCount, projectsCount, blogCount, bookingsCount] = await Promise.all([
    supabase.from("services").select("id", { count: "exact" }),
    supabase.from("projects").select("id", { count: "exact" }),
    supabase.from("blog_posts").select("id", { count: "exact" }),
    supabase.from("bookings").select("id", { count: "exact" }),
  ]);

  // Get recent bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    {
      label: "Services",
      value: servicesCount.count || 0,
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      href: "/admin/services"
    },
    {
      label: "Projects",
      value: projectsCount.count || 0,
      icon: FolderKanban,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      href: "/admin/projects"
    },
    {
      label: "Articles",
      value: blogCount.count || 0,
      icon: FileText,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      href: "/admin/blog"
    },
    {
      label: "Bookings",
      value: bookingsCount.count || 0,
      icon: Calendar,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      href: "/admin/bookings"
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
            <LayoutDashboard size={14} className="text-[#E91E8C]" />
            <span className="uppercase tracking-widest text-xs">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back, <span className="gradient-text">{adminData?.first_name || "Aisha"}</span>!
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Manage your agency and keep track of your growth.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="outline" className="h-12 px-6 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
              <ExternalLink size={18} />
              View Site
            </Button>
          </Link>
          <Link href="/admin/projects/new">
            <Button className="h-12 px-6 bg-[#E91E8C] hover:bg-[#D81B7D] text-white rounded-xl gap-2 shadow-lg shadow-[#E91E8C]/20 border-0">
              <Plus size={18} />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="premium-card group p-6 hover:border-[#E91E8C]/30 transition-all cursor-pointer bg-white/[0.02] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.05] to-transparent -mr-16 -mt-16 rounded-full blur-2xl group-hover:from-[#E91E8C]/10 transition-colors" />

              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-black text-white">{stat.value}</h3>
                </div>
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3`}>
                  <stat.icon size={26} className={stat.color} />
                </div>
              </div>

              <div className="mt-4 flex items-center text-xs font-semibold text-gray-500 group-hover:text-white transition-colors">
                <span>Manage all {stat.label.toLowerCase()}</span>
                <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main View */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent Bookings Card */}
          <div className="premium-card bg-white/[0.02] border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Calendar size={18} className="text-[#E91E8C]" />
                  Recent Inquiries
                </h2>
                <p className="text-gray-500 text-xs mt-1">Latest messages from the contact form</p>
              </div>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View All
                  <ArrowUpRight size={14} className="ml-1" />
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking: any) => (
                  <div key={booking.id} className="p-6 hover:bg-white/[0.03] transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E91E8C]/20 to-[#8E24AA]/20 flex items-center justify-center text-[#E91E8C] font-bold">
                          {booking.client_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-[#E91E8C] transition-colors capitalize">
                            {booking.client_name}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(booking.created_at).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><User size={12} /> {booking.project_type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Button variant="outline" size="sm" className="h-9 px-4 border-white/10 hover:border-[#E91E8C]/50 hover:bg-[#E91E8C]/10 hover:text-white transition-all">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
                    <MessageSquare size={32} />
                  </div>
                  <p className="text-gray-500 text-lg">No inquiries yet.</p>
                  <p className="text-gray-600 text-sm">When clients message you, they will show up here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card p-6 bg-gradient-to-br from-[#E91E8C]/10 to-transparent border-white/5">
              <h3 className="text-lg font-bold mb-2">Grow your portfolio</h3>
              <p className="text-gray-400 text-sm mb-6">Regularly updating your projects helps in conversion.</p>
              <Link href="/admin/projects/new">
                <Button className="w-full bg-white text-black hover:bg-gray-200 border-0 font-bold h-11">
                  Add New Project
                </Button>
              </Link>
            </div>
            <div className="premium-card p-6 bg-gradient-to-br from-purple-500/10 to-transparent border-white/5">
              <h3 className="text-lg font-bold mb-2">Write a new article</h3>
              <p className="text-gray-400 text-sm mb-6">Build authority in your niche by sharing your thoughts.</p>
              <Link href="/admin/blog/new">
                <Button className="w-full bg-[#E91E8C] text-white hover:opacity-90 border-0 font-bold h-11">
                  New Blog Post
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column - Status & Info */}
        <div className="space-y-8">
          <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.01] border-b border-white/5">
              <CardTitle className="text-lg">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-400">Database Status</span>
                </div>
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm text-gray-400">Admin Level</span>
                </div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Super Admin</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-center text-gray-600">
                  Opal CMS v2.0.4 - All systems operational
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Profile Summary */}
          <div className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-1 overflow-hidden">
                  <User className="text-gray-600" size={32} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{adminData?.first_name || "Aisha"}</h3>
                <p className="text-[#E91E8C] text-xs font-bold uppercase tracking-wider">Agency Founder</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Total Impact</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black">{bookingsCount.count || 0}</span>
                  <span className="text-emerald-500 text-xs flex items-center font-bold">
                    <TrendingUp size={12} className="mr-1" /> ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
