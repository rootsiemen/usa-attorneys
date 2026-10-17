import { getDb, isDbConfigured } from "@/lib/db";
import { requireAdmin } from "../require-admin";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requireAdmin();
  let customers: { id: number; email: string; name: string; created_at: string }[] = [];
  if (isDbConfigured()) {
    const db = getDb();
    const res = await db.execute(
      "SELECT id, email, name, created_at FROM customers ORDER BY created_at DESC LIMIT 200"
    );
    customers = res.rows.map((r) => ({
      id: Number(r.id),
      email: String(r.email),
      name: String(r.name),
      created_at: String(r.created_at),
    }));
  }

  return (
    <>
      <h1 className="page-title">Users</h1>
      <p className="page-sub">
        Registered customer accounts (email signup + Google login). {customers.length} total.
      </p>
      {customers.length === 0 ? (
        <p className="admin-empty">No registered users yet.</p>
      ) : (
        <div className="admin-card" style={{ padding: 0, overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name || "—"}</td>
                  <td>{u.email}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
