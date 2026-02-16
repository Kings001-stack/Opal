"use server";

import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Helper to log server action attempts (optional security audit trail)
async function logAction(action: string) {
  console.log(`[ServerAction] ${action} attempted.`);
  // RLS will handle the actual security enforcement.
}

export async function saveProject(
  data: Partial<Project>,
  projectId?: string
) {
  await logAction("saveProject");
  const supabase = await createClient();

  if (projectId) {
    const { error } = await supabase
      .from("projects")
      .update(data)
      .eq("id", projectId);

    if (error) {
      console.error("[saveProject] Update failed:", error);
      throw error;
    }
  } else {
    const { error } = await supabase.from("projects").insert([data]);
    if (error) {
      console.error("[saveProject] Insert failed:", error);
      throw error;
    }
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
}

export async function deleteProject(projectId: string) {
  await logAction("deleteProject");
  const supabase = await createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/dashboard");
}

export async function saveBlogPost(
  data: Partial<any>,
  postId?: string
) {
  await logAction("saveBlogPost");
  const supabase = await createClient();

  if (postId) {
    const { error } = await supabase
      .from("blog_posts")
      .update(data)
      .eq("id", postId);

    if (error) throw error;
  } else {
    const { error } = await supabase.from("blog_posts").insert([data]);
    if (error) throw error;
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
}

export async function deleteBlogPost(postId: string) {
  await logAction("deleteBlogPost");
  const supabase = await createClient();

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", postId);

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
}

export async function saveTestimonial(
  data: Partial<any>,
  testimonialId?: string
) {
  await logAction("saveTestimonial");
  const supabase = await createClient();

  if (testimonialId) {
    const { error } = await supabase
      .from("testimonials")
      .update(data)
      .eq("id", testimonialId);

    if (error) throw error;
  } else {
    const { error } = await supabase.from("testimonials").insert([data]);
    if (error) throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/dashboard");
}

export async function deleteTestimonial(testimonialId: string) {
  await logAction("deleteTestimonial");
  const supabase = await createClient();

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", testimonialId);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  revalidatePath("/admin/dashboard");
}

export async function updateBooking(
  bookingId: string,
  data: Partial<any>
) {
  await logAction("updateBooking");
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bookingId);

  if (error) throw error;

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/dashboard");
}

export async function saveService(
  data: Partial<any>,
  serviceId?: string
) {
  await logAction("saveService");
  const supabase = await createClient();

  if (serviceId) {
    const { error } = await supabase
      .from("services")
      .update(data)
      .eq("id", serviceId);

    if (error) throw error;
  } else {
    const { error } = await supabase.from("services").insert([data]);
    if (error) throw error;
  }

  revalidatePath("/");
  revalidatePath("/admin/services");
  revalidatePath("/admin/dashboard");
}

export async function deleteService(serviceId: string) {
  await logAction("deleteService");
  const supabase = await createClient();

  const { error } = await supabase
    .from("services")
    .delete()
    .eq("id", serviceId);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/admin/services");
  revalidatePath("/admin/dashboard");
}
