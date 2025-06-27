"use client";

import { motion } from "framer-motion";

export default function Faq() {
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We specialize in custom website development, SEO optimization, and conversion-focused digital strategies for startups and small businesses.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Project timelines vary depending on the scope, but most websites are completed within 2-4 weeks.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes! We provide maintenance packages and continued support to ensure your site stays up to date and secure.",
    },
    {
      question: "Can you redesign my current website?",
      answer:
        "Absolutely. We can refresh your existing website to align with modern design standards and improve performance.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-base-100 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-screen-md mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-lg">
          Got questions? We've got answers. Here's what most clients ask us
          before getting started.
        </p>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="collapse collapse-plus border border-white/20 bg-[#0b0b0b] transition-all duration-300 hover:border-white"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium text-white">
              {faq.question}
            </div>
            <div className="collapse-content text-sm text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
