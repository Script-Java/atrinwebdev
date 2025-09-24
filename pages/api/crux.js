// pages/api/crux.js  (or app/api/crux/route.js with similar logic)
export default async function handler(req, res) {
  try {
    const { url, formFactor = "PHONE" } = req.query;
    if (!url) return res.status(400).json({ error: "Missing url" });
    const key = process.env.PSI_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing PSI_API_KEY" });

    const endpoint = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${key}`;
    const post = (body) =>
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

    const u = new URL(url);
    let r = await post({ url, formFactor });
    let j = await r.json();

    if (!r.ok || !j?.record?.metrics) {
      r = await post({ origin: u.origin, formFactor });
      j = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: j?.error?.message || "CrUX error" });
    }

    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return res.status(200).json(j);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
