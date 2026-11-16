"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Delete "${title}" permanently?`)) return;
    setBusy(true);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete-post", slug }),
      });
      if (r.ok) {
        router.refresh();
      } else {
        const d = await r.json().catch(() => ({}));
        alert(d.error || "Delete failed");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="admin-btn danger" onClick={remove} disabled={busy}>
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
