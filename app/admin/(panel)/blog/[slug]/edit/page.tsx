import { notFound } from "next/navigation";
import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";
import { getDbBlogPostInput } from "@/lib/blog-db";
import { requireAdmin } from "../../../require-admin";
import BlogEditor from "../../BlogEditor";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await requireAdmin();
  const initial = await getDbBlogPostInput(params.slug);
  if (!initial) notFound();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <h1 className="page-title">Edit Article</h1>
      <p className="page-sub">
        Changes go live instantly. The URL slug stays the same.
      </p>
      <BlogEditor
        areas={PRACTICE_AREAS.map((p) => ({ slug: p.slug, title: p.title }))}
        states={ALL_STATES.map((s) => ({ slug: s.slug, name: s.name }))}
        today={today}
        initial={initial}
      />
    </>
  );
}
