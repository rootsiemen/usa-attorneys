"use client";

import { useState } from "react";
import {
  calculateLostWages,
  money,
  type LostWagesResult,
} from "@/lib/settlement";
import { TOOL_DISCLAIMER } from "@/lib/tools";

function num(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function LostWagesCalculator() {
  const [payType, setPayType] = useState<"hourly" | "salary">("hourly");
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [annualSalary, setAnnualSalary] = useState("");
  const [weeksMissed, setWeeksMissed] = useState("");
  const [overtime, setOvertime] = useState("0");
  const [benefits, setBenefits] = useState("0");
  const [otherIncome, setOtherIncome] = useState("");
  const [capacityLoss, setCapacityLoss] = useState("0");
  const [futureWeeks, setFutureWeeks] = useState("0");
  const [mitigation, setMitigation] = useState("");
  const [result, setResult] = useState<LostWagesResult | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      calculateLostWages({
        payType,
        hourlyRate: num(hourlyRate),
        hoursPerWeek: num(hoursPerWeek) || 40,
        annualSalary: num(annualSalary),
        weeksMissed: num(weeksMissed),
        overtimeHoursPerWeek: num(overtime),
        benefitsPercent: num(benefits),
        otherIncomeLost: num(otherIncome),
        futureCapacityLossPercent: num(capacityLoss),
        futureWeeks: num(futureWeeks),
        mitigationIncome: num(mitigation),
      })
    );
  }

  return (
    <>
      <form className="form-card" onSubmit={run}>
        <label htmlFor="lw-paytype">How are you paid?</label>
        <select
          id="lw-paytype"
          value={payType}
          onChange={(e) => setPayType(e.target.value as "hourly" | "salary")}
        >
          <option value="hourly">Hourly</option>
          <option value="salary">Salary</option>
        </select>
        {payType === "hourly" ? (
          <>
            <label htmlFor="lw-rate">Hourly rate ($)</label>
            <input
              id="lw-rate"
              inputMode="decimal"
              placeholder="e.g. 25"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="lw-salary">Annual salary ($)</label>
            <input
              id="lw-salary"
              inputMode="decimal"
              placeholder="e.g. 62,000"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          </>
        )}
        <label htmlFor="lw-hours">Hours per week</label>
        <input
          id="lw-hours"
          inputMode="decimal"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
        />
        <label htmlFor="lw-weeks">Full weeks of work missed</label>
        <input
          id="lw-weeks"
          inputMode="decimal"
          placeholder="e.g. 6 — use fractions for partial weeks (2.5)"
          value={weeksMissed}
          onChange={(e) => setWeeksMissed(e.target.value)}
        />
        <label htmlFor="lw-ot">Overtime hours per week you usually worked</label>
        <input
          id="lw-ot"
          inputMode="decimal"
          value={overtime}
          onChange={(e) => setOvertime(e.target.value)}
        />
        <p className="calc-field-help">
          Overtime is valued at 1.5× your hourly rate. For salaried staff, the
          hourly basis is your weekly salary divided by your hours.
        </p>
        <label htmlFor="lw-benefits">
          Value of lost benefits (% of wages)
        </label>
        <input
          id="lw-benefits"
          inputMode="decimal"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
        />
        <p className="calc-field-help">
          Employer retirement contributions, health-insurance value, and used
          PTO commonly add 10–30%. Enter 0 if your benefits continued.
        </p>
        <label htmlFor="lw-other">
          Lost bonus, commissions, or tips ($)
        </label>
        <input
          id="lw-other"
          inputMode="decimal"
          placeholder="e.g. 1,200"
          value={otherIncome}
          onChange={(e) => setOtherIncome(e.target.value)}
        />
        <label htmlFor="lw-capacity">
          Future earning-capacity loss (%)
        </label>
        <input
          id="lw-capacity"
          inputMode="decimal"
          value={capacityLoss}
          onChange={(e) => setCapacityLoss(e.target.value)}
        />
        <label htmlFor="lw-future-weeks">
          Over how many future weeks?
        </label>
        <input
          id="lw-future-weeks"
          inputMode="decimal"
          value={futureWeeks}
          onChange={(e) => setFutureWeeks(e.target.value)}
        />
        <p className="calc-field-help">
          Example: you can only work half your hours for the next 6 months →
          50% over 26 weeks. Permanent reductions are usually valued by a
          vocational expert instead.
        </p>
        <label htmlFor="lw-mitigation">
          Replacement income earned ($)
        </label>
        <input
          id="lw-mitigation"
          inputMode="decimal"
          placeholder="e.g. 800 — lighter-duty or temporary work you did instead"
          value={mitigation}
          onChange={(e) => setMitigation(e.target.value)}
        />
        <button type="submit" className="btn btn-burgundy">
          Calculate Lost Wages
        </button>
      </form>

      {result && (
        <div className="calc-result" aria-live="polite">
          <p className="calc-range-label">Estimated lost income</p>
          <p className="calc-range">{money(result.total)}</p>
          <p className="calc-sub">
            This is the lost-wages component of a claim — one line item in a
            full settlement, documented with pay stubs and employer records.
          </p>
          <table>
            <tbody>
              <tr>
                <td>Weekly wage</td>
                <td>{money(result.weeklyWage)}</td>
              </tr>
              <tr>
                <td>Past lost wages</td>
                <td>{money(result.pastWages)}</td>
              </tr>
              {result.overtime > 0 && (
                <tr>
                  <td>Lost overtime (at 1.5×)</td>
                  <td>{money(result.overtime)}</td>
                </tr>
              )}
              {result.futureWages > 0 && (
                <tr>
                  <td>Future lost earnings</td>
                  <td>{money(result.futureWages)}</td>
                </tr>
              )}
              {result.benefits > 0 && (
                <tr>
                  <td>Lost benefits</td>
                  <td>{money(result.benefits)}</td>
                </tr>
              )}
              {result.otherIncome > 0 && (
                <tr>
                  <td>Lost bonus / commissions / tips</td>
                  <td>{money(result.otherIncome)}</td>
                </tr>
              )}
              {result.mitigation > 0 && (
                <tr>
                  <td>Replacement income (mitigation)</td>
                  <td>−{money(result.mitigation)}</td>
                </tr>
              )}
              <tr className="total">
                <td>Total lost income</td>
                <td>{money(result.total)}</td>
              </tr>
            </tbody>
          </table>
          <h3
            style={{
              fontFamily: "var(--serif)",
              color: "var(--navy-dark)",
              margin: "20px 0 6px",
              fontSize: 19,
            }}
          >
            How this estimate was calculated
          </h3>
          <ol className="calc-steps">
            {result.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p className="tool-disclaimer">{TOOL_DISCLAIMER}</p>
        </div>
      )}
    </>
  );
}
