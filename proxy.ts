import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminLogin = pathname === "/api/admin/login";
  const isProtectedPage = pathname.startsWith("/admin/") && pathname !== "/admin/";

  if (!isAdminApi && !isProtectedPage) return NextResponse.next();

  if (isAdminApi && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    const origin = request.headers.get("origin");
    let sameOrigin = false;
    try {
      sameOrigin = Boolean(origin) && new URL(origin!).origin === request.nextUrl.origin;
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
    }
  }

  if (isAdminLogin) return NextResponse.next();
  const authenticated = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (authenticated) return NextResponse.next();
  if (isAdminApi) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  return NextResponse.redirect(new URL("/admin", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
