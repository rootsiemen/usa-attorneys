import { NextRequest, NextResponse } from "next/server";
import {
  ensureAdminTables,
  adminUserCount,
  hashPassword,
  createAdminSessionValue,
  adminSessionCookie,
} from "@/lib/admin-auth";
import { isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function cleanEmail(v: unknown): string {
  return String(v ?? "").trim().toLowerCase().slice(0, 160);
}

/**
 * POST /api/admin/setup
 * First-time setup only: creates the first admin user.
 * Body: { email, password } — password must be 10+ chars.
 * Refused once any admin user exists.
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`admin-setup:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const email = cleanEmail(body.email);
  const password = String(body.password ?? "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }
  if (password.length < 10) {
    return NextResponse.json({ error: "Password must be at least 10 characters" }, { status: 400 });
  }
  if (password.length > 128) {
    return NextResponse.json({ error: "Password is too long" }, { status: 400 });
  }
  try {
    await ensureAdminTables();
    if ((await adminUserCount()) > 0) {
      return NextResponse.json({ error: "Admin already set up — please log in" }, { status: 403 });
    }
    const { getDb } = await import("@/lib/db");
    const db = getDb();
    await db.execute({
      sql: "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)",
      args: [email, await hashPassword(password)],
    });
    const res = NextResponse.json({ ok: true });
    const c = adminSessionCookie(createAdminSessionValue(email));
    res.cookies.set(c.name, c.value, {
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
      path: c.path,
      maxAge: c.maxAge,
    });
    return res;
  } catch (e) {
    console.error("POST /api/admin/setup failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
