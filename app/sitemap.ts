import type { MetadataRoute } from "next";
import { SITE_URL, ALL_STATES, PRACTICE_AREAS } from "@/lib/data";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/attorneys",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/list-your-firm",
    "/blog",
  ];

  const urls: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date("2026-10-16"),
    changeFrequency: p === "" || p === "/blog" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const s of ALL_STATES) {
    urls.push({
      url: `${SITE_URL}/attorneys/${s.slug}`,
      lastModified: new Date("2026-10-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const p of PRACTICE_AREAS) {
    urls.push({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: new Date("2026-10-16"),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const post of getAllPosts()) {
    urls.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return urls;
}
