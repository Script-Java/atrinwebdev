"use client";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

import Tabs from "./components/Tabs";
import Section from "./components/Section";
import ScoreRing from "./components/ScoreRing";
import StatRow from "./components/StatRow";
import { Badge, Pill } from "./components/Badges";
import KeyVal from "./components/KeyVal";

import { msToS, pct } from "@/lib/psi/normalize"; // use relative path if needed
import { useSpeedTest } from "./hooks/useSpeedTest";

function useCruxFallback(enabled, url, strategy) {
  const [crux, setCrux] = useState(null);
  useEffect(() => {
    if (!enabled || !url) return;
    const controller = new AbortController();
    (async () => {
      try {
        const formFactor = strategy === "desktop" ? "DESKTOP" : "PHONE";
        const r = await fetch(`/api/crux?url=${encodeURIComponent(url)}&formFactor=${formFactor}`, { signal: controller.signal });
        if (!r.ok) return;
        const j = await r.json();
        const rec = j?.record;
        if (!rec?.metrics) return;

        // map CrUX record to PSI-like shape used by the UI
        const m = rec.metrics || {};
        const toDist = (arr) => (arr || []).map(d => ({ min: d.min, max: d.max, proportion: d.proportion }));
        const cat = (metricKey, p75) => {
          if (metricKey === "CUMULATIVE_LAYOUT_SHIFT") return p75 <= 0.1 ? "FAST" : p75 <= 0.25 ? "AVERAGE" : "SLOW";
          // ms-based defaults
          const t = { LCP: [2500, 4000], FCP: [1800, 3000], INP: [200, 500], TTFB: [800, 1800] }[metricKey] || [3000, 6000];
          return p75 <= t[0] ? "FAST" : p75 <= t[1] ? "AVERAGE" : "SLOW";
        };
        const get = (key, psiKey, ms = true) => {
          const o = m[key];
          if (!o) return null;
          const p75 = ms ? o.percentiles?.p75 : o.percentiles?.p75; // CLS is unitless already
          return {
            percentile: p75,
            distributions: toDist(o.histogram),
            category: cat(psiKey, p75),
          };
        };

        const mapped = {
          id: rec.key?.url || rec.key?.origin,
          metrics: {
            FIRST_CONTENTFUL_PAINT_MS: get("first_contentful_paint", "FCP"),
            LARGEST_CONTENTFUL_PAINT_MS: get("largest_contentful_paint", "LCP"),
            CUMULATIVE_LAYOUT_SHIFT: get("cumulative_layout_shift", "CUMULATIVE_LAYOUT_SHIFT", false),
            INTERACTION_TO_NEXT_PAINT: get("interaction_to_next_paint", "INP"),
            TIME_TO_FIRST_BYTE_MS: get("experimental_time_to_first_byte", "TTFB"),
          },
          overall_category: undefined,
        };

        setCrux(mapped);
      } catch { /* ignore */ }
    })();
    return () => controller.abort();
  }, [enabled, url, strategy]);
  return crux;
}

export default function SpeedTool() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("mobile");
  const [activeTab, setActiveTab] = useState("overview");
  const { vm, loading, err, run } = useSpeedTest();

  const qs = useMemo(() => (url ? new URLSearchParams({ url, strategy }).toString() : ""), [url, strategy]);

  async function runTest(e) {
    e?.preventDefault();
    if (!url) return;
    await run(`/api/speed?${qs}`, { url, strategy });
  }

  useEffect(() => {
    const u = new URL(window.location.href);
    const qsUrl = u.searchParams.get("url");
    const qsStrat = u.searchParams.get("strategy");
    if (qsUrl) {
      setUrl(qsUrl);
      if (qsStrat === "desktop" || qsStrat === "mobile") setStrategy(qsStrat);
      setTimeout(() => run(`/api/speed?${new URLSearchParams({ url: qsUrl, strategy: qsStrat || "mobile" })}`), 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cruxFallback = useCruxFallback(Boolean(vm && !vm.crux), url, strategy);
  const cruxData = vm?.crux || cruxFallback;

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* remove giant spacer that was breaking mobile layout */}
      <div className="mb-40"><Navbar /></div>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-8 md:py-10">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Free Website Speed Test
            </h1>
            <p className="opacity-70 mt-2">
              Core Web Vitals (lab + field), Lighthouse scores, and prioritized fixes. Built by AtrinWebDev.
            </p>
          </header>

          {/* Form */}
          <form onSubmit={runTest} className="card bg-base-200 shadow-sm">
            <div className="card-body gap-3 md:gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <label className="sr-only" htmlFor="speed-url">Website URL</label>
                <input
                  id="speed-url"
                  type="url"
                  inputMode="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />

                <div className="join w-full sm:w-auto">
                  <button
                    type="button"
                    className={`join-item btn w-1/2 sm:w-auto ${strategy === "mobile" ? "btn-primary" : ""}`}
                    onClick={() => setStrategy("mobile")}
                    aria-pressed={strategy === "mobile"}
                  >
                    Mobile
                  </button>
                  <button
                    type="button"
                    className={`join-item btn w-1/2 sm:w-auto ${strategy === "desktop" ? "btn-primary" : ""}`}
                    onClick={() => setStrategy("desktop")}
                    aria-pressed={strategy === "desktop"}
                  >
                    Desktop
                  </button>
                </div>

                <button type="submit" className="btn btn-primary w-full lg:w-auto">
                  {loading ? (<><span className="loading loading-spinner loading-sm mr-2" />Testing…</>) : "Run Test"}
                </button>
              </div>

              {err && (
                <div className="alert alert-error mt-1">
                  <span>{err}</span>
                </div>
              )}
            </div>
          </form>

          {/* Tabs (mobile-scrollable) */}
          {vm && (
            <div className="mt-6 md:mt-8">
              <div className="-mx-3 sm:mx-0 px-3 sm:px-0 overflow-x-auto whitespace-nowrap no-scrollbar">
                <Tabs
                  active={activeTab}
                  setActive={setActiveTab}
                  items={[
                    ["overview", "Overview"],
                    ["vitals", "Vitals"],
                    ["opps", "Opportunities"],
                    ["diagnostics", "Diagnostics"],
                    ["passed", "Passed Audits"],
                    ["media", "Screenshots"],
                    ["env", "Environment"],
                    ["json", "Raw JSON"],
                  ]}
                />
              </div>
            </div>
          )}

          {/* Panels */}
          {vm && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Left */}
              <div className="space-y-4 md:space-y-6 lg:col-span-2">
                {activeTab === "overview" && (
                  <>
                    <Section
                      title="Scores"
                      right={
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{vm.env?.formFactor || "unknown"}</Badge>
                          <button className="btn btn-ghost btn-sm" onClick={copyLink}>Share link</button>
                          <a href={`/api/speed?${qs}`} className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer">View JSON →</a>
                        </div>
                      }
                    >
                      {/* xs→sm→md responsive columns (no nonstandard 'xs' breakpoint) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                        <ScoreRing label="Performance" score={vm.scores.performance} />
                        <ScoreRing label="Accessibility" score={vm.scores.accessibility} />
                        <ScoreRing label="Best Practices" score={vm.scores.bestPractices} />
                        <ScoreRing label="SEO" score={vm.scores.seo} />
                        {vm.scores.pwa != null ? (
                          <ScoreRing label="PWA" score={vm.scores.pwa} />
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <div className="radial-progress text-neutral" style={{ "--value": 0, "--size": "4.5rem" }}>—</div>
                            <div className="text-xs opacity-70">Not a PWA</div>
                          </div>
                        )}
                      </div>
                    </Section>

                    <Section title="Key Lab Metrics">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card bg-base-100"><div className="card-body">{vm.displayVitalsPrimary}</div></div>
                        <div className="card bg-base-100"><div className="card-body">{vm.displayVitalsSecondary}</div></div>
                      </div>
                    </Section>

                    {/* Field data (PSI or CrUX fallback) */}
                    <Section title="Field Data (CrUX)">
                      {cruxData?.metrics ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(cruxData.metrics).map(([metric, obj]) => (
                            <div key={metric} className="card bg-base-100">
                              <div className="card-body">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium break-words">{metric}</div>
                                  {obj?.category ? <Badge>{obj.category}</Badge> : null}
                                </div>
                                <div className="mt-2 space-y-1 text-sm">
                                  {"percentile" in obj ? <KeyVal k="percentile" v={`${obj.percentile}${metric.includes("SHIFT") ? "" : " ms"}`} /> : null}
                                  {"distributions" in obj
                                    ? obj.distributions.map((d, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                          <span className="opacity-70">{d.min ?? 0}–{d.max ?? "∞"}{metric.includes("SHIFT") ? "" : " ms"}</span>
                                          <span className="font-mono">{pct(d.proportion)}</span>
                                        </div>
                                      ))
                                    : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="opacity-70 text-sm">
                          No real-world user data available for this URL or origin.
                        </p>
                      )}
                    </Section>
                  </>
                )}

                {activeTab === "vitals" && <Section title="All Lab Metrics">{vm.displayAllVitals}</Section>}

                {activeTab === "opps" && (
                  <Section title="Top Opportunities">
                    {!vm.opportunities?.length ? (
                      <div className="opacity-60">No specific opportunities found.</div>
                    ) : (
                      <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vm.opportunities.map((o) => (
                          <li key={o.id} className="p-3 rounded-lg bg-base-100 border border-base-200">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="font-medium">{o.title}</div>
                              <div className="flex items-center gap-2">
                                {o.score != null ? <Badge>score {Math.round(o.score * 100)}</Badge> : null}
                                {o.savingsMs ? <span className="badge badge-outline">~{Math.round(o.savingsMs)} ms savings</span> : null}
                              </div>
                            </div>
                            {o.description ? <div className="text-sm opacity-70 mt-1">{o.description}</div> : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Section>
                )}

                {activeTab === "diagnostics" && (
                  <Section title="Diagnostics (Informative)">
                    {!vm.diagnostics?.length ? (
                      <div className="opacity-60">No diagnostics.</div>
                    ) : (
                      <div className="space-y-3">
                        {vm.diagnostics.map((d) => (
                          <div key={d.id} className="collapse collapse-arrow bg-base-100 border border-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium">{d.title}</div>
                            <div className="collapse-content">
                              {d.description ? <p className="opacity-80 text-sm mb-2">{d.description}</p> : null}
                              {d.displayValue ? <div className="text-sm font-mono mb-2">{d.displayValue}</div> : null}
                              {d.details ? (
                                <pre className="p-3 rounded-lg bg-base-200 overflow-x-auto text-xs">
                                  {JSON.stringify(d.details, null, 2)}
                                </pre>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                )}

                {activeTab === "passed" && (
                  <Section title={`Passed Audits (${vm.passed.length})`}>
                    {!vm.passed?.length ? (
                      <div className="opacity-60">No passed audits found.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vm.passed.map((p) => (
                          <div key={p.id} className="p-3 rounded-lg bg-base-100 border border-base-200 flex items-center justify-between">
                            <div className="text-sm">{p.title}</div>
                            <Pill ok />
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                )}

                {activeTab === "media" && (
                  <Section title="Screenshots">
                    <div className="grid grid-cols-1 gap-4">
                      {vm.finalShot ? (
                        <div>
                          <div className="mb-2 text-sm opacity-70">Final screenshot</div>
                          <img src={vm.finalShot} alt="final-screenshot" className="w-full rounded-xl border border-base-200" />
                        </div>
                      ) : null}
                      {vm.thumbs?.length ? (
                        <div>
                          <div className="mb-2 text-sm opacity-70">Filmstrip</div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {vm.thumbs.map((t, i) => (
                              <figure key={i} className="border border-base-200 rounded-lg overflow-hidden">
                                <img src={t.data} alt={`thumb-${i}`} className="w-full" />
                                <figcaption className="p-2 text-xs opacity-70">
                                  {t.timing != null ? `${t.timing}ms` : ""}
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {!vm.finalShot && !vm.thumbs?.length ? <div className="opacity-60">No screenshots provided by Lighthouse.</div> : null}
                    </div>
                  </Section>
                )}
              </div>

              {/* Right */}
              <aside className="space-y-4 md:space-y-6">
                {activeTab === "env" && (
                  <Section title="Environment & Timing">
                    <div className="space-y-2">
                      <StatRow label="Requested URL" value={vm.env.requestedUrl} monospace />
                      <StatRow label="Final URL" value={vm.env.finalUrl} monospace />
                      <StatRow label="Form Factor" value={vm.env.formFactor} />
                      <StatRow label="User Agent" value={vm.env.userAgent} />
                      <StatRow label="Lighthouse" value={vm.env.lighthouseVersion} />
                      <StatRow label="Fetch Time" value={vm.env.fetchTime} />
                      <StatRow label="Total Duration" value={msToS(vm.env.totalDurationMs)} />
                      <div className="mt-2">
                        <div className="text-sm opacity-70 mb-1">Throttling</div>
                        <pre className="text-xs p-3 bg-base-100 rounded-lg overflow-x-auto">
                          {JSON.stringify(vm.env.throttling || {}, null, 2)}
                        </pre>
                      </div>
                      {vm.env.runWarnings?.length ? (
                        <div className="mt-2">
                          <div className="text-sm opacity-70 mb-1">Run Warnings</div>
                          <ul className="list-disc list-inside text-sm opacity-80">
                            {vm.env.runWarnings.map((w, i) => (<li key={i}>{w}</li>))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </Section>
                )}

                {activeTab === "json" && (
                  <Section
                    title="Raw JSON"
                    right={<a href={`/api/speed?${qs}`} className="btn btn-ghost btn-sm" target="_blank" rel="noreferrer">Open →</a>}
                  >
                    <pre className="text-xs p-3 bg-base-100 rounded-lg overflow-x-auto max-h-[60vh]">
                      {JSON.stringify(vm.raw, null, 2)}
                    </pre>
                  </Section>
                )}

                {activeTab !== "env" && activeTab !== "json" && (
                  <Section title="Summary">
                    <div className="space-y-1">
                      <KeyVal k="URL" v={vm.env.finalUrl} />
                      <KeyVal k="Form Factor" v={vm.env.formFactor} />
                      <KeyVal k="Lighthouse" v={vm.env.lighthouseVersion} />
                      <KeyVal k="Fetched" v={vm.env.fetchTime} />
                      <KeyVal k="Duration" v={msToS(vm.env.totalDurationMs)} />
                    </div>
                  </Section>
                )}
              </aside>
            </div>
          )}

          {!vm && !loading && !err && (
            <div className="mt-8 md:mt-10">
              <div className="card bg-base-200">
                <div className="card-body items-center text-center">
                  <h3 className="card-title">Run your first test</h3>
                  <p className="opacity-70">Enter a full URL (including https://) and choose Mobile or Desktop.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 bg-base-100/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card bg-base-200 shadow-xl w-full max-w-sm mx-3">
            <div className="card-body items-center">
              <span className="loading loading-spinner loading-lg mb-2" />
              <div className="font-medium">Auditing page with Lighthouse…</div>
              <div className="opacity-70 text-sm">This usually takes a few seconds.</div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
