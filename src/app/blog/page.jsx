import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/markdown";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FiZap, FiTarget, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

export default function Blog() {
    const posts = getSortedPostsData();

    const features = [
        {
            icon: <FiTarget size={20} />,
            title: "Local SEO Tactics",
            description: "Learn step-by-step guides to improve your ranking on Google Maps and attract local customers in North Texas."
        },
        {
            icon: <FiZap size={20} />,
            title: "Conversion-Focused Design",
            description: "Discover the web design principles that turn visitors into paying customers and increase your website's effectiveness."
        },
        {
            icon: <FiTrendingUp size={20} />,
            title: "Digital Marketing Strategies",
            description: "Get insights into running effective Google Ads campaigns, building your brand, and generating a real return on your investment."
        },
        {
            icon: <FiCheckCircle size={20} />,
            title: "Expert Recommendations",
            description: "We share our expert recommendations for the best tools and practices to keep your business ahead of the competition."
        }
    ];

    if (!posts || posts.length === 0) {
        return (
             <div className="bg-base-100 text-white min-h-screen">
                <Navbar />
                <p className="text-center text-xl pt-40">No blogs available at the moment.</p>
                <Footer />
            </div>
        );
    }

    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <div className="bg-base-100 text-white">
            <Navbar />
            <main className="pt-24"> {/* Added padding-top to push content down */}
                
                {/* Insights Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div
                            className="text-center"
                        >
                            <h2 className="text-base font-semibold leading-7 text-indigo-400 uppercase">Our Insights</h2>
                            <h1 className="mt-2 text-4xl md:text-6xl font-semibold mb-4 uppercase tracking-wider">
                                Actionable Growth Strategies
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-6">
                                Welcome to our blog, your essential resource for navigating the digital landscape in North Texas. We've curated a collection of informative articles packed with practical tips and expert advice to help you succeed online.
                            </p>
                        </div>

                        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-[#0b0b0b] p-8 rounded-3xl ring-1 ring-indigo-500/30 flex gap-6 items-center"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="inline-flex items-center justify-center w-12 h-12 text-indigo-400 bg-indigo-900/20 rounded-xl">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Blogs Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h3
                            className="text-3xl lg:text-4xl uppercase text-center font-bold mb-16"
                        >
                            All Articles
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="bg-[#0b0b0b] p-6 transition hover:scale-[1.02] rounded-3xl ring-1 ring-indigo-500/50 hover:ring-indigo-500 flex flex-col"
                                >
                                    <Image
                                        src={post.image || "/assets/tehran.jpg"}
                                        alt={post.title || "blog post image"}
                                        width={400}
                                        height={240}
                                        className="w-full h-48 object-cover mb-4 rounded-xl"
                                    />
                                    <div className="flex flex-col flex-grow">
                                        <h2 className="text-xl font-semibold mb-2">{post.title || "Untitled Post"}</h2>
                                        <p className="text-sm text-gray-400 flex-grow">{post.description || "No description available."}</p>
                                        <div className="mt-4">
                                            <Link className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 w-full text-center block" href={`/blog/${post.id}`}>
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
