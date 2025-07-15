import { Karla } from "next/font/google";
import "./globals.css";

// Import Karla font
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  // New title is location-specific and service-focused
  title:
    "McKinney & Frisco Web Design | Local SEO for North Dallas | AtrinWebDev",

  // New description is benefit-driven and targets a local audience
  description:
    "Elevate your North Dallas business with custom web design and local SEO services. AtrinWebDev helps McKinney and Frisco small businesses attract more customers and drive growth.",

  // New keywords include local and long-tail terms
  keywords:
    "McKinney web design, Frisco SEO services, North Dallas web development, small business website Texas, local SEO company, WordPress developer DFW, custom web design",

  authors: [{ name: "Atrin Shahroudi", url: "https://atrinwebdev.com" }],

  robots: "index, follow",

  // OpenGraph data updated to match the new, optimized title and description
  openGraph: {
    title:
      "McKinney & Frisco Web Design | Local SEO for North Dallas | AtrinWebDev",
    description:
      "Custom web design and local SEO solutions designed to help small businesses in McKinney, Frisco, and the DFW area thrive online.",
    url: "https://atrinwebdev.com",
    siteName: "AtrinWebDev",
    images: [
      {
        url: "https://atrinwebdev.com/starsBg.jpg", // Use a specific, compelling image URL
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Web Design & SEO for North Dallas Businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "AtrinWebDev",
        url: "https://www.atrinwebdev.com",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.atrinwebdev.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        name: "AtrinWebDev",
        image: "https://www.atrinwebdev.com/logo-dark.png",
        "@id": "https://www.atrinwebdev.com",
        url: "https://www.atrinwebdev.com",
        telephone: "+1-469-901-3579",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "6600 Mckinney Ranch Pkwy",
          addressLocality: "McKinney",
          addressRegion: "TX",
          postalCode: "75070",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.1977,
          longitude: -96.6154,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        founder: {
          "@type": "Person",
          name: "Atrin Shahroudi",
          url: "https://www.atrinwebdev.com/about",
        },
        areaServed: [
          {
            "@type": "City",
            name: "McKinney",
          },
          {
            "@type": "City",
            name: "Frisco",
          },
          {
            "@type": "City",
            name: "Plano",
          },
          {
            "@type": "City",
            name: "Allen",
          },
          {
            "@type": "AdministrativeArea",
            name: "North Dallas",
          },
        ],
        sameAs: [
          "https://www.facebook.com/atrinwebdev",
          "https://www.linkedin.com/company/atrinwebdev",
          "https://www.instagram.com/atrinwebdev",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Local Visibility Plan",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Growth Engine Plan",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Market Accelerator Plan",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en" data-theme="black" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${karla.variable} antialiased`}>{children}</body>
    </html>
  );
}
