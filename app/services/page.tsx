import { createClient } from "@/lib/supabase/server";
import ServicesClient from "./ServicesClient";
import { Service } from "@/lib/types";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  return <ServicesClient services={(services as Service[]) || []} />;
}
