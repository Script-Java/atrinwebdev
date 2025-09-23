"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Pricing from "../components/pricing";

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main className="bg-black text-white">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

          {/* Pricing table (existing component) */}
          <div id="pricing" className="pt-4">
            <Pricing />
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-20 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to start?</h2>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white hover:bg-indigo-500 uppercase">
              Choose a Plan
            </Link>
            <Link href="/contact" className="rounded-md border border-indigo-600/50 px-8 py-4 text-sm font-semibold text-indigo-300 hover:border-indigo-400 uppercase">
              Talk to Sales
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
