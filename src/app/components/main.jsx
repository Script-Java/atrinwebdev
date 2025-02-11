"use client"
import Image from "next/image";
import laptop from "../assets/img/tablet.svg";

const Main = () => {
  // Function for smooth scrolling to sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="home" className="bg-stars pt-96 lg:pt-32 pb-32">
      <div className="container mt-32 lg:mt-32 m-auto p-4">
        <div className="flex items-center h-[85vh] justify-center flex-col space-y-6 p-4">
          <h1 className="text-6xl max-w-5xl text-center">
            Transform Your Online Presence and Drive Real Growth
          </h1>
          <p className="text-xl max-w-3xl text-center">
            At atrinwebdev, we create custom websites, powerful SEO,
            high-converting ads, and business software to help your brand grow
            and succeed online.
          </p>
          <div className="flex space-x-4">
            {/* Smooth scroll to "contact" section */}
            <button className="btn btn-primary" onClick={() => scrollToSection("contact")}>
              Get Started
            </button>

            {/* Smooth scroll to "about" section */}
            <button className="btn btn-outline" onClick={() => scrollToSection("about")}>
              Learn More
            </button>
          </div>
          <div className="flex items-center justify-center">
            <Image src={laptop} className="max-w-4xl w-full" alt="laptop text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

