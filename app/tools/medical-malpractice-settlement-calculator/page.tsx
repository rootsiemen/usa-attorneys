import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { SettlementCalculator } from "@/components/calculators/SettlementCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("medical-malpractice-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Medical Malpractice Settlement Calculator — With State Cap Check",
  description:
    "Free medical malpractice settlement calculator: past and future medical costs, lost earnings, and pain and suffering — with your state's non-economic damage cap applied openly, expert case costs accounted for, and the net after contingency fees shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Medical Malpractice Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate a medical malpractice claim with the state damage cap applied and case costs/net recovery shown — full methodology.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How is a medical malpractice settlement calculated?",
    a: "Like other injury claims — economic damages (past and future medical costs, lost earnings) plus non-economic damages for pain and suffering — but with two med-mal twists: many states cap the non-economic part by statute, and proving the case requires expensive expert testimony, so case costs are far higher than in a typical injury claim. This calculator applies the cap you enter and deducts costs in the net view.",
  },
  {
    q: "Which states cap medical malpractice damages?",
    a: "Roughly half the states cap non-economic damages in malpractice cases — common figures are $250,000 to $500,000, with higher tiers or exceptions for catastrophic injury, disfigurement, or death in states such as Michigan, Ohio, and Virginia (which caps total damages instead). Caps change by legislation and court rulings, so confirm your state's current rule with an attorney; enter it in the cap field and the calculator applies it.",
  },
  {
    q: "Why are medical malpractice cases so expensive to bring?",
    a: "Because negligence must be proven with medical experts: records reviews, standard-of-care opinions, and causation testimony routinely cost $20,000–$100,000+ before trial. Most firms advance these costs and recover them from the settlement. The practical result: small-value malpractice claims often are not economically viable, however clear the error — the costs field in this calculator shows you that math.",
  },
  {
    q: "What percentage do medical malpractice lawyers charge?",
    a: "Contingency fees commonly run 33–40%, and some states regulate them specifically in malpractice cases (for example, California's statutory sliding scale under Business & Professions Code §6146, and New York's scale under Judiciary Law §474-a). There is normally no fee unless you recover.",
  },
  {
    q: "How long do I have to file a medical malpractice claim?",
    a: "Shorter than most injury claims in many states — often 1–3 years from the injury or from when it was (or should have been) discovered, with an outer statute of repose in some states, and special rules for minors. Missing the deadline usually ends the claim regardless of merit, so get a limitations check early.",
  },
  {
    q: "What must be proven in a medical malpractice case?",
    a: "Four elements: a provider-patient relationship (duty), a breach of the standard of care, causation — the breach actually caused the injury — and damages. Causation is where most cases are fought: the defense argues the bad outcome would have happened anyway. A calculator can value damages; only expert review can tell you whether liability is provable.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Medical Malpractice Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A medical malpractice settlement starts like any injury claim — medical costs, lost earnings, pain and suffering — but two things decide real outcomes: your state's cap on non-economic damages, and the expert costs of proving the case. Enter your damages and, if your state has one, its cap; the calculator applies it openly and shows your net after fees and costs."
      calculator={
        <SettlementCalculator
          config={{
            showProperty: false,
            showCap: true,
            showCaseCosts: true,
            defaultSeverity: 3,
            buttonLabel: "Calculate My Malpractice Settlement Estimate",
          }}
        />
      }
      howItWorks={
        <>
          <h2>How the Medical Malpractice Calculator Works</h2>
          <p>
            The damages model is the standard one:{" "}
            <strong>economic damages</strong> — the medical bills the
            malpractice caused (including corrective treatment), future care,
            and lost earnings — plus <strong>non-economic damages</strong>{" "}
            estimated with the severity multiplier. Then malpractice-specific
            reality applies, in order:
          </p>
          <ul className="check-list">
            <li>
              <strong>The state cap.</strong> In roughly half the states, pain
              and suffering in a malpractice case cannot exceed a statutory
              ceiling, whatever a jury might think. If your state caps
              non-economic damages, enter the figure — the calculator caps
              that component before anything else. (Wrongful death and
              catastrophic-injury exceptions exist in several states.)
            </li>
            <li>
              <strong>Fault and causation disputes</strong> are priced in
              through the fault field — malpractice defendants contest
              causation aggressively, and settlements discount for that risk.
            </li>
            <li>
              <strong>Case costs.</strong> Expert witnesses make malpractice
              the most expensive injury litigation there is. Costs come out of
              the recovery, so the calculator deducts them in the net view.
            </li>
            <li>
              <strong>Regulated fees.</strong> Some states scale malpractice
              contingency fees by law — check the fee percentage against your
              state&apos;s rule with the attorney you consult.
            </li>
          </ul>
          <p>
            What no calculator can assess is the threshold question —
            whether a qualified medical expert will say the care fell below
            the standard and caused the harm. That review is the real first
            step, and reputable malpractice firms do it before filing, often
            at no charge to you.
          </p>
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
        "wrongful-death-settlement-calculator",
        "personal-injury-settlement-calculator",
        "pain-and-suffering-calculator",
      ]}
    />
  );
}
