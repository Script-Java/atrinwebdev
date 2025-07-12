"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";

// A simple checkmark icon component for the feature list
const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function Pricing() {
  // State to manage the pricing toggle (true = 12-Month Term, false = Pay Upfront)
  const [isTermPlan, setIsTermPlan] = useState(true);

  const plans = [
    {
      name: "Local Visibility",
      description: "For new businesses needing a foundational online presence.",
      price: {
        term: "$289",
        upfront: null, // This plan only has a term option
      },
      termLabel: "/ month",
      upfrontLabel: "12-Month Term",
      features: [
        "Up to 5-Page Website",
        "Google Business Profile Setup",
        "On-Page SEO Foundation",
        "Hosting, Security & Maintenance",
        "1 Included Business Email",
      ],
      cta: "Get Started",
      href: "/contact",
      isFeatured: false,
    },
    {
      name: "Growth Engine",
      description: "For established businesses ready to actively increase traffic and leads.",
      price: {
        term: "$709",
        upfront: "$499",
      },
      termLabel: "/ month",
      upfrontLabel: "/ month + $2,500 Onboarding",
      features: [
        "Everything in Local Visibility",
        "Up to 10 Pages",
        "1 Blog Post per Month",
        "Active GMB Management",
        "Monthly Strategy Call",
      ],
      cta: "Choose Plan",
      href: "/contact",
      isFeatured: true,
    },
    {
      name: "Market Accelerator",
      description: "For serious businesses aiming to dominate the local market.",
      price: {
        term: "$1,375",
        upfront: "$999",
      },
      termLabel: "/ month",
      upfrontLabel: "/ month + $4,500 Onboarding",
      features: [
        "Everything in Growth Engine",
        "Up to 20 Pages",
        "2 Blog Posts per Month",
        "Google Ads Management",
        "Weekly Check-in Calls",
      ],
      cta: "Schedule a Call",
      href: "/contact",
      isFeatured: false,
    },
  ];

  return (
    <div className="bg-black text-white py-20 sm:py-28" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl uppercase">
            Simple, Transparent Plans
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Choose the perfect plan to launch and grow your business. No hidden fees, just clear value.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-x-4 rounded-full p-1 bg-gray-900/50 border border-gray-700">
            <button
              onClick={() => setIsTermPlan(false)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${!isTermPlan ? 'bg-indigo-600' : 'hover:bg-gray-700/50'}`}
            >
              Pay Upfront
            </button>
            <button
              onClick={() => setIsTermPlan(true)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 ${isTermPlan ? 'bg-indigo-600' : 'hover:bg-gray-700/50'}`}
            >
              12-Month Plan (Save on Upfront Costs)
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="isolate mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className={`rounded-3xl p-8 ring-1 xl:p-10 ${plan.isFeatured ? 'bg-gray-900/50 ring-2 ring-indigo-500' : 'ring-gray-700'}`}
            >
              <h3 className="text-lg font-semibold leading-8 uppercase">{plan.name}</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">
                  {isTermPlan || !plan.price.upfront ? plan.price.term : plan.price.upfront}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-300">
                  {isTermPlan || !plan.price.upfront ? plan.termLabel : plan.upfrontLabel}
                </span>
              </p>
              <Link
                href={plan.href}
                className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-300 ${plan.isFeatured ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'}`}
              >
                {plan.cta}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
