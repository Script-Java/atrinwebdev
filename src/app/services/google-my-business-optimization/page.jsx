// src/app/components/gmb-optimization-client.jsx

"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiStar,
  FiMessageSquare,
  FiCamera,
  FiTrendingUp,
  FiCheckCircle,
  FiTarget,
  FiShield,
  FiClock,
  FiTag,
  FiLink,
} from "react-icons/fi";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function GmbOptimizationClient() {
  // ===== Page Data =====
  const gmbServices = [
    {
      icon: <FiMapPin size={24} />,
      title: "Complete Profile Optimization",
      description:
        "We optimize every section of your Google Business Profile (GBP)—from categories and services to photos and attributes—for maximum local visibility.",
      bullets: [
        "Primary + secondary categories research",
        "Service areas & keywords mapped to intent",
        "Attributes (women‑led, accessibility, payments)",
        "NAP audit (name, address, phone) & consistency",
      ],
    },
    {
      icon: <FiStar size={24} />,
      title: "Review Growth & Response",
      description:
        "Build trust and rankings with a system that earns steady, authentic reviews and responds to every one professionally.",
      bullets: [
        "SMS/email review flows with smart timing",
        "Printed QR cards + short links",
        "On‑brand response library (positive/neutral/negative)",
        "Service/keyword seeding in responses (naturally)",
      ],
    },
    {
      icon: <FiMessageSquare size={24} />,
      title: "Posts, Offers & Q&A Management",
      description:
        "Keep your profile active. We plan and publish weekly posts, highlight offers, and manage Q&A to boost engagement signals.",
      bullets: [
        "Editorial calendar (Events, Offers, What’s New)",
        "Local justifications: ‘Their website mentions…’",
        "Pre‑seeded Q&A with top intent queries",
        "UTM‑tagged links to track ROI in analytics",
      ],
    },
    {
      icon: <FiCamera size={24} />,
      title: "Photos & Video Program",
      description:
        "High‑quality visuals that show real experience. We curate and upload a steady stream of photos and short videos.",
      bullets: [
        "Shot list by service & season",
        "Before/after, team, exterior/interior, process",
        "Short vertical clips for highlights",
        "EXIF titles & captions aligned to services",
      ],
    },
  ];

  const advanced = [
    {
      icon: <FiTarget />, label: "Category mapping by keyword clusters",
    },
    { icon: <FiTag />, label: "Service menus with pricing ranges" },
    { icon: <FiLink />, label: "Local citations & website NAP sync" },
    { icon: <FiShield />, label: "Spam fighting: suggest edits/reporting" },
    { icon: <FiClock />, label: "Holiday hours & temporary closures" },
    { icon: <FiTrendingUp />, label: "Conversion tracking with UTMs" },
  ];

  const benefits = [
    {
      title: "Dominate the Map Pack",
      description:
        "A fully optimized GBP is the #1 lever for ranking in the top 3 local results—where the highest‑intent clicks happen.",
    },
    {
      title: "Attract More Local Customers",
      description:
        "Accurate info, strong visuals, and compelling offers turn local searches into calls, directions, and bookings.",
    },
    {
      title: "Build Trust & Credibility",
      description:
        "Consistent reviews and professional responses signal reliability to both customers and Google.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Audit & Benchmark",
      copy:
        "Full GBP and citation audit: categories, services, NAP, reviews, photos, competitor gap analysis, and baseline rankings.",
      bullets: [
        "GBP crawl + screenshots",
        "Top 5 competitor comparison",
        "Map Pack visibility baseline",
        "Data cleanliness & duplicates check",
      ],
    },
    {
      step: "2",
      title: "Fix & Optimize",
      copy:
        "Implement category strategy, services, attributes, hours, and UTM‑tagged links. Clean NAP inconsistencies and remove duplicates.",
      bullets: [
        "Primary/secondary category updates",
        "Service menus with keyword‑rich descriptions",
        "NAP sync across major directories",
        "Profile completeness to 100%",
      ],
    },
    {
      step: "3",
      title: "Publish & Engage",
      copy:
        "Weekly posts, offer extensions, Q&A seeding, and photo/video cadence. Respond to every review with on‑brand voice.",
      bullets: [
        "4+ posts per month",
        "Offers with start/end dates",
        "Photo/video upload schedule",
        "Review response SLA",
      ],
    },
    {
      step: "4",
      title: "Measure & Grow",
      copy:
        "Monthly reporting ties GBP Insights to conversions. Iterate on categories, services, and content based on results.",
      bullets: [
        "Calls, messages, direction requests",
        "Profile views & discovery vs. direct",
        "Top performing photos/posts",
        "Next‑month test plan",
      ],
    },
  ];

  const faqs = [
    {
      q: "How fast can we see results?",
      a: "Most businesses see improved visibility within 30–60 days for secondary terms. Competitive primary terms can take 2–4+ months as reviews and engagement grow.",
    },
    {
      q: "Do you handle duplicate or spam listings?",
      a: "Yes. We identify duplicates, submit merges/removals, and actively report local spam that suppresses your visibility.",
    },
    {
      q: "What do you track each month?",
      a: "Calls, messages, direction requests, website clicks (with UTM), post views/CTR, photo views, and rankings by ZIP/service.",
    },
    {
      q: "Is GBP enough for Local SEO?",
      a: "It’s the core. We also recommend on‑page local signals (service pages, schema, internal links) and citation consistency for best results.",
    },
  ];

  // ===== JSON‑LD (schema) =====
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'atrinwebdev',
    url: 'https://www.atrinwebdev.com',
    image: 'https://www.atrinwebdev.com/og-image.jpg',
    telephone: '+1-555-555-5555',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Sample St',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      postalCode: '92101',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'United States',
    },
    sameAs: [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://www.linkedin.com/'
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '17:00' }
    ]
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Google Business Profile Optimization',
    provider: { '@type': 'LocalBusiness', name: 'atrinwebdev' },
    areaServed: { '@type': 'AdministrativeArea', name: 'United States' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      description: 'Monthly GBP management: posts, reviews, photos, reporting',
      availability: 'https://schema.org/InStock'
    }
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };

  return (
    <>
      {/* Structured data */}
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
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Local SEO Services</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
              Google Business Profile Optimization
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Turn local searches into customers. We optimize your GBP to win the Map Pack with real‑world signals and measurable ROI.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/pricing" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">View Plans</Link>
              <Link href="/contact" className="rounded-xl border border-indigo-600/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400">Book a Free Audit</Link>
            </div>
          </motion.div>

          {/* ===== Services ===== */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">Our GBP Management Services</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Everything you need to rank, convert, and grow—from category strategy to weekly content and review systems.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {gmbServices.map((service, index) => (
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

            {/* Advanced cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              {advanced.map((a, i) => (
                <div key={i} className="rounded-2xl bg-[#0b0b0b] p-4 ring-1 ring-indigo-500/20 flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-indigo-400">{a.icon}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== Process ===== */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">How We Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {process.map((p, i) => (
                <article key={i} className="bg-[#0b0b0b] p-6 rounded-3xl ring-1 ring-indigo-500/20">
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-300 text-sm font-semibold">Step {p.step}</span>
                    <FiCheckCircle className="text-indigo-400" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{p.copy}</p>
                  <ul className="text-gray-400 text-sm mt-3 space-y-2 list-disc pl-5">
                    {p.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ===== Benefits ===== */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">Why GBP Is Your Most Powerful Local Tool</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">For local businesses, an active, accurate profile is essential—more calls, more directions, more revenue.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-400">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== Sample Metrics ===== */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{k:"Calls",v:"+38%"},{k:"Direction Requests",v:"+52%"},{k:"Profile Views",v:"+41%"}].map((m,i)=> (
                <div key={i} className="rounded-3xl bg-[#0b0b0b] p-8 ring-1 ring-indigo-500/20 text-center">
                  <div className="text-4xl font-extrabold text-indigo-300">{m.v}</div>
                  <div className="mt-1 text-sm text-gray-400">{m.k} after 90 days*</div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3">*Illustrative; results vary by category, proximity, and competition.</p>
          </section>

          {/* ===== FAQs ===== */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Google Business Profile FAQs</h2>
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
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to Own Your Local Market?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">We’ll build a GBP strategy that puts you on the map and ties every action to measurable outcomes.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">Get My Free Audit</Link>
              <Link href="/pricing" className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase">See Plans</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
