"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// Importing icons from the react-icons library
import { FiLayers, FiCode, FiCheckCircle } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { SiReact, SiNextdotjs, SiWordpress, SiShopify, SiTailwindcss, SiFramer } from "react-icons/si";


export default function WebsiteDevelopment() {
    const processSteps = [
        {
            icon: <FiLayers size={24} />,
            title: "Discovery & Strategy",
            description: "We start by understanding your business, goals, and target audience to create a strategic blueprint for your website."
        },
        {
            icon: <FiCode size={24} />,
            title: "Design & Development",
            description: "Our team brings the vision to life with clean, efficient code and a stunning, user-friendly design that reflects your brand."
        },
        {
            icon: <IoRocketOutline size={24} />,
            title: "Testing & Launch",
            description: "We rigorously test your site across all devices for speed and performance before deploying it live on our secure servers."
        },
        {
            icon: <FiCheckCircle size={24} />,
            title: "Support & Growth",
            description: "After launch, we provide ongoing support and maintenance to ensure your website continues to be a powerful asset for your business."
        }
    ];

    const techStack = [
        { name: "React", icon: <SiReact size={48} /> },
        { name: "Next.js", icon: <SiNextdotjs size={48} /> },
        { name: "WordPress", icon: <SiWordpress size={48} /> },
        { name: "Shopify", icon: <SiShopify size={48} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={48} /> },
        { name: "Framer Motion", icon: <SiFramer size={48} /> },
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Expertise</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Website Development
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        We build more than just websites; we build powerful, high-performance digital experiences designed to convert visitors into customers and drive measurable growth for your business.
                    </p>
                </motion.div>

                {/* Our Process Section */}
                <div className="py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Proven Process</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">From initial concept to final launch, we follow a structured process to ensure your project is a success.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                                viewport={{ once: true }}
                                className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30 hover:ring-indigo-500 transition"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-indigo-400 bg-indigo-900/20 rounded-full">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-400 text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Technology Stack Section */}
                <div className="py-20">
                     <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold">Our Technology Stack</h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We use modern, industry-leading technologies to build fast, secure, and scalable websites.</p>
                    </motion.div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8">
                        {techStack.map((tech, index) => (
                             <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className="text-center flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
                            >
                                {tech.icon}
                                <p className="mt-2 text-sm font-semibold">{tech.name}</p>
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Build Your Digital Future?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's discuss your project and how we can help you achieve your business goals.</p>
                    <div className="mt-8">
                        <Link href="/pricing" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            View Our Plans
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}
