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
  title: "McKinney & Frisco Web Design | Local SEO for North Dallas | AtrinWebDev",
  
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
    title: "McKinney & Frisco Web Design | Local SEO for North Dallas | AtrinWebDev",
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
  return (
    <html lang="en" data-theme="black" suppressHydrationWarning>
      <body className={`${karla.variable} antialiased`}>{children}</body>
    </html>
  );
}
