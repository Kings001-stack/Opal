import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookingsTable from "@/components/admin/bookings-table";
import { Calendar, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
            <Calendar size={14} className="text-[#E91E8C]" />
            <span className="uppercase tracking-widest text-xs">CRM & Inquiries</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Client <span className="gradient-text">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Manage incoming project requests and maintain client communications.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="h-11 px-5 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="premium-card bg-white/[0.02] border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <h3 className="font-bold text-lg">Recent Inquiries ({bookings?.length || 0})</h3>
        </div>
        <div className="p-0">
          <BookingsTable bookings={bookings || []} />
        </div>
      </div>
    </div>
  );
}
