import { createClient, type Client } from "@libsql/client";

let _client: Client | null = null;

/**
 * Returns true when Turso credentials are present in the environment.
 * Use this to gracefully degrade features that need the DB (reviews,
 * claims, admin) when env vars are missing — e.g. during `next build`.
 */
export function isDbConfigured(): boolean {
  return Boolean(
    process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN
  );
}

/**
 * Lazily creates (and caches) the libsql client.
 * Throws if TURSO_DATABASE_URL / TURSO_AUTH_TOKEN are not set —
 * callers should check isDbConfigured() first and return a
 * 503 / degraded response instead of crashing the build.
 */
export function getDb(): Client {
  if (_client) return _client;
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    throw new Error(
      "Database not configured: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN"
    );
  }
  _client = createClient({ url, authToken });
  return _client;
}

export interface DbAttorney {
  id: number;
  slug: string;
  name: string;
  firm: string;
  state: string;
  city: string;
  phone: string;
  website: string;
  address: string;
  practice_areas: string; // JSON array string
  years_licensed: number | null;
  bio: string;
  claimed: number;
  created_at: string;
}

export interface DbClaimRequest {
  id: number;
  attorney_slug: string;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  bar_number: string;
  message: string;
  status: string;
  created_at: string;
}

export interface DbReview {
  id: number;
  attorney_slug: string;
  reviewer_name: string;
  rating: number;
  text: string;
  status: string;
  created_at: string;
}
