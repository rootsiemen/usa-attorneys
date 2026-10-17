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

interface Stats {
  attorneys: number;
  claimed: number;
  pendingClaims: number;
  pendingReviews: number;
  totalReviews: number;
}

interface AttorneyRow {
  slug: string;
  name: string;
  firm: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  address: string;
  claimed: number;
}

type Tab = "dashboard" | "attorneys" | "claims" | "reviews";

export function AdminDashboard({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  // Attorneys tab state
  const [q, setQ] = useState("");
  const [results, setResults] = useState<AttorneyRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState<AttorneyRow | null>(null);
  const [editVals, setEditVals] = useState({ phone: "", firm: "", city: "", website: "", address: "" });
  const [editClaimed, setEditClaimed] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, c, r] = await Promise.all([
        fetch("/api/admin?action=stats").then((x) => x.json()),
        fetch("/api/admin?action=claims&status=pending").then((x) => x.json()),
        fetch("/api/admin?action=reviews&status=pending").then((x) => x.json()),
      ]);
      if (s.error === "Unauthorized" || c.error === "Unauthorized") {
        router.push("/admin/login");
        return;
      }
      setStats(s.stats || null);
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

  async function searchAttorneys(e?: React.FormEvent) {
    e?.preventDefault();
    if (q.trim().length < 2) return;
    setSearching(true);
    try {
      const d = await fetch(`/api/admin?action=attorneys&q=${encodeURIComponent(q.trim())}`).then((x) => x.json());
      setResults(d.attorneys || []);
    } catch {
      // keep old
    } finally {
      setSearching(false);
    }
  }

  function startEdit(a: AttorneyRow) {
    setEditing(a);
    setEditVals({ phone: a.phone || "", firm: a.firm || "", city: a.city || "", website: a.website || "", address: a.address || "" });
    setEditClaimed(a.claimed === 1);
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-attorney", slug: editing.slug, ...editVals, claimed: editClaimed }),
      });
      if (r.ok) {
        setResults((rs) => rs.map((x) => (x.slug === editing.slug ? { ...x, ...editVals, claimed: editClaimed ? 1 : 0 } : x)));
        setEditing(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function deleteAttorney(a: AttorneyRow) {
    if (!confirm(`Delete "${a.name}" permanently? This also removes their reviews and claim requests.`)) return;
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete-attorney", slug: a.slug }),
    });
    if (r.ok) {
      setResults((rs) => rs.filter((x) => x.slug !== a.slug));
      load();
    }
  }

  async function act(kind: "claim" | "review", id: number, approve: boolean) {
    const action =
      kind === "claim"
        ? approve ? "approve-claim" : "reject-claim"
        : approve ? "approve-review" : "reject-review";
    const r = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, id }),
    });
    if (r.ok) {
      if (kind === "claim") setClaims((cs) => cs.filter((c) => c.id !== id));
      else setReviews((rs) => rs.filter((x) => x.id !== id));
      load();
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "attorneys", label: "Attorneys" },
    { id: "claims", label: "Claim Requests", count: claims.length },
    { id: "reviews", label: "Reviews", count: reviews.length },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0 }}>Admin Panel</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--gray-600)" }}>
              Signed in as {adminEmail}
            </p>
          </div>
          <button className="btn btn-outline" onClick={logout}>
            Sign Out
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`btn ${tab === t.id ? "btn-navy" : "btn-outline"}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.count !== undefined && t.count > 0 ? ` (${t.count})` : ""}
            </button>
          ))}
          <button className="btn btn-outline" onClick={load} disabled={loading}>
            {loading ? "…" : "↻ Refresh"}
          </button>
        </div>

        {tab === "dashboard" && (
          <div className="grid-3">
            {[
              { label: "Attorneys Listed", value: stats?.attorneys ?? "…" },
              { label: "Claimed Profiles", value: stats?.claimed ?? "…" },
              { label: "Pending Claims", value: stats?.pendingClaims ?? "…" },
              { label: "Pending Reviews", value: stats?.pendingReviews ?? "…" },
              { label: "Total Reviews", value: stats?.totalReviews ?? "…" },
              { label: "Unclaimed Profiles", value: stats ? stats.attorneys - stats.claimed : "…" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ textAlign: "center", padding: "26px 20px" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "var(--navy-dark)" }}>
                  {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--gray-600)", textTransform: "uppercase", letterSpacing: 0.6, marginTop: 6 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "attorneys" && (
          <div>
            <form onSubmit={searchAttorneys} style={{ display: "flex", gap: 10, marginBottom: 20, maxWidth: 560 }}>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by attorney or firm name (min 2 chars)…"
                style={{ flex: 1, padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15 }}
              />
              <button type="submit" className="btn btn-navy" disabled={searching}>
                {searching ? "…" : "Search"}
              </button>
            </form>
            {results.length === 0 && q.trim().length >= 2 && !searching && (
              <p className="notice">No attorneys found for “{q.trim()}”.</p>
            )}
            <div style={{ display: "grid", gap: 12 }}>
              {results.map((a) => (
                <div key={a.slug} className="card" style={{ padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <div>
                      <strong style={{ fontSize: 17 }}>{a.name}</strong>{" "}
                      {a.claimed === 1 && <span className="badge-claimed">Claimed</span>}
                      <p style={{ margin: "4px 0", fontSize: 14, color: "var(--gray-600)" }}>
                        {[a.firm, a.city, a.state].filter(Boolean).join(" · ")}
                      </p>
                      {a.phone && <p style={{ margin: 0, fontSize: 14 }}>📞 {a.phone}</p>}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 14 }} onClick={() => startEdit(a)}>
                        Edit
                      </button>
                      <button className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 14, borderColor: "#e11d48", color: "#e11d48" }} onClick={() => deleteAttorney(a)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {editing && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={() => setEditing(null)}>
                <div className="form-card" style={{ margin: 0, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                  <h2 style={{ marginTop: 0, fontSize: 22 }}>Edit — {editing.name}</h2>
                  {(["phone", "firm", "city", "website", "address"] as const).map((f) => (
                    <div key={f}>
                      <label style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "12px 0 4px", textTransform: "capitalize" }}>{f}</label>
                      <input
                        value={editVals[f]}
                        onChange={(e) => setEditVals((v) => ({ ...v, [f]: e.target.value }))}
                        style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15 }}
                      />
                    </div>
                  ))}
                  <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 15, fontWeight: 600 }}>
                    <input type="checkbox" checked={editClaimed} onChange={(e) => setEditClaimed(e.target.checked)} />
                    Claimed profile
                  </label>
                  <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                    <button className="btn btn-navy" onClick={saveEdit} disabled={saving} style={{ flex: 1 }}>
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button className="btn btn-outline" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "claims" && (
          <div style={{ display: "grid", gap: 16 }}>
            {claims.length === 0 && <p className="notice">No pending claim requests.</p>}
            {claims.map((c) => (
              <div key={c.id} className="card" style={{ padding: 20 }}>
                <p style={{ margin: "0 0 8px" }}>
                  <strong>{c.claimant_name}</strong> ({c.claimant_email}
                  {c.claimant_phone ? `, ${c.claimant_phone}` : ""}) wants to claim{" "}
                  <strong>
                    {c.attorney_name || c.attorney_slug}
                    {c.attorney_city ? ` — ${c.attorney_city}` : ""}
                  </strong>
                </p>
                {c.bar_number && <p style={{ margin: "0 0 8px" }}>Bar #: {c.bar_number}</p>}
                {c.message && <p style={{ margin: "0 0 8px", fontStyle: "italic" }}>“{c.message}”</p>}
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#666" }}>
                  Submitted {new Date(c.created_at).toLocaleString()}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-navy" onClick={() => act("claim", c.id, true)}>
                    Approve & Mark Claimed
                  </button>
                  <button className="btn btn-outline" onClick={() => act("claim", c.id, false)}>
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
                  <strong>{"★".repeat(r.rating)}</strong> by <strong>{r.reviewer_name}</strong> on{" "}
                  <strong>{r.attorney_name || r.attorney_slug}</strong>
                </p>
                <p style={{ margin: "0 0 8px" }}>{r.text}</p>
                <p style={{ margin: "0 0 12px", fontSize: 13, color: "#666" }}>
                  Submitted {new Date(r.created_at).toLocaleString()}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-navy" onClick={() => act("review", r.id, true)}>
                    Approve
                  </button>
                  <button className="btn btn-outline" onClick={() => act("review", r.id, false)}>
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
