"use client";

import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { updateBooking } from "@/app/admin/actions";
import {
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Tag,
  DollarSign,
  Timer,
  ArrowLeft,
  Share2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function BookingDetailForm({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(booking.status);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as typeof booking.status;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      await updateBooking(booking.id, { status: newStatus });
      router.refresh();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Error updating booking");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "pending": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "contacted": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "in-progress": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "completed": return "text-green-500 bg-green-500/10 border-green-500/20";
      default: return "text-gray-500 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <Link href="/admin/bookings">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-wider">
              Inquiry <span className="gradient-text">Details</span>
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Clock size={14} /> Received on {new Date(booking.created_at).toLocaleDateString()} at {new Date(booking.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border text-sm font-bold uppercase tracking-widest ${getStatusColor(status)}`}>
            {status}
          </div>
          <Button variant="outline" className="h-11 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-2">
            <Share2 size={16} /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Inquiry Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Client Profile */}
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-pink-500/10 text-[#E91E8C]">
                <User size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Client Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Full Name</Label>
                <p className="text-xl font-bold text-white tracking-tight capitalize">{booking.client_name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Email Address</Label>
                <a href={`mailto:${booking.client_email}`} className="text-lg font-medium text-[#E91E8C] hover:underline flex items-center gap-2">
                  <Mail size={16} /> {booking.client_email}
                </a>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Contact Number</Label>
                <div className="text-white font-medium flex items-center gap-2">
                  <Phone size={16} className="text-gray-600" /> {booking.client_phone || "Not provided"}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Project Category</Label>
                <div className="text-white font-medium flex items-center gap-2">
                  <Tag size={16} className="text-gray-600" /> {booking.project_type}
                </div>
              </div>
            </div>
          </section>

          {/* Project Details */}
          <section className="premium-card p-8 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <MessageSquare size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Project Scope</h3>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Description</Label>
                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {booking.project_description}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Budget</Label>
                    <p className="text-white font-bold">{booking.budget || "TBD"}</p>
                  </div>
                </div>
                <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                    <Timer size={20} />
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Timeline</Label>
                    <p className="text-white font-bold">{booking.timeline || "TBD"}</p>
                  </div>
                </div>
              </div>

              {booking.additional_notes && (
                <div className="space-y-3">
                  <Label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Additional Notes</Label>
                  <p className="text-gray-400 text-sm italic">{booking.additional_notes}</p>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* Right Column: Workflow Control */}
        <div className="space-y-8">

          {/* Status Control */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Clock size={18} />
              </div>
              <h3 className="text-lg font-bold">Manage Workflow</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Change Status</Label>
                <select
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  disabled={isLoading}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E91E8C]/50 transition-all appearance-none font-bold"
                >
                  <option value="pending" className="bg-black text-white">Pending Review</option>
                  <option value="contacted" className="bg-black text-white">Contacted Client</option>
                  <option value="in-progress" className="bg-black text-white">Project In-Progress</option>
                  <option value="completed" className="bg-black text-white">Mark as Closed</option>
                </select>
              </div>

              <div className="pt-4 space-y-4 border-t border-white/5">
                <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className={booking.email_sent ? "text-green-500" : "text-gray-600"} />
                    <span className="text-xs text-gray-400">Email Notification</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{booking.email_sent ? "SENT" : "PENDING"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className={booking.whatsapp_sent ? "text-green-500" : "text-gray-600"} />
                    <span className="text-xs text-gray-400">WhatsApp Ping</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{booking.whatsapp_sent ? "SENT" : "PENDING"}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="premium-card p-6 bg-white/[0.02] border-white/5">
            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <a href={`mailto:${booking.client_email}?subject=Regarding your inquiry with Opal Agency`}>
                <Button className="w-full justify-start gap-3 bg-[#E91E8C]/10 text-[#E91E8C] border border-[#E91E8C]/20 hover:bg-[#E91E8C] hover:text-white rounded-xl transition-all h-12">
                  <Mail size={18} /> Reply via Email
                </Button>
              </a>
              {booking.client_phone && (
                <a href={`https://wa.me/${booking.client_phone.replace(/\D/g, '')}`} target="_blank">
                  <Button className="w-full justify-start gap-3 bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white rounded-xl transition-all h-12">
                    <ExternalLink size={18} /> WhatsApp Message
                  </Button>
                </a>
              )}
            </div>
          </section>

          {/* Activity Log */}
          <div className="p-6 bg-white/[0.01] border border-white/5 rounded-[2rem]">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Audit Log</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-0.5 bg-pink-500/20 rounded-full my-1"></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Last Update</p>
                  <p className="text-xs text-gray-400">{new Date(booking.updated_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-0.5 bg-gray-500/20 rounded-full my-1"></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Creation</p>
                  <p className="text-xs text-gray-400">{new Date(booking.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
