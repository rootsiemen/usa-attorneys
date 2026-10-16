import type { MetadataRoute } from "next";
import { SITE_URL, STATES, PRACTICE_AREAS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/attorneys",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/list-your-firm",
  ];

  const urls: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date("2026-10-16"),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  for (const s of STATES) {
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

  return urls;
}
