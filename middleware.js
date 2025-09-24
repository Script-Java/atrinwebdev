// middleware.js (root)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// ✅ Do NOT run on /api/* or assets
export const config = {
  matcher: ["/((?!api/|_next/|static/|favicon\\.ico).*)"],
};

export async function middleware(req) {
  // ✅ Always let preflight pass
  if (req.method === "OPTIONS") return NextResponse.next();

  const url = req.nextUrl.clone();
  const path = url.pathname;
  const host = req.headers.get("host") || "";
  const isDev = process.env.NODE_ENV !== "production";
  const isCRMSub = host.startsWith("crm.");
  const isSignin = path === "/signin";

  // ---------------- DEV: protect CRM pages only ----------------
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

  // ---------------- PROD rules ----------------

  // 1) Force /signin and /crm pages to the crm. subdomain
  if (!isCRMSub && (isSignin || path.startsWith("/crm"))) {
    const dest = new URL(path + url.search, `https://crm.${host.replace(/^www\./, "")}`);
    return NextResponse.redirect(dest);
  }

  // 2) On crm. root, show /crm app
  if (isCRMSub && path === "/") {
    url.pathname = "/crm";
    return NextResponse.rewrite(url);
  }

  // 3) Require auth for CRM pages on crm. (APIs are NOT handled here)
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
