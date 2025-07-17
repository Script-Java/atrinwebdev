"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// Static components that need to be there on initial load
import Navbar from "./navbar"; 
import bgImage from "../assets/img/hero.jpg";

// OPTIMIZATION: Dynamically import the HeroContent component.
// This tells Next.js to create a separate JavaScript chunk for HeroContent.
// `ssr: false` ensures it's only rendered on the client-side, preventing framer-motion
// from being included in the server-rendered HTML or the initial JS bundle.
const DynamicHeroContent = dynamic(() => import("./heroContent"), {
  ssr: false, 
  // Optional: Add a loading skeleton to prevent layout shift
  loading: () => <div className="h-[250px]" />, // Adjust height to match content
});


const Main = () => {

  // This function is now passed as a prop to the dynamically loaded component.
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // Adjust for fixed navbar height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden" id="home">
      {/* Background Image - remains the same */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background Image of the Dallas skyline"
          layout="fill"
          objectFit="cover"
          priority // Correctly used for LCP
        />
      </div>

      {/* Navbar - remains the same */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
        {/* The dynamically loaded component is rendered here */}
        <DynamicHeroContent scrollToSection={scrollToSection} />
      </div>
    </main>
  );
};

export default Main;