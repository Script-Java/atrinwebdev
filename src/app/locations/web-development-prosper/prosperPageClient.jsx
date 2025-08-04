// src/app/components/prosperPageClient.jsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiCode, FiTrendingUp, FiBriefcase, FiStar } from "react-icons/fi";

export default function ProsperPageClient() {
    const prosperServices = [
        {
            icon: <FiCode size={24} />,
            title: "Premium Custom Web Design",
            description: "In a town known for quality, your website should be no exception. We build premium, custom websites that reflect the high standards of your Prosper business."
        },
        {
            icon: <FiTrendingUp size={24} />,
            title: "Local SEO for a Growing Market",
            description: "Capture the influx of new residents and businesses. We optimize your site to ensure you are the first choice for customers searching for services in Prosper."
        },
        {
            icon: <FiBriefcase size={24} />,
            title: "E-Commerce & Boutique Solutions",
            description: "Launch a sophisticated online store. We create secure and elegant e-commerce platforms perfect for boutiques and service providers in the Prosper area."
        },
        {
            icon: <FiStar size={24} />,
            title: "Your Dedicated Local Partner",
            description: "Get more than a website—get a partner. We understand the unique opportunities in Prosper and are committed to your long-term growth and success."
        }
    ];

    const benefits = [
        { title: "Establish Your Brand Early", description: "In one of DFW's fastest-growing towns, a strong digital presence from the start is crucial for capturing market share and building a loyal customer base." },
        { title: "Attract High-Value Clients", description: "A professional, high-end website signals quality and trustworthiness, helping you connect with the affluent clientele in the Prosper community." },
        { title: "A Foundation for the Future", description: "We build scalable websites that grow with your business, ensuring your digital presence is ready for tomorrow's opportunities." },
    ];

    return (
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Web Development for Prosper, TX</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Build a Website as Ambitious as Your Business
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        In a community defined by growth and excellence, your online presence needs to lead the pack. We build premium websites for Prosper businesses ready to thrive.
                    </p>
                </motion.div>

                {/* Our Services for Prosper Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Services for Prosper</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A complete suite of digital services to establish your brand and fuel your growth in a booming market.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {prosperServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">Why a Professional Website is Your Key to Success in Prosper</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">In a fast-growing town, a strong digital presence isn't a luxury—it's your most important investment.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Grow Your Business in Prosper?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's discuss how we can build a powerful online presence for your Prosper-based business.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Get Your Free Quote
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
