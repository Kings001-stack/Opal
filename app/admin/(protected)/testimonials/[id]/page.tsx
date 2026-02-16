import TestimonialForm from "@/components/admin/testimonial-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
      <TestimonialForm initialData={testimonial || undefined} />
    </div>
  );
}
