// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = { matcher: ["/:path*"] };

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");

  // Public/static
  const isStatic =
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)$/.test(path);
  const isAuthRoute = path.startsWith("/api/auth");
  const isSignin = path === "/signin";

  if (isDev) {
    // Protect path-based CRM + its APIs in dev
    if (path.startsWith("/crm") || path.startsWith("/api/crm") || path.startsWith("/api/admin")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", req.url);
        signin.searchParams.set("callbackUrl", `${req.nextUrl.origin}${path}${url.search}`);
        return NextResponse.redirect(signin);
      }
    }
    return NextResponse.next();
  }

  // PROD

  // Force apex /signin or /crm/* to the CRM subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${host.replace(/^www\./, "")}`);
    return NextResponse.redirect(dest);
  }

  if (isStatic || isAuthRoute) return NextResponse.next();

  // On CRM subdomain, rewrite ONLY "/" -> "/crm" (do NOT touch /api/*)
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // Require auth for CRM pages & CRM/Admin APIs on CRM subdomain
  if (isCRMSub && (path.startsWith("/crm") || path.startsWith("/api/crm") || path.startsWith("/api/admin"))) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", `${url.protocol}//${host}`);
      signin.searchParams.set("callbackUrl", `${url.protocol}//${host}${path}${url.search}`);
      return NextResponse.redirect(signin);
    }
  }

  return NextResponse.next();
}
