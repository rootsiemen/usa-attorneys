import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { PainSufferingCalculator } from "@/components/calculators/PainSufferingCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("pain-and-suffering-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Pain and Suffering Calculator — Multiplier & Per Diem Methods",
  description:
    "Free pain and suffering calculator that runs both standard methods — the severity multiplier on your economic damages and the per-diem daily-rate method — and combines them into one range, with your fault share applied and the math shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Pain and Suffering Calculator | ${SITE_NAME}`,
    description:
      "Estimate pain and suffering two ways — multiplier and per diem — and see the combined range with full methodology.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How is pain and suffering calculated?",
    a: "There is no official formula, but two methods dominate practice. The multiplier method multiplies your economic damages (medical bills, lost wages) by 1–5 depending on severity. The per-diem method assigns a daily dollar rate to your pain and multiplies by the number of days you suffered. This calculator runs both and shows a combined range, because negotiators and juries effectively blend the two.",
  },
  {
    q: "What multiplier should I use for pain and suffering?",
    a: "Roughly: 1–1.5 for minor injuries with full recovery in weeks; 1.5–2.5 for fractures or months of treatment; 2.5–3.5 when surgery or lasting symptoms are involved; 3.5–4.5 for permanent impairment; and up to 5 for catastrophic, life-changing injuries. The multiplier is applied to economic damages, so well-documented bills and wage loss raise the pain-and-suffering figure too.",
  },
  {
    q: "What is a reasonable per-diem rate?",
    a: "Commonly argued rates run $100–$500 per day. A frequent anchor is your own daily earnings — the argument being that enduring a day of serious pain is worth at least a day of work. Severe pain, hospitalization, or major daily-life disruption justifies the higher end; mild soreness does not.",
  },
  {
    q: "Why do the two methods give different answers?",
    a: "Because they measure different things. The multiplier scales with your financial losses, so it rewards high medical bills; per diem scales with time, so it rewards long recoveries even with modest bills. A short, expensive injury favors the multiplier; a long, cheap one favors per diem. Presenting both is how attorneys argue value.",
  },
  {
    q: "Is pain and suffering taxed?",
    a: "Generally no — under federal tax law, compensation for personal physical injuries, including the pain-and-suffering component, is excluded from income. (Punitive damages and pre/post-judgment interest are usually taxable, and purely emotional-distress claims without physical injury are treated differently.) Confirm your situation with a tax professional.",
  },
  {
    q: "Can I claim pain and suffering in workers' comp?",
    a: "No. Workers' compensation pays wage replacement and medical benefits on a schedule and never pays pain and suffering — that trade-off is built into the system. Pain and suffering exists in personal injury claims against a negligent party (or a third party in a work setting).",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Pain and Suffering <em>Calculator</em>
        </>
      }
      heroAnswer="Pain and suffering is estimated two standard ways: the multiplier method (your economic damages × 1–5, based on severity) and the per-diem method (a daily rate × the days you suffered). This calculator runs both methods, reduces them by your fault share, and combines them into one range — so you can see which method favors your case and why."
      calculator={<PainSufferingCalculator />}
      howItWorks={
        <>
          <h2>How the Pain and Suffering Calculator Works</h2>
          <p>
            No statute prices a bad back or a year of migraines. What exists
            instead are two conventions the whole industry argues with. The{" "}
            <strong>multiplier method</strong> ties non-economic damages to
            your documented losses: the worse the injury, the higher the
            multiple of your medical bills and lost wages. The{" "}
            <strong>per-diem method</strong> ignores bills and prices time: a
            daily rate for living with the injury, multiplied by the days
            until you substantially recovered.
          </p>
          <p>
            Each method has a blind spot. The multiplier undervalues a long,
            painful recovery with cheap treatment (think chronic soft-tissue
            pain) and overvalues a brief injury with one expensive surgery.
            Per diem does the opposite. This calculator therefore reports{" "}
            <strong>both</strong>, then a combined range from the lower low to
            the higher high — outcomes in real negotiations usually land in
            the overlap.
          </p>
          <h2>What Actually Moves Pain and Suffering Value</h2>
          <ul className="check-list">
            <li>
              <strong>Duration:</strong> months of documented symptoms beat
              weeks, in both methods.
            </li>
            <li>
              <strong>Consistency:</strong> steady treatment records describing
              pain — gaps invite the argument you were fine.
            </li>
            <li>
              <strong>Life impact:</strong> missed work, hobbies, sleep, and
              family activities, ideally corroborated by others.
            </li>
            <li>
              <strong>Permanence:</strong> scarring, impairment ratings, and
              future limitations push toward the top multipliers.
            </li>
            <li>
              <strong>Credibility:</strong> juries award people they believe;
              exaggeration is the fastest way to shrink this number.
            </li>
          </ul>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/personal-injury-settlement-timeline-month-by-month",
          anchor: "personal injury settlement timeline, month by month",
        },
        {
          href: "/blog/personal-injury-lawyer-contingency-fee-math",
          anchor: "personal injury lawyer fees: the contingency fee math",
        },
      ]}
      relatedSlugs={[
        "personal-injury-settlement-calculator",
        "car-accident-settlement-calculator",
        "slip-and-fall-settlement-calculator",
      ]}
    />
  );
}
