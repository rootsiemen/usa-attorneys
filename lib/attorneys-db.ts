/**
 * Attorney data access — Turso is the single source of truth.
 *
 * SERVER-ONLY: this module imports @libsql/client (via ./db) and must
 * NEVER be imported by client components. Client components should
 * import static data from "@/lib/data" only.
 */
import { getDb, type DbAttorney } from "./db";
import type { Attorney } from "./data";

function rowToAttorney(r: DbAttorney): Attorney {
  let practiceAreas: string[] = [];
  try {
    practiceAreas = JSON.parse(r.practice_areas || "[]");
  } catch {
    practiceAreas = [];
  }
  return {
    slug: r.slug,
    name: r.name,
    firm: r.firm || "",
    state: r.state,
    city: r.city,
    phone: r.phone || "",
    website: r.website || undefined,
    address: r.address || undefined,
    practiceAreas,
    yearsLicensed: r.years_licensed ?? undefined,
    bio: r.bio || undefined,
    claimed: r.claimed === 1,
  };
}

export async function getAttorneysByState(
  stateSlug: string
): Promise<Attorney[]> {
  const db = getDb();
  const res = await db.execute({
    sql: "SELECT * FROM attorneys WHERE state = ? ORDER BY claimed DESC, name ASC",
    args: [stateSlug],
  });
  return res.rows.map((r) => rowToAttorney(r as unknown as DbAttorney));
}

export async function getAttorney(
  slug: string
): Promise<Attorney | undefined> {
  const db = getDb();
  const res = await db.execute({
    sql: "SELECT * FROM attorneys WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  if (res.rows.length === 0) return undefined;
  return rowToAttorney(res.rows[0] as unknown as DbAttorney);
}

/** All attorney slugs — for generateStaticParams. */
export async function getAllAttorneySlugs(): Promise<string[]> {
  const db = getDb();
  const res = await db.execute("SELECT slug FROM attorneys ORDER BY slug ASC");
  return res.rows.map((r) => String(r.slug));
}

/** Total attorney count — for index pages. */
export async function getAttorneyCount(): Promise<number> {
  const db = getDb();
  const res = await db.execute("SELECT COUNT(*) AS n FROM attorneys");
  return Number(res.rows[0]?.n ?? 0);
}

/**
 * Attorneys for a practice area. practice_areas is a JSON array column;
 * match via json_each so '"slug"' doesn't false-positive on substrings.
 */
export async function getAttorneysByPractice(
  practiceSlug: string,
  limit: number = 12
): Promise<Attorney[]> {
  const db = getDb();
  const res = await db.execute({
    sql: `SELECT a.* FROM attorneys a, json_each(a.practice_areas) j
          WHERE j.value = ? ORDER BY a.claimed DESC, a.name ASC LIMIT ?`,
    args: [practiceSlug, limit],
  });
  return res.rows.map((r) => rowToAttorney(r as unknown as DbAttorney));
}
