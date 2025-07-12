import getFormattedDate from "@/lib/getFormattedDate";
import { getSortedPostsData, getPostData } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export function generateStaticParams() {
    const posts = getSortedPostsData();

    return posts.map((post) => ({
        postid: post.id,
    }));
}

export async function generateMetadata({ params }) {
    const { postid } = params;
    const posts = getSortedPostsData();
    const post = posts.find((post) => post.id === postid);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
    };
}

export default async function Post({ params }) {
    const { postid } = params;
    const posts = getSortedPostsData();
    const post = posts.find((post) => post.id === postid);

    if (!post) {
        notFound();
    }

    const { title, date, contentHtml } = await getPostData(postid);
    const pubDate = getFormattedDate(date);

    return (
        // Flex container to ensure proper layout
        <div className="flex flex-col min-h-screen bg-base-100 text-white">
            <Navbar />
            
            {/* Main content area that will grow to fill space */}
            <main className="flex-grow pt-24">
                <article className="prose prose-sm lg:prose-xl prose-slate dark:prose-invert mx-auto p-6">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-400">
                            Published on {pubDate}
                        </p>
                    </header>
                    <section 
                        className="prose-p:text-gray-300 prose-a:text-indigo-400 prose-strong:text-white prose-headings:text-white"
                        dangerouslySetInnerHTML={{ __html: contentHtml }} 
                    />
                    <p className="mt-12">
                        <Link href="/blog" className="text-indigo-400 hover:text-indigo-300">← Back to Blog</Link>
                    </p>
                </article>
            </main>

            <Footer />
        </div>
    );
}
