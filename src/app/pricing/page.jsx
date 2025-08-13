"use client";

import React from 'react';
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Pricing from '../components/pricing';

// Icons
import {
  FiClipboard,
  FiCode,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiBarChart2,
  FiLayers,
  FiSettings,
  FiHeadphones,
  FiBookOpen,
  FiCreditCard,
  FiZap,
} from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";

export default function PricingPage() {
  const processSteps = [
    {
      icon: <FiClipboard size={24} />,
      title: "Onboarding & Discovery",
      description: "Kickoff call + goals, ICP, success metrics. Technical audit and content inventory.",
      bullets: [
        "Project brief & requirements",
        "Site map / feature list",
        "Baseline analytics & CWV snapshot",
      ],
    },
    {
      icon: <FiCode size={24} />,
      title: "Design & Development",
      description: "UX → UI → build. Weekly check‑ins, staging links, and clear milestones.",
      bullets: [
        "Wireframes & content outline",
        "Component‑based build (Next.js + Tailwind)",
        "SEO foundations (meta, schema, IA)",
      ],
    },
    {
      icon: <IoRocketOutline size={24} />,
      title: "Review, QA & Launch",
      description: "You approve, we ship. We monitor post‑launch and polish with a mini‑CRO sprint.",
      bullets: [
        "Pre‑launch checklist & 301s",
        "Analytics/Tags verification",
        "Post‑launch fixes & training",
      ],
    },
  ];

  const whatsIncluded = [
    { icon: <FiShield />, label: "Security‑hardened hosting & SSL" },
    { icon: <FiClock />, label: "2‑day average support SLA" },
    { icon: <FiCheckCircle />, label: "Accessibility & CWV baked in" },
    { icon: <FiTrendingUp />, label: "Search‑ready structure & schema" },
    { icon: <FiBarChart2 />, label: "GA4 + GSC + basic dashboards" },
    { icon: <FiLayers />, label: "Reusable components & design system" },
  ];

  const addOns = [
    { icon: <FiSettings />, title: "Care Plan", desc: "Monthly updates, monitoring, backups, and priority support." },
    { icon: <FiBookOpen />, title: "Content Pack", desc: "SEO pages, blogs, and on‑brand copywriting per sprint." },
    { icon: <FiZap />, title: "PPC Starter", desc: "Search/PMax setup + 30‑day optimization sprint." },
    { icon: <FiTrendingUp />, title: "Local SEO", desc: "GBP optimization, citations, and review engine." },
  ];

  const faqs = [
    {
      q: "Which plan should I choose?",
      a: "Starter is great for simple brochure sites. Growth suits service businesses needing SEO pages and lead gen. Scale fits custom features, integrations, or higher traffic.",
    },
    {
      q: "How are payments handled?",
      a: "We accept major cards and ACH. For projects over a threshold, we can split into milestones (e.g., 40/40/20). Care plans are month‑to‑month.",
    },
    {
      q: "Do you migrate my existing site?",
      a: "Yes. We map URLs, set up 301s, preserve analytics, and minimize downtime.",
    },
    {
      q: "What about content and images?",
      a: "We can write SEO‑friendly copy and source/licence imagery, or collaborate with your team using our content outline templates.",
    },
  ];

  // ===== Schema: OfferCatalog (align with your actual plan names) + FAQPage =====
  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Website & SEO Packages",
    itemListElement: [
      { "@type": "Offer", name: "Starter", description: "Brochure site, basic SEO, fast launch." },
      { "@type": "Offer", name: "Growth", description: "Service pages, conversion tracking, SEO content." },
      { "@type": "Offer", name: "Scale", description: "Custom features, integrations, performance tuning." },
    ],
    provider: { "@type": "Organization", name: "Atrina Web Development", url: "https://www.atrinwebdev.com" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <>
      {/* JSON‑LD */}
      <Script id="offer-catalog-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(offerCatalog)}</Script>
      <Script id="faq-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(faqLd)}</Script>

      <Navbar />
      <div className="bg-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Pricing Table (your existing component) */}
          <div className="pt-16" id="pricing">
            <Pricing />
          </div>

          {/* Guarantees & Inclusions */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">What Every Plan Includes</h2>
              <p className="mt-2 text-3xl md:text-4xl font-semibold">No surprises—just the essentials done right</p>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We ship performance, security, and SEO best practices from day one.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatsIncluded.map((i, idx) => (
                <div key={idx} className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20 flex items-start gap-3">
                  <span className="text-indigo-400 mt-0.5">{i.icon}</span>
                  <span className="text-sm text-gray-300">{i.label}</span>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2"><FiShield className="text-green-300"/> 99.9% Uptime</div>
              <div className="flex items-center gap-2"><FiClock className="text-indigo-300"/> 2‑day avg. support SLA</div>
              <div className="flex items-center gap-2"><FiCreditCard className="text-purple-300"/> Secure payments</div>
            </div>
          </div>

          {/* Add‑ons */}
          <div className="py-14">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 to-indigo-900/10 p-10 ring-1 ring-indigo-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold">Need more firepower?</h3>
                  <p className="text-gray-400 mt-2">Bolt on services as you grow—no replatforming required.</p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addOns.map((a) => (
                      <li key={a.title} className="flex gap-3 items-start">
                        <div className="mt-1 text-indigo-400">{a.icon}</div>
                        <div>
                          <div className="font-semibold">{a.title}</div>
                          <div className="text-gray-400 text-sm">{a.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0b0b0b] rounded-2xl p-6 ring-1 ring-indigo-500/20">
                  <h4 className="font-semibold">Example Bundles</h4>
                  <ul className="mt-4 text-gray-300 text-sm space-y-2">
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Growth + Care Plan → predictable monthly updates</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Scale + PPC Starter → faster pipeline while SEO ramps</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Starter + Local SEO → dominate the Map Pack</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Process</h2>
              <p className="mt-2 text-3xl md:text-4xl font-semibold">What Happens Next?</p>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A smooth journey from payment to launch—no surprises.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  {step.bullets && (
                    <ul className="text-gray-400 text-sm space-y-2 text-left mt-4">
                      {step.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FiCheckCircle className="mt-1 text-indigo-400 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
              <p className="text-gray-400 mt-3">Straight answers about plans, payments, and process.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((f) => (
                <div key={f.q} className="bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-indigo-500/20">
                  <div className="font-semibold">{f.q}</div>
                  <div className="text-gray-300 mt-2 text-sm leading-6">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to get started?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Pick a plan now or book a quick call and we’ll recommend the right fit.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link href="#pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">Choose a Plan</Link>
              <Link href="/contact" className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase">Talk to Sales</Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
