import { Karla } from "next/font/google";
import "./globals.css";

// Import Karla font
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "atrinwebdev | Web Development, SEO & Digital Growth",
  description:
    "AtrinWebDev specializes in high-performance web development, SEO optimization, and lead generation. Elevate your online presence today.",
  keywords:
    "web development, SEO, digital marketing, website optimization, lead generation, AtrinWebDev, responsive websites, custom web design",
  authors: [{ name: "Atrin Shahroudi", url: "https://atrinwebdev.com" }],
  robots: "index, follow",
  openGraph: {
    title: "atrinwebdev | Web Development, SEO & Digital Growth",
    description:
      "Custom web development, SEO, and digital marketing solutions designed to boost your brand's online presence.",
    url: "https://atrinwebdev.com",
    siteName: "AtrinWebDev",
    images: [
      {
        url: "https://atrinwebdev.com/SEO.jpg", // Replace with your real image URL
        width: 1200,
        height: 630,
        alt: "AtrinWebDev - Custom Websites & SEO",
      },
    ],
    locale: "en_US",
    type: "website",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="black">
      <body className={`${karla.variable} antialiased`}>{children}</body>
    </html>
  );
}
