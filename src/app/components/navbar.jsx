"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiMenu3Fill, RiArrowDownSLine } from "react-icons/ri";
import { usePathname } from 'next/navigation';


// The component will now use your local logo file.
// Make sure the path to your logo is correct.
import logo from "../assets/logo/logo-white.png";

const Navbar = () => {
  // State for the main mobile menu visibility
  const [showMenu, setShowMenu] = useState(false);
  
  // State for desktop dropdown visibility on hover
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  // State for mobile accordion-style dropdowns
  const [showMobileServices, setShowMobileServices] = useState(false);
  const [showMobileLocations, setShowMobileLocations] = useState(false);
  const [showMobileAbout, setShowMobileAbout] = useState(false);

  // Data for the dropdown menus
  const services = [
    { name: "Website Development", href: "/services/website-development" },
    { name: "SEO Optimization", href: "/services/seo-optimization" },
    { name: "Google Ads", href: "/services/google-ads" },
    { name: "Logo Design", href: "/services/logo-design" },
  ];

  const locations = [
    { name: "Plano", href: "/locations/web-development-plano" },
    { name: "McKinney", href: "/locations/web-development-mckinney" },
    { name: "Frisco", href: "/locations/web-development-frisco" },
    { name: "Allen", href: "/locations/web-development-allen" },
  ];
  
  const aboutLinks = [
    { name: "Our Mission", href: "/about", type: 'link' },
    { name: "Pricing", href: "/pricing", type: 'link' },
    { name: "FAQ", href: "/faq", type: 'link' },
    { name: "Blog", href: "/blog", type: 'link' }, // Added Blog link
  ];


  // Function to toggle the main mobile menu
  const menuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  // Close all menus - useful when a link is clicked
  const closeAllMenus = () => {
    setShowMenu(false);
    setShowMobileServices(false);
    setShowMobileLocations(false);
    setShowMobileAbout(false);
  };
  
  const pathname = usePathname();

  // Scroll for single-page links, or navigate if not on homepage
  const scrollToSection = (id) => {
    closeAllMenus();
    
    if (pathname === '/') {
      // If on the homepage, scroll instantly
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
            const yOffset = -80; // Adjust offset for fixed header
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "auto" }); // Changed to "auto" for instant scroll
        }
      }, 100);
    } else {
      // If on another page, navigate to homepage with the hash
      window.location.href = `/#${id}`;
    }
  };


  return (
    <header className="fixed w-full z-50 bg-black bg-opacity-80 backdrop-blur-sm text-white">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto py-3 px-6">
        {/* Logo */}
        <Link href="/" onClick={closeAllMenus} className="flex items-center">
          <Image src={logo} alt="Logo" width={50} height={50} />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center uppercase gap-2">
          <li><Link href="/" className="btn btn-ghost uppercase">Home</Link></li>
          
          {/* Services Dropdown */}
          <li 
            className="relative group"
          >
            <button className="btn btn-ghost flex items-center gap-1 uppercase" onClick={() => scrollToSection('solutions')}>
              Services <RiArrowDownSLine />
            </button>
            <ul className="absolute top-full left-0 pt-2 w-60 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-[#0b0b0b] rounded-lg shadow-xl p-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} onClick={closeAllMenus} className="block px-4 py-2 rounded-md hover:bg-gray-700 w-full text-left uppercase">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </li>

          {/* About Dropdown */}
          <li 
            className="relative group"
          >
            <Link href="/about" className="btn btn-ghost flex items-center gap-1 uppercase">
              About <RiArrowDownSLine />
            </Link>
            <ul className="absolute top-full left-0 pt-2 w-48 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-[#0b0b0b] rounded-lg shadow-xl p-2">
                {aboutLinks.map((item) => (
                  <li key={item.name}>
                    {item.type === 'link' ? (
                      <Link href={item.href} onClick={closeAllMenus} className="block px-4 py-2 rounded-md hover:bg-gray-700 w-full text-left uppercase">
                        {item.name}
                      </Link>
                    ) : (
                      <button onClick={() => scrollToSection(item.href)} className="block px-4 py-2 rounded-md hover:bg-gray-700 w-full text-left uppercase">
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </div>
            </ul>
          </li>

          {/* Areas Served Dropdown */}
          <li 
            className="relative group"
          >
            <button className="btn btn-ghost flex items-center gap-1 uppercase">
              Areas Served <RiArrowDownSLine />
            </button>
            <ul className="absolute top-full left-0 pt-2 w-48 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-[#0b0b0b] rounded-lg shadow-xl p-2">
                {locations.map((location) => (
                  <li key={location.name}>
                    <Link href={location.href} onClick={closeAllMenus} className="block px-4 py-2 rounded-md hover:bg-gray-700 w-full text-left uppercase">
                      {location.name}
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </li>
          
          <li><Link href="/projects" className="btn btn-ghost uppercase">Projects</Link></li>
          <li><Link href="/contact" className="btn bg-white text-black hover:bg-black hover:text-white px-6 py-2 rounded-md uppercase">Contact Us</Link></li>
        </ul>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50" onClick={menuToggle}>
          <RiMenu3Fill size={28} className="cursor-pointer" />
        </div>

        {/* Mobile Menu Panel */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
              onClick={menuToggle}
            />
            <ul className="fixed top-0 right-0 w-4/5 max-w-sm h-screen bg-gray-900 p-8 flex flex-col gap-4 text-white text-xl md:hidden shadow-2xl">
              <li><Link href="/" onClick={closeAllMenus} className="w-full text-left py-2 block uppercase">Home</Link></li>
              
              {/* Mobile Services Accordion */}
              <li>
                <button className="w-full text-left py-2 flex justify-between items-center uppercase" onClick={() => setShowMobileServices(!showMobileServices)}>
                  Services <RiArrowDownSLine className={`transition-transform ${showMobileServices ? 'rotate-180' : ''}`} />
                </button>
                {showMobileServices && (
                  <div className="overflow-hidden pl-4">
                    <ul className="flex flex-col">
                      {services.map(service => (
                        <li key={service.name}>
                          <Link href={service.href} onClick={closeAllMenus} className="block py-2 text-lg text-gray-300 hover:text-white uppercase">{service.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* Mobile About Accordion */}
              <li>
                <button className="w-full text-left py-2 flex justify-between items-center uppercase" onClick={() => setShowMobileAbout(!showMobileAbout)}>
                  About <RiArrowDownSLine className={`transition-transform ${showMobileAbout ? 'rotate-180' : ''}`} />
                </button>
                {showMobileAbout && (
                  <div className="overflow-hidden pl-4">
                      <ul className="flex flex-col">
                        {aboutLinks.map(item => (
                          <li key={item.name}>
                            {item.type === 'link' ? (
                               <Link href={item.href} onClick={closeAllMenus} className="block py-2 text-lg text-gray-300 hover:text-white uppercase">{item.name}</Link>
                            ) : (
                               <button onClick={() => scrollToSection(item.href)} className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase">{item.name}</button>
                            )}
                          </li>
                        ))}
                      </ul>
                  </div>
                )}
              </li>
              
              {/* Mobile Locations Accordion */}
              <li>
                <button className="w-full text-left py-2 flex justify-between items-center uppercase" onClick={() => setShowMobileLocations(!showMobileLocations)}>
                  Areas Served <RiArrowDownSLine className={`transition-transform ${showMobileLocations ? 'rotate-180' : ''}`} />
                </button>
                {showMobileLocations && (
                  <div className="overflow-hidden pl-4">
                      <ul className="flex flex-col">
                        {locations.map(location => (
                          <li key={location.name}>
                            <Link href={location.href} onClick={closeAllMenus} className="block py-2 text-lg text-gray-300 hover:text-white uppercase">{location.name}</Link>
                          </li>
                        ))}
                      </ul>
                  </div>
                )}
              </li>

              <li><Link href="/projects" onClick={closeAllMenus} className="w-full text-left py-2 block uppercase">Projects</Link></li>
              <li><Link href="/contact" onClick={closeAllMenus} className="w-full text-left py-2 block uppercase">Contact Us</Link></li>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
