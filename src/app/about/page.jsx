"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Icons
import {
  FiZap,
  FiHeart,
  FiEye,
  FiMapPin,
  FiCheckCircle,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiBriefcase,
  FiClock,
  FiStar,
} from "react-icons/fi";

// Profile / brand image (replace path if needed)
import profileImage from "../assets/logo/logo-white.png";

export default function AboutPage() {
  const values = [
    {
      icon: <FiHeart size={24} />,
      title: "Client Partnership",
      description:
        "We're not a vendor; we're a growth partner. Clear goals, shared dashboards, and transparent priorities.",
    },
    {
      icon: <FiZap size={24} />,
      title: "Innovation & Quality",
      description:
        "Modern stacks, fast performance, and secure builds. We ship with accessibility and Core Web Vitals in mind.",
    },
    {
      icon: <FiEye size={24} />,
      title: "Transparency & Honesty",
      description:
        "No jargon or hidden fees—just honest advice, straight estimates, and proactive communication.",
    },
  ];

  const pillars = [
    {
      icon: <FiTrendingUp className="text-indigo-400" size={20} />,
      title: "Results, not fluff",
      text: "We measure success by leads and revenue, not page views alone.",
    },
    {
      icon: <FiShield className="text-indigo-400" size={20} />,
      title: "Built‑in trust",
      text: "E‑E‑A‑T signals (bios, sources, policies) and security best practices baked in.",
    },
    {
      icon: <FiUsers className="text-indigo-400" size={20} />,
      title: "Human‑centered UX",
      text: "Accessible, mobile‑first experiences that convert without friction.",
    },
  ];

  const stats = [
    { k: "+125%", l: "Avg. organic traffic lift", icon: <FiTrendingUp size={18} /> },
    { k: "<2.5s", l: "Typical LCP after launch", icon: <FiZap size={18} /> },
    { k: "95%", l: "Client retention (12 mo)", icon: <FiHeart size={18} /> },
    { k: "A+", l: "Accessibility audits", icon: <FiCheckCircle size={18} /> },
  ];

  const timeline = [
    { year: "2022", title: "Founded in McKinney", text: "Started with a mission to serve North Texas SMBs with enterprise‑grade web & SEO." },
    { year: "2023", title: "First 50 launches", text: "Scaled dev & SEO processes; formalized content + local SEO playbooks." },
    { year: "2024", title: "Brand & PPC expansion", text: "Added identity systems and PPC to accelerate demand for clients." },
  ];

  const serviceAreas = [
    "McKinney",
    "Frisco",
    "Allen",
    "Plano",
    "Prosper",
    "Dallas–Fort Worth",
  ];

  const faqs = [
    {
      q: "What industries do you specialize in?",
      a: "Home services, professional services, healthcare, fitness, hospitality, and local retail. We tailor the strategy to each market.",
    },
    {
      q: "How do you scope projects?",
      a: "We run a discovery to define goals, audience, and requirements. You'll get a fixed‑scope proposal, timeline, and milestone plan.",
    },
    {
      q: "Do you provide ongoing support?",
      a: "Yes—flexible care plans for updates, hosting, SEO, content, and PPC. Month‑to‑month with clear deliverables.",
    },
  ];

  // ===== Structured Data (Organization + LocalBusiness + Breadcrumbs) =====
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "atrinwebdev",
    url: "https://www.atrinwebdev.com",
    logo: "https://www.atrinwebdev.com/logo.png",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
    ],
  };

  const localLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "atrinwebdev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "McKinney",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: serviceAreas,
    url: "https://www.atrinwebdev.com",
    image: "https://www.atrinwebdev.com/og-image.jpg",
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.atrinwebdev.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.atrinwebdev.com/about",
      },
    ],
  };

  return (
    <>
      <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(orgLd)}</Script>
      <Script id="local-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(localLd)}</Script>
      <Script id="breadcrumbs-ld" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(breadcrumbsLd)}</Script>

      <Navbar />

      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-14"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Story</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
              Your Local Partner in Digital Growth
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              We’re a McKinney‑based web & SEO studio helping North Texas businesses win online.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Talk to Us</Link>
              <Link href="/portfolio" className="rounded-xl border border-indigo-600/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400">See Work</Link>
            </div>
          </motion.div>

          {/* Mission + Image */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden ring-1 ring-indigo-500/20">
                <Image src={profileImage} alt="Atrina Web Development" fill className="object-contain bg-black" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">From Local Vision to Digital Reality</h2>
              <p className="text-gray-300 mb-4">
                We started with a simple mission: give North Texas SMBs enterprise‑level websites and SEO—without agency bloat.
              </p>
              <p className="text-gray-400">
                By pairing local market knowledge with modern stacks (Next.js, Tailwind) and search expertise, we build fast, secure sites that rank—and convert.
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><FiCheckCircle className="text-indigo-400"/> Core Web Vitals first</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-indigo-400"/> SEO built in, not bolted on</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-indigo-400"/> Accessibility by default</li>
                <li className="flex items-center gap-2"><FiCheckCircle className="text-indigo-400"/> Local service area expertise</li>
              </ul>
            </motion.div>
          </div>

          {/* Pillars */}
          <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <div key={i} className="bg-[#0b0b0b] p-6 rounded-3xl ring-1 ring-indigo-500/20">
                  <div className="flex items-center gap-3">{p.icon}<span className="font-semibold">{p.title}</span></div>
                  <p className="text-gray-400 text-sm mt-2">{p.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20">
                  <div className="flex items-center gap-2 text-indigo-300">{s.icon}<span className="text-sm">{s.l}</span></div>
                  <div className="mt-1 text-2xl font-bold">{s.k}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">*Illustrative ranges based on recent projects; actual results vary by category and starting point.</p>
          </section>

          {/* Process */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">How We Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Discover","Design & Build","Launch & Grow"].map((step, i) => (
                <div key={i} className="bg-[#0b0b0b] p-6 rounded-3xl ring-1 ring-indigo-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-wider text-indigo-300">0{i+1}</span>
                    {i===0 && <FiBriefcase className="text-indigo-400"/>}
                    {i===1 && <FiClock className="text-indigo-400"/>}
                    {i===2 && <FiTrendingUp className="text-indigo-400"/>}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{step}</h3>
                  <ul className="mt-3 text-gray-400 text-sm space-y-2 list-disc pl-5">
                    {i===0 && (<>
                      <li>Goals, audience, and brand positioning</li>
                      <li>Site map, feature list, success metrics</li>
                      <li>Budget, timeline, and milestones</li>
                    </>)}
                    {i===1 && (<>
                      <li>UX flows, wireframes, and visual design</li>
                      <li>Performance‑first development</li>
                      <li>Content & SEO implementation</li>
                    </>)}
                    {i===2 && (<>
                      <li>Quality assurance & launch checklist</li>
                      <li>Analytics, dashboards & training</li>
                      <li>Ongoing CRO, SEO, and updates</li>
                    </>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Service Areas */}
          <section className="py-10">
            <div className="bg-[#0b0b0b] rounded-3xl p-8 ring-1 ring-indigo-500/20">
              <div className="flex items-center gap-2"><FiMapPin className="text-indigo-400"/><h3 className="text-xl font-semibold">Proudly Serving North Texas</h3></div>
              <p className="text-gray-400 text-sm mt-2">Local expertise matters. We partner with businesses across:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {serviceAreas.map((c) => (
                  <span key={c} className="rounded-full bg-black/40 px-3 py-1 text-xs text-gray-300 ring-1 ring-indigo-500/10">{c}</span>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">FAQs</h2>
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to Partner With Us?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let’s build a digital presence that reflects the quality of your business.</p>
            <div className="mt-8">
              <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
