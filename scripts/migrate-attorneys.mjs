#!/usr/bin/env node
/**
 * Migrate attorneys from lib/data.ts ATTORNEYS array into Turso.
 *
 * Usage:
 *   TURSO_DATABASE_URL="libsql://..." TURSO_AUTH_TOKEN="..." node scripts/migrate-attorneys.mjs
 *
 * Requires schema.sql to have been applied first.
 * Safe to re-run: uses INSERT OR IGNORE on slug (unique).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@libsql/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN first.");
  process.exit(1);
}

function loadAttorneys() {
  // Source 1: lib/data.ts ATTORNEYS array (if still present)
  try {
    const src = readFileSync(join(ROOT, "lib", "data.ts"), "utf8");
    const marker = "export const ATTORNEYS: Attorney[] = [";
    const start = src.indexOf(marker);
    if (start !== -1) {
      const arrayStart = src.indexOf("[", start);
      const nextFn = src.indexOf("export function getAttorneysByState", arrayStart);
      const arrayEnd = src.lastIndexOf("];", nextFn);
      if (arrayEnd !== -1) {
        const arraySrc = src.slice(arrayStart, arrayEnd + 1);
        const attorneys = new Function(`return (${arraySrc});`)();
        if (Array.isArray(attorneys) && attorneys.length > 0) {
          console.log("Source: lib/data.ts ATTORNEYS array");
          return attorneys;
        }
      }
    }
  } catch (e) {
    console.log("lib/data.ts parse failed, trying backup:", String(e).slice(0, 100));
  }

  // Source 2: local backup JSON (seed format — generate slugs)
  return loadFromBackup();
}

const STATE_ABBR = {
  alabama: "al", alaska: "ak", arizona: "az", arkansas: "ar", california: "ca",
  colorado: "co", connecticut: "ct", delaware: "de", florida: "fl", georgia: "ga",
  hawaii: "hi", idaho: "id", illinois: "il", indiana: "in", iowa: "ia",
  kansas: "ks", kentucky: "ky", louisiana: "la", maine: "me", maryland: "md",
  massachusetts: "ma", michigan: "mi", minnesota: "mn", mississippi: "ms",
  missouri: "mo", montana: "mt", nebraska: "ne", nevada: "nv", "new-hampshire": "nh",
  "new-jersey": "nj", "new-mexico": "nm", "new-york": "ny", "north-carolina": "nc",
  "north-dakota": "nd", ohio: "oh", oklahoma: "ok", oregon: "or", pennsylvania: "pa",
  "rhode-island": "ri", "south-carolina": "sc", "south-dakota": "sd", tennessee: "tn",
  texas: "tx", utah: "ut", vermont: "vt", virginia: "va", washington: "wa",
  "west-virginia": "wv", wisconsin: "wi", wyoming: "wy",
};

const PRACTICE_SLUG_MAP = {
  "personal-injury-lawyer": "personal-injury-lawyer",
  "criminal-defense-lawyer": "criminal-defense-attorney",
  "divorce-lawyer": "divorce-attorney",
};

function loadFromBackup() {
  const backupPath = join(
    process.env.HOME || "/home/hatch",
    "workspace", "backups", "usa-attorneys",
    "attorneys-full-backup-2026-10-17.json"
  );
  const raw = JSON.parse(readFileSync(backupPath, "utf8"));
  console.log(`Source: backup JSON (${backupPath})`);
  const seen = new Set();
  return raw.map((a) => {
    const abbr = STATE_ABBR[a.state] || "";
    let slug = `${a.name} ${a.city} ${abbr}`
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
    let i = 2;
    const base = slug;
    while (seen.has(slug)) slug = `${base}-${i++}`;
    seen.add(slug);
    return {
      slug,
      name: a.name,
      firm: a.firm || "",
      state: a.state,
      city: a.city,
      phone: a.phone || "",
      website: a.website || "",
      address: a.address || "",
      practiceAreas: (a.practiceAreas || []).map(
        (p) => PRACTICE_SLUG_MAP[p] || p
      ),
      yearsLicensed: undefined,
      bio: "",
      claimed: false,
    };
  });
}

const attorneys = loadAttorneys();
console.log(`Parsed ${attorneys.length} attorneys from lib/data.ts`);

const db = createClient({ url, authToken });

let inserted = 0;
let skipped = 0;
const BATCH = 50;

for (let i = 0; i < attorneys.length; i += BATCH) {
  const chunk = attorneys.slice(i, i + BATCH);
  const stmts = chunk.map((a) => ({
    sql: `INSERT OR IGNORE INTO attorneys
      (slug, name, firm, state, city, phone, website, address, practice_areas, years_licensed, bio, claimed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      a.slug,
      a.name,
      a.firm ?? "",
      a.state,
      a.city,
      a.phone,
      a.website ?? "",
      a.address ?? "",
      JSON.stringify(a.practiceAreas ?? []),
      typeof a.yearsLicensed === "number" ? a.yearsLicensed : null,
      a.bio ?? "",
      a.claimed ? 1 : 0,
    ],
  }));
  const res = await db.batch(stmts);
  for (const r of res) {
    // rowsAffected is 1 on insert, 0 on IGNORE (conflict)
    if (Number(r.rowsAffected ?? 0) > 0) inserted++;
    else skipped++;
  }
  console.log(`  ... ${Math.min(i + BATCH, attorneys.length)}/${attorneys.length}`);
}

const count = await db.execute("SELECT COUNT(*) AS n FROM attorneys");
console.log(`Done. Inserted: ${inserted}, skipped (already present): ${skipped}`);
console.log(`Total rows in attorneys: ${count.rows[0].n}`);
db.close();
