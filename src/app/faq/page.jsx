"use client";

import { motion } from "framer-motion";
import { useState } from "react"; 
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { RiArrowDownSLine } from "react-icons/ri";

export default function FaqPage() {
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
        "Our process involves four key stages: Discovery, Design, Development, and Launch. We work closely with you at each step. While every project is unique, a standard business website is typically designed and launched within 4-6 weeks, depending on the complexity and content readiness.",
    },
    {
      question: "Why should I choose a local developer over a large national agency?",
      answer:
        "As a local developer based in the DFW area, we have a deep understanding of the North Texas market. We offer personalized, one-on-one service and are invested in the success of our community's businesses. We're your neighbors, not just another vendor.",
    },
    {
      question: "How much does a new website cost?",
      answer:
        "We offer several packages to fit different business needs and goals. Our 'Local Visibility' plan, designed for new businesses, starts at a simple monthly rate with no large upfront cost. For a detailed breakdown of all our options, please visit our Pricing page.",
    },
    {
        question: "Do I need to sign a long-term contract?",
        answer: "Our entry-level 'Local Visibility' plan is structured as a 12-month partnership to waive the upfront development cost, making it accessible for new businesses. For our higher-tier plans, we offer the flexibility of both a 12-month term or a standard month-to-month agreement with an onboarding fee."
    },
    {
      question: "What happens after my website is launched?",
      answer:
        "Our partnership doesn't end at launch. All of our monthly plans include ongoing website hosting, security, maintenance, and support to handle security, updates, and backups, ensuring your digital investment remains secure and performs optimally long-term.",
    },
     {
      question: "Will I be able to update the website myself?",
      answer:
        "Absolutely. We build most of our websites on user-friendly Content Management Systems (CMS) like WordPress. Upon launch, we provide you with the training and resources needed to make basic content updates, such as changing text or adding blog posts, on your own."
    }
  ];

  // Function to toggle the accordion
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Navbar />
    <div className="py-20 px-6 bg-base-100 text-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
        >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Frequently Asked Questions</h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                Your Questions, Answered
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                Find straightforward answers to common questions about our web design, SEO, and digital marketing services for North Texas businesses.
            </p>
        </motion.div>

        {/* FAQ Accordion Section */}
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
                <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => handleToggle(idx)}
                >
                <h3 className="text-lg font-medium text-white">
                    {faq.question}
                </h3>
                <RiArrowDownSLine className={`text-indigo-400 text-2xl transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </div>
                {openIndex === idx && (
                <motion.div
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

        {/* Call to Action Section */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-20 mt-10"
        >
            <h2 className="text-3xl md:text-4xl font-semibold">Still Have Questions?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">We're here to help. Reach out to us directly to discuss your project and get the answers you need.</p>
            <div className="mt-8">
                <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                    Contact Us
                </Link>
            </div>
        </motion.div>

      </div>
    </div>
    <Footer />
    </>
  );
}
