import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb, isDbConfigured } from "@/lib/db";
import {
  ensureAdminTables,
  createAdminSessionValue,
  adminSessionCookie,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/oauth-callback
 * After Google sign-in (from the admin login page), grants the admin session
 * cookie if the Google email matches an existing admin user, then redirects
 * to /admin. Otherwise redirects back to /admin/login with an error.
 */
export async function GET(req: NextRequest) {
  const loginUrl = new URL("/admin/login", req.url);
  const session = await getServerSession(authOptions);
  const email = (session?.user?.email || "").trim().toLowerCase();
  if (!email) {
    loginUrl.searchParams.set("error", "google-failed");
    return NextResponse.redirect(loginUrl);
  }
  if (!isDbConfigured()) {
    loginUrl.searchParams.set("error", "db");
    return NextResponse.redirect(loginUrl);
  }
  try {
    await ensureAdminTables();
    const db = getDb();
    const res = await db.execute({
      sql: "SELECT email FROM admin_users WHERE email = ? LIMIT 1",
      args: [email],
    });
    if (res.rows.length === 0) {
      loginUrl.searchParams.set("error", "not-admin");
      return NextResponse.redirect(loginUrl);
    }
    const out = NextResponse.redirect(new URL("/admin", req.url));
    const c = adminSessionCookie(createAdminSessionValue(String(res.rows[0].email)));
    out.cookies.set(c.name, c.value, {
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
      path: c.path,
      maxAge: c.maxAge,
    });
    return out;
  } catch (e) {
    console.error("GET /api/admin/oauth-callback failed:", e);
    loginUrl.searchParams.set("error", "db");
    return NextResponse.redirect(loginUrl);
  }
}
