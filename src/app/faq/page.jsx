"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { RiArrowDownSLine, RiSearchLine, RiChat3Line, RiMailSendLine, RiQuestionLine } from "react-icons/ri";

export default function FaqPage() {
  // UI state
  const [openIndex, setOpenIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  // Master FAQ data (add/modify freely)
  const faqs = [
    // — Website
    {
      category: "Website",
      question: "What services do you offer for businesses in the McKinney area?",
      answer:
        "We design custom websites, implement local SEO, and manage Google Ads for businesses in McKinney, Frisco, Allen, Prosper, and greater North Dallas. The goal: a fast, secure site that ranks locally and converts visitors into customers.",
      bullets: [
        "Custom WordPress or headless builds",
        "Local SEO (on‑page + map pack)",
        "Conversion‑focused design & copy",
        "Analytics & call tracking setup",
      ],
    },
    {
      category: "Website",
      question: "What is your process and how long does a typical project take?",
      answer:
        "Most standard sites launch in 4–6 weeks. Timelines vary with complexity and content readiness. Our four‑phase process keeps things moving without surprises.",
      bullets: ["Discovery → brief & sitemap", "Design → hi‑fidelity mockups", "Development → CMS build", "QA, launch & training"],
    },
    {
      category: "Website",
      question: "Will I be able to update the website myself?",
      answer:
        "Yes. We build on user‑friendly CMS platforms and include a handoff call plus short loom videos. You can edit pages, publish blog posts, and update images without code.",
      bullets: ["WordPress block editor", "Role‑based access", "1:1 training included", "Optional ongoing support"],
    },

    // — SEO
    {
      category: "SEO",
      question: "Why choose a local developer over a national agency?",
      answer:
        "Local context matters. We know DFW search behavior, competitors, and neighborhoods. You get direct access to the people doing the work, faster iterations, and strategies tuned to your service areas.",
      bullets: ["Hyper‑local keyword research", "Google Business Profile optimization", "Local citations & reviews", "Faster, personal support"],
    },
    {
      category: "SEO",
      question: "How much does a new website cost?",
      answer:
        "We offer flexible monthly plans. Our entry ‘Local Visibility’ plan waives a large upfront fee in exchange for a 12‑month partnership. Higher‑tier plans add SEO, content, and conversion optimization.",
      bullets: ["Transparent monthly pricing", "No surprise add‑ons", "Tiered packages for growth", "See all options on Pricing"],
      cta: { label: "View Pricing", href: "/pricing" },
    },
    {
      category: "SEO",
      question: "What happens after my website is launched?",
      answer:
        "Launch is the start of growth. We handle hosting, maintenance, backups, security, and performance. Growth plans add content, link earning, and ongoing technical SEO.",
      bullets: ["Managed hosting & updates", "Security monitoring", "Performance tuning (CWV)", "Monthly reporting"],
    },
    {
      category: "SEO",
      question: "Do I need to sign a long‑term contract?",
      answer:
        "Entry plan: 12‑month term (covers build cost). Growth & Scale plans: month‑to‑month or 12‑month with onboarding discounted.",
      bullets: ["12‑month option waives build fee", "Monthly flexibility available", "Upgrade/downgrade anytime at renewal"],
    },

    // — Google Ads
    {
      category: "Google Ads",
      question: "How do your Google Ads engagements work?",
      answer:
        "We handle strategy, conversion tracking, creative, and weekly optimizations. Expect transparent reporting on CPA, ROAS, and call quality.",
      bullets: ["Keyword & location strategy", "High‑intent ad copy & extensions", "Landing page alignment", "Weekly optimizations"],
      cta: { label: "Ad Management Plans", href: "/pricing" },
    },
    {
      category: "Google Ads",
      question: "Do you build landing pages for Ads campaigns?",
      answer:
        "Yes. High‑converting pages are essential. We create or refine landing pages to match search intent and reduce cost‑per‑lead.",
      bullets: ["Message‑match to keyword", "Speed & mobile UX first", "Trust elements & social proof", "Analytics & A/B testing"],
    },

    // — Support / Logistics
    {
      category: "Support",
      question: "How do we communicate during the project?",
      answer:
        "You’ll have a dedicated Slack or email thread plus scheduled check‑ins. We share milestones, previews, and decisions in one place.",
      bullets: ["Kickoff & weekly updates", "Private client portal (optional)", "Same‑day responses (business hours)", "Emergency support SLA options"],
    },
    {
      category: "Support",
      question: "What content do you need from us?",
      answer:
        "We’ll give you a simple checklist: logo files, brand guidelines, service descriptions, team photos, testimonials, and any compliance notes.",
      bullets: ["Done‑for‑you copy available", "Photography guidance", "Brand voice workshop (optional)", "CMS content import (if migrating)"],
    },
  ];

  const categories = ["All", "Website", "SEO", "Google Ads", "Support"];

  // Filter + search
  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const inCat = activeCat === "All" || f.category === activeCat;
      if (!q) return inCat;
      return (
        inCat &&
        (f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          (f.bullets || []).some((b) => b.toLowerCase().includes(q)))
      );
    });
  }, [faqs, query, activeCat]);

  // Toggle one open at a time
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  // Build FAQ schema (all Q&A, regardless of filter)
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      {/* Schema for rich understanding (visibility in SERPs may vary) */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Navbar />

      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-14"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Frequently Asked Questions</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">Your Questions, Answered</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Clear, practical answers about web design, SEO, and paid search for North Texas businesses.
            </p>

            {/* Search + category filters */}
            <div className="mt-8 max-w-3xl mx-auto space-y-4">
              <div className="relative">
                <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search FAQs (e.g. “hosting”, “timeline”, “Google Ads”)"
                  className="w-full rounded-2xl bg-[#0b0b0b] border border-indigo-500/30 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                      activeCat === c
                        ? "bg-indigo-600 text-white"
                        : "bg-[#0b0b0b] text-indigo-200 ring-1 ring-indigo-500/30 hover:ring-indigo-500"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick help cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
              <div className="flex items-center gap-3 text-indigo-300">
                <RiQuestionLine /> <span className="font-semibold">Can’t find your answer?</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Ask us directly—most replies within one business day.</p>
              <div className="mt-4 flex gap-3">
                <Link href="/contact" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">Contact form →</Link>
                <a href="mailto:hello@atrinwebdev.com" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">Email us →</a>
              </div>
            </div>
            <div className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
              <div className="flex items-center gap-3 text-indigo-300">
                <RiMailSendLine /> <span className="font-semibold">Project checklist</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">What we need from you to start quickly and launch smoothly.</p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">Request checklist →</Link>
            </div>
            <div className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
              <div className="flex items-center gap-3 text-indigo-300">
                <RiChat3Line /> <span className="font-semibold">Free website review</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Get a brief loom walkthrough of quick wins and priorities.</p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">Book a review →</Link>
            </div>
          </section>

          {/* Accordion */}
          <div className="max-w-screen-lg mx-auto space-y-4">
            {filteredFaqs.length === 0 && (
              <div className="text-center text-gray-400 py-12">No results. Try a different keyword or category.</div>
            )}

            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={`${faq.question}-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] rounded-xl ring-1 ring-indigo-500/30"
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <div>
                      <p className="text-xs text-indigo-300 tracking-wider uppercase">{faq.category}</p>
                      <h3 className="mt-1 text-lg font-medium text-white">{faq.question}</h3>
                    </div>
                    <RiArrowDownSLine
                      className={`text-indigo-400 text-2xl transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 -mt-1">
                      <p className="text-sm text-gray-300">{faq.answer}</p>

                      {faq.bullets && faq.bullets.length > 0 && (
                        <ul className="mt-4 text-sm text-gray-400 list-disc pl-5 space-y-1.5">
                          {faq.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}

                      {/* Optional inline CTA */}
                      {faq.cta && (
                        <div className="mt-4">
                          <Link
                            href={faq.cta.href}
                            className="inline-block rounded-lg border border-indigo-500/40 px-4 py-2 text-xs font-semibold text-indigo-200 hover:border-indigo-400"
                          >
                            {faq.cta.label}
                          </Link>
                        </div>
                      )}

                      {/* Lightweight “helpful” UI */}
                      <div className="mt-6 flex items-center gap-3 text-xs text-gray-400">
                        <span>Was this helpful?</span>
                        <button className="rounded-full px-3 py-1 bg-black/40 hover:bg-black/60">Yes</button>
                        <button className="rounded-full px-3 py-1 bg-black/40 hover:bg-black/60">No</button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center py-20 mt-10"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Still have questions?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
              We’re happy to help. Share your goals and we’ll reply with plain‑English recommendations.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase"
              >
                See Plans
              </Link>
            </div>
            <p className="mt-6 text-xs text-gray-500">Business hours: Mon–Fri, 9am–5pm CT</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
