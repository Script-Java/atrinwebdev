"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiCode, FiTrendingUp, FiBriefcase, FiStar } from "react-icons/fi";

export default function FriscoWebDevelopment() {
    // Content updated with SEO-focused, user-centric copy
    const friscoServices = [
        {
            icon: <FiCode size={24} />,
            title: "Custom Small Business Website Frisco",
            description: "Get a professional website that works as hard as you do, designed specifically to attract Frisco customers without the technical headaches."
        },
        {
            icon: <FiTrendingUp size={24} />,
            title: "Local SEO Services Frisco TX",
            description: "We help you show up on Google when local customers search for your services, turning online searches into real-world business."
        },
        {
            icon: <FiBriefcase size={24} />,
            title: "E-Commerce That's Simple",
            description: "Ready to sell online? We build secure, easy-to-manage online stores that make the first sale as simple as the thousandth."
        },
        {
            icon: <FiStar size={24} />,
            title: "A Frisco Web Developer in Your Corner",
            description: "You get more than a website; you get a dedicated local partner who understands the Frisco market and is invested in your success."
        }
    ];

    // Content updated to address specific pain points and benefits for a Frisco business owner
    const benefits = [
        { title: "Connect With Your Community", description: "A professional online presence helps you connect with the families and businesses that make Frisco a great place to live and work." },
        { title: "Stand Out in a Competitive Market", description: "As Frisco grows, a strong website ensures you stand out from the competition and capture new opportunities near The Star and beyond." },
        { title: "A True Local Partner", description: "We understand the North Texas market because we're part of it. Get personalized service from a team that's as passionate about your business as you are." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Your Local Frisco Web Design Partner</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        In a City of Champions, Your Business Deserves a Winning Website
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        You're building a great business in Frisco. We build the websites that help you grow. Simple, effective, and stress-free Frisco web design for passionate small business owners like you.
                    </p>
                </motion.div>

                {/* Our Services for Frisco Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Your Simple Path to a Professional Website</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We handle the tech so you can focus on what you do best—running your business.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {friscoServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">Why a Great Website is Key in Frisco</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">In a fast-growing city, a strong digital presence isn't a luxury—it's essential for success.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready for a Website That Works as Hard as You Do?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's have a simple, no-pressure chat about your business goals. We'll give you a clear, straightforward quote with no hidden fees or surprises.</p>
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
