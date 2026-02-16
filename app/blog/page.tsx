import { createClient } from "@/lib/supabase/server";
import BlogClient from "./BlogClient";
import { BlogPost } from "@/lib/types";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return <BlogClient posts={(posts as BlogPost[]) || []} />;
}
