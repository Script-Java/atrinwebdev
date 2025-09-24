"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FiArrowUpRight } from "react-icons/fi";

// Import your image assets
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
import logo18 from "../assets/img/logos/18.png";
import logo19 from "../assets/img/logos/19.png";
import logo20 from "../assets/img/logos/20.png";

import web1 from "../assets/img/website/1.jpg";
import web2 from "../assets/img/website/2.jpg";
import web3 from "../assets/img/website/3.jpg";
import web4 from "../assets/img/website/4.jpg";
import web5 from "../assets/img/website/5.jpg";
import web6 from "../assets/img/website/6.jpg";
import web7 from "../assets/img/website/7.jpg";
import web8 from "../assets/img/website/8.jpg";
import web9 from "../assets/img/website/9.jpg";
import web10 from "../assets/img/website/12.jpg";
import web11 from "../assets/img/website/13.jpg";

const allWebsites = [
    {
    title: "Falafel & Fin",
    description:
      "This isn't just falafel. It's a flavor explosion crafted from fresh chickpeas, hand-picked herbs, and a secret blend of Mediterranean spices, all fried to golden perfection. Get ready for the perfect crunch.",
    image: web11,
    link: "https://falafelandfin.com/",
    tags: ["Next.Js", "Retail", "Restaurant"]
  },
    {
    title: "Bonita Food Mart",
    description:
      "A commercial Next.Js website for a gas station and retail smoke shop. The site showcases a diverse inventory including fuel, tobacco, vapes, and glassware, all presented with a sleek, urban-themed design.",
    image: web10,
    link: "https://bonitafoodmart.com/",
    tags: ["Next.Js", "Retail", "Food"]
  },
  {
    title: "Anubis Smoke Shop",
    description:
      "Retail smoke shop offering a wide range of tobacco, vapes, glassware, and smoking accessories in a sleek, urban-themed layout.",
    image: web1,
    link: "https://anubissmokeshop.com/",
    tags: ["E-commerce", "Retail", "WordPress"]
  },
  {
    title: "Glass Go LLC",
    description:
      "Auto glass repair and replacement company serving the Dallas area, specializing in windshield services and mobile installations.",
    image: web2,
    link: "https://www.glassgollc.com/",
    tags: ["Service Business", "Automotive", "Local SEO"]
  },
  {
    title: "Texas Five Star Paint & Body",
    description:
      "Collision repair and auto body service provider focused on high-quality paint jobs, dent repairs, and insurance claims assistance.",
    image: web3,
    link: "https://texasfivestarpaintandbody.com/",
    tags: ["Automotive", "Service Business", "Lead Generation"]
  },
  {
    title: "Brilliance Skin",
    description:
      "Skincare brand offering natural and rejuvenating products for all skin types, aimed at promoting confidence and radiant skin.",
    image: web4,
    link: "https://www.brillianceskin.us/",
    tags: ["E-commerce", "Beauty", "Shopify"]
  },
  {
    title: "Bay Area Pa",
    description:
      "Licensed public adjusters helping property owners handle insurance claims and maximize settlements after damage or loss.",
    image: web5,
    link: "https://www.bayareapa.com/",
    tags: ["Professional Services", "Lead Generation"]
  },
  {
    title: "TFSM",
    description:
      "Texas Five Star Marketing provides web development, SEO, and digital marketing solutions tailored for startups and small businesses.",
    image: web6,
    link: "https://texasfivestarmarketing.com/",
    tags: ["Agency", "B2B", "Marketing"]
  },
  {
    title: "DFW Glass Mart",
    description:
      "Residential and commercial glass supplier offering window replacements, custom cuts, and mobile installation services in DFW.",
    image: web7,
    link: "https://www.dfwglassmart.com/",
    tags: ["Service Business", "Commercial", "Local SEO"]
  },
  {
    title: "Glass Pros",
    description:
      "Professional glass replacement company focused on auto glass services, including chip repairs, window replacements, and mobile support.",
    image: web8,
    link: "https://www.glassreplacementpros.com/",
    tags: ["Automotive", "Service Business"]
  },
  {
    title: "Dallas Glass & Auto",
    description:
      "Dallas-based glass repair company handling both auto and residential glass needs with fast service and expert craftsmanship.",
    image: web9,
    link: "https://www.dallasglassandauto.com/",
    tags: ["Automotive", "Local SEO"]
  },
];

const featuredProject = allWebsites[0];
const otherProjects = allWebsites.slice(1);

const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8,
  logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo17, logo18, logo19
];


export default function AllProjectsPage() {
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
                    <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Portfolio</h2>
                    <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                        A Showcase of Our Work
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                        Explore a collection of our recent projects, from custom websites to memorable logos, all crafted to help North Texas businesses succeed.
                    </p>
                </motion.div>

                {/* Featured Project Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30 mb-20"
                >
                    <div className="order-2 lg:order-1">
                        <p className="text-indigo-400 font-semibold mb-2">Featured Project</p>
                        <h2 className="text-3xl font-bold mb-4">{featuredProject.title}</h2>
                        <p className="text-gray-300 mb-6">{featuredProject.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {featuredProject.tags.map(tag => (
                                <span key={tag} className="text-xs uppercase tracking-wider bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <Link href={featuredProject.link} target="_blank" className="inline-flex items-center gap-2 text-white font-semibold group">
                            View Live Site
                            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image src={featuredProject.image} alt={featuredProject.title} width={800} height={480} className="rounded-xl object-cover shadow-2xl shadow-indigo-500/10" />
                    </div>
                </motion.div>

                {/* Other Website Projects - Alternating Layout */}
                <div className="space-y-24">
                    {otherProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className={`order-2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                <p className="text-gray-300 mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs uppercase tracking-wider bg-indigo-900/50 text-indigo-300 px-3 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <Link href={project.link} target="_blank" className="inline-flex items-center gap-2 text-white font-semibold group">
                                    View Live Site
                                    <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </Link>
                            </div>
                            <div className={`order-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <Image src={project.image} alt={project.title} width={800} height={480} className="rounded-xl object-cover" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Logo Wall Section */}
                <div className="py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                         <h2 className="text-3xl md:text-4xl font-semibold">Brand Identities We've Crafted</h2>
                         <p className="text-gray-400 mt-4 max-w-2xl mx-auto">A collection of unique logos designed to give our clients a competitive edge.</p>
                    </motion.div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
                        {logos.map((logo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-center p-4 bg-[#0b0b0b] rounded-2xl ring-1 ring-indigo-500/20 transition hover:ring-indigo-500 hover:scale-105"
                            >
                                <Image src={logo} alt={`Logo ${index + 1}`} width={150} height={150} className="object-contain" />
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
                    <h2 className="text-3xl md:text-4xl font-semibold">Have a Project in Mind?</h2>
                    <p className="text-gray-300 mt-4 max-w-xl mx-auto">Let's discuss how we can bring your vision to life and create something amazing together.</p>
                    <div className="mt-8">
                        <Link href="/contact" className="rounded-md bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase">
                            Start Your Project
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
        <Footer />
        </>
    )
}
