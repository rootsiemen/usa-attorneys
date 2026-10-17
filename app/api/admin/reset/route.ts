import { NextRequest, NextResponse } from "next/server";
import {
  ensureAdminTables,
  adminUserCount,
  hashPassword,
  getOwnerSession,
} from "@/lib/admin-auth";
import { getDb, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/reset
 * Password reset for the site owner: requires a Google session belonging to
 * the owner email. Body: { email, password } — resets that admin's password.
 */
export async function POST(req: NextRequest) {
  const owner = await getOwnerSession();
  if (!owner) {
    return NextResponse.json(
      { error: "Owner sign-in required", ownerRequired: true },
      { status: 401 }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`admin-reset:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 160);
  const password = String(body.password ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (password.length < 10 || password.length > 128) {
    return NextResponse.json(
      { error: "Password must be 10–128 characters" },
      { status: 400 }
    );
  }
  try {
    await ensureAdminTables();
    if ((await adminUserCount()) === 0) {
      return NextResponse.json({ error: "No admin account exists yet" }, { status: 404 });
    }
    const db = getDb();
    const res = await db.execute({
      sql: "UPDATE admin_users SET password_hash = ?, updated_at = datetime('now') WHERE email = ?",
      args: [await hashPassword(password), email],
    });
    if (res.rowsAffected === 0) {
      return NextResponse.json({ error: "No admin account with that email" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/admin/reset failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
