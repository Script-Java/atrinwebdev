"use client";

import { motion } from "framer-motion";
import { useState } from "react"; 
import Link from "next/link";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Faq() {
  // Using state to control which FAQ item is open
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer for businesses in the McKinney area?",
      answer:
        "We specialize in creating custom websites, implementing targeted local SEO, and managing Google Ads campaigns specifically for businesses in McKinney, Frisco, and the greater North Dallas area. Our goal is to build a powerful online presence that attracts local customers.",
    },
    {
      question: "What is your process and how long does a typical project take?",
      answer:
        "Our process involves four key stages: Discovery, Design, Development, and Launch. We work closely with you at each step. While every project is unique, a standard business website is typically designed and launched within 3-6 weeks.",
    },
    {
      question: "Why should I choose a local developer over a large national agency?",
      answer:
        "As a local McKinney-based developer, we have a deep understanding of the North Texas market. We offer personalized, one-on-one service and are invested in the success of our community's businesses. We're your neighbors, not just another vendor.",
    },
    {
      question: "How much does a new website cost?",
      answer:
        "We offer several packages to fit different business needs and goals. For a detailed breakdown, please visit our Pricing page. We believe in transparency and providing clear, upfront value for your investment.",
    },
    {
      question: "What happens after my website is launched?",
      answer:
        "Our partnership doesn't end at launch. We offer ongoing website maintenance and support packages to handle security, updates, and backups, ensuring your digital investment remains secure and performs optimally long-term.",
    },
  ];

  // Function to toggle the accordion
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-base-100 text-white" id="faq">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-screen-md mx-auto text-center mb-12"
      >
        {/* ACCESSIBILITY FIX: Changed h2 to a p and h1 to an h2 for correct semantic order */}
        <p className="text-base font-semibold leading-7 text-indigo-400 uppercase">FAQ</p>
        <h2 className="mt-2 text-3xl uppercase md:text-5xl font-semibold mb-4">
          Your Questions, Answered
        </h2>
        <p className="text-gray-400 text-lg mt-6">
          Straightforward answers for McKinney & DFW businesses ready to grow their online presence.
        </p>
      </motion.div>

      <div className="max-w-screen-lg mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0b0b0b] rounded-xl ring-1 ring-indigo-500/30"
          >
            {/* ACCESSIBILITY FIX: Changed the clickable div to a semantic <button> */}
            <button
              className="w-full flex justify-between items-center text-left p-6"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              {/* ACCESSIBILITY FIX: The h3 is now correctly nested under the h2 section title */}
              <h3 className="text-lg font-medium text-white">
                {faq.question}
              </h3>
              <RiArrowDownSLine 
                className={`text-indigo-400 text-2xl transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} 
                aria-hidden="true" 
              />
            </button>
            {openIndex === idx && (
              <motion.div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: '-1rem' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="p-6 pt-0 text-sm text-gray-300">{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase" href="/faq">
          Explore Our Full FAQ
        </Link>
      </div>
    </section>
  );
}
