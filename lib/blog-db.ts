import { getDb, isDbConfigured } from "@/lib/db";
import { marked } from "marked";
import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";
import type { BlogPost } from "@/lib/posts";

/**
 * Database-backed blog posts (Turso `blog_posts` table).
 *
 * These are the articles created from the admin panel (/admin/blog).
 * They are merged with the file-based posts in lib/posts.ts
 * (getAllPostsMerged / getPostMerged): on a slug clash the DB post wins,
 * so an admin article can override a file article. File posts keep
 * working exactly as before.
 */

export interface BlogPostInput {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  practiceArea: string; // practice-area slug
  state?: string; // state slug, optional
  keywords: string[];
  content: string; // markdown body
  faqs?: { q: string; a: string }[]; // FAQ pairs (FAQ section + FAQPage schema)
  metaTitle?: string; // optional <title> override for search results
  ogImage?: string; // optional social-share image URL
}

interface DbBlogPostRow {
  slug: string;
  title: string;
  description: string;
  date: string;
  practice_area: string;
  state: string | null;
  keywords: string; // JSON array string
  content: string;
  faqs: string; // JSON array string of { q, a }
  meta_title: string | null;
  og_image: string | null;
}

let tableReady: Promise<void> | null = null;

/**
 * Creates the blog_posts table on first use (idempotent) and migrates
 * older deployments: the faqs / meta_title / og_image columns are added
 * with ALTER TABLE when missing. SQLite has no ADD COLUMN IF NOT
 * EXISTS, so each ALTER runs in a try/catch and the "duplicate column"
 * error on already-migrated tables is swallowed.
 */
export function ensureBlogTable(): Promise<void> {
  if (!isDbConfigured()) return Promise.resolve();
  if (!tableReady) {
    tableReady = (async () => {
      const db = getDb();
      await db.execute(
        `CREATE TABLE IF NOT EXISTS blog_posts (
          slug TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          date TEXT NOT NULL,
          practice_area TEXT NOT NULL DEFAULT '',
          state TEXT,
          keywords TEXT NOT NULL DEFAULT '[]',
          content TEXT NOT NULL,
          faqs TEXT NOT NULL DEFAULT '[]',
          meta_title TEXT,
          og_image TEXT,
          created_at TEXT NOT NULL DEFAULT (datetime('now')),
          updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        )`
      );
      for (const ddl of [
        "ALTER TABLE blog_posts ADD COLUMN faqs TEXT NOT NULL DEFAULT '[]'",
        "ALTER TABLE blog_posts ADD COLUMN meta_title TEXT",
        "ALTER TABLE blog_posts ADD COLUMN og_image TEXT",
      ]) {
        try {
          await db.execute(ddl);
        } catch {
          // Column already exists — nothing to migrate.
        }
      }
    })().catch((e) => {
      tableReady = null; // allow a retry on the next call
      throw e;
    });
  }
  return tableReady;
}

/** Parses a stored FAQ JSON string; bad JSON / wrong shape → []. */
function parseFaqs(raw: string | null | undefined): { q: string; a: string }[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (f): f is { q: unknown; a: unknown } =>
          Boolean(f) && typeof f === "object"
      )
      .map((f) => ({ q: String(f.q ?? ""), a: String(f.a ?? "") }))
      .filter((f) => f.q && f.a);
  } catch {
    return [];
  }
}

function rowToPost(row: DbBlogPostRow): BlogPost {
  const areaInfo = PRACTICE_AREAS.find((p) => p.slug === row.practice_area);
  const stateInfo = row.state
    ? ALL_STATES.find((s) => s.slug === row.state)
    : undefined;
  let keywords: string[] = [];
  try {
    const parsed = JSON.parse(row.keywords || "[]");
    if (Array.isArray(parsed)) keywords = parsed.map(String);
  } catch {
    keywords = [];
  }
  const content = row.content || "";
  const html = marked.parse(content.trim(), { async: false }) as string;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    date: row.date,
    practiceArea: row.practice_area,
    practiceAreaTitle: areaInfo ? areaInfo.shortTitle : row.practice_area,
    state: row.state || undefined,
    stateName: stateInfo ? stateInfo.name : undefined,
    keywords,
    html,
    readingMinutes: Math.max(2, Math.round(wordCount / 200)),
    faqs: parseFaqs(row.faqs),
    metaTitle: row.meta_title || undefined,
    ogImage: row.og_image || undefined,
  };
}

const COLUMNS =
  "slug, title, description, date, practice_area, state, keywords, content, faqs, meta_title, og_image";

/** All DB posts, newest first. Returns [] when the DB is not configured. */
export async function getDbBlogPosts(): Promise<BlogPost[]> {
  if (!isDbConfigured()) return [];
  await ensureBlogTable();
  const res = await getDb().execute(
    `SELECT ${COLUMNS} FROM blog_posts ORDER BY date DESC, created_at DESC`
  );
  return (res.rows as unknown as DbBlogPostRow[]).map(rowToPost);
}

/** One DB post by slug (with rendered HTML), or null. */
export async function getDbBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isDbConfigured()) return null;
  await ensureBlogTable();
  const res = await getDb().execute({
    sql: `SELECT ${COLUMNS} FROM blog_posts WHERE slug = ? LIMIT 1`,
    args: [slug],
  });
  if (res.rows.length === 0) return null;
  return rowToPost(res.rows[0] as unknown as DbBlogPostRow);
}

/** One DB post's raw markdown input (for the admin editor), or null. */
export async function getDbBlogPostInput(
  slug: string
): Promise<BlogPostInput | null> {
  if (!isDbConfigured()) return null;
  await ensureBlogTable();
  const res = await getDb().execute({
    sql: `SELECT ${COLUMNS} FROM blog_posts WHERE slug = ? LIMIT 1`,
    args: [slug],
  });
  if (res.rows.length === 0) return null;
  const row = res.rows[0] as unknown as DbBlogPostRow;
  let keywords: string[] = [];
  try {
    const parsed = JSON.parse(row.keywords || "[]");
    if (Array.isArray(parsed)) keywords = parsed.map(String);
  } catch {
    keywords = [];
  }
  return {
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    date: row.date,
    practiceArea: row.practice_area,
    state: row.state || undefined,
    keywords,
    content: row.content || "",
    faqs: parseFaqs(row.faqs),
    metaTitle: row.meta_title || undefined,
    ogImage: row.og_image || undefined,
  };
}

/** Slugs of all DB posts (used to badge/merge in admin + public lists). */
export async function getDbBlogSlugs(): Promise<Set<string>> {
  if (!isDbConfigured()) return new Set();
  await ensureBlogTable();
  const res = await getDb().execute("SELECT slug FROM blog_posts");
  return new Set(res.rows.map((r) => String(r.slug)));
}

export async function createDbBlogPost(input: BlogPostInput): Promise<void> {
  await ensureBlogTable();
  await getDb().execute({
    sql: `INSERT INTO blog_posts (slug, title, description, date, practice_area, state, keywords, content, faqs, meta_title, og_image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug,
      input.title,
      input.description,
      input.date,
      input.practiceArea,
      input.state || null,
      JSON.stringify(input.keywords),
      input.content,
      JSON.stringify(input.faqs ?? []),
      input.metaTitle || null,
      input.ogImage || null,
    ],
  });
}

export async function updateDbBlogPost(input: BlogPostInput): Promise<boolean> {
  await ensureBlogTable();
  const res = await getDb().execute({
    sql: `UPDATE blog_posts
          SET title = ?, description = ?, date = ?, practice_area = ?,
              state = ?, keywords = ?, content = ?, faqs = ?,
              meta_title = ?, og_image = ?, updated_at = datetime('now')
          WHERE slug = ?`,
    args: [
      input.title,
      input.description,
      input.date,
      input.practiceArea,
      input.state || null,
      JSON.stringify(input.keywords),
      input.content,
      JSON.stringify(input.faqs ?? []),
      input.metaTitle || null,
      input.ogImage || null,
      input.slug,
    ],
  });
  return res.rowsAffected > 0;
}

export async function deleteDbBlogPost(slug: string): Promise<boolean> {
  await ensureBlogTable();
  const res = await getDb().execute({
    sql: "DELETE FROM blog_posts WHERE slug = ?",
    args: [slug],
  });
  return res.rowsAffected > 0;
}
