"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RiMenu3Fill, RiCloseLine, RiArrowRightUpLine } from "react-icons/ri";
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

const FREE_TOOLS = [{ label: "Website Speed Test", href: "/tools/website-speed-test" }];

/* ========================================================================= */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when menu open (iOS-friendly)
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    if (open) el.style.overflow = "hidden";
    else el.style.overflow = prev || "";
    return () => {
      el.style.overflow = "";
    };
  }, [open]);

  // Close on ESC & focus first link when open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    if (open) setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close when clicking outside the panel
  const onOverlayClick = (e) => {
    if (!panelRef.current) return;
    if (!panelRef.current.contains(e.target)) setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      {/* Top bar */}
      <div className="bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/70">
        <nav className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Menu button */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mega-menu"
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-lg px-2.5 py-2 ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              {open ? <RiCloseLine size={22} /> : <RiMenu3Fill size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 select-none">
              <Image src={logo} alt="AtrinWebDev" width={28} height={28} className="rounded" priority />
              <span className="font-semibold tracking-tight text-base md:text-lg">AtrinWebDev</span>
            </Link>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black ring-1 ring-white/10 hover:bg-black hover:text-white hover:ring-white/30 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile (and desktop background) */}
      <div
        className={`${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-16 transition-opacity duration-200`}
        onMouseDown={onOverlayClick}
      >
        {/* Dim background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Panel (mobile full-screen scroll; desktop anchored) */}
        <div
          id="mega-menu"
          role="dialog"
          aria-modal="true"
          ref={panelRef}
          className={`${open ? "translate-y-0" : "-translate-y-2"} relative mx-auto max-w-7xl transition-transform duration-200`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="mt-2 mx-3 sm:mx-4 md:mx-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            {/* Inner scroller for safe mobile height */}
            <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain px-3 sm:px-4 md:px-6 py-4 md:py-6">
              {/* Grid stacks on mobile, 2 cols md, 3 cols lg */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <MenuCard title="About" items={ABOUT} firstLinkRef={firstLinkRef} />
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
                <MenuCard title="Services" items={SERVICES} />
                <MenuCard title="Areas Served" items={LOCATIONS} />
                <MenuCard title="Free Tools" items={FREE_TOOLS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------- Reusable card UI ----------------------------- */
function MenuCard({ title, items, firstLinkRef }) {
  return (
    <div
      className="rounded-xl p-4 sm:p-5 min-w-0"
      style={{ background: "linear-gradient(180deg, rgba(18,18,18,1) 0%, rgba(10,10,10,1) 100%)" }}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={`${title}-${item.label}`}>
            {item.external ? (
              <a
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none transition"
              >
                <Row label={item.label} />
              </a>
            ) : (
              <Link
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                className="block rounded-md px-3 py-2 hover:bg-white/10 focus:bg-white/10 focus:outline-none transition"
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
      <RiArrowRightUpLine className="opacity-70 shrink-0" />
      <span className="underline-offset-4 hover:underline">{label}</span>
    </span>
  );
}
