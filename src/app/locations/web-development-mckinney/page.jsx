"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiCode, FiTrendingUp, FiBriefcase, FiStar } from "react-icons/fi";

export default function McKinneyWebDevelopment() {
    const mckinneyServices = [
        {
            icon: <FiCode size={24} />,
            title: "Custom Web Design",
            description: "We build stunning, responsive websites that capture the unique charm of your McKinney business and provide a seamless experience for your customers."
        },
        {
            icon: <FiTrendingUp size={24} />,
            title: "Local SEO for McKinney",
            description: "Climb the ranks on Google. We optimize your site to attract customers in McKinney, ensuring you're visible when they search for your services."
        },
        {
            icon: <FiBriefcase size={24} />,
            title: "E-Commerce Solutions",
            description: "Ready to sell online? We create powerful and secure online stores that make it easy for you to manage products and for customers to make purchases."
        },
        {
            icon: <FiStar size={24} />,
            title: "Brand & Logo Identity",
            description: "Establish a memorable brand with a professional logo and a cohesive visual identity that resonates with the McKinney community."
        }
    ];

    const benefits = [
        { title: "Connect With Your Community", description: "A professional online presence helps you connect with the families and businesses that make McKinney a great place to be." },
        { title: "Stand Out in a Historic Market", description: "From the downtown square to new developments, a strong website ensures you stand out and capture new opportunities." },
        { title: "A True Local Partner", description: "We understand the North Texas market because we're part of it. Get personalized service from a team that's invested in your success." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Web Development for McKinney, TX</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Serving McKinney Businesses
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        We provide tailored web development and digital marketing solutions to help businesses in McKinney, Texas, thrive online.
                    </p>
                </motion.div>

                {/* Our Services for McKinney Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Services for McKinney</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A complete suite of digital services to build and grow your local presence.</p>
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
                                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-400 text-sm">{service.description}</p>
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
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Why Invest in a Professional Website in McKinney?</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A strong digital presence is key to success in a dynamic and growing community.</p>
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
                                <h3 className="text-xl font-bold mb-3 text-indigo-400">{benefit.title}</h3>
                                <p className="text-gray-300">{benefit.description}</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Grow Your Business in McKinney?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's discuss how we can build a powerful online presence for your McKinney-based business.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Get Your Free Quote
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer />
        </>
    )
}
