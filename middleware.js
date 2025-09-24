// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = { matcher: ["/:path*"] };

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");

  const isStatic =
    path.startsWith("/_next/") ||
    path.startsWith("/favicon") ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)$/.test(path);

  // Never touch any API route
  if (path.startsWith("/api/")) return NextResponse.next();
  if (isStatic) return NextResponse.next();

  // Dev: protect /crm pages locally
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

  // Prod: force /signin and /crm* to crm subdomain
  const isSignin = path === "/signin";
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${host.replace(/^www\./, "")}`);
    return NextResponse.redirect(dest);
  }

  // On crm subdomain, rewrite "/" -> "/crm"
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // On crm subdomain, protect /crm pages (not APIs)
  if (isCRMSub && path.startsWith("/crm")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", `${url.protocol}//${host}`);
      signin.searchParams.set("callbackUrl", `${url.protocol}//${host}${path}${url.search}`);
      return NextResponse.redirect(signin);
    }
  }

  return NextResponse.next();
}
