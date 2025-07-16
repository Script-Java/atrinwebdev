"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import {
  FiLayout,
  FiTrendingUp,
  FiSmartphone,
  FiCode,
  FiBriefcase,
  FiStar,
} from "react-icons/fi";


export default function AllenWebDevelopment() {
  // SEO-optimized content for services
  const allenServices = [
    {
      icon: <FiLayout size={24} />,
      title: "A Professional Small Business Website for Allen",
      description:
        "We build clean, modern websites that look great on any device and make it easy for your Allen customers to find exactly what they need.",
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Practical Local SEO Services Allen TX Trusts",
      description:
        "We help you show up on Google when local customers search for your services. No confusing metrics, just more local traffic.",
    },
    {
      icon: <FiSmartphone size={24} />,
      title: "A Website You Can Actually Use",
      description:
        "We ensure your site is simple to update, or we can handle the updates for you. You always stay in control of your business.",
    },
    {
      icon: <FiBriefcase size={24} />,
      title: "E-Commerce Solutions",
      description:
        "Ready to sell online? We create powerful and secure online stores that make it easy for you to manage products and for customers to make purchases.",
    },
  ];

  // Replaced 'benefits' with 'frustrations' for better storytelling
  const frustrations = [
    {
      title: "You’re an Expert in Your Field",
      description:
        "You’re passionate about your work, not a tech wizard. You need a local partner who speaks your language and understands your goals.",
    },
    {
      title: "DIY Builders Delivered Headaches",
      description:
        "'Do-it-yourself' website builders promised simplicity but ended up being complicated, time-consuming, and generic.",
    },
    {
      title: "You Feel Invisible to Local Customers",
      description:
        "You see your competitors showing up on Google for searches in Allen, and you’re not sure why your business isn’t.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="py-20 px-6 bg-base-100 text-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">
              Allen Web Design
            </h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold uppercase mb-4 tracking-wider">
              Your Allen Business Deserves a Website That Works as Hard as You
              Do.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              There's a special pride in Allen. You feel it under the lights at
              Eagle Stadium and see it in the bustling shops at Watters Creek.
              We build websites that reflect the same passion you pour into your
              business every day.
            </p>
          </motion.div>

          {/* Our Services for Allen Section */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Your Friendly, Local Allen Web Developer is Here to Help
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                We focus on what truly matters: creating a professional website
                that brings you more local business. No jargon, just results.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allenServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section repurposed for "Frustrations" */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Feeling Invisible Online? It’s a Common Frustration.
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                If any of these sound familiar, you're in the right place. We're
                here to solve these problems for you.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {frustrations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold">
              Ready for a Website That Makes You Proud?
            </h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
              Let's have a simple, no-pressure conversation about your business.
              We're here to listen and provide a clear, straightforward plan for
              your success.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
              >
                Get My Free, No-Obligation Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
