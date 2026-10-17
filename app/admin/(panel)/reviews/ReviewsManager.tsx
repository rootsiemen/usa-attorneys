"use client";

import { useCallback, useEffect, useState } from "react";

interface Review {
  id: number;
  attorney_slug: string;
  attorney_name: string | null;
  reviewer_name: string;
  rating: number;
  text: string;
  created_at: string;
}

export function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetch("/api/admin?action=reviews&status=pending").then((x) => x.json());
      setReviews(d.reviews || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function act(id: number, approve: boolean) {
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: approve ? "approve-review" : "reject-review", id }),
    });
    if (r.ok) setReviews((rs) => rs.filter((x) => x.id !== id));
  }

  return (
    <>
      <h1 className="page-title">Reviews</h1>
      <p className="page-sub">Moderate customer reviews before they go live.</p>
      {loading ? (
        <p className="admin-empty">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="admin-empty">Nothing waiting. 🎉</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="admin-card">
            <p>
              <strong style={{ color: "var(--gold-2)" }}>{"★".repeat(r.rating)}</strong>{" "}
              by <strong>{r.reviewer_name}</strong> on{" "}
              <strong>{r.attorney_name || r.attorney_slug}</strong>
            </p>
            <p>{r.text}</p>
            <p className="muted">Submitted {new Date(r.created_at).toLocaleString()}</p>
            <div className="admin-btn-row">
              <button className="admin-btn solid" onClick={() => act(r.id, true)}>Approve</button>
              <button className="admin-btn danger" onClick={() => act(r.id, false)}>Reject</button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
