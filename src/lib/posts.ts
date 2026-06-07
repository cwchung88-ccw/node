import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getSortedPostsData(): PostData[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  // Get file names under /src/content/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Normalize date to YYYY-MM-DD string
      const dateVal = matterResult.data.date;
      let dateString = "";
      if (dateVal instanceof Date) {
        const year = dateVal.getFullYear();
        const month = String(dateVal.getMonth() + 1).padStart(2, "0");
        const day = String(dateVal.getDate()).padStart(2, "0");
        dateString = `${year}-${month}-${day}`;
      } else if (typeof dateVal === "string") {
        dateString = dateVal;
      } else if (dateVal) {
        dateString = String(dateVal);
      }

      // Ensure tags is array
      let tags: string[] = [];
      if (Array.isArray(matterResult.data.tags)) {
        tags = matterResult.data.tags;
      } else if (typeof matterResult.data.tags === "string") {
        tags = (matterResult.data.tags as string).split(",").map((t) => t.trim());
      }

      return {
        slug,
        title: matterResult.data.title || "Untitled",
        date: dateString,
        summary: matterResult.data.summary || "",
        category: matterResult.data.category || "General",
        tags,
        content: matterResult.content,
      };
    });

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostData(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const dateVal = matterResult.data.date;
  let dateString = "";
  if (dateVal instanceof Date) {
    const year = dateVal.getFullYear();
    const month = String(dateVal.getMonth() + 1).padStart(2, "0");
    const day = String(dateVal.getDate()).padStart(2, "0");
    dateString = `${year}-${month}-${day}`;
  } else if (typeof dateVal === "string") {
    dateString = dateVal;
  } else if (dateVal) {
    dateString = String(dateVal);
  }

  let tags: string[] = [];
  if (Array.isArray(matterResult.data.tags)) {
    tags = matterResult.data.tags;
  } else if (typeof matterResult.data.tags === "string") {
    tags = (matterResult.data.tags as string).split(",").map((t) => t.trim());
  }

  return {
    slug,
    title: matterResult.data.title || "Untitled",
    date: dateString,
    summary: matterResult.data.summary || "",
    category: matterResult.data.category || "General",
    tags,
    content: matterResult.content,
  };
}
