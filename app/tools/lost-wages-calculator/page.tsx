import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { ToolPage } from "@/components/ToolPage";
import { LostWagesCalculator } from "@/components/calculators/LostWagesCalculator";
import { getTool } from "@/lib/tools";

const tool = getTool("lost-wages-calculator")!;
const url = `${SITE_URL}/tools/${tool.slug}`;

export const metadata: Metadata = {
  title: "Lost Wages Calculator — Calculate Lost Income After an Injury",
  description:
    "Free lost wages calculator for injury claims: missed weeks at your hourly or salary rate, overtime at 1.5×, lost benefits, bonuses and commissions, reduced future earning capacity, minus replacement income — with the full breakdown shown.",
  alternates: { canonical: url },
  openGraph: {
    title: `Lost Wages Calculator | ${SITE_NAME}`,
    description:
      "Calculate the income an injury cost you — wages, overtime, benefits, and future capacity — itemized step by step.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs = [
  {
    q: "How do I calculate lost wages for an injury claim?",
    a: "Multiply your weekly pay by the weeks you missed, add lost overtime at 1.5× your hourly rate, add the value of lost benefits (commonly 10–30% of wages), add lost bonuses or commissions, then subtract income you earned from replacement work. Salaried employees use annual salary ÷ 52 as the weekly rate. This calculator performs each line and shows the breakdown an insurer will ask for.",
  },
  {
    q: "What documents prove lost wages?",
    a: "Pay stubs from before and after the injury, an employer letter or wage-verification form stating your rate, hours, and the dates you missed, and — for self-employed claimants — tax returns, invoices, and profit-and-loss statements. The more of the loss that is documented on paper, the less of it gets discounted in negotiation.",
  },
  {
    q: "Can I claim lost wages if I used sick leave or PTO?",
    a: "Yes. Paid time off you were forced to burn is still a loss — those days had value and would have been available for vacations or future illness. Most jurisdictions let you claim the value of used sick leave and vacation time as part of lost wages, even though your paycheck never changed.",
  },
  {
    q: "What is the difference between lost wages and lost earning capacity?",
    a: "Lost wages are the concrete pay you already missed (and can count from records). Lost earning capacity is the future income you will lose because the injury limits the work you can do — a reduced-hours schedule, a lighter but lower-paid job, or a foreclosed promotion path. Serious capacity claims are usually valued with a vocational expert and an economist; this calculator models the simpler reduced-capacity percentage over a set period.",
  },
  {
    q: "I'm self-employed. Can I claim lost income?",
    a: "Yes, but the proof standard is higher: you claim lost profits or lost business income rather than wages, supported by tax returns, contracts, invoices, and year-over-year comparisons. Expect the insurer to scrutinize it heavily, and expect an attorney (and possibly a forensic accountant) to matter more in these cases.",
  },
  {
    q: "Does the duty to mitigate reduce my lost wages?",
    a: "It can. You are expected to take reasonable steps to limit your losses — accepting suitable light-duty work your doctor approves, for example. Income you earned (or unreasonably refused) elsewhere is subtracted, which is the mitigation field in this calculator. Refusing work your doctor has cleared you for is the fact pattern that hurts claimants most.",
  },
];

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      h1={
        <>
          Lost Wages <em>Calculator</em>
        </>
      }
      heroAnswer="Lost wages in an injury claim are more than missed paychecks: they include overtime at time-and-a-half, the value of lost benefits and used PTO, bonuses and commissions, and future income lost to reduced capacity — minus any replacement income. Enter your pay details below for an itemized total, calculated the way an insurer will audit it."
      calculator={<LostWagesCalculator />}
      howItWorks={
        <>
          <h2>How the Lost Wages Calculator Works</h2>
          <p>
            Start with your <strong>weekly wage</strong> — hourly rate × hours,
            or salary ÷ 52. Multiply by the weeks you could not work for past
            wages, then layer on the pieces most people forget:{" "}
            <strong>overtime</strong> at 1.5× for the hours you reliably
            worked, <strong>lost benefits</strong> as a percentage of wages
            (employer retirement contributions, health coverage, PTO value),
            and one-off losses like a <strong>bonus or commissions</strong>.
          </p>
          <p>
            Looking forward, a <strong>reduced earning capacity</strong>{" "}
            percentage over a set number of weeks models the common case —
            back at work, but fewer hours or lighter duties at lower pay.
            Finally, <strong>mitigation income</strong> comes off the top:
            the law expects you to limit your losses where you reasonably
            can, and insurers will subtract replacement earnings whether you
            report them or not.
          </p>
          <h2>Documentation Checklist</h2>
          <ul className="check-list">
            <li>Last 2–3 pay stubs before the injury, and current stubs showing the shortfall.</li>
            <li>Employer wage-verification letter: rate, hours, dates missed, overtime history.</li>
            <li>Doctor&apos;s work restrictions tying each missed period to the injury.</li>
            <li>PTO/sick-leave records showing time you were forced to use.</li>
            <li>Self-employed: two years of tax returns, invoices, and a profit comparison.</li>
          </ul>
        </>
      }
      faqs={faqs}
      blogLinks={[
        {
          href: "/blog/workers-compensation-settlement-payout-math",
          anchor: "workers' compensation settlement payout math",
        },
        {
          href: "/blog/personal-injury-settlement-timeline-month-by-month",
          anchor: "personal injury settlement timeline, month by month",
        },
        {
          href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
          anchor: "what to do after a workplace injury: legal checklist",
        },
      ]}
      relatedSlugs={[
        "personal-injury-settlement-calculator",
        "car-accident-settlement-calculator",
        "workers-comp-settlement-calculator",
      ]}
    />
  );
}
