#!/usr/bin/env node
/**
 * Publish blog posts to the Turso `blog_posts` table — the same
 * database route the admin panel uses (lib/blog-db.ts), so posts
 * published here appear on the site instantly with no deploy.
 *
 * Usage:
 *   node scripts/publish-via-db.mjs <post.json>            insert (fails if the slug exists)
 *   node scripts/publish-via-db.mjs --upsert <post.json>   insert or update
 *   node scripts/publish-via-db.mjs --delete <slug>
 *   node scripts/publish-via-db.mjs --exists <slug>        exit 0 = exists, 1 = not
 *
 * post.json shape:
 *   { slug, title, description, date, practiceArea, state?, keywords[],
 *     content, faqs?: [{ q, a }], metaTitle?, ogImage? }
 *
 * Credentials: TURSO_DATABASE_URL + TURSO_AUTH_TOKEN from the
 * environment; if unset, they are read from ./.env.local (repo root).
 *
 * Output: exactly one JSON line on stdout, e.g.
 *   {"ok":true,"slug":"my-post","mode":"insert"}
 * so a cron job can parse the result.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function fail(error, extra = {}) {
  console.log(JSON.stringify({ ok: false, error, ...extra }));
  process.exit(1);
}

/* --- env ------------------------------------------------------------ */
function loadEnvLocal() {
  const path = join(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let value = t.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}
loadEnvLocal();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  fail(
    "Database not configured: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN (env or .env.local)"
  );
}

/* --- valid slugs, read from lib/data.ts ------------------------------ */
function slugsFromBlock(text, startMarker, endMarkers) {
  const start = text.indexOf(startMarker);
  if (start === -1) return [];
  let end = text.length;
  for (const marker of endMarkers) {
    const i = text.indexOf(marker, start + startMarker.length);
    if (i !== -1 && i < end) end = i;
  }
  const block = text.slice(start, end);
  return [...block.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

const dataTs = readFileSync(join(ROOT, "lib", "data.ts"), "utf8");
const PRACTICE_SLUGS = new Set(
  slugsFromBlock(dataTs, "export const PRACTICE_AREAS", ["\nexport "])
);
const STATE_SLUGS = new Set([
  ...slugsFromBlock(dataTs, "export const STATES:", ["export const STATES_2"]),
  ...slugsFromBlock(dataTs, "export const STATES_2:", [
    "export const STATE_FAQ_SETS",
  ]),
]);
if (PRACTICE_SLUGS.size === 0 || STATE_SLUGS.size === 0) {
  fail("Could not read practice-area/state slugs from lib/data.ts");
}

/* --- validation (mirrors app/api/admin/route.ts parseBlogPostInput) -- */
function validatePost(body) {
  const title = String(body.title ?? "").trim().slice(0, 200);
  const slug = String(body.slug ?? "").trim().toLowerCase().slice(0, 160);
  const description = String(body.description ?? "").trim().slice(0, 300);
  const date = String(body.date ?? "").trim();
  const practiceArea = String(body.practiceArea ?? "").trim();
  const state = String(body.state ?? "").trim();
  const content = String(body.content ?? "");
  const keywordsRaw = Array.isArray(body.keywords)
    ? body.keywords
    : String(body.keywords ?? "").split(",");
  const keywords = keywordsRaw
    .map((k) => String(k).trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 10);
  if (!title) return { error: "Title is required" };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "URL slug must be lowercase words separated by hyphens" };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Date must be YYYY-MM-DD" };
  }
  if (!PRACTICE_SLUGS.has(practiceArea)) {
    return { error: "Choose a valid practice area" };
  }
  if (state && !STATE_SLUGS.has(state)) {
    return { error: "Invalid state" };
  }
  if (content.trim().length < 50) {
    return { error: "Article body is too short (write at least a paragraph)" };
  }
  if (content.length > 200000) {
    return { error: "Article body is too long" };
  }
  const metaTitle = String(body.metaTitle ?? "").trim().slice(0, 200);
  const ogImage = String(body.ogImage ?? "").trim().slice(0, 500);
  if (ogImage) {
    let ogOk = false;
    try {
      ogOk = new URL(ogImage).protocol === "https:";
    } catch {
      ogOk = false;
    }
    if (!ogOk) return { error: "OG image must be a valid https:// URL" };
  }
  const faqs = [];
  if (Array.isArray(body.faqs)) {
    for (const item of body.faqs) {
      if (!item || typeof item !== "object") continue;
      const q = String(item.q ?? "").trim().slice(0, 200);
      const a = String(item.a ?? "").trim().slice(0, 1500);
      if (!q || !a) continue;
      faqs.push({ q, a });
      if (faqs.length >= 10) break;
    }
  }
  return {
    input: {
      slug,
      title,
      description,
      date,
      practiceArea,
      state: state || undefined,
      keywords,
      content,
      faqs,
      metaTitle: metaTitle || undefined,
      ogImage: ogImage || undefined,
    },
  };
}

/* --- table setup (same SQL as lib/blog-db.ts ensureBlogTable) -------- */
async function ensureBlogTable(db) {
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
}

/* --- main ------------------------------------------------------------ */
async function main() {
  const args = process.argv.slice(2);
  let mode = "insert";
  let target = args[0];
  if (args[0] === "--upsert") {
    mode = "upsert";
    target = args[1];
  } else if (args[0] === "--delete") {
    mode = "delete";
    target = args[1];
  } else if (args[0] === "--exists") {
    mode = "exists";
    target = args[1];
  }
  if (!target) {
    fail(
      "Usage: publish-via-db.mjs [--upsert] <post.json> | --delete <slug> | --exists <slug>"
    );
  }

  const db = createClient({ url, authToken });
  await ensureBlogTable(db);

  if (mode === "exists" || mode === "delete") {
    const slug = String(target).trim().toLowerCase().slice(0, 160);
    const res = await db.execute({
      sql: "SELECT slug FROM blog_posts WHERE slug = ? LIMIT 1",
      args: [slug],
    });
    const exists = res.rows.length > 0;
    if (mode === "exists") {
      console.log(JSON.stringify({ ok: true, slug, exists }));
      process.exit(exists ? 0 : 1);
    }
    if (!exists) {
      fail("Article not found", { slug, mode: "delete", deleted: false });
    }
    await db.execute({
      sql: "DELETE FROM blog_posts WHERE slug = ?",
      args: [slug],
    });
    console.log(JSON.stringify({ ok: true, slug, mode: "delete", deleted: true }));
    return;
  }

  let post;
  try {
    post = JSON.parse(readFileSync(target, "utf8"));
  } catch (e) {
    fail(`Could not read post JSON at ${target}: ${e.message}`);
  }
  const { input, error } = validatePost(post);
  if (!input) fail(error);

  const existing = await db.execute({
    sql: "SELECT slug FROM blog_posts WHERE slug = ? LIMIT 1",
    args: [input.slug],
  });
  const exists = existing.rows.length > 0;
  if (exists && mode === "insert") {
    fail(`An article with this URL slug already exists: ${input.slug}`, {
      slug: input.slug,
    });
  }
  if (exists) {
    await db.execute({
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
    console.log(JSON.stringify({ ok: true, slug: input.slug, mode: "update" }));
    return;
  }
  await db.execute({
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
  console.log(JSON.stringify({ ok: true, slug: input.slug, mode: "insert" }));
}

main().catch((e) => fail(e instanceof Error ? e.message : String(e)));
