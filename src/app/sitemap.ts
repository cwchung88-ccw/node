export const dynamic = "force-static";

import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://my-local-info.pages.dev";

  // 정적 페이지 URL
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // 블로그 포스트 동적 URL
  const postsDir = path.join(process.cwd(), "src/content/posts");
  let blogUrls: MetadataRoute.Sitemap = [];

  if (fs.existsSync(postsDir)) {
    const fileNames = fs.readdirSync(postsDir);
    blogUrls = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDir, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const parsed = matter(fileContent);

        // 작성일자 가공
        const dateVal = parsed.data.date;
        let lastMod = new Date();
        if (dateVal instanceof Date) {
          lastMod = dateVal;
        } else if (typeof dateVal === "string") {
          const d = new Date(dateVal);
          if (!isNaN(d.getTime())) {
            lastMod = d;
          }
        }

        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: lastMod,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      });
  }

  return [...staticUrls, ...blogUrls];
}
