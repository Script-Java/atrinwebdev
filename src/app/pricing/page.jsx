"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="relative bg-transparent text-white">
        {/* DARK base stays; color glows are subtle */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20"
          style={{ background: "#0b0a10" }}
        />
        {/* soft radial glows (very low opacity) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.28]"
          style={{
            background:
              "radial-gradient(60rem 30rem at 12% 0%, rgba(99,102,241,.20), transparent 60%), radial-gradient(50rem 25rem at 88% 12%, rgba(168,85,247,.16), transparent 60%), radial-gradient(55rem 28rem at 50% 100%, rgba(236,72,153,.12), transparent 60%)",
          }}
        />
        {/* faint grid on top of glows */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          {/* Top badge/title */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" />
              The Client Magnet Website Package™
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Details */}
            <div className="lg:col-span-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Client Magnet Website Package™</h1>
                <p className="mt-3 text-white/80">
                  A streamlined package for businesses that want a modern website, local visibility,
                  and ongoing support—without juggling multiple tiers or vendors.
                </p>

                {/* What's included */}
                <h2 className="mt-10 text-lg md:text-xl font-semibold">What’s included</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "Custom Next.js website (up to 8 pages)",
                    "Core analytics dashboard & monthly report",
                    "Local SEO setup + Google Business Profile",
                    "Email / ticket support, uptime monitoring",
                    "30-day satisfaction guarantee",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 text-black/80 text-[10px] font-bold">
                        ✓
                      </span>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-8 border-white/10" />

                <h3 className="text-xl font-semibold">What is included in the Basic plan?</h3>
                <p className="mt-3 text-white/80">
                  We handle strategy, design, build, hosting, and optimization. Your site ships fast,
                  mobile-first, and WCAG-aware with clean structure, schema, and performance budgets
                  that protect Core Web Vitals. You’ll get a simple content workflow and quick guides
                  so edits are easy.
                </p>
                <ul className="mt-4 list-disc list-inside text-sm space-y-1 text-white/80">
                  <li>Information architecture, flows, and clear CTAs</li>
                  <li>Speed: caching, optimized images, script splitting</li>
                  <li>SEO foundation: metadata, schema, sitemaps, GBP</li>
                </ul>

                <h3 className="mt-10 text-xl font-semibold">Is this the right plan for me?</h3>
                <p className="mt-3 text-white/80">
                  If you need a professional presence that’s quick to launch and easy to maintain,
                  this plan keeps everything under one roof. Ideal for local service businesses and
                  new brands that want measurable results without enterprise complexity.
                </p>
              </div>
            </div>

            {/* RIGHT: Price Card */}
            <aside className="lg:col-span-4">
              <div className="relative rounded-3xl border border-white/12 bg-white/[0.06] backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] lg:sticky lg:top-24">
                {/* subtle ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-3xl -z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236,72,153,.22), rgba(168,85,247,.22), rgba(59,130,246,.22))",
                    mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                    WebkitMask:
                      "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                    padding: "1px",
                  }}
                />

                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold">Lock in your launch discount</h4>
                  <span className="inline-flex items-center rounded-full border border-emerald-300/40 bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
                    20% OFF
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/80">
                  Save on your first 6 months when you start this month.
                </p>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl md:text-5xl font-extrabold">$289</span>
                    <span className="pb-1 text-sm text-white/70">USD / mo</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm line-through text-white/60">$349/mo</span>
                    <span className="text-xs font-semibold text-emerald-200">Save $60/mo</span>
                  </div>
                  <p className="mt-2 text-xs text-white/70">No setup fee. Cancel anytime.</p>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="mt-6 block rounded-xl px-5 py-3 text-center text-sm font-semibold text-white 
                             bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 
                             hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500 transition shadow"
                >
                  Contact to Get Started
                </Link>

                {/* Notes */}
                <ul className="mt-6 space-y-2 text-xs text-white/85">
                  <li>• Discount guaranteed for first 6 months</li>
                  <li>• Optional annual billing: 2 months free</li>
                  <li>• Response within 24 hours, Mon–Sat</li>
                </ul>

                {/* Trust */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/90">
                  “Launched fast, load times improved, and calls went up within the first month.”
                  <div className="mt-1 text-xs text-white/70">— Local Service Owner</div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
