"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  RiMenu3Fill,
  RiCloseLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

import logo from "../assets/logo/logo-white.png";

/* --------------------------- Your existing routes -------------------------- */
const SERVICES = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "SEO Optimization", href: "/services/seo-optimization" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Logo Design", href: "/services/logo-design" },
  { label: "GMB Optimization", href: "/services/google-my-business-optimization" },
];

const LOCATIONS = [
  { label: "Plano", href: "/locations/web-development-plano" },
  { label: "McKinney", href: "/locations/web-development-mckinney" },
  { label: "Frisco", href: "/locations/web-development-frisco" },
  { label: "Allen", href: "/locations/web-development-allen" },
  { label: "Prosper", href: "/locations/web-development-prosper" },
  { label: "Richardson", href: "/locations/web-development-richardson" },
];

const ABOUT = [
  { label: "Our Mission", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

/* ------------------------------ Free tools card ---------------------------- */
/* Keep routes you already have. Add more later (create pages under /tools). */
const FREE_TOOLS = [
  { label: "Website Speed Test", href: "/tools/website-speed-test" },
  // { label: "Open Graph Preview", href: "/tools/og-preview" },   // add when ready
  // { label: "Meta Tags Checker", href: "/tools/meta-checker" },  // add when ready
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mega menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/70 text-white">
      {/* Top row: X/☰ — Logo — CTA */}
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="btn btn-ghost btn-sm md:btn-md text-white"
          >
            {open ? <RiCloseLine size={22} /> : <RiMenu3Fill size={22} />}
          </button>

          <Link href="/" className="flex items-center gap-2 select-none">
            <Image src={logo} alt="Logo" width={28} height={28} className="rounded" priority />
            <span className="font-semibold tracking-tight text-base md:text-lg">
              AtrinWebDev
            </span>
          </Link>

          <Link
            href="/contact"
            className="btn btn-sm md:btn-md bg-white text-black hover:bg-black hover:text-white border-none"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Mega menu: cards grid like your screenshot */}
      <div
        className={`transition-[max-height] duration-300 ease-out overflow-hidden border-t border-white/10 ${
          open ? "max-h-[85vh]" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-4 md:py-6">
          {/* Grid stacks on mobile, 2 cols md, 3 cols lg (will wrap to another row if more than 3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <MenuCard title="About" items={ABOUT} />
            <MenuCard title="Projects" items={[{ label: "Projects", href: "/projects" }]} />
            <MenuCard
              title="Contact"
              items={[
                { label: "Contact Form", href: "/contact" },
                { label: "Email", href: "/contact#email" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/atrinwebdev/", external: true },
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571846047410", external: true },
                { label: "Instagram", href: "https://www.instagram.com/atrinwebdev/", external: true },
              ]}
            />

            {/* Extra cards (wrap to next row but keep same style) */}
            <MenuCard title="Services" items={SERVICES} />
            <MenuCard title="Areas Served" items={LOCATIONS} />
            <MenuCard title="Free Tools" items={[...FREE_TOOLS]} />
          </div>


        </div>
      </div>
    </header>
  );
}

/* ---------------------------- Reusable card UI ----------------------------- */
function MenuCard({ title, items }) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5"
      style={{
        // keep your theme: deep purple/black card like the screenshot
        background:
          "linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%)",
      }}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 hover:bg-white/10 transition"
              >
                <Row label={item.label} />
              </a>
            ) : (
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 hover:bg-white/10 transition"
              >
                <Row label={item.label} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <RiArrowRightUpLine className="opacity-70" />
      <span className="underline-offset-4 hover:underline">{label}</span>
    </span>
  );
}
