import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: This call refreshes the session token if it is expired.
  // We MUST do this here so the updated cookie is passed to the browser.
  try {
    await supabase.auth.getUser();
  } catch (error) {
    // If the error is "refresh_token_already_used", it means the client or another request 
    // already refreshed the token. We can safely ignore this in middleware because
    // we aren't using the user object for access control here (delegated to Layout).
    // The downstream request will either have the new cookie (if client set it) 
    // or will fail active validation in the Layout and redirect to login.
    // We do NOT want to crash the whole request with a 500 error.
    if (process.env.NODE_ENV === "development") {
      console.warn("[Middleware] Auth error (ignoring):", (error as any)?.code || error);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
