import Image from "next/image";
import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";
import About from "./components/about";
import Services from "./components/services";
import Faq from "./components/faq";
import Contact from "./components/contact";
import Work from "./components/work";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Main />
      <Work></Work>
      <About></About>
      <Services></Services>
      <Faq></Faq>
      <Contact></Contact>
      <Footer />
    </div>
  );
}
