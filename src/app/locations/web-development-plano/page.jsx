"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiCode, FiTrendingUp, FiBriefcase, FiStar } from "react-icons/fi";

export default function PlanoWebDevelopment() {
    // Rewritten service descriptions for better SEO and local targeting
    const planoServices = [
        {
            icon: <FiCode size={24} />,
            title: "Custom Plano Web Design",
            description: "Your business is unique. We build custom websites for small businesses in Plano that capture your brand and stand out, from the Downtown Arts District to Legacy West."
        },
        {
            icon: <FiTrendingUp size={24} />,
            title: "Plano SEO Company Services",
            description: "Don't get lost in the crowd. As a dedicated Plano SEO company, we help local customers find you first, driving real foot traffic and online sales."
        },
        {
            icon: <FiBriefcase size={24} />,
            title: "E-Commerce That Converts",
            description: "Ready to sell online? We build powerful, easy-to-manage e-commerce websites that turn Plano browsers into loyal customers."
        },
        {
            icon: <FiStar size={24} />,
            title: "Local Web Developer in Plano, TX",
            description: "Get a dedicated web developer in Plano, TX. We provide ongoing support and updates to ensure your website always performs at its best, helping you grow."
        }
    ];

    // Rewritten benefits to address the target audience's pain points
    const benefits = [
        { title: "Stop Feeling Overwhelmed", description: "Technology shouldn't be a barrier to growth. We handle the complexities of web design so you can focus on running your business." },
        { title: "Compete with the Best in Plano", description: "Whether you're near a corporate hub or in a historic neighborhood, a professional website levels the playing field and makes you look as good as the big guys." },
        { title: "A Partner Invested in Your Success", description: "We're not just a vendor; we're your local digital partner. We succeed when you succeed, offering straightforward advice and real results." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Your Local Plano Web Design Partner</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        A Website That Works as Hard as You Do
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        In a city as dynamic as Plano, your business deserves a website that captures attention and drives growth. Let's build an online presence that makes you proud.
                    </p>
                </motion.div>

                {/* Our Services for Plano Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">A Simple, Results-Focused Process</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We offer clear solutions to help your Plano business thrive online. No jargon, just results.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {planoServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">Finally, a Web Presence That Helps You Grow</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Investing in a professional website for your small business in Plano isn't an expense—it's your greatest asset.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to See What's Possible?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's have a simple, no-pressure chat about your business goals. Your quote is free, and so is the advice.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Start the Conversation
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer />
        </>
    )
}
