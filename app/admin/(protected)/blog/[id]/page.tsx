import { redirect } from 'next/navigation';
import BlogPostForm from "@/components/admin/blog-post-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) redirect("/admin/blog");

  return (
    <div className="max-w-[1500px] mx-auto p-6 lg:p-10">
      <BlogPostForm initialData={post} />
    </div>
  );
}
