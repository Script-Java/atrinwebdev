import { metricColor } from "./thresholds";
import React from "react";
import StatRow from "@/app/tools/website-speed-test/components/StatRow";

export function msToS(v) { if (v == null) return "—"; return (v / 1000).toFixed(2) + "s"; }
export function pct(v) { if (v == null) return "—"; return Math.round(Number(v) * 100) + "%"; }

/** Turn full PSI json into a UI-friendly VM with prebuilt JSX for vitals. */
export function normalizeResult(j) {
  const lr = j?.lighthouseResult || null;
  const audits = lr?.audits || {};
  const cats = lr?.categories || {};

  const scores = {
    performance: cats?.performance?.score != null ? Math.round(cats.performance.score * 100) : null,
    accessibility: cats?.accessibility?.score != null ? Math.round(cats.accessibility.score * 100) : null,
    bestPractices: cats?.["best-practices"]?.score != null ? Math.round(cats["best-practices"].score * 100) : null,
    seo: cats?.seo?.score != null ? Math.round(cats.seo.score * 100) : null,
    pwa: cats?.pwa?.score != null ? Math.round(cats.pwa.score * 100) : null,
  };

  const vitals = {
    LCP: audits["largest-contentful-paint"]?.numericValue ?? null,
    INP: audits["interaction-to-next-paint"]?.numericValue ?? null,
    CLS: audits["cumulative-layout-shift"]?.numericValue ?? null,
    FCP: audits["first-contentful-paint"]?.numericValue ?? null,
    TTFB: audits["server-response-time"]?.numericValue ?? null,
    TTI: audits["interactive"]?.numericValue ?? null,
    SpeedIndex: audits["speed-index"]?.numericValue ?? null,
    TotalBlockingTime: audits["total-blocking-time"]?.numericValue ?? null,
  };

  const crux = j?.loadingExperience || j?.originLoadingExperience || null;

  const opportunities = Object.values(audits || {})
    .filter((a) => a?.details?.type === "opportunity")
    .map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description,
      savingsMs: a?.details?.overallSavingsMs ?? 0,
      score: a?.score ?? null,
    }))
    .sort((a, b) => (b.savingsMs || 0) - (a.savingsMs || 0));

  const diagnostics = Object.entries(audits)
    .filter(([_, a]) => a?.scoreDisplayMode === "informative")
    .map(([id, a]) => ({ id, title: a.title, description: a.description, displayValue: a.displayValue, details: a.details }))
    .slice(0, 50);

  const passed = Object.entries(audits)
    .filter(([_, a]) => a?.score === 1 && a?.scoreDisplayMode === "binary")
    .map(([id, a]) => ({ id, title: a.title }))
    .slice(0, 200);

  const finalShot = audits["final-screenshot"]?.details?.data || null;
  const thumbs = audits["screenshot-thumbnails"]?.details?.items || [];

  const env = {
    lighthouseVersion: lr?.lighthouseVersion,
    userAgent: lr?.userAgent,
    fetchTime: lr?.fetchTime || j?.analysisUTCTimestamp,
    requestedUrl: lr?.requestedUrl || j?.id || j?.url,
    finalUrl: lr?.finalUrl || j?.finalUrl || j?.url,
    formFactor: lr?.configSettings?.formFactor || lr?.configSettings?.emulatedFormFactor,
    locale: lr?.configSettings?.locale,
    throttling: lr?.configSettings?.throttling,
    runWarnings: lr?.runWarnings || [],
    totalDurationMs: lr?.timing?.total,
  };

  // Prebuilt JSX with color-coded thresholds for “at a glance”
  const displayVitalsPrimary = (
    <>
      <StatRow label="LCP" value={<span className={metricColor("LCP", vitals.LCP)}>{msToS(vitals.LCP)}</span>} hint="≤ 2.5s good" />
      <StatRow label="INP" value={<span className={metricColor("INP", vitals.INP)}>{msToS(vitals.INP)}</span>} hint="≤ 200ms good" />
      <StatRow label="CLS" value={<span className={metricColor("CLS", vitals.CLS)}>{vitals.CLS ?? "—"}</span>} hint="≤ 0.1 good" />
    </>
  );

  const displayVitalsSecondary = (
    <>
      <StatRow label="FCP" value={<span className={metricColor("FCP", vitals.FCP)}>{msToS(vitals.FCP)}</span>} />
      <StatRow label="TTFB" value={<span className={metricColor("TTFB", vitals.TTFB)}>{msToS(vitals.TTFB)}</span>} />
      <StatRow label="TTI" value={<span className={metricColor("TTI", vitals.TTI)}>{msToS(vitals.TTI)}</span>} />
      <StatRow label="Speed Index" value={<span className={metricColor("SpeedIndex", vitals.SpeedIndex)}>{msToS(vitals.SpeedIndex)}</span>} />
      <StatRow label="Total Blocking Time" value={<span className={metricColor("TotalBlockingTime", vitals.TotalBlockingTime)}>{msToS(vitals.TotalBlockingTime)}</span>} />
    </>
  );

  const displayAllVitals = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(vitals).map(([k, v]) => (
        <div key={k} className="card bg-base-100">
          <div className="card-body">
            <div className="font-medium">{k}</div>
            <div className={`font-mono ${metricColor(k, v)}`}>{k === "CLS" ? (v ?? "—") : msToS(v)}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return {
    scores, vitals, crux, opportunities, diagnostics, passed, finalShot, thumbs, env, raw: j,
    displayVitalsPrimary, displayVitalsSecondary, displayAllVitals
  };
}
