"use client";

import Image from "next/image";
import img from "../assets/img/1.jpg";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="relative bg-black text-white pt-32 pb-24 overflow-hidden" id="mission">
      {/* Glowing arc background */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-white opacity-10 rounded-full blur-[180px] z-0" />
      <div className="absolute -top-44 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] border-t border-white/20 rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative max-w-screen-2xl mx-auto text-center px-6 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          Empowering Brands Through Web Innovation
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          At AtrinWebDev, our mission is to elevate businesses by delivering powerful web solutions that drive growth, inspire trust, and bring digital visions to life.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative bg-[#0b0b0b] text-white max-w-screen-2xl mx-auto mt-16 shadow-xl px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-14 items-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Turning Ideas Into Online Experiences
          </h2>
          <p className="text-gray-300">
            We design, build, and optimize websites that don’t just look great—they perform. From startups to established brands, we partner with businesses to create digital experiences that resonate.
          </p>
          <p className="text-gray-400">
            Whether you're launching your first site, rebranding, or scaling up with new functionality—AtrinWebDev delivers tailored solutions that reflect your goals and grow with your vision.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-black border border-white px-5 py-2 text-sm uppercase">
              Web Design Services
            </div>
            <div className="bg-black border border-white px-5 py-2 text-sm uppercase">
              SEO & Optimization
            </div>
            <div className="bg-black border border-white px-5 py-2 text-sm uppercase">
              E-commerce Builds
            </div>
            <Link
              href="/contact"
              className="bg-white text-black px-5 py-2 text-sm font-semibold uppercase"
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
              alt="Web Development"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
