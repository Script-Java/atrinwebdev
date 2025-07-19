// src/app/locations/web-development-mckinney/page.jsx

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import McKinneyPageClient from "./mckinneyPageClient"; // Your client component with the page content

// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "McKinney Web Design | Local SEO for McKinney, TX Businesses | AtrinWebDev",
  
  description:
    "AtrinWebDev helps McKinney, TX small businesses get found online with custom WordPress development and local SEO. Stop losing customers to a broken website.",
    
  keywords:
    "McKinney web design, web development McKinney TX, local SEO services McKinney TX, WordPress development McKinney, e-commerce website design McKinney",
  
  openGraph: {
    title: "McKinney Web Design | Local SEO for McKinney, TX Businesses | AtrinWebDev",
    description: "We build websites that help McKinney businesses stand out and attract more local customers.",
    url: "https://atrinwebdev.com/locations/web-development-mckinney",
    images: [
      {
        url: "https://atrinwebdev.com/og-image-mckinney.jpg", // Create a specific image for sharing
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for McKinney Businesses",
      },
    ],
  },
};
// --- END: UNIQUE METADATA FOR THIS PAGE ---

// --- START: PAGE-SPECIFIC SCHEMA ---
const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Design and Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": "AtrinWebDev"
    },
    "areaServed": {
      "@type": "City",
      "name": "McKinney, TX"
    },
    "description": "Custom web design, WordPress development, and local SEO services for small businesses in McKinney, Texas.",
    "name": "McKinney Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---


// The page itself is now a simple Server Component that wraps the client component
export default function McKinneyWebDevelopmentPage() {
  return (
    <>
      {/* This <head> tag is necessary to inject the new schema script */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

      
      <Navbar />
      <McKinneyPageClient />
      <Footer />
    </>
  );
}
