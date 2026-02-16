import { redirect } from 'next/navigation';
import BookingDetailForm from "@/components/admin/booking-detail-form";
import { createClient } from "@/lib/supabase/server";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (!booking) redirect("/admin/bookings");

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
      <BookingDetailForm booking={booking} />
    </div>
  );
}
