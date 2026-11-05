import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { SettlementCalculator } from "@/components/calculators/SettlementCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("personal-injury-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Personal Injury Settlement Calculator — Estimate Your Claim",
  description:
    "Free personal injury settlement calculator for any negligence claim: medical bills, lost income, and future losses plus a severity-based pain-and-suffering multiplier, reduced by your fault share. Output is a range with the full methodology shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Personal Injury Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate any personal injury claim as a range — economic damages, severity multiplier, fault reduction, net after contingency fees.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How do I calculate the value of a personal injury claim?",
    a: "Add your economic damages (medical bills, lost wages, future care, future lost earnings, other out-of-pocket losses), estimate pain and suffering with a 1–5× multiplier based on severity, and reduce the result by your percentage of fault. This calculator does that math and prints every step so you can challenge any input.",
  },
  {
    q: "What is the multiplier method for pain and suffering?",
    a: "It is the most common estimation method in negotiated settlements: total economic damages are multiplied by a factor that reflects severity — about 1–1.5 for minor injuries with full recovery, 2.5–3.5 for surgery or lasting symptoms, and up to 5 for catastrophic harm. The alternative per-diem method prices each day of recovery instead; our pain and suffering calculator runs both.",
  },
  {
    q: "What kinds of cases does this calculator cover?",
    a: "Any negligence-based injury claim: car and motorcycle crashes, slip and falls, dog bites, defective products, and general negligence. Specialized situations have their own tools here — workers' comp follows a state benefit schedule instead, medical malpractice is affected by state damage caps, and wrongful death uses a lost-support model.",
  },
  {
    q: "Why does the calculator show a range instead of one number?",
    a: "Because honest claim valuation is a range. Liability disputes, treatment outcomes, venue, and the defendant's insurance all move the final figure. A single-point 'your case is worth $X' tool is pretending to precision that does not exist — the range shows what each assumption is worth.",
  },
  {
    q: "What percentage do personal injury lawyers charge?",
    a: "Most work on contingency: typically 33⅓% of the recovery if the case settles before suit, around 40% if a lawsuit is filed, and sometimes 45% through trial — plus case costs. There is no fee if you recover nothing. Enter the percentage in the calculator to see your estimated net.",
  },
  {
    q: "How long does a personal injury settlement take?",
    a: "Straightforward claims often resolve in a few months after treatment ends; disputed or high-value cases can take a year or more, and litigation longer. Settling before you reach maximum medical improvement risks underpaying future care — see our month-by-month timeline guide linked below.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Personal Injury Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A personal injury settlement is estimated as economic damages (medical bills, lost wages, future care and lost earnings) plus non-economic damages for pain and suffering — a 1–5× multiplier set by injury severity — reduced by your share of fault. Enter your figures below for a range with the complete methodology, and a net-to-you view after contingency fees."
      calculator={
        <SettlementCalculator
          config={{
            showProperty: true,
            defaultSeverity: 2,
            buttonLabel: "Calculate My Settlement Estimate",
          }}
        />
      }
      howItWorks={
        <>
          <h2>How the Personal Injury Settlement Calculator Works</h2>
          <p>
            Every negligence claim — a crash, a fall, a dog bite, a defective
            product — is valued from the same building blocks.{" "}
            <strong>Economic damages</strong> are the losses with paperwork:
            past and future medical bills, past and future lost income, and
            out-of-pocket costs. <strong>Non-economic damages</strong> cover
            pain, suffering, scarring, and the loss of activities you used to
            enjoy; they are estimated, not invoiced, most often with the
            multiplier method this calculator uses.
          </p>
          <p>
            Your <strong>comparative fault</strong> percentage then reduces the
            total, and the defendant&apos;s <strong>insurance limit</strong>{" "}
            usually caps what can actually be collected. The result is shown
            as a range with each step printed — change any input and you can
            see exactly which assumption is worth what. That transparency is
            the point: an adjuster&apos;s offer should have to survive the
            same arithmetic.
          </p>
          <h2>Before You Rely on the Number</h2>
          <ul className="check-list">
            <li>Finish treatment, or get future care costed by your doctor — future losses are real damages.</li>
            <li>Gather records: bills, pay stubs, employer wage statements, photos, and the incident or police report.</li>
            <li>Do not guess fault downward or upward — enter what the evidence supports and test other scenarios.</li>
            <li>Check the statute of limitations in your state; claims expire, usually in 1–3 years for injury.</li>
            <li>Have an attorney review any settlement release — signing ends the claim permanently.</li>
          </ul>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/personal-injury-lawyer-contingency-fee-math",
          anchor: "personal injury lawyer fees: the contingency fee math",
        },
        {
          href: "/blog/personal-injury-settlement-timeline-month-by-month",
          anchor: "personal injury settlement timeline, month by month",
        },
        {
          href: "/blog/how-to-choose-personal-injury-lawyer",
          anchor: "how to choose a personal injury lawyer",
        },
      ]}
      relatedSlugs={[
        "car-accident-settlement-calculator",
        "pain-and-suffering-calculator",
        "lost-wages-calculator",
        "medical-malpractice-settlement-calculator",
      ]}
    />
  );
}
