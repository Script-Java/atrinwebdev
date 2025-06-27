"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import logo1 from "../assets/img/logos/1.png";
import logo2 from "../assets/img/logos/2.png";
import logo3 from "../assets/img/logos/3.png";
import logo4 from "../assets/img/logos/4.png";
import logo5 from "../assets/img/logos/5.png";
import logo6 from "../assets/img/logos/6.png";
import logo7 from "../assets/img/logos/7.png";
import logo8 from "../assets/img/logos/8.png";
import logo9 from "../assets/img/logos/9.png";
import logo10 from "../assets/img/logos/10.png";
import logo11 from "../assets/img/logos/11.png";
import logo12 from "../assets/img/logos/12.png";
import logo13 from "../assets/img/logos/13.png";
import logo14 from "../assets/img/logos/14.png";
import logo15 from "../assets/img/logos/15.png";
import logo17 from "../assets/img/logos/17.png";

import web1 from "../assets/img/website/1.jpg";
import web2 from "../assets/img/website/2.jpg";
import web3 from "../assets/img/website/3.jpg";
import web4 from "../assets/img/website/4.jpg";
import web5 from "../assets/img/website/5.jpg";
import web6 from "../assets/img/website/6.jpg";
import web7 from "../assets/img/website/7.jpg";
import web8 from "../assets/img/website/8.jpg";
import web9 from "../assets/img/website/9.jpg";

const websites = [
  {
    title: "Anubis Smoke Shop",
    description: "Retail smoke shop offering a wide range of tobacco, vapes, glassware, and smoking accessories in a sleek, urban-themed layout.",
    image: web1,
    link: "https://anubissmokeshop.com/",
  },
  {
    title: "Glass Go LLC",
    description: "Auto glass repair and replacement company serving the Dallas area, specializing in windshield services and mobile installations.",
    image: web2,
    link: "https://www.glassgollc.com/",
  },
  {
    title: "Texas Five Star Paint & Body",
    description: "Collision repair and auto body service provider focused on high-quality paint jobs, dent repairs, and insurance claims assistance.",
    image: web3,
    link: "https://texasfivestarpaintandbody.com/",
  },
  {
    title: "Brilliance Skin",
    description: "Skincare brand offering natural and rejuvenating products for all skin types, aimed at promoting confidence and radiant skin.",
    image: web4,
    link: "https://www.brillianceskin.us/",
  },
  {
    title: "Bay Area Pa",
    description: "Licensed public adjusters helping property owners handle insurance claims and maximize settlements after damage or loss.",
    image: web5,
    link: "https://www.bayareapa.com/",
  },
  {
    title: "TFSM",
    description: "Texas Five Star Marketing provides web development, SEO, and digital marketing solutions tailored for startups and small businesses.",
    image: web6,
    link: "https://texasfivestarmarketing.com/",
  },
  {
    title: "DFW Glass Mart",
    description: "Residential and commercial glass supplier offering window replacements, custom cuts, and mobile installation services in DFW.",
    image: web7,
    link: "https://www.dfwglassmart.com/",
  },
  {
    title: "Glass Pros",
    description: "Professional glass replacement company focused on auto glass services, including chip repairs, window replacements, and mobile support.",
    image: web8,
    link: "https://www.glassreplacementpros.com/",
  },
  {
    title: "Dallas Glass & Auto",
    description: "Dallas-based glass repair company handling both auto and residential glass needs with fast service and expert craftsmanship.",
    image: web9,
    link: "https://www.dallasglassandauto.com/",
  },
];

const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo17,
];

export default function Work() {
  return (
    <section className="py-20 px-6 bg-base-100 text-white" id="projects">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-screen-2xl mx-auto text-center px-4 z-10"
        >
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Our Creative Endeavors
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            We turn innovative ideas into tangible digital experiences. Explore a selection of our recent projects that showcase our dedication to design, functionality, and measurable impact.
          </p>
        </motion.div>

        <div role="tablist" className="tabs tabs-bordered tabs-lg no-animation">
          <input
            type="radio"
            name="projects_tabs"
            role="tab"
            aria-label="Websites"
            className="tab uppercase tracking-wider text-sm border-none"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content border-t border-primary p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {websites.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#0b0b0b] border border-primary p-6 transition hover:scale-[1.02]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{project.description}</p>
                  <Link
                    href={project.link}
                    className="text-white btn btn-outline text-sm font-semibold"
                    target="_blank"
                  >
                    View Website
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <input
            type="radio"
            name="projects_tabs"
            role="tab"
            aria-label="Logos"
            className="tab uppercase tracking-wider text-sm border-none"
          />
          <div role="tabpanel" className="tab-content border-t border-primary p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center bg-[#0b0b0b] border border-primary p-4"
                >
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
