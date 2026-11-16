import Link from "next/link";
import { getAllPostsMerged, formatPostDate } from "@/lib/posts";
import { getDbBlogSlugs } from "@/lib/blog-db";
import { requireAdmin } from "../require-admin";
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await requireAdmin();
  const [posts, dbSlugs] = await Promise.all([
    getAllPostsMerged(),
    getDbBlogSlugs(),
  ]);
  const dbCount = posts.filter((p) => dbSlugs.has(p.slug)).length;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h1 className="page-title" style={{ margin: 0 }}>
          Blog
        </h1>
        <Link href="/admin/blog/new" className="admin-btn solid">
          + Add Article
        </Link>
      </div>
      <p className="page-sub">
        {posts.length} published articles — {dbCount} added from this panel
        (live instantly), {posts.length - dbCount} from files (published by
        the daily pipeline).
      </p>
      {posts.map((p) => {
        const isDb = dbSlugs.has(p.slug);
        return (
          <div key={p.slug} className="admin-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 16 }}>
                  <strong>{p.title}</strong>{" "}
                  <span
                    className="muted"
                    style={{
                      fontSize: 12,
                      border: "1px solid rgba(154,167,194,.35)",
                      borderRadius: 999,
                      padding: "1px 8px",
                      marginLeft: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isDb ? "Admin" : "File"}
                  </span>
                </p>
                <p className="muted" style={{ margin: "4px 0 0" }}>
                  {p.practiceAreaTitle} · {formatPostDate(p.date)} ·{" "}
                  {p.readingMinutes} min read
                </p>
              </div>
              <div className="admin-btn-row" style={{ marginTop: 0 }}>
                <Link
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="admin-btn"
                >
                  View →
                </Link>
                {isDb && (
                  <>
                    <Link
                      href={`/admin/blog/${p.slug}/edit`}
                      className="admin-btn"
                    >
                      Edit
                    </Link>
                    <DeletePostButton slug={p.slug} title={p.title} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
