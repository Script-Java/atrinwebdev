// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  // You can narrow this later, but this is fine to start
  matcher: ["/:path*"],
};

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const origin = `${url.protocol}//${host}`;
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSubdomain = host.startsWith("crm.");

  // --- Public paths (skip protection) ---
  const isStatic =
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)$/.test(path);

  const isAuthRoute = path.startsWith("/api/auth");
  const isSignin = path === "/signin";

  // --- DEV MODE: protect path-based CRM at /crm + APIs ---
  if (isDev) {
    if (
      path.startsWith("/crm") ||
      path.startsWith("/api/crm") ||
      path.startsWith("/api/admin")
    ) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signinURL = new URL("/signin", origin);
        // callback to exact requested URL
        signinURL.searchParams.set("callbackUrl", `${origin}${path}${url.search}`);
        return NextResponse.redirect(signinURL);
      }
    }
    return NextResponse.next();
  }

  // ---------- PROD MODE ----------

  // 1) Force CRM routes onto crm. subdomain
  if (!isCRMSubdomain && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${host.replace(/^www\./, "")}`);
    return NextResponse.redirect(dest);
  }

  // 2) Allow public files everywhere
  if (isStatic || isAuthRoute) return NextResponse.next();

  // 3) On CRM subdomain, let "/" act as the CRM app (optional)
  if (isCRMSubdomain && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // 4) On CRM subdomain, require auth for CRM pages and CRM/Admin APIs
  if (
    isCRMSubdomain &&
    (path.startsWith("/crm") || path.startsWith("/api/crm") || path.startsWith("/api/admin"))
  ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signinURL = new URL("/signin", `${url.protocol}//${host}`);
      signinURL.searchParams.set("callbackUrl", `${url.protocol}//${host}${path}${url.search}`);
      return NextResponse.redirect(signinURL);
    }
  }

  // 5) Everything else passes through
  return NextResponse.next();
}
