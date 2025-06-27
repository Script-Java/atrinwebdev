"use client";

import { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    budget: "",
    service: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("Message sent!");
        setFormData({ name: "", email: "", message: "", phone: "", budget: "", service: "" });
      } else {
        setStatus(result.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus("Something went wrong.");
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
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Get In Touch</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            We’d love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 bg-[#0b0b0b] p-6 h-full"
          >
            {[{
              icon: <FaWhatsapp className="text-white text-2xl" />, title: "Connect on WhatsApp", description: "Easily reach out to us on WhatsApp to chat about your project.", button: "SEND MESSAGE", link: "https://api.whatsapp.com/send/?phone=14699013579&text&type=phone_number&app_absent=0"
            }, {
              icon: <FaEnvelope className="text-white text-2xl" />, title: "Email Directly", description: "Reach out to us by email to connect with a team member and discuss your project!", button: "EMAIL US", link: "mailto:atrindev@gmail.com"
            }, {
              icon: <FaCalendarAlt className="text-white text-2xl" />, title: "Schedule a Call", description: "Schedule a call with our team today to explore your project goals.", button: "BOOK A CALL", link: "https://calendar.app.google/aCBkFPwuvuttZrFV6"
            }].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-white p-6 flex flex-col justify-between h-[220px]"
              >
                <div className="flex items-start gap-4">
                  {card.icon}
                  <div>
                    <h2 className="font-bold uppercase text-sm mb-1">{card.title}</h2>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </div>
                </div>
                <Link href={card.link} className="border btn border-white w-full py-2 text-xs mt-4" target="_blank">
                  {card.button}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 bg-[#0b0b0b] p-6 h-full justify-between"
          >
            <h2 className="text-xl uppercase mb-2">Project Inquiry</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Your Name</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-white w-full placeholder-gray-400" placeholder="Your Name" required />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Your Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-white w-full placeholder-gray-400" placeholder="Your Phone" required />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Your Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="p-3 bg-base-100 text-white border border-white w-full placeholder-gray-400" placeholder="Your Email" required />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Budget</label>
                <input name="budget" value={formData.budget} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-white w-full placeholder-gray-400" placeholder="$2000" required />
              </div>
              <div className="flex flex-col w-full md:col-span-2">
                <label className="text-sm mb-1">Choose Service</label>
                <input name="service" value={formData.service} onChange={handleChange} type="text" className="p-3 bg-base-100 text-white border border-white w-full placeholder-gray-400" placeholder="Choose Service" required />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-sm mb-1">Tell us about your project</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full p-3 bg-base-100 text-white border border-white placeholder-gray-400" placeholder="Tell us about your project." required />
            </div>

            <button type="submit" className="bg-white text-black py-4 text-sm font-semibold w-full">SEND A MESSAGE</button>
            {status && <p className="text-sm text-center mt-2">{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
