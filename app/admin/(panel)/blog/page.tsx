import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { requireAdmin } from "../require-admin";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await requireAdmin();
  const posts = getAllPosts();

  return (
    <>
      <h1 className="page-title">Blog</h1>
      <p className="page-sub">
        {posts.length} published articles. New articles publish automatically 3× daily —
        this list is read-only.
      </p>
      {posts.map((p) => (
        <div key={p.slug} className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, fontSize: 16 }}>
                <strong>{p.title}</strong>
              </p>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                {p.practiceAreaTitle} · {formatPostDate(p.date)} · {p.readingMinutes} min read
              </p>
            </div>
            <Link href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="admin-btn">
              View →
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
