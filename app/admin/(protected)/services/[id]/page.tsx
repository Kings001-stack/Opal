import { redirect } from 'next/navigation';
import ServiceForm from "@/components/admin/service-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: service } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

    if (!service) redirect("/admin/services");

    return (
        <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
            <ServiceForm initialData={service} />
        </div>
    );
}
