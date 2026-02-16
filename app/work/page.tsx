import { createClient } from "@/lib/supabase/server";
import WorkClient from "./WorkClient";
import { Project } from "@/lib/types";

export default async function WorkPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  return <WorkClient projects={(projects as Project[]) || []} />;
}
