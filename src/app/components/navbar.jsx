"use client";
import Image from "next/image";
import logo from "../assets/logo/2.svg";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  // Function for smooth scrolling to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setShowMenu(false); // Close menu on mobile after clicking
    }
  };

  return (
    <div className="border-b bg-base-200 border-gray-200 fixed w-full top-0 z-50">
      <div className="container m-auto p-4">
        <div className="flex items-center justify-between p-4">
          <Link href={"/"}>
            <Image src={logo} alt="Logo" width={200} />
          </Link>
          <div className="hidden lg:flex items-center flex-wrap space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost"
              onClick={() => scrollToSection("home")}
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost"
              onClick={() => scrollToSection("work")}
            >
              Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost"
              onClick={() => scrollToSection("about")}
            >
              About
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost"
              onClick={() => scrollToSection("services")}
            >
              Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-ghost"
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </motion.button>
          </div>
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn btn-primary"
              onClick={() => scrollToSection("contact")}
            >
              Get Started
            </motion.button>
          </div>
          <div className="block lg:hidden">
            <button onClick={menuToggle} className="btn btn-primary text-2xl">
              <RiMenu3Fill />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="flex flex-col items-center space-y-4">
            <button className="btn btn-ghost" onClick={() => scrollToSection("home")}>
              Home
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("work")}>
              Work
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("about")}>
              About
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("services")}>
              Services
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("faq")}>
              FAQ
            </button>
            <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
