import { Karla } from "next/font/google";
import "./globals.css";

// Import Karla font
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  // Title now leads with "North Dallas" as the primary keyword
  title:
    "North Dallas Web Design & SEO | Serving Frisco & McKinney | AtrinWebDev",

  // Description is now more focused on the entire North Dallas region
  description:
    "Expert web design and local SEO for businesses across North Dallas. AtrinWebDev creates high-performance websites for small businesses in Frisco, McKinney, and the greater DFW area to drive growth.",

  // Keywords are reordered to prioritize North Dallas terms
  keywords:
    "North Dallas web design, North Dallas SEO, Frisco web design, McKinney web development, small business websites North Dallas, DFW web design company, local SEO company",

  authors: [{ name: "Atrin Shahroudi", url: "https://atrinwebdev.com" }],

  robots: "index, follow",

  // OpenGraph data is updated to reflect the North Dallas focus
  openGraph: {
    title:
      "North Dallas Web Design & SEO | Serving Frisco & McKinney | AtrinWebDev",
    description:
      "Specializing in custom websites and local SEO to help small businesses across North Dallas, Frisco, and McKinney succeed online.",
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
