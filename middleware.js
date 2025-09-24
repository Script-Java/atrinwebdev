// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ✅ Do NOT run middleware on /api/*, /_next/*, /static/*, favicon.ico
export const config = {
  matcher: ["/((?!api/|_next/|static/|favicon\\.ico).*)"],
};

export async function middleware(req) {
  // ✅ Always let preflight OPTIONS pass (belt & suspenders)
  if (req.method === "OPTIONS") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");

  // (These are already excluded by matcher, but harmless to keep)
  const isStatic =
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)$/.test(path);

  const isSignin = path === "/signin";

  // -------------------------
  // DEV: protect /crm pages only
  // -------------------------
  if (isDev) {
    if (path.startsWith("/crm")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", req.url);
        signin.searchParams.set(
          "callbackUrl",
          `${req.nextUrl.origin}${path}${url.search}`
        );
        return NextResponse.redirect(signin);
      }
    }
    return NextResponse.next();
  }

  // -------------------------
  // PROD rules
  // -------------------------

  // Force /signin and /crm pages to the crm subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(
      path + url.search,
      `https://crm.${host.replace(/^www\./, "")}`
    );
    return NextResponse.redirect(dest);
  }

  if (isStatic) return NextResponse.next();

  // On crm subdomain, map "/" -> "/crm"
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // Require auth for CRM pages (APIs are excluded by matcher)
  if (isCRMSub && path.startsWith("/crm")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", `${url.protocol}//${host}`);
      signin.searchParams.set(
        "callbackUrl",
        `${url.protocol}//${host}${path}${url.search}`
      );
      return NextResponse.redirect(signin);
    }
  }

  return NextResponse.next();
}
