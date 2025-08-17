"use client";

import Link from "next/link";
import Script from "next/script";
import {
  FaLaptopCode,
  FaSearch,
  FaGoogle,
  FaPalette,
  FaCheck,
  FaChartLine,
  FaClock,
  FaShieldAlt,
  FaMobileAlt,
  FaServer,
  FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Assuming you have this component in your project
import ScrollingBar from "./scrollingBar";

export default function Services() {
  const services = [
    {
      key: "web",
      icon: <FaLaptopCode className="text-5xl text-indigo-400 mb-4" />,
      title: "Custom Website Development",
      desc:
        "Bespoke, high‑performance websites engineered to convert. Built on modern stacks, optimized for Core Web Vitals, accessibility, and SEO from day one.",
      bullets: [
        "Strategic UX flows & wireframes",
        "Next.js / WordPress headless options",
        "Schema, on‑page SEO & 301s",
        "WCAG‑aware color/contrast",
      ],
      outcomes: [
        "LCP ≤ 2.5s",
        "INP ≤ 200ms",
        "90+ Lighthouse",
        "ADA‑minded",
      ],
      cta: { href: "/web-design", label: "See Web Projects" },
    },
    {
      key: "seo",
      icon: <FaSearch className="text-5xl text-indigo-400 mb-4" />,
      title: "Local SEO Strategy",
      desc:
        "Own your service area. Technical fixes + content clusters + GBP optimization to boost Map Pack visibility and long‑tail intent.",
      bullets: [
        "Local keyword & topic clusters",
        "Technical SEO audits & fixes",
        "Google Business Profile optimization",
        "Reviews & citations playbook",
      ],
      outcomes: ["Top‑3 Map Pack", "↑ Calls", "↑ Direction taps", "↑ Reviews"],
      cta: { href: "/local-seo", label: "Explore Local SEO" },
    },
    {
      key: "ppc",
      icon: <FaGoogle className="text-5xl text-indigo-400 mb-4" />,
      title: "PPC & Google Ads Management",
      desc:
        "Immediate pipeline lift with tightly‑themed campaigns, negative lists, and relentless A/B testing to maximize ROAS.",
      bullets: [
        "Search, Performance Max, Remarketing",
        "Granular SKAG/SKSA structures",
        "Ad copy & extensions testing",
        "Call tracking & conversion setup",
      ],
      outcomes: ["↓ CPA", "↑ CVR", "↑ Quality Score", "ROAS‑focused"],
      cta: { href: "/google-ads", label: "View Ad Plans" },
    },
    {
      key: "brand",
      icon: <FaPalette className="text-5xl text-indigo-400 mb-4" />,
      title: "Brand & Logo Identity",
      desc:
        "Memorable, scalable identity systems—logo, type, color, and usage—that look sharp everywhere from vans to viewports.",
      bullets: [
        "3–5 custom concepts",
        "Full brand style guide",
        "Social & print asset kit",
        "Usage do’s & don’ts",
      ],
      outcomes: ["↑ Recognition", "↑ Trust", "↑ Consistency", "Ready‑to‑ship"],
      cta: { href: "/logo-design", label: "See Brand Work" },
    },
  ];

  const process = [
    {
      icon: <FaUsers />,
      title: "1) Discover",
      copy:
        "Kickoff workshop, goals, audiences, competitors, and success metrics. We align on scope, sitemap, and KPIs.",
    },
    {
      icon: <FaMobileAlt />,
      title: "2) Design",
      copy:
        "UX flows, wireframes, and high‑fidelity UI. Content guidance, accessibility and SEO baked into every screen.",
    },
    {
      icon: <FaServer />,
      title: "3) Build",
      copy:
        "Modern stack development, QA, analytics & tracking, schema, and performance hardening on staging.",
    },
    {
      icon: <FaChartLine />,
      title: "4) Launch & Grow",
      copy:
        "Go‑live checklist, monitoring, CRO tests, and monthly SEO/PPC iterations to keep compounding results.",
    },
  ];

  const assurances = [
    { icon: <FaClock />, label: "Fast Turnarounds" },
    { icon: <FaShieldAlt />, label: "Secure & Backed Up" },
  ];

  // ——— JSON‑LD: Service catalog + FAQ teasers for richer snippets ———
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Web Design, Local SEO, PPC, Branding",
    areaServed: { "@type": "Place", name: "McKinney, Frisco & North Dallas" },
    provider: {
      "@type": "Organization",
      name: "atrinwebdev",
      url: "https://www.atrinwebdev.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Growth Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
          areaServed: "United States",
        },
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does a typical website take?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Most small business sites launch in 4–6 weeks depending on scope and content readiness. Larger builds may require phased releases.",
        },
      },
      {
        "@type": "Question",
        name: "Do you guarantee Core Web Vitals?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We engineer for LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 on production. Actual results vary by hosting, media weight, ads, and user device.",
        },
      },
    ],
  };

  return (
    <section className="bg-black text-white py-20" id="solutions">
      {/* Structured Data */}
      <Script id="services-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="faq-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <div className="max-w-screen-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">
            Our Solutions
          </h2>
          <h2 className="mt-2 text-4xl md:text-6xl font-bold uppercase mb-6 tracking-wider">
            Services Built for Local Growth
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl uppercase text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          From stunning web design to targeted SEO, we equip McKinney & North Dallas
          businesses to stand out, get found, and convert.
        </motion.p>

        <div className="mb-12">
          <ScrollingBar />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#0b0b0b] border-t border-indigo-500/50 p-8 hover:border-indigo-500 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 rounded-2xl"
            >
              <div>{service.icon}</div>
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-4">
                {service.title}
              </h2>
              <p className="text-gray-300 mb-6">{service.desc}</p>

              {/* Benefits bullets */}
              <div className="flex flex-wrap gap-3 mb-6">
                {service.bullets.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 border border-indigo-500/40 text-indigo-300 text-sm px-3 py-1.5 rounded-md uppercase tracking-wide"
                  >
                    <FaCheck className="text-xs text-indigo-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Outcomes chips */}
              <div className="flex flex-wrap gap-2">
                {service.outcomes.map((o, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-900/30 text-indigo-200 border border-indigo-500/20 px-2.5 py-1 rounded-full"
                  >
                    {o}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  href={service.cta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  {service.cta.label} <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Process */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-center mb-10"
          >
            A Simple, Predictable Process
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0b0b0b] p-6 rounded-2xl ring-1 ring-indigo-500/20"
              >
                <div className="flex items-center gap-3 text-indigo-300">
                  <span className="text-lg">{step.icon}</span>
                  <span className="text-sm font-semibold">{step.title}</span>
                </div>
                <p className="text-gray-400 text-sm mt-3">{step.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What You Get / Assurances */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#0b0b0b] p-8 rounded-2xl ring-1 ring-indigo-500/20">
            <h4 className="text-xl font-semibold mb-3">What You Get</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <li className="bg-black/40 rounded-xl p-3">Kickoff strategy workshop</li>
              <li className="bg-black/40 rounded-xl p-3">Sitemap, wireframes & UI kit</li>
              <li className="bg-black/40 rounded-xl p-3">Copy & SEO guidance</li>
              <li className="bg-black/40 rounded-xl p-3">Analytics & conversion tracking</li>
              <li className="bg-black/40 rounded-xl p-3">Schema & redirects (SEO‑safe)</li>
              <li className="bg-black/40 rounded-xl p-3">Speed, security & backups</li>
              <li className="bg-black/40 rounded-xl p-3">Post‑launch support & training</li>
              <li className="bg-black/40 rounded-xl p-3">Monthly growth reporting (plans)</li>
            </ul>
          </div>
          <div className="bg-[#0b0b0b] p-8 rounded-2xl ring-1 ring-indigo-500/20">
            <h4 className="text-xl font-semibold mb-3">Assurances</h4>
            <div className="flex flex-wrap gap-2">
              {assurances.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-200 border border-indigo-500/20 px-3 py-1.5 rounded-full text-xs"
                >
                  {a.icon}
                  {a.label}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              We ship with a documented checklist, rollback plan, and monitoring so launch days feel boring—in a good way.
            </p>
          </div>
        </div>

        {/* CTA Ribbon */}
        <div className="mt-20 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-transparent p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Ready to turn searches into customers?
          </h3>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Pick a plan or book a quick call—we’ll map out impact, timing, and the fastest path to ROI.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-indigo-500/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
