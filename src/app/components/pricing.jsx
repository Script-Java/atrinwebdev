"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Icon
const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

// $ helper
const asMoney = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Pricing() {
  // true = 12-Month Plan (lower upfront), false = Pay Upfront (lower monthly + one-time onboarding)
  const [isTermPlan, setIsTermPlan] = useState(true);

  const plans = useMemo(
    () => [
      {
        key: "launch",
        name: "Launch Pad",
        badge: null,
        tagline: "Launch fast with a solid foundation.",
        description: "For new businesses who want a professional, search-ready online presence.",
        price: { term: 289 }, // only term option
        features: [
          "Up to 5-Page Website",
          "Google Business Profile Setup",
          "On-Page SEO Foundation",
          "Hosting, Security & Maintenance",
          "1 Included Business Email",
          "Monthly Performance Report",
        ],
        outcomes: [
          "Appear in Google Maps within weeks",
          "Professional site in 2–3 weeks",
          "Baseline lead capture configured",
        ],
        cta: "Get Started",
        href: "/contact",
        featured: false,
      },
      {
        key: "lead",
        name: "Lead Machine",
        badge: "Most Popular",
        tagline: "Turn traffic into a steady flow of leads.",
        description: "For established businesses ready to consistently generate more traffic and leads.",
        price: { term: 709, upfront: 499, onboarding: 2500 },
        features: [
          "Everything in Launch Pad",
          "Up to 20 Pages",
          "1 Blog Post per Week",
          "Active GBP (GMB) Management",
          "Monthly SEO Optimization",
          "Advanced GBP Optimization",
          "Monthly Content Updates",
          "Quarterly Strategy Review",
        ],
        outcomes: [
          "10–15+ new inbound leads / month",
          "Top 3 ranking for core local keyword (~6 months)",
          "Consistent content & reviews growth",
        ],
        cta: "Choose Plan",
        href: "/contact",
        featured: true,
      },
      {
        key: "dominator",
        name: "Market Dominator",
        badge: "Best for Scaling",
        tagline: "Dominate your local market and scale.",
        description: "For serious businesses that want to dominate their market and grow rapidly.",
        price: { term: 1375, upfront: 999, onboarding: 4500 },
        features: [
          "Everything in Lead Machine",
          "Up to 50 Pages",
          "2 Blog Posts per Week",
          "Google Ads Campaign Management",
          "Conversion Rate Optimization",
          "Weekly Check-in Calls",
          "Priority Support",
        ],
        outcomes: [
          "2–3x more qualified leads in 3–6 months",
          "Outrank competitors across channels",
          "Higher conversion with CRO",
        ],
        cta: "Schedule a Call",
        href: "/contact",
        featured: false,
      },
    ],
    []
  );

  const Toggle = () => (
    <div className="flex items-center gap-x-2 rounded-full p-1 bg-gray-900/50 border border-gray-700">
      <button
        onClick={() => setIsTermPlan(false)}
        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
          !isTermPlan ? "bg-indigo-600 text-white" : "hover:bg-gray-700/50"
        }`}
      >
        Pay Upfront
      </button>
      <button
        onClick={() => setIsTermPlan(true)}
        className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${
          isTermPlan ? "bg-indigo-600 text-white" : "hover:bg-gray-700/50"
        }`}
      >
        12-Month Plan (Save on Upfront Costs)
      </button>
    </div>
  );

  const PriceBlock = ({ plan }) => {
    const p = plan.price;
    const showTerm = isTermPlan || p.upfront === undefined;
    const monthly = showTerm ? p.term : p.upfront;

    const yearlySave = p.upfront !== undefined ? Math.max(0, (p.term - p.upfront) * 12) : 0;

    return (
      <>
        <p className="mt-6 flex items-baseline gap-x-2">
          <span className="text-4xl font-bold tracking-tight">{asMoney(monthly)}</span>
          <span className="text-sm font-semibold leading-6 text-gray-300">/ month</span>
        </p>

        {/* Secondary disclosure + savings */}
        {!showTerm && p.onboarding ? (
          <p className="mt-2 text-xs text-gray-400">
            {asMoney(p.onboarding)} one-time onboarding · Save {asMoney(yearlySave)}/year vs 12-month plan
          </p>
        ) : null}

        {showTerm && p.upfront ? (
          <p className="mt-2 text-xs text-gray-400">
            Or {asMoney(p.upfront)}/mo + {asMoney(p.onboarding || 0)} onboarding upfront
          </p>
        ) : null}
      </>
    );
  };

  return (
    <section className="bg-black text-white py-20 sm:py-28" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl uppercase">
            Simple, Transparent Plans – Built to Deliver Results
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose the perfect plan to launch, grow, and dominate your market. No hidden fees. No long-term lock-ins.
            Just measurable growth.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Toggle />
        </motion.div>

        {/* Plans */}
        <div className="isolate mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className={`relative rounded-3xl p-8 ring-1 xl:p-10 ${
                plan.featured ? "bg-gray-900/60 ring-2 ring-indigo-500" : "bg-gray-900/30 ring-gray-700"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold leading-8 uppercase">{plan.name}</h3>
              <p className="mt-1 text-sm text-indigo-300">{plan.tagline}</p>
              <p className="mt-3 text-sm leading-6 text-gray-300">{plan.description}</p>

              <PriceBlock plan={plan} />

              <Link
                href={plan.href}
                className={`mt-6 block rounded-md py-2.5 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-300 ${
                  plan.featured
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    : "bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white"
                }`}
              >
                {plan.cta}
              </Link>

              {/* Outcomes */}
              <div className="mt-6 border-t border-gray-800 pt-6">
                <p className="text-xs uppercase tracking-wide text-gray-400">Expected Results</p>
                <ul role="list" className="mt-3 space-y-2 text-sm leading-6 text-gray-200">
                  {plan.outcomes.map((o) => (
                    <li key={o} className="flex gap-x-3">
                      <CheckIcon className="h-5 w-5 flex-none text-emerald-400" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="mt-6 border-t border-gray-800 pt-6">
                <p className="text-xs uppercase tracking-wide text-gray-400">Included Features</p>
                <ul role="list" className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-5 w-5 flex-none text-indigo-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risk reducer */}
              <p className="mt-6 text-[12px] text-gray-400">
                90-day growth guarantee: if we’re not tracking toward agreed lead goals, we’ll rework the plan at no
                extra cost.
              </p>
            </motion.div>
          ))}
        </div>

        {/* Rationale / Comparison nudge */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-800 p-6 bg-gray-900/30">
            <h4 className="text-sm font-semibold uppercase text-gray-300">Why not a one-time freelancer?</h4>
            <p className="mt-2 text-sm text-gray-400">
              One-off builds go stale. We continuously optimize SEO, content, and Google Business Profile so you keep
              ranking — which means more leads and long-term growth.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 p-6 bg-gray-900/30">
            <h4 className="text-sm font-semibold uppercase text-gray-300">Clear cost options</h4>
            <p className="mt-2 text-sm text-gray-400">
              Pay Upfront gives you a lower monthly rate with a one-time onboarding fee. The 12-Month Plan spreads costs
              to reduce upfront spend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
