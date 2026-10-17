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
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("POST /api/admin failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
