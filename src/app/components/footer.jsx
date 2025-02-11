import Image from "next/image";
import logo from "../assets/logo/2.svg";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin  } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-base-200 border-t border-gray-200">
      <footer className="footer container m-auto text-white items-center p-4">
        <aside className="grid-flow-col items-center">
          <Image src={logo} alt="logo" className="max-w-64"></Image>

          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <div className="flex text-3xl space-x-4 p-4">
            <Link href={'https://www.instagram.com/atrinwebdev/'}><FaInstagram/></Link>
            <Link href={'https://www.facebook.com/profile.php?id=61571846047410'}><FaFacebook/></Link>
            <Link href={'https://www.linkedin.com/company/atrinwebdev/'}><FaLinkedin/></Link>
        </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
