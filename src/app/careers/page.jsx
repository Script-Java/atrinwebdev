"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FiUserCheck, FiTrendingUp, FiDollarSign, FiZap } from "react-icons/fi";

export default function HiringPage() {
    const responsibilities = [
        "Actively prospect and identify new business leads in the North Dallas area.",
        "Conduct discovery calls to understand the needs of small business owners.",
        "Present our web design and SEO packages as effective solutions.",
        "Build and maintain strong client relationships.",
        "Manage your sales pipeline independently."
    ];

    const qualifications = [
        "Proven experience in B2B sales, preferably in tech or marketing.",
        "A self-starter with the discipline to work remotely and manage your own schedule.",
        "Excellent communication and negotiation skills.",
        "A strong interest in helping small businesses succeed online.",
        "Based in or familiar with the DFW market (McKinney, Frisco, Plano, etc.)."
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Join Our Team</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        Remote Sales Specialist
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        We are looking for a motivated 1099 sales professional to partner with us in helping North Texas businesses grow.
                    </p>
                </motion.div>

                {/* Main Content Section */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left Column - Job Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30"
                    >
                        <h2 className="text-2xl font-bold mb-6">The Opportunity</h2>
                        <p className="text-gray-300 mb-4">
                            As a Digital Solutions Sales Consultant, you will be the driving force behind our growth. You'll connect with local small business owners, understand their challenges, and present our suite of web design, SEO, and digital marketing services as the solution. This is a fully remote, 1099 contract role perfect for a self-motivated individual who wants to build a significant income stream with uncapped potential.
                        </p>
                        
                        <h3 className="text-xl font-semibold mt-8 mb-4">Key Responsibilities</h3>
                        <ul className="space-y-2 text-gray-400">
                            {responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <FiUserCheck className="text-indigo-400 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                         <h3 className="text-xl font-semibold mt-8 mb-4">Ideal Candidate</h3>
                        <ul className="space-y-2 text-gray-400">
                            {qualifications.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <FiZap className="text-indigo-400 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                    </motion.div>

                    {/* Right Column - Compensation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <FiDollarSign className="text-indigo-400 text-3xl" />
                            <h2 className="text-2xl font-bold">Compensation</h2>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">This is a 100% commission-based 1099 contract role.</p>
                        
                        <div className="border-t border-indigo-500/30 pt-4">
                            <h4 className="font-semibold text-lg text-indigo-300">10% Recurring Commission</h4>
                            <p className="text-gray-400 mt-1 text-sm">
                                Earn a 10% commission on the monthly payment from every client you sign, for the **entire lifetime** of that client. This is your opportunity to build a stable, long-term monthly income.
                            </p>
                        </div>

                        <div className="border-t border-indigo-500/30 pt-4 mt-4">
                            <h4 className="font-semibold text-lg text-indigo-300">Upfront Commission</h4>
                            <p className="text-gray-400 mt-1 text-sm">
                                In addition to recurring revenue, you will earn a generous one-time commission on any setup or onboarding fees for our higher-tier plans.
                            </p>
                        </div>
                         <div className="border-t border-indigo-500/30 pt-4 mt-4">
                            <h4 className="font-semibold text-lg text-indigo-300">Uncapped Earning Potential</h4>
                            <p className="text-gray-400 mt-1 text-sm">
                                There is no limit to what you can earn. Your income is a direct reflection of your hard work and success.
                            </p>
                        </div>

                    </motion.div>
                </div>

                {/* Call to Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center py-20"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold">Ready to Build With Us?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">If you're a passionate sales professional ready for a flexible, high-reward opportunity, we want to hear from you.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Apply Now
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
        <Footer />
        </>
    )
}
