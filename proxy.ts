import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 REQUIREMENT: 
 * The file MUST be named 'proxy.ts' (not middleware.ts).
 */
export async function proxy(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    let response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
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
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set({ name, value, ...options });
                        response.cookies.set(name, value, options);
                    });
                },
            },
            auth: {
                autoRefreshToken: true,
                persistSession: true,
            }
        }
    );

    const path = request.nextUrl.pathname;
    if (path.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)) {
        return response;
    }

    let user = null;
    try {
        // 1. Authoritative Check: getUser() refreshes tokens if needed.
        const { data: { user: authUser }, error } = await supabase.auth.getUser();

        if (authUser) {
            user = authUser;
        } else if (error && (error.message?.includes("Already Used") || (error as any).code === "already_used" || (error as any).status === 400)) {
            // RACE RECOVERY: A parallel request already refreshed the token.
            console.log(`[Proxy] Race recovery for ${path}`);
            const { data: { session: raceSession } } = await supabase.auth.getSession();
            user = raceSession?.user ?? null;
        }
    } catch (e) {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user ?? null;
    }

    const isAdminRoute = path.startsWith("/admin") && !path.startsWith("/admin/login");

    // REDIRECT PROTECTION
    if (isAdminRoute && !user && request.method === "GET") {
        console.log(`[Proxy] Unauthorized access to ${path}. Redirecting.`);
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    // HEADER STAMPING: Pass the user ID down to RSCs
    if (user) {
        requestHeaders.set("x-user-id", user.id);
        requestHeaders.set("x-user-email", user.email || "");

        const finalResponse = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        // CRITICAL: Sync cookies to the final stamped response
        response.cookies.getAll().forEach(c => {
            finalResponse.cookies.set(c.name, c.value, {
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production' || request.nextUrl.protocol === 'https:',
                httpOnly: true
            });
        });

        return finalResponse;
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
