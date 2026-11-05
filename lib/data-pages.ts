/**
 * Static data behind the /data research pages.
 *
 * Attorney counts were computed on 2026-11-06 from the live directory
 * snapshot (833 records, backups/usa-attorneys/attorneys-full-backup-2026-11-05.json).
 * Populations are 2020 US Census resident populations. Settlement figures on
 * /data/settlement-ranges come from scripts/compute-data-pages.ts, which runs
 * the site's own lib/settlement.ts engine — no hand-typed numbers.
 */

export interface StateDensity {
  name: string;
  slug: string;
  attorneys: number;
  population2020: number;
}

export const TOTAL_ATTORNEYS = 833;
export const DATASET_DATE = "November 2026";

export const STATE_DENSITY: StateDensity[] = [
  { name: "Alabama", slug: "alabama", attorneys: 15, population2020: 5024279 },
  { name: "Alaska", slug: "alaska", attorneys: 15, population2020: 733391 },
  { name: "Arizona", slug: "arizona", attorneys: 15, population2020: 7151502 },
  { name: "Arkansas", slug: "arkansas", attorneys: 15, population2020: 3011524 },
  { name: "California", slug: "california", attorneys: 22, population2020: 39538223 },
  { name: "Colorado", slug: "colorado", attorneys: 15, population2020: 5773714 },
  { name: "Connecticut", slug: "connecticut", attorneys: 15, population2020: 3605944 },
  { name: "Delaware", slug: "delaware", attorneys: 15, population2020: 989948 },
  { name: "Florida", slug: "florida", attorneys: 15, population2020: 21538187 },
  { name: "Georgia", slug: "georgia", attorneys: 15, population2020: 10711908 },
  { name: "Hawaii", slug: "hawaii", attorneys: 15, population2020: 1455271 },
  { name: "Idaho", slug: "idaho", attorneys: 15, population2020: 1839106 },
  { name: "Illinois", slug: "illinois", attorneys: 15, population2020: 12812508 },
  { name: "Indiana", slug: "indiana", attorneys: 15, population2020: 6785528 },
  { name: "Iowa", slug: "iowa", attorneys: 15, population2020: 3190369 },
  { name: "Kansas", slug: "kansas", attorneys: 15, population2020: 2937880 },
  { name: "Kentucky", slug: "kentucky", attorneys: 15, population2020: 4505836 },
  { name: "Louisiana", slug: "louisiana", attorneys: 18, population2020: 4657022 },
  { name: "Maine", slug: "maine", attorneys: 15, population2020: 1362359 },
  { name: "Maryland", slug: "maryland", attorneys: 15, population2020: 6177224 },
  { name: "Massachusetts", slug: "massachusetts", attorneys: 15, population2020: 7029917 },
  { name: "Michigan", slug: "michigan", attorneys: 15, population2020: 10077331 },
  { name: "Minnesota", slug: "minnesota", attorneys: 15, population2020: 5706494 },
  { name: "Mississippi", slug: "mississippi", attorneys: 15, population2020: 2961536 },
  { name: "Missouri", slug: "missouri", attorneys: 15, population2020: 6154913 },
  { name: "Montana", slug: "montana", attorneys: 15, population2020: 1084225 },
  { name: "Nebraska", slug: "nebraska", attorneys: 15, population2020: 1961504 },
  { name: "Nevada", slug: "nevada", attorneys: 15, population2020: 3104614 },
  { name: "New Hampshire", slug: "new-hampshire", attorneys: 15, population2020: 1377529 },
  { name: "New Jersey", slug: "new-jersey", attorneys: 15, population2020: 9288994 },
  { name: "New Mexico", slug: "new-mexico", attorneys: 15, population2020: 2117522 },
  { name: "New York", slug: "new-york", attorneys: 15, population2020: 20201230 },
  { name: "North Carolina", slug: "north-carolina", attorneys: 15, population2020: 10439388 },
  { name: "North Dakota", slug: "north-dakota", attorneys: 15, population2020: 779094 },
  { name: "Ohio", slug: "ohio", attorneys: 15, population2020: 11799448 },
  { name: "Oklahoma", slug: "oklahoma", attorneys: 15, population2020: 3959353 },
  { name: "Oregon", slug: "oregon", attorneys: 15, population2020: 4237256 },
  { name: "Pennsylvania", slug: "pennsylvania", attorneys: 15, population2020: 13002700 },
  { name: "Rhode Island", slug: "rhode-island", attorneys: 18, population2020: 1097379 },
  { name: "South Carolina", slug: "south-carolina", attorneys: 15, population2020: 5118425 },
  { name: "South Dakota", slug: "south-dakota", attorneys: 15, population2020: 886667 },
  { name: "Tennessee", slug: "tennessee", attorneys: 15, population2020: 6910840 },
  { name: "Texas", slug: "texas", attorneys: 85, population2020: 29145505 },
  { name: "Utah", slug: "utah", attorneys: 15, population2020: 3271616 },
  { name: "Vermont", slug: "vermont", attorneys: 15, population2020: 643077 },
  { name: "Virginia", slug: "virginia", attorneys: 15, population2020: 8631393 },
  { name: "Washington", slug: "washington", attorneys: 15, population2020: 7705281 },
  { name: "West Virginia", slug: "west-virginia", attorneys: 15, population2020: 1793716 },
  { name: "Wisconsin", slug: "wisconsin", attorneys: 15, population2020: 5893718 },
  { name: "Wyoming", slug: "wyoming", attorneys: 15, population2020: 576851 },
];

export function per100k(d: StateDensity): number {
  return (d.attorneys / d.population2020) * 100000;
}

export interface PracticeCount {
  title: string;
  slug: string;
  attorneys: number;
}

/** Attorneys per practice area. Attorneys with multiple areas count in each;
 *  115 of the 833 attorneys list more than one area. Bankruptcy is a tracked
 *  practice page with no listed attorneys yet. */
export const PRACTICE_COUNTS: PracticeCount[] = [
  { title: "Personal Injury Lawyer", slug: "personal-injury-lawyer", attorneys: 342 },
  { title: "Criminal Defense Attorney", slug: "criminal-defense-attorney", attorneys: 283 },
  { title: "Divorce Attorney", slug: "divorce-attorney", attorneys: 238 },
  { title: "Mesothelioma Attorney", slug: "mesothelioma-attorney", attorneys: 31 },
  { title: "Offshore Accident Lawyer", slug: "offshore-accident-lawyer", attorneys: 21 },
  { title: "Truck Accident Attorney", slug: "truck-accident-attorney", attorneys: 12 },
  { title: "Workers' Compensation Attorney", slug: "workers-compensation-attorney", attorneys: 8 },
  { title: "DUI Attorney", slug: "dui-attorney", attorneys: 8 },
  { title: "Motorcycle Accident Lawyer", slug: "motorcycle-accident-lawyer", attorneys: 6 },
  { title: "Construction Accident Lawyer", slug: "construction-accident-lawyer", attorneys: 6 },
  { title: "Estate Planning Attorney", slug: "estate-planning-attorney", attorneys: 5 },
  { title: "Oil Rig Injury Lawyer", slug: "oil-rig-injury-lawyer", attorneys: 4 },
  { title: "Business Lawyer", slug: "business-lawyer", attorneys: 3 },
  { title: "Immigration Attorney", slug: "immigration-attorney", attorneys: 3 },
  { title: "Real Estate Attorney", slug: "real-estate-attorney", attorneys: 1 },
  { title: "Bankruptcy Attorney", slug: "bankruptcy-attorney", attorneys: 0 },
];

export interface ScarceArea {
  title: string;
  slug: string;
  total: number;
  byState: { state: string; slug: string; attorneys: number }[];
  zeroStates: number;
  note: string;
}

/** The scarcest specialties in the directory — where listed attorneys
 *  actually practice, counted from the same snapshot. */
export const SCARCE_AREAS: ScarceArea[] = [
  {
    title: "Offshore Accident / Jones Act",
    slug: "offshore-accident-lawyer",
    total: 21,
    byState: [
      { state: "Texas", slug: "texas", attorneys: 18 },
      { state: "Louisiana", slug: "louisiana", attorneys: 3 },
    ],
    zeroStates: 48,
    note: "Every listed offshore accident lawyer in the directory practices in just two Gulf states — Texas (18) and Louisiana (3). That mirrors the industry: Jones Act and maritime injury work follows the Gulf of Mexico drilling and shipping corridor.",
  },
  {
    title: "Oil Rig Injury",
    slug: "oil-rig-injury-lawyer",
    total: 4,
    byState: [{ state: "Texas", slug: "texas", attorneys: 4 }],
    zeroStates: 49,
    note: "The directory's scarcest specialty: all 4 listed oil rig injury lawyers are in Texas. Injured rig workers in the other 49 states have no listed specialist in this directory at all.",
  },
  {
    title: "Mesothelioma / Asbestos",
    slug: "mesothelioma-attorney",
    total: 31,
    byState: [
      { state: "Texas", slug: "texas", attorneys: 23 },
      { state: "California", slug: "california", attorneys: 7 },
      { state: "Louisiana", slug: "louisiana", attorneys: 1 },
    ],
    zeroStates: 47,
    note: "Mesothelioma listings exist in only 3 states. Texas alone holds 23 of the 31 — asbestos litigation concentrates where shipyard, refinery, and industrial exposure cases are filed.",
  },
  {
    title: "Truck Accident",
    slug: "truck-accident-attorney",
    total: 12,
    byState: [
      { state: "Texas", slug: "texas", attorneys: 10 },
      { state: "California", slug: "california", attorneys: 1 },
      { state: "Louisiana", slug: "louisiana", attorneys: 1 },
    ],
    zeroStates: 47,
    note: "Only 12 listed truck accident specialists nationwide in this directory, 10 of them in Texas — despite commercial trucking running through every state.",
  },
  {
    title: "Workers' Compensation",
    slug: "workers-compensation-attorney",
    total: 8,
    byState: [
      { state: "Texas", slug: "texas", attorneys: 7 },
      { state: "Louisiana", slug: "louisiana", attorneys: 1 },
    ],
    zeroStates: 48,
    note: "Just 8 listed workers' comp specialists — a reminder that most injured workers are represented by general personal injury firms rather than dedicated comp practices.",
  },
];
