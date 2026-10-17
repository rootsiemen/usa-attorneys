import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb, isDbConfigured, type DbReview } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** Adds reviewer_email column to reviews table if missing (lazy migration). */
async function ensureReviewerEmailColumn(): Promise<void> {
  const db = getDb();
  const info = await db.execute("PRAGMA table_info(reviews)");
  const cols = info.rows.map((r) => String(r.name));
  if (!cols.includes("reviewer_email")) {
    await db.execute("ALTER TABLE reviews ADD COLUMN reviewer_email TEXT DEFAULT ''");
  }
}

/** Strip HTML tags / angle brackets to prevent stored XSS. */
function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
}

function clean(s: unknown, max: number): string {
  return stripHtml(String(s ?? "").trim()).slice(0, max);
}

/**
 * GET /api/reviews?slug=john-smith-houston-tx
 * Returns approved reviews for an attorney profile (newest first).
 */
export async function GET(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ reviews: [], average: null, count: 0 });
  }
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get("slug") || "").trim().toLowerCase();
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }
  try {
    const db = getDb();
    const res = await db.execute({
      sql: `SELECT reviewer_name, rating, text, created_at FROM reviews
            WHERE attorney_slug = ? AND status = 'approved'
            ORDER BY created_at DESC LIMIT 100`,
      args: [slug],
    });
    const reviews = res.rows.map((r) => ({
      reviewerName: String(r.reviewer_name),
      rating: Number(r.rating),
      text: String(r.text),
      createdAt: String(r.created_at),
    }));
    const count = reviews.length;
    const average =
      count > 0
        ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
        : null;
    return NextResponse.json({ reviews, average, count });
  } catch (e) {
    console.error("GET /api/reviews failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

/**
 * POST /api/reviews
 * Requires Google login. Body: { attorneySlug, rating (1-5), text }
 * Uses the logged-in user's Google name + email. Creates a pending review
 * (visible after admin approval).
 */
export async function POST(req: NextRequest) {
  // Must be logged in with Google to review
  const session = await getServerSession(authOptions);
  const reviewerName = (session?.user?.name || "").trim().slice(0, 80);
  const reviewerEmail = (session?.user?.email || "").trim().toLowerCase().slice(0, 160);
  if (!session?.user || !reviewerName || !reviewerEmail) {
    return NextResponse.json(
      { error: "Please log in with Google to write a review", loginRequired: true },
      { status: 401 }
    );
  }
  // Rate limit: 5 reviews per minute per account
  const rlKey = `reviews:${reviewerEmail}`;
  const rl = checkRateLimit(rlKey, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests — please wait a moment and try again" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Review system not configured yet — please try again later" },
      { status: 503 }
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const attorneySlug = clean(body.attorneySlug, 120).toLowerCase();
  const rating = Number(body.rating);
  const text = clean(body.text, 2000);

  if (!attorneySlug) {
    return NextResponse.json({ error: "attorneySlug is required" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be an integer from 1 to 5" }, { status: 400 });
  }
  if (text.length < 10) {
    return NextResponse.json(
      { error: "Please write at least a sentence about your experience" },
      { status: 400 }
    );
  }

  try {
    const db = getDb();
    await ensureReviewerEmailColumn();
    const exists = await db.execute({
      sql: "SELECT 1 FROM attorneys WHERE slug = ?",
      args: [attorneySlug],
    });
    if (exists.rows.length === 0) {
      return NextResponse.json({ error: "Attorney not found" }, { status: 404 });
    }
    // One review per Google account per attorney — update if they already reviewed
    const prior = await db.execute({
      sql: "SELECT id FROM reviews WHERE attorney_slug = ? AND reviewer_email = ? LIMIT 1",
      args: [attorneySlug, reviewerEmail],
    });
    if (prior.rows.length > 0) {
      await db.execute({
        sql: `UPDATE reviews SET reviewer_name = ?, rating = ?, text = ?, status = 'pending',
              created_at = datetime('now') WHERE id = ?`,
        args: [reviewerName, rating, text, prior.rows[0].id],
      });
    } else {
      await db.execute({
        sql: `INSERT INTO reviews (attorney_slug, reviewer_name, reviewer_email, rating, text)
              VALUES (?, ?, ?, ?, ?)`,
        args: [attorneySlug, reviewerName, reviewerEmail, rating, text],
      });
    }
    return NextResponse.json(
      { ok: true, message: "Thanks! Your review was submitted and will appear after moderation." },
      { status: 201 }
    );
  } catch (e) {
    console.error("POST /api/reviews failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
