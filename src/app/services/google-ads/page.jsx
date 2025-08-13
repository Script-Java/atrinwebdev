"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Icons
import {
  FiTarget,
  FiPenTool,
  FiBarChart2,
  FiZap,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiList,
  FiUsers,
  FiFilter,
  FiPieChart,
  FiMonitor,
  FiSettings,
  FiShield,
} from "react-icons/fi";

export default function GoogleAds() {
  const adServices = [
    {
      icon: <FiTarget size={24} />,
      title: "Campaign Strategy & Setup",
      description:
        "Custom strategy mapped to goals, audience, and budget. We architect your account for scalable, measurable growth.",
      bullets: [
        "Keyword + intent research (core, long‑tail, negatives)",
        "Account structure: SKAG/Theme groups, match types, naming",
        "Geo + device + schedule strategy",
        "Conversion tracking plan (GAds + GA4 + server‑side)"
      ],
    },
    {
      icon: <FiPenTool size={24} />,
      title: "High‑Converting Creatives",
      description:
        "Compelling search ads, RSAs, and assets that improve CTR and Quality Score while respecting brand voice.",
      bullets: [
        "Responsive Search Ads with asset pinning strategy",
        "Ad extensions: sitelinks, callouts, structured snippets, calls",
        "A/B testing headlines & CTAs (stat‑sig thresholds)",
        "Policy‑safe copy for sensitive industries"
      ],
    },
    {
      icon: <FiBarChart2 size={24} />,
      title: "Optimization & Bidding",
      description:
        "Weekly optimization cycles that compound performance without overspending.",
      bullets: [
        "Query mining + negatives (n‑gram analysis)",
        "Bid strategies: Max Conv/ROAS with guardrails",
        "Budget reallocation by marginal CPA/ROAS",
        "Landing page CRO recommendations"
      ],
    },
    {
      icon: <FiZap size={24} />,
      title: "Landing Page Alignment",
      description:
        "Fast, message‑matched pages for higher Quality Score and conversion rate.",
      bullets: [
        "Message match: keyword → ad → headline",
        "Page speed / CWV review (LCP, INP, CLS)",
        "Form UX + trust signals + social proof",
        "Event tracking (buttons, forms, calls)"
      ],
    },
  ];

  const benefits = [
    { title: "Immediate Visibility", description: "Appear at the top of Google for high‑intent queries within hours." },
    { title: "Precision Targeting", description: "Layer keywords with geo, device, schedule, and audience signals." },
    { title: "Measurable ROI", description: "Every click and conversion is tracked to revenue‑centric KPIs." },
  ];

  const process = [
    {
      icon: <FiList className="text-indigo-400" size={22} />,
      step: "01",
      title: "Audit & Forecast",
      text: "We audit your account or market, estimate CPC/CPA, and build a realistic ramp plan.",
      deliverables: ["Baseline KPI model", "Gap analysis", "Roadmap"],
    },
    {
      icon: <FiSettings className="text-indigo-400" size={22} />,
      step: "02",
      title: "Build & Track",
      text: "We implement structure, assets, negatives, and robust conversion tracking (web + calls).",
      deliverables: ["Account build", "Tracking spec", "QA checklist"],
    },
    {
      icon: <FiTrendingUp className="text-indigo-400" size={22} />,
      step: "03",
      title: "Optimize & Scale",
      text: "Weekly sprints: query mining, bid tuning, budget shifts, and ad tests to hit CPA/ROAS targets.",
      deliverables: ["Optimization log", "Test plan", "Budget allocations"],
    },
    {
      icon: <FiPieChart className="text-indigo-400" size={22} />,
      step: "04",
      title: "Report & Learn",
      text: "Transparent reports with insights, not just numbers—what moved KPI’s and why.",
      deliverables: ["Dashboard", "Monthly review", "Next‑month actions"],
    },
  ];

  const adTypes = [
    { icon: <FiMonitor size={22} />, title: "Search", desc: "High‑intent keywords with RSAs and extensions." },
    { icon: <FiFilter size={22} />, title: "Performance Max", desc: "Inventory‑wide reach with asset groups + audience signals." },
    { icon: <FiUsers size={22} />, title: "Remarketing", desc: "Lists + customer match to re‑engage non‑converters." },
    { icon: <FiShield size={22} />, title: "Brand Protection", desc: "Bid on brand + conquest with tight negatives." },
  ];

  const faqs = [
    {
      q: "How fast will we see results?",
      a: "Search campaigns typically generate clicks day one. For stable CPA/ROAS, expect 2–4 weeks of learning and 6–8 weeks to hit target efficiency (industry dependent).",
    },
    {
      q: "What budget do we need?",
      a: "We size budget from CPC × required clicks to reach statistical significance. Many local campaigns start effectively at $1.5k–$3k/mo in ad spend.",
    },
    {
      q: "Do you handle tracking?",
      a: "Yes. We configure Google Ads conversions, GA4 events, call tracking, and optional server‑side tagging for more accurate attribution.",
    },
    {
      q: "How do you report?",
      a: "A live dashboard + monthly executive summary covering spend, CPL/CPA, ROAS, wins, losses, and next‑month actions.",
    },
  ];

  const kpis = [
    { label: "Lower CPA", value: "-25–40%", icon: <FiDollarSign size={18} /> },
    { label: "Higher CTR", value: "+20–35%", icon: <FiTrendingUp size={18} /> },
    { label: "Conversion Lift", value: "+15–50%", icon: <FiCheckCircle size={18} /> },
    { label: "Speed to Learn", value: "2–4 wks", icon: <FiClock size={18} /> },
  ];

  return (
    <>
      <Navbar />
      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Google Ads Management</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">Instant Traffic, Measurable Results</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Need leads now? We build and optimize revenue‑first campaigns that drive qualified traffic and prove ROI.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
              >
                Get a Free PPC Audit
              </Link>
              <Link href="#pricing" className="rounded-md border border-indigo-500/40 px-8 py-4 text-sm font-semibold text-indigo-300 hover:bg-indigo-900/20 uppercase">
                View Plans
              </Link>
            </div>
          </motion.div>

          {/* What we do */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">How We Drive Results</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Your budget goes where it wins. Every decision is tied to CPA/ROAS.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {adServices.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <ul className="text-gray-400 text-sm space-y-2 text-left">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <FiCheckCircle className="mt-1 text-indigo-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* KPI snapshot */}
          <div className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
                  <div className="flex items-center gap-2 text-indigo-300">{k.icon}<span className="text-sm">{k.label}</span></div>
                  <div className="mt-2 text-2xl font-semibold">{k.value}</div>
                </div>
              ))}
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
              <h2 className="text-3xl md:text-4xl font-semibold">Our Optimization Process</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Predictable execution in weekly sprints, documented and reported.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-wider text-indigo-300">{p.step}</span>
                    {p.icon}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-gray-400 text-sm">{p.text}</p>
                  <ul className="mt-4 text-gray-400 text-sm space-y-2">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <FiCheckCircle className="mt-1 text-indigo-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ad types & extensions */}
          <div className="py-14">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 to-indigo-900/10 p-10 ring-1 ring-indigo-500/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl font-semibold">Channels, Campaigns & Extensions</h3>
                  <p className="text-gray-400 mt-2">We select the right mix for your funnel stage and CAC targets, then layer assets that raise CTR and Quality Score.</p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {adTypes.map((t) => (
                      <li key={t.title} className="flex gap-3 items-start">
                        <div className="mt-1 text-indigo-400">{t.icon}</div>
                        <div>
                          <div className="font-semibold">{t.title}</div>
                          <div className="text-gray-400 text-sm">{t.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0b0b0b] rounded-2xl p-6 ring-1 ring-indigo-500/20">
                  <h4 className="font-semibold">Included With Management</h4>
                  <ul className="mt-4 text-gray-300 text-sm space-y-2">
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> UTM governance + GA4 event schema</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Call tracking setup (numbers, recordings, goals)</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Negative keyword library + brand safety controls</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Creative testing roadmap (min. 2 tests/mo)</li>
                    <li className="flex gap-2"><FiCheckCircle className="text-indigo-400 mt-0.5"/> Competitor monitoring & auction insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">The Benefits of Google Ads</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">SEO builds durable authority; paid search adds velocity and precision.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-400">{b.title}</h3>
                  <p className="text-gray-300">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold">Frequently Asked Questions</h2>
              <p className="text-gray-400 mt-3">Straight answers about timelines, budgets, and tracking.</p>
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
            className="text-center py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Ready for Immediate Growth?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let’s launch a performance‑driven Google Ads program that pays for itself.</p>
            <div className="mt-8">
              <Link
                href="/pricing"
                className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
              >
                View Our Ad Management Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Schema (Service + FAQPage) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Google Ads Management",
            serviceType: "Pay‑Per‑Click Advertising",
            areaServed: "US",
            provider: { "@type": "Organization", name: "Your Company" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "PPC Management",
              itemListElement: adServices.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.title, description: s.description },
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
