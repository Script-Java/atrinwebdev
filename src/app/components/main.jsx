"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Assuming Navbar component is in the same directory or imported correctly
import Navbar from "./navbar"; 

// Reverted to using your local background image asset.
// Make sure the path is correct relative to this component file.
import bgImage from "../assets/img/hero.jpg";

const Main = () => {

  // Function to smoothly scroll to a section on the page.
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // Adjust this value to account for your fixed navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          // Now using your local image asset
          src={bgImage}
          alt="Background Image of the Dallas skyline or a local landmark"
          layout="fill"
          objectFit="cover"
          className="object-cover"
          priority // Adding priority can help with LCP for hero images
        />
      </div>

      {/* Navbar is placed above the overlay to ensure it has the highest z-index */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
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

          {/* Restored original button design with fixed legacyBehavior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center items-center"
          >
            {/* The `onClick` handler smoothly scrolls to the contact section.
                The `Link` component is used for semantic correctness, but scrolling is handled by the button's click event.
            */}
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
            
            {/* This link correctly opens in a new tab without legacyBehavior */}
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
      </div>
    </main>
  );
};

export default Main;
