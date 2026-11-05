/** Registry of the free legal tools — used by the /tools hub, sitemap, and
 *  cross-links between tool pages. */
export interface ToolInfo {
  slug: string;
  name: string;
  short: string;
  practiceSlug: string;
  practiceName: string;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "car-accident-settlement-calculator",
    name: "Car Accident Settlement Calculator",
    short:
      "Estimate a car accident claim from your bills, lost wages, and vehicle damage — with fault and policy-limit adjustments.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "personal-injury-settlement-calculator",
    name: "Personal Injury Settlement Calculator",
    short:
      "A general claim-value estimate for any negligence injury, using the standard multiplier method with a full step-by-step breakdown.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "slip-and-fall-settlement-calculator",
    name: "Slip and Fall Settlement Calculator",
    short:
      "Premises-liability estimates that factor in how clear the property owner's responsibility is — not just your bills.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "workers-comp-settlement-calculator",
    name: "Workers' Comp Settlement Calculator",
    short:
      "The real workers' comp model: two-thirds wage replacement, impairment-rating weeks, future medical, and the attorney fee.",
    practiceSlug: "workers-compensation-attorney",
    practiceName: "Workers' Compensation Attorney",
  },
  {
    slug: "pain-and-suffering-calculator",
    name: "Pain and Suffering Calculator",
    short:
      "Both standard methods side by side — the multiplier method and the per-diem method — combined into one honest range.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "lost-wages-calculator",
    name: "Lost Wages Calculator",
    short:
      "Document the income an injury actually cost you: missed weeks, overtime, benefits, reduced capacity, and lost bonuses.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "wrongful-death-settlement-calculator",
    name: "Wrongful Death Settlement Calculator",
    short:
      "A fatal-case model for families: lost household support in today's dollars, funeral costs, and survivor damages.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
  {
    slug: "medical-malpractice-settlement-calculator",
    name: "Medical Malpractice Settlement Calculator",
    short:
      "The injury-claim model with the thing that decides med-mal cases: your state's cap on non-economic damages, applied openly.",
    practiceSlug: "personal-injury-lawyer",
    practiceName: "Personal Injury Lawyer",
  },
];

export function getTool(slug: string): ToolInfo | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const TOOL_DISCLAIMER =
  "Estimate only — this is not legal advice. This calculator applies a standard estimation method to the figures you enter. Real settlements depend on evidence, liability disputes, insurance limits, and state law. Consult a licensed attorney in your state about your specific case.";
