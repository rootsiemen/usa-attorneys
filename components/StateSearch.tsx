"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATES, PRACTICE_AREAS } from "@/lib/data";

export function StateSearch() {
  const router = useRouter();
  const [state, setState] = useState("california");
  const [practice, setPractice] = useState(PRACTICE_AREAS[0].slug);

  return (
    <div className="search-box">
      <div>
        <label htmlFor="state-select">State</label>
        <select
          id="state-select"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {STATES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="practice-select">Practice Area</label>
        <select
          id="practice-select"
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
        >
          {PRACTICE_AREAS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => router.push(`/attorneys/${state}#${practice}`)}
      >
        Find Attorneys
      </button>
    </div>
  );
}
