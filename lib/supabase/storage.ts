import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function uploadImage(
  file: File,
  bucket: string,
  folder: string
): Promise<string | null> {
  try {
    const supabase = createBrowserClient();
    const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

export async function deleteImage(bucket: string, filePath: string): Promise<boolean> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

export function getImageUrlFromPublicUrl(url: string): string {
  // Extract the path from a public URL
  if (!url) return "";
  const parts = url.split("/storage/v1/object/public/");
  return parts[1] || url;
}
