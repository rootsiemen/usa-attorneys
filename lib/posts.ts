import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  practiceArea: string; // practice-area slug, e.g. "personal-injury-lawyer"
  practiceAreaTitle: string; // resolved display title
  state?: string; // state slug, optional
  stateName?: string; // resolved display name
  keywords: string[];
  html: string;
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePostFile(fileName: string): BlogPost | null {
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const slug =
    (data.slug as string) || fileName.replace(/\.md$/, "");
  const practiceArea = (data.practiceArea as string) || "";
  const areaInfo = PRACTICE_AREAS.find((p) => p.slug === practiceArea);
  const stateSlug = data.state as string | undefined;
  const stateInfo = stateSlug
    ? ALL_STATES.find((s) => s.slug === stateSlug)
    : undefined;

  const html = marked.parse(content.trim(), { async: false }) as string;
  const wordCount = content.split(/\s+/).length;

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    date: (data.date as string) || "2026-10-16",
    practiceArea,
    practiceAreaTitle: areaInfo ? areaInfo.shortTitle : practiceArea,
    state: stateSlug,
    stateName: stateInfo ? stateInfo.name : undefined,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    html,
    readingMinutes: Math.max(2, Math.round(wordCount / 200)),
  };
}

/** All posts, newest first. Build-time only (uses fs). */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"));
  return files
    .map(parsePostFile)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All post slugs (for generateStaticParams). Build-time only. */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Single post by slug, or null. Build-time only. */
export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePostFile(`${slug}.md`);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
