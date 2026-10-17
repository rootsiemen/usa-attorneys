import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Legal Blog: Attorney Guides & FAQs`,
  description:
    "Practical legal guides from USA Attorneys — how to choose a lawyer, what attorneys cost, and what to do when legal trouble hits. Plain English, no jargon.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Legal Blog | ${SITE_NAME}`,
    description:
      "Practical legal guides — how to choose a lawyer, what attorneys cost, and what to do when legal trouble hits.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "USA Attorneys",
      },
    ],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const url = `${SITE_URL}/blog`;

  const listLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Legal Blog`,
    url,
    description:
      "Practical legal guides — how to choose a lawyer, what attorneys cost, and what to do when legal trouble hits.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: url },
    ],
  };

  return (
    <>
      <JsonLd data={listLd} />
      <JsonLd data={breadcrumbLd} />

      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Blog</span>
          </nav>
          <span className="eyebrow">Legal Blog</span>
          <h1>
            Attorney Guides <em>That Make Sense</em>
          </h1>
          <p>
            How to choose the right lawyer, what legal help really costs, and
            what to do when trouble hits — explained in plain English by{" "}
            {SITE_NAME}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 && (
            <p className="lead">
              New articles are on the way — check back soon.
            </p>
          )}
          <div className="grid-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card"
              >
                <span className="card-eyebrow">
                  {p.practiceAreaTitle}
                  {p.stateName ? ` · ${p.stateName}` : ""}
                </span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="post-meta">
                  <span>{formatPostDate(p.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.readingMinutes} min read</span>
                </div>
                <span className="card-link">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
