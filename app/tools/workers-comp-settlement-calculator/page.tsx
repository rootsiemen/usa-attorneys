import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { WorkersCompCalculator } from "@/components/calculators/WorkersCompCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("workers-comp-settlement-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Workers' Comp Settlement Calculator — Estimate Your Payout",
  description:
    "Free workers' compensation settlement calculator using the real comp model: average weekly wage × 2/3 benefit rate, weeks out of work, impairment rating × state schedule weeks, future medical, and attorney fee — with state cap handling and every step shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Workers' Comp Settlement Calculator | ${SITE_NAME}`,
    description:
      "Estimate a workers' comp settlement the way states actually calculate it — wage replacement, impairment weeks, future medical, fees.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How is a workers' comp settlement calculated?",
    a: "From benefits, not damages. Your weekly benefit rate is two-thirds of your average weekly wage (capped by your state). A settlement typically values: temporary total disability for the weeks you were fully out of work, permanent partial disability (your impairment rating % × your state's schedule of weeks × the benefit rate), future medical care, and other costs — minus the attorney fee. This calculator follows that model step by step.",
  },
  {
    q: "Does workers' comp pay for pain and suffering?",
    a: "No. Workers' comp is a trade-off: you get no-fault wage replacement and medical coverage without proving your employer was negligent, and in exchange there are no pain-and-suffering damages. Calculators that add a pain-and-suffering multiplier to a comp claim are using the wrong model. (If a third party — not your employer — caused the injury, a separate personal injury claim may exist on top of comp.)",
  },
  {
    q: "What is an impairment rating and why does it drive the settlement?",
    a: "When you reach maximum medical improvement, a doctor assigns a percentage rating of permanent impairment. In most states that percentage is multiplied by a statutory schedule of weeks, and the weeks are paid at your benefit rate — so the rating is usually the single biggest lever in the permanent-disability part of a settlement. Ratings can be disputed, and an independent medical exam often produces a different number.",
  },
  {
    q: "Why do identical injuries settle for different amounts in different states?",
    a: "Because states set their own maximum and minimum weekly benefits, their own body-part and whole-person schedules, and their own rules on future medical buyouts. The same 10% rating can be worth a few thousand dollars in one state and several times that in another — which is why the calculator asks for your state's cap if you know it.",
  },
  {
    q: "How much do workers' comp lawyers charge?",
    a: "Fees are usually regulated and must be approved by a judge or workers' comp board. They commonly run 15–25% of the settlement — lower than the 33–40% typical in personal injury lawsuits — and are often paid out of the settlement itself.",
  },
  {
    q: "Should I settle my workers' comp case or keep benefits open?",
    a: "A lump-sum settlement (often called a compromise and release) closes some or all of your claim — frequently including future medical. That is worth real money and real risk: if your condition worsens after closing medical, you pay. Compare the offer against the value of keeping medical open with an attorney before signing; settlements need board approval precisely because of this trade-off.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Workers&apos; Comp Settlement <em>Calculator</em>
        </>
      }
      heroAnswer="A workers' comp settlement is not calculated like a lawsuit. It is built from benefits: a weekly rate of two-thirds of your average weekly wage (subject to your state's maximum), multiplied by the weeks you were out of work plus the weeks your impairment rating earns under your state's schedule — plus future medical. No pain and suffering. Enter your figures below for the full breakdown."
      calculator={<WorkersCompCalculator />}
      howItWorks={
        <>
          <h2>How the Workers&apos; Comp Settlement Calculator Works</h2>
          <p>
            <strong>Step one is the benefit rate.</strong> Take your average
            weekly wage (usually averaged over the 52 weeks before the
            injury) and multiply by two-thirds. Every state then caps that
            rate at a statutory maximum — and most set a minimum — so
            higher-wage workers often receive less than a true two-thirds.
          </p>
          <p>
            <strong>Temporary total disability (TTD)</strong> pays that rate
            for each week you were completely unable to work.{" "}
            <strong>Permanent partial disability (PPD)</strong> pays it for a
            number of weeks set by your impairment rating times your
            state&apos;s schedule (300–500 weeks is typical for whole-person
            ratings; many states price specific body parts separately). Add{" "}
            <strong>future medical</strong> — the care the settlement must
            fund once the case closes — and subtract a regulated{" "}
            <strong>attorney fee</strong>, commonly 15–25%.
          </p>
          <h2>State Variation Is the Whole Game</h2>
          <ul className="check-list">
            <li>Maximum weekly benefits range from a few hundred dollars to over $2,000 depending on the state and year.</li>
            <li>Some states use whole-person impairment; others pay per body part with their own week values.</li>
            <li>Some states let you settle future medical away; others restrict or require Medicare set-aside arrangements.</li>
            <li>Waiting periods (often 3–7 days) and retroactivity rules change the first weeks of TTD.</li>
            <li>Most settlements are not final until a judge or board approves them.</li>
          </ul>
          <p>
            If you do not know your state&apos;s maximum, run the calculator
            uncapped first — then treat the result as a ceiling and confirm
            the cap with a workers&apos; compensation attorney in your state.
          </p>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/workers-compensation-settlement-payout-math",
          anchor: "workers' compensation settlement payout math",
        },
        {
          href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
          anchor: "what to do after a workplace injury: legal checklist",
        },
        {
          href: "/blog/how-much-does-workers-comp-attorney-cost-2026",
          anchor: "how much does a workers' comp attorney cost",
        },
        {
          href: "/blog/how-to-choose-workers-compensation-attorney",
          anchor: "how to choose a workers' compensation attorney",
        },
      ]}
      relatedSlugs={[
        "lost-wages-calculator",
        "personal-injury-settlement-calculator",
        "pain-and-suffering-calculator",
      ]}
    />
  );
}
