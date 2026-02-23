"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Helper to log server action attempts (optional security audit trail)
async function logAction(action: string) {
  console.log(`[ServerAction] ${action} attempted.`);
  // RLS will handle the actual security enforcement.
}

export async function saveProject(data: Partial<Project>, projectId?: string) {
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

export async function saveBlogPost(data: Partial<any>, postId?: string) {
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

  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);

  if (error) throw error;

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
}

export async function saveTestimonial(
  data: Partial<any>,
  testimonialId?: string,
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

export async function updateBooking(bookingId: string, data: Partial<any>) {
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

export async function saveService(data: Partial<any>, serviceId?: string) {
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

export async function saveTeamMember(data: Partial<any>, memberId?: string) {
  await logAction("saveTeamMember");
  const supabase = await createClient();

  if (memberId) {
    const { error } = await supabase
      .from("team_members")
      .update(data)
      .eq("id", memberId);

    if (error) throw error;
  } else {
    const { error } = await supabase.from("team_members").insert([data]);
    if (error) throw error;
  }

  revalidatePath("/services");
  revalidatePath("/admin/team");
  revalidatePath("/admin/dashboard");
}

export async function deleteTeamMember(memberId: string) {
  await logAction("deleteTeamMember");
  const supabase = await createClient();

  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", memberId);

  if (error) throw error;

  revalidatePath("/services");
  revalidatePath("/admin/team");
  revalidatePath("/admin/dashboard");
}

export async function addAdminByEmail(
  email: string,
  firstName: string,
  lastName: string,
  role: string = "admin",
  password?: string
) {
  await logAction("addAdminByEmail");
  const supabase = await createClient();
  const adminClient = await createAdminClient();

  // 1. Try to find existing user via RPC
  const { data: userId, error: idError } = await supabase.rpc(
    "get_user_id_by_email",
    { email_address: email },
  );

  let targetUserId = userId;

  // 2. If user doesn't exist AND we have a password AND admin client (service role)
  if (!targetUserId && password && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { first_name: firstName, last_name: lastName }
    });

    if (createError) {
      console.error("[addAdminByEmail] Auth creation failed:", createError.message);
      throw new Error(createError.message);
    }

    targetUserId = newUser.user?.id;
  }

  if (targetUserId) {
    // User exists or was just created, add to public.admins table
    // We use adminClient to bypass RLS in case the current user is stuck in a weird state
    const { error: adminError } = await adminClient.from("admins").insert([
      {
        id: targetUserId,
        first_name: firstName,
        last_name: lastName,
        role: role,
      },
    ]);

    if (adminError) {
      console.error("[addAdminByEmail] Insert into admins failed:", adminError);
      throw new Error("Failed to add user to the admins table.");
    }
  } else {
    // 3. Fallback: User does not exist and we can't create them, add to pending_admins
    const { error: pendingError } = await adminClient
      .from("pending_admins")
      .insert([
        {
          email,
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      ]);

    if (pendingError) {
      console.error("[addAdminByEmail] Pending insert failed:", pendingError);
      if (pendingError.code === "23505") {
        throw new Error("This email is already in the pending admin list.");
      }
      throw pendingError;
    }

    return {
      status: "pending",
      message: `User not found and could not be created directly (Password missing or Service Key not set). They have been added to the pending list and will be promoted when they sign up.`,
    };
  }

  revalidatePath("/admin/admins");
  return { status: "success" };
}

export async function removeAdmin(adminId: string) {
  await logAction("removeAdmin");
  const supabase = await createClient();

  const { error } = await supabase.from("admins").delete().eq("id", adminId);

  if (error) throw error;

  revalidatePath("/admin/admins");
}

export async function removePendingAdmin(email: string) {
  await logAction("removePendingAdmin");
  const supabase = await createClient();

  const { error } = await supabase
    .from("pending_admins")
    .delete()
    .eq("email", email);

  if (error) throw error;

  revalidatePath("/admin/admins");
}

export async function saveSettings(settings: Record<string, string>) {
  await logAction("saveSettings");
  const supabase = await createClient();

  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase
      .from("settings")
      .upsert({ key, value }, { onConflict: "key" });

    if (error) {
      console.error(`[saveSettings] Failed to update ${key}:`, error);
      throw error;
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
