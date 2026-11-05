import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { SettlementCalculator } from "@/components/calculators/SettlementCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("slip-and-fall-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Slip and Fall Settlement Calculator — Free",
  description:
    "Slip and fall value turns on proof the owner knew of the hazard. Enter bills and liability strength for a range — fault share and policy limits factored in.",
  alternates: { canonical: url },
  openGraph: {
    title: `Slip and Fall Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate a slip and fall claim with liability strength, fault, and policy limits factored in — full math shown.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How much is a slip and fall settlement worth?",
    a: "It depends first on liability, then on damages. Minor falls with clear liability and a few thousand in medical bills often settle in the low five figures; falls causing fractures, surgery, or permanent problems settle for much more. Industry references commonly place typical slip and fall settlements anywhere from about $10,000 to $50,000 for moderate injuries — but a weak-liability case with big bills can be worth less than a strong-liability case with small ones, which is why this calculator weighs both.",
  },
  {
    q: "Why does 'notice' matter so much in a slip and fall case?",
    a: "A property owner is usually liable only if they knew about the hazard — or it existed long enough that they should have known — and failed to fix it or warn you. A spill that happened seconds before you fell is hard to pin on the owner; a broken step reported for months is straightforward. That is the liability-strength input in this calculator.",
  },
  {
    q: "What if the hazard was open and obvious?",
    a: "Owners argue you should have seen and avoided it, which cuts your recovery through comparative fault — and in some states can defeat the claim, especially for trespassers or where warnings were posted. It does not automatically end a case: if the hazard was unavoidable or the owner should have anticipated people encountering it anyway, liability can still attach.",
  },
  {
    q: "Can I recover if I was partly at fault for my fall?",
    a: "In most states yes, reduced by your percentage of fault — looking at your phone in a marked wet-floor area might mean 20–30% off. Most states bar recovery at 50–51% fault, and Alabama, Maryland, North Carolina, Virginia, and DC can bar it entirely for any fault.",
  },
  {
    q: "What evidence matters most after a slip and fall?",
    a: "Photos or video of the hazard before it is cleaned up, an incident report filed with the business, witness names, the shoes and clothing you wore, and prompt medical records linking the injury to the fall. Surveillance footage is routinely overwritten within days — an attorney's preservation letter is often the first move.",
  },
  {
    q: "Who pays a slip and fall settlement?",
    a: "Usually the property owner's liability insurer (a business's commercial policy or a homeowner's policy). Policy limits therefore cap most recoveries, which is why the calculator asks for the limit when you know it.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Slip and Fall Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A slip and fall settlement is your damages — medical bills, lost wages, and pain and suffering — discounted by how clearly the property owner was responsible. Unlike a car crash, liability is the battleground: the owner must have known (or should have known) about the hazard. This calculator weighs liability strength, your fault share, and policy limits, and shows the math."
      calculator={
        <SettlementCalculator
          config={{
            showProperty: false,
            showLiability: true,
            defaultSeverity: 2,
            buttonLabel: "Calculate My Slip and Fall Settlement",
          }}
        />
      }
      howItWorks={
        <>
          <h2>How the Slip and Fall Settlement Calculator Works</h2>
          <p>
            The damages side mirrors any injury claim: economic losses plus a
            severity-based multiplier for pain and suffering. What makes
            premises liability different is the <strong>liability-strength</strong>{" "}
            adjustment. A wet floor with no warning sign that sat for an hour
            is a strong claim; a hazard that appeared moments before, or one
            that was plainly visible, is a weak one — and insurers discount
            accordingly before fault is even argued.
          </p>
          <p>
            Your own <strong>comparative fault</strong> then applies on top:
            footwear, distraction, ignoring warnings, or entering a restricted
            area all get argued into a percentage. Finally, the owner&apos;s{" "}
            <strong>liability policy limit</strong> caps the realistic
            recovery. Run the calculator at more than one liability setting if
            you are unsure — the spread between them is exactly what the
            negotiation will be about.
          </p>
          <h2>The Four Things Owners Must Have Done Wrong</h2>
          <ul className="check-list">
            <li>
              <strong>A dangerous condition existed</strong> — spill, ice,
              broken step, poor lighting, torn carpet.
            </li>
            <li>
              <strong>They knew or should have known</strong> — actual notice,
              or it was there long enough to find (constructive notice).
            </li>
            <li>
              <strong>They failed to fix it or warn</strong> within a reasonable
              time.
            </li>
            <li>
              <strong>That failure caused your injury</strong> — documented by
              prompt medical care tying the injury to the fall.
            </li>
          </ul>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/what-to-do-after-slip-and-fall-accident-checklist",
          anchor: "what to do after a slip and fall accident: checklist",
        },
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
        "pain-and-suffering-calculator",
        "lost-wages-calculator",
      ]}
    />
  );
}
