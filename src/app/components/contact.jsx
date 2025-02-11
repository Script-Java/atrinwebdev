"use client";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { FaInstagram, FaFacebook, FaLinkedin  } from "react-icons/fa";
import Link from "next/link";

const Contact = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowToast(true);
        e.target.reset();
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds

        // Meta Pixel Tracking
        if (typeof window !== "undefined" && window.fbq) {
          fbq("track", "Contact");
        }
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  }; // **Fixed: Closing brace added here**

  return (
    <div id="contact" className="bg-black py-40">
      <div className="container bg-base-200  mx-auto p-4">
        <div id="contact">
          <div className="my-20">
            <h3 className="text-5xl lg:text-6xl text-center lg:text-start p-4 my-10">
              Contact Us
            </h3>
            <div className="p-4">
              <p className="text-3xl my-4">Let's Work 🫱🏼‍🫲🏽</p>
              <div className="flex text-3xl space-x-4 p-4">
            <Link href={'https://www.instagram.com/atrinwebdev/'}><FaInstagram/></Link>
            <Link href={'https://www.facebook.com/profile.php?id=61571846047410'}><FaFacebook/></Link>
            <Link href={'https://www.linkedin.com/company/atrinwebdev/'}><FaLinkedin/></Link>
        </div>
              <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input bg-transparent input-bordered w-full"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input bg-transparent input-bordered w-full"
                  required
                />
                <textarea
                  name="message"
                  className="textarea bg-transparent textarea-bordered"
                  placeholder="Message"
                  required
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  Send <IoIosSend className="text-xl" />
                </button>
              </form>
            </div>
          </div>

          {showToast && (
            <div className="toast toast-end toast-top">
              <div className="alert alert-success">
                <span>Message sent successfully.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
