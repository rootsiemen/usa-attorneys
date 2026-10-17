import { NextRequest, NextResponse } from "next/server";
import { createCustomer } from "@/lib/customers";
import { isDbConfigured } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/customer/signup
 * Body: { name, email, password } — creates a customer account.
 * The client then signs in via NextAuth credentials provider.
 */
export async function POST(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const ip = getClientIp(req);
  if (!checkRateLimit(`customer-signup:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts — try again later" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { customer, error } = await createCustomer(
    String(body.name ?? ""),
    String(body.email ?? ""),
    String(body.password ?? "")
  );
  if (error || !customer) {
    // 409 when the email is already registered
    const status = error?.includes("already exists") ? 409 : 400;
    return NextResponse.json({ error: error || "Signup failed" }, { status });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
