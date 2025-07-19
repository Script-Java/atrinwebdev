import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import FriscoPageClient from "./friscoPageClient";


// --- START: UNIQUE METADATA FOR THIS PAGE ---
export const metadata = {
  title: "Frisco Web Design | Local SEO for Frisco, TX Businesses | AtrinWebDev",
  
  description:
    "AtrinWebDev helps Frisco, TX small businesses get found online with custom web design and practical local SEO. We build websites that work as hard as you do.",
    
  keywords:
    "Frisco web design, web design company Frisco TX, local SEO Frisco, small business websites Frisco, e-commerce Frisco TX, WordPress developer Frisco",
  
  openGraph: {
    title: "Frisco Web Design | Local SEO for Frisco, TX Businesses | AtrinWebDev",
    description: "In a city of champions, your business deserves a winning website. We build websites that reflect the passion of Frisco business owners.",
    url: "https://atrinwebdev.com/locations/web-development-frisco",
    images: [
      {
        url: "https://atrinwebdev.com/og-image-frisco.jpg", // Create a specific image for sharing
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for Frisco Businesses",
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
      "name": "Frisco, TX"
    },
    "description": "Custom web design and local SEO services for small businesses in Frisco, Texas.",
    "name": "Frisco Web Design Services"
};
// --- END: PAGE-SPECIFIC SCHEMA ---




// The page itself is now a simple Server Component that wraps the client component
export default function FriscoWebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />
      <FriscoPageClient />
      <Footer />
    </>
  );
}
