"use client";

import dynamic from "next/dynamic";
import Navbar from "./navbar";
import Silk from "./silk";

// Dynamically load HeroContent
const DynamicHeroContent = dynamic(() => import("./heroContent"), {
  ssr: false,
  loading: () => <div className="h-[250px]" />,
});

const Main = () => {
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
      {/* Silk background */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#818cf8"
          noiseIntensity={1.5}
          rotation={0}
        />
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
