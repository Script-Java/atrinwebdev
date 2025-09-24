// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * ✅ Do NOT run on /api/* or static assets.
 * This is critical to avoid 405s on PUT/DELETE/POST to your API routes.
 */
export const config = {
  matcher: [
    "/((?!api/|_next/|static/|favicon\\.ico|robots\\.txt|sitemap\\.xml|rss$).*)",
  ],
};

export async function middleware(req) {
  // Always allow preflight through (belt & suspenders)
  if (req.method === "OPTIONS") return NextResponse.next();

  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";

  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");
  const isSignin = path === "/signin";

  // ------------------------------
  // DEV: protect /crm pages only
  // ------------------------------
  if (isDev) {
    if (path.startsWith("/crm")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", req.url);
        signin.searchParams.set("callbackUrl", `${req.nextUrl.origin}${path}${url.search}`);
        return NextResponse.redirect(signin);
      }
    }
    return NextResponse.next();
  }

  // ------------------------------
  // PROD: crm lives ONLY on crm.*
  // ------------------------------

  // 1) Force /signin and any /crm* path to the CRM subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(
      path + url.search,
      `https://crm.${host.replace(/^www\./, "")}`
    );
    return NextResponse.redirect(dest);
  }

  // 2) On crm. home, serve the CRM app (rewrite "/" -> "/crm")
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // 3) Require auth for CRM pages on crm. (APIs are excluded by matcher)
  if (isCRMSub && path.startsWith("/crm")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", `${url.protocol}//${host}`);
      signin.searchParams.set("callbackUrl", `${url.protocol}//${host}${path}${url.search}`);
      return NextResponse.redirect(signin);
    }
  }

  // Everything else passes through
  return NextResponse.next();
}
