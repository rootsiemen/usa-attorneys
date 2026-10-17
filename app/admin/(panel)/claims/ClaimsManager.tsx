"use client";

import { useCallback, useEffect, useState } from "react";

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
  created_at: string;
}

export function ClaimsManager() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await fetch("/api/admin?action=claims&status=pending").then((x) => x.json());
      setClaims(d.claims || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function act(id: number, approve: boolean) {
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: approve ? "approve-claim" : "reject-claim", id }),
    });
    if (r.ok) setClaims((cs) => cs.filter((c) => c.id !== id));
  }

  return (
    <>
      <h1 className="page-title">Claim Requests</h1>
      <p className="page-sub">Attorneys asking to claim and verify their listings.</p>
      {loading ? (
        <p className="admin-empty">Loading…</p>
      ) : claims.length === 0 ? (
        <p className="admin-empty">Nothing waiting. 🎉</p>
      ) : (
        claims.map((c) => (
          <div key={c.id} className="admin-card">
            <p>
              <strong>{c.claimant_name}</strong> ({c.claimant_email}
              {c.claimant_phone ? `, ${c.claimant_phone}` : ""}) wants to claim{" "}
              <strong>
                {c.attorney_name || c.attorney_slug}
                {c.attorney_city ? ` — ${c.attorney_city}` : ""}
              </strong>
            </p>
            {c.bar_number && <p>Bar #: {c.bar_number}</p>}
            {c.message && <p style={{ fontStyle: "italic" }}>“{c.message}”</p>}
            <p className="muted">Submitted {new Date(c.created_at).toLocaleString()}</p>
            <div className="admin-btn-row">
              <button className="admin-btn solid" onClick={() => act(c.id, true)}>Approve & Mark Claimed</button>
              <button className="admin-btn danger" onClick={() => act(c.id, false)}>Reject</button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
