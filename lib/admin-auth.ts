import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb, isDbConfigured } from "@/lib/db";

/** The site owner's email — full access + password recovery. */
export const OWNER_EMAIL = "neilsonsmarry@gmail.com";

const COOKIE_NAME = "ua_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "usa-attorneys-admin-fallback-secret"
  );
}

/** Lazily creates the admin_users table (safe to call on every request). */
export async function ensureAdminTables(): Promise<void> {
  if (!isDbConfigured()) return;
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  // Lazy migration: password-reset token columns (email flow)
  const cols = await db.execute("PRAGMA table_info(admin_users)");
  const names = new Set(cols.rows.map((r) => String(r.name)));
  if (!names.has("reset_token")) {
    await db.execute("ALTER TABLE admin_users ADD COLUMN reset_token TEXT");
  }
  if (!names.has("reset_expires_at")) {
    await db.execute("ALTER TABLE admin_users ADD COLUMN reset_expires_at TEXT");
  }
}

export async function adminUserCount(): Promise<number> {
  if (!isDbConfigured()) return 0;
  await ensureAdminTables();
  const db = getDb();
  const res = await db.execute("SELECT COUNT(*) AS n FROM admin_users");
  return Number(res.rows[0]?.n ?? 0);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

/** Creates a signed session cookie value for the given admin email. */
export function createAdminSessionValue(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + SESSION_TTL_MS })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verifies a session cookie value; returns the admin email or null. */
export function verifyAdminSessionValue(value: string | undefined): string | null {
  if (!value) return null;
  const parts = value.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = Buffer.from(sign(payload), "utf8");
  const provided = Buffer.from(sig, "utf8");
  if (expected.length !== provided.length) return null;
  if (!timingSafeEqual(expected, provided)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.email !== "string" || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;
    return data.email;
  } catch {
    return null;
  }
}

/** Server-side: returns the logged-in admin's email, or null. */
export async function getAdminSession(): Promise<string | null> {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  return verifyAdminSessionValue(value);
}

export function adminSessionCookie(value: string) {
  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

/** Returns the Google session if it belongs to the site owner, else null. */
export async function getOwnerSession() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
    return session;
  }
  return null;
}
