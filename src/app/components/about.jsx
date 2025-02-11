import img1 from "../assets/logo/3.svg";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin  } from "react-icons/fa";


const About = () => {
  return (
    <div id="about" className="bg-black py-10">
      <div className="container flex flex-col items-center pb-10 rounded-2xl m-auto p-4">
        <h1 className="text-6xl p-4">About Us</h1>
        <p className="text-2xl text-center p-4">
          Crafting Digital Success with Innovation and Strategy
        </p>
        <div className="">
        <div className="">
        <Image
          src={img1}
          className="max-w-3xl w-full m-auto py-20 rounded-2xl"
          alt="buildings"
        ></Image>
      </div>
          <div className="max-w-6xl text-xl text-center m-auto p-4">
            At AtrinWebDev, we specialize in creating high-performance websites,
            SEO strategies, ad management, and custom business software to help
            brands thrive in the digital world. We don’t just build websites—we
            develop solutions that drive traffic, boost conversions, and grow
            businesses. With years of experience in web development, digital
            marketing, and software solutions, we understand what it takes to
            stand out in today’s competitive landscape. Whether you need a
            stunning website, search engine visibility, high-converting ads, or
            a custom-built tool, we have the expertise to bring your vision to
            life. Let’s build your online success together. Get in touch today.
          </div>
        </div>
        <div className="flex text-3xl space-x-4 p-4">
            <Link href={'https://www.instagram.com/atrinwebdev/'}><FaInstagram/></Link>
            <Link href={'https://www.facebook.com/profile.php?id=61571846047410'}><FaFacebook/></Link>
            <Link href={'https://www.linkedin.com/company/atrinwebdev/'}><FaLinkedin/></Link>
        </div>

      </div>
    </div>
  );
};

export default About;
