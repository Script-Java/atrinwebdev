import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";
  const dir = path.join(process.cwd(), "src/content");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const urls = files
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(/\.md$/,"");
      const full = fs.readFileSync(path.join(dir,f),"utf8");
      const m = full.match(/---([\s\S]*?)---/);
      const fm = m ? m[1] : "";
      const date = (/^date:\s*"(.*)"/m.exec(fm)?.[1]) || new Date().toISOString();
      return { loc: `${site}/blog/${slug}`, lastmod: new Date(date).toISOString() };
    });

  const staticPages = ["", "/blog", "/signin", "/crm"].map(p => ({ loc: `${site}${p}`, lastmod: new Date().toISOString() }));
  const all = [...staticPages, ...urls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${all.map(u => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("")}
  </urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
