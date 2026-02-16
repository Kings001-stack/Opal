import ProjectForm from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
      <ProjectForm initialData={project || undefined} />
    </div>
  );
}
