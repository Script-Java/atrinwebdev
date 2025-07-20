"use client";

import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
  // State for form data, budget field removed
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    service: ""
  });

  // State for form submission status
  const [status, setStatus] = useState("");

  // Handles changes in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // API endpoint for form submission
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("Thank you! Your message has been sent.");
        // Clear the form on successful submission, budget field removed
        setFormData({ name: "", email: "", message: "", phone: "", service: "" });
      } else {
        setStatus(result.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <section className="py-20 px-6 bg-base-100 text-white" id="contact">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Contact Us</h2>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold mb-4">Get In Touch</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
            Have a question or some feedback? We're here to help businesses in McKinney and North Dallas succeed online. Reach out today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Cards Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 bg-[#0b0b0b] p-6 h-full rounded-3xl ring-1 ring-indigo-500/30"
          >
            {[{
              icon: <FaWhatsapp className="text-indigo-400 text-2xl" />, title: "Chat on WhatsApp", description: "Have a quick question? Send us a message for a fast response.", button: "Start a Chat", link: "https://api.whatsapp.com/send/?phone=14699013579&text&type=phone_number&app_absent=0"
            }, {
              icon: <FaEnvelope className="text-indigo-400 text-2xl" />, title: "Send an Email", description: "Prefer email? Send us your project details and we'll get back to you promptly.", button: "Email Us", link: "mailto:info@atrinwebdev.com"
            }, {
              icon: <FaCalendarAlt className="text-indigo-400 text-2xl" />, title: "Book a Discovery Call", description: "Schedule a complimentary call to discuss your project goals in detail.", button: "Schedule Now", link: "https://calendar.app.google/G9XbaJhPBDoidcuMA"
            }].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="border-t border-indigo-500/30 p-6 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  {card.icon}
                  <div>
                    <h2 className="font-bold uppercase text-sm mb-1">{card.title}</h2>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </div>
                </div>
                <Link href={card.link} className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 w-full text-center mt-4" target="_blank" rel="noopener noreferrer">
                  {card.button}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 bg-[#0b0b0b] p-8 h-full justify-between rounded-3xl ring-1 ring-indigo-500/30"
          >
            <h2 className="text-xl uppercase mb-2 font-semibold">Send Us a Message</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-indigo-500/50 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g., John Doe" required />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="p-3 bg-base-100 text-white border border-indigo-500/50 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="(555) 123-4567" required />
              </div>
              <div className="flex flex-col w-full md:col-span-2">
                <label className="text-sm mb-1">Email Address</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="p-3 bg-base-100 text-white border border-indigo-500/50 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="you@example.com" required />
              </div>
              <div className="flex flex-col w-full md:col-span-2">
                <label className="text-sm mb-1">How can we help?</label>
                <input name="service" value={formData.service} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-indigo-500/50 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="e.g., General Question, Support" required />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-sm mb-1">Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full p-3 bg-base-100 text-white border border-indigo-500/50 rounded-md placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Please provide some details..." required />
            </div>

            <button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full">Send Message</button>
            {status && <p className="text-sm text-center mt-2">{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
