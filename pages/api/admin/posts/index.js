import path from "path";
import fs from "fs";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const dir = path.join(process.cwd(), "src/content");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const posts = files.filter(f=>f.endsWith(".md")).map(f=>{
    const slug = f.replace(/\.md$/,"");
    const raw = fs.readFileSync(path.join(dir,f),"utf8");
    const m = raw.match(/---([\s\S]*?)---/);
    const fm = m ? m[1] : "";
    const title = (/^title:\s*"(.*)"/m.exec(fm)?.[1]) || slug;
    const date = (/^date:\s*"(.*)"/m.exec(fm)?.[1]) || "";
    return { slug, title, date };
  }).sort((a,b)=> new Date(b.date)-new Date(a.date));
  return res.json({ posts });
}
