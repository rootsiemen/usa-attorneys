"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface EditorArea {
  slug: string;
  title: string;
}
export interface EditorState {
  slug: string;
  name: string;
}
export interface EditorInitial {
  slug: string;
  title: string;
  description: string;
  date: string;
  practiceArea: string;
  state?: string;
  keywords: string[];
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

export default function BlogEditor({
  areas,
  states,
  today,
  initial,
}: {
  areas: EditorArea[];
  states: EditorState[];
  today: string;
  initial?: EditorInitial;
}) {
  const router = useRouter();
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? today);
  const [practiceArea, setPracticeArea] = useState(
    initial?.practiceArea ?? areas[0]?.slug ?? ""
  );
  const [state, setState] = useState(initial?.state ?? "");
  const [keywords, setKeywords] = useState(
    (initial?.keywords ?? []).join(", ")
  );
  const [content, setContent] = useState(initial?.content ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  async function save() {
    if (!title.trim()) return setMsg("Title is required");
    if (!slug.trim()) return setMsg("URL slug is required");
    if (content.trim().length < 50)
      return setMsg("Article body is too short — write at least a paragraph");
    setSaving(true);
    setMsg(null);
    try {
      const r = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editing ? "update-post" : "create-post",
          slug,
          title,
          description,
          date,
          practiceArea,
          state,
          keywords,
          content,
        }),
      });
      const d = await r.json();
      if (r.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setMsg(d.error || "Save failed");
      }
    } catch {
      setMsg("Save failed — network error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div>
        <label className="admin-label">Title *</label>
        <input
          className="admin-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="How Much Is a Car Accident Settlement in 2026?"
        />
      </div>
      <div>
        <label className="admin-label">URL slug *</label>
        <input
          className="admin-input"
          value={slug}
          disabled={editing}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          placeholder="car-accident-settlement-2026"
        />
        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
          Published at /blog/{slug || "…"}
          {editing ? " — the URL cannot change after publishing." : ""}
        </p>
      </div>
      <div>
        <label className="admin-label">Description (meta, ~150 characters)</label>
        <input
          className="admin-input"
          value={description}
          maxLength={300}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="One-line summary shown on Google and the blog index."
        />
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}>
          <label className="admin-label">Date *</label>
          <input
            className="admin-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ flex: "1 1 240px" }}>
          <label className="admin-label">Practice area *</label>
          <select
            className="admin-input"
            value={practiceArea}
            onChange={(e) => setPracticeArea(e.target.value)}
          >
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.title}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <label className="admin-label">State (optional)</label>
          <select
            className="admin-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">— None —</option>
            {states.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="admin-label">Keywords (comma-separated)</label>
        <input
          className="admin-input"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="car accident settlement, average payout"
        />
      </div>
      <div>
        <label className="admin-label">
          Article body (Markdown) * — {wordCount} words
        </label>
        <textarea
          className="admin-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={26}
          style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, lineHeight: 1.55 }}
          placeholder={"## First heading\n\nWrite the article in Markdown. Use ## for sections, - for lists, and [link text](/personal-injury-lawyer) for internal links.\n\nImages: ![alt text](https://images.unsplash.com/...) on its own line."}
        />
        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
          The legal disclaimer is added automatically by the article template —
          do not write your own. Aim for 1,500+ words.
        </p>
      </div>
      {msg && (
        <p style={{ color: "#e88", margin: "12px 0 0" }}>{msg}</p>
      )}
      <div className="admin-btn-row" style={{ marginTop: 18 }}>
        <button className="admin-btn solid" onClick={save} disabled={saving}>
          {saving ? "Saving…" : editing ? "Save changes" : "Publish article"}
        </button>
        <button
          className="admin-btn"
          onClick={() => router.push("/admin/blog")}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
