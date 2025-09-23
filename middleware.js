// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const path = url.pathname;

  const isPublic =
    path.startsWith("/api/auth") ||
    path === "/signin" ||
    path.startsWith("/_next/") ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|map)$/.test(path);

  if (isPublic) return NextResponse.next();

  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // DEV MODE: protect path-based CRM at /crm (no subdomain needed)
    if (path.startsWith("/crm")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", "http://localhost:3000");
        signin.searchParams.set("callbackUrl", `http://localhost:3000${path}${url.search}`);
        return NextResponse.redirect(signin);
      }
    }
    // Everything else in dev just passes through
    return NextResponse.next();
  }

  // PROD MODE: require auth on crm.* and rewrite to /crm
  const isCRM = host.startsWith("crm.");
  if (isCRM) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", "https://atrinwebdev.com");
      signin.searchParams.set("callbackUrl", `https://${host}${path}${url.search}`);
      return NextResponse.redirect(signin);
    }
    if (!path.startsWith("/crm")) {
      url.pathname = `/crm${path === "/" ? "" : path}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
