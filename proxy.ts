import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * PASSIVE PROXY FOR NEXT.JS 16
 * This version NEVER triggers a token refresh on the server.
 * All token refreshes happen in the browser (client-side).
 * This eliminates the "Invalid Refresh Token: Already Used" race condition.
 */
export async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    let supabaseResponse = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    // Even in passive mode, we keep this to support logout/manual updates
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set({ name, value, ...options });
                        supabaseResponse.cookies.set(name, value, options);
                    });
                },
            },
            auth: {
                // EXTREMELY IMPORTANT: This stops the server from ever racing with the browser
                autoRefreshToken: false,
                persistSession: true,
            }
        }
    );

    const path = request.nextUrl.pathname;
    const isStatic = path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/);
    if (isStatic) return supabaseResponse;

    let user = null;
    try {
        // PASSIVE CHECK: getSession() just reads the cookie. 
        // It does NOT make a network call to refresh the token.
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user ?? null;

        // If session is expired, user might be null. 
        // The browser client will identify this, refresh the token, 
        // and the next request will have the valid session.
    } catch {
        user = null;
    }

    const isAdminRoute = path.startsWith("/admin") && !path.startsWith("/admin/login");

    // REDIRECT PROTECTION:
    // Only redirect if it's a browser page load (GET) and we are CERTAIN there's no session.
    if (isAdminRoute && !user && request.method === "GET") {
        console.log(`[Passive Proxy] No active session for ${path}. Redirecting.`);
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    // HEADER STAMPING
    if (user) {
        requestHeaders.set("x-user-id", user.id);
        requestHeaders.set("x-user-email", user.email || "");

        // Create FINAL response with stamped headers
        const finalResponse = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        // Ensure cookies are preserved (Next.js 16 requirement when injecting headers)
        const allCookies = supabaseResponse.cookies.getAll();
        if (allCookies.length > 0) {
            console.log(`[Passive Proxy] Syncing ${allCookies.length} cookies to response`);
            allCookies.forEach(c => {
                finalResponse.cookies.set(c.name, c.value, {
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_VERSION === 'production' || request.nextUrl.protocol === 'https:',
                    httpOnly: true
                });
            });
        }

        return finalResponse;
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
