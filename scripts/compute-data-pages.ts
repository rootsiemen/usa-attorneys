/**
 * Computes the example-scenario table published on /data/settlement-ranges.
 * Run: ~/workspace/kanadojo-rename/node_modules/.bin/tsx scripts/compute-data-pages.ts
 * Every number on that page comes from this script's output — nothing is
 * hand-typed into the page.
 */
import {
  calculateSettlement,
  calculateLostWages,
  calculateWorkersComp,
  calculateWrongfulDeath,
  perDiemEstimate,
} from "../lib/settlement";

const out: Record<string, unknown> = {};

/* Car accident scenarios (medical + lost wages + property damage) */
out.carMinor = calculateSettlement({
  medicalBills: 10000, futureMedical: 0, lostWages: 2000, futureLostEarnings: 0,
  propertyDamage: 3000, otherEconomic: 0, severity: 2, faultPercent: 0,
});
out.carModerate = calculateSettlement({
  medicalBills: 25000, futureMedical: 0, lostWages: 5000, futureLostEarnings: 0,
  propertyDamage: 5000, otherEconomic: 0, severity: 3, faultPercent: 0,
});
out.carSerious = calculateSettlement({
  medicalBills: 50000, futureMedical: 15000, lostWages: 10000, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 4, faultPercent: 0,
});
out.carModerateFault20 = calculateSettlement({
  medicalBills: 25000, futureMedical: 0, lostWages: 5000, futureLostEarnings: 0,
  propertyDamage: 5000, otherEconomic: 0, severity: 3, faultPercent: 20,
});
out.carSeriousPolicy50k = calculateSettlement({
  medicalBills: 50000, futureMedical: 15000, lostWages: 10000, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 4, faultPercent: 0, policyLimit: 50000,
});

/* Personal injury — medical bills only, one per severity band 2/3/4 */
out.pi25kSev2 = calculateSettlement({
  medicalBills: 25000, futureMedical: 0, lostWages: 0, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 2, faultPercent: 0,
});
out.pi25kSev3 = calculateSettlement({
  medicalBills: 25000, futureMedical: 0, lostWages: 0, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 3, faultPercent: 0,
});
out.pi25kSev4 = calculateSettlement({
  medicalBills: 25000, futureMedical: 0, lostWages: 0, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 4, faultPercent: 0,
});

/* Slip & fall — disputed liability (liability factor 0.75) */
out.slipFall = calculateSettlement({
  medicalBills: 15000, futureMedical: 0, lostWages: 3000, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 2, faultPercent: 0, liabilityFactor: 0.75,
});

/* Medical malpractice — $250,000 statutory cap on non-economic damages */
out.medMal = calculateSettlement({
  medicalBills: 75000, futureMedical: 25000, lostWages: 20000, futureLostEarnings: 0,
  propertyDamage: 0, otherEconomic: 0, severity: 4, faultPercent: 0, nonEconomicCap: 250000,
});

/* Workers' comp — two wage levels */
out.wcA = calculateWorkersComp({
  averageWeeklyWage: 1000, weeksOutOfWork: 12, impairmentRatingPercent: 10,
  scheduleWeeks: 400, futureMedical: 5000, otherCosts: 0, permanentTotal: false,
  ptdYears: 0, attorneyFeePercent: 20,
});
out.wcB = calculateWorkersComp({
  averageWeeklyWage: 1500, weeksOutOfWork: 26, impairmentRatingPercent: 25,
  scheduleWeeks: 400, futureMedical: 10000, otherCosts: 0, permanentTotal: false,
  ptdYears: 0, attorneyFeePercent: 20,
});

/* Wrongful death — $75k earner, age 45, retires 67 */
out.wd = calculateWrongfulDeath({
  annualIncome: 75000, supportSharePercent: 70, annualBenefits: 8000,
  annualHouseholdServices: 6000, ageAtDeath: 45, retirementAge: 67,
  discountRatePercent: 3, preDeathMedical: 20000, funeralCosts: 12000,
  otherEconomic: 0, consciousPainAmount: 0, severity: 3, faultPercent: 0,
});

/* Lost wages — $30/hr worker, 8 weeks out */
out.lw = calculateLostWages({
  payType: "hourly", hourlyRate: 30, hoursPerWeek: 40, annualSalary: 0,
  weeksMissed: 8, overtimeHoursPerWeek: 5, benefitsPercent: 20,
  otherIncomeLost: 0, futureCapacityLossPercent: 0, futureWeeks: 0,
  mitigationIncome: 0,
});

/* Per-diem cross-check */
out.perDiem = perDiemEstimate(150, 180);

console.log(JSON.stringify(out, null, 1));
