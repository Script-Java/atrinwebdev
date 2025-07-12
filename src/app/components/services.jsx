"use client";

import Link from "next/link";
import {
  FaLaptopCode,
  FaSearch,
  FaGoogle,
  FaPalette,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Assuming you have this component in your project
import ScrollingBar from "./scrollingBar";

export default function Services() {
  // Rewritten service descriptions for a more professional and benefit-driven tone
  const services = [
    {
      icon: <FaLaptopCode className="text-5xl text-indigo-400 mb-4" />,
      title: "Custom Website Development",
      desc: "We build bespoke, high-performance websites that captivate your audience and turn visitors into loyal customers. Each site is optimized for speed, mobile-first, and engineered to be a powerful engine for your business growth.",
      bullets: ["Strategic UI/UX Design", "High-Speed Performance", "E-commerce & Shopify"],
    },
    {
      icon: <FaSearch className="text-5xl text-indigo-400 mb-4" />,
      title: "Local SEO Strategy",
      desc: "Dominate local search results. We implement targeted SEO strategies that put your business in front of customers in McKinney, Frisco, and beyond right when they're looking for your services. Climb the ranks and capture high-intent organic traffic.",
      bullets: ["Local Map Pack Optimization", "Technical SEO Audits", "Content & Keyword Strategy"],
    },
    {
      icon: <FaGoogle className="text-5xl text-indigo-400 mb-4" />,
      title: "PPC & Google Ads Management",
      desc: "Generate immediate leads and sales with precision-targeted Google Ads campaigns. We manage your budget effectively to maximize ROI, driving qualified, ready-to-buy traffic to your site from day one.",
      bullets: ["Maximized ROI & ROAS", "A/B Tested Ad Copy", "Lead Conversion Tracking"],
    },
    {
      icon: <FaPalette className="text-5xl text-indigo-400 mb-4" />,
      title: "Brand & Logo Identity",
      desc: "Your brand is more than a logo. We create a complete visual identity—from a memorable logo to a cohesive color palette—that tells your story, builds trust, and makes a lasting impression on your customers.",
      bullets: ["Custom Logo Concepts", "Full Brand Style Guide", "Marketing Asset Design"],
    },
  ];

  return (
    <section className="bg-black text-white py-20" id="solutions">
      <div className="max-w-screen-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Solutions</h2>
          <h1 className="mt-2 text-4xl md:text-6xl font-bold uppercase mb-6 tracking-wider">
            Services Built for Local Growth
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl uppercase text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          From stunning web design to targeted SEO, we provide McKinney and North Dallas businesses with the tools to stand out and attract more customers.
        </motion.p>

        <div className="mb-12">
          <ScrollingBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-[#0b0b0b] border-t border-indigo-500/50 p-8 hover:border-indigo-500 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10"
            >
              <div>{service.icon}</div>
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
                {service.title}
              </h2>
              <p className="text-gray-300 mb-6">{service.desc}</p>

              <div className="flex flex-wrap gap-3">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
