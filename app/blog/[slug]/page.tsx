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
import {
  getAllPostSlugs,
  getPostMerged,
  getAllPostsMerged,
  formatPostDate,
} from "@/lib/posts";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

const DISCLAIMER =
  "This article is for general information only and is not legal advice. For advice about your situation, consult a licensed attorney in your state.";

/** First <img> URL in the rendered article body, if any. */
function firstContentImage(html: string): string | undefined {
  const m = html.match(/<img[^>]+src="([^"]+)"/);
  return m ? m[1] : undefined;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// Admin-panel (database) articles are not known at build time; render
// them on demand and refresh cached pages regularly so new articles
// go live without a deploy.
export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await getPostMerged((await params).slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  const displayTitle = post.metaTitle || post.title;
  // Share image: explicit OG image, else the first image in the body,
  // else the site's default generated OG image (previous behaviour).
  const shareImage = post.ogImage || firstContentImage(post.html);
  return {
    title: displayTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${displayTitle} | ${SITE_NAME}`,
      description: post.description,
      url,
      type: "article",
      images: shareImage
        ? [{ url: shareImage, alt: post.title }]
        : [
            {
              url: "/opengraph-image",
              width: 1200,
              height: 630,
              alt: "USA Attorneys",
            },
          ],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayTitle} | ${SITE_NAME}`,
      description: post.description,
      images: [shareImage || "/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPostMerged((await params).slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const practice = getPractice(post.practiceArea);
  const stateInfo = post.state
    ? ALL_STATES.find((s) => s.slug === post.state)
    : undefined;

  const allPosts = await getAllPostsMerged();
  const related = allPosts
    .filter(
      (p) => p.slug !== post.slug && p.practiceArea === post.practiceArea
    )
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

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

  const heroImage = post.ogImage || firstContentImage(post.html);

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
    ...(heroImage ? { image: heroImage } : {}),
  };

  const faqs = post.faqs ?? [];
  const faqLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />
      {faqLd && <JsonLd data={faqLd} />}

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
            {faqs.length > 0 && (
              <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((f, i) => (
                  <div key={i} className="faq-item">
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            )}

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
