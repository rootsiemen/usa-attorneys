import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";
import type { BlogPostInput } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Admin session check: signed httpOnly cookie set at login. */
async function checkAuth(): Promise<boolean> {
  const email = await getAdminSession();
  return email !== null;
}

/** Validates + normalizes an admin blog-article payload. */
function parseBlogPostInput(body: Record<string, unknown>): {
  input?: BlogPostInput;
  error?: string;
} {
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
    return {
      error: "URL slug must be lowercase words separated by hyphens",
    };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Date must be YYYY-MM-DD" };
  }
  if (!PRACTICE_AREAS.some((p) => p.slug === practiceArea)) {
    return { error: "Choose a valid practice area" };
  }
  if (state && !ALL_STATES.some((s) => s.slug === state)) {
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
  const faqs: { q: string; a: string }[] = [];
  if (Array.isArray(body.faqs)) {
    for (const item of body.faqs) {
      if (!item || typeof item !== "object") continue;
      const rec = item as Record<string, unknown>;
      const q = String(rec.q ?? "").trim().slice(0, 200);
      const a = String(rec.a ?? "").trim().slice(0, 1500);
      if (!q || !a) continue; // drop empty pairs
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

/**
 * GET /api/admin?action=claims|reviews|stats|attorneys&status=pending|approved|rejected&q=...
 * Auth: admin session cookie.
 */
export async function GET(req: NextRequest) {
  if (!(await checkAuth())) return unauthorized();
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const status = searchParams.get("status") || "pending";
  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  try {
    const db = getDb();
    if (action === "stats") {
      const [a, c, pc, pr, tr] = await Promise.all([
        db.execute("SELECT COUNT(*) AS n FROM attorneys"),
        db.execute("SELECT COUNT(*) AS n FROM attorneys WHERE claimed = 1"),
        db.execute("SELECT COUNT(*) AS n FROM claim_requests WHERE status = 'pending'"),
        db.execute("SELECT COUNT(*) AS n FROM reviews WHERE status = 'pending'"),
        db.execute("SELECT COUNT(*) AS n FROM reviews"),
      ]);
      return NextResponse.json({
        stats: {
          attorneys: Number(a.rows[0]?.n ?? 0),
          claimed: Number(c.rows[0]?.n ?? 0),
          pendingClaims: Number(pc.rows[0]?.n ?? 0),
          pendingReviews: Number(pr.rows[0]?.n ?? 0),
          totalReviews: Number(tr.rows[0]?.n ?? 0),
        },
      });
    }
    if (action === "attorneys") {
      const q = (searchParams.get("q") || "").trim().slice(0, 80);
      if (q.length < 2) {
        return NextResponse.json({ attorneys: [] });
      }
      const res = await db.execute({
        sql: `SELECT slug, name, firm, city, state, phone, website, address, claimed
              FROM attorneys WHERE name LIKE ? OR firm LIKE ?
              ORDER BY name LIMIT 50`,
        args: [`%${q}%`, `%${q}%`],
      });
      return NextResponse.json({ attorneys: res.rows });
    }
    if (action === "claims") {
      const res = await db.execute({
        sql: `SELECT c.*, a.name AS attorney_name, a.city AS attorney_city
              FROM claim_requests c LEFT JOIN attorneys a ON a.slug = c.attorney_slug
              WHERE c.status = ? ORDER BY c.created_at DESC LIMIT 200`,
        args: [status],
      });
      return NextResponse.json({ claims: res.rows });
    }
    if (action === "reviews") {
      const res = await db.execute({
        sql: `SELECT r.*, a.name AS attorney_name
              FROM reviews r
              LEFT JOIN attorneys a ON a.slug = r.attorney_slug
              WHERE r.status = ? ORDER BY r.created_at DESC LIMIT 200`,
        args: [status],
      });
      return NextResponse.json({ reviews: res.rows });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("GET /api/admin failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/**
 * POST /api/admin
 * Header: x-admin-password
 * Body: { action: "approve-claim"|"reject-claim"|"approve-review"|"reject-review", id }
 * Approving a claim also sets attorneys.claimed = 1 for that profile.
 */
export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return unauthorized();
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const action = String(body.action || "");
  // Blog actions (create/update/delete article) are keyed by slug, not by
  // numeric id, so they are handled before the id validation below.
  if (
    action === "create-post" ||
    action === "update-post" ||
    action === "delete-post"
  ) {
    try {
      const {
        createDbBlogPost,
        updateDbBlogPost,
        deleteDbBlogPost,
        getDbBlogPost,
      } = await import("@/lib/blog-db");
      if (action === "delete-post") {
        const slug = String(body.slug || "").trim().toLowerCase().slice(0, 160);
        if (!slug) {
          return NextResponse.json({ error: "slug is required" }, { status: 400 });
        }
        const removed = await deleteDbBlogPost(slug);
        if (!removed) {
          return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        return NextResponse.json({ ok: true });
      }
      const { input, error } = parseBlogPostInput(body);
      if (!input) {
        return NextResponse.json({ error }, { status: 400 });
      }
      if (action === "create-post") {
        if (await getDbBlogPost(input.slug)) {
          return NextResponse.json(
            { error: "An article with this URL slug already exists" },
            { status: 409 }
          );
        }
        await createDbBlogPost(input);
        return NextResponse.json({ ok: true, slug: input.slug }, { status: 201 });
      }
      const updated = await updateDbBlogPost(input);
      if (!updated) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true, slug: input.slug });
    } catch (e) {
      console.error("POST /api/admin blog action failed:", e);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }
  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Valid id is required" }, { status: 400 });
  }
  try {
    const db = getDb();
    if (action === "approve-claim" || action === "reject-claim") {
      const status = action === "approve-claim" ? "approved" : "rejected";
      const cur = await db.execute({
        sql: "SELECT attorney_slug, status FROM claim_requests WHERE id = ?",
        args: [id],
      });
      if (cur.rows.length === 0) {
        return NextResponse.json({ error: "Claim not found" }, { status: 404 });
      }
      await db.execute({
        sql: "UPDATE claim_requests SET status = ? WHERE id = ?",
        args: [status, id],
      });
      if (status === "approved") {
        await db.execute({
          sql: "UPDATE attorneys SET claimed = 1 WHERE slug = ?",
          args: [String(cur.rows[0].attorney_slug)],
        });
      }
      return NextResponse.json({ ok: true, status });
    }
    if (action === "approve-review" || action === "reject-review") {
      const status = action === "approve-review" ? "approved" : "rejected";
      const cur = await db.execute({
        sql: "SELECT id FROM reviews WHERE id = ?",
        args: [id],
      });
      if (cur.rows.length === 0) {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
      }
      await db.execute({
        sql: "UPDATE reviews SET status = ? WHERE id = ?",
        args: [status, id],
      });
      return NextResponse.json({ ok: true, status });
    }
    if (action === "update-attorney") {
      const slug = String(body.slug || "").trim().toLowerCase().slice(0, 160);
      if (!slug) {
        return NextResponse.json({ error: "slug is required" }, { status: 400 });
      }
      const fields: Record<string, number> = {
        phone: 40,
        firm: 200,
        city: 100,
        website: 300,
        address: 300,
      };
      const sets: string[] = [];
      const args: (string | number)[] = [];
      for (const [k, max] of Object.entries(fields)) {
        if (body[k] !== undefined) {
          sets.push(`${k} = ?`);
          args.push(String(body[k] ?? "").trim().slice(0, max));
        }
      }
      if (body.claimed !== undefined) {
        sets.push("claimed = ?");
        args.push(body.claimed ? 1 : 0);
      }
      if (sets.length === 0) {
        return NextResponse.json({ error: "No fields to update" }, { status: 400 });
      }
      args.push(slug);
      const res = await db.execute({
        sql: `UPDATE attorneys SET ${sets.join(", ")} WHERE slug = ?`,
        args,
      });
      if (res.rowsAffected === 0) {
        return NextResponse.json({ error: "Attorney not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    }
    if (action === "delete-attorney") {
      const slug = String(body.slug || "").trim().toLowerCase().slice(0, 160);
      if (!slug) {
        return NextResponse.json({ error: "slug is required" }, { status: 400 });
      }
      await db.execute({ sql: "DELETE FROM reviews WHERE attorney_slug = ?", args: [slug] });
      await db.execute({ sql: "DELETE FROM claim_requests WHERE attorney_slug = ?", args: [slug] });
      const res = await db.execute({ sql: "DELETE FROM attorneys WHERE slug = ?", args: [slug] });
      if (res.rowsAffected === 0) {
        return NextResponse.json({ error: "Attorney not found" }, { status: 404 });
      }
      return NextResponse.json({ ok: true });
    }
    if (action === "create-attorney") {
      const name = String(body.name ?? "").trim().slice(0, 200);
      const city = String(body.city ?? "").trim().slice(0, 100);
      const state = String(body.state ?? "").trim().slice(0, 100);
      if (!name || !city || !state) {
        return NextResponse.json({ error: "Name, city and state are required" }, { status: 400 });
      }
      const firm = String(body.firm ?? "").trim().slice(0, 200);
      const phone = String(body.phone ?? "").trim().slice(0, 40);
      const website = String(body.website ?? "").trim().slice(0, 300);
      const address = String(body.address ?? "").trim().slice(0, 300);
      // Slug: name-city-state, lowercased, non-alnum -> hyphen; ensure unique
      let base = `${name} ${city} ${state}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 150);
      if (!base) base = "attorney";
      let slug = base;
      let n = 2;
      for (;;) {
        const exists = await db.execute({ sql: "SELECT 1 FROM attorneys WHERE slug = ? LIMIT 1", args: [slug] });
        if (exists.rows.length === 0) break;
        slug = `${base}-${n}`;
        n += 1;
        if (n > 100) {
          return NextResponse.json({ error: "Could not generate a unique URL" }, { status: 500 });
        }
      }
      await db.execute({
        sql: `INSERT INTO attorneys (slug, name, firm, state, city, phone, website, address, practice_areas, claimed)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, '[]', 1)`,
        args: [slug, name, firm, state, city, phone, website, address],
      });
      return NextResponse.json({ ok: true, slug }, { status: 201 });
    }
    if (action === "change-password") {
      const adminEmail = await getAdminSession();
      if (!adminEmail) return unauthorized();
      const currentPassword = String(body.currentPassword ?? "");
      const newPassword = String(body.newPassword ?? "");
      if (newPassword.length < 10 || newPassword.length > 128) {
        return NextResponse.json({ error: "New password must be 10–128 characters" }, { status: 400 });
      }
      const row = await db.execute({
        sql: "SELECT password_hash FROM admin_users WHERE email = ? LIMIT 1",
        args: [adminEmail],
      });
      if (row.rows.length === 0) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
      }
      const { verifyPassword, hashPassword } = await import("@/lib/admin-auth");
      if (!(await verifyPassword(currentPassword, String(row.rows[0].password_hash)))) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }
      await db.execute({
        sql: "UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE email = ?",
        args: [await hashPassword(newPassword), adminEmail],
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("POST /api/admin failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
