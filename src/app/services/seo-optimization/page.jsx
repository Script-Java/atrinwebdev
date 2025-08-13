"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Icons
import { FiTrendingUp, FiMapPin, FiEdit3, FiBarChart2, FiSearch, FiLink, FiZap, FiShield, FiCheckCircle } from "react-icons/fi";

export default function SeoOptimization() {
  // ===== Data =====
  const seoServices = [
    {
      icon: <FiTrendingUp size={24} />,
      title: "On‑Page SEO",
      description:
        "We optimize copy, headings, meta data, internal links, and Core Web Vitals so your pages are easy for people and search engines.",
      bullets: [
        "Semantic headings & content briefs",
        "Title/meta rewrites for intent",
        "Schema (Article, Service, FAQ)",
        "Image alt text & compression",
      ],
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Local SEO",
      description:
        "Dominate your service area with a tuned Google Business Profile, location pages, and consistent citations.",
      bullets: [
        "GBP optimization (posts, Q&A, services)",
        "NAP consistency & top citations",
        "Location pages with unique proof",
        "Review generation & response playbook",
      ],
    },
    {
      icon: <FiEdit3 size={24} />,
      title: "Content & Topic Hubs",
      description:
        "Publish authority‑building hubs that cover the topic end‑to‑end and capture long‑tail queries.",
      bullets: [
        "Keyword & entity research",
        "Pillar + cluster architecture",
        "Editorial calendar & briefs",
        "Thought‑leadership & FAQs",
      ],
    },
    {
      icon: <FiBarChart2 size={24} />,
      title: "Analytics & Reporting",
      description:
        "Transparent reporting with actionable next steps. We instrument events to prove ROI, not just rankings.",
      bullets: [
        "GSC + GA4 dashboards",
        "Rank tracking & cannibalization",
        "Lead source & call tracking",
        "Monthly roadmap updates",
      ],
    },
  ];

  const technical = [
    {
      icon: <FiSearch className="text-indigo-400" size={20} />,
      title: "Technical Audit",
      description: "Indexation, sitemaps, robots, canonicalization, JS rendering, and crawl depth fixes.",
    },
    {
      icon: <FiLink className="text-indigo-400" size={20} />,
      title: "Internal Linking",
      description: "Contextual anchors and smart breadcrumbs to concentrate PageRank on money pages.",
    },
    {
      icon: <FiZap className="text-indigo-400" size={20} />,
      title: "Performance",
      description: "LCP/INP/CLS tuning: critical CSS, lazy‑loading, image formats, script deferral.",
    },
    {
      icon: <FiShield className="text-indigo-400" size={20} />,
      title: "Trust Signals",
      description: "Bylines, author bios, references, and policies that strengthen E‑E‑A‑T.",
    },
  ];

  const kpis = [
    { label: "Avg. LCP", value: "< 2.5s" },
    { label: "INP", value: "< 200ms" },
    { label: "Click‑thru", value: "+20–40%" },
    { label: "Leads", value: "+2–3×" },
  ];

  const faqs = [
    {
      q: "What does your SEO process look like?",
      a: "Month 0: audit + strategy. Months 1–2: technical fixes, on‑page rewrites, content hub kickoff. Ongoing: content publishing, internal links, local signals, and experiments that move KPIs.",
    },
    {
      q: "How soon will we see results?",
      a: "Most clients see traction in 6–10 weeks for on‑page/local terms. Competitive head terms typically require consistent publishing and links over 3–6 months.",
    },
    {
      q: "Can you work with our CMS?",
      a: "Yes—WordPress, headless, Shopify, or custom stacks. We adapt the playbook to your platform.",
    },
    {
      q: "What’s in the monthly report?",
      a: "Rank movements, traffic & conversions, top pages, cannibalization alerts, content ideas, and a prioritized next‑month plan.",
    },
  ];

  // ===== JSON‑LD =====
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'atrinwebdev',
    url: 'https://www.atrinwebdev.com',
    logo: 'https://www.atrinwebdev.com/logo.png',
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'SEO Services',
    provider: { '@type': 'Organization', name: 'atrinwebdev' },
    areaServed: { '@type': 'Country', name: 'United States' },
    offers: {
      '@type': 'Offer',
      url: 'https://www.atrinwebdev.com/pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(orgLd)}</Script>
      <Script id="service-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(serviceLd)}</Script>
      <Script id="faq-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(faqLd)}</Script>

      <Navbar />

      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* ===== Hero ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Search Engine Optimization</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">Get Found On Google</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Beautiful websites don’t win alone. We combine technical fixes, high‑signal content, and local authority to grow traffic, rankings, and leads.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Free SEO Strategy Call</Link>
              <Link href="/portfolio" className="rounded-xl border border-indigo-600/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400">See Results</Link>
            </div>
          </motion.div>

          {/* ===== What We Do ===== */}
          <section className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">What We Do</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A comprehensive SEO program built for 2025: technical excellence, topical authority, and measurable outcomes.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {seoServices.map((service, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc pl-5">
                    {service.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ===== Technical Excellence ===== */}
          <section className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">Technical SEO That Scales</h2>
                <p className="text-gray-400 max-w-2xl">We fix crawl and index issues, reduce JavaScript bottlenecks, and improve page experience so every change compounds your rankings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {technical.map((t, i) => (
                    <div key={i} className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
                      <div className="flex items-center gap-3 mb-2">{t.icon}<span className="font-semibold">{t.title}</span></div>
                      <p className="text-gray-400 text-sm">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[#0b0b0b] p-8 ring-1 ring-indigo-500/20">
                <h3 className="text-xl font-semibold">Key KPIs We Improve</h3>
                <p className="text-gray-400 text-sm mt-2">We track the metrics Google and your CFO care about.</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {kpis.map((k, i) => (
                    <div key={i} className="rounded-2xl bg-black/40 p-4 text-center ring-1 ring-indigo-500/10">
                      <div className="text-indigo-300 text-sm">{k.label}</div>
                      <div className="text-2xl font-bold mt-1">{k.value}</div>
                    </div>
                  ))}
                </div>
                <ul className="text-gray-400 text-xs mt-6 space-y-2 list-disc pl-5">
                  <li>Event tracking for leads, calls, forms, and revenue.</li>
                  <li>Content cannibalization and internal‑link audits quarterly.</li>
                  <li>Monthly roadmap with prioritized wins.</li>
                </ul>
              </div>
            </div>
          </section>



          {/* ===== Process ===== */}
          <section className="py-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Our 4‑Phase SEO Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {["Audit & Strategy","Fix & Foundations","Publish & Promote","Measure & Iterate"].map((p, i) => (
                <div key={i} className="bg-[#0b0b0b] p-6 rounded-3xl ring-1 ring-indigo-500/20">
                  <div className="flex items-center gap-2 text-indigo-300"><FiCheckCircle /> <span className="font-semibold">{p}</span></div>
                  <ul className="text-gray-400 text-sm mt-3 space-y-2 list-disc pl-5">
                    {i===0 && (<>
                      <li>Keyword/entity research & opportunity sizing</li>
                      <li>GSC/GA4 audit, crawl & index review</li>
                      <li>Roadmap with prioritized wins</li>
                    </>)}
                    {i===1 && (<>
                      <li>Core Web Vitals & technical fixes</li>
                      <li>On‑page rewrites, schema, internal links</li>
                      <li>GBP & citations for local</li>
                    </>)}
                    {i===2 && (<>
                      <li>Pillar/cluster content & backlinks outreach</li>
                      <li>Location pages & social proof</li>
                      <li>Snippet/AI overview optimization</li>
                    </>)}
                    {i===3 && (<>
                      <li>Dashboard & experiment tracking</li>
                      <li>A/B tests on copy and UX</li>
                      <li>Quarterly strategy refresh</li>
                    </>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ===== FAQs (also mapped to FAQPage schema) ===== */}
          <section className="py-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">SEO FAQs</h2>
            <div className="mx-auto max-w-3xl divide-y divide-indigo-500/20 rounded-3xl bg-[#0b0b0b] ring-1 ring-indigo-500/20">
              {faqs.map(({ q, a }, i) => (
                <details key={i} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-left">
                    <span className="font-semibold">{q}</span>
                    <span className="text-indigo-400 transition group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-3 text-gray-400 text-sm leading-6">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ===== CTA ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to Climb the Ranks?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let’s build a custom SEO plan that targets your market and moves the metrics that matter.</p>
            <div className="mt-8">
              <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">Explore Our SEO Plans</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
