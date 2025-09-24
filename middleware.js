// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Exclude API & static from middleware entirely
export const config = {
  matcher: [
    // run on everything except: api, _next/static, _next/image, favicon, assets
    "/((?!api/|_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot)).*)",
  ],
};

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");
  const isSignin = path === "/signin";

  // DEV: protect /crm pages locally
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

  // PROD: move /signin and /crm* to CRM subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${host.replace(/^www\./, "")}`);
    return NextResponse.redirect(dest);
  }

  // On crm subdomain, rewrite "/" → "/crm"
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // On crm subdomain, protect /crm pages
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
