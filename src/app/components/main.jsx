"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "./navbar";

// Dynamically load HeroContent
const DynamicHeroContent = dynamic(() => import("./heroContent"), {
  ssr: false,
  loading: () => <div className="h-[250px]" />,
});

const Main = () => {
  useEffect(() => {
    if (!window.UnicornStudio) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden" id="home">
      {/* Unicorn Studio background */}
      <div className="absolute inset-0 z-0">
        <div
          data-us-project="atM8kCW4NgCaunDOau8e"
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
        <DynamicHeroContent scrollToSection={scrollToSection} />
      </div>
    </main>
  );
};

export default Main;
