"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

const EMPTY = { name: "", firm: "", city: "", state: "", phone: "", website: "", address: "" };

export function AttorneysManager() {
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<AttorneyRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState<AttorneyRow | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editClaimed, setEditClaimed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("add") === "1") setAdding(true);
  }, [searchParams]);

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    if (q.trim().length < 2) return;
    setSearching(true);
    setMsg(null);
    try {
      const d = await fetch(`/api/admin?action=attorneys&q=${encodeURIComponent(q.trim())}`).then((x) => x.json());
      setResults(d.attorneys || []);
    } finally {
      setSearching(false);
    }
  }

  function startEdit(a: AttorneyRow) {
    setEditing(a);
    setForm({ name: a.name || "", firm: a.firm || "", city: a.city || "", state: a.state || "", phone: a.phone || "", website: a.website || "", address: a.address || "" });
    setEditClaimed(a.claimed === 1);
    setMsg(null);
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-attorney", slug: editing.slug, phone: form.phone, firm: form.firm, city: form.city, website: form.website, address: form.address, claimed: editClaimed }),
      });
      const d = await r.json();
      if (r.ok) {
        setResults((rs) => rs.map((x) => (x.slug === editing.slug ? { ...x, ...form, claimed: editClaimed ? 1 : 0 } : x)));
        setEditing(null);
        setMsg("Saved ✓");
      } else {
        setMsg(d.error || "Save failed");
      }
    } finally {
      setSaving(false);
    }
  }

  async function addAttorney() {
    if (!form.name.trim() || !form.city.trim() || !form.state.trim()) {
      setMsg("Name, city and state are required");
      return;
    }
    setSaving(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create-attorney", ...form }),
      });
      const d = await r.json();
      if (r.ok) {
        setAdding(false);
        setForm(EMPTY);
        setMsg(`Added ✓ — /attorney/${d.slug}`);
        setQ(form.name);
      } else {
        setMsg(d.error || "Add failed");
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
      setMsg("Deleted");
    }
  }

  function field(key: keyof typeof EMPTY, label: string) {
    return (
      <div>
        <label className="admin-label">{label}</label>
        <input
          className="admin-input"
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      </div>
    );
  }

  return (
    <>
      <h1 className="page-title">Attorneys</h1>
      <p className="page-sub">Search, edit, add or remove attorney listings.</p>

      {msg && <p className="admin-empty" style={{ color: "var(--gold-2)" }}>{msg}</p>}

      <div className="admin-btn-row" style={{ marginBottom: 20 }}>
        <button className="admin-btn solid" onClick={() => { setAdding(true); setForm(EMPTY); setMsg(null); }}>
          + Add Attorney
        </button>
      </div>

      <form onSubmit={search} className="admin-search-row">
        <input
          className="admin-input"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by attorney or firm name (min 2 chars)…"
        />
        <button type="submit" className="admin-btn solid" disabled={searching}>
          {searching ? "…" : "Search"}
        </button>
      </form>

      {results.length === 0 && q.trim().length >= 2 && !searching && (
        <p className="admin-empty">No attorneys found for “{q.trim()}”.</p>
      )}

      {results.map((a) => (
        <div key={a.slug} className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div>
              <p style={{ margin: 0, fontSize: 16 }}>
                <strong>{a.name}</strong>{" "}
                {a.claimed === 1 && <span className="admin-badge">Claimed</span>}
              </p>
              <p className="muted" style={{ margin: "4px 0" }}>
                {[a.firm, a.city, a.state].filter(Boolean).join(" · ")}
              </p>
              {a.phone && <p className="muted" style={{ margin: 0 }}>📞 {a.phone}</p>}
            </div>
            <div className="admin-btn-row" style={{ marginTop: 0 }}>
              <button className="admin-btn" onClick={() => startEdit(a)}>Edit</button>
              <button className="admin-btn danger" onClick={() => deleteAttorney(a)}>Delete</button>
            </div>
          </div>
        </div>
      ))}

      {(editing || adding) && (
        <div className="admin-modal-backdrop" onClick={() => { setEditing(null); setAdding(false); }}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{adding ? "Add Attorney" : `Edit — ${editing?.name}`}</h2>
            <p className="muted" style={{ margin: "0 0 6px", fontSize: 13.5 }}>
              {adding ? "Creates a new public listing." : "Updates the public listing."}
            </p>
            {field("name", "Full name *")}
            {field("firm", "Firm")}
            {field("city", "City *")}
            {field("state", "State (e.g. Texas) *")}
            {field("phone", "Phone")}
            {field("website", "Website")}
            {field("address", "Address")}
            {!adding && (
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 15, color: "#d6dcea" }}>
                <input type="checkbox" checked={editClaimed} onChange={(e) => setEditClaimed(e.target.checked)} />
                Claimed profile
              </label>
            )}
            <div className="admin-btn-row" style={{ marginTop: 22 }}>
              <button className="admin-btn solid" onClick={adding ? addAttorney : saveEdit} disabled={saving} style={{ flex: 1 }}>
                {saving ? "Saving…" : adding ? "Add Attorney" : "Save Changes"}
              </button>
              <button className="admin-btn" onClick={() => { setEditing(null); setAdding(false); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
