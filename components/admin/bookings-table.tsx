"use client";

import { Booking } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Mail, User, CheckCircle2, AlertCircle, PlayCircle, Eye, MessageSquare } from "lucide-react";

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          class: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          icon: AlertCircle
        };
      case "contacted":
        return {
          label: "Contacted",
          class: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          icon: PlayCircle
        };
      case "in-progress":
        return {
          label: "In Progress",
          class: "bg-purple-500/10 text-purple-500 border-purple-500/20",
          icon: Clock
        };
      case "completed":
        return {
          label: "Completed",
          class: "bg-green-500/10 text-green-500 border-green-500/20",
          icon: CheckCircle2
        };
      default:
        return {
          label: status,
          class: "bg-gray-500/10 text-gray-500 border-gray-500/20",
          icon: MessageSquare
        };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/[0.01]">
          <tr className="border-b border-white/5">
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Client</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Project Type</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Status</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Received</th>
            <th className="py-5 px-6 font-semibold text-gray-500 uppercase text-[10px] tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {bookings.map((booking) => {
            const status = getStatusConfig(booking.status);
            return (
              <tr key={booking.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E91E8C]/20 to-transparent flex items-center justify-center text-[#E91E8C] font-bold text-sm border border-[#E91E8C]/10 flex-shrink-0">
                      {booking.client_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-[#E91E8C] transition-colors capitalize">{booking.client_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <Mail size={12} /> {booking.client_email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6 font-medium text-gray-300 text-sm">
                  {booking.project_type}
                </td>
                <td className="py-5 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status.class}`}>
                    <status.icon size={12} />
                    {status.label}
                  </span>
                </td>
                <td className="py-5 px-6 text-gray-400 text-sm">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
                <td className="py-5 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/bookings/${booking.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5"
                      >
                        <Eye size={16} className="mr-2" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <div className="text-center py-20 bg-white/[0.01]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-600">
            <MessageSquare size={32} />
          </div>
          <p className="text-gray-500 font-medium">No bookings yet.</p>
        </div>
      )}
    </div>
  );
}
