import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic"; // always fresh

export async function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";
  const dir = path.join(process.cwd(), "src/content");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const posts = files
    .filter(f => f.endsWith(".md"))
    .map(f => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const m = raw.match(/---([\s\S]*?)---/);
      const fm = m ? m[1] : "";
      const title = (/^title:\s*"(.*)"/m.exec(fm)?.[1]) || slug;
      const date = (/^date:\s*"(.*)"/m.exec(fm)?.[1]) || new Date().toISOString();
      const description = (/^description:\s*"(.*)"/m.exec(fm)?.[1]) || "";
      return { slug, title, date, description };
    })
    .sort((a,b)=> new Date(b.date)-new Date(a.date))
    .slice(0, 50);

  const items = posts.map(p => `
    <item>
      <title>${escapeXML(p.title)}</title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXML(p.description)}</description>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>AtrinWebDev Blog</title>
      <link>${site}</link>
      <description>Latest posts</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
function escapeXML(s=""){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
