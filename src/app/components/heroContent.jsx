"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// The scrollToSection function is passed down as a prop from the Main component.
const HeroContent = ({ scrollToSection }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-white flex flex-col gap-4 items-center text-center p-8"
    >
      {/* New, locally-focused headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-4xl md:text-6xl max-w-7xl font-bold uppercase mb-4"
      >
        Premier Web Design & SEO for McKinney and North Dallas Businesses
      </motion.h1>

      {/* New, benefit-oriented subheading */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="text-lg md:text-xl max-w-3xl mx-auto uppercase mb-6"
      >
        We build powerful websites and marketing strategies that help local companies thrive.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex gap-4 justify-center items-center"
      >
        <Link
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
          className="btn bg-white text-black hover:bg-black hover:text-white uppercase px-8"
        >
          Contact Us
        </Link>
        
        <Link
          href="https://calendar.app.google/sc4BoYLbzk73nWHB9"
          className="btn btn-outline uppercase"
          target="_blank"
          rel="noopener noreferrer"
        >
          Schedule Call
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
