import { NextRequest, NextResponse } from "next/server";
import { ensureAdminTables, hashPassword } from "@/lib/admin-auth";
import { getDb, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/reset-token
 * Body: { token, password } — verifies the emailed token and sets the new password.
 * Token is single-use.
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`admin-resettoken:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const token = String(body.token ?? "").trim();
  const password = String(body.password ?? "");
  if (!token || token.length > 128) {
    return NextResponse.json({ error: "Invalid reset link" }, { status: 400 });
  }
  if (password.length < 10 || password.length > 128) {
    return NextResponse.json(
      { error: "Password must be 10–128 characters" },
      { status: 400 }
    );
  }

  await ensureAdminTables();
  const db = getDb();
  const row = await db.execute({
    sql: "SELECT id, reset_expires_at FROM admin_users WHERE reset_token = ? LIMIT 1",
    args: [token],
  });
  if (row.rows.length === 0) {
    return NextResponse.json({ error: "This reset link is invalid or already used" }, { status: 400 });
  }
  const expires = String(row.rows[0].reset_expires_at ?? "");
  if (!expires || new Date(expires).getTime() < Date.now()) {
    return NextResponse.json({ error: "This reset link has expired — request a new one" }, { status: 400 });
  }

  await db.execute({
    sql: `UPDATE admin_users
          SET password_hash = ?, reset_token = NULL, reset_expires_at = NULL, updated_at = datetime('now')
          WHERE id = ?`,
    args: [await hashPassword(password), row.rows[0].id],
  });
  return NextResponse.json({ ok: true });
}
