"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Make sure the path to your image is correct
import img from "../assets/img/1.jpg";

export default function Mission() {
  return (
    <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden" id="mission">
      {/* Glowing arc background with indigo accent */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[180px] z-0" />
      <div className="absolute -top-44 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] border-t border-indigo-500/20 rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-screen-2xl mx-auto text-center px-6 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          Your Local Partner in Digital Growth
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Our mission is to empower businesses in McKinney and the North Dallas area with innovative web solutions that drive real results, build lasting customer trust, and achieve digital excellence.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative bg-[#0b0b0b] text-white max-w-screen-2xl mx-auto mt-16 shadow-xl px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center z-10 ring-1 ring-indigo-500/20"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            From Local Vision to Digital Reality
          </h2>
          <p className="text-gray-300">
            We don’t just build websites; we create digital foundations for local success. We partner with McKinney-area businesses to craft online experiences that perform, convert, and resonate with your community.
          </p>
          <p className="text-gray-400">
            Whether you're a startup launching your first website or an established brand seeking to enhance your online presence, we deliver tailored solutions that align with your goals and grow with your vision.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-black border border-indigo-400/50 px-5 py-2 text-sm uppercase text-indigo-300">
              Local Web Design
            </div>
            <div className="bg-black border border-indigo-400/50 px-5 py-2 text-sm uppercase text-indigo-300">
              McKinney SEO
            </div>
            <div className="bg-black border border-indigo-400/50 px-5 py-2 text-sm uppercase text-indigo-300">
              E-commerce Solutions
            </div>
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
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-md">
            <Image
              src={img}
              alt="A local business in McKinney benefiting from web development services"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
