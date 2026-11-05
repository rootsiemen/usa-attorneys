import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DISCLAIMER, type Faq as FaqType } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { TOOL_DISCLAIMER } from "@/lib/tools";

const url = `${SITE_URL}/data/settlement-ranges`;

export const metadata: Metadata = {
  title: "Settlement Ranges by Case Type: Worked Examples",
  description:
    "What is a case with $25,000 in medical bills worth? Worked settlement ranges from the multiplier method — car accidents, slip & fall, med-mal, workers' comp, wrongful death.",
  alternates: { canonical: url },
  openGraph: {
    title: `Settlement Ranges by Case Type | ${SITE_NAME}`,
    description:
      "Example settlement ranges computed step by step with the standard multiplier method, comparative fault, damage caps, policy limits, and the workers' comp model.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs: FaqType[] = [
  {
    q: "How were these settlement ranges calculated?",
    a: "Every figure on this page was produced by the same estimation engine that powers this site's free calculators (lib/settlement.ts), run on clearly labeled example inputs. The core method is the multiplier method: economic damages are totaled, non-economic damages are estimated at 1–5× that total based on injury severity, and the result is reduced by comparative fault and checked against damage caps and insurance policy limits.",
  },
  {
    q: "What is a claim with $25,000 in medical bills worth?",
    a: "Using medical bills alone as the economic base: at moderate severity (1.5–2.5× multiplier) the range is $62,500–$87,500; at serious severity (2.5–3.5×) it is $87,500–$112,500; at severe severity (3.5–4.5×) it is $112,500–$137,500. Adding lost wages and other documented losses raises the base — and therefore every range — because the multiplier applies to the full economic total.",
  },
  {
    q: "Why does the policy-limit example pay so much less than the claim value?",
    a: "In the worked example, a serious car accident claim worth $337,500–$412,500 runs into a $50,000 insurance policy limit — and realistic recovery from that policy is $50,000. Insurers never pay above the policy limit they sold. The gap is sometimes covered by underinsured-motorist coverage or the defendant's personal assets, but the limit, not the injury, is often what decides the actual check.",
  },
  {
    q: "Why do workers' comp numbers look lower than injury settlements?",
    a: "Workers' comp is a different system: it pays two-thirds of your average weekly wage plus medical care on a state schedule, and it never pays pain and suffering. In exchange, benefits are (mostly) no-fault. The worked examples show a $1,000/week worker grossing about $39,667 and a $1,500/week worker about $136,000 under the model — before the attorney fee.",
  },
  {
    q: "Are these average settlements?",
    a: "No. These are worked examples with stated inputs, not averages of real settlements — no such reliable public average exists, and any site quoting one is guessing. Change any input (bills, severity, fault, caps, limits) and the range moves. Use the linked calculators with your own numbers for an estimate that reflects your case.",
  },
];

export default function SettlementRangesPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research & Data", item: url },
      { "@type": "ListItem", position: 3, name: "Settlement Ranges", item: url },
    ],
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Settlement Ranges by Case Type",
    url,
    description:
      "Worked example settlement ranges computed with the multiplier method, comparative fault, statutory caps, policy limits, and the workers' compensation model.",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={webPageLd} />
      <JsonLd data={faqLd} />

      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Settlement Ranges by Case Type</span>
          </nav>
          <h1>
            Settlement Ranges <em>by Case Type</em>
          </h1>
          <p>
            &ldquo;What is my case worth?&rdquo; has no honest single-number
            answer — but it does have a method. Below are worked example cases
            run through the exact estimation engine behind our{" "}
            <Link href="/tools">free legal calculators</Link>, with every
            input stated and every step shown, so you can see how bills,
            severity, fault, caps, and policy limits move a settlement range.
          </p>
          <p>
            <strong>{TOOL_DISCLAIMER}</strong>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>The Method, Step by Step</h2>
            <ol>
              <li>
                <strong>Step 1 — Economic damages.</strong> Add every
                documented loss: medical bills, future care, lost wages,
                future lost earnings, property damage.
              </li>
              <li>
                <strong>Step 2 — Non-economic damages.</strong> Multiply the
                economic total by a severity multiplier of 1–5 (minor 1–1.5×,
                moderate 1.5–2.5×, serious 2.5–3.5×, severe 3.5–4.5×,
                catastrophic 4.5–5×) to estimate pain and suffering.
              </li>
              <li>
                <strong>Step 3 — Gross claim value.</strong> Economic +
                non-economic damages.
              </li>
              <li>
                <strong>Step 4 — Fault adjustment.</strong> Reduce by your
                percentage of comparative fault (20% at fault → 20% less).
              </li>
              <li>
                <strong>Step 5 — Reality checks.</strong> Apply statutory caps
                on non-economic damages where they exist, then compare against
                the at-fault party&apos;s insurance policy limit — the
                realistic recovery rarely exceeds it.
              </li>
            </ol>
            <p>
              Workers&apos; compensation skips this method entirely: it pays
              two-thirds of the average weekly wage plus medical care on a
              state schedule, with no pain-and-suffering component. Wrongful
              death uses a lost-support model instead. Both are worked below.
            </p>

            <h2>Car Accident Settlement Ranges</h2>
            <p>
              Three example crashes at three severity levels, no fault assigned
              to the injured driver. Run your own figures in the{" "}
              <Link href="/tools/car-accident-settlement-calculator">
                car accident settlement calculator
              </Link>
              .
            </p>
          </div>

          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Example scenario</th>
                  <th className="num">Economic damages</th>
                  <th className="num">Multiplier</th>
                  <th className="num">Estimated range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Minor crash — $10,000 medical bills, $2,000 lost wages,
                    $3,000 vehicle damage (severity 2)
                  </td>
                  <td className="num">$15,000</td>
                  <td className="num">1.5–2.5×</td>
                  <td className="num">$37,500 – $52,500</td>
                </tr>
                <tr>
                  <td>
                    Serious crash — $25,000 medical bills, $5,000 lost wages,
                    $5,000 vehicle damage (severity 3)
                  </td>
                  <td className="num">$35,000</td>
                  <td className="num">2.5–3.5×</td>
                  <td className="num">$122,500 – $157,500</td>
                </tr>
                <tr>
                  <td>
                    Severe crash — $50,000 medical bills, $15,000 future care,
                    $10,000 lost wages (severity 4)
                  </td>
                  <td className="num">$75,000</td>
                  <td className="num">3.5–4.5×</td>
                  <td className="num">$337,500 – $412,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose">
            <h3>How fault and policy limits change the same cases</h3>
            <ul>
              <li>
                The serious crash above with <strong>20% fault</strong>{" "}
                assigned to you: $122,500–$157,500 drops to{" "}
                <strong>$98,000 – $126,000</strong>.
              </li>
              <li>
                The severe crash above against a{" "}
                <strong>$50,000 policy limit</strong>: claim value stays
                $337,500–$412,500, but the realistic recovery from that policy
                is capped at <strong>$50,000</strong>.
              </li>
            </ul>

            <h2>Same Medical Bills, Different Severity</h2>
            <p>
              Severity is the single biggest lever in the multiplier method.
              Holding medical bills constant at $25,000 (bills only, no lost
              wages) and moving only the severity level — computed with the{" "}
              <Link href="/tools/personal-injury-settlement-calculator">
                personal injury settlement calculator
              </Link>
              :
            </p>
          </div>

          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Severity level</th>
                  <th className="num">Multiplier</th>
                  <th className="num">Estimated range on $25,000 of bills</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2 — Moderate (fractures, months of treatment)</td>
                  <td className="num">1.5–2.5×</td>
                  <td className="num">$62,500 – $87,500</td>
                </tr>
                <tr>
                  <td>3 — Serious (surgery, extended recovery)</td>
                  <td className="num">2.5–3.5×</td>
                  <td className="num">$87,500 – $112,500</td>
                </tr>
                <tr>
                  <td>4 — Severe (permanent impairment)</td>
                  <td className="num">3.5–4.5×</td>
                  <td className="num">$112,500 – $137,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose">
            <p>
              The alternative pain-and-suffering method is per-diem: a daily
              rate for each day of recovery. At $150/day over a 180-day
              recovery, that is <strong>$27,000</strong> of non-economic
              damages — compare both methods side by side in the{" "}
              <Link href="/tools/pain-and-suffering-calculator">
                pain and suffering calculator
              </Link>
              .
            </p>

            <h2>Slip &amp; Fall: When Liability Is Disputed</h2>
            <p>
              Premises cases add a liability-strength discount. Example:
              $15,000 in medical bills and $3,000 in lost wages ($18,000
              economic), severity 2, with liability rated 75% clear — the
              $45,000–$63,000 gross range becomes{" "}
              <strong>$33,750 – $47,250</strong>. Model your own facts in the{" "}
              <Link href="/tools/slip-and-fall-settlement-calculator">
                slip and fall settlement calculator
              </Link>
              .
            </p>

            <h2>Medical Malpractice: When a Cap Decides the Case</h2>
            <p>
              Example: $75,000 in medical bills, $25,000 future care, and
              $20,000 lost wages ($120,000 economic) at severity 4. Uncapped,
              the multiplier method gives $420,000–$540,000 of non-economic
              damages. In a state with a <strong>$250,000 cap</strong> on
              non-economic damages, the cap binds at both ends and the whole
              range collapses to a single figure:{" "}
              <strong>$370,000</strong> ($120,000 economic + $250,000 capped
              non-economic). See how your state&apos;s cap changes the math in
              the{" "}
              <Link href="/tools/medical-malpractice-settlement-calculator">
                medical malpractice settlement calculator
              </Link>
              .
            </p>

            <h2>Workers&apos; Comp Settlement Ranges</h2>
            <p>
              The comp model: weekly benefit = ⅔ of the average weekly wage;
              permanent partial disability = impairment rating × a 400-week
              body schedule at that rate; plus future medical. No
              pain-and-suffering damages, ever. Worked with the{" "}
              <Link href="/tools/workers-comp-settlement-calculator">
                workers&apos; comp settlement calculator
              </Link>
              :
            </p>
          </div>

          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Example worker</th>
                  <th className="num">Weekly benefit (⅔ wage)</th>
                  <th className="num">Gross estimate</th>
                  <th className="num">Net after 20% attorney fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    $1,000/week wage, 12 weeks out, 10% impairment rating,
                    $5,000 future medical
                  </td>
                  <td className="num">$667</td>
                  <td className="num">$39,667</td>
                  <td className="num">$31,733</td>
                </tr>
                <tr>
                  <td>
                    $1,500/week wage, 26 weeks out, 25% impairment rating,
                    $10,000 future medical
                  </td>
                  <td className="num">$1,000</td>
                  <td className="num">$136,000</td>
                  <td className="num">$108,800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="prose">
            <p>
              First example broken down: temporary disability pays $667 × 12
              weeks = $8,000; the 10% rating × 400-week schedule = 40 weeks ×
              $667 = $26,667; plus $5,000 future medical = $39,667 gross.
            </p>

            <h2>Lost Wages: The Building Block</h2>
            <p>
              Lost wages feed the economic base of every injury claim. Example
              from the{" "}
              <Link href="/tools/lost-wages-calculator">
                lost wages calculator
              </Link>
              : a $30/hour worker (40 hrs/week) who misses 8 weeks loses
              $9,600 in base pay, $1,800 in overtime (5 hrs/week at 1.5×), and
              $2,280 in benefits valued at 20% — a documented total of{" "}
              <strong>$13,680</strong> before any multiplier is applied.
            </p>

            <h2>Wrongful Death: A Claim-Value Model, Not a Typical Settlement</h2>
            <p>
              Fatal cases are modeled differently: lost household support in
              today&apos;s dollars. Example from the{" "}
              <Link href="/tools/wrongful-death-settlement-calculator">
                wrongful death settlement calculator
              </Link>
              : a 45-year-old earning $75,000, providing 70% of income as
              household support plus $8,000/year in benefits and $6,000/year in
              household services ($66,500/year of support), 22 working years
              lost to a 67 retirement age, discounted at 3%. Lost support in
              present value: <strong>$1,059,805</strong>. Adding $20,000
              pre-death medical and $12,000 funeral costs gives $1,091,805 in
              economic damages and a full claim-value range of{" "}
              <strong>$3,821,317 – $4,913,122</strong> at severity 3. Real
              wrongful death settlements usually resolve below full claim value
              and are frequently limited by available insurance — treat this as
              the model&apos;s measure of loss, not a prediction.
            </p>

            <h2>Methodology &amp; Sources</h2>
            <p>
              Every number on this page was computed by the open estimation
              engine behind this site&apos;s calculators (the multiplier and
              per-diem methods, comparative-fault reduction, statutory-cap and
              policy-limit handling, the ⅔-wage workers&apos; comp model, and
              the present-value lost-support model), run on the exact inputs
              stated next to each result. Nothing here is an average of real
              settlements, and no figure was adjusted by hand. Companion data:{" "}
              <Link href="/data/attorney-density-by-state">
                attorney density by state
              </Link>{" "}
              — where the lawyers for each case type are actually listed.
            </p>

            <h2>Frequently Asked Questions</h2>
            <Faq items={faqs} />

            <div className="cta-banner">
              <h2>Run Your Own Numbers</h2>
              <p>
                Every range above came from a free calculator on this site.
                Enter your own bills, wages, and severity for an estimate built
                on your facts — math shown, no sign-up.
              </p>
              <Link href="/tools" className="btn btn-gold">
                Open the Free Calculators →
              </Link>
            </div>
            <p style={{ fontSize: 13, color: "var(--gray-600)" }}>
              {TOOL_DISCLAIMER} {DISCLAIMER}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
