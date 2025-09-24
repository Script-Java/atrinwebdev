"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";

// Make sure the path to your image is correct
import img from "../assets/img/1.jpg";

import {
  FiTarget,
  FiTrendingUp,
  FiMapPin,
  FiShield,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiZap,
  FiHeart,
} from "react-icons/fi";

export default function Mission() {

  const stats = [
    { label: "Avg. Page Speed Gain", value: "↑ 58%", sub: "post‑launch vs. legacy site" },
    { label: "Local Lead Lift", value: "2.4×", sub: "within first 90 days" },
    { label: "Client Retention", value: "96%", sub: "rolling 12‑month" },
    { label: "Projects Delivered", value: "10+", sub: "web & SEO engagements" },
  ];

  // ——— JSON‑LD (helps About pages & local SEO) ———
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "atrinwebdev",
    url: "https://www.atrinwebdev.com",
    logo: "https://www.atrinwebdev.com/logo.png",
    areaServed: [{ "@type": "City", name: "McKinney" }, { "@type": "City", name: "Frisco" }, { "@type": "City", name: "Plano" }, { "@type": "AdministrativeArea", name: "North Dallas" }],
    sameAs: [
      "https://www.linkedin.com/",
      "https://www.instagram.com/",
      "https://x.com/",
    ],
  };

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Mission — atrinwebdev",
    description:
      "Local web development & SEO partner helping McKinney and North Dallas businesses grow with fast, secure sites and measurable marketing.",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://www.atrinwebdev.com/assets/img/1.jpg",
    },
    speaksAbout: [
      "Local SEO",
      "Web performance",
      "Small business growth",
      "E‑commerce",
      "Brand design",
    ],
  };

  return (
    <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden" id="mission">
      {/* Structured data */}
      <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgLd)}
      </Script>
      <Script id="about-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(aboutLd)}
      </Script>

      {/* Glowing arc background with indigo accent */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[180px] z-0" />
      <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border-t border-indigo-500/20 rounded-full z-0" />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-screen-2xl mx-auto text-center px-6 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-semibold uppercase mb-6 leading-tight">
          Your Local Partner in Digital Growth
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Our mission is to empower businesses in McKinney and the North Dallas area with
          fast, secure websites and local SEO that compound into real revenue—backed by
          transparent reporting and continuous optimization.
        </p>

        {/* social proof strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
          <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10">
            <FiShield className="inline -mt-1 mr-1" /> Managed Hosting & Security
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10">
            <FiTrendingUp className="inline -mt-1 mr-1" /> Conversion‑First Design
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10">
            <FiMapPin className="inline -mt-1 mr-1" /> North Dallas Focus
          </span>
        </div>
      </motion.div>

      {/* Story card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative bg-[#0b0b0b] text-white max-w-screen-2xl mx-auto mt-16 shadow-xl px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center z-10 ring-1 ring-indigo-500/20"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl uppercase font-bold">From Local Vision to Digital Reality</h2>
          <p className="text-gray-300">
            We don’t just build websites; we create digital foundations for local success. We
            partner with McKinney‑area businesses to craft online experiences that perform,
            convert, and resonate with your community.
          </p>
          <p className="text-gray-400">
            Whether you're launching your first site or leveling up an established brand, we
            tailor strategy, SEO, and content to your goals—then iterate monthly as the data
            rolls in.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <span className="bg-black border border-indigo-400/50 px-4 py-1.5 text-xs uppercase text-indigo-300">
              Local Web Design
            </span>
            <span className="bg-black border border-indigo-400/50 px-4 py-1.5 text-xs uppercase text-indigo-300">
              McKinney SEO
            </span>
            <span className="bg-black border border-indigo-400/50 px-4 py-1.5 text-xs uppercase text-indigo-300">
              E‑commerce
            </span>
            <Link
              href="/#contact"
              className="bg-indigo-600 text-white px-5 py-2 text-sm font-semibold uppercase hover:bg-indigo-500 transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-md">
            <Image
              src={img}
              alt="Local McKinney business going digital with a new website"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Pillars */}
      <div className="max-w-screen-2xl mx-auto px-6 mt-16">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold text-center mb-10"
        >
        </motion.h3>
      </div>
    </section>
  );
}
