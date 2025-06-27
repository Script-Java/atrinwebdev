"use client";

import {
  FaLaptopCode,
  FaSearch,
  FaGoogle,
  FaPalette,
  FaCheck,
} from "react-icons/fa";

import { motion } from "framer-motion";
import ScrollingBar from "./scrollingBar";

export default function Services() {
  const services = [
    {
      icon: <FaLaptopCode className="text-5xl text-white mb-4" />,
      title: "Web Development",
      desc: "Crafting modern, responsive, and high-performance websites that not only look stunning across all devices but are strategically designed to convert visitors into valuable leads and customers for your business.",
      bullets: ["Next.js / React", "WordPress (Custom)", "Shopify"],
    },
    {
      icon: <FaSearch className="text-5xl text-white mb-4" />,
      title: "SEO Services",
      desc: "Boosting your website's visibility on search engines to ensure your business ranks higher, attracting valuable organic traffic and increasing your online authority, without paying for every click.",
      bullets: ["On-Page SEO", "Keyword Strategy", "Speed Optimization"],
    },
    {
      icon: <FaGoogle className="text-5xl text-white mb-4" />,
      title: "Google Ads",
      desc: "Designing and managing highly targeted pay-per-click (PPC) campaigns on Google's search and display networks to drive immediate, qualified traffic to your website and accelerate your conversions and sales.",
      bullets: ["Search & Display Ads", "Conversion Tracking", "Landing Page Strategy"],
    },
    {
      icon: <FaPalette className="text-5xl text-white mb-4" />,
      title: "Logo Design",
      desc: "Creating distinctive and memorable logos that perfectly capture your brand's essence and values, providing a strong, professional visual identity that resonates with your target audience and sets you apart.",
      bullets: ["Custom Vector Logos", "Typography Systems", "Color Palettes"],
    },
  ];

  return (
    <section className="bg-black text-white py-20" id="solutions">
      <div className="max-w-screen-2xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold uppercase mb-6 text-center tracking-wider"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl uppercase text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          We offer a complete suite of tools to elevate your brand, build your presence, and grow your business online.
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
              className="bg-[#0b0b0b] border-t border-white p-8 hover:border-gray-500 transition-all duration-300 shadow-xl hover:shadow-gray-500/20"
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
                    className="flex items-center gap-2 border border-white text-white text-sm px-3 py-1.5 rounded-md uppercase tracking-wide"
                  >
                    <FaCheck className="text-xs" />
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