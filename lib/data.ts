export const SITE_URL = "https://usaattorneys.company";
export const SITE_NAME = "USA Attorneys";

export interface StateInfo {
  name: string;
  slug: string;
  region: string;
}

export const STATES: StateInfo[] = [
  { name: "Alabama", slug: "alabama", region: "the South" },
  { name: "Alaska", slug: "alaska", region: "the Pacific Northwest" },
  { name: "Arizona", slug: "arizona", region: "the Southwest" },
  { name: "Arkansas", slug: "arkansas", region: "the South" },
  { name: "California", slug: "california", region: "the West Coast" },
  { name: "Colorado", slug: "colorado", region: "the Mountain West" },
  { name: "Connecticut", slug: "connecticut", region: "New England" },
  { name: "Delaware", slug: "delaware", region: "the Mid-Atlantic" },
  { name: "Florida", slug: "florida", region: "the Southeast" },
  { name: "Georgia", slug: "georgia", region: "the South" },
  { name: "Hawaii", slug: "hawaii", region: "the Pacific" },
  { name: "Idaho", slug: "idaho", region: "the Mountain West" },
  { name: "Illinois", slug: "illinois", region: "the Midwest" },
  { name: "Indiana", slug: "indiana", region: "the Midwest" },
  { name: "Iowa", slug: "iowa", region: "the Midwest" },
  { name: "Kansas", slug: "kansas", region: "the Midwest" },
  { name: "Kentucky", slug: "kentucky", region: "the South" },
  { name: "Louisiana", slug: "louisiana", region: "the South" },
  { name: "Maine", slug: "maine", region: "New England" },
  { name: "Maryland", slug: "maryland", region: "the Mid-Atlantic" },
  { name: "Massachusetts", slug: "massachusetts", region: "New England" },
  { name: "Michigan", slug: "michigan", region: "the Midwest" },
  { name: "Minnesota", slug: "minnesota", region: "the Midwest" },
  { name: "Mississippi", slug: "mississippi", region: "the South" },
  { name: "Missouri", slug: "missouri", region: "the Midwest" },
  { name: "Montana", slug: "montana", region: "the Mountain West" },
  { name: "Nebraska", slug: "nebraska", region: "the Midwest" },
  { name: "Nevada", slug: "nevada", region: "the West" },
  { name: "New Hampshire", slug: "new-hampshire", region: "New England" },
  { name: "New Jersey", slug: "new-jersey", region: "the Mid-Atlantic" },
  { name: "New Mexico", slug: "new-mexico", region: "the Southwest" },
  { name: "New York", slug: "new-york", region: "the Northeast" },
  { name: "North Carolina", slug: "north-carolina", region: "the South" },
  { name: "North Dakota", slug: "north-dakota", region: "the Midwest" },
  { name: "Ohio", slug: "ohio", region: "the Midwest" },
  { name: "Oklahoma", slug: "oklahoma", region: "the South Central" },
  { name: "Oregon", slug: "oregon", region: "the Pacific Northwest" },
  { name: "Pennsylvania", slug: "pennsylvania", region: "the Northeast" },
  { name: "Rhode Island", slug: "rhode-island", region: "New England" },
  { name: "South Carolina", slug: "south-carolina", region: "the South" },
  { name: "South Dakota", slug: "south-dakota", region: "the Midwest" },
  { name: "Tennessee", slug: "tennessee", region: "the South" },
  { name: "Texas", slug: "texas", region: "the South Central" },
  { name: "Utah", slug: "utah", region: "the Mountain West" },
  { name: "Vermont", slug: "vermont", region: "New England" },
  { name: "Virginia", slug: "virginia", region: "the Mid-Atlantic" },
  { name: "Washington", slug: "washington", region: "the Pacific Northwest" },
  { name: "West Virginia", slug: "west-virginia", region: "the Mid-Atlantic" },
  { name: "Wisconsin", slug: "wisconsin", region: "the Midwest" },
  { name: "Wyoming", slug: "wyoming", region: "the Mountain West" },
];

export interface Faq {
  q: string;
  a: string;
}

export interface PracticeArea {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  intro: string;
  whatTheyDo: string[];
  whenYouNeed: string[];
  fees: string;
  faqs: Faq[];
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "personal-injury-lawyer",
    title: "Personal Injury Lawyer",
    shortTitle: "Personal Injury",
    metaDescription:
      "Find a personal injury lawyer near you. Learn what they do, when you need one, how contingency fees work, and what to ask before you hire.",
    intro:
      "A personal injury lawyer helps people who were hurt because someone else was careless or negligent — car crashes, slip-and-falls, medical mistakes, defective products, and workplace accidents. Their job is to prove who was at fault, document your losses, and fight the insurance company for full and fair compensation.",
    whatTheyDo: [
      "Investigate your accident: police reports, photos, witness statements, and surveillance footage.",
      "Work with doctors and experts to document injuries, treatment costs, and long-term impact.",
      "Handle all communication with insurance adjusters so you don't say anything that hurts your claim.",
      "Calculate the true value of your case — medical bills, lost wages, pain and suffering, and future care.",
      "Negotiate a settlement, and take your case to trial if the insurer won't pay what it's worth.",
    ],
    whenYouNeed: [
      "You were injured in a car, truck, motorcycle, or pedestrian accident caused by another driver.",
      "You slipped, tripped, or were hurt on someone else's property.",
      "A defective product or dangerous drug caused you harm.",
      "An insurance company denied your claim or offered a lowball settlement.",
      "A loved one was seriously injured or killed due to someone else's negligence.",
    ],
    fees:
      "Most personal injury lawyers work on contingency: you pay nothing upfront, and the lawyer takes a percentage (often around one-third) of your settlement or court award. If you don't win, you generally owe no attorney's fee. Always get the fee agreement in writing before you sign.",
    faqs: [
      {
        q: "How much does a personal injury lawyer cost?",
        a: "Almost all personal injury lawyers work on a contingency fee — typically about 33% of your settlement, sometimes higher if the case goes to trial. You pay nothing upfront, and if you lose, you usually owe no attorney's fee. Case expenses (filing fees, expert witnesses) may be handled separately, so ask how those are treated.",
      },
      {
        q: "How long do I have to file a personal injury claim?",
        a: "Every state has a statute of limitations — commonly 2 to 3 years from the date of injury, but it varies. Some states give as little as one year. If you miss the deadline, you lose the right to sue, so talk to a lawyer as soon as possible after an accident.",
      },
      {
        q: "What is my personal injury case worth?",
        a: "Value depends on medical costs, lost income, the severity and permanence of injuries, and how clearly the other party was at fault. Minor soft-tissue cases may settle for thousands; catastrophic injury cases can reach millions. A lawyer evaluates these factors during a free consultation.",
      },
      {
        q: "Should I accept the insurance company's first offer?",
        a: "Rarely. First offers are usually far below what a case is worth, and accepting one typically means waiving any future claims related to the accident. Have a lawyer review any offer before you sign anything.",
      },
    ],
  },
  {
    slug: "divorce-attorney",
    title: "Divorce Attorney",
    shortTitle: "Divorce",
    metaDescription:
      "Find a divorce attorney near you. Learn how divorce lawyers handle custody, support, and property division — plus fees, timelines, and FAQs.",
    intro:
      "A divorce attorney guides you through legally ending a marriage — dividing property and debts, arranging child custody and support, and negotiating spousal support. Even in an amicable split, a lawyer protects you from signing away rights you didn't know you had.",
    whatTheyDo: [
      "File divorce paperwork correctly and meet every court deadline in your state.",
      "Negotiate property division, retirement accounts, debts, and business interests.",
      "Work out child custody, visitation schedules, and parenting plans in your children's best interests.",
      "Calculate or contest child support and spousal support (alimony) under state guidelines.",
      "Represent you in mediation, and in court if you and your spouse can't agree.",
    ],
    whenYouNeed: [
      "You and your spouse own property, share debts, or have retirement accounts together.",
      "You have minor children and need custody, visitation, and support orders.",
      "Your spouse already hired a lawyer — you need one too.",
      "There is domestic violence, hidden assets, or a prenuptial agreement involved.",
      "You want an uncontested divorce done right, with paperwork that actually holds up.",
    ],
    fees:
      "Divorce lawyers usually charge hourly ($200–$500+ depending on location and experience), plus a retainer paid upfront. Simple uncontested divorces may be handled for a flat fee. Contested divorces with custody fights cost the most because they take the most time. Ask for a written fee agreement and regular billing statements.",
    faqs: [
      {
        q: "How long does a divorce take?",
        a: "An uncontested divorce can finalize in a few months. A contested divorce with disputes over custody or property often takes 9–18 months, and high-conflict cases can run longer. Your state's mandatory waiting period sets the minimum.",
      },
      {
        q: "Do I need a lawyer for an uncontested divorce?",
        a: "It's strongly recommended. Even when you agree on everything, a lawyer makes sure the settlement is fair, the paperwork is correct, and you don't accidentally waive rights to property, support, or retirement benefits.",
      },
      {
        q: "How is child custody decided?",
        a: "Courts decide based on the child's best interests: each parent's relationship with the child, stability of the home, the child's needs and (when old enough) preferences, and any history of abuse or neglect. Joint custody is common when both parents are fit.",
      },
      {
        q: "What is the difference between contested and uncontested divorce?",
        a: "In an uncontested divorce, both spouses agree on all terms — property, custody, support — and the court simply approves the agreement. In a contested divorce, at least one issue is disputed and must be negotiated or decided by a judge, which takes longer and costs more.",
      },
    ],
  },
  {
    slug: "criminal-defense-attorney",
    title: "Criminal Defense Attorney",
    shortTitle: "Criminal Defense",
    metaDescription:
      "Find a criminal defense attorney near you. Learn what defense lawyers do, your rights after an arrest, fees, and FAQs about criminal charges.",
    intro:
      "A criminal defense attorney protects the rights of people accused of crimes — from misdemeanors like petty theft to serious felonies. They challenge the prosecution's evidence, negotiate plea deals, and defend you at trial. If you've been arrested or are under investigation, getting a lawyer early can change the entire outcome.",
    whatTheyDo: [
      "Advise you during police questioning so you don't incriminate yourself.",
      "Review the prosecution's evidence for illegal searches, bad warrants, or constitutional violations.",
      "Negotiate with prosecutors for reduced charges, diversion programs, or dismissal.",
      "File pretrial motions to suppress evidence obtained unlawfully.",
      "Defend you at trial and argue for the lightest possible sentence if convicted.",
    ],
    whenYouNeed: [
      "You've been arrested or charged with any crime, misdemeanor or felony.",
      "Police want to question you — even as a 'witness.'",
      "You're under investigation and haven't been charged yet.",
      "You received a court summons or a warrant is out for your arrest.",
      "You want to expunge or seal a past criminal record.",
    ],
    fees:
      "Criminal defense lawyers typically charge flat fees for misdemeanors and hourly or larger flat fees for felonies, plus a retainer. Costs vary widely by charge severity and location. If you cannot afford a lawyer, the court must appoint a public defender for criminal cases — never face charges alone.",
    faqs: [
      {
        q: "What should I do if I'm arrested?",
        a: "Stay calm, clearly state that you want a lawyer, and then remain silent. Do not answer questions, consent to searches, or try to explain your way out — anything you say can be used against you. Call a criminal defense attorney as soon as possible.",
      },
      {
        q: "What is the difference between a misdemeanor and a felony?",
        a: "Misdemeanors are less serious crimes, usually punishable by up to a year in county jail and fines. Felonies are serious crimes punishable by a year or more in state prison. Felony convictions also carry long-term consequences like losing voting or gun rights in many states.",
      },
      {
        q: "Can criminal charges be dropped or dismissed?",
        a: "Yes — charges can be dismissed for lack of evidence, constitutional violations (like an illegal search), witness problems, or successful pretrial motions. An experienced defense lawyer looks for every available path to dismissal before trial.",
      },
      {
        q: "What is a plea bargain?",
        a: "A plea bargain is an agreement where you plead guilty (usually to a lesser charge) in exchange for a lighter sentence. Most criminal cases end in plea deals rather than trials. Your lawyer's job is to negotiate the best possible terms or advise you to take the case to trial.",
      },
    ],
  },
  {
    slug: "immigration-attorney",
    title: "Immigration Attorney",
    shortTitle: "Immigration",
    metaDescription:
      "Find an immigration attorney near you. Learn how immigration lawyers help with visas, green cards, citizenship, asylum, and deportation defense.",
    intro:
      "An immigration attorney helps people navigate U.S. immigration law — visas, green cards, citizenship, asylum, and deportation defense. Immigration rules are complex and mistakes can cause years of delay or permanent bars, so professional guidance is especially valuable here.",
    whatTheyDo: [
      "Determine which visa or immigration path fits your situation and goals.",
      "Prepare and file petitions, applications, and supporting evidence with USCIS.",
      "Represent you at immigration interviews and court hearings.",
      "Defend against deportation and removal proceedings.",
      "Handle appeals and motions if an application is denied.",
    ],
    whenYouNeed: [
      "You're applying for a work visa (H-1B, L-1), student visa, or family-based visa.",
      "You want a green card through family, employment, or asylum.",
      "You're ready to apply for U.S. citizenship (naturalization).",
      "You or a loved one faces deportation or removal proceedings.",
      "A visa application was denied and you need to appeal or refile.",
    ],
    fees:
      "Immigration lawyers often charge flat fees per service (for example, a set fee for a green card application or naturalization), plus government filing fees which are separate. Complex cases like deportation defense are usually billed hourly. Always ask what's included and get USCIS filing fees itemized separately.",
    faqs: [
      {
        q: "How long does the green card process take?",
        a: "It depends on the category: spouses of U.S. citizens often wait 1–2 years, while employment-based or sibling categories can take many years due to annual caps and per-country limits. Your lawyer can estimate based on the current visa bulletin.",
      },
      {
        q: "What is the difference between a visa and a green card?",
        a: "A visa lets you enter and stay in the U.S. temporarily for a specific purpose (work, study, tourism). A green card (lawful permanent residence) lets you live and work in the U.S. permanently and is a step toward citizenship.",
      },
      {
        q: "Can I apply for asylum in the United States?",
        a: "You may apply if you suffered persecution or fear persecution in your home country based on race, religion, nationality, political opinion, or membership in a particular social group. You must generally apply within one year of arriving in the U.S. An asylum lawyer greatly improves your chances.",
      },
      {
        q: "Do I need a lawyer for U.S. citizenship?",
        a: "Not legally required, but recommended if you have any complications — past arrests, long trips abroad, tax issues, or a prior denial. A lawyer reviews your application for red flags before USCIS does.",
      },
    ],
  },
  {
    slug: "bankruptcy-attorney",
    title: "Bankruptcy Attorney",
    shortTitle: "Bankruptcy",
    metaDescription:
      "Find a bankruptcy attorney near you. Learn the difference between Chapter 7 and Chapter 13, what bankruptcy costs, and whether it's right for you.",
    intro:
      "A bankruptcy attorney helps people and businesses overwhelmed by debt get a fresh start through the federal bankruptcy system. They'll tell you honestly whether bankruptcy is your best option — and if it is, which chapter fits and how to protect as much of your property as possible.",
    whatTheyDo: [
      "Review your debts, income, and assets to see if bankruptcy (or an alternative) makes sense.",
      "Determine whether you qualify for Chapter 7 or Chapter 13 under the means test.",
      "Prepare and file your petition, schedules, and statements accurately — errors can get your case dismissed.",
      "Stop creditor harassment immediately through the automatic stay.",
      "Represent you at the meeting of creditors and any court hearings.",
    ],
    whenYouNeed: [
      "Debt collectors won't stop calling and you're falling further behind every month.",
      "You're facing foreclosure, repossession, or wage garnishment.",
      "Your debts far exceed what you could repay in the next few years.",
      "You've tried debt settlement or consolidation and it didn't work.",
      "You need to know which debts bankruptcy can and can't erase.",
    ],
    fees:
      "Chapter 7 cases are commonly handled for a flat fee (often $1,000–$2,500 plus court filing fees, varying by location). Chapter 13 fees are higher and often built into the repayment plan. Most bankruptcy lawyers offer a free initial consultation — use it to understand your options before committing.",
    faqs: [
      {
        q: "What is the difference between Chapter 7 and Chapter 13?",
        a: "Chapter 7 (liquidation) erases most unsecured debts in a few months and is for people with limited income. Chapter 13 (reorganization) sets up a 3–5 year repayment plan and is for people with regular income who want to catch up on mortgages or car loans and keep their property.",
      },
      {
        q: "Will bankruptcy wipe out all my debts?",
        a: "No. Bankruptcy erases many unsecured debts like credit cards and medical bills, but generally not student loans, recent taxes, child support, alimony, or court-ordered fines. A lawyer reviews exactly which of your debts are dischargeable.",
      },
      {
        q: "Will I lose my house and car if I file?",
        a: "Usually not. Exemptions protect a certain amount of equity in your home, car, and personal property, and Chapter 13 is specifically designed to help you keep property while catching up on payments. Your lawyer structures the filing to maximize what you keep.",
      },
      {
        q: "How long does bankruptcy stay on my credit report?",
        a: "Chapter 7 stays for 10 years, Chapter 13 for 7 years. But most filers can start rebuilding credit within a year or two after discharge with secured cards and responsible use — many see scores recover faster than they expect.",
      },
    ],
  },
  {
    slug: "estate-planning-attorney",
    title: "Estate Planning Attorney",
    shortTitle: "Estate Planning",
    metaDescription:
      "Find an estate planning attorney near you. Learn about wills, trusts, power of attorney, probate, and how to protect your family's future.",
    intro:
      "An estate planning attorney helps you decide what happens to your property, your children, and your medical decisions if you become incapacitated or pass away. Wills, trusts, powers of attorney, and healthcare directives — done correctly now, they save your family enormous stress and expense later.",
    whatTheyDo: [
      "Draft a legally valid will that actually holds up in your state.",
      "Set up trusts (revocable living trusts, special-needs trusts) to avoid probate and protect assets.",
      "Prepare durable powers of attorney for finances and healthcare directives for medical decisions.",
      "Name guardians for minor children and plan for their care.",
      "Minimize estate taxes and help your family navigate probate if it can't be avoided.",
    ],
    whenYouNeed: [
      "You have children and haven't named a guardian for them.",
      "You own a home, business, or significant savings.",
      "You want to avoid probate court delays and costs for your heirs.",
      "You need to plan for a family member with special needs.",
      "Your life changed — marriage, divorce, new child, or a big asset purchase — and old documents are outdated.",
    ],
    fees:
      "Simple wills are often done for a flat fee (a few hundred dollars). Trust-based estate plans typically cost $1,500–$5,000+ depending on complexity. Given what's at stake, this is one area where professional drafting pays for itself many times over compared to DIY templates.",
    faqs: [
      {
        q: "Do I need a will if I don't have much money?",
        a: "Yes. A will isn't just about money — it names guardians for your children, directs who handles your affairs, and prevents the state from deciding for you. Everyone over 18 should have at least a basic will, power of attorney, and healthcare directive.",
      },
      {
        q: "What is the difference between a will and a trust?",
        a: "A will takes effect after death and usually goes through probate court. A living trust takes effect immediately, lets a successor manage your affairs if you're incapacitated, and typically avoids probate entirely — faster, more private, but more expensive to set up.",
      },
      {
        q: "What happens if I die without a will?",
        a: "Your state's intestacy laws decide who gets what — usually spouse and children in fixed shares — and a court picks guardians for minor children. The process is slower, more expensive, and may not match your wishes at all.",
      },
      {
        q: "How often should I update my estate plan?",
        a: "Review it every 3–5 years and after any major life event: marriage, divorce, birth of a child, death of a beneficiary, buying property, or moving to another state (estate laws differ by state).",
      },
    ],
  },
  {
    slug: "dui-attorney",
    title: "DUI Attorney",
    shortTitle: "DUI",
    metaDescription:
      "Find a DUI attorney near you. Learn how DUI lawyers challenge breath tests, protect your license, and what a DUI costs — plus FAQs.",
    intro:
      "A DUI attorney defends people charged with driving under the influence of alcohol or drugs. DUI cases involve two fights at once — the criminal charge and the administrative suspension of your driver's license — and strict deadlines apply to both. A lawyer who knows local DUI procedures can often reduce penalties dramatically.",
    whatTheyDo: [
      "Challenge the traffic stop: was there legal cause to pull you over?",
      "Attack breathalyzer and blood test evidence — calibration records, testing procedures, medical conditions.",
      "Fight the license suspension at the DMV/MVA administrative hearing (separate from court).",
      "Negotiate for reduced charges (like reckless driving) or alternative sentencing.",
      "Guide first-time offenders toward diversion programs where available.",
    ],
    whenYouNeed: [
      "You've been arrested for DUI/DWI/OWI.",
      "You failed or refused a breathalyzer or field sobriety test.",
      "This isn't your first DUI — repeat offenses carry much harsher penalties.",
      "Your job depends on your driver's license (CDL holders, delivery drivers).",
      "You were in an accident while allegedly impaired.",
    ],
    fees:
      "First-offense DUI defense commonly costs $1,500–$5,000 as a flat fee; complex or trial cases cost more. That doesn't include fines, court costs, or increased insurance. Given that a conviction affects employment, insurance rates, and your record for years, early legal help is usually worth far more than it costs.",
    faqs: [
      {
        q: "Will I lose my license after a DUI arrest?",
        a: "Probably temporarily — most states suspend your license automatically after a DUI arrest unless you request a DMV hearing within a short window (often 10–30 days). Your lawyer handles this hearing separately from the criminal case. Missing the deadline means automatic suspension.",
      },
      {
        q: "Can a DUI charge be reduced or dismissed?",
        a: "Often, yes. Lawyers challenge the stop's legality, breath-test accuracy, and officer procedures. Many cases resolve as reduced charges like reckless driving, especially for first offenders with borderline BAC readings.",
      },
      {
        q: "What is the difference between DUI and DWI?",
        a: "They mean essentially the same thing — impaired driving — but terminology varies by state. Some states use DUI (driving under the influence), others DWI (driving while intoxicated/impaired), and some use both for different offense levels.",
      },
      {
        q: "Should I refuse a breathalyzer test?",
        a: "It depends on your state. Under implied-consent laws, refusing triggers an automatic license suspension — sometimes longer than a failed test would. But refusal also denies the prosecution key evidence. Discuss your state's specific rules with a local DUI lawyer before you ever need this answer.",
      },
    ],
  },
  {
    slug: "workers-compensation-attorney",
    title: "Workers' Compensation Attorney",
    shortTitle: "Workers' Comp",
    metaDescription:
      "Find a workers' compensation attorney near you. Learn how workers' comp lawyers help with denied claims, benefits, settlements, and FAQs.",
    intro:
      "A workers' compensation attorney helps employees hurt on the job get the medical care and wage benefits they're entitled to. The system is supposed to work without lawyers — but when claims are denied, delayed, or cut short, an attorney levels the playing field against the insurer.",
    whatTheyDo: [
      "File your claim correctly and meet strict reporting deadlines.",
      "Appeal denied claims with medical evidence and legal arguments.",
      "Make sure you see qualified doctors — not just the company-chosen one.",
      "Fight for full temporary and permanent disability benefits.",
      "Negotiate lump-sum settlements that reflect your future medical needs.",
    ],
    whenYouNeed: [
      "Your workers' comp claim was denied.",
      "Your benefits were delayed, reduced, or stopped.",
      "Your injury is serious, permanent, or requires ongoing treatment.",
      "Your employer retaliated against you for filing a claim.",
      "The insurance company wants you to settle — and the offer seems low.",
    ],
    fees:
      "Workers' comp lawyers almost always work on contingency, and fees are capped by state law (often 10–20% of your award). You pay nothing upfront. Because fees are regulated, hiring a lawyer costs you very little out of pocket — and represented workers consistently recover more.",
    faqs: [
      {
        q: "What does workers' compensation cover?",
        a: "Medical treatment for the work injury, a portion of lost wages (temporary disability), permanent disability benefits if you don't fully recover, and vocational retraining in some states. It does not cover pain and suffering — that's the tradeoff of the no-fault system.",
      },
      {
        q: "Can I be fired for filing a workers' comp claim?",
        a: "No — retaliation for filing a workers' comp claim is illegal in every state. If your employer fires, demotes, or punishes you for filing, you may have a separate retaliation claim on top of your workers' comp case.",
      },
      {
        q: "What if my claim is denied?",
        a: "Denials are common and often reversible. You have the right to appeal, usually starting with a hearing before a workers' comp judge. A lawyer gathers the medical evidence and presents your case — many denied claims succeed on appeal.",
      },
      {
        q: "Can I sue my employer instead of filing workers' comp?",
        a: "Generally no — workers' comp is the exclusive remedy against your employer for workplace injuries. Exceptions exist for intentional harm or (in some states) egregious conduct. You can, however, sue third parties (like equipment manufacturers) whose negligence contributed.",
      },
    ],
  },
  {
    slug: "real-estate-attorney",
    title: "Real Estate Attorney",
    shortTitle: "Real Estate",
    metaDescription:
      "Find a real estate attorney near you. Learn what real estate lawyers do for buyers, sellers, closings, disputes, and landlord-tenant issues.",
    intro:
      "A real estate attorney handles the legal side of property — purchases, sales, closings, title issues, zoning, and landlord-tenant disputes. In several states a lawyer is required at closing; everywhere else, one is cheap insurance on the biggest transaction of your life.",
    whatTheyDo: [
      "Review and negotiate purchase agreements before you sign.",
      "Run or review title searches and resolve liens, boundary, or ownership issues.",
      "Handle closings: prepare documents, manage escrow, and ensure clean transfer.",
      "Resolve landlord-tenant disputes, evictions, and lease problems.",
      "Litigate boundary disputes, easements, zoning denials, and construction defects.",
    ],
    whenYouNeed: [
      "You're buying or selling a home — especially a FSBO, short sale, or foreclosure.",
      "Title issues, liens, or boundary disputes showed up.",
      "You're a landlord dealing with evictions or problem tenants.",
      "You're buying commercial property or land for development.",
      "Your state requires an attorney at closing (common in the Northeast).",
    ],
    fees:
      "Residential closings are often flat-fee ($500–$1,500). Hourly billing ($200–$400/hr) applies to disputes and commercial deals. Compared to the value of the property changing hands, legal review is one of the cheapest protections you can buy.",
    faqs: [
      {
        q: "Do I need a lawyer to buy a house?",
        a: "Some states require it; most don't. But even where it's optional, a lawyer catches contract traps, title defects, and closing-cost errors that agents and title companies miss. For first-time buyers, it's strongly recommended.",
      },
      {
        q: "What is title insurance and do I need it?",
        a: "Title insurance protects against ownership claims that surface after purchase — old liens, forged deeds, undisclosed heirs. Lenders require a lender's policy; an owner's policy (a one-time fee) protects you. A real estate lawyer explains what your policy actually covers.",
      },
      {
        q: "What happens at a real estate closing?",
        a: "All parties sign transfer documents, funds are disbursed through escrow, the deed is recorded, and ownership officially changes hands. Your attorney reviews every document, verifies payoff amounts, and confirms the title is clean before you sign.",
      },
      {
        q: "Can a real estate attorney help with landlord-tenant disputes?",
        a: "Yes — evictions, security deposit fights, lease violations, habitability claims, and fair-housing issues are all core real estate law. Many disputes settle quickly once a lawyer gets involved.",
      },
    ],
  },
  {
    slug: "business-lawyer",
    title: "Business Lawyer",
    shortTitle: "Business Law",
    metaDescription:
      "Find a business lawyer near you. Learn how business attorneys help with formation, contracts, compliance, disputes, and buying or selling a company.",
    intro:
      "A business lawyer helps companies form, operate, and grow without legal landmines — entity formation, contracts, employment issues, compliance, and disputes. The cheapest lawsuit is the one your lawyer prevented with a good contract.",
    whatTheyDo: [
      "Choose and form the right entity (LLC, S-corp, C-corp, partnership) for taxes and liability.",
      "Draft and review contracts: client agreements, vendor deals, leases, NDAs, partnership terms.",
      "Handle employment law: hiring, firing, handbooks, non-competes, wage compliance.",
      "Keep you compliant with licenses, permits, and industry regulations.",
      "Resolve partner disputes, breach-of-contract claims, and guide mergers or sales.",
    ],
    whenYouNeed: [
      "You're starting a business and need the right structure from day one.",
      "You're signing any contract that matters — leases, partnerships, big client deals.",
      "You're hiring employees or independent contractors.",
      "A partner, client, or competitor dispute is brewing.",
      "You're buying, selling, or raising money for the business.",
    ],
    fees:
      "Business lawyers bill hourly ($250–$600+), though formations and standard contracts are often flat-fee. Many offer monthly general-counsel plans for small businesses. Think of it as insurance: an hour of review now beats months of litigation later.",
    faqs: [
      {
        q: "Should I form an LLC or a corporation?",
        a: "It depends on taxes, ownership, and growth plans. LLCs are simpler and flexible — ideal for most small businesses. S-corps can save on self-employment taxes at higher income levels. C-corps suit startups planning to raise venture capital. A business lawyer (with your accountant) picks the right one.",
      },
      {
        q: "Do I need a lawyer to start a small business?",
        a: "Not legally — but the formation documents, operating agreement, licenses, and first contracts you sign shape everything that follows. A few hundred dollars of legal setup prevents the most common (and expensive) founder mistakes.",
      },
      {
        q: "What is the difference between an employee and an independent contractor?",
        a: "It comes down to control: employees work under your direction with set schedules; contractors control how and when they work. Misclassifying workers triggers back taxes, penalties, and lawsuits — one of the most common small-business legal traps.",
      },
      {
        q: "How do I protect my business name and brand?",
        a: "Registering an LLC doesn't protect your brand — trademarks do. A business lawyer runs a clearance search, files federal trademark applications, and sets up the contracts (assignments, NDAs) that keep your IP actually yours.",
      },
    ],
  },
];

export const DISCLAIMER =
  "Disclaimer: USA Attorneys provides general legal information, not legal advice. Reading this site does not create an attorney-client relationship. Laws vary by state — consult a licensed attorney in your state about your specific situation.";

export function getState(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function getPractice(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.slug === slug);
}
