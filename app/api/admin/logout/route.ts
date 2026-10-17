import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/logout — clears the admin session cookie. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  const c = clearAdminSessionCookie();
  res.cookies.set(c.name, c.value, {
    httpOnly: c.httpOnly,
    secure: c.secure,
    sameSite: c.sameSite,
    path: c.path,
    maxAge: c.maxAge,
  });
  return res;
}
