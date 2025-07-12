"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiTrendingUp, FiMapPin, FiEdit3, FiBarChart2 } from "react-icons/fi";

export default function SeoOptimization() {
    const seoServices = [
        {
            icon: <FiTrendingUp size={24} />,
            title: "On-Page SEO",
            description: "We optimize every element of your website—from content and keywords to meta tags and site speed—to meet Google's highest standards."
        },
        {
            icon: <FiMapPin size={24} />,
            title: "Local SEO",
            description: "We put your business on the map. Through Google Business Profile optimization and local citation building, we help local customers find you."
        },
        {
            icon: <FiEdit3 size={24} />,
            title: "Content Creation",
            description: "High-quality, relevant blog posts and page content that establishes you as an industry authority and attracts organic traffic."
        },
        {
            icon: <FiBarChart2 size={24} />,
            title: "Analytics & Reporting",
            description: "Transparent, easy-to-understand monthly reports that track your keyword rankings, traffic, and progress towards your goals."
        }
    ];

    const benefits = [
        { title: "Increase Website Traffic", description: "Attract more qualified visitors who are actively searching for your products and services." },
        { title: "Generate More Leads", description: "A top ranking on Google means more calls, more contact form submissions, and more customers." },
        { title: "Build Brand Credibility", description: "Ranking high in search results builds trust and positions you as a leader in your local market." },
    ];

    return (
        <>
        <Navbar></Navbar>
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Search Engine Optimization</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Get Found On Google
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        A beautiful website is only effective if customers can find it. Our SEO services are designed to boost your visibility, attract more traffic, and generate more leads.
                    </p>
                </motion.div>

                {/* Our SEO Services Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">What We Do</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Our comprehensive SEO strategy covers every angle to ensure your business ranks higher and grows faster.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {seoServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">The Benefits of SEO</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Investing in SEO is investing in the long-term, sustainable growth of your business.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Climb the Ranks?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's build a custom SEO strategy that puts your business in front of the customers you want.</p>
                    <div className="mt-8">
                        <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Explore Our SEO Plans
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
