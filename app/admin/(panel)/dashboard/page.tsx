import Link from "next/link";
import { getDb, isDbConfigured } from "@/lib/db";
import { requireAdmin } from "../require-admin";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  if (!isDbConfigured()) return null;
  const db = getDb();
  const [a, c, pc, pr, tr, cu, pend] = await Promise.all([
    db.execute("SELECT COUNT(*) AS n FROM attorneys"),
    db.execute("SELECT COUNT(*) AS n FROM attorneys WHERE claimed = 1"),
    db.execute("SELECT COUNT(*) AS n FROM claim_requests WHERE status = 'pending'"),
    db.execute("SELECT COUNT(*) AS n FROM reviews WHERE status = 'pending'"),
    db.execute("SELECT COUNT(*) AS n FROM reviews"),
    db.execute("SELECT COUNT(*) AS n FROM customers"),
    db.execute({
      sql: `SELECT r.id, r.reviewer_name, r.rating, r.text, r.created_at, a.name AS attorney_name
            FROM reviews r LEFT JOIN attorneys a ON a.slug = r.attorney_slug
            WHERE r.status = 'pending' ORDER BY r.created_at DESC LIMIT 5`,
      args: [],
    }),
  ]);
  return {
    attorneys: Number(a.rows[0]?.n ?? 0),
    claimed: Number(c.rows[0]?.n ?? 0),
    pendingClaims: Number(pc.rows[0]?.n ?? 0),
    pendingReviews: Number(pr.rows[0]?.n ?? 0),
    totalReviews: Number(tr.rows[0]?.n ?? 0),
    customers: Number(cu.rows[0]?.n ?? 0),
    pending: pend.rows,
  };
}

export default async function DashboardPage() {
  const email = await requireAdmin();
  const data = await getDashboardData();
  const { getAllPosts } = await import("@/lib/posts");
  const postCount = getAllPosts().length;

  const cards = [
    { label: "Live Listings", value: data?.attorneys ?? "—" },
    { label: "Claimed Profiles", value: data?.claimed ?? "—" },
    { label: "Reviews to Moderate", value: data?.pendingReviews ?? "—" },
    { label: "Pending Claims", value: data?.pendingClaims ?? "—" },
    { label: "Registered Users", value: data?.customers ?? "—" },
    { label: "Published Articles", value: postCount },
  ];

  return (
    <>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Welcome back, {email.split("@")[0]}.</p>

      <div className="stat-cards">
        {cards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="num">
              {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
            </div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-section-head">
        <h2>Pending reviews</h2>
        <Link href="/admin/reviews" className="admin-btn">All Reviews</Link>
      </div>
      {!data || data.pending.length === 0 ? (
        <p className="admin-empty">Nothing waiting. 🎉</p>
      ) : (
        data.pending.map((r) => (
          <div key={String(r.id)} className="admin-card">
            <p>
              <strong style={{ color: "var(--gold-2)" }}>{"★".repeat(Number(r.rating))}</strong>{" "}
              by <strong>{String(r.reviewer_name)}</strong> on{" "}
              <strong>{String(r.attorney_name ?? "—")}</strong>
            </p>
            <p className="muted">{String(r.text).slice(0, 160)}…</p>
          </div>
        ))
      )}

      <div className="admin-section-head">
        <h2>Pending claims</h2>
        <Link href="/admin/claims" className="admin-btn">All Claims</Link>
      </div>
      {!data || data.pendingClaims === 0 ? (
        <p className="admin-empty">Nothing waiting. 🎉</p>
      ) : (
        <p className="admin-empty">
          {data.pendingClaims} claim request{data.pendingClaims === 1 ? "" : "s"} waiting —{" "}
          <Link href="/admin/claims" style={{ color: "var(--gold-2)" }}>review now →</Link>
        </p>
      )}

      <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#fff", margin: "34px 0 14px" }}>
        Quick actions
      </h2>
      <div className="admin-btn-row">
        <Link href="/admin/attorneys?add=1" className="admin-btn solid">+ Add Attorney</Link>
        <Link href="/admin/blog" className="admin-btn">Blog Posts</Link>
        <Link href="/admin/settings" className="admin-btn">Site Settings</Link>
      </div>
    </>
  );
}
