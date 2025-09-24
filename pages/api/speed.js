// pages/api/speed.js
export default async function handler(req, res) {
  try {
    const { url, strategy = "mobile", locale = "en-US" } = req.query;

    if (!url || !/^https?:\/\//i.test(url)) {
      return res.status(400).json({ error: "Provide a valid absolute URL, e.g. https://example.com" });
    }
    if (!["mobile", "desktop"].includes(strategy)) {
      return res.status(400).json({ error: "strategy must be 'mobile' or 'desktop'" });
    }

    const endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
    const params = new URLSearchParams();

    // REQUIRED
    params.set("url", url);
    params.set("strategy", strategy);       // 'mobile' | 'desktop'
    params.set("locale", locale);           // optional but nice

    // ✅ IMPORTANT: append categories (do NOT use set repeatedly)
    ["performance", "accessibility", "best-practices", "seo", "pwa"].forEach((c) =>
      params.append("category", c)
    );

    // API key
    if (process.env.PSI_API_KEY) params.set("key", process.env.PSI_API_KEY);

    // Optional: identify your tool
    // params.set("utm_source", "atrinwebdev");
    // params.set("utm_campaign", "speed-test");

    const psiUrl = `${endpoint}?${params.toString()}`;
    const r = await fetch(psiUrl, { method: "GET", headers: { "Accept": "application/json" }, cache: "no-store" });

    // Non-2xx? Try to read text body for clues
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res.status(r.status).json({ error: `PSI error ${r.status}: ${text || r.statusText}` });
    }

    const json = await r.json();

    // Normalize a small summary (your UI already knows how to render raw)
    const lr = json?.lighthouseResult || {};
    const audits = lr?.audits || {};
    const cats = lr?.categories || {};

    const normalized = {
      url: json?.id || lr?.finalUrl || url,
      strategy,
      scores: {
        performance: cats.performance?.score != null ? Math.round(cats.performance.score * 100) : null,
        accessibility: cats.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null,
        bestPractices: cats["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : null,
        seo: cats.seo?.score != null ? Math.round(cats.seo.score * 100) : null,
        pwa: cats.pwa?.score != null ? Math.round(cats.pwa.score * 100) : null,
      },
      vitals: {
        LCP: audits["largest-contentful-paint"]?.numericValue ?? null,
        INP: audits["interaction-to-next-paint"]?.numericValue ?? null,
        CLS: audits["cumulative-layout-shift"]?.numericValue ?? null,
        FCP: audits["first-contentful-paint"]?.numericValue ?? null,
        TTFB: audits["server-response-time"]?.numericValue ?? null,
        TTI: audits["interactive"]?.numericValue ?? null,
        SpeedIndex: audits["speed-index"]?.numericValue ?? null,
        TotalBlockingTime: audits["total-blocking-time"]?.numericValue ?? null,
      },
      // pass through some helpful bits
      env: {
        lighthouseVersion: lr?.lighthouseVersion,
        userAgent: lr?.userAgent,
        fetchTime: lr?.fetchTime || json?.analysisUTCTimestamp,
        requestedUrl: lr?.requestedUrl || json?.id || url,
        finalUrl: lr?.finalUrl || lr?.requestedUrl || url,
        formFactor: lr?.configSettings?.formFactor || lr?.configSettings?.emulatedFormFactor || strategy,
        locale: lr?.configSettings?.locale,
        throttling: lr?.configSettings?.throttling,
        runWarnings: lr?.runWarnings || [],
        totalDurationMs: lr?.timing?.total,
      },
      // convenience: list top "opportunity" audits (already in your UI)
      opportunities: Object.values(audits)
        .filter((a) => a?.details?.type === "opportunity")
        .sort((a, b) => (b?.details?.overallSavingsMs || 0) - (a?.details?.overallSavingsMs || 0))
        .slice(0, 10)
        .map((a) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          savingsMs: a?.details?.overallSavingsMs ?? 0,
          score: a?.score ?? null,
        })),
    };

    // Return BOTH: normalized (easy) + full PSI payload (complete)
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60");
    return res.status(200).json({ normalized, psi: json });
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Unknown error" });
  }
}
