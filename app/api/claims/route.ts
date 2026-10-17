import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strip HTML tags / angle brackets to prevent stored XSS. */
function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
}

function clean(s: unknown, max: number): string {
  return stripHtml(String(s ?? "").trim()).slice(0, max);
}

/**
 * POST /api/claims
 * Body: { attorneySlug, claimantName, claimantEmail, claimantPhone?, barNumber?, message? }
 * Creates a pending claim request for an attorney profile.
 */
export async function POST(req: NextRequest) {
  // Rate limit: 5 claims per minute per IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`claims:${ip}`, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests — please wait a moment and try again" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Claim system not configured yet — please try again later" },
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
  const claimantName = clean(body.claimantName, 120);
  const claimantEmail = clean(body.claimantEmail, 160).toLowerCase();
  const claimantPhone = clean(body.claimantPhone, 40);
  const barNumber = clean(body.barNumber, 40);
  const message = clean(body.message, 2000);

  if (!attorneySlug) {
    return NextResponse.json({ error: "attorneySlug is required" }, { status: 400 });
  }
  if (!claimantName) {
    return NextResponse.json({ error: "Your name is required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(claimantEmail)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const exists = await db.execute({
      sql: "SELECT slug, claimed FROM attorneys WHERE slug = ?",
      args: [attorneySlug],
    });
    if (exists.rows.length === 0) {
      return NextResponse.json({ error: "Attorney not found" }, { status: 404 });
    }
    if (Number(exists.rows[0].claimed) === 1) {
      return NextResponse.json(
        { error: "This profile has already been claimed" },
        { status: 409 }
      );
    }
    // Prevent duplicate pending claims for the same profile+email
    const dup = await db.execute({
      sql: "SELECT id FROM claim_requests WHERE attorney_slug = ? AND claimant_email = ? AND status = 'pending'",
      args: [attorneySlug, claimantEmail],
    });
    if (dup.rows.length > 0) {
      return NextResponse.json(
        { error: "A claim request for this profile is already pending review" },
        { status: 409 }
      );
    }
    await db.execute({
      sql: `INSERT INTO claim_requests
        (attorney_slug, claimant_name, claimant_email, claimant_phone, bar_number, message)
        VALUES (?, ?, ?, ?, ?, ?)`,
      args: [attorneySlug, claimantName, claimantEmail, claimantPhone, barNumber, message],
    });
    return NextResponse.json(
      { ok: true, message: "Claim request received — we'll review it shortly." },
      { status: 201 }
    );
  } catch (e) {
    console.error("POST /api/claims failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
