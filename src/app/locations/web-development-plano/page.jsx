// src/app/locations/web-development-plano/page.jsx

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PlanoPageClient from "./planoPageClient"; // Your client component with the page content

// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "Plano Web Design | Custom Websites for Plano, TX Businesses | AtrinWebDev",
  
  description:
    "AtrinWebDev provides expert web design and local SEO services for small businesses in Plano, TX. We build custom websites that help you stand out and grow.",
    
  keywords:
    "Plano web design, Plano SEO company, small business websites Plano, custom Plano web design, local web developer Plano, TX",
  
  openGraph: {
    title: "Plano Web Design | Custom Websites for Plano, TX Businesses | AtrinWebDev",
    description: "In a city as dynamic as Plano, your business deserves a website that captures attention and drives growth.",
    url: "https://atrinwebdev.com/locations/web-development-plano",
    images: [
      {
        url: "https://atrinwebdev.com/og-image-plano.jpg", // Create a specific image for sharing
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for Plano Businesses",
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
      "name": "Plano, TX"
    },
    "description": "Custom web design and local SEO services for small businesses in Plano, Texas.",
    "name": "Plano Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---


// The page itself is now a simple Server Component that wraps the client component
export default function PlanoWebDevelopmentPage() {
  return (
    <>
      {/* This <head> tag is necessary to inject the new schema script */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

      
      <Navbar />
      <PlanoPageClient />
      <Footer />
    </>
  );
}
