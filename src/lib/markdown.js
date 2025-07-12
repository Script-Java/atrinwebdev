import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content");

// Fetch and sort posts by date
export function getSortedPostsData() {
    if (typeof window !== "undefined") {
        throw new Error("getSortedPostsData should only be used in Node.js environments");
    }

    if (!fs.existsSync(postsDirectory)) {
        console.error(`Content directory does not exist: ${postsDirectory}`);
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        if (path.extname(fileName) !== ".md") {
            console.warn(`Skipping non-Markdown file: ${fileName}`);
            return null;
        }

        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        if (!matterResult.data.title || !matterResult.data.date) {
            console.warn(`Missing title or date in file: ${fileName}`);
            return null;
        }

        return {
            id,
            image: matterResult.data.image || "", // Safeguard image
            title: matterResult.data.title,
            date: matterResult.data.date,
            description: matterResult.data.description || "", // Safeguard description
        };
    }).filter(Boolean); // Remove null entries from invalid files

    // Sort posts by date
    return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Fetch a single post by ID and convert it to HTML
export async function getPostData(id) {
    if (typeof window !== "undefined") {
        throw new Error("getPostData should only be used in Node.js environments");
    }

    const fullPath = path.join(postsDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
        console.error(`Post not found for ID: ${id}`);
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    if (!matterResult.content) {
        console.error(`Content is missing in post ID: ${id}`);
        return null;
    }

    // Process Markdown to HTML
    let processedContent;
    try {
        processedContent = await remark().use(html).process(matterResult.content);
        console.log(processedContent);
    } catch (error) {
        console.error(`Error processing Markdown for ID: ${id}`, error);
        return null;
    }

    const contentHtml = processedContent.toString();

    return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description || "No description available.",
        contentHtml,
    };
}
