import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { SettlementCalculator } from "@/components/calculators/SettlementCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("car-accident-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Car Accident Settlement Calculator — Estimate Your Claim Value",
  description:
    "Free car accident settlement calculator: enter medical bills, lost wages, and vehicle damage to estimate your claim as a range — with injury-severity multiplier, fault reduction, policy-limit check, and the full methodology shown step by step.",
  alternates: { canonical: url },
  openGraph: {
    title: `Car Accident Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate a car accident settlement as a range using the standard multiplier method — fault and policy limits included, math shown.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How is a car accident settlement calculated?",
    a: "By adding economic damages (medical bills, lost wages, property damage, future care) to non-economic damages for pain and suffering — usually estimated as 1–5× the economic damages depending on injury severity — then reducing the total by your percentage of fault. This calculator performs exactly that calculation and shows each step.",
  },
  {
    q: "What is the average car accident settlement?",
    a: "There is no single reliable average: minor soft-tissue claims often settle in the low five figures or less, while claims involving surgery, permanent injury, or high medical bills settle for far more. Your documented losses and the at-fault driver's policy limits matter more than any national average — which is why this tool works from your own figures.",
  },
  {
    q: "What if my claim is worth more than the other driver's policy limit?",
    a: "In practice, recovery from that policy is capped at its limit — a $150,000 claim against a $25,000 policy usually collects $25,000 from that insurer. The gap can sometimes be covered by your own underinsured-motorist coverage or the defendant's personal assets, which is why the calculator flags the cap instead of hiding it.",
  },
  {
    q: "Does being partly at fault reduce my settlement?",
    a: "Yes, in almost every state. Under comparative fault rules your award is reduced by your share of fault (20% at fault → 20% less). Most states bar recovery entirely at 50–51% fault, and Alabama, Maryland, North Carolina, Virginia, and DC can bar it at any fault at all.",
  },
  {
    q: "How much will a lawyer take from my car accident settlement?",
    a: "Car accident lawyers typically work on contingency — commonly 33⅓% of the settlement before a suit is filed and around 40% after — plus case costs. The calculator's fee field shows the net-to-you estimate at whatever percentage you enter, so you can compare keeping 100% of a smaller self-negotiated offer against a percentage of a larger one.",
  },
  {
    q: "Should I accept the insurance company's first offer?",
    a: "First offers are usually made before your treatment is complete and before future costs are known, and they rarely reflect full claim value. Settling releases your claim forever — get the estimate here, finish treatment, and have an attorney review any release before you sign it.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Car Accident Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A car accident settlement is estimated by adding your economic damages — medical bills, lost wages, and vehicle damage — to pain-and-suffering damages (a 1–5× severity multiplier), then reducing the total by your share of fault. Enter your numbers below to get a range, the methodology step by step, and a warning if the other driver's policy limit caps your recovery."
      calculator={
        <SettlementCalculator
          config={{
            showProperty: true,
            defaultSeverity: 2,
            buttonLabel: "Calculate My Car Accident Settlement",
          }}
        />
      }
      howItWorks={
        <>
          <h2>How the Car Accident Settlement Calculator Works</h2>
          <p>
            Insurance adjusters and attorneys start from the same framework.
            First, every documented loss is added up: emergency and follow-up
            medical care, wages you lost while recovering, the cost to repair
            or replace your vehicle, and future treatment or lost earning
            capacity. That total is your <strong>economic damages</strong>.
          </p>
          <p>
            Pain and suffering has no receipt, so it is estimated with the{" "}
            <strong>multiplier method</strong>: economic damages multiplied by
            a factor that rises with severity — roughly 1–1.5× for minor
            soft-tissue injuries, up to 4.5–5× for catastrophic, permanent
            harm. The calculator returns a <strong>range</strong>, because a
            single-point figure would pretend to a precision no honest
            estimate has.
          </p>
          <p>
            Two adjustments then apply. <strong>Comparative fault:</strong>{" "}
            your percentage of responsibility comes off the total. And{" "}
            <strong>policy limits:</strong> whatever the claim is worth on
            paper, the other driver&apos;s insurance only pays to its limit —
            enter it and the calculator shows the realistic recovery, not just
            the theoretical value. Finally, the contingency-fee field shows
            what you would actually keep after a lawyer&apos;s percentage.
          </p>
          <h2>What Raises or Lowers a Car Accident Settlement</h2>
          <ul className="check-list">
            <li>
              <strong>Documented treatment:</strong> settlements track medical
              records — gaps in treatment are the adjuster&apos;s favorite
              argument.
            </li>
            <li>
              <strong>Permanent effects:</strong> lasting impairment, scarring,
              or lost earning capacity moves the multiplier up.
            </li>
            <li>
              <strong>Clear liability:</strong> police reports, citations, and
              witnesses protect your number from fault discounts.
            </li>
            <li>
              <strong>Policy limits:</strong> the defendant&apos;s coverage is
              usually the ceiling, whatever the claim is worth.
            </li>
            <li>
              <strong>Your own coverage:</strong> uninsured/underinsured
              motorist coverage can add a second pot of money.
            </li>
          </ul>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/what-to-do-after-car-accident-legal-checklist",
          anchor: "what to do after a car accident: the legal checklist",
        },
        {
          href: "/blog/personal-injury-settlement-timeline-month-by-month",
          anchor: "personal injury settlement timeline, month by month",
        },
        {
          href: "/blog/truck-accident-vs-car-accident-lawsuit-differences",
          anchor: "truck accident vs car accident lawsuits: key differences",
        },
        {
          href: "/blog/personal-injury-lawyer-contingency-fee-math",
          anchor: "personal injury lawyer fees: the contingency fee math",
        },
      ]}
      relatedSlugs={[
        "personal-injury-settlement-calculator",
        "pain-and-suffering-calculator",
        "lost-wages-calculator",
      ]}
    />
  );
}
