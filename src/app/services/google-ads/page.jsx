"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiTarget, FiPenTool, FiBarChart2, FiZap } from "react-icons/fi";

export default function GoogleAds() {
    const adServices = [
        {
            icon: <FiTarget size={24} />,
            title: "Campaign Strategy & Setup",
            description: "We design a custom Google Ads strategy based on your business goals, target audience, and budget, from keyword research to campaign structure."
        },
        {
            icon: <FiPenTool size={24} />,
            title: "Compelling Ad Copy",
            description: "Our team writes persuasive, high-converting ad copy that grabs attention and encourages clicks from your ideal customers."
        },
        {
            icon: <FiBarChart2 size={24} />,
            title: "Performance Tracking & ROI",
            description: "We continuously monitor your campaign performance, optimizing for key metrics like cost-per-click and conversion rate to maximize your return on investment."
        },
        {
            icon: <FiZap size={24} />,
            title: "Landing Page Optimization",
            description: "We ensure your landing pages are perfectly aligned with your ads, providing a seamless user experience designed to turn clicks into customers."
        }
    ];

    const benefits = [
        { title: "Immediate Visibility", description: "Unlike SEO, Google Ads can place your business at the top of the search results almost instantly." },
        { title: "Highly Targeted Reach", description: "We target users based on specific keywords, locations, demographics, and interests to attract the most qualified traffic." },
        { title: "Maximize Your ROI", description: "With precise tracking and continuous optimization, you get a clear, measurable return on every dollar you spend." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Google Ads Management</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Instant Traffic, Measurable Results
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        Need leads now? Our Google Ads campaigns are designed to drive immediate, high-quality traffic to your website and deliver a clear return on your investment.
                    </p>
                </motion.div>

                {/* Our Ad Services Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">How We Drive Results</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Our strategic approach to paid search ensures your budget is spent efficiently to maximize leads and sales.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {adServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">The Benefits of Google Ads</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">While SEO builds long-term authority, paid search delivers speed and precision.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready for Immediate Growth?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's build a powerful Google Ads campaign that drives results from day one.</p>
                    <div className="mt-8">
                        <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            View Our Ad Management Plans
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
