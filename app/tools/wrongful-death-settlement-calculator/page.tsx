import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { WrongfulDeathCalculator } from "@/components/calculators/WrongfulDeathCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("wrongful-death-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Wrongful Death Settlement Calculator — Estimate a Fatal Claim",
  description:
    "Free wrongful death settlement calculator for families: present value of lost household support, lost benefits and household services, funeral costs, and survivor damages — with fault, state caps, and collectible-insurance checks, and every step shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Wrongful Death Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate a wrongful death claim: lost support in today's dollars, funeral costs, survivor damages, caps and collectability shown step by step.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How is a wrongful death settlement calculated?",
    a: "From the family's losses. Economic damages are the present value of the support the deceased would have provided — the share of income that reached the household, plus benefits and household services, over the working years lost — plus pre-death medical bills and funeral costs. Non-economic damages compensate the survivors' loss of companionship, guidance, and their mental anguish. Fault reduces the total, and some states cap non-economic damages. This calculator models each piece openly.",
  },
  {
    q: "Why is future support discounted to present value?",
    a: "A settlement is paid today for losses spread over decades. Money today can be invested, so courts and economists convert the future stream into a smaller lump sum using a discount rate (often 1–3%). Over 25+ years the adjustment is large — which is why wrongful death valuations are built by economists, not guessed.",
  },
  {
    q: "Who can file a wrongful death claim?",
    a: "Each state's statute names the beneficiaries — usually the spouse, children, and sometimes parents — and the claim is typically brought by the estate's personal representative for their benefit. Who recovers, and in what shares, is set by state law and is a first question for a local attorney.",
  },
  {
    q: "What is the difference between a wrongful death claim and a survival action?",
    a: "A wrongful death claim compensates the family for their own losses (lost support, companionship). A survival action belongs to the estate and covers the deceased's own losses between injury and death — medical bills and conscious pain and suffering. The calculator keeps the two separate; both are often pursued together.",
  },
  {
    q: "Are there caps on wrongful death damages?",
    a: "Some states cap non-economic damages in wrongful death cases, and medical-malpractice deaths are capped in many more states (commonly $250,000–$750,000 for non-economic loss, with exceptions). Economic damages like lost support are usually not capped. Alabama is unique: its wrongful death damages are punitive only, so the lost-support model on this page does not apply there.",
  },
  {
    q: "How much do wrongful death settlements actually pay?",
    a: "Usually less than full calculated claim value — settlements compromise litigation risk, and collectability is the hard ceiling: most cases resolve within the defendant's insurance limits unless there are reachable assets. That is why the calculator asks for available insurance/assets and shows the capped, realistic figure alongside the claim value.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Wrongful Death Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A wrongful death claim is valued from what the family lost: the household support the deceased would have provided over their working life (converted to today's dollars), lost benefits and household services, funeral costs, and the survivors' own damages for lost companionship and guidance. Enter what you know below — every step of the model is shown, including caps and what is actually collectible."
      calculator={<WrongfulDeathCalculator />}
      howItWorks={
        <>
          <h2>How the Wrongful Death Calculator Works</h2>
          <p>
            The core is <strong>lost support</strong>. Start with the
            deceased&apos;s income, take the share that actually supported the
            household (economists deduct personal consumption; ~70% is a
            common planning figure), and add the value of lost{" "}
            <strong>benefits</strong> (health insurance, pension
            contributions) and <strong>household services</strong> — the
            childcare, maintenance, and transport the family must now buy.
            Multiply by the <strong>working years lost</strong>, then convert
            to <strong>present value</strong> at a modest discount rate: a
            lump sum today replaces decades of future support.
          </p>
          <p>
            Add <strong>pre-death medical bills</strong> and{" "}
            <strong>funeral and burial costs</strong> to complete the economic
            side. <strong>Survivor damages</strong> — loss of companionship,
            parental guidance, and mental anguish — are estimated with the
            same severity-band approach used across injury law, with an
            optional separate amount for the deceased&apos;s conscious pain
            and suffering before death (the estate&apos;s survival claim).
            Then the reality checks: <strong>fault</strong>, any{" "}
            <strong>state cap</strong>, and the <strong>collectible ceiling</strong>{" "}
            of insurance and assets.
          </p>
          <h2>What Families Should Know Before Using Any Number</h2>
          <ul className="check-list">
            <li>
              Deadlines are short and strict: wrongful death statutes of
              limitation run as little as one year in some states.
            </li>
            <li>
              Only the statutory beneficiaries recover, and the claim usually
              must be filed by the estate&apos;s personal representative.
            </li>
            <li>
              Settlements for minors typically need court approval, and
              proceeds may be structured rather than paid at once.
            </li>
            <li>
              In malpractice deaths, state caps — not the family&apos;s actual
              loss — often decide the ceiling. Check the cap field carefully.
            </li>
            <li>
              Alabama families: damages there are punitive only; this
              compensatory model does not describe an Alabama claim.
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
        {
          href: "/blog/how-to-choose-personal-injury-lawyer",
          anchor: "how to choose a personal injury lawyer",
        },
      ]}
      relatedSlugs={[
        "medical-malpractice-settlement-calculator",
        "personal-injury-settlement-calculator",
        "pain-and-suffering-calculator",
      ]}
    />
  );
}
