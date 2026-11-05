"use client";

import { useState } from "react";
import {
  calculateWrongfulDeath,
  money,
  SEVERITY_BANDS,
  type WrongfulDeathResult,
} from "@/lib/settlement";
import { TOOL_DISCLAIMER } from "@/lib/tools";

function num(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const WD_SEVERITY_LABELS = [
  "Level 1 — limited survivor damages claimed",
  "Level 2 — close family, standard loss of companionship",
  "Level 3 — spouse or minor children, substantial loss of guidance and support",
  "Level 4 — spouse and young children, profound loss of companionship and care",
  "Level 5 — catastrophic family impact (e.g., death of a young parent or a child)",
];

export function WrongfulDeathCalculator() {
  const [income, setIncome] = useState("");
  const [share, setShare] = useState("70");
  const [benefits, setBenefits] = useState("");
  const [services, setServices] = useState("");
  const [age, setAge] = useState("");
  const [retirement, setRetirement] = useState("67");
  const [discount, setDiscount] = useState("2");
  const [medical, setMedical] = useState("");
  const [funeral, setFuneral] = useState("");
  const [other, setOther] = useState("");
  const [consciousPain, setConsciousPain] = useState("");
  const [severity, setSeverity] = useState(3);
  const [fault, setFault] = useState("0");
  const [cap, setCap] = useState("");
  const [policy, setPolicy] = useState("");
  const [fee, setFee] = useState("33.33");
  const [result, setResult] = useState<WrongfulDeathResult | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      calculateWrongfulDeath({
        annualIncome: num(income),
        supportSharePercent: num(share),
        annualBenefits: num(benefits),
        annualHouseholdServices: num(services),
        ageAtDeath: num(age),
        retirementAge: num(retirement) || 67,
        discountRatePercent: num(discount),
        preDeathMedical: num(medical),
        funeralCosts: num(funeral),
        otherEconomic: num(other),
        consciousPainAmount: num(consciousPain),
        severity,
        faultPercent: num(fault),
        nonEconomicCap: num(cap) > 0 ? num(cap) : undefined,
        policyLimit: num(policy) > 0 ? num(policy) : undefined,
        contingencyFeePercent: num(fee),
      })
    );
  }

  return (
    <>
      <form className="form-card" onSubmit={run}>
        <label htmlFor="wd-income">Your loved one&apos;s annual income ($)</label>
        <input
          id="wd-income"
          inputMode="decimal"
          placeholder="e.g. 80,000 — gross income at the time of death"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <label htmlFor="wd-share">Share of income that supported the household (%)</label>
        <input
          id="wd-share"
          inputMode="decimal"
          value={share}
          onChange={(e) => setShare(e.target.value)}
        />
        <p className="calc-field-help">
          Economists usually deduct the deceased&apos;s personal consumption;
          ~70% reaching the household is a common planning assumption. Lower
          it if they spent more on themselves, raise it for a sole earner with
          dependents.
        </p>
        <label htmlFor="wd-benefits">Lost benefits per year ($)</label>
        <input
          id="wd-benefits"
          inputMode="decimal"
          placeholder="e.g. 10,000 — employer health insurance, pension contributions"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
        />
        <label htmlFor="wd-services">Lost household services per year ($)</label>
        <input
          id="wd-services"
          inputMode="decimal"
          placeholder="e.g. 12,000 — childcare, home maintenance, transport the family must now buy"
          value={services}
          onChange={(e) => setServices(e.target.value)}
        />
        <label htmlFor="wd-age">Age at death</label>
        <input
          id="wd-age"
          inputMode="decimal"
          placeholder="e.g. 40"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="wd-retire">Expected retirement age</label>
        <input
          id="wd-retire"
          inputMode="decimal"
          value={retirement}
          onChange={(e) => setRetirement(e.target.value)}
        />
        <label htmlFor="wd-discount">Discount rate for future losses (%)</label>
        <input
          id="wd-discount"
          inputMode="decimal"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <p className="calc-field-help">
          Future support is reduced to today&apos;s dollars (present value).
          Economists typically use 1–3%. Enter 0 to see the undiscounted
          total.
        </p>
        <label htmlFor="wd-medical">Medical bills before death ($)</label>
        <input
          id="wd-medical"
          inputMode="decimal"
          placeholder="e.g. 20,000 — treatment between the incident and death"
          value={medical}
          onChange={(e) => setMedical(e.target.value)}
        />
        <label htmlFor="wd-funeral">Funeral and burial costs ($)</label>
        <input
          id="wd-funeral"
          inputMode="decimal"
          placeholder="e.g. 12,000"
          value={funeral}
          onChange={(e) => setFuneral(e.target.value)}
        />
        <label htmlFor="wd-other">Other economic losses ($)</label>
        <input
          id="wd-other"
          inputMode="decimal"
          placeholder="e.g. 0"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
        <label htmlFor="wd-conscious">
          Conscious pain &amp; suffering before death ($, optional)
        </label>
        <input
          id="wd-conscious"
          inputMode="decimal"
          placeholder="e.g. 0 — only if they survived for a time after the incident"
          value={consciousPain}
          onChange={(e) => setConsciousPain(e.target.value)}
        />
        <p className="calc-field-help">
          This belongs to the estate&apos;s survival claim, separate from the
          family&apos;s wrongful death claim. Leave at 0 if death was
          instantaneous or unknown.
        </p>
        <label htmlFor="wd-severity">Survivor damages level</label>
        <select
          id="wd-severity"
          value={severity}
          onChange={(e) => setSeverity(parseInt(e.target.value, 10))}
        >
          {SEVERITY_BANDS.map((b, i) => (
            <option key={b.level} value={b.level}>
              {WD_SEVERITY_LABELS[i]}
            </option>
          ))}
        </select>
        <label htmlFor="wd-fault">Your loved one&apos;s share of fault (%)</label>
        <input
          id="wd-fault"
          inputMode="decimal"
          value={fault}
          onChange={(e) => setFault(e.target.value)}
        />
        <label htmlFor="wd-cap">
          State cap on non-economic damages ($, optional)
        </label>
        <input
          id="wd-cap"
          inputMode="decimal"
          placeholder="Leave blank if your state has no cap"
          value={cap}
          onChange={(e) => setCap(e.target.value)}
        />
        <label htmlFor="wd-policy">
          Available insurance / defendant assets ($, optional)
        </label>
        <input
          id="wd-policy"
          inputMode="decimal"
          placeholder="e.g. 1,000,000 — most settlements cannot exceed collectible coverage"
          value={policy}
          onChange={(e) => setPolicy(e.target.value)}
        />
        <label htmlFor="wd-fee">Attorney contingency fee (%)</label>
        <input
          id="wd-fee"
          inputMode="decimal"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <button type="submit" className="btn btn-burgundy">
          Calculate Wrongful Death Claim Value
        </button>
      </form>

      {result && (
        <div className="calc-result" aria-live="polite">
          <p className="calc-range-label">Estimated claim value range</p>
          <p className="calc-range">
            {money(result.realisticLow)} – {money(result.realisticHigh)}
          </p>
          <p className="calc-sub">
            {result.policyCapped
              ? "Capped at the collectible insurance/assets you entered — the calculated claim value is higher."
              : "Full calculated claim value before negotiation."}{" "}
            {result.netLow !== null &&
              `Estimated net to the family/estate after the contingency fee: ${money(
                result.netLow
              )} – ${money(result.netHigh!)}.`}
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  Lost support, in today&apos;s dollars ({result.yearsLost}{" "}
                  years)
                </td>
                <td>{money(result.lostSupportPV)}</td>
              </tr>
              <tr>
                <td>Total economic damages</td>
                <td>{money(result.economic)}</td>
              </tr>
              <tr>
                <td>Survivor non-economic damages</td>
                <td>
                  {money(result.nonEconomicLow)} –{" "}
                  {money(result.nonEconomicHigh)}
                </td>
              </tr>
              <tr className="total">
                <td>Gross claim value</td>
                <td>
                  {money(result.grossLow)} – {money(result.grossHigh)}
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
