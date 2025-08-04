// src/app/locations/web-development-prosper/page.jsx

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProsperPageClient from "./prosperPageClient"; // Your new client component

// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "Prosper Web Design | Local SEO for Prosper, TX Businesses | AtrinWebDev",
  
  description:
    "AtrinWebDev helps Prosper, TX small businesses establish a premium online presence with custom web design and local SEO. Capture the growth in one of DFW's fastest-growing towns.",
    
  keywords:
    "Prosper web design, web design company Prosper TX, local SEO Prosper, small business websites Prosper, new business website Prosper, web developer Prosper",
  
  openGraph: {
    title: "Prosper Web Design | Local SEO for Prosper, TX Businesses | AtrinWebDev",
    description: "In a community defined by growth and excellence, your online presence needs to lead the pack.",
    url: "https://atrinwebdev.com/locations/web-development-prosper",
    images: [
      {
        url: "https://atrinwebdev.com/og-image-prosper.jpg", // Create a specific image for sharing
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for Prosper Businesses",
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
      "name": "Prosper, TX"
    },
    "description": "Custom web design and local SEO services for new and growing businesses in Prosper, Texas.",
    "name": "Prosper Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---


export default function ProsperWebDevelopmentPage() {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      
      <Navbar />
      <ProsperPageClient />
      <Footer />
    </>
  );
}