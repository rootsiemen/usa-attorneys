import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";
import { requireAdmin } from "../../require-admin";
import BlogEditor from "../BlogEditor";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireAdmin();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <h1 className="page-title">Add Article</h1>
      <p className="page-sub">
        Publishes instantly — no deploy needed. Write the body in Markdown.
      </p>
      <BlogEditor
        areas={PRACTICE_AREAS.map((p) => ({ slug: p.slug, title: p.title }))}
        states={ALL_STATES.map((s) => ({ slug: s.slug, name: s.name }))}
        today={today}
      />
    </>
  );
}
