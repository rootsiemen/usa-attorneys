/**
 * Hand-computed assertion tests for lib/settlement.ts.
 * Run: ~/workspace/kanadojo-rename/node_modules/.bin/tsx scripts/test-settlement.ts
 * Every expected number below was computed by hand from the documented
 * formulas, not copied from the implementation's output.
 */
import {
  calculateSettlement,
  calculateLostWages,
  calculateWorkersComp,
  calculateWrongfulDeath,
  perDiemEstimate,
  annuityFactor,
} from "../lib/settlement";

let passed = 0;
let failed = 0;

function eq(name: string, actual: number, expected: number, tol = 0) {
  if (Math.abs(actual - expected) <= tol) {
    passed++;
    console.log(`  ok ${name} = ${actual}`);
  } else {
    failed++;
    console.log(`  FAIL ${name}: expected ${expected}, got ${actual}`);
  }
}

function isTrue(name: string, cond: boolean) {
  if (cond) {
    passed++;
    console.log(`  ok ${name}`);
  } else {
    failed++;
    console.log(`  FAIL ${name}`);
  }
}

/* ------------------------------------------------------------------ */
console.log("Case 1 — core settlement engine, severity 3, 20% fault");
/* economic = 10000 + 5000 + 8000 + 2000 + 3000 + 0 = 28000
   severity 3 → 2.5×–3.5× → non-economic 70000 – 98000
   gross 98000 – 126000; ×0.8 fault → 78400 – 100800 */
{
  const r = calculateSettlement({
    medicalBills: 10000,
    futureMedical: 5000,
    lostWages: 8000,
    futureLostEarnings: 2000,
    propertyDamage: 3000,
    otherEconomic: 0,
    severity: 3,
    faultPercent: 20,
  });
  eq("economic", r.economic, 28000);
  eq("nonEconomicLow", r.nonEconomicLow, 70000);
  eq("nonEconomicHigh", r.nonEconomicHigh, 98000);
  eq("grossLow", r.grossLow, 98000);
  eq("grossHigh", r.grossHigh, 126000);
  eq("afterFaultLow", r.afterFaultLow, 78400);
  eq("afterFaultHigh", r.afterFaultHigh, 100800);
  isTrue("no policy cap", r.policyCapped === false);
  isTrue("net is null without fee", r.netLow === null);
}

/* ------------------------------------------------------------------ */
console.log("Case 2 — policy limit caps realistic recovery");
/* same as case 1 with a $50,000 policy → both ends capped at 50000 */
{
  const r = calculateSettlement({
    medicalBills: 10000,
    futureMedical: 5000,
    lostWages: 8000,
    futureLostEarnings: 2000,
    propertyDamage: 3000,
    otherEconomic: 0,
    severity: 3,
    faultPercent: 20,
    policyLimit: 50000,
  });
  isTrue("policyCapped", r.policyCapped === true);
  eq("realisticLow", r.realisticLow, 50000);
  eq("realisticHigh", r.realisticHigh, 50000);
}

/* ------------------------------------------------------------------ */
console.log("Case 3 — med-mal style non-economic cap");
/* economic 500000, severity 5 → 4.5×–5× → raw non-economic 2,250,000–2,500,000
   cap 250000 → both ends 250000, gross 750000 */
{
  const r = calculateSettlement({
    medicalBills: 400000,
    futureMedical: 100000,
    lostWages: 0,
    futureLostEarnings: 0,
    propertyDamage: 0,
    otherEconomic: 0,
    severity: 5,
    faultPercent: 0,
    nonEconomicCap: 250000,
  });
  eq("economic", r.economic, 500000);
  eq("nonEconomicLow capped", r.nonEconomicLow, 250000);
  eq("nonEconomicHigh capped", r.nonEconomicHigh, 250000);
  isTrue("capApplied", r.capApplied === true);
  eq("grossLow", r.grossLow, 750000);
  eq("grossHigh", r.grossHigh, 750000);
}

/* ------------------------------------------------------------------ */
console.log("Case 4 — contingency fee + case costs net view");
/* case 1 numbers (78400–100800 after fault, no policy cap)
   fee 25% → 19600 / 25200; costs 2000 → net 56800 / 73600 */
{
  const r = calculateSettlement({
    medicalBills: 10000,
    futureMedical: 5000,
    lostWages: 8000,
    futureLostEarnings: 2000,
    propertyDamage: 3000,
    otherEconomic: 0,
    severity: 3,
    faultPercent: 20,
    contingencyFeePercent: 25,
    caseCosts: 2000,
  });
  eq("feeLow", r.feeLow!, 19600);
  eq("feeHigh", r.feeHigh!, 25200);
  eq("netLow", r.netLow!, 56800);
  eq("netHigh", r.netHigh!, 73600);
}

/* ------------------------------------------------------------------ */
console.log("Case 5 — slip & fall liability factor");
/* economic 20000, severity 2 → 1.5–2.5 → non-ec 30000–50000, gross 50000–70000
   fault 0, liability 0.75 → 37500 – 52500 */
{
  const r = calculateSettlement({
    medicalBills: 20000,
    futureMedical: 0,
    lostWages: 0,
    futureLostEarnings: 0,
    propertyDamage: 0,
    otherEconomic: 0,
    severity: 2,
    faultPercent: 0,
    liabilityFactor: 0.75,
  });
  eq("grossLow", r.grossLow, 50000);
  eq("afterFaultLow (liability-adj)", r.afterFaultLow, 37500);
  eq("afterFaultHigh (liability-adj)", r.afterFaultHigh, 52500);
}

/* ------------------------------------------------------------------ */
console.log("Case 6 — per diem");
/* $200/day × 90 days = 18000 */
eq("perDiem", perDiemEstimate(200, 90), 18000);

/* ------------------------------------------------------------------ */
console.log("Case 7 — lost wages (hourly)");
/* $25/hr × 40h = $1000/wk. 6 weeks missed → 6000.
   overtime 5h/wk × $25 × 1.5 × 6 = 1125.
   future: 50% capacity × $1000 × 4 wks = 2000.
   benefits 10% × (6000+1125+2000) = 912.50.
   other income 500, mitigation 1000.
   total = 6000+1125+2000+912.50+500−1000 = 9537.50 → rounds to 9538? No:
   engine rounds only the final total: 9537.5 → Math.round = 9538 (banker's? JS rounds .5 up) */
{
  const r = calculateLostWages({
    payType: "hourly",
    hourlyRate: 25,
    hoursPerWeek: 40,
    annualSalary: 0,
    weeksMissed: 6,
    overtimeHoursPerWeek: 5,
    benefitsPercent: 10,
    otherIncomeLost: 500,
    futureCapacityLossPercent: 50,
    futureWeeks: 4,
    mitigationIncome: 1000,
  });
  eq("weeklyWage", r.weeklyWage, 1000);
  eq("pastWages", r.pastWages, 6000);
  eq("overtime", r.overtime, 1125);
  eq("futureWages", r.futureWages, 2000);
  eq("benefits", r.benefits, 913, 1); // 912.50 rounds to 913 in the rounded field
  eq("total", r.total, 9538, 1); // 9537.50 → 9538
}

/* ------------------------------------------------------------------ */
console.log("Case 8 — lost wages (salary basis equals hourly basis)");
/* $52,000 salary ÷ 52 = $1000/wk; 2 weeks missed, nothing else → 2000 */
{
  const r = calculateLostWages({
    payType: "salary",
    hourlyRate: 0,
    hoursPerWeek: 40,
    annualSalary: 52000,
    weeksMissed: 2,
    overtimeHoursPerWeek: 0,
    benefitsPercent: 0,
    otherIncomeLost: 0,
    futureCapacityLossPercent: 0,
    futureWeeks: 0,
    mitigationIncome: 0,
  });
  eq("weeklyWage", r.weeklyWage, 1000);
  eq("total", r.total, 2000);
}

/* ------------------------------------------------------------------ */
console.log("Case 9 — workers' comp basic");
/* AWW 900 → rate 600. TTD 10 wks → 6000.
   PPD: 10% × 400-wk schedule = 40 wks × 600 = 24000.
   future medical 5000 → gross 35000. fee 20% → 7000, net 28000. */
{
  const r = calculateWorkersComp({
    averageWeeklyWage: 900,
    weeksOutOfWork: 10,
    impairmentRatingPercent: 10,
    scheduleWeeks: 400,
    futureMedical: 5000,
    otherCosts: 0,
    permanentTotal: false,
    ptdYears: 0,
    attorneyFeePercent: 20,
  });
  eq("compRate", r.compRate, 600);
  eq("ttd", r.ttd, 6000);
  eq("ppdWeeks", r.ppdWeeks, 40);
  eq("ppd", r.ppd, 24000);
  eq("gross", r.gross, 35000);
  eq("fee", r.fee, 7000);
  eq("net", r.net, 28000);
}

/* ------------------------------------------------------------------ */
console.log("Case 10 — workers' comp state max cap");
/* AWW 3000 → raw rate 2000, state max 1200 → rate 1200 */
{
  const r = calculateWorkersComp({
    averageWeeklyWage: 3000,
    stateMaxWeeklyBenefit: 1200,
    weeksOutOfWork: 4,
    impairmentRatingPercent: 0,
    scheduleWeeks: 400,
    futureMedical: 0,
    otherCosts: 0,
    permanentTotal: false,
    ptdYears: 0,
    attorneyFeePercent: 0,
  });
  eq("rawRate", r.rawRate, 2000);
  eq("compRate capped", r.compRate, 1200);
  isTrue("capApplied", r.capApplied === true);
  eq("ttd", r.ttd, 4800);
}

/* ------------------------------------------------------------------ */
console.log("Case 11 — annuity factor");
/* r=0 → factor = n. 10 yrs @2% → (1 − 1.02^-10)/0.02 = 8.982585 (hand calc) */
eq("annuity r=0", annuityFactor(10, 0), 10);
eq("annuity 10y @2%", annuityFactor(10, 2), 8.982585, 0.001);

/* ------------------------------------------------------------------ */
console.log("Case 12 — wrongful death, no discounting");
/* income 80000 × 70% = 56000 + benefits 10000 + services 12000 = 78000/yr.
   age 40 → retire 67 = 27 yrs. discount 0 → PV = 78000 × 27 = 2,106,000.
   + medical 20000 + funeral 12000 → economic 2,138,000.
   severity 4 → 3.5×–4.5× → non-ec 7,483,000 – 9,621,000.
   gross = 2,138,000 × 4.5 = 9,621,000 low; × 5.5 = 11,759,000 high. */
{
  const r = calculateWrongfulDeath({
    annualIncome: 80000,
    supportSharePercent: 70,
    annualBenefits: 10000,
    annualHouseholdServices: 12000,
    ageAtDeath: 40,
    retirementAge: 67,
    discountRatePercent: 0,
    preDeathMedical: 20000,
    funeralCosts: 12000,
    otherEconomic: 0,
    consciousPainAmount: 0,
    severity: 4,
    faultPercent: 0,
  });
  eq("yearsLost", r.yearsLost, 27);
  eq("annualSupport", r.annualSupport, 78000);
  eq("lostSupportPV", r.lostSupportPV, 2106000);
  eq("economic", r.economic, 2138000);
  eq("nonEconomicLow", r.nonEconomicLow, 7483000);
  eq("nonEconomicHigh", r.nonEconomicHigh, 9621000);
  eq("grossLow", r.grossLow, 9621000);
  eq("grossHigh", r.grossHigh, 11759000);
}

/* ------------------------------------------------------------------ */
console.log("Case 13 — wrongful death present value @2%, 10 years");
/* annual support 78000 (same inputs), years 10 → PV = 78000 × 8.982585 = 700,641.63 */
{
  const r = calculateWrongfulDeath({
    annualIncome: 80000,
    supportSharePercent: 70,
    annualBenefits: 10000,
    annualHouseholdServices: 12000,
    ageAtDeath: 57,
    retirementAge: 67,
    discountRatePercent: 2,
    preDeathMedical: 0,
    funeralCosts: 0,
    otherEconomic: 0,
    consciousPainAmount: 0,
    severity: 1,
    faultPercent: 0,
  });
  eq("yearsLost", r.yearsLost, 10);
  eq("lostSupportPV", r.lostSupportPV, 700642, 1);
}

/* ------------------------------------------------------------------ */
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
