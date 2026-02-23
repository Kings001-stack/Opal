import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

/**
 * createClient() returns a Supabase client for Server Components.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => { }, // Safe: RSCs are read-only
      },
      auth: {
        autoRefreshToken: false, // Priority: Proxy handles this
        persistSession: true,
      }
    }
  );
}

/**
 * getUser() - Navigation-Safe Auth Check.
 * Prioritizes headers from Proxy, falls back to passive session.
 */
export async function getUser() {
  try {
    const headerList = await headers();
    const userId = headerList.get("x-user-id");

    // FAST PATH: Return user immediately if Proxy already validated them.
    if (userId) {
      return {
        id: userId,
        email: headerList.get("x-user-email")
      } as any;
    }

    // SLOW PATH: First time load or Proxy header loss recovery.
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    return session?.user ?? null;
  } catch (err) {
    console.error("[getUser] System-wide auth error during navigation.");
    return null;
  }
}

export async function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) return createClient();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    {
      cookies: {
        getAll: () => [],
        setAll: () => { },
      },
    }
  );
}
