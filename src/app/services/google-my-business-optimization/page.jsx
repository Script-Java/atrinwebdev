// src/app/components/gmb-optimization-client.jsx

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiStar, FiMessageSquare, FiCamera } from "react-icons/fi";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function GmbOptimizationClient() {
    const gmbServices = [
        {
            icon: <FiMapPin size={24} />,
            title: "Complete Profile Optimization",
            description: "We fully optimize every section of your GMB profile—from categories and services to photos and attributes—to maximize your visibility in local search and on Google Maps."
        },
        {
            icon: <FiStar size={24} />,
            title: "Review Management Strategy",
            description: "Positive reviews are crucial for ranking. We help you implement a strategy to consistently generate new reviews and professionally respond to all customer feedback."
        },
        {
            icon: <FiMessageSquare size={24} />,
            title: "Weekly Google Posts",
            description: "Keep your profile fresh and engaging. We create and publish weekly Google Posts to highlight your offers, updates, and articles, sending strong activity signals to Google."
        },
        {
            icon: <FiCamera size={24} />,
            title: "Photo & Video Uploads",
            description: "A picture is worth a thousand words. We help you maintain a steady stream of high-quality photos and videos to showcase your work and attract customers."
        }
    ];

    const benefits = [
        { title: "Dominate the 'Map Pack'", description: "A fully optimized profile is the key to ranking in the top 3 local results on Google Maps, driving the most valuable local traffic." },
        { title: "Attract More Local Customers", description: "Your GMB profile is often the first interaction a local customer has with your business. We make sure it's a great one." },
        { title: "Build Trust and Credibility", description: "An active, professional profile with great reviews builds instant trust and makes customers more likely to choose you over the competition." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Local SEO Services</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Google My Business Optimization
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        Turn local searches into loyal customers. We optimize your Google Business Profile to ensure you're the first choice for customers in your service area.
                    </p>
                </motion.div>

                {/* Our GMB Services Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our GMB Management Services</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We handle every aspect of your Google Business Profile to maximize your local impact.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {gmbServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">Why GMB is Your Most Powerful Local Tool</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">For local businesses, a well-managed GMB profile isn't optional—it's essential for growth.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Own Your Local Market?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's build a GMB strategy that puts your business on the map and drives customers to your door.</p>
                    <div className="mt-8">
                        <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            View Our SEO Plans
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
