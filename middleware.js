// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Run on everything EXCEPT: /api/*, Next static, favicon, and common asset types
export const config = {
  matcher: [
    "/((?!api/|_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot|txt|xml)).*)",
  ],
};

export async function middleware(req) {
  const { nextUrl, headers, method } = req;
  const url = nextUrl.clone();
  const path = url.pathname;

  const host = headers.get("host") ?? "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");
  const rootHost = host.replace(/^crm\./, "").replace(/^www\./, "");
  const isSignin = path === "/signin";

  // No-op for preflight (harmless, but avoids surprises)
  if (method === "OPTIONS") return NextResponse.next();

  /* ---------------- DEV ---------------- */
  if (isDev) {
    // Lock down /crm pages locally (APIs are protected inside their handlers)
    if (path.startsWith("/crm")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", req.url);
        signin.searchParams.set("callbackUrl", `${nextUrl.origin}${path}${url.search}`);
        return NextResponse.redirect(signin);
      }
    }
    return NextResponse.next();
  }

  /* --------------- PROD ---------------- */

  // Keep /crm* and /signin ONLY on crm subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${rootHost}`);
    return NextResponse.redirect(dest);
  }

  // On crm subdomain, show /crm when hitting the bare "/"
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // On crm subdomain, require auth for /crm pages
  if (isCRMSub && path.startsWith("/crm")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const signin = new URL("/signin", `https://crm.${rootHost}`);
      signin.searchParams.set("callbackUrl", `https://crm.${rootHost}${path}${url.search}`);
      return NextResponse.redirect(signin);
    }
  }

  return NextResponse.next();
}
