import { NextRequest, NextResponse } from "next/server";
import {
  ensureAdminTables,
  verifyPassword,
  createAdminSessionValue,
  adminSessionCookie,
} from "@/lib/admin-auth";
import { getDb, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/login
 * Body: { email, password } — sets a signed httpOnly session cookie on success.
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`admin-login:${ip}`, 10, 60_000)) {
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
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  try {
    await ensureAdminTables();
    const db = getDb();
    const res = await db.execute({
      sql: "SELECT email, password_hash FROM admin_users WHERE email = ? LIMIT 1",
      args: [email],
    });
    const row = res.rows[0];
    // Constant-time-ish: always run a verify to avoid user enumeration timing leaks.
    const ok = row
      ? await verifyPassword(password, String(row.password_hash))
      : await verifyPassword(password, "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinval");
    if (!ok || !row) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const out = NextResponse.json({ ok: true });
    const c = adminSessionCookie(createAdminSessionValue(String(row.email)));
    out.cookies.set(c.name, c.value, {
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
      path: c.path,
      maxAge: c.maxAge,
    });
    return out;
  } catch (e) {
    console.error("POST /api/admin/login failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
