"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Static image imports (Next/Image friendly)
import logo1 from "../../assets/img/logos/1.png";
import logo2 from "../../assets/img/logos/2.png";
import logo3 from "../../assets/img/logos/3.png";
import logo4 from "../../assets/img/logos/4.png";
import logo5 from "../../assets/img/logos/5.png";
import logo6 from "../../assets/img/logos/6.png";

// Icons (remove unused to avoid build/lint errors)
import {
  FiEdit,
  FiEye,
  FiHeart,
  FiAward,
  FiGrid,
  FiBookOpen,
  FiFeather,
  FiDroplet,
  FiType,
  FiLayers,
  FiAperture,
  FiCheckCircle,
  FiDownloadCloud,
  FiAlertTriangle,
} from "react-icons/fi";

export default function LogoDesign() {
  // Use imported static sources instead of dynamic string paths
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

  // ===== Page Data =====
  const logoServices = [
    {
      icon: <FiEdit size={24} />,
      title: "Custom Logo Concepts",
      description:
        "No templates—ever. We develop unique concepts driven by discovery interviews, competitive research, and brand strategy.",
      bullets: [
        "3–5 initial concepts with rationale",
        "Competitive + audience audit",
        "Trademark pre‑check guidance",
        "Two collaborative revision rounds",
      ],
    },
    {
      icon: <FiEye size={24} />,
      title: "Brand Style Guides",
      description:
        "A living guide that defines how your brand looks and behaves across channels to keep your team consistent.",
      bullets: [
        "Primary/secondary logo lockups",
        "Color system + accessibility ratios",
        "Typography scale + usage",
        "Spacing, grids, and examples",
      ],
    },
    {
      icon: <FiHeart size={24} />,
      title: "Vector & File Formats",
      description:
        "You receive a complete, production‑ready brand kit covering print, web, and social use cases.",
      bullets: [
        "AI, EPS, SVG (master vectors)",
        "PNG/JPG (multiple sizes/backgrounds)",
        "Favicon + app icons",
        "Social avatars and banners",
      ],
    },
    {
      icon: <FiAward size={24} />,
      title: "Brand Refresh",
      description:
        "Modernize without losing equity. We refine type, color, and shapes to boost clarity and recognition.",
      bullets: [
        "Audit of current equity & pain points",
        "Subtle or bold evolution options",
        "Rollout plan + asset migration",
        "Internal launch kit templates",
      ],
    },
  ];

  const benefits = [
    { title: "Make a Strong First Impression", description: "Your logo is often the first touchpoint. A professional mark earns trust in seconds." },
    { title: "Build Brand Recognition", description: "Distinctive shapes, type, and color create recall that compounds across touchpoints." },
    { title: "Project Professionalism", description: "A cohesive identity signals quality and consistency to customers and partners." },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery & Strategy",
      copy: "We interview stakeholders, define audiences, and position the brand. Outputs: brief, moodboards, and creative territories.",
      bullets: ["Stakeholder workshop", "Competitive/adjacent audit", "Brand attributes & tone", "Moodboards & territory mapping"],
    },
    {
      step: "2",
      title: "Concepting",
      copy: "Sketch → vector exploration. We present multiple routes with rationale, use‑case mockups, and early color/type directions.",
      bullets: ["Black‑and‑white first (form over color)", "Scalability & contrast checks", "Trademark pre‑screen", "Accessibility tests"],
    },
    {
      step: "3",
      title: "Refinement",
      copy: "Select a direction and iterate. We fine‑tune geometry, spacing, and typographic details across sizes and backgrounds.",
      bullets: ["Optical kerning & grids", "Monochrome/duotone variants", "Clear‑space & min‑size rules", "Edge‑case mockups"],
    },
    {
      step: "4",
      title: "Guidelines & Rollout",
      copy: "We deliver a complete brand kit and help you roll it out—website, social, email, print, and signage.",
      bullets: ["Brand book (PDF + web)", "Asset library (vectors/raster)", "Templates (deck, letterhead, socials)", "Handoff + training"],
    },
  ];

  const deliverables = [
    { label: "Primary + secondary lockups", icon: <FiLayers /> },
    { label: "Wordmark + symbol", icon: <FiFeather /> },
    { label: "Color palette + ratios", icon: <FiDroplet /> },
    { label: "Typography system", icon: <FiType /> },
    { label: "Grid & clear‑space rules", icon: <FiGrid /> },
    { label: "Usage do’s & don’ts", icon: <FiBookOpen /> },
    { label: "Icon set / favicons", icon: <FiAperture /> },
    { label: "Exported files & kit", icon: <FiDownloadCloud /> },
  ];

  const faqs = [
    {
      q: "How many concepts and revisions are included?",
      a: "Most projects include 3–5 initial concepts and two revision rounds. Need more? We can scope additional iterations as add‑ons.",
    },
    {
      q: "Can you handle trademark and naming?",
      a: "We provide trademark pre‑checks and refer you to IP counsel for formal searches and filings. We can also support naming sprints.",
    },
    {
      q: "What file types will I get?",
      a: "Master vectors (AI/EPS/SVG) plus PNG/JPG exports in multiple sizes/backgrounds, PDF brand book, and a zipped brand kit.",
    },
    {
      q: "Do you do full brand identity beyond the logo?",
      a: "Yes. We can extend into web, packaging, signage, decks, email, and social templates for a cohesive rollout.",
    },
  ];

  return (
    <>
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
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Logo Design & Branding</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">Craft Your Visual Identity</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Your logo is the face of your brand. We design memorable, professional marks that scale across every touchpoint.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Start Your Design Project</Link>
              <Link href="/portfolio" className="rounded-xl border border-indigo-600/50 px-6 py-3 text-sm font-semibold text-indigo-300 hover:border-indigo-400">See Logo Work</Link>
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
              <h2 className="text-3xl md:text-4xl font-semibold">Our Design Philosophy</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Artistry meets strategy: distinctive logos supported by the systems that make brands consistent and scalable.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {logoServices.map((service, index) => (
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

          {/* ===== Deliverables / Brand Kit ===== */}
          <section className="py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">What You Get</h2>
                <p className="text-gray-400 max-w-2xl">Everything you need to launch and scale your brand—from master vectors to a practical brand book and ready‑to‑use templates.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {deliverables.map((d, i) => (
                    <div key={i} className="rounded-2xl bg-[#0b0b0b] p-6 ring-1 ring-indigo-500/20 flex items-start gap-3">
                      <span className="text-indigo-400 mt-1">{d.icon}</span>
                      <span className="text-sm text-gray-300">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[#0b0b0b] p-8 ring-1 ring-indigo-500/20">
                <h3 className="text-xl font-semibold">File Formats & Usage</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-black/40 p-3 rounded-xl">AI/EPS/SVG<br/><span className="text-gray-400">Master vectors</span></div>
                  <div className="bg-black/40 p-3 rounded-xl">PNG/JPG<br/><span className="text-gray-400">Web & social</span></div>
                  <div className="bg-black/40 p-3 rounded-xl">PDF<br/><span className="text-gray-400">Press & print</span></div>
                  <div className="bg-black/40 p-3 rounded-xl">ICO/ICNS<br/><span className="text-gray-400">Favicons/apps</span></div>
                </div>
                <div className="mt-6 rounded-2xl bg-black/40 p-4">
                  <h4 className="font-semibold text-sm mb-2">Accessibility & Contrast</h4>
                  <p className="text-gray-400 text-xs">We test color pairs for WCAG contrast and include light/dark safe variants for small sizes on varied backgrounds.</p>
                </div>
                <div className="mt-4 flex items-start gap-2 text-yellow-300 text-xs">
                  <FiAlertTriangle className="mt-0.5" />
                  <span>Guidelines include clear do’s/don’ts to protect legibility and brand equity.</span>
                </div>
              </div>
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
              <h2 className="text-3xl md:text-4xl font-semibold">The Value of a Professional Logo</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A great logo is more than an image; it's a strategic tool for recognition, trust, and conversion.</p>
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

          {/* ===== Gallery (uses imported images) ===== */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Recent Logo Work</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {logos.map((src, idx) => (
                <div key={idx} className="relative h-36 rounded-2xl overflow-hidden ring-1 ring-indigo-500/10">
                  <Image
                    src={src}
                    alt={`Client logo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-contain bg-[#0b0b0b]"
                  />
                </div>
              ))}
            </div>
          </section>


          {/* ===== FAQs ===== */}
          <section className="py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Logo Design FAQs</h2>
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
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to Define Your Brand?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let’s create a distinctive, scalable identity—and ship a complete brand kit you can use everywhere.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 uppercase">Start Your Design Project</Link>
              <Link href="/pricing" className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase">See Packages</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
