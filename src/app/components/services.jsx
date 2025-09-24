"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaSearch,
  FaGoogle,
  FaPalette,
  FaCheck,
  FaUsers,
  FaMobileAlt,
  FaServer,
  FaChartLine,
} from "react-icons/fa";

import ScrollingBar from "./scrollingBar";

/* ----------------------------- Glass primitives ---------------------------- */
function GlassCard({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl " +
        "shadow-[0_8px_30px_rgba(0,0,0,0.15)] " +
        className
      }
    >
      {children}
    </div>
  );
}
const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.08 },
  viewport: { once: true, amount: 0.3 },
});

/* --------------------------------- Content -------------------------------- */
const SERVICES = [
  {
    key: "web",
    icon: <FaLaptopCode className="text-3xl md:text-4xl text-indigo-300" />,
    title: "Custom Website Development",
    desc:
      "Fast, accessible sites built on modern stacks and tuned for Core Web Vitals. We plan information architecture, wireframes, and component systems that make content easy to manage and scale. Every page ships with clean semantics, image optimization, and caching so your site stays quick on mobile and desktop.",
    bullets: ["Next.js / Headless WP", "UX & wireframes", "On-page SEO & schema", "WCAG-aware UI"],
    cta: { href: "/web-design", label: "See Web Projects" },
  },
  {
    key: "seo",
    icon: <FaSearch className="text-3xl md:text-4xl text-indigo-300" />,
    title: "Local SEO Strategy",
    desc:
      "Own your service area with technical fixes, content clusters, and GBP wins. We map search intent to pages, build topical depth, and strengthen E-E-A-T with reviews, citations, and local links. Technical audits clear crawl issues so you rank consistently and convert more high-intent visitors.",
    bullets: ["Keyword & topic clusters", "Technical audits", "GBP optimization", "Reviews & citations"],
    cta: { href: "/local-seo", label: "Explore Local SEO" },
  },
  {
    key: "ppc",
    icon: <FaGoogle className="text-3xl md:text-4xl text-indigo-300" />,
    title: "PPC & Google Ads",
    desc:
      "Tightly-themed campaigns, negatives, and A/B tests to maximize ROAS. We pair compelling ad copy with high-converting landing pages, then iterate with call tracking and analytics. Budgets are protected with strong query filters and continuous testing so spend moves toward what actually drives leads.",
    bullets: ["Search / PMax", "SKAG/SKSA", "Ad tests", "Call tracking"],
    cta: { href: "/google-ads", label: "View Ad Plans" },
  },
  {
    key: "brand",
    icon: <FaPalette className="text-3xl md:text-4xl text-indigo-300" />,
    title: "Brand & Logo Identity",
    desc:
      "Memorable, scalable identity systems that look sharp everywhere. We explore multiple directions, refine typography and color, and deliver an asset kit with usage rules so your brand stays consistent across print, web, and ads. The result is a clear visual voice that people remember.",
    bullets: ["3–5 concepts", "Style guide", "Asset kit", "Usage rules"],
    cta: { href: "/logo-design", label: "See Brand Work" },
  },
];

const PROCESS = [
  {
    icon: <FaUsers />,
    title: "Discover",
    copy:
      "Clarify goals, audience, and KPIs while auditing your current assets and competitors. We align scope and success metrics so every decision supports measurable outcomes.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Design",
    copy:
      "Translate strategy into flows, wireframes, and UI. Content and visuals are built together, emphasizing clarity, accessibility, and clear calls to action across devices.",
  },
  {
    icon: <FaServer />,
    title: "Build",
    copy:
      "Implement with a modern stack, performance budgets, and QA across browsers. Analytics and event tracking are wired in from day one for clean, reliable data.",
  },
  {
    icon: <FaChartLine />,
    title: "Launch & Grow",
    copy:
      "Go live with a thorough checklist, then iterate. We monitor rankings, speed, and conversion, running CRO, SEO, and PPC adjustments to compound results over time.",
  },
];

export default function Services() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web Design, Local SEO, PPC, Branding",
    provider: { "@type": "Organization", name: "atrinwebdev", url: "https://www.atrinwebdev.com" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Growth Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc },
      })),
    },
  };

  return (
    <section id="solutions" className="bg-black text-white py-16 md:py-24">
      <Script id="services-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center uppercase">
          <p className="text-sm font-medium tracking-wide text-indigo-300/90">Our Solutions</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">Services built for local growth</h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
            From stunning web design to targeted SEO and PPC—everything you need to get found and convert.
            We blend strategy, performance, and clean execution so your brand looks great and your pipeline stays full.
          </p>
        </motion.div>

        {/* Optional marquee */}
        <div className="mt-8 md:mt-10">
          <ScrollingBar />
        </div>

        {/* Services (equal-height glass cards) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 items-stretch gap-5 md:gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={s.key} {...fadeUp(i)} className="h-full">
              <GlassCard className="p-6 md:p-7 h-full min-h-[300px] md:min-h-[320px] flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">{s.icon}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold uppercase">{s.title}</h3>
                    <p className="mt-1 text-gray-300">{s.desc}</p>

                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-gray-200/90">
                          <FaCheck className="text-indigo-300" />
                          <span className="truncate">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* push CTA to bottom for consistent heights */}
                    <div className="mt-5 pt-1" />
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <Link
                    href='/contact'
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-white/15 transition"
                  >
                    Learn More<span aria-hidden>→</span>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Process → Timeline (equal-height cards) */}
        <div className="mt-14 md:mt-20">
          <motion.h3 {...fadeUp()} className="text-2xl uppercase md:text-3xl font-semibold text-center">
            A simple, predictable process
          </motion.h3>

          {/* Vertical timeline (mobile–md) */}
          <div className="mt-8 lg:hidden relative">
            <div aria-hidden className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
            <ol className="space-y-6">
              {PROCESS.map((step, i) => (
                <motion.li key={step.title} {...fadeUp(i)} className="h-full">
                  <div className="relative pl-16">
                    <span
                      aria-hidden
                      className="absolute left-0 top-2 flex h-12 w-12 items-center justify-center rounded-full
                                 border border-white/15 bg-white/10 backdrop-blur-xl text-indigo-200
                                 shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                    >
                      {step.icon}
                    </span>

                    <GlassCard className="p-5 h-full min-h-[140px] flex flex-col">
                      <div className="flex items-center gap-2 text-indigo-200">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs border border-white/15">
                          {i + 1}
                        </span>
                        <span className="font-medium">{step.title}</span>
                      </div>
                      <p className="mt-2.5 text-sm text-gray-300 flex-1">{step.copy}</p>
                    </GlassCard>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Horizontal timeline (lg+) */}
          <div className="mt-10 hidden lg:block">
            <div className="relative">
              <div aria-hidden className="absolute left-0 right-0 top-6 h-px bg-white/10" />
              <ol className="grid grid-cols-4 items-stretch gap-6">
                {PROCESS.map((step, i) => (
                  <motion.li key={step.title} {...fadeUp(i)} className="h-full">
                    <div className="flex h-full flex-col items-center text-center">
                      <span
                        aria-hidden
                        className="z-10 flex h-12 w-12 items-center justify-center rounded-full
                                   border border-white/15 bg-white/10 backdrop-blur-xl text-indigo-200
                                   shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                      >
                        {step.icon}
                      </span>
                      <GlassCard className="mt-4 p-5 w-full h-full min-h-[160px] flex flex-col">
                        <div className="flex items-center justify-center gap-2 text-indigo-200">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs border border-white/15">
                            {i + 1}
                          </span>
                          <span className="font-medium">{step.title}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-300 flex-1">{step.copy}</p>
                      </GlassCard>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
