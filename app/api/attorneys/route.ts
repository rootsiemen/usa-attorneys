import { NextRequest, NextResponse } from "next/server";
import { getDb, isDbConfigured, type DbAttorney } from "@/lib/db";

export const dynamic = "force-dynamic";

function rowToAttorney(r: DbAttorney) {
  let practiceAreas: string[] = [];
  try {
    practiceAreas = JSON.parse(r.practice_areas || "[]");
  } catch {
    practiceAreas = [];
  }
  return {
    slug: r.slug,
    name: r.name,
    firm: r.firm,
    state: r.state,
    city: r.city,
    phone: r.phone,
    website: r.website || undefined,
    address: r.address || undefined,
    practiceAreas,
    yearsLicensed: r.years_licensed ?? undefined,
    bio: r.bio || undefined,
    claimed: r.claimed === 1,
  };
}

/**
 * GET /api/attorneys?state=texas&practice=personal-injury-lawyer&limit=50&offset=0&q=smith
 * Lists attorneys from the database. Used for dynamic features
 * (search, filters).
 */
export async function GET(req: NextRequest) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Directory database not configured yet" },
      { status: 503 }
    );
  }
  const { searchParams } = new URL(req.url);
  const state = (searchParams.get("state") || "").trim().toLowerCase();
  const practice = (searchParams.get("practice") || "").trim().toLowerCase();
  const q = (searchParams.get("q") || "").trim();
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "50", 10) || 50, 1), 200);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10) || 0, 0);

  const where: string[] = [];
  const args: (string | number)[] = [];
  if (state) {
    where.push("state = ?");
    args.push(state);
  }
  if (practice) {
    // practice_areas is a JSON array column — exact match via json_each
    where.push(
      "EXISTS (SELECT 1 FROM json_each(attorneys.practice_areas) j WHERE j.value = ?)"
    );
    args.push(practice);
  }
  if (q) {
    where.push("(name LIKE ? OR firm LIKE ? OR city LIKE ?)");
    const like = `%${q.replace(/[%_]/g, "")}%`;
    args.push(like, like, like);
  }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  try {
    const db = getDb();
    const countRes = await db.execute({
      sql: `SELECT COUNT(*) AS n FROM attorneys ${whereSql}`,
      args,
    });
    const total = Number(countRes.rows[0]?.n ?? 0);
    const res = await db.execute({
      sql: `SELECT * FROM attorneys ${whereSql} ORDER BY claimed DESC, name ASC LIMIT ? OFFSET ?`,
      args: [...args, limit, offset],
    });
    return NextResponse.json({
      total,
      limit,
      offset,
      attorneys: res.rows.map((r) => rowToAttorney(r as unknown as DbAttorney)),
    });
  } catch (e) {
    console.error("GET /api/attorneys failed:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
