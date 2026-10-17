"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

interface Review {
  reviewerName: string;
  rating: number;
  text: string;
  createdAt: string;
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5 stars`} style={{ color: "#e8b923" }}>
      {"★".repeat(n)}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function Reviews({
  slug,
  attorneyName,
}: {
  slug: string;
  attorneyName: string;
}) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbDown, setDbDown] = useState(false);

  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.reviews)) {
          setReviews(d.reviews);
          setAverage(d.average);
        } else {
          setDbDown(true);
        }
      })
      .catch(() => setDbDown(true))
      .finally(() => setLoading(false));
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const r = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attorneySlug: slug,
          rating,
          text,
        }),
      });
      const d = await r.json();
      if (r.ok) {
        setMsg({ ok: true, text: d.message });
        setText("");
        setRating(5);
      } else {
        setMsg({ ok: false, text: d.error || "Something went wrong" });
      }
    } catch {
      setMsg({ ok: false, text: "Network error — please try again" });
    } finally {
      setSubmitting(false);
    }
  }

  const loggedIn = status === "authenticated" && session?.user;

  return (
    <div>
      {loading ? (
        <p>Loading reviews…</p>
      ) : dbDown ? (
        <p className="notice">
          Reviews are temporarily unavailable. Please check back soon.
        </p>
      ) : (
        <>
          {reviews.length === 0 ? (
            <p>
              No reviews yet.{" "}
              <strong>Be the first to review {attorneyName}.</strong>
            </p>
          ) : (
            <>
              <p>
                <strong>
                  {average?.toFixed(1)} / 5
                </strong>{" "}
                <Stars n={Math.round(average ?? 0)} /> · {reviews.length}{" "}
                review{reviews.length === 1 ? "" : "s"}
              </p>
              <div style={{ display: "grid", gap: 16, margin: "16px 0" }}>
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="card"
                    style={{ padding: 20 }}
                  >
                    <p style={{ margin: "0 0 6px" }}>
                      <Stars n={r.rating} />{" "}
                      <strong>{r.reviewerName}</strong>
                    </p>
                    <p style={{ margin: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <h3 style={{ marginTop: 28 }}>Write a Review</h3>
      {status === "loading" ? (
        <p>Loading…</p>
      ) : !loggedIn ? (
        <div className="form-card" style={{ margin: 0 }}>
          <p style={{ margin: "0 0 16px" }}>
            Log in with Google to write a review for {attorneyName}. Your
            Google name will appear with your review.
          </p>
          <button
            type="button"
            className="btn btn-navy"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="form-card" style={{ margin: 0 }}>
          <p style={{ margin: "0 0 4px", fontSize: 14, color: "var(--gray-600)" }}>
            Reviewing as <strong>{session.user?.name}</strong>
          </p>
          <label htmlFor="rv-rating">Rating</label>
          <select
            id="rv-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n === 1 ? "" : "s"}
              </option>
            ))}
          </select>
          <label htmlFor="rv-text">Your experience</label>
          <textarea
            id="rv-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
            required
            placeholder={`How was your experience with ${attorneyName}?`}
          />
          {msg && (
            <p
              className="notice"
              style={
                msg.ok
                  ? { borderColor: "green" }
                  : { borderColor: "var(--burgundy)" }
              }
            >
              {msg.text}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-navy"
            disabled={submitting || dbDown}
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
          <p style={{ fontSize: 13, color: "#666", marginTop: 12 }}>
            Reviews are moderated and appear after approval. One review per
            account — submitting again updates your previous review.
          </p>
        </form>
      )}
    </div>
  );
}
