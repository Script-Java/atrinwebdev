"use client";

import Image from "next/image";
import Link from "next/link";
import bgImage from "../assets/img/hero.jpg";
import Navbar from "./navbar";
import { motion } from "framer-motion";

const Main = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>

      <div className="relative z-30">
        <Navbar />
      </div>

      <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white flex flex-col gap-4 items-center text-center p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl md:text-6xl max-w-7xl font-bold uppercase mb-4"
          >
            Accelerate Your Business Growth with a Powerful Online Presence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto uppercase mb-6"
          >
            Website development, SEO, Google Ads, and logo design — everything you need to grow your online presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center items-center"
          >
            <Link href="/#contact" legacyBehavior>
              <a className="btn bg-white text-black hover:bg-black hover:text-white uppercase px-8">Contact Us</a>
            </Link>
            <Link href="https://calendar.app.google/sc4BoYLbzk73nWHB9" legacyBehavior>
              <a className="btn btn-outline uppercase">Schedule Call</a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Main;
