import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  PRACTICE_AREAS,
  ALL_STATES,
  getPractice,
} from "@/lib/data";
import { getAllPostSlugs, getPost, getAllPosts, formatPostDate } from "@/lib/posts";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

const DISCLAIMER =
  "This article is for general information only and is not legal advice. For advice about your situation, consult a licensed attorney in your state.";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const practice = getPractice(post.practiceArea);
  const stateInfo = post.state
    ? ALL_STATES.find((s) => s.slug === post.state)
    : undefined;

  const related = getAllPosts()
    .filter(
      (p) => p.slug !== post.slug && p.practiceArea === post.practiceArea
    )
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />

      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <Link href="/blog">Blog</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <div className="post-tags">
            {practice && (
              <Link href={`/${practice.slug}`} className="tag">
                {practice.shortTitle}
              </Link>
            )}
            {stateInfo && (
              <Link href={`/attorneys/${stateInfo.slug}`} className="tag">
                {stateInfo.name}
              </Link>
            )}
          </div>
          <h1>{post.title}</h1>
          <p className="post-meta">
            {formatPostDate(post.date)} · {post.readingMinutes} min read
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article
            className="prose article-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="container" style={{ maxWidth: 800, padding: 0 }}>
            <div className="disclaimer">
              <strong>Legal disclaimer:</strong> {DISCLAIMER}
            </div>

            {(practice || stateInfo) && (
              <div className="related-links">
                <h2>Keep exploring</h2>
                <ul>
                  {practice && (
                    <li>
                      <Link href={`/${practice.slug}`}>
                        {practice.title} — fees, FAQs & what to ask
                      </Link>
                    </li>
                  )}
                  {stateInfo && (
                    <li>
                      <Link href={`/attorneys/${stateInfo.slug}`}>
                        Attorneys in {stateInfo.name}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/attorneys">
                      Browse attorneys in all 50 states
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {relatedFallback.length > 0 && (
              <div className="related-posts">
                <h2>Related articles</h2>
                <div className="grid-3">
                  {relatedFallback.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="card"
                    >
                      <span className="card-eyebrow">
                        {p.practiceAreaTitle}
                      </span>
                      <h3>{p.title}</h3>
                      <span className="card-link">Read article →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <DevCta />
          </div>
        </div>
      </section>
    </>
  );
}
