import { getDb, isDbConfigured } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/admin-auth";

export interface Customer {
  id: number;
  email: string;
  name: string;
}

/** Lazily creates the customers table (safe to call on every request). */
export async function ensureCustomersTable(): Promise<void> {
  if (!isDbConfigured()) return;
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(
    `CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email)`
  );
}

function cleanEmail(v: unknown): string {
  return String(v ?? "").trim().toLowerCase().slice(0, 160);
}

/** Lazy migration: adds reset_token + reset_expires_at columns if missing. */
export async function ensureCustomerResetColumns(): Promise<void> {
  if (!isDbConfigured()) return;
  await ensureCustomersTable();
  const db = getDb();
  const cols = await db.execute({ sql: "PRAGMA table_info(customers)", args: [] });
  const names = new Set(cols.rows.map((r) => String(r.name)));
  if (!names.has("reset_token")) {
    await db.execute({ sql: "ALTER TABLE customers ADD COLUMN reset_token TEXT", args: [] });
  }
  if (!names.has("reset_expires_at")) {
    await db.execute({ sql: "ALTER TABLE customers ADD COLUMN reset_expires_at TEXT", args: [] });
  }
}

export function validEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Creates a customer; returns error string on failure, customer on success. */
export async function createCustomer(
  name: string,
  email: string,
  password: string
): Promise<{ customer?: Customer; error?: string }> {
  email = cleanEmail(email);
  name = String(name ?? "").trim().slice(0, 80);
  if (!name) return { error: "Please enter your name" };
  if (!validEmail(email)) return { error: "Enter a valid email address" };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };
  if (password.length > 128) return { error: "Password is too long" };
  try {
    await ensureCustomersTable();
    const db = getDb();
    const existing = await db.execute({
      sql: "SELECT id FROM customers WHERE email = ? LIMIT 1",
      args: [email],
    });
    if (existing.rows.length > 0) {
      return { error: "An account with this email already exists — please log in" };
    }
    const res = await db.execute({
      sql: "INSERT INTO customers (email, name, password_hash) VALUES (?, ?, ?)",
      args: [email, name, await hashPassword(password)],
    });
    return {
      customer: { id: Number(res.lastInsertRowid ?? 0), email, name },
    };
  } catch (e) {
    console.error("createCustomer failed:", e);
    return { error: "Database error — please try again" };
  }
}

/** Verifies email+password; returns customer or null. */
export async function verifyCustomer(
  email: string,
  password: string
): Promise<Customer | null> {
  email = cleanEmail(email);
  if (!validEmail(email) || !password) return null;
  try {
    await ensureCustomersTable();
    const db = getDb();
    const res = await db.execute({
      sql: "SELECT id, email, name, password_hash FROM customers WHERE email = ? LIMIT 1",
      args: [email],
    });
    const row = res.rows[0];
    if (!row) return null;
    const ok = await verifyPassword(password, String(row.password_hash));
    if (!ok) return null;
    return { id: Number(row.id), email: String(row.email), name: String(row.name) };
  } catch (e) {
    console.error("verifyCustomer failed:", e);
    return null;
  }
}
