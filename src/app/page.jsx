import Main from "./components/main";
import Services from "./components/services";
import Mission from "./components/mission";
import Work from "./components/work";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Faq from "./components/faq";
import Pricing from "./components/pricing";

export default function Home() {
  return (
    <div className="uppercase">
      <Main />
      <Services />
      <Mission></Mission>
      <Work></Work>
      <Pricing></Pricing>
      <Contact></Contact>
      <Faq></Faq>
      <Footer />
    </div>
  );
}
