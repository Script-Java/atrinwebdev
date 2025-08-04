// src/app/locations/web-development-richardson/page.jsx

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import RichardsonPageClient from "./richardsonPageClient"; // Your new client component

// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "Richardson Web Design | B2B & Local SEO | AtrinWebDev",
  
  description:
    "AtrinWebDev provides professional web design and B2B SEO services for businesses in Richardson, TX, and the Telecom Corridor. Elevate your corporate presence.",
    
  keywords:
    "Richardson web design, web design company Richardson TX, local SEO Richardson, B2B websites Richardson, corporate web design, web developer Richardson",
  
  openGraph: {
    title: "Richardson Web Design | B2B & Local SEO | AtrinWebDev",
    description: "In the heart of the Telecom Corridor, your business needs a website that is as innovative and professional as you are.",
    url: "https://atrinwebdev.com/locations/web-development-richardson",
    images: [
      {
        url: "https://atrinwebdev.com/og-image-richardson.jpg", // Create a specific image for sharing
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for Richardson Businesses",
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
      "name": "Richardson, TX"
    },
    "description": "Custom web design and local SEO services for corporate and B2B businesses in Richardson, Texas.",
    "name": "Richardson Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---


export default function RichardsonWebDevelopmentPage() {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      
      <Navbar />
      <RichardsonPageClient />
      <Footer />
    </>
  );
}
