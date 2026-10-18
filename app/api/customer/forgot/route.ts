import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { ensureCustomerResetColumns, validEmail } from "@/lib/customers";
import { sendCustomerResetEmail, isEmailConfigured } from "@/lib/email";
import { getDb, isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/customer/forgot
 * Body: { email } — generates a 1-hour reset token and emails the reset link.
 * Always returns ok:true (no email enumeration).
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`customer-forgot:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 160);
  if (!email || !validEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  await ensureCustomerResetColumns();
  const db = getDb();
  const row = await db.execute({
    sql: "SELECT id FROM customers WHERE email = ? LIMIT 1",
    args: [email],
  });

  // Only real customers get a token — but always respond ok to avoid enumeration.
  if (row.rows.length > 0 && isEmailConfigured()) {
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await db.execute({
      sql: "UPDATE customers SET reset_token = ?, reset_expires_at = ? WHERE email = ?",
      args: [token, expires, email],
    });
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://usaattorneys.company");
    const resetUrl = `${base}/reset-password/${token}`;
    // Fire-and-forget — don't block the response on SMTP.
    sendCustomerResetEmail(email, resetUrl).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
