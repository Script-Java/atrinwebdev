"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// Importing icons from the react-icons library
import { FiCode, FiTrendingUp, FiShoppingCart, FiEdit } from "react-icons/fi";

export default function McKinneyPageClient() {
  // Array for the core web development services offered
  const mckinneyServices = [
    {
      icon: <FiCode size={24} />,
      title: "WordPress Development McKinney",
      description:
        "We build powerful, easy-to-manage websites using WordPress. You get a stunning, custom design that you can actually update yourself, no tech skills required.",
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Local SEO Services McKinney TX",
      description:
        "Become the go-to choice in McKinney. We optimize your website so local customers find you on Google right when they need your services.",
    },
    {
      icon: <FiShoppingCart size={24} />,
      title: "E-commerce Website Design McKinney",
      description:
        "Ready to sell online? We create secure and user-friendly online stores that make it simple for customers to buy from you 24/7.",
    },
    {
      icon: <FiEdit size={24} />,
      title: "Content & Brand Identity",
      description:
        "Establish a memorable brand with a professional logo and clear, persuasive content that resonates with the McKinney community.",
    },
  ];

  // Array for the key benefits of having a professional website in McKinney
  const benefits = [
    {
      title: "Connect With a Growing Community",
      description:
        "As McKinney grows, a professional website helps you connect with the new families and businesses looking for local experts they can trust.",
    },
    {
      title: "Stand Out from the Competition",
      description:
        "From the historic downtown square to the newest developments, a modern website ensures your business stands out and captures attention.",
    },
    {
      title: "A True Local Partner",
      description:
        "We're not a faceless corporation. We understand the North Texas market because we're part of it, and we're deeply invested in your success.",
    },
  ];

  return (
    <>
      {" "}
      <div className="py-20 px-6 bg-base-100 text-white font-sans">
        <div className="max-w-screen-xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center pt-16 pb-20"
          >
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">
              Get Expert McKinney Web Development That Works.
            </h2>
            <h1 className="mt-2 text-4xl md:text-6xl uppercase font-bold mb-4 tracking-wider">
              Stop Losing Customers to a Broken Website.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-8">
              Your business is your passion. But in a fast-growing city like
              McKinney, an outdated or invisible website means you're missing
              out on customers every single day. We build websites that not only
              look great but also work hard to grow your business.
            </p>
          </motion.div>

          {/* Our Services for McKinney Section */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Your Complete Web Development Services in McKinney
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                We provide a full suite of digital services to build your online
                foundation and fuel your growth.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mckinneyServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-5 text-indigo-400 bg-indigo-900/20 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">
                Why a Professional Website is Crucial in McKinney
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                In a dynamic and close-knit community, a strong digital presence
                is your key to sustainable success.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                >
                  <h3 className="text-xl font-bold mb-3 text-indigo-400">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
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
              Ready for a Website That Helps You Grow?
            </h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
              Let's have a simple, no-pressure chat about your business goals
              and how a professional website can help you achieve them.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-600 px-10 py-4 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-wide transition-transform transform hover:scale-105"
              >
                Schedule Your Free Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
