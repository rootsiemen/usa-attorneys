"use client";

import { useState } from "react";

export function SettingsForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (next !== confirm) {
      setMsg({ ok: false, text: "New passwords do not match" });
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "change-password", currentPassword: current, newPassword: next }),
      });
      const d = await r.json();
      if (r.ok) {
        setMsg({ ok: true, text: "Password changed ✓" });
        setCurrent(""); setNext(""); setConfirm("");
      } else {
        setMsg({ ok: false, text: d.error || "Failed" });
      }
    } catch {
      setMsg({ ok: false, text: "Network error" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Site administration settings.</p>

      <div className="admin-card" style={{ maxWidth: 560 }}>
        <h2 style={{ fontFamily: "var(--serif)", color: "#fff", fontSize: 20, margin: "0 0 4px" }}>
          Change Admin Password
        </h2>
        <form onSubmit={submit}>
          <label className="admin-label">Current password</label>
          <input type="password" className="admin-input" value={current} onChange={(e) => setCurrent(e.target.value)} required autoComplete="current-password" />
          <label className="admin-label">New password (min 10 characters)</label>
          <input type="password" className="admin-input" value={next} onChange={(e) => setNext(e.target.value)} required minLength={10} autoComplete="new-password" />
          <label className="admin-label">Confirm new password</label>
          <input type="password" className="admin-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={10} autoComplete="new-password" />
          {msg && (
            <p style={{ color: msg.ok ? "var(--gold-2)" : "#fb7185", fontWeight: 600, margin: "14px 0 0" }}>
              {msg.text}
            </p>
          )}
          <div className="admin-btn-row" style={{ marginTop: 18 }}>
            <button type="submit" className="admin-btn solid" disabled={busy}>
              {busy ? "Saving…" : "Change Password"}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-card" style={{ maxWidth: 560 }}>
        <h2 style={{ fontFamily: "var(--serif)", color: "#fff", fontSize: 20, margin: "0 0 4px" }}>
          Site
        </h2>
        <p className="muted">Domain: usaattorneys.company</p>
        <p className="muted">Forgot-password recovery: /admin/reset (Google owner verification)</p>
      </div>
    </>
  );
}
