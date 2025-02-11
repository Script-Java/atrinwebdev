import Link from "next/link";
import Image from "next/image";
import img1 from "../assets/img/4.jpg";
import img2 from "../assets/img/2.jpg";
import img3 from "../assets/img/3.jpg";

const Work = () => {
  return (
    <div id="work" className="bg-black py-10">
      <h1 className="text-6xl text-center pt-10 pb-4">Projects</h1>
      <p className="text-2xl p-4 text-center pb-10 max-w-3xl m-auto">
        Projects showcase creativity, problem-solving, and technical skills,
        turning ideas into real-world solutions.
      </p>
      <div className="container m-auto space-y-10">
        {/* GlassGo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-200 items-start">
          <div>
            <Image className="" src={img1} alt="GlassGo Project" />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold">GLASSGO</h2>
            <p className="text-xl max-w-6xl py-20">
              For GlassGo, we focused on improving SEO by rewriting content with
              strategic keywords to enhance search rankings. Additionally, we
              created extra content to boost site relevance and provide valuable
              information to users, helping the website rank higher and attract
              more organic traffic.
            </p>
            <Link
              href="https://glassgollc.com/"
              className="btn btn-primary"
              passHref
              target="_blank"
            >
              View Project
            </Link>
          </div>
        </div>

        {/* Texas Five Star Paint & Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-200 items-start">
          <div>
            <Image
              className=""
              src={img2}
              alt="Texas Five Star Paint & Body Project"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold">Texas Five Star Paint & Body</h2>
            <p className="text-xl max-w-6xl py-20">
              We designed a professional logo that aligns with the brand’s
              identity and built a fully responsive website that showcases their
              services. The project included custom web development with a
              sleek, user-friendly design to enhance the customer experience and
              strengthen their online presence.
            </p>
            <Link
              href="https://texasfivestarpaintandbody.com/"
              className="btn btn-primary"
              passHref
              target="_blank"
            >
              View Project
            </Link>
          </div>
        </div>

        {/* Premier Public Adjusters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-base-200 items-start">
          <div>
            <Image
              className=""
              src={img3}
              alt="Premier Public Adjusters Project"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold">Premier Public Adjusters</h2>
            <p className="text-xl max-w-6xl py-20">
              For Premier PA, we developed a fully optimized website with
              built-in SEO to improve visibility on search engines. The website
              was designed for both speed and functionality, ensuring potential
              clients can easily find the services they need while maintaining
              high search engine rankings.
            </p>
            <Link
              href="https://premierpa.claims/"
              className="btn btn-primary"
              passHref
              target="_blank"
            >
              View Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
