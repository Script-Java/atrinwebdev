"use client"; // ✅ Enables smooth scrolling in Next.js App Router

import Image from "next/image";
import img1 from "../assets/services/1.jpg";
import img2 from "../assets/services/2.jpg";
import img3 from "../assets/services/3.jpg";

const Services = () => {
  // Function for smooth scrolling to the "contact" section
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="services" className="bg-black">
      <h1 className="text-6xl text-center pt-20">Our Services</h1>
      <p className="text-center text-xl pt-4 pb-20">
        Want to elevate your online presence? Let’s build, rank, and grow your business today.
      </p>

      <div className="flex flex-wrap space-x-4 items-start justify-center p-4">
        {/* Custom Website Development */}
        <div className="card bg-base-100 pt-4 w-96 shadow-xl">
          <figure>
            <Image src={img1} alt="Custom Website Development" />
          </figure>
          <div className="card-body bg-base-200">
            <h2 className="card-title">Custom Website Development</h2>
            <p>
              Your website is your brand’s digital storefront, and we make sure it stands out. 
              At AtrinWebDev, we build custom, high-performance websites that are visually stunning, 
              mobile-friendly, and optimized for speed. Whether you need a business website, eCommerce store, 
              or a custom web app, we craft solutions that engage users and drive results.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={scrollToContact}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* SEO and Digital Growth Strategies */}
        <div className="card pt-4 bg-base-100 w-96 shadow-xl">
          <figure>
            <Image src={img2} alt="SEO and Digital Growth Strategies" />
          </figure>
          <div className="card-body bg-base-200">
            <h2 className="card-title">SEO and Digital Growth Strategies</h2>
            <p>
              A beautiful website is useless if no one can find it. Our SEO strategies ensure your site ranks 
              high on search engines, attracting the right audience. We handle keyword optimization, on-page SEO, 
              local SEO, and technical SEO, helping businesses increase traffic, generate leads, and stay ahead of the competition.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={scrollToContact}>
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Ad Management and Lead Generation */}
        <div className="card pt-4 bg-base-100 w-96 shadow-xl">
          <figure>
            <Image src={img3} alt="Ad Management and Lead Generation" />
          </figure>
          <div className="card-body bg-base-200">
            <h2 className="card-title">Ad Management and Lead Generation</h2>
            <p>
              We create and manage high-converting ad campaigns that put your brand in front of the right people. 
              Whether it’s Google Ads, Facebook Ads, or targeted social media campaigns, we optimize every step—from 
              audience targeting to conversion tracking—to maximize your return on investment.
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-6" onClick={scrollToContact}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
