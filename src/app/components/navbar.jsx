"use client";
import Image from "next/image";
import logo from "../assets/logo/logo-white.png";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setShowMenu(false);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-black text-white">
      <nav className="flex items-center justify-between max-w-screen-2xl mx-auto py-4 px-6">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center uppercase gap-4">
          <li><button className="btn btn-ghost" onClick={() => scrollToSection("home")}>Home</button></li>
          <li><button className="btn btn-ghost" onClick={() => scrollToSection("solutions")}>Solutions</button></li>
          <li><button className="btn btn-ghost" onClick={() => scrollToSection("mission")}>Mission</button></li>
          <li><button className="btn btn-ghost" onClick={() => scrollToSection("projects")}>Projects</button></li>
          <li><button className="btn bg-white text-black hover:bg-black hover:text-white px-8" onClick={() => scrollToSection("contact")}>Contact Us</button></li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50" onClick={menuToggle}>
          <RiMenu3Fill size={28} className="cursor-pointer" />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.ul
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-2/3 h-screen bg-black p-6 flex flex-col gap-6 text-white text-lg md:hidden shadow-lg"
            >
              <li><button onClick={() => scrollToSection("home")}>Home</button></li>
              <li><button onClick={() => scrollToSection("solutions")}>Solutions</button></li>
              <li><button onClick={() => scrollToSection("mission")}>Mission</button></li>
              <li><button onClick={() => scrollToSection("projects")}>Projects</button></li>
              <li><button onClick={() => scrollToSection("contact")}>Contact Us</button></li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
