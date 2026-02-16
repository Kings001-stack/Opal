import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  );
}

/**
 * Standard getUser function, cached per request to prevent race conditions.
 * This is the magic bullet for "Refresh Token Already Used".
 */
export const getUser = cache(async () => {
  const supabase = await createClient();
  try {
    // First try to get the session (more reliable for SSR)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.warn("[getUser] Session error:", sessionError);
      return null;
    }

    if (session?.user) {
      return session.user;
    }

    // Fallback to getUser if no session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.warn("[getUser] User error:", userError);
      return null;
    }

    return user;
  } catch (error) {
    console.warn("[getUser] Auth check failed:", error);
    return null;
  }
});
