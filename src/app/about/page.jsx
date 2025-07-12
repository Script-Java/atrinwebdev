"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Importing icons from the react-icons library
import { FiZap, FiHeart, FiEye } from "react-icons/fi";

// Placeholder for your profile image
import profileImage from "../assets/logo/logo-white.png"; // Make sure to replace with your actual image path

export default function AboutPage() {
    const values = [
        {
            icon: <FiHeart size={24} />,
            title: "Client Partnership",
            description: "We're more than just a vendor; we're your dedicated digital partner. Your success is our success, and we're committed to building long-term relationships based on trust and real results."
        },
        {
            icon: <FiZap size={24} />,
            title: "Innovation & Quality",
            description: "We leverage the latest technologies and design trends to build websites that are not only beautiful but also fast, secure, and built to the highest standards of quality."
        },
        {
            icon: <FiEye size={24} />,
            title: "Transparency & Honesty",
            description: "We believe in clear, straightforward communication. From our pricing to our process, you'll always know what to expect. No hidden fees, no confusing jargon—just honest guidance."
        }
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Story</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Your Local Partner in Digital Growth
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        We're a McKinney-based web development agency passionate about helping local businesses thrive in the digital world.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <div className="py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image src={profileImage} alt="Founder of the company" width={500} height={500} className="rounded-3xl object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4">From Local Vision to Digital Reality</h2>
                        <p className="text-gray-300 mb-4">
                            I founded this agency with a simple mission: to provide small and medium-sized businesses in North Texas with the high-quality, effective web solutions they deserve. Too often, local businesses are underserved by large, impersonal agencies or unreliable freelancers.
                        </p>
                        <p className="text-gray-400">
                            We're here to change that. By combining our deep understanding of the local market with our expertise in modern web development and SEO, we create digital experiences that not only look great but also drive tangible results for your bottom line. We're your neighbors, and we're invested in your success.
                        </p>
                    </motion.div>
                </div>


                {/* Our Values Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Core Values</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">These principles guide every project we undertake.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                                viewport={{ once: true }}
                                className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Partner With Us?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's build a digital presence that reflects the quality of your business.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Get In Touch
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer />
        </>
    )
}
