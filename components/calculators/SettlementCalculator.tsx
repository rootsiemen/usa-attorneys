"use client";

import { useMemo, useState } from "react";
import {
  calculateSettlement,
  money,
  SEVERITY_BANDS,
  type SettlementInputs,
} from "@/lib/settlement";
import { TOOL_DISCLAIMER } from "@/lib/tools";

export interface SettlementCalcConfig {
  showProperty?: boolean;
  showLiability?: boolean;
  showCap?: boolean;
  showCaseCosts?: boolean;
  defaultSeverity?: number;
  buttonLabel: string;
}

const LIABILITY_OPTIONS = [
  {
    value: 1,
    label: "Clear — the owner knew (or should have known) and did nothing",
  },
  { value: 0.75, label: "Likely — hazard was there long enough to be found" },
  { value: 0.5, label: "Disputed — both sides share some responsibility" },
  {
    value: 0.25,
    label: "Weak — hazard was open/obvious or appeared moments before",
  },
];

function num(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function SettlementCalculator({ config }: { config: SettlementCalcConfig }) {
  const [medicalBills, setMedicalBills] = useState("");
  const [futureMedical, setFutureMedical] = useState("");
  const [lostWages, setLostWages] = useState("");
  const [futureLostEarnings, setFutureLostEarnings] = useState("");
  const [propertyDamage, setPropertyDamage] = useState("");
  const [otherEconomic, setOtherEconomic] = useState("");
  const [severity, setSeverity] = useState(config.defaultSeverity ?? 2);
  const [faultPercent, setFaultPercent] = useState("0");
  const [liability, setLiability] = useState(1);
  const [policyLimit, setPolicyLimit] = useState("");
  const [cap, setCap] = useState("");
  const [feePercent, setFeePercent] = useState("33.33");
  const [caseCosts, setCaseCosts] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof calculateSettlement
  > | null>(null);

  const inputs: SettlementInputs = useMemo(
    () => ({
      medicalBills: num(medicalBills),
      futureMedical: num(futureMedical),
      lostWages: num(lostWages),
      futureLostEarnings: num(futureLostEarnings),
      propertyDamage: config.showProperty ? num(propertyDamage) : 0,
      otherEconomic: num(otherEconomic),
      severity,
      faultPercent: num(faultPercent),
      liabilityFactor: config.showLiability ? liability : undefined,
      policyLimit: num(policyLimit) > 0 ? num(policyLimit) : undefined,
      nonEconomicCap:
        config.showCap && num(cap) > 0 ? num(cap) : undefined,
      contingencyFeePercent: num(feePercent),
      caseCosts: config.showCaseCosts ? num(caseCosts) : 0,
    }),
    [
      medicalBills,
      futureMedical,
      lostWages,
      futureLostEarnings,
      propertyDamage,
      otherEconomic,
      severity,
      faultPercent,
      liability,
      policyLimit,
      cap,
      feePercent,
      caseCosts,
      config.showProperty,
      config.showLiability,
      config.showCap,
      config.showCaseCosts,
    ]
  );

  return (
    <>
      <form
        className="form-card"
        onSubmit={(e) => {
          e.preventDefault();
          setResult(calculateSettlement(inputs));
        }}
      >
        <label htmlFor="sc-medical">Medical bills so far ($)</label>
        <input
          id="sc-medical"
          inputMode="decimal"
          placeholder="e.g. 12,500"
          value={medicalBills}
          onChange={(e) => setMedicalBills(e.target.value)}
        />
        <label htmlFor="sc-future-medical">Future medical care ($)</label>
        <input
          id="sc-future-medical"
          inputMode="decimal"
          placeholder="e.g. 5,000 — expected treatment, surgery, therapy"
          value={futureMedical}
          onChange={(e) => setFutureMedical(e.target.value)}
        />
        <label htmlFor="sc-lost-wages">Lost wages so far ($)</label>
        <input
          id="sc-lost-wages"
          inputMode="decimal"
          placeholder="e.g. 4,800 — pay you missed while recovering"
          value={lostWages}
          onChange={(e) => setLostWages(e.target.value)}
        />
        <label htmlFor="sc-future-lost">Future lost earnings ($)</label>
        <input
          id="sc-future-lost"
          inputMode="decimal"
          placeholder="e.g. 0 — reduced ability to earn going forward"
          value={futureLostEarnings}
          onChange={(e) => setFutureLostEarnings(e.target.value)}
        />
        {config.showProperty && (
          <>
            <label htmlFor="sc-property">Property damage ($)</label>
            <input
              id="sc-property"
              inputMode="decimal"
              placeholder="e.g. 6,200 — vehicle repair or total-loss value"
              value={propertyDamage}
              onChange={(e) => setPropertyDamage(e.target.value)}
            />
          </>
        )}
        <label htmlFor="sc-other">Other out-of-pocket losses ($)</label>
        <input
          id="sc-other"
          inputMode="decimal"
          placeholder="e.g. 600 — rentals, medication, travel to treatment"
          value={otherEconomic}
          onChange={(e) => setOtherEconomic(e.target.value)}
        />
        <label htmlFor="sc-severity">Injury severity</label>
        <select
          id="sc-severity"
          value={severity}
          onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
        >
          {SEVERITY_BANDS.map((b) => (
            <option key={b.level} value={b.level}>
              Level {b.level} — {b.label}
            </option>
          ))}
        </select>
        {config.showLiability && (
          <>
            <label htmlFor="sc-liability">
              How clear is the property owner&apos;s responsibility?
            </label>
            <select
              id="sc-liability"
              value={liability}
              onChange={(e) => setLiability(parseFloat(e.target.value))}
            >
              {LIABILITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <p className="calc-field-help">
              Slip and fall cases turn on notice: what the owner knew about the
              hazard and how long it was there. Weak liability discounts the
              whole claim, whatever the bills say.
            </p>
          </>
        )}
        <label htmlFor="sc-fault">Your share of fault (%)</label>
        <input
          id="sc-fault"
          inputMode="decimal"
          placeholder="0 if the other party was fully at fault"
          value={faultPercent}
          onChange={(e) => setFaultPercent(e.target.value)}
        />
        <label htmlFor="sc-policy">
          At-fault party&apos;s insurance policy limit ($, optional)
        </label>
        <input
          id="sc-policy"
          inputMode="decimal"
          placeholder="e.g. 100,000 — leave blank if unknown"
          value={policyLimit}
          onChange={(e) => setPolicyLimit(e.target.value)}
        />
        {config.showCap && (
          <>
            <label htmlFor="sc-cap">
              Your state&apos;s cap on non-economic damages ($, optional)
            </label>
            <input
              id="sc-cap"
              inputMode="decimal"
              placeholder="e.g. 250,000 or 500,000 — many states cap med-mal pain & suffering"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
            />
            <p className="calc-field-help">
              Many states cap pain-and-suffering awards in medical malpractice
              cases (commonly $250,000–$500,000, sometimes with exceptions for
              catastrophic injury or death). If your state has no cap, leave
              this blank.
            </p>
          </>
        )}
        <label htmlFor="sc-fee">Attorney contingency fee (%)</label>
        <input
          id="sc-fee"
          inputMode="decimal"
          value={feePercent}
          onChange={(e) => setFeePercent(e.target.value)}
        />
        <p className="calc-field-help">
          Typically 33⅓% before a lawsuit is filed, around 40% after filing.
          Used only for the net-to-you view.
        </p>
        {config.showCaseCosts && (
          <>
            <label htmlFor="sc-costs">Case costs ($, optional)</label>
            <input
              id="sc-costs"
              inputMode="decimal"
              placeholder="e.g. 25,000 — expert witnesses, records, filing fees"
              value={caseCosts}
              onChange={(e) => setCaseCosts(e.target.value)}
            />
            <p className="calc-field-help">
              Medical malpractice cases are expert-heavy; costs of $20,000–
              $100,000+ are common and usually come out of the recovery.
            </p>
          </>
        )}
        <button type="submit" className="btn btn-burgundy">
          {config.buttonLabel}
        </button>
      </form>

      {result && (
        <div className="calc-result" aria-live="polite">
          <p className="calc-range-label">Estimated settlement range</p>
          <p className="calc-range">
            {money(result.realisticLow)} – {money(result.realisticHigh)}
          </p>
          <p className="calc-sub">
            {result.policyCapped
              ? "Capped by the policy limit you entered — the claim's calculated value is higher."
              : "Before attorney fees" +
                (result.netLow !== null
                  ? `; estimated net to you ${money(result.netLow)} – ${money(
                      result.netHigh!
                    )}.`
                  : ".")}
          </p>
          <table>
            <tbody>
              {result.breakdown.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{money(r.amount)}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <strong>Total economic damages</strong>
                </td>
                <td>{money(result.economic)}</td>
              </tr>
              <tr>
                <td>
                  Pain &amp; suffering ({result.multiplierLow}×–
                  {result.multiplierHigh}× multiplier)
                </td>
                <td>
                  {money(result.nonEconomicLow)} –{" "}
                  {money(result.nonEconomicHigh)}
                </td>
              </tr>
              <tr>
                <td>Gross claim value</td>
                <td>
                  {money(result.grossLow)} – {money(result.grossHigh)}
                </td>
              </tr>
              {(result.afterFaultLow !== result.grossLow ||
                result.afterFaultHigh !== result.grossHigh) && (
                <tr>
                  <td>After fault / liability adjustment</td>
                  <td>
                    {money(result.afterFaultLow)} –{" "}
                    {money(result.afterFaultHigh)}
                  </td>
                </tr>
              )}
              {result.feeLow !== null && (
                <tr>
                  <td>Attorney fee</td>
                  <td>
                    −{money(result.feeLow)} – {money(result.feeHigh!)}
                  </td>
                </tr>
              )}
              {result.netLow !== null && (
                <tr className="total">
                  <td>Estimated net to you</td>
                  <td>
                    {money(result.netLow)} – {money(result.netHigh!)}
                  </td>
                </tr>
              )}
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
          {result.warnings.map((w, i) => (
            <p key={i} className="calc-warning">
              {w}
            </p>
          ))}
          <p className="tool-disclaimer">{TOOL_DISCLAIMER}</p>
        </div>
      )}
    </>
  );
}
