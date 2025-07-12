"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiEdit, FiEye, FiHeart, FiAward } from "react-icons/fi";

export default function LogoDesign() {
    const logoServices = [
        {
            icon: <FiEdit size={24} />,
            title: "Custom Logo Concepts",
            description: "We don't use templates. We create multiple unique logo concepts tailored to your brand's personality, mission, and target audience."
        },
        {
            icon: <FiEye size={24} />,
            title: "Brand Style Guides",
            description: "Receive a comprehensive style guide detailing your color palette, typography, and logo usage rules to ensure brand consistency everywhere."
        },
        {
            icon: <FiHeart size={24} />,
            title: "Vector & File Formats",
            description: "Get your final logo in all the professional formats you'll ever need (AI, EPS, SVG, PNG, JPG) for print, web, and social media."
        },
        {
            icon: <FiAward size={24} />,
            title: "Brand Refresh",
            description: "Have an existing logo that feels outdated? We can modernize and refresh your brand identity while retaining your core recognition."
        }
    ];

    const benefits = [
        { title: "Make a Strong First Impression", description: "Your logo is the first thing customers see. A professional design builds instant trust and credibility." },
        { title: "Build Brand Recognition", description: "A memorable logo makes your business stand out from the competition and stick in the minds of your customers." },
        { title: "Project Professionalism", description: "A high-quality logo shows you take your business seriously and are committed to quality in every detail." },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Logo Design & Branding</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Craft Your Visual Identity
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        Your logo is the face of your brand. We design memorable, professional logos that capture your essence and connect with your audience.
                    </p>
                </motion.div>

                {/* Our Logo Services Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Design Philosophy</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We combine artistry with strategy to create a logo that is not only beautiful but also a powerful business asset.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {logoServices.map((service, index) => (
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
                        <h2 className="text-3xl md:text-4xl font-semibold">The Value of a Professional Logo</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A great logo is more than an image; it's a strategic tool for business growth.</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Define Your Brand?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's create a logo that tells your story and sets you apart from the competition.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Start Your Design Project
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
