"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Pricing from '../components/pricing';
import { FiClipboard, FiCode } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5"; // Correct import for the rocket icon

export default function PricingPage() {
  
  const processSteps = [
    {
      icon: <FiClipboard size={24} />,
      title: "Onboarding & Discovery",
      description: "Once you've selected your plan, we'll schedule a kickoff call to dive deep into your business, goals, and vision."
    },
    {
      icon: <FiCode size={24} />,
      title: "Design & Development",
      description: "Our team gets to work, crafting your new website and digital strategy. We'll provide regular updates so you're always in the loop."
    },
    {
      icon: <IoRocketOutline size={24} />, // Replaced FiRocket with the correct icon
      title: "Review & Launch",
      description: "You'll have the chance to review everything and provide feedback. Once you give the final approval, we launch your new online presence!"
    }
  ];

  return (
      <>
      <Navbar />
      <div className="bg-black text-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="pt-16">
                <Pricing />
            </div>

            <div className="py-28">
                <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mb-12"
                >
                <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Process</h2>
                <p className="mt-2 text-3xl md:text-4xl font-semibold">What Happens Next?</p>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Our streamlined process ensures a smooth journey from payment to launch.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {processSteps.map((step, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30"
                    >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    </motion.div>
                ))}
                </div>
            </div>
        </div>
      </div>
      <Footer />
      </>
  );
}
