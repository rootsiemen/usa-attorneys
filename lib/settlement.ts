/**
 * Settlement estimation engines for the free legal tools on USA Attorneys.
 *
 * These implement the published, standard estimation methods used across the
 * legal industry — the multiplier method and per-diem method for non-economic
 * damages, comparative-fault reduction, policy-limits and statutory-cap
 * handling, the workers' compensation benefit model (average weekly wage ×
 * 2/3 replacement rate), and a present-value lost-support model for wrongful
 * death. They produce RANGES with a step-by-step methodology trail.
 *
 * Every output is an estimate for education only — not legal advice.
 */

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

export function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function round(n: number): number {
  return Math.round(n);
}

function clampNonNeg(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/* ------------------------------------------------------------------ */
/* Severity → multiplier bands (multiplier method)                     */
/* ------------------------------------------------------------------ */

export interface SeverityBand {
  level: number;
  label: string;
  low: number;
  high: number;
}

/**
 * The multiplier method: non-economic damages are estimated as a multiple of
 * economic damages. Published practice puts the multiple between 1 and 5,
 * rising with injury severity. Each level below maps to a band so the result
 * is a range, never a single invented point.
 */
export const SEVERITY_BANDS: SeverityBand[] = [
  {
    level: 1,
    label: "Minor — bruises, sprains, short treatment, full recovery expected",
    low: 1,
    high: 1.5,
  },
  {
    level: 2,
    label: "Moderate — fractures or months of treatment, full recovery likely",
    low: 1.5,
    high: 2.5,
  },
  {
    level: 3,
    label: "Serious — surgery, extended recovery, or lasting symptoms",
    low: 2.5,
    high: 3.5,
  },
  {
    level: 4,
    label: "Severe — permanent impairment, disability, or major life impact",
    low: 3.5,
    high: 4.5,
  },
  {
    level: 5,
    label: "Catastrophic — life-changing injuries, permanent care needs",
    low: 4.5,
    high: 5,
  },
];

export function severityBand(level: number): SeverityBand {
  const found = SEVERITY_BANDS.find((b) => b.level === level);
  return found ?? SEVERITY_BANDS[1];
}

/* ------------------------------------------------------------------ */
/* Core settlement engine (car accident, PI, slip & fall, med-mal)     */
/* ------------------------------------------------------------------ */

export interface SettlementInputs {
  medicalBills: number;
  futureMedical: number;
  lostWages: number;
  futureLostEarnings: number;
  propertyDamage: number;
  otherEconomic: number;
  /** Severity level 1–5 (see SEVERITY_BANDS). */
  severity: number;
  /** Claimant's share of fault, 0–100. */
  faultPercent: number;
  /**
   * Optional 0–1 liability-strength factor (slip & fall). 1 = liability is
   * clear; lower values discount for disputed notice / responsibility.
   */
  liabilityFactor?: number;
  /** Optional insurance policy limit — triggers a realistic-recovery cap. */
  policyLimit?: number;
  /** Optional statutory cap on NON-economic damages (e.g. med-mal caps). */
  nonEconomicCap?: number;
  /** Optional contingency fee % — produces a net-to-you view. */
  contingencyFeePercent?: number;
  /** Optional case costs (experts, filing, records) deducted for net view. */
  caseCosts?: number;
}

export interface SettlementResult {
  economic: number;
  breakdown: { label: string; amount: number }[];
  multiplierLow: number;
  multiplierHigh: number;
  nonEconomicLow: number;
  nonEconomicHigh: number;
  capApplied: boolean;
  grossLow: number;
  grossHigh: number;
  afterFaultLow: number;
  afterFaultHigh: number;
  policyCapped: boolean;
  realisticLow: number;
  realisticHigh: number;
  feeLow: number | null;
  feeHigh: number | null;
  netLow: number | null;
  netHigh: number | null;
  steps: string[];
  warnings: string[];
}

export function calculateSettlement(input: SettlementInputs): SettlementResult {
  const medicalBills = clampNonNeg(input.medicalBills);
  const futureMedical = clampNonNeg(input.futureMedical);
  const lostWages = clampNonNeg(input.lostWages);
  const futureLostEarnings = clampNonNeg(input.futureLostEarnings);
  const propertyDamage = clampNonNeg(input.propertyDamage);
  const otherEconomic = clampNonNeg(input.otherEconomic);
  const fault = Math.min(100, Math.max(0, input.faultPercent || 0));
  const liability =
    input.liabilityFactor === undefined
      ? 1
      : Math.min(1, Math.max(0, input.liabilityFactor));
  const band = severityBand(input.severity);

  const breakdown = [
    { label: "Medical bills (past)", amount: medicalBills },
    { label: "Future medical care", amount: futureMedical },
    { label: "Lost wages (past)", amount: lostWages },
    { label: "Future lost earnings", amount: futureLostEarnings },
    { label: "Property damage", amount: propertyDamage },
    { label: "Other economic losses", amount: otherEconomic },
  ].filter((r) => r.amount > 0);

  const economic =
    medicalBills +
    futureMedical +
    lostWages +
    futureLostEarnings +
    propertyDamage +
    otherEconomic;

  let nonEconomicLow = economic * band.low;
  let nonEconomicHigh = economic * band.high;
  let capApplied = false;
  if (input.nonEconomicCap !== undefined && input.nonEconomicCap > 0) {
    if (nonEconomicLow > input.nonEconomicCap) {
      nonEconomicLow = input.nonEconomicCap;
      capApplied = true;
    }
    if (nonEconomicHigh > input.nonEconomicCap) {
      nonEconomicHigh = input.nonEconomicCap;
      capApplied = true;
    }
  }

  const grossLow = economic + nonEconomicLow;
  const grossHigh = economic + nonEconomicHigh;

  const afterFaultLow = grossLow * (1 - fault / 100) * liability;
  const afterFaultHigh = grossHigh * (1 - fault / 100) * liability;

  let policyCapped = false;
  let realisticLow = afterFaultLow;
  let realisticHigh = afterFaultHigh;
  if (input.policyLimit !== undefined && input.policyLimit > 0) {
    if (realisticLow > input.policyLimit) {
      realisticLow = input.policyLimit;
      policyCapped = true;
    }
    if (realisticHigh > input.policyLimit) {
      realisticHigh = input.policyLimit;
      policyCapped = true;
    }
  }

  let feeLow: number | null = null;
  let feeHigh: number | null = null;
  let netLow: number | null = null;
  let netHigh: number | null = null;
  if (input.contingencyFeePercent !== undefined) {
    const feePct = Math.min(100, Math.max(0, input.contingencyFeePercent));
    const costs = clampNonNeg(input.caseCosts ?? 0);
    feeLow = (realisticLow * feePct) / 100;
    feeHigh = (realisticHigh * feePct) / 100;
    netLow = Math.max(0, realisticLow - feeLow - costs);
    netHigh = Math.max(0, realisticHigh - feeHigh - costs);
  }

  const steps: string[] = [];
  steps.push(
    `Step 1 — Economic damages: ${breakdown
      .map((r) => `${r.label} ${money(r.amount)}`)
      .join(" + ")} = ${money(economic)}.`
  );
  steps.push(
    `Step 2 — Non-economic damages (multiplier method): severity level ${band.level} uses a ${band.low}×–${band.high}× multiplier on economic damages → ${money(
      nonEconomicLow
    )} – ${money(nonEconomicHigh)} for pain, suffering, and loss of enjoyment of life.${
      capApplied
        ? ` A statutory cap of ${money(input.nonEconomicCap!)} on non-economic damages was applied.`
        : ""
    }`
  );
  steps.push(
    `Step 3 — Gross claim value: ${money(economic)} + non-economic = ${money(
      grossLow
    )} – ${money(grossHigh)}.`
  );
  if (fault > 0 || liability < 1) {
    const parts: string[] = [];
    if (fault > 0) parts.push(`${fault}% comparative fault`);
    if (liability < 1)
      parts.push(`a liability-strength factor of ${liability.toFixed(2)}`);
    steps.push(
      `Step 4 — Fault and liability adjustment: reduced for ${parts.join(
        " and "
      )} → ${money(afterFaultLow)} – ${money(afterFaultHigh)}.`
    );
  } else {
    steps.push(
      `Step 4 — Fault adjustment: no fault assigned to you, so no reduction → ${money(
        afterFaultLow
      )} – ${money(afterFaultHigh)}.`
    );
  }
  if (input.policyLimit !== undefined && input.policyLimit > 0) {
    steps.push(
      `Step 5 — Policy limits: the at-fault party's insurance limit you entered is ${money(
        input.policyLimit
      )}. ${
        policyCapped
          ? "Your claim value exceeds it, so the realistic recovery from that policy is capped at the limit (collecting more requires the defendant's personal assets)."
          : "Your claim value fits within the limit."
      }`
    );
  }
  if (feeLow !== null && feeHigh !== null && netLow !== null && netHigh !== null) {
    steps.push(
      `Net view — After a ${input.contingencyFeePercent}% contingency fee${
        input.caseCosts ? ` and ${money(input.caseCosts)} in case costs` : ""
      }, the estimated amount to you is ${money(netLow)} – ${money(netHigh)} (fee ${money(
        feeLow
      )} – ${money(feeHigh)}).`
    );
  }

  const warnings: string[] = [];
  if (fault >= 50) {
    warnings.push(
      "At 50% or more fault, most states sharply limit or bar recovery entirely (modified comparative fault). In Alabama, Maryland, North Carolina, Virginia, and DC, any fault at all can bar recovery. A fault finding this high needs a lawyer's review before you rely on any number."
    );
  } else if (fault > 0) {
    warnings.push(
      "Fault percentages are fought over in almost every claim — the insurer's number is rarely the final one. Even a 10-point swing changes this estimate materially."
    );
  }
  if (economic === 0) {
    warnings.push(
      "You entered no economic damages. The multiplier method needs documented losses (bills, wages) as its base — with a zero base it returns zero, even though real claims with small bills can still have value."
    );
  }

  return {
    economic: round(economic),
    breakdown: breakdown.map((r) => ({ ...r, amount: round(r.amount) })),
    multiplierLow: band.low,
    multiplierHigh: band.high,
    nonEconomicLow: round(nonEconomicLow),
    nonEconomicHigh: round(nonEconomicHigh),
    capApplied,
    grossLow: round(grossLow),
    grossHigh: round(grossHigh),
    afterFaultLow: round(afterFaultLow),
    afterFaultHigh: round(afterFaultHigh),
    policyCapped,
    realisticLow: round(realisticLow),
    realisticHigh: round(realisticHigh),
    feeLow: feeLow === null ? null : round(feeLow),
    feeHigh: feeHigh === null ? null : round(feeHigh),
    netLow: netLow === null ? null : round(netLow),
    netHigh: netHigh === null ? null : round(netHigh),
    steps,
    warnings,
  };
}

/* ------------------------------------------------------------------ */
/* Per-diem method (pain & suffering alternative view)                 */
/* ------------------------------------------------------------------ */

export function perDiemEstimate(dailyRate: number, days: number): number {
  return round(clampNonNeg(dailyRate) * clampNonNeg(days));
}

/* ------------------------------------------------------------------ */
/* Lost wages engine                                                   */
/* ------------------------------------------------------------------ */

export interface LostWagesInputs {
  payType: "hourly" | "salary";
  hourlyRate: number;
  hoursPerWeek: number;
  annualSalary: number;
  weeksMissed: number;
  overtimeHoursPerWeek: number;
  /** Lost benefits as a % of lost wages (employer 401k, health, PTO value). */
  benefitsPercent: number;
  /** One-off lost income: bonus, commissions, tips. */
  otherIncomeLost: number;
  /** Future loss: expected % of earning capacity lost (0–100). */
  futureCapacityLossPercent: number;
  futureWeeks: number;
  /** Income earned from replacement work (duty to mitigate). */
  mitigationIncome: number;
}

export interface LostWagesResult {
  weeklyWage: number;
  pastWages: number;
  overtime: number;
  futureWages: number;
  benefits: number;
  otherIncome: number;
  mitigation: number;
  total: number;
  steps: string[];
}

export function calculateLostWages(input: LostWagesInputs): LostWagesResult {
  const weeklyWage =
    input.payType === "salary"
      ? clampNonNeg(input.annualSalary) / 52
      : clampNonNeg(input.hourlyRate) * clampNonNeg(input.hoursPerWeek);
  const hourlyBasis =
    input.payType === "salary"
      ? weeklyWage / (clampNonNeg(input.hoursPerWeek) || 40)
      : clampNonNeg(input.hourlyRate);

  const weeksMissed = clampNonNeg(input.weeksMissed);
  const pastWages = weeklyWage * weeksMissed;
  const overtime =
    clampNonNeg(input.overtimeHoursPerWeek) * hourlyBasis * 1.5 * weeksMissed;
  const capacityLoss = Math.min(
    100,
    Math.max(0, input.futureCapacityLossPercent || 0)
  );
  const futureWages =
    weeklyWage * (capacityLoss / 100) * clampNonNeg(input.futureWeeks);
  const benefits =
    ((pastWages + overtime + futureWages) *
      Math.min(100, Math.max(0, input.benefitsPercent || 0))) /
    100;
  const otherIncome = clampNonNeg(input.otherIncomeLost);
  const mitigation = clampNonNeg(input.mitigationIncome);
  const total = Math.max(
    0,
    pastWages + overtime + futureWages + benefits + otherIncome - mitigation
  );

  const steps = [
    `Weekly wage: ${
      input.payType === "salary"
        ? `${money(clampNonNeg(input.annualSalary))} salary ÷ 52 weeks`
        : `${money(clampNonNeg(input.hourlyRate))}/hr × ${clampNonNeg(
            input.hoursPerWeek
          )} hrs`
    } = ${money(weeklyWage)} per week.`,
    `Past lost wages: ${money(weeklyWage)} × ${weeksMissed} weeks missed = ${money(
      pastWages
    )}.`,
    ...(overtime > 0
      ? [
          `Lost overtime: ${clampNonNeg(
            input.overtimeHoursPerWeek
          )} hrs/week × ${money(hourlyBasis)} × 1.5 (overtime rate) × ${weeksMissed} weeks = ${money(
            overtime
          )}.`,
        ]
      : []),
    ...(futureWages > 0
      ? [
          `Future lost earnings: ${capacityLoss}% reduced capacity × ${money(
            weeklyWage
          )} × ${clampNonNeg(input.futureWeeks)} weeks = ${money(futureWages)}.`,
        ]
      : []),
    ...(benefits > 0
      ? [
          `Lost benefits: ${input.benefitsPercent}% of lost wages (employer retirement contributions, health coverage, paid time off value) = ${money(
            benefits
          )}.`,
        ]
      : []),
    ...(otherIncome > 0
      ? [`Lost bonus / commissions / tips: ${money(otherIncome)}.`]
      : []),
    ...(mitigation > 0
      ? [
          `Minus replacement income you earned (or could have earned) — the duty to mitigate: −${money(
            mitigation
          )}.`,
        ]
      : []),
    `Total estimated lost income: ${money(total)}.`,
  ];

  return {
    weeklyWage: round(weeklyWage),
    pastWages: round(pastWages),
    overtime: round(overtime),
    futureWages: round(futureWages),
    benefits: round(benefits),
    otherIncome: round(otherIncome),
    mitigation: round(mitigation),
    total: round(total),
    steps,
  };
}

/* ------------------------------------------------------------------ */
/* Workers' compensation engine (own model — no pain & suffering)      */
/* ------------------------------------------------------------------ */

export interface WorkersCompInputs {
  averageWeeklyWage: number;
  /** State maximum weekly benefit, if known (0/undefined = no cap applied). */
  stateMaxWeeklyBenefit?: number;
  /** State minimum weekly benefit, if known. */
  stateMinWeeklyBenefit?: number;
  /** Weeks totally out of work (temporary total disability period). */
  weeksOutOfWork: number;
  /** Whole-person impairment rating, 0–100 (from the treating doctor / IME). */
  impairmentRatingPercent: number;
  /**
   * Total weeks in the state's body schedule (commonly 300–500). Permanent
   * partial weeks = rating % × schedule weeks.
   */
  scheduleWeeks: number;
  futureMedical: number;
  otherCosts: number;
  /** Permanent & total disability instead of partial: years of benefits. */
  permanentTotal: boolean;
  ptdYears: number;
  attorneyFeePercent: number;
}

export interface WorkersCompResult {
  compRate: number;
  rawRate: number;
  capApplied: boolean;
  floorApplied: boolean;
  ttd: number;
  ppd: number;
  ppdWeeks: number;
  futureMedical: number;
  otherCosts: number;
  gross: number;
  fee: number;
  net: number;
  steps: string[];
}

export function calculateWorkersComp(
  input: WorkersCompInputs
): WorkersCompResult {
  const aww = clampNonNeg(input.averageWeeklyWage);
  const rawRate = (aww * 2) / 3;
  let compRate = rawRate;
  let capApplied = false;
  let floorApplied = false;
  if (
    input.stateMaxWeeklyBenefit !== undefined &&
    input.stateMaxWeeklyBenefit > 0 &&
    compRate > input.stateMaxWeeklyBenefit
  ) {
    compRate = input.stateMaxWeeklyBenefit;
    capApplied = true;
  }
  if (
    input.stateMinWeeklyBenefit !== undefined &&
    input.stateMinWeeklyBenefit > 0 &&
    compRate < input.stateMinWeeklyBenefit
  ) {
    compRate = input.stateMinWeeklyBenefit;
    floorApplied = true;
  }

  const weeksOut = clampNonNeg(input.weeksOutOfWork);
  const ttd = compRate * weeksOut;

  const rating = Math.min(100, Math.max(0, input.impairmentRatingPercent || 0));
  const schedule = clampNonNeg(input.scheduleWeeks) || 400;
  let ppdWeeks = (rating / 100) * schedule;
  let ppd: number;
  if (input.permanentTotal) {
    ppdWeeks = clampNonNeg(input.ptdYears) * 52;
    ppd = compRate * ppdWeeks;
  } else {
    ppd = compRate * ppdWeeks;
  }

  const futureMedical = clampNonNeg(input.futureMedical);
  const otherCosts = clampNonNeg(input.otherCosts);
  const gross = ttd + ppd + futureMedical + otherCosts;
  const feePct = Math.min(100, Math.max(0, input.attorneyFeePercent || 0));
  const fee = (gross * feePct) / 100;
  const net = gross - fee;

  const steps = [
    `Weekly benefit rate: average weekly wage ${money(aww)} × 2/3 replacement = ${money(
      rawRate
    )}/week${
      capApplied
        ? `, capped at your state's maximum of ${money(
            input.stateMaxWeeklyBenefit!
          )}/week`
        : ""
    }${
      floorApplied
        ? `, raised to your state's minimum of ${money(
            input.stateMinWeeklyBenefit!
          )}/week`
        : ""
    } → ${money(compRate)}/week.`,
    `Temporary total disability (time fully out of work): ${money(
      compRate
    )} × ${weeksOut} weeks = ${money(ttd)}.`,
    input.permanentTotal
      ? `Permanent total disability: ${money(compRate)} × ${ppdWeeks} weeks (${clampNonNeg(
          input.ptdYears
        )} years — many states pay PTD for life or to retirement age; this is a planning figure, not a schedule) = ${money(
          ppd
        )}.`
      : `Permanent partial disability: ${rating}% impairment rating × ${schedule}-week body schedule = ${ppdWeeks.toFixed(
          1
        )} weeks × ${money(compRate)} = ${money(ppd)}.`,
    ...(futureMedical > 0
      ? [`Future medical care (often paid as a lump sum in a settlement): ${money(futureMedical)}.`]
      : []),
    ...(otherCosts > 0
      ? [`Other recoverable costs (mileage, vocational help, penalties): ${money(otherCosts)}.`]
      : []),
    `Gross estimated value: ${money(gross)}.`,
    `Attorney fee at ${feePct}% (workers' comp fees are usually court-approved and commonly 15–25% of the settlement): −${money(
      fee
    )} → estimated net ${money(net)}.`,
    "Workers' comp does not pay pain and suffering — benefits replace wages and cover medical care only. That trade-off (no-fault benefits, no pain-and-suffering damages) is the core of the workers' comp bargain in every state.",
  ];

  return {
    compRate: round(compRate),
    rawRate: round(rawRate),
    capApplied,
    floorApplied,
    ttd: round(ttd),
    ppd: round(ppd),
    ppdWeeks: Math.round(ppdWeeks * 10) / 10,
    futureMedical: round(futureMedical),
    otherCosts: round(otherCosts),
    gross: round(gross),
    fee: round(fee),
    net: round(net),
    steps,
  };
}

/* ------------------------------------------------------------------ */
/* Wrongful death engine (fatal-case model)                            */
/* ------------------------------------------------------------------ */

export interface WrongfulDeathInputs {
  annualIncome: number;
  /** % of income that supported the household (commonly ~70%). */
  supportSharePercent: number;
  /** Lost benefits per year (health insurance, pension contributions). */
  annualBenefits: number;
  /** Value of lost household services per year (childcare, home upkeep). */
  annualHouseholdServices: number;
  ageAtDeath: number;
  retirementAge: number;
  /** Discount rate % to convert future support to present value. */
  discountRatePercent: number;
  preDeathMedical: number;
  funeralCosts: number;
  otherEconomic: number;
  /** Survivor damages for conscious pain & suffering before death. */
  consciousPainAmount: number;
  /** Severity level 1–5 for survivor non-economic damages. */
  severity: number;
  faultPercent: number;
  /** Optional state cap on non-economic damages. */
  nonEconomicCap?: number;
  /** Optional available insurance / assets cap for realistic recovery. */
  policyLimit?: number;
  contingencyFeePercent?: number;
}

export interface WrongfulDeathResult {
  yearsLost: number;
  annualSupport: number;
  pvFactor: number;
  lostSupportPV: number;
  economic: number;
  nonEconomicLow: number;
  nonEconomicHigh: number;
  capApplied: boolean;
  grossLow: number;
  grossHigh: number;
  afterFaultLow: number;
  afterFaultHigh: number;
  policyCapped: boolean;
  realisticLow: number;
  realisticHigh: number;
  netLow: number | null;
  netHigh: number | null;
  steps: string[];
  warnings: string[];
}

/** Present value of $1/year for n years at discount rate r (annual, end-of-year). */
export function annuityFactor(years: number, ratePercent: number): number {
  const n = Math.max(0, Math.floor(years));
  const r = Math.max(0, ratePercent) / 100;
  if (n === 0) return 0;
  if (r === 0) return n;
  return (1 - Math.pow(1 + r, -n)) / r;
}

export function calculateWrongfulDeath(
  input: WrongfulDeathInputs
): WrongfulDeathResult {
  const income = clampNonNeg(input.annualIncome);
  const share = Math.min(100, Math.max(0, input.supportSharePercent || 0));
  const annualSupport =
    (income * share) / 100 +
    clampNonNeg(input.annualBenefits) +
    clampNonNeg(input.annualHouseholdServices);
  const yearsLost = Math.max(
    0,
    Math.floor(clampNonNeg(input.retirementAge) - clampNonNeg(input.ageAtDeath))
  );
  const pvFactor = annuityFactor(yearsLost, input.discountRatePercent || 0);
  const lostSupportPV = annualSupport * pvFactor;

  const preDeathMedical = clampNonNeg(input.preDeathMedical);
  const funeral = clampNonNeg(input.funeralCosts);
  const other = clampNonNeg(input.otherEconomic);
  const consciousPain = clampNonNeg(input.consciousPainAmount);
  const economic = lostSupportPV + preDeathMedical + funeral + other;

  const band = severityBand(input.severity);
  let nonEconomicLow = economic * band.low + consciousPain;
  let nonEconomicHigh = economic * band.high + consciousPain;
  let capApplied = false;
  if (input.nonEconomicCap !== undefined && input.nonEconomicCap > 0) {
    if (nonEconomicLow > input.nonEconomicCap) {
      nonEconomicLow = input.nonEconomicCap;
      capApplied = true;
    }
    if (nonEconomicHigh > input.nonEconomicCap) {
      nonEconomicHigh = input.nonEconomicCap;
      capApplied = true;
    }
  }

  const grossLow = economic + nonEconomicLow;
  const grossHigh = economic + nonEconomicHigh;
  const fault = Math.min(100, Math.max(0, input.faultPercent || 0));
  const afterFaultLow = grossLow * (1 - fault / 100);
  const afterFaultHigh = grossHigh * (1 - fault / 100);

  let policyCapped = false;
  let realisticLow = afterFaultLow;
  let realisticHigh = afterFaultHigh;
  if (input.policyLimit !== undefined && input.policyLimit > 0) {
    if (realisticLow > input.policyLimit) {
      realisticLow = input.policyLimit;
      policyCapped = true;
    }
    if (realisticHigh > input.policyLimit) {
      realisticHigh = input.policyLimit;
      policyCapped = true;
    }
  }

  let netLow: number | null = null;
  let netHigh: number | null = null;
  if (input.contingencyFeePercent !== undefined) {
    const feePct = Math.min(100, Math.max(0, input.contingencyFeePercent));
    netLow = Math.max(0, realisticLow * (1 - feePct / 100));
    netHigh = Math.max(0, realisticHigh * (1 - feePct / 100));
  }

  const steps = [
    `Annual lost support: ${money(income)} income × ${share}% household support share = ${money(
      (income * share) / 100
    )}, plus ${money(clampNonNeg(input.annualBenefits))} lost benefits and ${money(
      clampNonNeg(input.annualHouseholdServices)
    )} of household services = ${money(annualSupport)} per year.`,
    `Working years lost: retirement at ${clampNonNeg(
      input.retirementAge
    )} − age at death ${clampNonNeg(input.ageAtDeath)} = ${yearsLost} years.`,
    `Present value of lost support: ${money(annualSupport)} × annuity factor ${pvFactor.toFixed(
      3
    )} (at a ${input.discountRatePercent || 0}% discount rate — future dollars are worth less than today's) = ${money(
      lostSupportPV
    )}.`,
    `Other economic losses: pre-death medical ${money(preDeathMedical)} + funeral and burial ${money(
      funeral
    )}${other > 0 ? ` + other ${money(other)}` : ""} → total economic damages ${money(
      economic
    )}.`,
    `Survivor non-economic damages (loss of companionship, guidance, and mental anguish): severity multiplier ${band.low}×–${band.high}× on economic damages${
      consciousPain > 0
        ? `, plus ${money(consciousPain)} for conscious pain and suffering before death`
        : ""
    }${capApplied ? `, capped at ${money(input.nonEconomicCap!)} by state law` : ""} = ${money(
      nonEconomicLow
    )} – ${money(nonEconomicHigh)}.`,
    `Gross claim value: ${money(grossLow)} – ${money(grossHigh)}${
      fault > 0
        ? `; after ${fault}% comparative fault: ${money(afterFaultLow)} – ${money(
            afterFaultHigh
          )}`
        : ""
    }.`,
    ...(input.policyLimit !== undefined && input.policyLimit > 0
      ? [
          `Realistic recovery check: ${
            policyCapped
              ? `claim value exceeds the ${money(
                  input.policyLimit
                )} in available insurance/assets you entered, so the realistic recovery is capped there unless the defendant has reachable personal assets.`
              : `claim value fits within the ${money(
                  input.policyLimit
                )} available insurance/assets.`
          }`,
        ]
      : []),
    ...(netLow !== null && netHigh !== null
      ? [
          `After a ${input.contingencyFeePercent}% contingency fee, the estimated amount to the family/estate is ${money(
            netLow
          )} – ${money(netHigh)} (before case costs and any liens).`,
        ]
      : []),
  ];

  const warnings: string[] = [
    "This is a claim-value model, not a settlement prediction. Wrongful death settlements usually resolve below full claim value, and who may recover (spouse, children, parents, the estate) is set by your state's wrongful death statute.",
    "Alabama is the exception to this whole model: wrongful death damages there are punitive only — compensatory damages like lost support are not recoverable.",
  ];
  if (fault >= 50) {
    warnings.push(
      "At 50% or more fault in most states, recovery is sharply limited or barred. Fault allocation in fatal cases is heavily litigated — get a lawyer's review."
    );
  }

  return {
    yearsLost,
    annualSupport: round(annualSupport),
    pvFactor: Math.round(pvFactor * 1000) / 1000,
    lostSupportPV: round(lostSupportPV),
    economic: round(economic),
    nonEconomicLow: round(nonEconomicLow),
    nonEconomicHigh: round(nonEconomicHigh),
    capApplied,
    grossLow: round(grossLow),
    grossHigh: round(grossHigh),
    afterFaultLow: round(afterFaultLow),
    afterFaultHigh: round(afterFaultHigh),
    policyCapped,
    realisticLow: round(realisticLow),
    realisticHigh: round(realisticHigh),
    netLow: netLow === null ? null : round(netLow),
    netHigh: netHigh === null ? null : round(netHigh),
    steps,
    warnings,
  };
}
