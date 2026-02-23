import { createClient } from "@/lib/supabase/server";
import HomeClient from "./HomeClient";
import { Project, Testimonial, Service } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch Projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true })
    .limit(6);

  // Fetch Testimonials
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("order_index", { ascending: true })
    .limit(5);

  // Fetch Services
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true })
    .limit(3);

  // Fetch Settings
  const { data: settingsData } = await supabase.from("settings").select("*");
  const settings = (settingsData || []).reduce((acc: Record<string, string>, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <HomeClient
      initialProjects={(projects as Project[]) || []}
      initialTestimonials={(testimonials as Testimonial[]) || []}
      initialServices={(services as Service[]) || []}
      settings={settings}
    />
  );
}
