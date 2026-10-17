"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Claim {
  id: number;
  attorney_slug: string;
  attorney_name: string | null;
  attorney_city: string | null;
  claimant_name: string;
  claimant_email: string;
  claimant_phone: string;
  bar_number: string;
  message: string;
  status: string;
  created_at: string;
}

interface Review {
  id: number;
  attorney_slug: string;
  attorney_name: string | null;
  reviewer_name: string;
  rating: number;
  text: string;
  status: string;
  created_at: string;
}

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"claims" | "reviews">("claims");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, r] = await Promise.all([
        fetch("/api/admin?action=claims&status=pending").then((x) => x.json()),
        fetch("/api/admin?action=reviews&status=pending").then((x) => x.json()),
      ]);
      if (c.error === "Unauthorized" || r.error === "Unauthorized") {
        router.push("/admin/login");
        return;
      }
      setClaims(c.claims || []);
      setReviews(r.reviews || []);
    } catch {
      // network error — keep old data
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(
    kind: "claim" | "review",
    id: number,
    approve: boolean
  ) {
    const action =
      kind === "claim"
        ? approve
          ? "approve-claim"
          : "reject-claim"
        : approve
          ? "approve-review"
          : "reject-review";
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, id }),
    });
    if (r.ok) {
      if (kind === "claim") setClaims((cs) => cs.filter((c) => c.id !== id));
      else setReviews((rs) => rs.filter((x) => x.id !== id));
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Moderation Queue</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--gray-600)" }}>
              Signed in as {adminEmail}
            </p>
          </div>
          <button className="btn btn-outline" onClick={logout}>
            Sign Out
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
          <button
            className={`btn ${tab === "claims" ? "btn-navy" : "btn-outline"}`}
            onClick={() => setTab("claims")}
          >
            Claim Requests ({claims.length})
          </button>
          <button
            className={`btn ${tab === "reviews" ? "btn-navy" : "btn-outline"}`}
            onClick={() => setTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
          <button className="btn btn-outline" onClick={load} disabled={loading}>
            {loading ? "…" : "↻ Refresh"}
          </button>
        </div>

        {tab === "claims" && (
          <div style={{ display: "grid", gap: 16 }}>
            {claims.length === 0 && <p className="notice">No pending claim requests.</p>}
            {claims.map((c) => (
              <div key={c.id} className="card" style={{ padding: 20 }}>
                <p style={{ margin: "0 0 8px" }}>
                  <strong>{c.claimant_name}</strong> ({c.claimant_email}
                  {c.claimant_phone ? `, ${c.claimant_phone}` : ""}) wants to
                  claim{" "}
                  <strong>
                    {c.attorney_name || c.attorney_slug}
                    {c.attorney_city ? ` — ${c.attorney_city}` : ""}
                  </strong>
                </p>
                {c.bar_number && (
                  <p style={{ margin: "0 0 8px" }}>
                    Bar #: {c.bar_number}
                  </p>
                )}
                {c.message && (
                  <p style={{ margin: "0 0 8px", fontStyle: "italic" }}>
                    “{c.message}”
                  </p>
                )}
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#666" }}>
                  Submitted {new Date(c.created_at).toLocaleString()}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-navy"
                    onClick={() => act("claim", c.id, true)}
                  >
                    Approve & Mark Claimed
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => act("claim", c.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div style={{ display: "grid", gap: 16 }}>
            {reviews.length === 0 && <p className="notice">No pending reviews.</p>}
            {reviews.map((r) => (
              <div key={r.id} className="card" style={{ padding: 20 }}>
                <p style={{ margin: "0 0 8px" }}>
                  <strong>{"★".repeat(r.rating)}</strong> by{" "}
                  <strong>{r.reviewer_name}</strong> on{" "}
                  <strong>{r.attorney_name || r.attorney_slug}</strong>
                </p>
                <p style={{ margin: "0 0 8px" }}>{r.text}</p>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#666" }}>
                  Submitted {new Date(r.created_at).toLocaleString()}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="btn btn-navy"
                    onClick={() => act("review", r.id, true)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => act("review", r.id, false)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
