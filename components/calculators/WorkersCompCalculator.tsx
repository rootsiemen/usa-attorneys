"use client";

import { useState } from "react";
import {
  calculateWorkersComp,
  money,
  type WorkersCompResult,
} from "@/lib/settlement";
import { TOOL_DISCLAIMER } from "@/lib/tools";

function num(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function WorkersCompCalculator() {
  const [aww, setAww] = useState("");
  const [stateMax, setStateMax] = useState("");
  const [stateMin, setStateMin] = useState("");
  const [weeksOut, setWeeksOut] = useState("");
  const [rating, setRating] = useState("");
  const [schedule, setSchedule] = useState("400");
  const [futureMedical, setFutureMedical] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const [ptd, setPtd] = useState(false);
  const [ptdYears, setPtdYears] = useState("10");
  const [fee, setFee] = useState("20");
  const [result, setResult] = useState<WorkersCompResult | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setResult(
      calculateWorkersComp({
        averageWeeklyWage: num(aww),
        stateMaxWeeklyBenefit: num(stateMax) > 0 ? num(stateMax) : undefined,
        stateMinWeeklyBenefit: num(stateMin) > 0 ? num(stateMin) : undefined,
        weeksOutOfWork: num(weeksOut),
        impairmentRatingPercent: num(rating),
        scheduleWeeks: num(schedule) || 400,
        futureMedical: num(futureMedical),
        otherCosts: num(otherCosts),
        permanentTotal: ptd,
        ptdYears: num(ptdYears),
        attorneyFeePercent: num(fee),
      })
    );
  }

  return (
    <>
      <form className="form-card" onSubmit={run}>
        <label htmlFor="wc-aww">Average weekly wage before the injury ($)</label>
        <input
          id="wc-aww"
          inputMode="decimal"
          placeholder="e.g. 900 — gross pay, usually averaged over the 52 weeks before injury"
          value={aww}
          onChange={(e) => setAww(e.target.value)}
        />
        <label htmlFor="wc-max">Your state&apos;s maximum weekly benefit ($, optional)</label>
        <input
          id="wc-max"
          inputMode="decimal"
          placeholder="Leave blank if you don't know it"
          value={stateMax}
          onChange={(e) => setStateMax(e.target.value)}
        />
        <label htmlFor="wc-min">Your state&apos;s minimum weekly benefit ($, optional)</label>
        <input
          id="wc-min"
          inputMode="decimal"
          placeholder="Leave blank if you don't know it"
          value={stateMin}
          onChange={(e) => setStateMin(e.target.value)}
        />
        <p className="calc-field-help">
          Every state caps the weekly benefit (and most set a floor). The cap
          is the single biggest reason two identical injuries settle for
          different amounts in different states.
        </p>
        <label htmlFor="wc-weeks">Weeks totally out of work</label>
        <input
          id="wc-weeks"
          inputMode="decimal"
          placeholder="e.g. 10"
          value={weeksOut}
          onChange={(e) => setWeeksOut(e.target.value)}
        />
        <label htmlFor="wc-rating">Impairment rating (%)</label>
        <input
          id="wc-rating"
          inputMode="decimal"
          placeholder="e.g. 10 — assigned by your doctor at maximum medical improvement"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <label htmlFor="wc-schedule">State body schedule (total weeks)</label>
        <select
          id="wc-schedule"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        >
          <option value="300">300 weeks</option>
          <option value="400">400 weeks (common)</option>
          <option value="500">500 weeks</option>
          <option value="600">600 weeks</option>
        </select>
        <p className="calc-field-help">
          Permanent partial weeks = impairment rating × schedule weeks. States
          set their own schedules (and some price specific body parts
          separately) — if your state differs, pick the closest.
        </p>
        <label htmlFor="wc-medical">Future medical costs ($)</label>
        <input
          id="wc-medical"
          inputMode="decimal"
          placeholder="e.g. 5,000 — care the settlement must fund after closing"
          value={futureMedical}
          onChange={(e) => setFutureMedical(e.target.value)}
        />
        <label htmlFor="wc-other">Other costs ($)</label>
        <input
          id="wc-other"
          inputMode="decimal"
          placeholder="e.g. 0 — mileage, vocational help, late-payment penalties"
          value={otherCosts}
          onChange={(e) => setOtherCosts(e.target.value)}
        />
        <label htmlFor="wc-ptd" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <input
            id="wc-ptd"
            type="checkbox"
            checked={ptd}
            onChange={(e) => setPtd(e.target.checked)}
            style={{ width: "auto", marginTop: 3 }}
          />
          <span>
            Permanent &amp; total disability (cannot return to any work)
          </span>
        </label>
        {ptd && (
          <>
            <label htmlFor="wc-ptd-years">Years of benefits to model</label>
            <input
              id="wc-ptd-years"
              inputMode="decimal"
              value={ptdYears}
              onChange={(e) => setPtdYears(e.target.value)}
            />
            <p className="calc-field-help">
              Many states pay PTD for life or until retirement age. This is a
              planning figure, not a statutory schedule.
            </p>
          </>
        )}
        <label htmlFor="wc-fee">Attorney fee (%)</label>
        <input
          id="wc-fee"
          inputMode="decimal"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <p className="calc-field-help">
          Workers&apos; comp fees are usually approved by a judge or board and
          commonly run 15–25% of the settlement — not the 33–40% of injury
          lawsuits.
        </p>
        <button type="submit" className="btn btn-burgundy">
          Calculate Workers&apos; Comp Settlement
        </button>
      </form>

      {result && (
        <div className="calc-result" aria-live="polite">
          <p className="calc-range-label">Estimated settlement value</p>
          <p className="calc-range">{money(result.gross)}</p>
          <p className="calc-sub">
            Estimated net after the attorney fee: {money(result.net)}.
            Workers&apos; comp pays wage replacement and medical — never pain
            and suffering.
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  Weekly benefit rate (⅔ of wages
                  {result.capApplied ? ", state cap applied" : ""}
                  {result.floorApplied ? ", state minimum applied" : ""})
                </td>
                <td>{money(result.compRate)}/wk</td>
              </tr>
              <tr>
                <td>Temporary total disability (time out of work)</td>
                <td>{money(result.ttd)}</td>
              </tr>
              <tr>
                <td>
                  {ptdWeeksLabel(result)} ({result.ppdWeeks} weeks)
                </td>
                <td>{money(result.ppd)}</td>
              </tr>
              {result.futureMedical > 0 && (
                <tr>
                  <td>Future medical</td>
                  <td>{money(result.futureMedical)}</td>
                </tr>
              )}
              {result.otherCosts > 0 && (
                <tr>
                  <td>Other costs</td>
                  <td>{money(result.otherCosts)}</td>
                </tr>
              )}
              <tr>
                <td>Attorney fee</td>
                <td>−{money(result.fee)}</td>
              </tr>
              <tr className="total">
                <td>Estimated net to you</td>
                <td>{money(result.net)}</td>
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

function ptdWeeksLabel(r: WorkersCompResult): string {
  return r.ppd > 0 && r.ttd >= 0 && r.ppdWeeks >= 52
    ? "Permanent disability benefits"
    : "Permanent partial disability";
}
