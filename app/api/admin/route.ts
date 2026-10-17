import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Admin session check: signed httpOnly cookie set at login. */
async function checkAuth(): Promise<boolean> {
  const email = await getAdminSession();
  return email !== null;
}

/**
 * GET /api/admin?action=claims|reviews&status=pending|approved|rejected
 * Header: x-admin-password: <ADMIN_PASSWORD>
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
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("POST /api/admin failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
