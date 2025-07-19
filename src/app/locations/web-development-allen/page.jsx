// src/app/locations/web-development-allen/page.jsx

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AllenPageClient from "./allenPageClient"; // Import the client component

// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "Allen Web Design | Local SEO for Allen, TX Businesses | AtrinWebDev",
  description: "AtrinWebDev helps Allen, TX small businesses get found online with custom web design and practical local SEO. We build websites that work as hard as you do.",
  keywords: "Allen web design, web design company Allen TX, local SEO Allen, small business websites Allen, e-commerce Allen TX, WordPress developer Allen",
  openGraph: {
    title: "Allen Web Design | Local SEO for Allen, TX Businesses | AtrinWebDev",
    description: "We build websites that reflect the pride and passion of Allen business owners.",
    url: "https://atrinwebdev.com/locations/web-development-allen",
    images: [{
      url: "https://atrinwebdev.com/og-image-allen.jpg",
      width: 1200,
      height: 630,
      alt: "AtrinWebDev - Web Design & SEO for Allen Businesses",
    }],
  },
};
// --- END: UNIQUE METADATA FOR THIS PAGE ---

// --- START: PAGE-SPECIFIC SCHEMA ---
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Website Development",
  "provider": {
    "@type": "ProfessionalService",
    "name": "AtrinWebDev"
  },
  "areaServed": {
      "@type": "City",
      "name": "Allen, TX"
  },
  "description": "Custom web design and local SEO services for small businesses in Allen, Texas.",
  "name": "Allen Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---


// The page component itself is now very simple.
export default function AllenWebDevelopmentPage() {
  return (
    <>
      {/* This <head> tag is necessary to inject the new schema script */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      <Navbar />
      <AllenPageClient /> {/* It renders the client component here */}
      <Footer />
    </>
  );
}
