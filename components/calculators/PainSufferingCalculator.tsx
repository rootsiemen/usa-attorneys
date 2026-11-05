"use client";

import { useState } from "react";
import { money, perDiemEstimate, severityBand, SEVERITY_BANDS } from "@/lib/settlement";
import { TOOL_DISCLAIMER } from "@/lib/tools";

function num(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

interface PsResult {
  multLow: number;
  multHigh: number;
  perDiem: number;
  combinedLow: number;
  combinedHigh: number;
  fault: number;
  steps: string[];
}

export function PainSufferingCalculator() {
  const [economic, setEconomic] = useState("");
  const [severity, setSeverity] = useState(2);
  const [dailyRate, setDailyRate] = useState("150");
  const [days, setDays] = useState("");
  const [faultPercent, setFaultPercent] = useState("0");
  const [result, setResult] = useState<PsResult | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    const econ = num(economic);
    const band = severityBand(severity);
    const fault = Math.min(100, Math.max(0, num(faultPercent)));
    const keep = 1 - fault / 100;
    const multLow = econ * band.low * keep;
    const multHigh = econ * band.high * keep;
    const pd = perDiemEstimate(num(dailyRate), num(days)) * keep;
    const steps = [
      `Multiplier method: ${money(econ)} in economic damages × the ${band.low}×–${band.high}× band for severity level ${band.level} = ${money(
        econ * band.low
      )} – ${money(econ * band.high)} before fault. Insurers and attorneys use this for most negotiated settlements.`,
      `Per-diem method: ${money(num(dailyRate))} per day × ${num(
        days
      )} days of pain and recovery = ${money(
        perDiemEstimate(num(dailyRate), num(days))
      )} before fault. This method argues each day of suffering has a daily price; it is often used at trial and suits shorter, well-defined recoveries.`,
      ...(fault > 0
        ? [
            `Comparative fault: both methods reduced by your ${fault}% share of fault.`,
          ]
        : []),
      `Combined range: the lower of the two methods' low ends to the higher of the high ends — real outcomes usually land inside the overlap of the two methods.`,
    ];
    setResult({
      multLow: Math.round(multLow),
      multHigh: Math.round(multHigh),
      perDiem: Math.round(pd),
      combinedLow: Math.round(Math.min(multLow, pd)),
      combinedHigh: Math.round(Math.max(multHigh, pd)),
      fault,
      steps,
    });
  }

  return (
    <>
      <form className="form-card" onSubmit={run}>
        <label htmlFor="ps-economic">
          Total economic damages ($)
        </label>
        <input
          id="ps-economic"
          inputMode="decimal"
          placeholder="Medical bills + lost wages + other documented losses"
          value={economic}
          onChange={(e) => setEconomic(e.target.value)}
        />
        <label htmlFor="ps-severity">Injury severity</label>
        <select
          id="ps-severity"
          value={severity}
          onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
        >
          {SEVERITY_BANDS.map((b) => (
            <option key={b.level} value={b.level}>
              Level {b.level} — {b.label}
            </option>
          ))}
        </select>
        <label htmlFor="ps-rate">Per-diem daily rate ($)</label>
        <input
          id="ps-rate"
          inputMode="decimal"
          value={dailyRate}
          onChange={(e) => setDailyRate(e.target.value)}
        />
        <p className="calc-field-help">
          Commonly argued at $100–$500 per day depending on how much the injury
          disrupts daily life. Anchor idea: a day of significant pain is often
          valued at or above a day&apos;s pay.
        </p>
        <label htmlFor="ps-days">Days of pain / recovery</label>
        <input
          id="ps-days"
          inputMode="decimal"
          placeholder="e.g. 120 — from injury until you were substantially recovered"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <label htmlFor="ps-fault">Your share of fault (%)</label>
        <input
          id="ps-fault"
          inputMode="decimal"
          value={faultPercent}
          onChange={(e) => setFaultPercent(e.target.value)}
        />
        <button type="submit" className="btn btn-burgundy">
          Calculate Pain &amp; Suffering
        </button>
      </form>

      {result && (
        <div className="calc-result" aria-live="polite">
          <p className="calc-range-label">Estimated pain &amp; suffering range</p>
          <p className="calc-range">
            {money(result.combinedLow)} – {money(result.combinedHigh)}
          </p>
          <p className="calc-sub">
            Non-economic damages only — add your economic damages (bills and
            lost wages) for a total claim value.
          </p>
          <table>
            <tbody>
              <tr>
                <td>Multiplier method</td>
                <td>
                  {money(result.multLow)} – {money(result.multHigh)}
                </td>
              </tr>
              <tr>
                <td>Per-diem method</td>
                <td>{money(result.perDiem)}</td>
              </tr>
              <tr className="total">
                <td>Combined range</td>
                <td>
                  {money(result.combinedLow)} – {money(result.combinedHigh)}
                </td>
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
          {result.fault >= 50 && (
            <p className="calc-warning">
              At 50% or more fault, most states sharply limit or bar recovery
              entirely — and in Alabama, Maryland, North Carolina, Virginia,
              and DC any fault can bar it. Get a lawyer&apos;s review before
              relying on any number here.
            </p>
          )}
          <p className="tool-disclaimer">{TOOL_DISCLAIMER}</p>
        </div>
      )}
    </>
  );
}
