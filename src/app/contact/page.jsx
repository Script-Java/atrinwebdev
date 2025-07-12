"use client";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Contact from "../components/contact";
import { FiPhoneCall, FiFileText } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5"; // Correct import for the rocket icon

export default function ContactPage() {
  const processSteps = [
    {
      icon: <FiPhoneCall size={24} />,
      title: "Discovery Call",
      description: "Schedule a free, no-obligation call with us to discuss your project, goals, and vision in detail."
    },
    {
      icon: <FiFileText size={24} />,
      title: "Proposal & Agreement",
      description: "We'll provide a detailed, transparent proposal outlining the scope, timeline, and pricing. Once approved, we'll sign the agreement to get started."
    },
    {
      icon: <IoRocketOutline size={24} />, // Replaced FiRocket with the correct icon
      title: "Project Kickoff",
      description: "Our team gets to work! We'll begin the design and development process, keeping you updated every step of the way."
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
            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">
              Contact Us
            </h2>
            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
              Let's Build Together
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
              Have a project in mind or just want to learn more? We're here to
              help you achieve your business goals. Reach out today.
            </p>
          </motion.div>

          {/* Contact Form Component */}
          <div className="max-w-screen-lg mx-auto">
            <Contact />
          </div>

          {/* "How to Get Started" Process Section */}
          <div className="py-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-semibold">Our Simple Process</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Getting started on your project is straightforward and transparent.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] p-8 text-center rounded-3xl ring-1 ring-indigo-500/30"
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

        </div>
      </div>
      <Footer />
    </>
  );
}
