"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import img1 from "../../assets/img/website/11.jpg"
import img2 from "../../assets/img/website/2.jpg"

// Icons
import { FiLayers, FiCode, FiCheckCircle, FiZap, FiShield, FiTrendingUp } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { SiReact, SiNextdotjs, SiWordpress, SiShopify, SiTailwindcss, SiFramer } from "react-icons/si";

export default function WebsiteDevelopment() {
  // ====== Content data ======
  const processSteps = [
    {
      icon: <FiLayers size={24} />,
      title: "Discovery & Strategy",
      description:
        "We interview stakeholders, analyze competitors, map user journeys, and define KPIs. You leave with a concise strategy, sitemap, and success metrics.",
      bullets: [
        "Stakeholder + audience workshops",
        "Analytics & competitor gap analysis",
        "Information architecture & sitemap",
        "Technical stack + timeline proposal",
      ],
    },
    {
      icon: <FiCode size={24} />,
      title: "Design & Development",
      description:
        "We translate strategy into an accessible UI and build with clean, testable code. Performance, SEO, and maintainability are first‑class citizens.",
      bullets: [
        "Wireframes → high‑fidelity design system",
        "Component‑driven build (React/Next.js)",
        "SEO‑ready markup & schema",
        "CMS setup (Headless WP / Shopify)",
      ],
    },
    {
      icon: <IoRocketOutline size={24} />,
      title: "Testing & Launch",
      description:
        "We run cross‑device QA, accessibility checks, CWV audits, and staging sign‑off before secure deployment via modern CI/CD.",
      bullets: [
        "Accessibility AA checks (a11y)",
        "Core Web Vitals optimization",
        "Content migration & redirects",
        "Zero‑downtime deploy & monitoring",
      ],
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: "Support & Growth",
      description:
        "Post‑launch, we iterate using analytics, heatmaps, and user feedback. Roadmaps prioritize features that move KPIs.",
      bullets: [
        "Monthly updates & security patches",
        "Experimentation (A/B, copy, UX)",
        "SEO content roadmap & internal links",
        "Proactive uptime & performance alerts",
      ],
    },
  ];

  const techStack = [
    { name: "React", icon: <SiReact size={48} /> },
    { name: "Next.js", icon: <SiNextdotjs size={48} /> },
    { name: "WordPress", icon: <SiWordpress size={48} /> },
    { name: "Shopify", icon: <SiShopify size={48} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={48} /> },
    { name: "Framer Motion", icon: <SiFramer size={48} /> },
  ];

  const features = [
    {
      icon: <FiZap className="text-indigo-400" size={22} />,
      title: "Blazing Performance",
      description:
        "Ship WebP/AVIF images, critical CSS, and route‑level code splitting for LCP < 2.5s and INP < 200ms on modern devices.",
    },
    {
      icon: <FiShield className="text-indigo-400" size={22} />,
      title: "Security by Default",
      description:
        "HTTPS, headers hardening, form validation, and regular dependency audits keep your site and users safe.",
    },
    {
      icon: <FiTrendingUp className="text-indigo-400" size={22} />,
      title: "SEO‑First Build",
      description:
        "Semantic HTML, structured data, internal linking, and content hubs designed to capture long‑tail demand.",
    },
  ];

  const caseStudies = [
    {
      company: "Texas Five Star Paint & Body",
      result: "+68% organic traffic",
      blurb:
        "Redesigned site with a mobile‑first approach, improved page speed, and optimized local SEO → #1 for 15+ service keywords.",
      image: img1,
      alt: "Texas Five Star Paint & Body website preview",
      href: "/projects",
    },
    {
      company: "Glass Go LLC",
      result: "3× Performance Optimization",
      blurb:
        "Rebuilt website in Next.js with a custom CMS, reducing load time from 4s to 1.2s and improving Lighthouse scores across the board.",
      image: img2,
      alt: "Glass Go LLC website preview",
      href: "/projects",
    },
  ];

  const faqs = [
    {
      q: "How long does a project take?",
      a: "Most brochure sites launch in 3–6 weeks; ecommerce or custom builds take 6–12+. We phase delivery so value ships early.",
    },
    {
      q: "Do you provide content and SEO?",
      a: "Yes. We plan information architecture, write or refine on‑page copy, implement schema, and publish a content hub to build topical authority.",
    },
    {
      q: "Can you migrate my existing site?",
      a: "We migrate content, set up 301 redirects, preserve analytics/UTMs, and maintain rankings with minimal downtime.",
    },
    {
      q: "What about ongoing support?",
      a: "Choose from care plans that cover maintenance, performance, backups, monitoring, and a monthly improvement sprint.",
    },
  ];

  // ====== Structured data (JSON‑LD) ======
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'atrinwebdev',
    url: 'https://www.atrinwebdev.com',
    logo: 'https://www.atrinwebdev.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/atrinwebdev',
      'https://github.com/atrinwebdev'
    ]
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website Development',
    provider: { '@type': 'Organization', name: 'atrinwebdev' },
    areaServed: { '@type': 'Country', name: 'United States' },
    offers: {
      '@type': 'Offer',
      url: 'https://www.atrinwebdev.com/pricing',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };

  return (
    <>
      {/* JSON‑LD for enhanced SEO & AI Overviews eligibility */}
      <Script id="org-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(orgLd)}
      </Script>
      <Script id="service-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="faq-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqLd)}
      </Script>

      <Navbar />

      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* ===== Hero ===== */}
          <motion.header
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Expertise</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
              Website Development
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              We build more than websites—we craft fast, accessible, SEO‑ready experiences that turn visitors into customers.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                Get a Free Strategy Call
              </Link>
              <Link href="/portfolio" className="rounded-xl border border-indigo-600/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400">
                See Our Work
              </Link>
            </div>
          </motion.header>

          {/* ===== Value Props / Features ===== */}
          <section aria-labelledby="value-props" className="py-10">
            <h2 id="value-props" className="sr-only">Why choose us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-[#0b0b0b] p-8 ring-1 ring-indigo-500/20"
                >
                  <div className="flex items-center gap-3 mb-3">{f.icon}<span className="text-lg font-semibold">{f.title}</span></div>
                  <p className="text-gray-400 text-sm leading-6">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== Process ===== */}
          <section aria-labelledby="process" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="process" className="text-3xl md:text-4xl font-semibold">Our Proven Process</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">From concept to launch, a transparent, data‑driven workflow keeps projects on time and on target.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc pl-5">
                    {step.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          {/* ===== Tech Stack ===== */}
          <section aria-labelledby="stack" className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="stack" className="text-3xl md:text-4xl font-semibold">Our Technology Stack</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Modern frameworks and a strong DevOps pipeline ensure speed, stability, and scale.</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-center flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {tech.icon}
                  <p className="mt-2 text-sm font-semibold">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== Case Studies / Proof ===== */}
          <section aria-labelledby="proof" className="py-20">
            <h2 id="proof" className="text-3xl md:text-4xl font-semibold text-center mb-12">Results We’re Proud Of</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((c, i) => (
                <article key={i} className="bg-[#0b0b0b] rounded-3xl overflow-hidden ring-1 ring-indigo-500/20">
                  <div className="relative h-56 w-full">
                    <Image src={c.image} alt={c.alt} fill priority className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{c.company}</h3>
                      <span className="text-indigo-400 text-sm font-semibold">{c.result}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">{c.blurb}</p>
                    <Link href={c.href} className="inline-block mt-4 text-indigo-300 hover:text-indigo-200 text-sm font-medium">View details →</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ===== FAQ (also mapped to FAQPage schema) ===== */}
          <section aria-labelledby="faq" className="py-20">
            <h2 id="faq" className="text-3xl md:text-4xl font-semibold text-center mb-8">Website Development FAQs</h2>
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

          {/* ===== Secondary CTA ===== */}
          <section aria-labelledby="cta" className="text-center py-20">
            <h2 id="cta" className="text-3xl md:text-4xl font-semibold">Ready to Build Your Digital Future?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
              Let’s map your path to more traffic, better conversions, and faster pages.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">
                View Our Plans
              </Link>
              <Link href="/contact" className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase">
                Book a Call
              </Link>
            </div>
            <p className="text-gray-500 text-xs mt-4">Typical response within 24 hours.</p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
