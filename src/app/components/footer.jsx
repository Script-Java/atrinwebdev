"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo/logo-white.png";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-[#0b0b0b] text-white py-16 px-6"
    >
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Logo and Description */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-start"
        >
          <Image src={logo} alt="Logo" width={140} height={50} />
          <p className="text-sm text-gray-400 mt-4 max-w-xs">
            Creative solutions for modern businesses. Let's build your presence online.
          </p>
          <p className="text-xs text-gray-500 mt-6">&copy; {new Date().getFullYear()} atrinwebdev. All rights reserved.</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <h3 className="text-sm font-semibold uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#solutions">Solutions</Link></li>
            <li><Link href="/#mission">Mission</Link></li>
            <li><Link href="/#projects">Projects</Link></li>
            <li><Link href="/#contact">Contact Us</Link></li>
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col"
        >
          <h3 className="text-sm font-semibold uppercase mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="https://www.instagram.com/atrinwebdev/" target="_blank" className="text-white hover:text-gray-400">
              <FaInstagram className="text-xl" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61571846047410" target="_blank" className="text-white hover:text-gray-400">
              <FaFacebookF className="text-xl" />
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-6">Stay connected with us for updates and insights.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}