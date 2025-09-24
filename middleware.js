// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Run on everything EXCEPT: /api/*, Next static, favicon, and common assets
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

  // Allow preflight to pass
  if (method === "OPTIONS") return NextResponse.next();

  /* ---------------- DEV ---------------- */
  if (isDev) {
    // Protect local /crm pages (APIs are protected in their own handlers)
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

  // Hide /crm on apex/root site with a 404 (defense-in-depth)
  if (!isCRMSub && path.startsWith("/crm")) {
    // serve Next.js 404 page
    return NextResponse.rewrite(new URL("/_not-found", req.url));
    // Or: return new NextResponse(null, { status: 404 });
  }

  // Keep /signin only on CRM subdomain (redirect apex -> CRM)
  if (!isCRMSub && isSignin) {
    const dest = new URL("/signin" + url.search, `https://crm.${rootHost}`);
    return NextResponse.redirect(dest);
  }

  // On CRM subdomain:
  if (isCRMSub) {
    // "/" -> "/crm"
    if (path === "/") {
      url.pathname = "/crm";
      return NextResponse.rewrite(url);
    }

    // Require auth for /crm pages; also add noindex
    if (path.startsWith("/crm")) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const signin = new URL("/signin", `https://crm.${rootHost}`);
        signin.searchParams.set("callbackUrl", `https://crm.${rootHost}${path}${url.search}`);
        return NextResponse.redirect(signin);
      }
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex");
      return res;
    }
  }

  return NextResponse.next();
}
