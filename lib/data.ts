export const SITE_URL = "https://usaattorneys.company";
export const SITE_NAME = "USA Attorneys";

export interface StateInfo {
  name: string;
  slug: string;
  region: string;
  /** Two unique intro paragraphs (~170-200 words total). */
  intro: [string, string];
  /** How-to-find guidance paragraph (~90 words). */
  finding: string;
  /** Fee landscape paragraph (~70 words). */
  fees: string;
  /** State-specific legal aid resources (~90 words). */
  legalAid: string;
  /** State court system overview (~90 words). */
  courtSystem: string;
  /** Notable state laws affecting attorney choice (~90 words). */
  notableLaws: string;
}

export const STATES: StateInfo[] = [
  {
    name: "Alabama",
    slug: "alabama",
    region: "the South",
    intro: [
      "Alabama's legal landscape has one feature that surprises newcomers: it is one of only a handful of pure contributory negligence states. If you are found even 1% at fault for a car accident in Birmingham or Montgomery, you can be barred from recovering damages entirely — which makes the choice of personal injury lawyer in Alabama more consequential than in most states. Insurance companies know this rule and use it aggressively.",
      "Beyond auto accidents, Alabama attorneys handle cases tied to the state's industrial base — steel and manufacturing injuries around Birmingham, port and shipping work in Mobile, and agricultural disputes in the Black Belt. Huntsville's tech and defense growth has also created steady demand for business and employment lawyers.",
    ],
    finding:
      "Start with the Alabama State Bar's lawyer referral service to confirm any attorney is licensed and in good standing. For injury cases, most Birmingham and Mobile firms offer free consultations and work on contingency. Ask how many cases like yours the lawyer has taken to trial in Alabama courts — the contributory negligence rule rewards attorneys who prepare every case as if it will be tried.",
    fees:
      "Personal injury lawyers in Alabama typically charge a contingency fee around one-third of the recovery. Criminal defense and family lawyers usually bill hourly ($200–$400) or flat fees for routine matters. Business and real estate work in Huntsville's growth market often runs flat-fee for formations and closings.",
    legalAid:
      "If you can't afford a lawyer, Legal Services Alabama (LSA) is the statewide lifeline, with offices from Huntsville to Mobile handling housing, family, consumer, and benefits cases for low-income residents. The Alabama State Bar's Volunteer Lawyers Program matches qualifying clients with private attorneys who take cases pro bono, and its Lawyer Referral Service offers a low-cost initial consultation. Law school clinics add another option: the University of Alabama School of Law runs civil, criminal, and domestic violence clinics, while Cumberland School of Law in Birmingham operates community clinics. For seniors, the Alabama Legal Answer Line gives brief phone advice.",
    courtSystem:
      "Alabama's trial courts are the Circuit Courts, which hear felonies, major civil cases, and family matters, while District Courts handle misdemeanors, small claims, and preliminary hearings. Appeals go to two specialized courts — the Court of Civil Appeals and the Court of Criminal Appeals — before reaching the Supreme Court of Alabama. One Alabama distinctive: judges at every level are chosen in partisan elections, so the judge hearing your case campaigned for the job. That makes local knowledge valuable — an attorney who practices regularly before your county's elected judges understands their tendencies in a way an outsider can't.",
    notableLaws:
      "Three Alabama rules reshape injury cases. First, wrongful death damages here are exclusively punitive — Alabama is the only state that bars compensatory damages in wrongful death suits, so these cases hinge entirely on punishment evidence. Second, tort reform abolished joint and several liability: each defendant pays only its own share of fault, which matters when multiple parties caused your injury. Third, punitive damages are capped at three times compensatory damages or $1.5 million, whichever is greater. Ask any personal injury lawyer how these three rules affect your case's value before you sign a fee agreement.",
  },
  {
    name: "Alaska",
    slug: "alaska",
    region: "the Pacific Northwest",
    intro: [
      "Practicing law in Alaska means dealing with distance. With Anchorage, Fairbanks, and Juneau separated by hundreds of miles of wilderness, many Alaskans meet their attorneys by phone or video — and state courts have adapted with remote hearing options. Cases often involve the industries that define the state: oil and gas, commercial fishing, tourism, and aviation, where a single accident can trigger overlapping federal and state rules.",
      "Alaska's small bar means reputation travels fast. Whether your matter is a personal injury in Anchorage, a custody case in the Mat-Su Valley, or a business dispute in Juneau, local experience with Alaska's courts and its unique jurisdictional quirks matters more here than almost anywhere else in the country.",
    ],
    finding:
      "Use the Alaska Bar Association's lawyer referral service to find attorneys by practice area and location. Because many lawyers serve the whole state remotely, don't limit yourself to your city — but do confirm the attorney has actually appeared in the court where your case will be heard. Free consultations are common for injury and criminal cases.",
    fees:
      "Contingency fees dominate personal injury work in Alaska, typically around one-third. Hourly rates in Anchorage run $250–$450 for family, criminal, and business matters. Given travel costs in rural cases, ask upfront how the firm handles expenses for hearings outside its home city.",
    legalAid:
      "Alaska Legal Services Corporation (ALSC) is the primary free legal help provider, with offices in Anchorage, Fairbanks, Juneau, and rural hubs serving Native communities. The Alaska Bar Association's Lawyer Referral Service connects callers with attorneys for a modest initial consultation fee. Because Alaska has no in-state law school, clinics are thinner than elsewhere — but the Alaska Pro Bono Partnership and volunteer attorney programs fill gaps, especially for domestic violence and housing cases. For remote villages, ALSC and court self-help centers increasingly handle intake by phone and video, which matters when the nearest lawyer is a plane ride away.",
    courtSystem:
      "Alaska runs a unified court system: the Superior Court is the main trial court for felonies, major civil cases, and family law, while the District Court handles misdemeanors and smaller civil matters. Appeals go to the Court of Appeals for criminal cases and directly to the Supreme Court of Alaska for civil matters. Judges aren't elected in contested races — they're appointed by the governor from a nominating commission's list and then face periodic retention elections. The practical upshot: Alaska judges tend toward the deliberative, and attorneys who know the small, close-knit bench have an edge.",
    notableLaws:
      "Alaska's Rule 82 is the rule most newcomers miss: the losing side in a civil case generally pays a portion of the winner's attorney fees. That fee-shifting risk changes settlement math — ask your lawyer to model best- and worst-case fee exposure before filing. Second, Alaska follows pure comparative negligence, so you can recover damages even if you were mostly at fault (your award is just reduced by your share). Third, tribal courts operate alongside state courts in much of rural Alaska, and jurisdictional fights over which court hears your case are common — hire someone who has actually litigated the tribal-state boundary.",
  },
  {
    name: "Arizona",
    slug: "arizona",
    region: "the Southwest",
    intro: [
      "Arizona is a community property state, which changes the math in every divorce: assets acquired during the marriage are generally split 50/50, regardless of whose name is on the title. Phoenix, Tucson, Scottsdale, and Mesa attorneys handle a steady flow of family law shaped by this rule, plus a large volume of real estate work driven by the state's relentless growth and snowbird population.",
      "The state's extreme heat creates its own caseload — workplace heat injuries in construction and agriculture, and a busy personal injury docket from the Phoenix metro's sprawling highways. Arizona's large retiree community also keeps estate planning attorneys in Scottsdale and Sun City in constant demand.",
    ],
    finding:
      "The State Bar of Arizona offers a lawyer referral service and public records of attorney discipline — check both. Maricopa County's size means many Phoenix firms never leave the metro; if your case is in Tucson or northern Arizona, hire someone who knows those courts. Most injury firms offer free consultations.",
    fees:
      "Arizona personal injury lawyers work on contingency (about 33%). Family law attorneys typically charge $250–$450 per hour with retainers. Estate planning packages in retirement-heavy areas often run flat-fee, from a few hundred dollars for a simple will to several thousand for a trust-based plan.",
    legalAid:
      "Three organizations anchor Arizona's legal aid: Community Legal Services serves Maricopa County, Southern Arizona Legal Aid (SALA) covers the south, and DNA People's Legal Services — one of the largest Native American legal aid programs in the country — serves the Navajo Nation and Hopi communities. The State Bar of Arizona's Lawyer Referral Service and its Modest Means program connect middle-income callers with reduced-fee attorneys. Both Arizona law schools run clinics: ASU's Sandra Day O'Connor College of Law and the University of Arizona's Rogers College operate immigration, innocence, and civil justice clinics open to qualifying residents.",
    courtSystem:
      "Every Arizona county has a Superior Court — the trial court for felonies, major civil cases, divorces, and probate. Below it, Justice Courts and municipal courts handle misdemeanors, small claims, and traffic. Appeals go to the Court of Appeals, which sits in two divisions (Phoenix and Tucson), then the Supreme Court of Arizona. Judicial selection is split: appellate judges and those in Maricopa, Pima, and Pinal counties are merit-selected and face retention elections, while rural counties still elect judges. In Phoenix's massive Maricopa County Superior Court, courthouse-specific experience genuinely matters.",
    notableLaws:
      "Arizona's anti-deficiency statutes are a big deal for homeowners: after a foreclosure on most residential properties, the lender generally cannot chase you for the remaining loan balance. If you're facing foreclosure, hire a real estate attorney who litigates these protections — they change leverage completely. Second, Arizona follows pure comparative negligence, so an injured person even 90% at fault can still recover 10%. Third, Arizona imposes strict liability for dog bites — the owner is liable even if the dog never showed aggression before. Each rule rewards lawyers who specialize rather than generalize.",
  },
  {
    name: "Arkansas",
    slug: "arkansas",
    region: "the South",
    intro: [
      "Arkansas punches above its weight in business law — with Walmart, Tyson Foods, and J.B. Hunt headquartered in the northwest corner, the state has a sophisticated corporate bar concentrated around Bentonville and Fayetteville. Little Rock remains the center for litigation, government work, and the state's federal courts.",
      "For individuals, Arkansas attorneys handle the familiar mix of auto accidents on I-40 and I-30, family law matters, and agricultural disputes in the Delta. The state's modified comparative fault rule means you can recover damages as long as you were less than 50% at fault — a fairer standard than in neighboring contributory-negligence states.",
    ],
    finding:
      "The Arkansas Bar Association's referral service is a solid starting point, and the state's relatively small legal community means word-of-mouth carries weight. In northwest Arkansas, look for attorneys experienced with corporate and vendor matters; in Little Rock, litigators with real trial experience in Pulaski County courts.",
    fees:
      "Contingency fees (around one-third) are standard for injury cases across Arkansas. Hourly rates in Little Rock typically run $200–$350; northwest Arkansas corporate work can run higher. Simple estate plans and uncontested divorces are often flat-fee.",
    legalAid:
      "Two organizations split Arkansas: Legal Aid of Arkansas serves the north and west, while the Center for Arkansas Legal Services covers the east and south — together they handle housing, family, consumer, and public benefits cases statewide. The Arkansas Bar Association's Lawyer Referral Service offers an initial consultation at a reduced fee. Law school clinics at the UA Little Rock Bowen School of Law (including its tax and mediation clinics) and the University of Arkansas School of Law in Fayetteville take qualifying cases. In the Delta's rural counties, where private attorneys are scarce, legal aid offices are often the only option.",
    courtSystem:
      "Arkansas Circuit Courts are the trial courts of general jurisdiction — felonies, major civil disputes, divorces, and juvenile matters all start there. District Courts handle misdemeanors, small claims, and traffic. Appeals go to the Arkansas Court of Appeals, with the Supreme Court of Arkansas taking the most significant cases. Arkansas judges are chosen in nonpartisan elections, a system meant to keep party politics out of the courtroom. Because dockets in Pulaski County (Little Rock) move very differently from rural circuits, ask prospective lawyers where they actually try cases.",
    notableLaws:
      "Arkansas's Deceptive Trade Practices Act is unusually consumer-friendly: if a business deceived you, the statute can award actual damages plus attorney's fees to the winning consumer — which is why consumer lawyers take cases here they might decline elsewhere. Second, Arkansas gives you three years to file most personal injury suits, a full year longer than many neighboring states, but don't treat that as breathing room since evidence fades. Third, Arkansas abolished joint and several liability, so each at-fault party pays only its percentage — making the choice of which defendants to sue a strategic decision your lawyer must get right.",
  },
  {
    name: "California",
    slug: "california",
    region: "the West Coast",
    intro: [
      "California has the largest state bar in the country and some of the most employee- and consumer-friendly laws anywhere — which cuts both ways. Strict liability rules, strong tenant protections, and aggressive consumer privacy laws (CCPA) create constant work for attorneys from Los Angeles to San Francisco to San Diego. It is also a community property state, so divorces divide marital assets evenly by default.",
      "The sheer size of California's court system means specialization matters: an LA entertainment lawyer, a Bay Area startup attorney, and a Central Valley agricultural lawyer practice in effectively different worlds. Wildfire-related insurance disputes and tech-sector employment cases have become signature California practices in recent years.",
    ],
    finding:
      "With over 190,000 licensed attorneys, California demands careful filtering — use the State Bar of California's website to verify licensing and check discipline history. The bar also runs certified lawyer referral services by county. For high-stakes matters, prioritize attorneys who practice daily in the specific courthouse where your case will be filed.",
    fees:
      "California personal injury contingency fees run 33–40%. Hourly rates in LA and the Bay Area ($350–$700+) are among the nation's highest; inland areas run lower. Employment and consumer attorneys often take cases on contingency or hybrid arrangements given the state's fee-shifting statutes.",
    legalAid:
      "California's legal aid network is the nation's largest. Standouts include the Legal Aid Foundation of Los Angeles (LAFLA), Bay Area Legal Aid, and Legal Services of Northern California, each handling housing, immigration, domestic violence, and benefits cases. The State Bar of California certifies lawyer referral services in every county, and its website lets you verify any attorney's license and discipline record free. Law school clinics are everywhere — Stanford, Berkeley, UCLA, and USC all run clinics open to the public. For workers, the California Rural Legal Assistance program serves agricultural communities across the Central Valley.",
    courtSystem:
      "California's trial courts are the Superior Courts — one in each of the state's 58 counties, from tiny Alpine to massive Los Angeles. Felonies, major civil cases, family law, and probate all start there. Appeals go to the Courts of Appeal, divided into six districts, then the Supreme Court of California. Judges are appointed by the governor and later face retention elections, though Superior Court judges can also be challenged in nonpartisan elections. With 58 separate trial courts, each with local rules and cultures, hiring a lawyer who practices daily in your specific courthouse is more important here than anywhere.",
    notableLaws:
      "Three California rules dominate hiring decisions. First, the revised MICRA law caps non-economic damages in medical malpractice cases (currently $350,000, rising annually, higher for wrongful death) — ask any med-mal lawyer to explain exactly how the cap affects your case's economics. Second, California's anti-SLAPP statute is the strongest in America: if you're sued for speaking out on a public issue, a specialized motion can kill the case early and award you attorney's fees. Third, Proposition 51 makes each defendant pay non-economic damages only in proportion to fault — so identifying every responsible party matters enormously.",
  },
  {
    name: "Colorado",
    slug: "colorado",
    region: "the Mountain West",
    intro: [
      "Colorado's legal market reflects its lifestyle: ski and outdoor-recreation injuries keep personal injury lawyers in Denver, Boulder, and mountain towns busy, while the state's early marijuana legalization created an entire cannabis-law specialty dealing with licensing, banking, and employment issues. The Denver metro's tech boom has added startup and business law demand.",
      "Colorado follows modified comparative negligence — you can recover damages if you were less than 50% at fault, with your award reduced by your share of blame. The state's courts are known for relatively efficient dockets compared to coastal giants, which can mean faster resolutions.",
    ],
    finding:
      "The Colorado Bar Association's referral resources and the state judicial branch's attorney search help verify credentials. Denver's market is competitive, so compare two or three firms; in mountain towns, prioritize lawyers who actually live and practice there rather than commuting from the Front Range.",
    fees:
      "Injury contingency fees hover around one-third in Colorado. Family and criminal hourly rates in Denver run $250–$450. Cannabis and business regulatory work is often hourly or project-based given its complexity.",
    legalAid:
      "Colorado Legal Services (CLS) is the statewide provider, with offices from Denver to Durango handling evictions, family law, consumer cases, and benefits appeals for eligible residents. The Colorado Bar Association's Lawyer Referral Service connects callers with attorneys for a low-cost first consultation. Both Colorado law schools run public clinics: the University of Colorado Boulder's clinical programs and the University of Denver Sturm College of Law's clinics cover immigration, civil rights, and criminal defense. In mountain resort towns where legal aid offices are thin, Colorado's virtual self-help resources and pro bono panels matter more than in the metro.",
    courtSystem:
      "Colorado District Courts are the trial courts for felonies, major civil cases, divorces, and juvenile matters, while County Courts handle misdemeanors, small claims, and traffic. Appeals go to the Colorado Court of Appeals, then the Supreme Court of Colorado. The state uses merit selection: a nominating commission screens applicants, the governor appoints, and judges later face retention elections rather than opponents. Colorado's courts are known for comparatively efficient dockets, and its e-filing system is statewide — but local practice still varies enough that Front Range experience doesn't automatically translate to mountain jurisdictions.",
    notableLaws:
      "Colorado caps non-economic damages in injury cases (pain and suffering), a figure adjusted for inflation that now exceeds half a million dollars — your lawyer should calculate how the cap constrains your specific claim. Second, the Colorado Ski Safety Act sharply limits lawsuits over skiing injuries by treating inherent risks of the sport as assumed by the skier; ski-accident cases turn on whether the resort violated its specific statutory duties, a niche specialty. Third, Colorado's premises liability statute sorts visitors into categories with different duty levels — where you stood legally when injured can decide the whole case.",
  },
  {
    name: "Connecticut",
    slug: "connecticut",
    region: "New England",
    intro: [
      "Connecticut's identity as the insurance capital — Hartford hosts giants of the industry — shapes its legal market in unusual ways. Insurance coverage disputes and bad-faith claims are a local specialty, and the concentration of wealth in Fairfield County drives sophisticated estate planning, divorce, and tax practices in Stamford and Greenwich.",
      "The state's compact size means most attorneys practice statewide, appearing in courthouses from Bridgeport to Hartford to New London. Connecticut's courts emphasize mediation and alternative dispute resolution, so strong negotiators often deliver better results here than pure trial fighters.",
    ],
    finding:
      "Check the Connecticut Judicial Branch's attorney grievance records alongside the Connecticut Bar Association's referral service. For Fairfield County matters involving significant assets, look for attorneys with specific high-net-worth divorce or estate experience rather than generalists.",
    fees:
      "Connecticut hourly rates ($300–$500 in Fairfield County, less elsewhere) reflect the New York metro spillover. Personal injury remains contingency-based. Estate planning for the state's affluent retirees is commonly flat-fee.",
    legalAid:
      "Connecticut Legal Services operates statewide, with Greater Hartford Legal Aid and the New Haven Legal Assistance Association anchoring the two biggest cities. Together they cover housing, family, immigration, and benefits cases for low-income residents. The Connecticut Bar Association's Lawyer Referral Service offers reduced-fee initial consultations, and the state funds a foreclosure mediation program that has kept thousands of homeowners in their homes. Law school clinics at Yale, UConn, and Quinnipiac take on civil rights, immigration, and criminal justice cases — Yale's clinics in particular handle high-impact litigation with national reach.",
    courtSystem:
      "Connecticut is unusual: it has a single statewide Superior Court rather than separate county trial courts. The Superior Court is divided into judicial districts plus specialized dockets for housing, family, and complex litigation. Appeals go to the Connecticut Appellate Court, then the Supreme Court. Judges are nominated by the governor and confirmed by the General Assembly — no popular elections — and serve eight-year terms. The system leans heavily on mediation and alternative dispute resolution, so Connecticut rewards lawyers who negotiate brilliantly, not just those who try cases well.",
    notableLaws:
      "Connecticut's comparative fault rule is slightly friendlier than most: you can recover damages as long as your share of fault doesn't exceed 50%, with your award reduced proportionally. Second, Connecticut imposes strict liability on dog owners for bites — no 'one free bite' defense, which simplifies these cases considerably. Third, medical malpractice suits require a certificate of merit: a qualified physician must attest the case has merit before you can even file. That front-loaded requirement means experienced med-mal lawyers screen cases rigorously — if a firm takes yours, that's itself a signal.",
  },
  {
    name: "Delaware",
    slug: "delaware",
    region: "the Mid-Atlantic",
    intro: [
      "Delaware is tiny but legally mighty: more than half of US public companies are incorporated here, drawn by the Court of Chancery — the nation's premier business court. Wilmington corporate lawyers handle mergers, shareholder disputes, and fiduciary litigation that sets precedents nationwide, making Delaware business law a specialty with no real equivalent elsewhere.",
      "For ordinary residents, Delaware attorneys handle the standard mix of injury, family, and criminal matters in New Castle, Kent, and Sussex counties. But the state's outsized corporate bar means even small-business owners in Delaware have access to unusually sophisticated business counsel.",
    ],
    finding:
      "The Delaware State Bar Association maintains lawyer referral and disciplinary records. If your matter touches corporate governance, shareholder rights, or business formation, prioritize Wilmington attorneys with actual Chancery Court experience — it's a distinct skill set. For personal matters, county-level experience matters more.",
    fees:
      "Corporate and Chancery work in Delaware commands premium hourly rates ($400–$800+). Consumer-side work follows national norms: contingency for injury, hourly ($250–$400) for family and criminal defense, flat fees for residential closings.",
    legalAid:
      "Delaware's small size concentrates its legal aid: Community Legal Aid Society, Inc. (CLASI) handles civil cases statewide from offices in Wilmington, Dover, and Georgetown, while Delaware Volunteer Legal Services (DVLS) recruits private attorneys for pro bono cases. The Delaware State Bar Association's Lawyer Referral Service offers a low-cost initial consultation. Widener University Delaware Law School's clinics — including its veterans and environmental clinics — serve qualifying residents. Because the state is so compact, most legal aid attorneys practice statewide, which is an advantage if your matter crosses county lines.",
    courtSystem:
      "Delaware's court structure is one of a kind. The Court of Chancery — a court of equity with no juries — decides corporate and fiduciary disputes and is the most influential business court in America. The Superior Court is the main trial court for criminal and major civil cases, with the Court of Common Pleas below it for lesser matters and a separate Family Court. Appeals go to the Supreme Court of Delaware. Uniquely, Delaware's constitution requires partisan balance on the bench, and judges are appointed by the governor and confirmed by the senate — no elections, which insulates the judiciary from campaign politics.",
    notableLaws:
      "Delaware's LLC Act is the most flexible in the country — operating agreements can waive fiduciary duties in ways most states forbid, which is why business formation here demands a lawyer who drafts with that freedom (and its traps) in mind. Second, Delaware is one of the few states with no dram shop law: bars generally can't be sued for overserving a patron who later causes injury, a sharp contrast with neighboring states. Third, Delaware follows modified comparative negligence with a 50% bar — recover nothing if you're half or more at fault — so early fault analysis by your attorney is critical.",
  },
  {
    name: "Florida",
    slug: "florida",
    region: "the Southeast",
    intro: [
      "Florida law has several features found nowhere else. It is a no-fault auto insurance state — your own Personal Injury Protection covers initial medical bills regardless of who caused the crash — and its homestead exemption offers some of the strongest creditor protections for a primary home in America. Miami, Orlando, Tampa, and Jacksonville attorneys navigate these rules daily.",
      "Hurricanes make insurance-claims law a Florida specialty: denied or underpaid storm claims flood the courts every season. Add tourism-related injuries, a huge retiree population needing estate plans, and one of the nation's busiest real estate markets, and Florida's bar stays busy across nearly every practice area.",
    ],
    finding:
      "The Florida Bar's lawyer referral service covers every county, and its website lets you verify licensing and discipline. Given the volume of advertising by high-volume firms in Miami and Orlando, look past the billboards: ask who will actually handle your case and how many similar cases the firm tried last year.",
    fees:
      "Florida regulates contingency fees on a sliding scale set by the state bar — typically 33% pre-suit, higher if litigation is filed. Hourly rates in Miami ($300–$550) exceed those in smaller markets. Hurricane claim lawyers often work on contingency too.",
    legalAid:
      "Florida's legal aid is county-anchored: Bay Area Legal Services (Tampa), Legal Services of Greater Miami, the Legal Aid Society of the Orange County Bar Association, and Jacksonville Area Legal Aid are among the largest, handling housing, family, consumer, and disaster-recovery cases. Florida Legal Services provides statewide support and migrant farmworker advocacy. The Florida Bar's Lawyer Referral Service covers every county with a low-cost initial consultation. After hurricanes, legal aid offices routinely run disaster clinics for FEMA appeals and contractor disputes — a Florida-specific service worth knowing about before storm season.",
    courtSystem:
      "Florida's trial courts are the Circuit Courts — 20 judicial circuits covering felonies, major civil cases, family law, and probate — with County Courts beneath them for misdemeanors, small claims, and traffic. Appeals go to six District Courts of Appeal (the Sixth District was created in 2023), then the Supreme Court of Florida. Circuit and county judges are elected in nonpartisan elections; appellate judges are merit-appointed and face retention votes. Florida's dockets are among the nation's busiest, and hurricane seasons periodically flood civil courts with insurance cases — ask your lawyer about current backlogs.",
    notableLaws:
      "Florida's 2023 tort reform rewrote the rules: the state switched from pure to modified comparative negligence (you now recover nothing if more than 50% at fault) and cut the negligence filing deadline from four years to two — if your accident predates the change, which rule applies is itself a legal question. The reform also ended one-way attorney's fees against insurers, so policyholders now often pay their own lawyers in coverage fights. Third, Florida's dangerous instrumentality doctrine makes vehicle owners liable when someone else drives their car with permission — a rule found almost nowhere else that reshapes every auto case.",
  },
  {
    name: "Georgia",
    slug: "georgia",
    region: "the South",
    intro: [
      "Atlanta's rise as a film-production hub, fintech center, and logistics capital has transformed Georgia's legal market far beyond its traditional base. Entertainment lawyers, startup attorneys, and commercial litigators cluster in Buckhead and Midtown, while Savannah's port drives maritime and trade work.",
      "Georgia follows modified comparative negligence with a 50% bar — you recover nothing if you were half or more at fault. The state's courts move quickly by national standards, and its business-friendly reputation keeps corporate filings and business disputes flowing through Atlanta's firms.",
    ],
    finding:
      "The State Bar of Georgia's directory and the Atlanta Bar Association's referral service are good starting points. In metro Atlanta's crowded market, seek attorneys with verifiable results in your specific matter type rather than general practitioners. Outside Atlanta, county-court familiarity matters most.",
    fees:
      "Georgia injury lawyers charge contingency fees around one-third. Atlanta hourly rates run $250–$500 for family, criminal, and business work; smaller cities run 20–30% less. The film industry's presence has created flat-fee niches for entertainment contracts.",
    legalAid:
      "Georgia Legal Services Program (GLSP) serves low-income residents outside metro Atlanta, while the Atlanta Legal Aid Society covers the five-county metro — together they handle housing, family, consumer, and benefits cases statewide. The State Bar of Georgia's Lawyer Referral Service offers reduced-fee initial consultations. Law school clinics add capacity: the University of Georgia, Georgia State, Emory, and Mercer all run clinics, with Georgia State's HeLP clinic (a medical-legal partnership) and UGA's veterans clinic among the standouts. For rural Georgians far from any office, GLSP's phone intake is often the front door.",
    courtSystem:
      "Georgia Superior Courts — organized into 49 judicial circuits — are the trial courts for felonies, major civil cases, divorces, and land disputes. Below them, State Courts (in counties that have them), Probate Courts, and Magistrate Courts handle misdemeanors, small claims, and preliminary matters. Appeals go to the Court of Appeals of Georgia, then the Supreme Court of Georgia. Judges are chosen in nonpartisan elections, and Georgia's courts are known for moving cases relatively quickly. Because superior and state court jurisdiction overlaps in confusing ways, confirm your lawyer files in the right court — it affects everything downstream.",
    notableLaws:
      "Georgia caps punitive damages at $250,000 in most cases — a critical number your injury lawyer must factor into settlement strategy from day one. Second, claims against the government require ante litem notice: as little as six months for cities and counties, twelve for the state — miss the deadline and your case dies regardless of merit, so mention any government defendant in your first meeting. Third, Georgia's offer-of-settlement statute can shift attorney's fees to whichever side unreasonably rejects a fair offer, which means settlement negotiations carry real financial stakes beyond the headline number.",
  },
  {
    name: "Hawaii",
    slug: "hawaii",
    region: "the Pacific",
    intro: [
      "Hawaii's legal system deals with issues no mainland state faces: tourism injuries at resorts and on ocean excursions, complex native Hawaiian land-rights questions, and a no-fault auto insurance system requiring Personal Injury Protection. Honolulu attorneys also handle a steady flow of military-related matters from the state's major bases.",
      "The islands' tight-knit legal community means most established attorneys know each other and the judges — which rewards lawyers with genuine local credibility. Inter-island practice is common, but an attorney based on Oahu may be less familiar with Maui or Big Island courts, so ask directly.",
    ],
    finding:
      "The Hawaii State Bar Association offers referral services and discipline records. Because the bar is small, personal recommendations carry real weight — but still verify licensing independently. For visitor injuries, look for firms experienced with the interplay between travel insurance, resort liability, and Hawaii's no-fault rules.",
    fees:
      "Hawaii personal injury contingency fees run about one-third. Hourly rates in Honolulu ($250–$450) reflect the high cost of doing business in the islands. Given travel between islands for hearings, clarify how the firm bills for inter-island travel.",
    legalAid:
      "The Legal Aid Society of Hawaii (legalaidhawaii.org) is the state's primary free civil legal provider, with offices on Oahu and intake lines serving the neighbor islands. The Hawaii State Bar Association runs a Lawyer Referral and Information Service for reduced-fee initial consultations. The University of Hawaii's William S. Richardson School of Law operates clinics handling real cases under faculty supervision, and the Hawaii Innocence Project takes on wrongful-conviction claims. Because Hawaii's bar is small, these programs are well-connected to private practitioners for referrals.",
    courtSystem:
      "Hawaii's trial courts are the Circuit Courts, organized into four circuits covering Oahu, Maui, Hawaii Island, and Kauai. Above them sits the Intermediate Court of Appeals, and at the top the Supreme Court of Hawaii. Unusually, Hawaii judges are not elected — they are appointed through merit selection by a Judicial Selection Commission and confirmed by the state senate for set terms. Specialized courts include the Land Court, which handles registered (Torrens) land titles, plus a Tax Appeal Court — systems most mainland attorneys never encounter in practice.",
    notableLaws:
      "First, Hawaii's condominium statute (HRS Chapter 514B) governs daily life for a huge share of residents — HOA fee disputes, special assessments, and board governance are the state's most common civil conflicts, so look for attorneys with specific 514B experience. Second, Hawaii recognizes the assumption of risk for outdoor recreational activities by statute, which shapes how tour-operator and ocean-injury cases are litigated. Third, the state's Land Court Torrens system means some property has state-guaranteed title — a concept foreign to mainland practice that demands a locally experienced real estate attorney.",
  },
  {
    name: "Idaho",
    slug: "idaho",
    region: "the Mountain West",
    intro: [
      "Idaho's explosive growth — Boise is routinely among America's fastest-growing metros — has strained its legal infrastructure in productive ways. Real estate attorneys in the Treasure Valley handle bidding wars, development disputes, and water-rights issues unfamiliar to newcomers, while the state's agricultural base keeps farm and ranch law alive.",
      "Idaho follows modified comparative negligence, and its courts are known for moving cases efficiently. The small, collegial bar means attorneys across the state know one another, which tends to encourage reasonable settlements over scorched-earth litigation.",
    ],
    finding:
      "The Idaho State Bar's lawyer referral service covers the state's far-flung counties. In Boise's hot market, prioritize real estate attorneys with current local-closing experience — rules and customs vary by county. For rural matters, confirm the attorney will travel to your county's courthouse.",
    fees:
      "Idaho rates remain moderate by national standards: injury contingency around one-third, hourly $200–$350 for family and criminal work in Boise, less in rural areas. Water-rights and agricultural work is often hourly given its technical complexity.",
    legalAid:
      "Idaho Legal Aid Services (idaholegalaid.org) is the statewide nonprofit provider, with offices in Boise, Coeur d'Alene, Idaho Falls, Lewiston, Nampa, Pocatello, and Twin Falls, plus a dedicated unit for migrant and seasonal farmworkers. The Idaho Volunteer Lawyers Program places qualifying cases with private attorneys donating their time. The University of Idaho College of Law runs clinics in Moscow and Boise handling real client matters. Idaho's rural geography makes these programs essential — many counties have only a handful of private practitioners.",
    courtSystem:
      "Idaho's trial courts are the District Courts, divided into seven judicial districts, each with a Magistrate Division handling misdemeanors, small claims, and preliminary matters. Appeals go to the Idaho Court of Appeals and then the Idaho Supreme Court. Idaho judges are chosen in nonpartisan elections rather than through merit commissions, which means judicial philosophy can shift with election cycles. The system's reputation for moving dockets efficiently is real — criminal and civil calendars turn over faster than in many neighboring states.",
    notableLaws:
      "First, Idaho is one of only nine community property states, which fundamentally changes divorce and estate planning — property acquired during marriage belongs equally to both spouses regardless of whose name is on it, so hire attorneys fluent in community property rules. Second, Idaho's open range law means livestock may legally roam in designated areas, and drivers who hit cattle there often have no claim — a shock to newcomers involved in rural collisions. Third, Idaho enforces a statutory cap on noneconomic damages in personal injury cases, which directly limits what pain-and-suffering awards are possible.",
  },
  {
    name: "Illinois",
    slug: "illinois",
    region: "the Midwest",
    intro: [
      "Cook County's court system — centered in Chicago — is one of the busiest in the nation, and Illinois attorneys who practice there develop a trial-hardened efficiency. The state follows modified comparative fault with a 51% bar, and Chicago's dense traffic generates a constant flow of auto and trucking accident cases on the region's interstates.",
      "Beyond Chicago, Illinois lawyers serve industrial cities like Rockford and Peoria, agricultural downstate counties, and the state capital in Springfield. Medical malpractice is a notable local specialty, with Chicago firms handling some of the country's largest such cases.",
    ],
    finding:
      "The Illinois State Bar Association and Chicago Bar Association both run referral services; the ARDC website lets you check any attorney's disciplinary record — use it. In Cook County, courthouse-specific experience matters enormously given the system's scale and pace.",
    fees:
      "Illinois caps contingency fees in medical malpractice cases by statute; standard injury contingency is around one-third. Chicago hourly rates ($300–$550) exceed downstate rates significantly. Many Chicago firms offer free injury consultations.",
    legalAid:
      "Legal Aid Chicago (legalaidchicago.org), formerly LAF, is the largest provider in Cook County with more than 50 years of service and roughly 30,000 clients helped annually across housing, family, and consumer cases. Chicago Volunteer Legal Services (cvls.org), founded in 1964, coordinates pro bono work from private firms for those who qualify. Downstate, Land of Lincoln Legal Aid and Prairie State Legal Services cover central and southern counties. The Illinois State Bar Association's IllinoisLawyerFinder offers reduced-fee referrals, and the ARDC website lets anyone verify an attorney's disciplinary history before hiring.",
    courtSystem:
      "Illinois trial courts are the Circuit Courts — 25 circuits statewide, with Cook County operating as the single largest unified court system in the country. Appeals go to the Illinois Appellate Court (five districts) and then the Supreme Court of Illinois (seven justices). Circuit judges are chosen in partisan elections, while appellate and supreme court justices face retention votes. Cook County's sheer scale means courthouse-specific experience matters enormously — procedures and unwritten customs vary between the Daley Center, Skokie, Rolling Meadows, and other divisions.",
    notableLaws:
      "First, the Illinois Biometric Information Privacy Act (BIPA) gives individuals a private right of action over fingerprint, face-scan, and other biometric collection — with damages of $1,000 to $5,000 per violation, it has generated some of the nation's largest privacy settlements, so employment and consumer cases need BIPA-aware counsel. Second, Illinois' workers' compensation system is among the most employee-friendly in the country, with no cap on wage-differential awards. Third, Illinois requires specific statutory notices and procedures in eviction cases that Chicago landlords frequently get wrong.",
  },
  {
    name: "Indiana",
    slug: "indiana",
    region: "the Midwest",
    intro: [
      "Indiana's legal market balances Indianapolis corporate work — the city hosts major healthcare, sports, and logistics companies — with manufacturing-town practices in Fort Wayne, Evansville, and Gary. The Indianapolis Motor Speedway even sustains a small motorsports-law niche covering sponsorships and liability.",
      "Indiana uses modified comparative fault with a 51% threshold. The state's courts are regarded as business-friendly and efficient, and its relatively low cost of living keeps legal fees moderate compared to coastal states — a practical advantage for individuals and small businesses alike.",
    ],
    finding:
      "The Indiana State Bar Association's referral program and the Roll of Attorneys (for discipline checks) are the key public resources. Indianapolis has deep benches in most specialties; in smaller cities, look for attorneys who regularly appear before your county's judges.",
    fees:
      "Indiana injury contingency fees run about one-third. Indianapolis hourly rates ($225–$400) are reasonable by national standards; smaller markets run lower. Business formation packages are commonly flat-fee.",
    legalAid:
      "Indiana Legal Services is the statewide civil legal aid provider with regional offices across Indiana handling housing, family, consumer, and public benefits cases for eligible low-income residents. The Indianapolis Legal Aid Society (indylas.org) serves Marion County, while the Neighborhood Christian Legal Clinic handles re-entry, immigration, housing, and tax controversies for low-income clients. The Heartland Pro Bono Council recruits private attorneys for free civil representation. Indiana University's law schools in Indianapolis and Bloomington run clinics taking community cases under faculty supervision.",
    courtSystem:
      "Indiana's trial courts are the Circuit and Superior Courts, organized by county. Appeals go to the Court of Appeals of Indiana and then the Indiana Supreme Court. Indiana also has a specialized Indiana Tax Court — one of few in the nation — handling state tax disputes exclusively. Appellate judges are chosen through merit selection with retention elections, while many trial judges are elected at the county level. The system is known for business-friendly efficiency, and e-filing is mandatory statewide.",
    notableLaws:
      "First, Indiana's Medical Malpractice Act requires most claims to pass through a Medical Review Panel before reaching court, and caps total recovery (currently $1.8 million, with the Patient's Compensation Fund covering amounts above the provider's share) — any med-mal attorney must know this process cold. Second, Indiana's Motor Vehicle Protection Act (the 'lemon law') gives buyers of defective new vehicles specific refund-or-replace rights with strict timelines. Third, Indiana's landlord-tenant statutes are relatively landlord-friendly compared to Illinois, which changes the calculus in housing disputes.",
  },
  {
    name: "Iowa",
    slug: "iowa",
    region: "the Midwest",
    intro: [
      "Des Moines' status as an insurance hub — home to major carriers — gives Iowa an outsized insurance-law bar handling coverage disputes and regulatory matters. The rest of the state runs on agriculture: farm succession planning, agricultural leases, and estate work dominate rural practices from Cedar Rapids to Sioux City.",
      "Iowa follows modified comparative fault, and its judiciary uses a merit-selection system that tends to produce well-regarded judges. The legal community is famously collegial, which often translates into productive negotiations rather than scorched-earth tactics.",
    ],
    finding:
      "Iowa State Bar Association's Find-A-Lawyer service covers all 99 counties. For farm-related matters, seek attorneys who actually understand agricultural operations — not just general estate planners. Des Moines offers the deepest bench for insurance and corporate work.",
    fees:
      "Iowa legal fees are among the Midwest's most reasonable: injury contingency around one-third, hourly $175–$300 outside Des Moines. Farm succession plans are often flat-fee given their standardized structure.",
    legalAid:
      "Iowa Legal Aid (iowalegalaid.org) is the statewide nonprofit law firm serving all 99 counties through ten regional offices, handling housing, family, benefits, and consumer cases for income-eligible Iowans. The Legal Hotline for Older Iowans (1-800-992-8161) serves residents 60 and older. The Polk County Bar Association runs one of the country's most active Volunteer Lawyers Projects, and both the Drake Legal Clinic in Des Moines and the University of Iowa College of Law clinics in Iowa City take community cases. Iowa Free Legal Answers provides online Q&A with volunteer attorneys.",
    courtSystem:
      "Iowa's trial courts are the District Courts, organized into eight judicial districts covering all 99 counties. Appeals go to the Iowa Court of Appeals and then the Iowa Supreme Court. Iowa pioneered the merit-selection system (the 'Missouri Plan' model): a nominating commission screens candidates, the governor appoints, and judges face retention elections. This tends to produce a well-regarded, less politicized judiciary. The system is known for collegiality — Iowa lawyers famously resolve many disputes through negotiation rather than scorched-earth litigation.",
    notableLaws:
      "First, Iowa's partition fence law (Iowa Code Chapter 359A) requires adjoining rural landowners to share the cost of boundary fences — a frequent source of neighbor disputes that general practice attorneys may not know. Second, Iowa's workers' compensation law has specific provisions for agricultural workers that differ from standard coverage. Third, Iowa's implied warranty of habitability and its specific notice requirements in farm tenancy terminations (leases must be terminated by September 1 for the following March) catch newcomers off guard — farm lease work belongs with attorneys who know agricultural law.",
  },
  {
    name: "Kansas",
    slug: "kansas",
    region: "the Midwest",
    intro: [
      "Wichita's identity as the Air Capital of the World — home to major aircraft manufacturers — sustains a genuine aviation-law practice covering everything from product liability to FAA regulatory work. Kansas City (spanning the Kansas-Missouri line) adds a metro legal market dealing with the complications of two states' laws in one city.",
      "Kansas follows modified comparative fault with a 50% bar. Agricultural law remains vital across the state's rural counties, where attorneys handle everything from water rights to farm bankruptcies.",
    ],
    finding:
      "The Kansas Bar Association's lawyer referral service is the starting point; the state's disciplinary records are public. In the Kansas City metro, make sure your attorney is licensed on the correct side of the state line — or both. Aviation matters belong with Wichita specialists.",
    fees:
      "Kansas contingency fees run about one-third for injury cases. Hourly rates in Wichita and Kansas City ($200–$350) are moderate; rural rates run lower. Aviation and agricultural specialty work may command premiums.",
    legalAid:
      "Kansas Legal Services (kansaslegalservices.org) is the main statewide civil legal aid provider, with field offices across Kansas and an online intake system plus free interactive court forms for eviction, divorce, custody, and protection orders. The Kansas Bar Association's Lawyer Referral Service connects residents with private attorneys for low-cost initial consultations. Kansas also has county-level pro bono panels coordinated through local bar associations. KLS explicitly does not handle criminal defense or business disputes, so those callers are routed to referral services instead.",
    courtSystem:
      "Kansas trial courts are the District Courts, organized into 31 judicial districts. Appeals go to the Kansas Court of Appeals and then the Kansas Supreme Court. Judicial selection is a hybrid: Supreme Court justices are appointed through merit selection (nominating commission plus gubernatorial appointment, then retention elections), but district judge selection varies by district — some use partisan elections, others use merit selection. In the Kansas City metro, which straddles the Kansas-Missouri line, attorneys must be licensed in the correct state, as the two states' procedures differ significantly.",
    notableLaws:
      "First, Kansas is a no-fault auto insurance state — every policy must include Personal Injury Protection ($4,500 medical, $900/month wage loss), and you can only sue for pain and suffering if medical bills exceed $2,000 or injuries meet statutory severity thresholds, so car-accident attorneys must understand PIP coordination. Second, Kansas' 50% comparative fault bar is stricter than the 51% rule in neighboring states — being exactly half at fault still bars recovery. Third, the Kansas Tort Claims Act sets special notice requirements and damage caps for claims against government entities.",
  },
  {
    name: "Kentucky",
    slug: "kentucky",
    region: "the South",
    intro: [
      "Kentucky is a choice no-fault auto insurance state — drivers choose between no-fault and traditional tort coverage when they buy their policy, a wrinkle that confuses many accident victims and keeps local personal injury lawyers busy explaining options. Louisville and Lexington anchor the state's legal market.",
      "The bourbon industry's global boom created distillery-related business work, while the horse-racing world around Lexington sustains an equine-law niche covering syndication agreements, liability, and sales disputes you won't find in most states.",
    ],
    finding:
      "The Kentucky Bar Association offers referral services and public discipline records. Because Kentucky's no-fault choice affects every auto case, prioritize personal injury attorneys who can clearly explain which system applies to you — it's the single most important question in a Kentucky crash case.",
    fees:
      "Kentucky injury lawyers work on contingency (about one-third). Louisville hourly rates ($225–$375) lead the state. Equine and bourbon-industry specialty work is typically hourly or project-based.",
    legalAid:
      "The Legal Aid Society (yourlegalaid.org) serves 15 counties around Louisville, pursuing justice for people in poverty across housing, family, and consumer cases. Legal Aid of the Bluegrass (lablaw.org) covers 33 counties in northern and eastern Kentucky. AppalReD Legal Aid serves the Appalachian counties of eastern and south-central Kentucky. The Kentucky Bar Association's Lawyer Referral Service connects callers statewide, and Access Justice runs pro bono clinics in the Louisville area. Kentucky's four legal aid programs divide the state by region, so eligibility depends on where you live.",
    courtSystem:
      "Kentucky has a unified Court of Justice: Circuit Courts handle major civil and criminal trials, District Courts handle misdemeanors and smaller civil matters, and Family Court divisions operate in many counties. Appeals go to the Kentucky Court of Appeals and then the Supreme Court of Kentucky. All Kentucky judges are chosen in nonpartisan elections — a distinctive feature that keeps party labels off the ballot but makes judicial races heavily dependent on name recognition. The state has 120 counties, each with its own circuit court clerk and local practices.",
    notableLaws:
      "First, Kentucky is a pure comparative fault state — unlike most neighbors, you can recover damages even if you are 99% at fault (reduced by your share), which fundamentally changes settlement strategy in injury cases. Second, Kentucky's equine activity liability statute (KRS 247.401) limits liability for horse-related injuries under defined conditions, directly affecting the Lexington racing and breeding industry. Third, Kentucky's 'choice no-fault' auto insurance system lets drivers choose between no-fault and traditional tort coverage at purchase — the single most important detail in any Kentucky crash case, and one many accident victims don't realize they chose.",
  },
  {
    name: "Louisiana",
    slug: "louisiana",
    region: "the South",
    intro: [
      "Louisiana is America's legal outlier: the only state whose private law is based on the civil law tradition (French and Spanish roots) rather than English common law. Concepts like community property, forced heirship history, and unique successions rules mean out-of-state attorneys — and DIY legal templates — routinely get Louisiana wrong. Hire Louisiana lawyers for Louisiana matters.",
      "New Orleans' port, tourism, and energy corridor generate maritime, personal injury, and environmental work, while Baton Rouge handles government and petrochemical matters. Hurricane claims remain a defining practice statewide.",
    ],
    finding:
      "The Louisiana State Bar Association's referral service is essential — and verify that any attorney you consider actually practices Louisiana civil law, not just common-law transplants. Maritime cases in New Orleans belong with lawyers experienced in federal admiralty courts.",
    fees:
      "Louisiana contingency fees run about one-third for injury and maritime cases. New Orleans hourly rates ($250–$450) reflect the metro market. Successions (probate) work is commonly flat-fee or statutory-percentage based.",
    legalAid:
      "Southeast Louisiana Legal Services (slls.org) provides free civil legal help across 22 parishes in the southeast, including New Orleans. The Pro Bono Project (probono-no.org) matches low-income clients with volunteer private attorneys in the New Orleans area. Acadiana Legal Service Corporation covers the Lafayette region, and Legal Aid of North Louisiana serves the northern parishes. Louisiana's law schools — LSU, Loyola New Orleans, Tulane, and Southern — all run clinics handling real cases. Given Louisiana's unique civil law system, these programs are especially valuable because out-of-state legal templates routinely fail here.",
    courtSystem:
      "Louisiana's trial courts are the District Courts, organized by parish (Louisiana's equivalent of counties). Appeals go to five Circuit Courts of Appeal and then the Supreme Court of Louisiana (seven justices). Distinctively, Louisiana judges are chosen in partisan elections — voters see party labels — which is increasingly rare nationally. Because Louisiana private law follows the civil law tradition rather than English common law, its courts use different concepts and terminology: what other states call probate is 'successions' here, and property doctrines like redhibition have no common-law equivalent.",
    notableLaws:
      "First, Louisiana's Direct Action Statute was overhauled in August 2024 (Act 275) — plaintiffs can no longer routinely sue a defendant's insurer directly; direct action now survives only in seven narrow circumstances such as the insured's bankruptcy or death, a seismic shift for injury litigation strategy. Second, the 'no pay, no play' law bars uninsured drivers from recovering the first $15,000 of bodily injury and $25,000 of property damage, which punishes uninsured motorists harshly. Third, redhibition under the Civil Code gives buyers broader warranty rights against hidden defects in homes and vehicles than common-law states allow.",
  },
  {
    name: "Maine",
    slug: "maine",
    region: "New England",
    intro: [
      "Maine's legal market serves the oldest median population of any state, which makes estate planning, elder law, and guardianship core practices from Portland to Bangor. The working waterfront — lobstering, fishing, and shipbuilding — adds maritime and commercial fishing matters, while tourism drives seasonal injury and hospitality work along the coast.",
      "Maine's courts emphasize mediation, and its small bar is notably collegial. Modified comparative negligence applies, and the state's relatively low litigation volume means cases often resolve faster than in busier jurisdictions.",
    ],
    finding:
      "The Maine State Bar Association's lawyer referral service covers the state's far-flung counties. For elder-law and estate matters — Maine's most common legal needs — look for attorneys with specific elder-law credentials, not just general estate planners. Portland offers the deepest bench overall.",
    fees:
      "Maine rates are moderate: injury contingency around one-third, hourly $200–$325 for family and criminal work. Estate planning packages are commonly flat-fee, with elder-law specialists charging for the added Medicaid-planning complexity.",
    legalAid:
      "Pine Tree Legal Assistance (ptla.org), founded in 1966, is Maine's oldest and largest civil legal aid provider, with six offices (Portland, Lewiston, Augusta, Bangor, Machias, Presque Isle) serving low-income residents statewide, including specialty units for farmworkers, Native Americans, and children. The Volunteer Lawyers Project matches eligible clients with private attorneys donating their time. The Cumberland Legal Aid Clinic at the University of Maine School of Law has students represent clients under faculty supervision. Legal Services for Maine Elders runs a statewide helpline for residents 60 and older.",
    courtSystem:
      "Maine is distinctive for having no intermediate appellate court — the Supreme Judicial Court, sitting as the Law Court, hears all appeals directly from the trial courts. Trial work happens in the Superior Court (major civil and criminal cases) and the District Court (family, smaller civil, and misdemeanor matters). Maine judges are appointed by the governor and confirmed by the state senate, not elected. The system strongly emphasizes mediation and alternative dispute resolution, and the small, collegial bar means cases often resolve faster than in busier states.",
    notableLaws:
      "First, Maine's lobster fishery operates under a limited-entry zone licensing system — licenses are scarce, valuable, and transferable only under strict rules, so fishing-business transactions demand attorneys who understand maritime licensing. Second, Maine requires mandatory foreclosure mediation, giving homeowners a structured chance to negotiate before losing their homes. Third, Maine's Human Rights Act covers more protected classes and applies to smaller employers than federal law, making employment disputes broader here — and its paid family and medical leave program, phasing in from 2026, is creating a new wave of compliance work.",
  },
  {
    name: "Maryland",
    slug: "maryland",
    region: "the Mid-Atlantic",
    intro: [
      "Maryland is one of the few pure contributory negligence states — if you share even slight fault for an accident in Baltimore or the DC suburbs, you may recover nothing. This harsh rule makes attorney selection critical: Maryland personal injury lawyers must build cases that eliminate any hint of client fault, a skill that separates experienced litigators from the rest.",
      "The state's proximity to Washington, D.C. creates a large federal-employment and security-clearance practice, while Baltimore's port and biotech corridor (plus the NIH presence) generate specialized work. Maryland's courts are well-regarded for their efficiency.",
    ],
    finding:
      "Use the Maryland State Bar Association's referral service and check the Attorney Grievance Commission records. Given the contributory negligence rule, ask any injury lawyer specifically how they handle fault disputes — vague answers are a red flag. For federal employment matters, seek DC-metro specialists.",
    fees:
      "Maryland injury contingency fees run about one-third, with the contributory negligence risk baked into case selection. Hourly rates in the DC suburbs ($350–$550) run well above Baltimore and rural rates. Security-clearance work is typically flat-fee.",
    legalAid:
      "Maryland Legal Aid (mdlab.org) is the state's largest free civil legal provider — a private nonprofit law firm serving Baltimore City and all 23 counties from 12 offices, helping over 100,000 people a year. The Maryland Volunteer Lawyers Service (mvlslaw.org) matches eligible clients with volunteer attorneys statewide. The Pro Bono Resource Center of Maryland coordinates volunteer efforts, and the Maryland Court Help Centers offer free walk-in and phone assistance (410-260-1392) for self-represented litigants. The People's Law Library of Maryland provides plain-language legal information online.",
    courtSystem:
      "Maryland's trial courts are the Circuit Courts, organized into eight judicial circuits. Appeals go to the Appellate Court of Maryland and then the Supreme Court of Maryland — both renamed in December 2022 by constitutional amendment (formerly the Court of Special Appeals and the Court of Appeals, so older documents use the old names). Circuit judges are elected in nonpartisan elections or appointed to fill vacancies; appellate judges go through merit-based appointment with senate confirmation. The courts are well-regarded for efficient case management, particularly in the Baltimore and DC-suburb corridors.",
    notableLaws:
      "First, Maryland's wiretapping and electronic surveillance statute requires all-party consent for recording conversations — stricter than federal one-party-consent law — which has major implications for employment disputes, divorce evidence, and workplace investigations. Second, Maryland abolished its feudal ground rent system but legacy ground rents still cloud some Baltimore-area titles, requiring specialized real estate counsel to clear. Third, Maryland's Consumer Protection Act provides strong remedies including attorney's fees for deceptive trade practices, making consumer cases more viable here than in many neighboring states.",
  },
  {
    name: "Massachusetts",
    slug: "massachusetts",
    region: "New England",
    intro: [
      "Massachusetts combines a no-fault auto insurance system (Personal Injury Protection) with some of the nation's strongest tenant protections and consumer laws. Boston's concentration of universities, hospitals, and biotech firms creates sophisticated employment, healthcare, and startup practices, while Cambridge's innovation economy keeps business lawyers busy.",
      "The state's courts take consumer protection seriously — Massachusetts' consumer protection statute allows triple damages and attorney's fees, which makes the state unusually favorable for plaintiffs in deceptive-practice cases.",
    ],
    finding:
      "The Massachusetts Bar Association's lawyer referral service and the Board of Bar Overseers' public records are the key vetting tools. Boston's market is deep but expensive; for routine matters, experienced suburban practitioners often deliver equal quality at lower rates.",
    fees:
      "Massachusetts injury contingency fees run 33–40%. Boston hourly rates ($350–$600) are New England's highest. The state's fee-shifting consumer laws mean some consumer attorneys take cases on contingency even outside personal injury.",
    legalAid:
      "Massachusetts funds one of the country's densest legal-aid networks through the Massachusetts Legal Assistance Corporation (MLAC). Greater Boston Legal Services (GBLS) covers Boston and 31 surrounding cities; Community Legal Aid serves central and western Massachusetts from Worcester and Springfield; De Novo (formerly Community Legal Services and Counseling Center) handles Cambridge-area family and immigration cases; Northeast Legal Aid covers the Merrimack Valley; and South Coastal Counties Legal Services serves Fall River to Cape Cod. The Volunteer Lawyers Project of the Boston Bar Association places pro bono cases, and Harvard's Legal Aid Bureau and Legal Services Center take select matters.",
    courtSystem:
      "Massachusetts trial courts start with the Superior Court (general jurisdiction, jury trials), District Court and Boston Municipal Court (misdemeanors, smaller civil cases), plus specialized Housing Court, Land Court, Probate and Family Court, and Juvenile Court. Appeals go to the Massachusetts Appeals Court, then the Supreme Judicial Court — the oldest continuously operating appellate court in the Western Hemisphere, dating to 1692. Distinctively, Massachusetts judges are appointed by the governor with Governor's Council consent and serve to age 70; there are no judicial elections, so courtroom culture rewards preparation over politics.",
    notableLaws:
      "Three laws reshape hiring decisions here. First, the 2018 non-compete reform bans non-competes for hourly and most nonexempt workers and requires ‘garden leave’ pay for the rest — if you're hiring or leaving a job, get an employment lawyer before signing. Second, the Paid Family and Medical Leave program (2021) created a state-run paid leave system with job protections broader than federal FMLA, driving a wave of benefits disputes. Third, the $8,000 PIP threshold in the no-fault auto system controls when you can sue after a crash — a personal injury lawyer's first question will be whether your medical bills crossed it.",
  },
  {
    name: "Michigan",
    slug: "michigan",
    region: "the Midwest",
    intro: [
      "Michigan's 2019 auto no-fault reform was the biggest shake-up in state insurance law in decades — drivers now choose their PIP coverage level, and the choice dramatically affects what happens after a crash. Detroit-area personal injury lawyers spend much of their time navigating the reform's complexities, making Michigan auto cases a genuine specialty.",
      "Beyond autos, Michigan attorneys serve the auto industry's supply chain, a reviving Detroit business scene, and agricultural regions. The state's modified comparative negligence rule bars recovery if you were more than 50% at fault.",
    ],
    finding:
      "The State Bar of Michigan's lawyer referral service and public discipline records are essential starting points. For any auto accident case, prioritize attorneys who can clearly explain how the 2019 reform affects your specific PIP selection — it's the hinge every Michigan crash case turns on.",
    fees:
      "Michigan injury contingency fees run about one-third. Detroit hourly rates ($250–$450) lead the state. No-fault benefit disputes are often handled on contingency as well.",
    legalAid:
      "Michigan divides the state among regional providers. The Legal Aid and Defender Association — founded in 1909, one of America's oldest — covers metro Detroit's three counties. Lakeshore Legal Aid serves the southeast; Legal Services of Eastern Michigan covers the Flint–Saginaw–Port Huron corridor; Legal Services of South Central Michigan handles Lansing and Ann Arbor; Legal Aid of Western Michigan covers Grand Rapids and the west; and Legal Services of Northern Michigan spans the Upper Peninsula. MichiganLegalHelp.org offers self-help tools statewide, and the State Bar's Modest Means Program connects qualifying clients with attorneys at $75 per hour.",
    courtSystem:
      "Michigan trial courts are the Circuit Courts (57 circuits, general jurisdiction including felonies and large civil cases), District Courts (misdemeanors, small claims, civil cases under $25,000), and Probate Courts (estates, guardianships). Appeals go to the Michigan Court of Appeals, then the seven-justice Michigan Supreme Court. All Michigan judges are elected in nonpartisan elections — including Supreme Court justices — so judicial philosophy can shift with election cycles. That matters because a case filed today may be decided years later by a different bench, something worth weighing when your dispute could turn on how a court reads a statute.",
    notableLaws:
      "First, Michigan legalized recreational marijuana in 2018, but employers can still enforce drug-free workplaces — a collision that generates employment and landlord-tenant disputes. Second, Michigan imposes strict liability on dog owners for bites, even on a first incident, which simplifies injury claims but makes homeowner-insurance coverage critical. Third, Michigan's dram shop law holds bars liable for serving visibly intoxicated patrons who cause injury — if a drunk driver hit you, an experienced attorney will investigate where they were drinking, not just who was driving.",
  },
  {
    name: "Minnesota",
    slug: "minnesota",
    region: "the Midwest",
    intro: [
      "Minnesota's no-fault auto insurance system and its concentration of Fortune 500 headquarters (Target, Best Buy, 3M, UnitedHealth) create a legal market split between Minneapolis-St. Paul corporate work and statewide personal-injury and family practices. The Mayo Clinic's presence also makes Rochester a center for healthcare law.",
      "Minnesota courts are known for strong alternative dispute resolution programs, and the state's modified comparative fault rule (51% bar) is plaintiff-friendlier than in several neighboring states. Winter-weather premises cases — slips on ice — are a distinctive local staple.",
    ],
    finding:
      "The Minnesota State Bar Association's referral service covers the state, and the Lawyers Professional Responsibility Board publishes discipline records. In the Twin Cities' deep market, match the lawyer to the matter: corporate boutiques for business, high-volume litigators for injury cases.",
    fees:
      "Minnesota injury contingency fees run about one-third. Twin Cities hourly rates ($250–$450) are moderate for a major metro. Healthcare regulatory work commands premium rates given its complexity.",
    legalAid:
      "The Minnesota Legal Services Coalition coordinates seven regional programs. Mid-Minnesota Legal Aid covers the central 20 counties including Hennepin from Minneapolis, St. Cloud, and Willmar. Southern Minnesota Regional Legal Services (SMRLS) serves 33 southern counties from St. Paul, Rochester, Winona, and Worthington. Justice North covers the northeast from Duluth; Legal Services of Northwest Minnesota covers 22 northwestern counties. The Volunteer Lawyers Network runs statewide phone and walk-in clinics, Anishinabe Legal Services serves tribal communities, and the single intake line 1-877-MY-MN-LAW routes callers to the right office.",
    courtSystem:
      "Minnesota's trial courts are the District Courts, organized into 10 judicial districts with general jurisdiction over civil and criminal cases. Appeals go to the Minnesota Court of Appeals, then the seven-justice Minnesota Supreme Court. Two specialized courts stand out: the Tax Court and the Workers' Compensation Court of Appeals, which handle those technical areas exclusively. Judges are elected in nonpartisan elections but often first appointed by the governor to fill vacancies — and Minnesota's judiciary is known for actively steering cases into mediation and other alternative dispute resolution.",
    notableLaws:
      "First, Minnesota banned nearly all non-compete agreements in 2023 — if an employer asks you to sign one, it's likely unenforceable, but get advice before ignoring it. Second, the state's Earned Sick and Safe Time law (2024) guarantees paid sick leave statewide, broader than many employers realized, fueling wage-and-hour disputes. Third, Minnesota's DWI law sets the limit at 0.08 but treats 0.16 as an aggravating factor with harsher penalties — and the state runs intensive DWI courts, so a criminal defense lawyer's familiarity with local diversion and treatment programs can matter as much as trial skill.",
  },
  {
    name: "Mississippi",
    slug: "mississippi",
    region: "the South",
    intro: [
      "Mississippi's legal market serves a largely rural population with Jackson as the hub for litigation and government work and the Gulf Coast (Biloxi, Gulfport) adding casino, tourism, and maritime matters. The state's history of large tort verdicts once earned it the 'judicial hellhole' label — reforms since have reshaped the litigation landscape considerably.",
      "Mississippi follows pure comparative negligence, meaning you can recover damages even if mostly at fault (reduced by your percentage) — a more forgiving rule than in neighboring Alabama. Agricultural and timber interests round out the rural practice mix.",
    ],
    finding:
      "The Mississippi Bar's lawyer referral service is the main public resource, and the state's small bar means reputations are well known — ask around. In Jackson, look for litigators with federal court experience; on the Gulf Coast, maritime and hospitality familiarity matters.",
    fees:
      "Mississippi contingency fees run about one-third. Hourly rates ($175–$300) are among the South's lowest, reflecting the cost of living. Tort reform has made the plaintiffs' bar selective about cases.",
    legalAid:
      "Two agencies split the state: the Mississippi Center for Legal Services covers 43 central and southern counties from Jackson, Hattiesburg, Gulfport, Meridian, and McComb, while North Mississippi Rural Legal Services covers 39 northern counties from Oxford, Tupelo, Clarksdale, Greenville, and West Point. A statewide hotline (1-800-498-1804) routes callers to the nearest office. The Mississippi Volunteer Lawyers Project matches low-income clients with private attorneys taking pro bono cases, the Mississippi Center for Justice handles impact litigation, and MS Free Legal Answers lets qualifying residents get brief advice online.",
    courtSystem:
      "Mississippi has two parallel trial courts: Circuit Courts handle felonies and general civil cases, while Chancery Courts — a distinctive feature — handle equity matters including divorce, child custody, estates, and land disputes. County Courts handle smaller matters in 19 counties. Appeals go to the Mississippi Court of Appeals, then the nine-justice Supreme Court of Mississippi. All judges are elected in nonpartisan elections. The chancery/circuit split matters when hiring: a divorce or boundary dispute belongs in chancery court, and you want a lawyer who practices there regularly.",
    notableLaws:
      "First, Mississippi's tort reforms cap non-economic damages (generally $1 million), which directly limits what injury cases are worth — ask any prospective lawyer how the caps affect your claim. Second, Mississippi has no state minimum wage or overtime law beyond the federal $7.25, so wage disputes turn entirely on federal law and require attorneys fluent in it. Third, the three-year personal injury statute of limitations is shorter than in many states, so waiting to find a lawyer can cost you the case outright.",
  },
];

export const STATES_2: StateInfo[] = [
  {
    name: "Missouri",
    slug: "missouri",
    region: "the Midwest",
    intro: [
      "Missouri straddles two major metros — St. Louis and Kansas City — each with distinct legal cultures and, in Kansas City's case, a state line running through the middle. The state follows pure comparative fault, so injured plaintiffs can recover even when largely at fault, with awards reduced by their percentage of blame.",
      "St. Louis is known for significant pharmaceutical and product-liability litigation, while agribusiness dominates rural practice. Missouri's courts have a reputation for moving complex civil cases efficiently, attracting filings from beyond state borders.",
    ],
    finding:
      "The Missouri Bar's lawyer search and the state's public discipline records are the vetting essentials. In Kansas City, confirm licensure on the correct side of the state line. For product-liability matters, St. Louis firms with mass-tort experience are the natural starting point.",
    fees:
      "Missouri injury contingency fees run about one-third. St. Louis and Kansas City hourly rates ($250–$450) exceed rural rates. Mass-tort and pharmaceutical cases are almost always contingency-based.",
    legalAid:
      "Four regional programs cover Missouri: Legal Aid of Western Missouri (Kansas City, St. Joseph, Joplin, Warrensburg), Legal Services of Eastern Missouri (St. Louis, Clayton, Hannibal, Union), Legal Services of Southern Missouri (Springfield, Cape Girardeau, Sikeston, Rolla, West Plains), and Mid-Missouri Legal Services (Columbia, Jefferson City). ArchCity Defenders in St. Louis provides free defense against the criminalization of poverty, and the shared portal lsmo.org offers legal information statewide. Each program runs its own intake, so start with the one covering your county.",
    courtSystem:
      "Missouri's trial courts are the Circuit Courts (45 circuits, general jurisdiction). Appeals go to the Missouri Court of Appeals, split into Eastern, Western, and Southern districts, then the seven-judge Supreme Court of Missouri. The state's distinctive contribution to American law is the Missouri Plan: appellate judges are nominated by a merit commission, appointed by the governor, and then face periodic retention elections rather than contested races — a model copied nationwide. Trial judges in most circuits are elected, so local judicial temperament varies more at the trial level.",
    notableLaws:
      "First, the Missouri Merchandising Practices Act lets consumers recover attorney's fees in deception cases — which is why consumer lawyers take these cases on contingency; ask about it if a business misled you. Second, voters rejected right-to-work in 2018's Proposition A, keeping Missouri a strong union state, so labor and employment disputes here play out differently than across the river in Kansas. Third, Missouri's five-year personal injury statute of limitations is among the nation's longest, giving lawyers unusual room to build complex product-liability and mass-tort cases — a factor in St. Louis's national reputation for them.",
  },
  {
    name: "Montana",
    slug: "montana",
    region: "the Mountain West",
    intro: [
      "Montana's vast distances define its legal practice — attorneys in Billings, Missoula, and Bozeman routinely cover enormous territories, and ranching, mining, and tourism shape the caseload. Water rights, public-lands disputes, and agricultural matters are Montana specialties with little equivalent elsewhere.",
      "The state's lack of a sales tax and its independent streak attract newcomers, driving real estate and estate planning work in Bozeman and the Flathead Valley. Montana's small, collegial bar tends toward practical resolutions over prolonged fights.",
    ],
    finding:
      "The State Bar of Montana's lawyer referral service is the key resource in a state where the nearest specialist may be 200 miles away. For ranch, water, or public-lands matters, hire attorneys who actually work in those areas — generalists from the cities often lack the specialized knowledge.",
    fees:
      "Montana rates are moderate: injury contingency around one-third, hourly $200–$325. Water-rights and natural-resources work is typically hourly given its technical depth. Travel time policies matter — ask how the firm bills for long drives to rural courthouses.",
    legalAid:
      "The Montana Legal Services Association (MLSA) is the state's sole general civil legal aid provider, serving all of Montana with offices including Billings, Missoula, and Helena and a helpline at 1-800-666-6899. MontanaLawHelp.org offers self-help resources statewide. The Alexander Blewett III School of Law at the University of Montana runs clinics in family, Indian, and mediation law. The Montana Supreme Court's Appellate Pro Bono Program provides free appellate counsel to qualifying self-represented litigants, and Montana Attorneys for Montana Veterans (MAMV) helps veterans with disability claims and discharge upgrades.",
    courtSystem:
      "Montana's general-jurisdiction trial courts are the District Courts (22 judicial districts). Limited-jurisdiction matters go to Justice Courts and City Courts. Appeals go directly to the seven-justice Montana Supreme Court — there is no intermediate appellate court. Uniquely, Montana has a statewide Water Court that exclusively adjudicates water-rights claims, reflecting how central water is to the state's ranching economy. All judges are elected in nonpartisan elections, and Montana’s small, collegial bar means most practitioners know the judges and each other — which cuts both ways, fostering practical resolutions but making an outsider attorney’s local relationships worth asking about.",
    notableLaws:
      "First, Montana is the only state without at-will employment — the Wrongful Discharge from Employment Act requires ‘good cause’ for firing after probation, so employment disputes here favor workers more than anywhere else in America. Second, the Stream Access Law guarantees public recreational use of rivers and streams up to the high-water mark, generating constant property and trespass disputes that need lawyers versed in it. Third, Montana's lack of a general sales tax is offset by local option and resort taxes in tourist areas — a trap for new businesses that assume ‘no sales tax’ means no tax complexity.",
  },
  {
    name: "Nebraska",
    slug: "nebraska",
    region: "the Midwest",
    intro: [
      "Nebraska's legal market centers on Omaha — home to Berkshire Hathaway and a significant finance and insurance sector — and Lincoln's government and university work. Agriculture underpins everything else: farm succession, agricultural lending, and ethanol-industry matters keep rural attorneys busy across the state.",
      "Nebraska uses modified comparative negligence with a 50% bar. Its unicameral legislature (the nation's only one) creates a distinctive legislative practice for lobbyists and government-relations attorneys in Lincoln.",
    ],
    finding:
      "The Nebraska State Bar Association's referral service and the Counsel for Discipline records are the public vetting tools. Omaha offers depth in corporate and finance law; for agricultural matters, seek attorneys with genuine farm-economy experience rather than city generalists.",
    fees:
      "Nebraska contingency fees run about one-third. Omaha hourly rates ($200–$350) are reasonable; rural rates run lower. Farm succession plans are often flat-fee.",
    legalAid:
      "Legal Aid of Nebraska is the statewide civil provider, serving all 93 counties with offices in Omaha, Lincoln, Grand Island, Norfolk, North Platte, Scottsbluff, and Bancroft; the statewide AccessLine is 1-877-250-2016, with a dedicated Elder AccessLine at 1-800-527-7249. Two law-school clinics take cases: Creighton's Milton R. Abrahams Legal Clinic in Omaha and the University of Nebraska Civil Law Clinic in Lincoln. The Volunteer Lawyers Project runs community clinics, Nebraska Free Legal Answers handles online questions, and the Immigration Legal Assistance Hotline (1-855-307-6730) serves immigrants statewide.",
    courtSystem:
      "Nebraska trial courts are the District Courts (12 districts, general jurisdiction) and County Courts (misdemeanors, small claims, probate, preliminary hearings). Appeals go to the Nebraska Court of Appeals, then the seven-judge Nebraska Supreme Court. Judges are chosen through merit selection — a nominating commission sends finalists to the governor — and then face retention elections, so campaigns are yes-or-no rather than contested. The system tends to produce a stable, professional judiciary with less election-cycle volatility than in states with contested judicial races.",
    notableLaws:
      "First, Nebraska is one of few states with a county-level inheritance tax, with rates depending on your relationship to the deceased — estate planning here genuinely requires local counsel, not a generic online will. Second, the 2024 repeal of the motorcycle helmet mandate changed the liability landscape for bike crashes overnight; injury lawyers are still litigating how it affects fault arguments. Third, Nebraska permits wage garnishment for most consumer debts (unlike some neighboring states), so debtor-creditor work here has sharper teeth — if you're being pursued, don't wait to get advice.",
  },
  {
    name: "Nevada",
    slug: "nevada",
    region: "the West",
    intro: [
      "Nevada's economy runs on hospitality and gaming, and its legal market follows: Las Vegas attorneys handle a constant flow of tourist injuries, premises liability at resorts, and the specialized field of gaming law — licensing, compliance, and disputes before the Gaming Control Board. Reno's tech growth has added a second center of business work.",
      "Nevada has no personal income tax and follows modified comparative negligence (51% bar). The state's 24-hour economy also generates distinctive DUI and criminal defense work tied to the tourist corridor.",
    ],
    finding:
      "The State Bar of Nevada's lawyer referral service and public discipline records are essential — the Las Vegas market has heavy advertising, so look past it. Gaming matters belong with licensed gaming-law specialists; tourist injuries need firms experienced with resort-company defense teams.",
    fees:
      "Nevada injury contingency fees run about one-third. Las Vegas hourly rates ($275–$500) reflect the metro market. Gaming licensing work is typically flat-fee or project-based given its regulatory complexity.",
    legalAid:
      "Three main providers divide Nevada: the Legal Aid Center of Southern Nevada (established 1958, Las Vegas) handles Clark County civil matters with free Ask-A-Lawyer sessions; Nevada Legal Services operates statewide from Las Vegas, Reno, and Elko; and Northern Nevada Legal Aid (formerly Washoe Legal Services) covers Reno and the north. The UNLV Boyd School of Law's Thomas & Mack Legal Clinic handles economic justice, immigration, and tenants' rights cases. Volunteer Attorneys for Rural Nevadans (VARN) serves low-income residents of the rural counties, and the Southern Nevada Senior Law Program provides free help to residents 60 and older.",
    courtSystem:
      "Nevada trial courts are the District Courts (11 judicial districts, general jurisdiction), Justice Courts (misdemeanors, small claims, evictions, preliminary hearings), and Municipal Courts (city ordinance violations). Appeals go to the Nevada Court of Appeals — created only in 2014, making it one of America's newest appellate courts — then the seven-justice Nevada Supreme Court. All judges are elected in nonpartisan elections. Gaming disputes follow a separate track through the Nevada Gaming Control Board and Gaming Commission, which is why casino-related matters need specialists, not general litigators.",
    notableLaws:
      "First, Nevada's two-year personal injury statute of limitations is among the shortest in the country — if you're hurt, the clock is brutally fast, so hire counsel immediately. Second, Nevada's HOA ‘super-priority’ lien law (upheld in the famous SFR Investments case) lets homeowners associations foreclose ahead of even first mortgages, creating a minefield for buyers that demands a real estate lawyer's review. Third, licensed brothels are legal in counties under 700,000 people — a regulatory framework generating unique licensing, employment, and criminal matters you won't find in any other state.",
  },
  {
    name: "New Hampshire",
    slug: "new-hampshire",
    region: "New England",
    intro: [
      "New Hampshire's 'Live Free or Die' ethos shows up in its law: no income tax, no sales tax, and a citizen legislature that keeps government — and legal regulation — lean. Manchester and Concord anchor a small but capable bar serving the Boston metro's northern spillover.",
      "The state's compact size means most attorneys practice statewide, and its courts are known for accessibility. Modified comparative fault applies, and the low tax burden drives steady business-formation and real estate work from out-of-state buyers.",
    ],
    finding:
      "The New Hampshire Bar Association's lawyer referral service covers the state. Because many firms serve both New Hampshire and Massachusetts clients, confirm where your attorney is actually licensed — the two states' laws differ significantly on taxes, family law, and liability rules.",
    fees:
      "New Hampshire rates are moderate: injury contingency around one-third, hourly $225–$375. Business formation is commonly flat-fee, reflecting the state's appeal to new companies.",
    legalAid:
      "New Hampshire Legal Assistance (NHLA) provides statewide civil aid from offices in Concord, Manchester, Portsmouth, Nashua, Claremont, Berlin, and Littleton. 603 Legal Aid — formed by merging the Bar's Pro Bono Program with the Legal Advice and Referral Center — handles intake at 1-800-639-5290. The UNH School of Law Civil Practice Clinic takes consumer, foreclosure, and tenant cases. The Bar's DOVE Project provides free representation to domestic violence survivors at restraining-order hearings, the Modest Means Program connects clients with reduced-rate attorneys, and LawLine offers free monthly phone consultations with volunteer lawyers.",
    courtSystem:
      "New Hampshire's trial courts are the Superior Court (general jurisdiction: felonies, large civil cases) and the Circuit Court, which consolidated the old district, probate, and family courts into one system with specialized divisions. Appeals go directly to the five-justice New Hampshire Supreme Court — there is no intermediate appellate court. Distinctively, judges are appointed by the governor with Executive Council confirmation and serve to age 70; New Hampshire has no judicial elections at all, which keeps the bench notably insulated from campaign politics.",
    notableLaws:
      "First, New Hampshire is the only state with no seatbelt or motorcycle helmet requirement for adults — which cuts both ways in injury cases, since defense lawyers argue comparative fault when restraints weren't used. Second, the state allows both no-fault and fault-based divorce grounds, so the grounds you file under can affect property division and strategy — a family lawyer's first advice point. Third, New Hampshire imposes strict liability on dog owners for bites regardless of the animal's history, making homeowner's and renter's insurance coverage a key question in any dog-bite claim.",
  },
  {
    name: "New Jersey",
    slug: "new-jersey",
    region: "the Mid-Atlantic",
    intro: [
      "New Jersey's choice no-fault auto system — drivers pick between a 'verbal threshold' (limited right to sue) and full tort options — makes auto accident law here genuinely technical. Newark, Jersey City, and the dense northern counties generate enormous case volume, while the pharmaceutical corridor drives specialized life-sciences work.",
      "The state's courts are among the nation's busiest, and New Jersey's consumer protection laws are plaintiff-friendly. Its proximity to New York and Philadelphia means many attorneys are multi-jurisdictional, but New Jersey's rules have enough quirks to demand local expertise.",
    ],
    finding:
      "The New Jersey State Bar Association's referral service and the state judiciary's attorney records are key resources. For auto cases, your first question should be which insurance option you selected — it determines your entire case. Prioritize attorneys who explain this clearly.",
    fees:
      "New Jersey injury contingency fees run 33–40%. Northern New Jersey hourly rates ($325–$550) reflect NYC-metro spillover. Pharmaceutical and corporate regulatory work commands premium rates.",
    legalAid:
      "Legal Services of New Jersey coordinates the statewide system, with regional programs including Essex County Legal Aid Association in Newark, South Jersey Legal Services, Central Jersey Legal Services in New Brunswick, and Union County Legal Services in Elizabeth. Volunteer Lawyers for Justice in Newark handles bankruptcy, consumer, and family cases pro bono. Rutgers Law School's Newark clinics — Urban Legal, Women's Rights Litigation, Child Advocacy, and Community Law among them — take select cases. The Education Law Center specializes in school-rights matters, and the Community Health Law Project serves clients with disabilities.",
    courtSystem:
      "New Jersey's trial court is the Superior Court, uniquely split into the Law Division (civil damages, criminal) and the Chancery Division (equity: family, foreclosure, injunctions), plus the Family Part and a separate Tax Court. Appeals go to the Appellate Division, then the seven-justice New Jersey Supreme Court. Municipal Courts handle traffic and minor offenses in each town. Judges are appointed by the governor with senate confirmation and serve initial seven-year terms — no judicial elections — producing a professionalized bench, though the appointment process itself is intensely political.",
    notableLaws:
      "First, the New Jersey Consumer Fraud Act allows treble damages plus attorney's fees for deceptive business practices — among the strongest consumer laws in America, and the reason consumer lawyers take these cases on contingency. Second, the Law Against Discrimination is broader than federal law, covering perceived disabilities and more protected classes, which shapes every employment case filed here. Third, the Conscientious Employee Protection Act gives whistleblowers powerful retaliation protections — if you were fired after reporting wrongdoing, this is the statute an employment lawyer will reach for first.",
  },
  {
    name: "New Mexico",
    slug: "new-mexico",
    region: "the Southwest",
    intro: [
      "New Mexico is a community property state with a legal culture shaped by its tri-cultural heritage — Hispanic, Native American, and Anglo traditions all influence its courts. Albuquerque and Santa Fe attorneys handle everything from national-laboratory contracting to arts-industry business work to tourism-related injuries.",
      "The state's large federal land footprint and national laboratories (Los Alamos, Sandia) create specialized federal-contracting and security-clearance practices. Pure comparative negligence applies, which is forgiving to injured plaintiffs.",
    ],
    finding:
      "The State Bar of New Mexico's referral service is the starting point, and the Disciplinary Board's records are public. For matters touching tribal lands or federal installations, seek attorneys with specific experience — jurisdictional questions here are genuinely complex.",
    fees:
      "New Mexico contingency fees run about one-third. Albuquerque hourly rates ($200–$350) are moderate. Federal contracting and clearance work may be flat-fee or hourly depending on scope.",
    legalAid:
      "If cost is the barrier, New Mexico Legal Aid (NMLA) is the statewide backbone, with offices from Albuquerque to Las Cruces handling housing, family, and consumer cases for low-income residents. DNA-People's Legal Services focuses on Native American communities, a critical resource given the state's tribal lands. The UNM School of Law runs clinics — including business, immigration, and natural resources clinics — where supervised students take real cases. The State Bar's Volunteer Attorney Program matches modest-means clients with private lawyers at reduced rates, and Law Access New Mexico offers an online intake portal. For seniors, the Senior Citizens' Law Office in Albuquerque handles benefits and guardianship matters.",
    courtSystem:
      "New Mexico's trial work happens in district courts across 13 judicial districts, with the Bernalillo County Metropolitan Court handling misdemeanors and smaller civil cases in Albuquerque. Magistrate courts cover preliminary matters statewide, and each county has a probate court. Appeals go to the New Mexico Court of Appeals, with the five-justice Supreme Court of New Mexico at the top. Judges are first appointed through a merit-selection nominating process, then face retention elections — so they don't campaign against opponents. If your case is in Albuquerque, expect the metro court's high volume; rural districts move slower but with more individual attention.",
    notableLaws:
      "Three laws shape attorney choice here. First, New Mexico abolished the death penalty in 2009, so serious criminal cases turn entirely on sentencing strategy — pick a defense lawyer with deep sentencing-hearing experience. Second, the Medical Malpractice Act caps most malpractice recoveries, which means med-mal attorneys screen cases ruthlessly; bring complete records to the first meeting. Third, water rights follow prior appropriation and centuries-old acequia customs — a property dispute involving irrigation ditches needs a water-law specialist, not a general real estate lawyer. Tribal jurisdictional overlap adds a fourth wrinkle: confirm your lawyer knows whether state, federal, or tribal court has authority.",
  },
  {
    name: "New York",
    slug: "new-york",
    region: "the Northeast",
    intro: [
      "New York's legal market is the world's largest, and its rules reflect that scale. The state's no-fault auto insurance system has a 'serious injury' threshold for lawsuits, its Labor Law 240 (the 'scaffold law') imposes strict liability on owners and contractors for elevation-related construction injuries, and New York City's tenant protections are among America's strongest.",
      "Beyond the city, attorneys in Albany, Buffalo, and Rochester handle government work, upstate industry, and cross-border matters with Canada. The sheer density of lawyers demands careful selection — credentials and courthouse experience vary enormously.",
    ],
    finding:
      "New York's court system maintains public attorney registration and discipline records — always check them. The New York State Bar Association and county bar associations run referral services. In NYC, match the lawyer to the borough courthouse; for construction injuries, Labor Law 240 experience is non-negotiable.",
    fees:
      "New York injury contingency fees are regulated on a sliding scale (generally around one-third). NYC hourly rates ($400–$800+) are the nation's highest; upstate rates run far lower. Tenant and consumer cases often use contingency or fee-shifting arrangements.",
    legalAid:
      "The Legal Aid Society — the nation's oldest — handles criminal, civil, and juvenile cases across New York City, while Legal Services NYC and the New York Legal Assistance Group (NYLAG) cover housing, immigration, and consumer matters. Upstate, the Empire Justice Center and Legal Assistance of Western New York (LawNY) serve lower-income residents. Volunteer Lawyers for the Arts is a New York original, offering free counsel to artists and creatives. The New York State Bar's Lawyer Referral Service and county bars (including the NYC Bar's Monday Night Law clinic) connect callers with vetted attorneys, and many legal aid offices run dedicated hotlines for tenants facing eviction.",
    courtSystem:
      "New York's court names confuse everyone: the 'Supreme Court' is actually the main TRIAL court in each county, while the highest court is the Court of Appeals in Albany. Between them sits the Appellate Division, split into four departments. Specialized courts include Family Court, Surrogate's Court (which handles wills and estates — the name is a colonial holdover), the Court of Claims for suits against the state, and New York City's Civil and Criminal Courts. Most judges are elected, which is why judicial races appear on your ballot. The practical takeaway: confirm which specific court your case belongs in, because filing in the wrong one wastes months.",
    notableLaws:
      "First, New York's wrongful death statute is among the country's most restrictive — recovery is limited to pecuniary (financial) loss, with nothing for grief or loss of companionship. A lawyer who doesn't front-load economic-damage proof will leave money behind. Second, 'Lavern's Law' created a discovery rule for the statute of limitations in cancer misdiagnosis cases, so the clock may start at discovery rather than the error — timing questions here are genuinely technical. Third, CPLR Article 16 limits joint-and-several liability: defendants found 50% or less at fault generally pay only their share, which makes fault allocation the central battle in multi-defendant injury cases.",
  },
  {
    name: "North Carolina",
    slug: "north-carolina",
    region: "the South",
    intro: [
      "North Carolina is one of the few pure contributory negligence states — a harsh rule under which any fault on your part can bar recovery entirely. Charlotte's banking giants, the Research Triangle's tech and pharma corridor, and the state's rapid population growth keep its attorneys busy across business, injury, and real estate law.",
      "Raleigh-Durham's universities feed a sophisticated intellectual-property and startup bar, while coastal tourism and the military presence around Fayetteville add their own caseloads. The contributory negligence rule makes early attorney involvement in any accident case especially important here.",
    ],
    finding:
      "The North Carolina Bar Association's lawyer referral service and the State Bar's public discipline records are the vetting essentials. Ask any personal injury lawyer how they handle contributory negligence defenses — it's the defining question in North Carolina accident cases. Charlotte offers depth in finance law; the Triangle in tech and IP.",
    fees:
      "North Carolina injury contingency fees run about one-third, with case selection heavily influenced by the contributory negligence risk. Charlotte hourly rates ($275–$500) lead the state. Business formation is commonly flat-fee.",
    legalAid:
      "Legal Aid of North Carolina (LANC) operates offices statewide covering housing, domestic violence, consumer, and benefits cases. In the mountains, Pisgah Legal Services is the go-to for low-income residents across western NC. Law school clinics at Duke, UNC-Chapel Hill, and Wake Forest take cases in areas from immigration to entrepreneurship. The North Carolina Bar Association runs a lawyer referral service with a modest consultation fee, and the state's Guardian ad Litem program recruits volunteers for abused children's cases. For military families around Fort Bragg and Camp Lejeune, several aid offices run dedicated servicemember clinics.",
    courtSystem:
      "North Carolina's District Court handles misdemeanors, family law, and civil cases up to $25,000, while Superior Court — the general trial court — takes felonies and larger civil matters. What surprises outsiders: Superior Court judges rotate between districts every six months, so your judge may have just arrived from another county. Appeals go to the 15-judge Court of Appeals, then the seven-justice Supreme Court of North Carolina. The state also runs a specialized North Carolina Business Court for complex commercial disputes. Judges are elected, and the rotation system means local courthouse familiarity matters less than statewide litigation experience.",
    notableLaws:
      "North Carolina is one of the last states where you can still sue for alienation of affection and criminal conversation — essentially suing a third party for breaking up a marriage. These 'heart balm' cases require a family litigator with specific experience, as defenses are technical. Second, the state allows the 'seat belt defense': evidence that you weren't buckled up can reduce your injury recovery, so defense lawyers probe it early. Third, the personal injury statute of limitations is three years — more generous than many states — but waiting invites spoliation fights over surveillance video and black-box data, so prompt counsel still matters.",
  },
  {
    name: "North Dakota",
    slug: "north-dakota",
    region: "the Midwest",
    intro: [
      "North Dakota's Bakken oil boom reshaped its legal market — energy, mineral-rights, and oilfield-injury work concentrated around Williston and Bismarck, layered over the state's agricultural base. Fargo adds a growing tech and finance sector.",
      "The state follows modified comparative fault and maintains a small, close-knit bar where attorneys often know the judges and opposing counsel personally. That familiarity tends to produce straightforward dealing, but it also means out-of-state lawyers can be at a disadvantage in local courts.",
    ],
    finding:
      "The State Bar Association of North Dakota's referral service is the main resource. For oil, gas, or mineral-rights matters, hire attorneys who actually work in the Bakken region — the technical and regulatory knowledge is specialized. Verify licensing for any out-of-state firm soliciting your case.",
    fees:
      "North Dakota rates are modest: injury contingency around one-third, hourly $175–$300. Oil and gas title work is often project-based given its volume-driven nature.",
    legalAid:
      "Legal Services of North Dakota is the statewide civil legal aid provider, with offices in Bismarck, Fargo, and Minot handling family, housing, and benefits cases. The High Plains Fair Housing Center tackles housing discrimination statewide. UND School of Law clinics give students supervised caseloads in areas like tribal and elder law. The State Bar Association of North Dakota operates a lawyer referral service, and its Volunteer Lawyer Program places pro bono cases with private attorneys. Given the Bakken's transient workforce, several programs run targeted outreach to oilfield workers on wage and injury issues.",
    courtSystem:
      "North Dakota's District Courts — organized into eight judicial districts — are the trial courts for almost everything. Above them sits the five-justice Supreme Court of North Dakota. Unusually, the state has no permanent intermediate appellate court: instead, a temporary Court of Appeals of three-judge panels is assigned cases by the Supreme Court when needed. Municipal courts handle city ordinance violations. Judges are elected in nonpartisan races. The practical effect of the temporary appeals court is a thinner body of published intermediate precedent, so experienced appellate lawyers lean heavily on Supreme Court decisions.",
    notableLaws:
      "First, workplace injuries go through Workforce Safety & Insurance (WSI), North Dakota's exclusive state-run workers' comp fund — you cannot sue your employer, and appeals follow an administrative track, so hire someone who practices in that system, not a general PI lawyer. Second, mineral rights law is its own world here: dormant mineral statutes can sever long-unused interests, and Bakken title chains are notoriously tangled — oil and gas matters demand a title specialist. Third, the state's agritourism immunity statute shields farm operators from certain visitor-injury suits, which changes the calculus of any rural recreational injury claim.",
  },
  {
    name: "Ohio",
    slug: "ohio",
    region: "the Midwest",
    intro: [
      "Ohio's three major metros — Cleveland, Columbus, and Cincinnati — each anchor distinct legal markets: healthcare and manufacturing in Cleveland, government and Ohio State in Columbus, consumer brands in Cincinnati. The state follows modified comparative negligence with a 51% bar.",
      "Ohio's courts handle heavy product-liability and mass-tort dockets, and its manufacturing heritage keeps workplace-injury practices busy. The state's central location also makes it a frequent venue for interstate trucking accident cases on I-70, I-71, and I-75.",
    ],
    finding:
      "The Ohio State Bar Association's referral service and the Supreme Court of Ohio's public attorney records are key vetting tools. Match the metro to the matter — Cleveland for medical and industrial cases, Columbus for regulatory work, Cincinnati for corporate matters.",
    fees:
      "Ohio injury contingency fees run about one-third. Major-metro hourly rates ($250–$450) exceed small-city rates. Trucking accident cases are almost always contingency-based given their complexity and value.",
    legalAid:
      "The Legal Aid Society of Cleveland and the Legal Aid Society of Columbus anchor the state's civil legal aid network, joined by Community Legal Aid in Akron, Legal Aid of Western Ohio, and Southeastern Ohio Legal Services. The Ohio State Legal Services Association coordinates statewide. Law clinics at Ohio State's Moritz College of Law and Case Western Reserve take on housing, immigration, and small-business cases. The Ohio State Bar Association's lawyer referral service connects callers with local attorneys, and many county bars run their own referral and reduced-fee panels for modest-means clients.",
    courtSystem:
      "Ohio is the only state with mayor's courts — small municipal courts run by mayors in villages and small cities, handling traffic and minor misdemeanors. Above them: municipal and county courts, then the Courts of Common Pleas (one per county, the main trial courts). Appeals go to one of 12 District Courts of Appeals, then the seven-justice Supreme Court of Ohio. Ohio judges are elected — partisan primaries followed by nonpartisan general-election ballots, a hybrid found almost nowhere else. If your matter starts in a mayor's court, hire a lawyer who actually practices in that village courtroom.",
    notableLaws:
      "Ohio's tort reform caps most noneconomic damages (roughly $250,000–$350,000 depending on the case), so a PI lawyer's real skill is maximizing economic damages and finding exceptions — ask how they've done it. Second, medical malpractice cases require a certificate of merit: an expert's affidavit filed with the complaint. Miss it and the case dies early, so your lawyer needs an expert network ready on day one. Third, Ohio's 'apology law' bars expressions of sympathy from being used as admissions in malpractice cases, which shapes how pre-suit negotiations play out.",
  },
  {
    name: "Oklahoma",
    slug: "oklahoma",
    region: "the South Central",
    intro: [
      "Oklahoma's energy sector — oil, gas, and wind — dominates its legal market, with Oklahoma City and Tulsa firms handling everything from mineral titles to pipeline disputes. Tribal jurisdiction questions add a layer of complexity few states share, following landmark court decisions reshaping criminal and civil jurisdiction in eastern Oklahoma.",
      "The state follows modified comparative negligence (51% bar). Tornado and storm damage claims are a recurring specialty, and the state's affordable cost of living keeps legal fees reasonable across practice areas.",
    ],
    finding:
      "The Oklahoma Bar Association's referral service is the starting point. For any matter touching tribal lands or jurisdiction, prioritize attorneys with demonstrated experience in that area — it's genuinely specialized. Energy matters belong with Oklahoma City or Tulsa firms that live in the industry.",
    fees:
      "Oklahoma contingency fees run about one-third. Hourly rates ($200–$350) are moderate statewide. Oil and gas title examination is often volume-priced.",
    legalAid:
      "Legal Aid Services of Oklahoma serves low-income residents statewide from offices in Oklahoma City, Tulsa, and beyond. Oklahoma Indian Legal Services is a standout — it provides free civil legal help specifically to Native Americans, essential in a state with 39 tribal nations. Law clinics at OU, Oklahoma City University, and the University of Tulsa take cases in areas from tribal law to entrepreneurship. The Oklahoma Bar Association's lawyer referral service matches callers by county and practice area, and its Lawyers for Heroes program offers pro bono help to military members and veterans.",
    courtSystem:
      "Oklahoma is one of only two states with a bifurcated high court: the Supreme Court of Oklahoma is the last word on civil cases, while the Court of Criminal Appeals is the last word on criminal cases, with a Court of Civil Appeals in between for civil matters. Trial work happens in district courts across 26 districts. Appellate judges reach the bench through merit selection and then face retention elections. The split top courts mean civil and criminal appeals develop in separate silos — make sure your appellate lawyer practices in the right one.",
    notableLaws:
      "Since McGirt v. Oklahoma, criminal jurisdiction in much of eastern Oklahoma depends on whether the defendant or victim is tribal and where the crime occurred — state, federal, or tribal court could claim the case. A criminal defense lawyer without federal Indian-law fluency is a liability here. Second, Oklahoma's medical marijuana program (State Question 788) is among the nation's most permissive, but employment protections lag behind, creating a steady stream of workplace disputes that need cannabis-aware counsel. Third, workers' compensation runs through an administrative commission with no jury — a very different skill set from courtroom litigation.",
  },
  {
    name: "Oregon",
    slug: "oregon",
    region: "the Pacific Northwest",
    intro: [
      "Oregon's no-sales-tax, environmentally conscious culture shapes a legal market where Portland attorneys handle everything from outdoor-industry business work to some of the nation's most progressive employment and tenant protections. The state's personal injury protection (PIP) auto system covers initial medical costs regardless of fault.",
      "Oregon's courts emphasize settlement, and its modified comparative negligence rule is straightforward. The tech corridor between Portland and Hillsboro ('Silicon Forest') sustains a solid business and IP bar, while timber and agriculture anchor rural practice.",
    ],
    finding:
      "The Oregon State Bar's lawyer referral service and public discipline records are the vetting tools. Portland's market is deep; outside the metro, county-court familiarity matters more. For employment matters, Oregon's worker-friendly statutes make specialized counsel especially valuable.",
    fees:
      "Oregon injury contingency fees run about one-third. Portland hourly rates ($275–$475) reflect West Coast costs; rural rates run lower. Land-use and environmental work is typically hourly.",
    legalAid:
      "Legal Aid Services of Oregon (LASO) and the Oregon Law Center provide statewide civil legal aid, with regional offices from Portland to Ontario. St. Andrew Legal Clinic in Portland is a longtime fixture for low-cost family law help. Clinics at Lewis & Clark, the University of Oregon, and Willamette take on environmental, immigration, and small-business matters. The Oregon State Bar's Lawyer Referral Service offers a reduced-fee initial consultation, and its Modest Means Program connects qualifying clients with attorneys at capped rates. Several county bars run their own pro bono nights.",
    courtSystem:
      "Oregon's Circuit Courts — 27 judicial districts — handle nearly all trial work, from felonies to major civil cases. The state also has its own Tax Court, a specialized statewide court for tax disputes that few states maintain. Appeals go to the Court of Appeals, then the seven-justice Supreme Court of Oregon. Justice and municipal courts handle smaller matters. Judges are elected in nonpartisan races. The Tax Court's existence is the practical headline: property and business tax fights get a dedicated forum with judges who live in that subject matter, so tax controversies call for specialists.",
    notableLaws:
      "Oregon was the first state with a Death with Dignity Act, which adds end-of-life dimensions to estate planning — your estate lawyer should be comfortable with advance directives in this framework. Second, marijuana is fully legal, but employment law is still catching up: recent rules limit how employers can act on off-duty cannabis use, a fast-moving area where HR-side and employee-side counsel disagree sharply. Third, Oregon imposes strict liability for dog bites — the 'one free bite' rule doesn't exist here — so dog-attack cases are more straightforward for plaintiffs, though damages still need a lawyer who documents scarring and trauma properly.",
  },
  {
    name: "Pennsylvania",
    slug: "pennsylvania",
    region: "the Northeast",
    intro: [
      "Pennsylvania's choice no-fault auto system forces every driver to pick 'limited tort' or 'full tort' coverage — a decision most people make without understanding it, and one that determines their rights after a crash. Philadelphia and Pittsburgh attorneys spend enormous energy explaining and litigating this choice.",
      "The state's energy sector (Marcellus Shale gas), healthcare giants, and manufacturing base create diverse specialty work. Pennsylvania's courts are known for substantial jury verdicts in Philadelphia, balanced by more conservative venues elsewhere — venue strategy matters here.",
    ],
    finding:
      "The Pennsylvania Bar Association's referral service and the Disciplinary Board's public records are essential. Your first question for any auto accident lawyer should be about your tort option selection. In Philadelphia, prioritize litigators with actual jury-trial experience in the city's courts.",
    fees:
      "Pennsylvania injury contingency fees run 33–40%. Philadelphia hourly rates ($300–$550) exceed Pittsburgh and rural rates. Fracking and energy lease work is often project-based.",
    legalAid:
      "Philadelphia Legal Assistance and Community Legal Services anchor the state's largest legal aid market, with MidPenn Legal Services covering central Pennsylvania and Northwestern Legal Services the northwest. Legal Aid of Southeastern Pennsylvania serves the Philly suburbs. Law clinics at Penn, Temple, Pitt, and Villanova take cases from immigration to entrepreneurship. The Pennsylvania Bar Association's Lawyer Referral Service routes callers to county-level programs, and Philadelphia's Bar Association runs a well-known Lawyer Referral and Information Service with reduced-fee initial consultations. Many county bar associations also host free legal clinics on housing and family issues throughout the year.",
    courtSystem:
      "Pennsylvania's trial courts are the Courts of Common Pleas in each county, fed by Magisterial District Courts that handle small claims and preliminary hearings. Appeals split in a way few states match: the Superior Court hears most appeals, while the separate Commonwealth Court handles cases involving state government, agencies, and local government disputes. The seven-justice Supreme Court of Pennsylvania tops the system. All judges — including Supreme Court justices — are elected in partisan elections, making Pennsylvania's judiciary one of the most electorally accountable in the nation.",
    notableLaws:
      "Pennsylvania's 2011 'fair share' reform ended full joint-and-several liability for most defendants: anyone found less than 60% at fault generally pays only their share. That makes fault allocation — not just total damages — the decisive fight, and you want a litigator who builds the allocation case early. Second, medical malpractice plaintiffs must file a certificate of merit from a qualified expert, a gatekeeping step that kills unprepared cases. Third, the Tincher decision replaced the old Azzarello test for product defects with a risk-utility standard — product-liability counsel must be current on which test the courts are actually applying.",
  },
  {
    name: "Rhode Island",
    slug: "rhode-island",
    region: "New England",
    intro: [
      "America's smallest state has a legal community to match — Providence attorneys often know every judge in the state, and cases move through the compact court system quickly. Maritime and waterfront issues reflect the state's coastal identity, while its universities and hospitals add education and healthcare work.",
      "Rhode Island follows pure comparative negligence, the most plaintiff-friendly fault standard. The bar's small size encourages practical resolutions, and many attorneys handle a broader mix of matters than their big-state counterparts.",
    ],
    finding:
      "The Rhode Island Bar Association's lawyer referral service covers the whole state easily. Given the bar's size, personal reputation is well known — ask for recommendations, then verify standing independently. Most matters can be handled by Providence-based attorneys regardless of where in the state you live.",
    fees:
      "Rhode Island contingency fees run about one-third. Hourly rates ($225–$375) are moderate for New England. The compact market keeps overhead — and fees — reasonable.",
    legalAid:
      "Rhode Island Legal Services is the statewide civil legal aid provider, handling housing, family, and benefits cases from Providence. Roger Williams University School of Law clinics take on immigration, criminal defense, and business matters. The Rhode Island Bar Association's Lawyer Referral Service includes reduced-fee panels for qualifying callers, and its Pro Bono Collaborative matches corporate attorneys with nonprofits. The Volunteer Lawyer Program places cases with private attorneys statewide, and several community organizations run legal clinics focused on the state's immigrant and refugee populations.",
    courtSystem:
      "Rhode Island's Superior Court is the main trial court, with District Court, Family Court, and a Workers' Compensation Court handling specialized dockets, plus a Traffic Tribunal for driving offenses. The five-justice Supreme Court of Rhode Island is the final word. Here's the rarity: Rhode Island judges are appointed by the governor with legislative confirmation and serve for LIFE — like federal judges, a practice shared with only one or two other states. That tenure shapes the bench's independence. Practically, the Traffic Tribunal means even routine driving cases get a dedicated forum with its own procedures.",
    notableLaws:
      "Rhode Island's wrongful death statute restricts who can sue — generally only a spouse, children, or parents — which is narrower than many states and can end a claim before it starts; confirm standing in the first meeting. Second, traffic offenses go to the separate Traffic Tribunal rather than regular criminal court, so a DUI or license matter needs a lawyer who actually practices there. Third, the state's old housing stock keeps lead-paint liability active: Providence enforces strict lead-safe rules, and landlords face real exposure — tenant-injury cases here reward attorneys who know the inspection and enforcement regime.",
  },
  {
    name: "South Carolina",
    slug: "south-carolina",
    region: "the South",
    intro: [
      "South Carolina's manufacturing boom — BMW, Boeing, and their suppliers — has transformed the Upstate's legal market, while Charleston's tourism and port drive hospitality, maritime, and real estate work. Columbia anchors government and university-related practice.",
      "The state follows modified comparative negligence (51% bar). Construction-defect litigation is a notable local specialty given the building boom, and the coastal counties generate steady insurance and storm-claim work.",
    ],
    finding:
      "The South Carolina Bar's lawyer referral service is the main public resource. In the Upstate, look for attorneys experienced with manufacturing and commercial matters; in Charleston, tourism and real estate familiarity matters. Verify standing through the state bar's public records.",
    fees:
      "South Carolina injury contingency fees run about one-third. Charleston and Greenville hourly rates ($225–$400) lead the state. Construction-defect cases are often contingency or hybrid.",
    legalAid:
      "South Carolina Legal Services operates statewide with offices from Greenville to Charleston, covering housing, family, and consumer cases. Charleston Pro Bono Legal Services is a standout local program matching volunteer attorneys with low-income clients. The USC School of Law runs clinics in areas from domestic violence to nonprofit formation. The South Carolina Bar's Lawyer Referral Service connects callers with attorneys by county, and the Appleseed Legal Justice Center tackles systemic issues like predatory lending. Several Upstate programs focus on the manufacturing workforce's wage and injury concerns.",
    courtSystem:
      "South Carolina's Circuit Courts are the main trial courts, above magistrate and municipal courts, with Masters-in-Equity — a distinctive office — handling foreclosures and equity matters in many counties. Appeals go to the Court of Appeals, then the five-justice Supreme Court of South Carolina. The headline rarity: South Carolina judges are elected by the LEGISLATURE, not by voters — a practice shared only with Virginia. That makes judicial selection an insider process, and it means courthouse relationships and reputations carry unusual weight in how cases are perceived.",
    notableLaws:
      "South Carolina caps punitive damages (generally the greater of three times compensatory damages or $500,000), so skilled plaintiffs' lawyers build the compensatory case relentlessly — ask how a firm has maximized verdicts within the cap. Second, boating under the influence (BUI) is a serious criminal offense with civil overlap on the coast; Charleston's waterways generate cases that need counsel handling both tracks. Third, the eight-year statute of repose for construction defects sets a hard deadline that complements the state's busy construction-defect docket — if your building problem is aging, the clock may already be running.",
  },
  {
    name: "South Dakota",
    slug: "south-dakota",
    region: "the Midwest",
    intro: [
      "South Dakota is America's quiet trust-law powerhouse — its favorable dynasty-trust statutes draw billions in trust assets from across the country, sustaining a sophisticated Sioux Falls trust bar with national clientele. No income tax and a business-friendly climate add financial-services work.",
      "For residents, the legal market covers agriculture, healthcare (Sanford Health), and the usual mix of injury and family matters across vast rural distances. The state's small bar is notably practical and settlement-oriented.",
    ],
    finding:
      "The State Bar of South Dakota's referral resources cover the state. For trust and estate matters — the state's signature specialty — prioritize Sioux Falls attorneys with specific trust-administration experience. Rural clients should confirm the attorney will travel to their county.",
    fees:
      "South Dakota rates are modest: injury contingency around one-third, hourly $175–$300. Trust administration is often asset-based or hourly given the high stakes involved.",
    legalAid:
      "South Dakota's free legal help runs through three nonprofits coordinated by the SD Law Help portal, where one application is routed to the right program. East River Legal Services in Sioux Falls covers 33 eastern counties with family, housing, and benefits cases. Dakota Plains Legal Services, headquartered in Mission, serves western counties and nine tribal nations with deep experience in Indian Child Welfare Act matters. The University of South Dakota Knudson School of Law in Vermillion also runs clinics that take select civil cases, a useful option in a state with so few lawyers per square mile.",
    courtSystem:
      "South Dakota has no intermediate appellate court, which shapes litigation strategy: appeals from the trial-level Circuit Courts (organized into seven judicial circuits covering the whole state) go directly to the South Dakota Supreme Court in Pierre. Magistrate Courts handle misdemeanors, small claims, and preliminary hearings. All judges are chosen in nonpartisan elections, so judicial philosophy can shift with the electorate — attorneys who practice regularly before a particular circuit's judges know their tendencies, which matters when your appeal has only one shot.",
    notableLaws:
      "Three South Dakota laws change who you should hire. First, the state has no personal or corporate income tax, so business and estate attorneys here structure deals differently than in tax-heavy states — confirm yours understands multi-state tax exposure. Second, voters legalized medical cannabis in 2020, creating ongoing employment and landlord-tenant disputes as workplaces adapt. Third, South Dakota's minimum wage ($11.20 in 2025, indexed annually) sits well above the federal floor, so wage-and-hour attorneys see real cases here — ask about their track record with state Department of Labor claims.",
  },
  {
    name: "Tennessee",
    slug: "tennessee",
    region: "the South",
    intro: [
      "Tennessee's dual economic engines — Nashville's healthcare and music industries, Memphis's logistics hub — create distinctive legal specialties: healthcare regulatory work, entertainment contracts, and transportation law. The state follows modified comparative fault with a 50% bar.",
      "Tennessee has no wage income tax, attracting relocations that drive real estate and estate planning work. Its courts are known for efficient dockets, and the state's tort reform history means damage caps apply in certain case types — something any injury lawyer here must navigate.",
    ],
    finding:
      "The Tennessee Bar Association's referral service and the Board of Professional Responsibility's public records are the vetting tools. In Nashville, match healthcare or entertainment specialists to those matters; in Memphis, transportation and logistics familiarity matters. Ask about damage-cap implications early in injury cases.",
    fees:
      "Tennessee injury contingency fees run about one-third, with tort-reform caps affecting case valuation. Nashville hourly rates ($250–$450) lead the state. Entertainment contracts are often flat-fee or percentage-based.",
    legalAid:
      "Tennessee divides free civil legal help by region, and knowing which office covers you saves time. The Legal Aid Society of Middle Tennessee and the Cumberlands (Nashville) serves 48 counties, Legal Aid of East Tennessee covers Knoxville and Chattanooga, West Tennessee Legal Services handles the Jackson area, and Memphis Area Legal Services covers Shelby County. The Tennessee Alliance for Legal Services coordinates statewide, and both Vanderbilt and the University of Tennessee law schools run clinics — the UT clinic is especially active in Knoxville-area housing and consumer cases.",
    courtSystem:
      "Tennessee's trial courts come in three flavors: Circuit Courts (civil jury trials), Chancery Courts (equity, business, and family matters without juries), and Criminal Courts — knowing which one hears your case type determines the procedure your lawyer must master. Appeals go to the Court of Appeals or Court of Criminal Appeals, then the five-justice Tennessee Supreme Court. Under the 'Tennessee Plan,' the governor appoints appellate judges from a nominating commission's list, and voters then decide in retention elections whether they stay.",
    notableLaws:
      "Tennessee's 2011 Civil Justice Act caps noneconomic damages at $750,000 ($1 million for catastrophic injuries like paralysis or disfigurement), so injury attorneys must value cases within those ceilings — ask how caps affect your specific claim. The 2013 workers' compensation overhaul moved disputes into the administrative Court of Workers' Compensation Claims, meaning comp cases need specialists in that forum, not general litigators. And with the Hall income tax fully repealed in 2021, Tennessee now has no wage income tax at all, which reshaped estate planning — make sure your planner updated strategies post-repeal.",
  },
  {
    name: "Texas",
    slug: "texas",
    region: "the South Central",
    intro: [
      "Texas has the second-largest bar in America and a legal culture all its own. Tort reform laws cap certain damages, the state is community property (affecting every divorce's asset division), and its energy sector generates oil, gas, and wind work found nowhere else at this scale. Houston, Dallas, San Antonio, and Austin each anchor massive, distinct legal markets.",
      "Texas follows modified comparative fault with a 51% bar. The state's courts move enormous dockets, and its business-friendly reputation keeps corporate filings, commercial litigation, and startup work flowing — particularly in Austin's tech boom and Dallas's corporate corridor.",
    ],
    finding:
      "The State Bar of Texas (the nation's largest mandatory bar) offers referral services and public discipline records — use both. Texas's size demands metro-specific counsel: Houston for energy, Dallas for corporate, Austin for tech, San Antonio for military and healthcare. Verify the attorney practices regularly in your county's courts.",
    fees:
      "Texas injury contingency fees run 33–40%, with tort-reform caps shaping case selection. Major-metro hourly rates ($300–$600) reflect the market's scale; smaller cities run lower. Energy and oilfield work often uses hybrid arrangements.",
    legalAid:
      "Texas has three giant Legal Services Corporation-funded programs, each covering a territory the size of a midwestern state: Lone Star Legal Aid (Houston, 72 eastern and Gulf Coast counties), Legal Aid of NorthWest Texas (Fort Worth, 114 northern and western counties), and Texas RioGrande Legal Aid (68 southern and western counties, strong in border communities). TexasLawHelp.org is the statewide directory and forms library. For veterans, the Texas Lawyers for Texas Veterans program runs free advice clinics statewide, and metro pro bono groups like Houston Volunteer Lawyers and the Dallas Volunteer Attorney Program match clients with volunteer attorneys.",
    courtSystem:
      "Texas is one of only two states with bifurcated courts of last resort: the nine-justice Texas Supreme Court decides civil cases while the nine-judge Court of Criminal Appeals has the final word on criminal matters — so a criminal appeal and a civil appeal follow entirely different tracks at the top. Below them sit 14 intermediate Courts of Appeals and roughly 470 District Courts as the main trial courts. Every Texas judge, from JP courts to the high courts, is chosen in partisan elections, which is why judicial races here draw national money and attention.",
    notableLaws:
      "Texas tort reform shapes hiring more than in any other large state. The 2003 reforms cap noneconomic damages in medical malpractice cases ($250,000 per institution), so med-mal attorneys screen cases ruthlessly — ask about their recent med-mal verdicts, not just settlements. Texas also has America's strongest homestead protection: the homestead exemption has no dollar cap, which makes the state a magnet for asset-protection planning and changes bankruptcy strategy entirely. And Texas Rule of Civil Procedure 167 creates a 'loser pays' offer-of-settlement mechanism — rejecting a reasonable settlement offer can stick you with the other side's fees, so you want a litigator with real trial experience, not a settler.",
  },
  {
    name: "Utah",
    slug: "utah",
    region: "the Mountain West",
    intro: [
      "Utah's 'Silicon Slopes' tech boom has created one of the West's fastest-growing business-law markets, with Salt Lake City firms handling startups, venture financings, and tech employment matters. The state runs a no-fault auto insurance system with personal injury protection thresholds that shape every crash case.",
      "Utah's young population and high birth rate drive family-law demand, while outdoor recreation — skiing, national parks — generates distinctive injury and liability work. The state's courts are known for efficiency and strong mediation programs.",
    ],
    finding:
      "The Utah State Bar's lawyer referral service and public discipline records are the starting points. In Salt Lake City's competitive market, match specialists to matters — tech startups to business boutiques, injury cases to high-volume litigators. Ask about the no-fault threshold's effect on your auto case.",
    fees:
      "Utah injury contingency fees run about one-third. Salt Lake City hourly rates ($250–$425) are moderate for a growth market. Startup packages (formation + basic contracts) are commonly flat-fee.",
    legalAid:
      "Utah Legal Services has provided free civil help statewide since 1976, with offices from Logan to St. George handling housing, family, consumer, and benefits cases. The Legal Aid Society of Salt Lake focuses on the Wasatch Front's family and domestic-violence docket, while the Disability Law Center protects the rights of Utahns with disabilities. Both the University of Utah's S.J. Quinney College of Law and BYU Law run clinics — Quinney's clinics are particularly active in immigration and environmental matters, reflecting the school's strengths.",
    courtSystem:
      "Utah's trial courts are the District Courts, organized into eight judicial districts, with separate Juvenile Courts handling youth and family matters. Appeals go first to the Utah Court of Appeals and then to the five-justice Utah Supreme Court. Judges are chosen through merit selection — a nominating commission screens candidates and the governor appoints — followed by nonpartisan retention elections where voters decide whether each judge keeps the job. The system is designed to insulate judges from campaign politics, producing a notably stable and professional bench.",
    notableLaws:
      "Utah is a trust-deed state, meaning most home loans allow nonjudicial foreclosure — lenders can foreclose without going to court, so distressed homeowners need real estate attorneys who know how to challenge wrongful foreclosures administratively. Utah's liquor laws remain among the nation's strictest, with the state-run Department of Alcoholic Beverage Services controlling sales; hospitality businesses need licensing counsel who navigates that system regularly. And Utah's 2024 Minor Protection in Social Media Act imposes age-verification duties on platforms, creating new compliance work for the Silicon Slopes tech companies your attorney may advise or oppose.",
  },
  {
    name: "Vermont",
    slug: "vermont",
    region: "New England",
    intro: [
      "Vermont's small, close-knit bar serves a largely rural population from Burlington, Montpelier, and Rutland. Dairy farming, tourism (skiing, fall foliage), and a growing artisan-food economy define the commercial caseload, while the state's progressive policies create distinctive employment and environmental work.",
      "Vermont's courts emphasize mediation and restorative approaches, and its modified comparative negligence rule is straightforward. The bar's collegiality tends to produce reasonable settlements without scorched-earth tactics.",
    ],
    finding:
      "The Vermont Bar Association's lawyer referral service covers the state. Given the small bar, attorney reputation is widely known — but verify standing independently. For agricultural or land-use matters, hire lawyers who understand Vermont's Act 250 development-review process.",
    fees:
      "Vermont rates are moderate: injury contingency around one-third, hourly $200–$325. Land-use and Act 250 work is typically hourly given its regulatory complexity.",
    legalAid:
      "Vermont Legal Aid, a nonprofit law firm founded in 1968 and based in Burlington, runs 11 projects covering disability rights, elder law, housing discrimination, health care advocacy, and poverty law — all free. Its partner, Legal Services Vermont, shares intake through VTLawHelp.org, so one application reaches both organizations. Law Line of Vermont offers phone advice, and Vermont Free Legal Answers is a virtual clinic where income-eligible users get volunteer attorneys' answers online. Vermont Law and Graduate School in South Royalton also operates clinics serving the Upper Valley.",
    courtSystem:
      "Vermont has no intermediate appellate court: the Superior Court — uniquely organized into five divisions (Civil, Criminal, Family, Probate, and Environmental, the last being rare nationally) — tries cases, and appeals go straight to the five-justice Vermont Supreme Court. Judges are appointed by the governor and then face retention votes by the General Assembly, a legislative-retention model used by almost no other state. The Environmental Division's specialized judges hear Act 250 land-use appeals, so development disputes get genuinely expert adjudication.",
    notableLaws:
      "Vermont's Act 250 (1970) subjects most commercial development to a 10-criterion state review covering everything from water quality to scenic impact — land-use attorneys who have actually argued Act 250 cases are essential for any project, and the existing state page only scratches the surface. Vermont's 2018 data-broker law was the first in the nation to require data brokers to register with the state, creating privacy compliance work. And since retail cannabis sales began in 2022, a new licensing bar has emerged around the Cannabis Control Board's rules — ask prospective business attorneys how many license applications they have actually filed.",
  },
  {
    name: "Virginia",
    slug: "virginia",
    region: "the Mid-Atlantic",
    intro: [
      "Virginia is one of the few pure contributory negligence states — any fault on your part can completely bar recovery, making it one of the toughest states for injury plaintiffs and making attorney skill decisive. The DC suburbs (Arlington, Alexandria) host a massive federal-employment, security-clearance, and government-contracts bar.",
      "Richmond anchors finance and state-government work, Virginia Beach and Norfolk serve the military community (the world's largest naval base), and data-center alley in Loudoun County drives tech infrastructure work. Each region needs different counsel.",
    ],
    finding:
      "The Virginia State Bar's referral service and public discipline records are essential. Given the contributory negligence rule, grill any injury lawyer on how they defeat fault defenses — it's the whole ballgame in Virginia. Military families should seek attorneys experienced with SCRA protections and military divorce rules.",
    fees:
      "Virginia injury contingency fees run about one-third, with the contributory negligence risk heavily influencing case selection. Northern Virginia hourly rates ($350–$550) reflect DC-metro costs. Security-clearance work is typically flat-fee.",
    legalAid:
      "Virginia's legal aid map is regional: the Legal Aid Justice Center (Charlottesville) combines direct services with high-impact litigation, the Virginia Legal Aid Society covers central Virginia from Lynchburg, Legal Services of Northern Virginia serves the DC suburbs, the Legal Aid Society of Eastern Virginia covers Hampton Roads, and the Central Virginia and Southwest Virginia societies cover Richmond and Appalachia respectively. The Virginia Lawyer Referral Service offers a 30-minute consultation for $35. Law school clinics at UVA, William & Mary, and George Mason take select cases, particularly in their specialty areas.",
    courtSystem:
      "Virginia's trial courts are the Circuit Courts (120 across the state, the courts of record with jury trials), backed by General District Courts for misdemeanors and smaller civil claims. A landmark 2021 reform gave the Court of Appeals of Virginia jurisdiction over appeals as of right in every case — before that, most criminal and civil appeals were discretionary, a quirk that made Virginia an outlier. At the top sits the seven-justice Supreme Court of Virginia. Uniquely, Virginia judges are elected by the General Assembly itself, not by voters or the governor.",
    notableLaws:
      "Virginia legalized marijuana possession in 2021 but the retail market never launched amid legislative deadlock, leaving a legal gray zone — criminal defense and employment attorneys navigate conflicting rules daily, so ask how current their advice is. The Virginia Consumer Data Protection Act (2023) gives residents opt-out rights over targeted advertising and profiling, generating new privacy work for tech-sector counsel. And Virginia is a right-to-work, at-will employment state with few exceptions, which means wrongful-termination cases face steep odds — employment lawyers here should be candid about that before taking your retainer.",
  },
  {
    name: "Washington",
    slug: "washington",
    region: "the Pacific Northwest",
    intro: [
      "Washington pairs tech giants (Amazon, Microsoft) with a community property system and no income tax — a combination that shapes everything from high-asset divorces in Seattle to startup equity disputes on the Eastside. The state's ports, aerospace industry (Boeing), and agricultural east add further layers.",
      "Washington follows pure comparative negligence, the most plaintiff-friendly standard. Its courts are known for progressive rulings, and the state's strong consumer protection act (with treble damages and attorney's fees) makes it unusually favorable for consumer claims.",
    ],
    finding:
      "The Washington State Bar Association's referral service and public discipline records are the vetting tools. Seattle's market is deep but pricey; match tech-employment specialists to those matters and high-asset family lawyers to complex divorces. Eastern Washington matters need attorneys who know those courts.",
    fees:
      "Washington injury contingency fees run 33–40%. Seattle hourly rates ($350–$600) are West Coast-level; Spokane and Tacoma run lower. The consumer protection act's fee-shifting means some consumer lawyers work on contingency.",
    legalAid:
      "The Northwest Justice Project is Washington's largest civil legal aid provider, with offices statewide handling housing, family safety, and benefits cases. Columbia Legal Services focuses on systemic impact litigation for low-income communities. In King County, the Bar Association's Pro Bono Services program fields over 1,400 volunteer lawyers, paralegals, and law students. The state-funded Office of Civil Legal Aid coordinates the system. Law school clinics at the University of Washington, Seattle University, and Gonzaga take cases in their specialty areas, from immigration to tribal law.",
    courtSystem:
      "Washington's Superior Courts — one for each of the 39 counties — are the trial courts of general jurisdiction handling felonies, major civil cases, and family law. Appeals go to the Court of Appeals, organized into three geographic divisions, and then to the nine-justice Washington Supreme Court in Olympia. All judges are chosen in nonpartisan elections, and Washington is known for an independent-minded judiciary whose rulings on privacy and consumer protection frequently lead the nation and get cited elsewhere by other courts.",
    notableLaws:
      "Washington's My Health My Data Act (2024) is the broadest health-privacy law in America, covering far more than HIPAA — tech and health-care businesses need attorneys who understand its private right of action. The state's 7% capital gains tax (2021) on high earners reshaped estate and business planning despite having no income tax otherwise. And the WA Cares program imposes a 0.58% payroll tax for long-term care, with opt-out rules that tripped up thousands of workers — employment attorneys field constant questions about exemptions and refunds.",
  },
  {
    name: "West Virginia",
    slug: "west-virginia",
    region: "the Mid-Atlantic",
    intro: [
      "West Virginia's legal market is inseparable from its energy heritage — coal, natural gas, and now renewable projects generate mineral-rights, workplace-injury, and environmental work centered in Charleston. The state's healthcare sector and the opioid crisis's legal aftermath have also shaped a distinctive pharmaceutical-litigation bar.",
      "West Virginia follows modified comparative negligence (50% bar). Its courts have a reputation for substantial plaintiff verdicts in certain venues, balanced by ongoing tort-reform debates in the legislature.",
    ],
    finding:
      "The West Virginia State Bar's referral service is the main resource. For energy, mineral-rights, or workplace-injury matters, prioritize Charleston attorneys with genuine industry experience. Pharmaceutical and mass-tort cases belong with firms that have handled them before.",
    fees:
      "West Virginia contingency fees run about one-third. Hourly rates ($200–$325) are modest. Mineral-rights title work is often volume-priced; mass-tort cases are contingency-based.",
    legalAid:
      "Legal Aid of West Virginia is the statewide provider, with a dozen offices from Martinsburg to Huntington covering family, housing, benefits, and consumer cases. West Virginia Senior Legal Aid in Charleston focuses specifically on the legal needs of residents 60 and older, including elder exploitation. The West Virginia University College of Law in Morgantown runs clinics — its general practice and entrepreneurship clinics take real client matters — giving the state's northern counties an extra resource beyond the Charleston-centered bar.",
    courtSystem:
      "West Virginia's trial courts are the Circuit Courts, which handle felonies, major civil cases, and family matters. In a major 2021 reform, the state created an Intermediate Court of Appeals, which began hearing cases in 2022 — ending West Virginia's long run as one of the few states where every appeal went straight to the top court. The five-justice Supreme Court of Appeals of West Virginia remains the court of last resort. Since 2016, judges have been chosen in nonpartisan elections rather than partisan ones.",
    notableLaws:
      "West Virginia's 'deliberate intent' statute (W.Va. Code 23-4-2) lets injured workers sue employers outside workers' compensation in narrow cases where the employer acted with conscious, deliberate intent — a rare exception to comp exclusivity that makes workplace-injury attorney selection critical here. The state's courts have developed a distinctive body of law interpreting broad-form mineral deeds, so anyone with coal, gas, or timber interests needs counsel steeped in that case law. And as the epicenter of the opioid crisis, West Virginia generated the nation's largest pharmaceutical settlements, sustaining a specialized mass-tort bar worth seeking out for complex injury claims.",
  },
  {
    name: "Wisconsin",
    slug: "wisconsin",
    region: "the Midwest",
    intro: [
      "Wisconsin's dairy heritage and manufacturing base (Milwaukee tools, paper, brewing) sustain a legal market split between Milwaukee's corporate firms and Madison's government and university work. The state is one of the few with a form of community property (marital property law), which distinctly shapes Wisconsin divorces.",
      "Wisconsin follows modified comparative negligence (51% bar). Its courts are known for fairness and efficiency, and the state's relatively low cost of living keeps legal fees reasonable across practice areas.",
    ],
    finding:
      "The State Bar of Wisconsin's lawyer referral service and public discipline records are the starting points. Because Wisconsin's marital property system differs from most states' equitable distribution, divorce attorneys here need specific local expertise — confirm it directly.",
    fees:
      "Wisconsin injury contingency fees run about one-third. Milwaukee hourly rates ($225–$400) lead the state; Madison is close behind. Dairy and agricultural business work is often flat-fee or project-based.",
    legalAid:
      "Wisconsin splits free civil help geographically: Legal Action of Wisconsin (Milwaukee) covers the southern 39 counties with housing, family, and consumer work, while Wisconsin Judicare (Wausau) covers the northern 33 counties. The Legal Aid Society of Milwaukee handles the city's highest-need cases. Both the University of Wisconsin Law School in Madison and Marquette Law School in Milwaukee run clinics — Marquette's are especially active in Milwaukee County criminal and civil matters, while UW's clinics serve the Dane County area extensively.",
    courtSystem:
      "Wisconsin's trial courts are the Circuit Courts — 69 circuits covering all 72 counties — which hear everything from felonies to divorces to civil jury trials. Appeals go to the Court of Appeals, organized into four districts, and then to the seven-justice Wisconsin Supreme Court. Justices are chosen in nonpartisan elections, but Wisconsin's Supreme Court races have become famously expensive national battlegrounds — the 2023 contest drew tens of millions in spending — so the court's composition and direction can shift dramatically with a single election.",
    notableLaws:
      "Wisconsin's Lemon Law is among the nation's strongest, covering new vehicles for a year or 18,000 miles and awarding attorney's fees to prevailing consumers — which is why consumer attorneys here take these cases on contingency. The state's OWI (DUI) regime is unusually strict: absolute sobriety is required for drivers under 21, ignition interlock devices are mandatory for many offenders, and a fourth offense is a felony — ask any criminal defense lawyer about their specific OWI trial record. And Wisconsin Statute 103.465 voids noncompete agreements that aren't 'reasonably necessary,' a fact-specific test that makes employment attorneys' local case knowledge decisive.",
  },
  {
    name: "Wyoming",
    slug: "wyoming",
    region: "the Mountain West",
    intro: [
      "Wyoming markets itself as the 'Delaware of the West' for business formations — no income tax, low fees, and strong privacy protections draw LLC filings from across the country, sustaining a Cheyenne business-formation bar. Energy (coal, gas, wind) and tourism (Yellowstone, Jackson Hole) round out the commercial picture.",
      "For residents, the legal market covers ranching, outdoor-recreation injuries, and family matters across vast distances. Wyoming follows modified comparative negligence, and its small bar is known for straight dealing.",
    ],
    finding:
      "The Wyoming State Bar's referral service covers the state. For business formations, Cheyenne specialists handle out-of-state filings routinely — but understand what Wyoming formation does and doesn't do for your tax situation. Rural matters need attorneys willing to travel Wyoming's long distances.",
    fees:
      "Wyoming rates are modest: injury contingency around one-third, hourly $200–$325. LLC formation packages are commonly flat-fee and inexpensive — the state's main selling point.",
    legalAid:
      "Legal Aid of Wyoming provides free civil legal help statewide from offices in Cheyenne, Casper, and Lander, covering family, housing, and consumer matters across the state's vast distances. The University of Wyoming College of Law in Laramie — the state's only law school — operates clinics including a Civil Legal Services Clinic that takes real cases, an important resource given Wyoming's tiny bar. Because the state is so sparsely populated, many legal aid attorneys serve clients by phone and video, a practice Wyoming courts have embraced.",
    courtSystem:
      "Wyoming's trial courts of general jurisdiction are the nine District Courts, with Circuit Courts handling misdemeanors, small claims, and preliminary matters below them. There is no intermediate appellate court — appeals go directly to the five-justice Wyoming Supreme Court in Cheyenne. Judges are chosen through merit selection: a Judicial Nominating Commission screens applicants, the governor appoints, and voters then decide in retention elections whether each judge stays. The small docket means the Supreme Court often decides cases quickly and thoroughly.",
    notableLaws:
      "Wyoming is an open-range, 'fence-out' state: livestock owners are generally not liable when cattle roam onto unfenced land, which flips the liability assumptions outsiders bring to property-damage and auto-collision cases — hire attorneys who actually know range law. The state's LLC privacy protections (no public listing of members) plus strong charging-order protection are why Wyoming markets itself as the 'Delaware of the West' — but formation attorneys should explain what Wyoming law does and doesn't shield you from in your home state. And Wyoming's $1-per-megawatt-hour wind generation tax uniquely shapes energy deals here.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

/** Four distinct FAQ sets, rotated across state pages for content variety. */
export const STATE_FAQ_SETS: ((state: string) => Faq[])[] = [
  (s) => [
    {
      q: `How do I find a good attorney in ${s}?`,
      a: `Start with your legal issue, then find ${s}-licensed attorneys focused on that practice area. Verify licensing and discipline history through the state bar, read client reviews, and meet for a consultation. Ask who will handle your case day-to-day and how many similar cases the firm handled last year.`,
    },
    {
      q: `How much does a lawyer cost in ${s}?`,
      a: `Personal injury and workers' comp lawyers usually work on contingency — no upfront fee, roughly a third of your recovery. Criminal defense, divorce, and business lawyers typically charge hourly ($200–$500+) or flat fees. Always get a written fee agreement before work begins.`,
    },
    {
      q: `Do ${s} attorneys offer free consultations?`,
      a: `Many do, especially for personal injury, criminal defense, and bankruptcy. Some family and business lawyers charge a consultation fee, occasionally credited toward your case. Ask when you call, and use the meeting to evaluate communication style — not just price.`,
    },
    {
      q: `What should I bring to my first lawyer meeting in ${s}?`,
      a: `Bring everything relevant: contracts, court papers, police reports, medical records, photos, correspondence, and a timeline of events. Organized documents let the attorney give you a realistic assessment in one meeting instead of three.`,
    },
  ],
  (s) => [
    {
      q: `Can I handle my legal issue in ${s} without a lawyer?`,
      a: `For minor matters like small claims court, possibly. But anything involving significant money, your freedom, your children, or immigration status deserves professional help. Most legal mistakes cost far more to fix than a lawyer would have cost upfront.`,
    },
    {
      q: `How long will my case take in ${s}?`,
      a: `It varies widely: uncontested matters can resolve in weeks, while contested litigation often takes 12–24 months. Ask any attorney for a realistic timeline based on your county's docket — and be wary of anyone who guarantees a fast outcome.`,
    },
    {
      q: `What is the attorney-client privilege in ${s}?`,
      a: `Communications with your lawyer about your case are confidential and generally cannot be disclosed without your permission. This protection applies from the first consultation, even if you don't hire the attorney — so you can speak freely when seeking advice.`,
    },
    {
      q: `How do I check a ${s} lawyer's disciplinary record?`,
      a: `Every state bar maintains public attorney discipline records online. Search the lawyer's name on your state bar's website before hiring — it takes two minutes and reveals suspensions, reprimands, or malpractice history that reviews won't mention.`,
    },
  ],
  (s) => [
    {
      q: `What's the difference between a lawyer and an attorney in ${s}?`,
      a: `In the US the terms mean the same thing — a person licensed to practice law. What matters more is specialization: a lawyer who handles ${s} personal injury cases daily will outperform a generalist. Always ask about focus area, not just years licensed.`,
    },
    {
      q: `Will my ${s} case go to trial?`,
      a: `Probably not — over 90% of civil cases settle before trial. But the best settlements go to lawyers known for being trial-ready. Ask about the firm's actual trial experience; attorneys who never try cases often accept lower offers.`,
    },
    {
      q: `Can I switch lawyers in the middle of my ${s} case?`,
      a: `Yes, you generally have the right to change attorneys at any time, though you may owe fees for work already done and the new lawyer needs time to get up to speed. If communication has broken down, switching sooner beats suffering through it.`,
    },
    {
      q: `What questions should I ask before hiring a ${s} attorney?`,
      a: `Ask: How many cases like mine have you handled? Who does the actual work — you or a junior? What's the fee structure in writing? What's a realistic timeline and outcome range? How will we communicate? Clear, specific answers signal a professional worth hiring.`,
    },
  ],
  (s) => [
    {
      q: `Do I need a local ${s} attorney, or can I hire from anywhere?`,
      a: `For most matters, hire locally. Court procedures, filing rules, and even unwritten customs vary by county, and local attorneys know the judges and opposing counsel. Out-of-state lawyers must usually associate with local counsel anyway — so start local.`,
    },
    {
      q: `What does 'statute of limitations' mean for my ${s} case?`,
      a: `It's the legal deadline to file your claim — miss it and you lose the right to sue, no matter how strong your case. Deadlines vary by claim type and state, from one year to several. Never assume you have time; confirm your deadline immediately.`,
    },
    {
      q: `How are legal fees structured in ${s}?`,
      a: `Three main models: contingency (percentage of winnings, common in injury cases), hourly (pay for time worked, common in defense and business), and flat fee (fixed price, common for wills and uncontested matters). Get the structure and all potential costs in writing upfront.`,
    },
    {
      q: `What if I can't afford a lawyer in ${s}?`,
      a: `Options exist: contingency fees mean no upfront cost in injury cases; legal aid societies help qualifying low-income residents; many bar associations run reduced-fee referral programs; and in criminal cases, the court must appoint counsel if you can't afford one.`,
    },
  ],
];

export const ALL_STATES: StateInfo[] = [...STATES, ...STATES_2];

export interface PracticeArea {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  /** 2-3 sentence direct definition (GEO: AI engines quote concise definitions). */
  directAnswer: string;
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
      "Find a personal injury lawyer near you. Contingency fees, what to ask before hiring, and FAQs — explained plainly.",
    directAnswer:
      "What does a personal injury lawyer do? A personal injury lawyer represents people hurt by someone else's negligence — car crashes, slip-and-falls, defective products — proving fault, documenting losses, and negotiating with insurers for full compensation. Most work on contingency, so you pay nothing upfront.",
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
        a: "Almost all work on contingency — typically about 33% of your settlement, sometimes more if the case goes to trial. You pay nothing upfront, and if you lose, you usually owe no attorney's fee. Ask how case expenses like expert witnesses are handled.",
      },
      {
        q: "How long do I have to file a personal injury claim?",
        a: "Every state sets a statute of limitations, commonly 2–3 years from the injury date, but some allow as little as one year. Miss the deadline and you lose the right to sue entirely — so consult a lawyer promptly after any accident.",
      },
      {
        q: "What is my personal injury case worth?",
        a: "Value depends on medical costs, lost income, injury severity and permanence, and how clearly the other party was at fault. Minor cases may settle for thousands; catastrophic injuries can reach millions. A lawyer evaluates this at a free consultation.",
      },
      {
        q: "Should I accept the insurance company's first offer?",
        a: "Rarely — first offers are usually far below fair value, and accepting one typically waives all future claims from the accident. Never sign anything without having a lawyer review the offer first.",
      },
    ],
  },
  {
    slug: "divorce-attorney",
    title: "Divorce Attorney",
    shortTitle: "Divorce",
    metaDescription:
      "Find a divorce attorney near you. Custody, support, property division, fees and timelines — explained plainly.",
    directAnswer:
      "What does a divorce attorney do? A divorce attorney handles the legal end of a marriage — dividing property and debts, arranging child custody and support, and negotiating alimony. Even in amicable splits, a lawyer protects you from signing away rights you didn't know you had.",
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
        a: "Uncontested divorces can finalize in a few months. Contested cases with custody or property disputes often take 9–18 months; high-conflict cases run longer. Your state's mandatory waiting period sets the minimum timeline.",
      },
      {
        q: "Do I need a lawyer for an uncontested divorce?",
        a: "Strongly recommended. Even when you agree on everything, a lawyer ensures the settlement is fair, the paperwork is correct, and you don't accidentally waive rights to property, support, or retirement benefits.",
      },
      {
        q: "How is child custody decided?",
        a: "Courts use the child's best interests: each parent's bond with the child, home stability, the child's needs and preferences when old enough, and any history of abuse. Joint custody is common when both parents are fit.",
      },
      {
        q: "Contested vs. uncontested divorce — what's the difference?",
        a: "Uncontested means you agree on everything and the court approves your settlement — faster and cheaper. Contested means at least one issue is disputed and must be negotiated or decided by a judge.",
      },
    ],
  },
  {
    slug: "criminal-defense-attorney",
    title: "Criminal Defense Attorney",
    shortTitle: "Criminal Defense",
    metaDescription:
      "Find a criminal defense attorney near you. Your rights after arrest, fees, plea bargains and FAQs — explained plainly.",
    directAnswer:
      "What does a criminal defense attorney do? A criminal defense attorney protects people accused of crimes — from misdemeanors to serious felonies — by challenging the prosecution's evidence, negotiating plea deals, and defending at trial. If you've been arrested, getting a lawyer early can change the entire outcome.",
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
        a: "Stay calm, state clearly that you want a lawyer, then remain silent. Don't answer questions, consent to searches, or try to explain — anything you say can be used against you. Call a criminal defense attorney immediately.",
      },
      {
        q: "Misdemeanor vs. felony — what's the difference?",
        a: "Misdemeanors are less serious, usually punishable by up to a year in county jail plus fines. Felonies carry a year or more in state prison, plus long-term consequences like losing voting or firearm rights in many states.",
      },
      {
        q: "Can criminal charges be dropped or dismissed?",
        a: "Yes — for lack of evidence, constitutional violations like illegal searches, witness problems, or successful pretrial motions. A skilled defense lawyer hunts for every path to dismissal before trial.",
      },
      {
        q: "What is a plea bargain?",
        a: "An agreement where you plead guilty — usually to a lesser charge — for a lighter sentence. Most criminal cases end in plea deals, not trials. Your lawyer negotiates the best terms or advises taking the case to trial.",
      },
    ],
  },
  {
    slug: "immigration-attorney",
    title: "Immigration Attorney",
    shortTitle: "Immigration",
    metaDescription:
      "Find an immigration attorney near you. Visas, green cards, citizenship, asylum and deportation defense — explained plainly.",
    directAnswer:
      "What does an immigration attorney do? An immigration attorney guides people through U.S. immigration law — visas, green cards, citizenship, asylum, and deportation defense. The rules are complex and mistakes can cause years of delay, so professional guidance is especially valuable here.",
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
        a: "It depends on category: spouses of U.S. citizens often wait 1–2 years, while employment-based or sibling categories can take many years due to annual caps. Your lawyer can estimate from the current visa bulletin.",
      },
      {
        q: "Visa vs. green card — what's the difference?",
        a: "A visa lets you enter and stay temporarily for a specific purpose like work or study. A green card (lawful permanent residence) lets you live and work in the U.S. permanently — and is the path toward citizenship.",
      },
      {
        q: "Can I apply for asylum in the United States?",
        a: "You may apply if you suffered or fear persecution based on race, religion, nationality, political opinion, or social group membership. You must generally apply within one year of arrival. An asylum lawyer greatly improves your chances.",
      },
      {
        q: "Do I need a lawyer for U.S. citizenship?",
        a: "Not legally required, but wise if you have complications — past arrests, long trips abroad, tax issues, or a prior denial. A lawyer spots red flags in your application before USCIS does.",
      },
    ],
  },
  {
    slug: "bankruptcy-attorney",
    title: "Bankruptcy Attorney",
    shortTitle: "Bankruptcy",
    metaDescription:
      "Find a bankruptcy attorney near you. Chapter 7 vs 13, costs, what debts are erased — explained plainly.",
    directAnswer:
      "What does a bankruptcy attorney do? A bankruptcy attorney helps people overwhelmed by debt get a fresh start through the federal bankruptcy system — advising whether bankruptcy fits, which chapter to file, and how to protect as much property as possible. Most offer a free initial consultation.",
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
        q: "Chapter 7 vs. Chapter 13 — what's the difference?",
        a: "Chapter 7 erases most unsecured debts in a few months and suits people with limited income. Chapter 13 sets up a 3–5 year repayment plan for people with regular income who want to catch up on mortgages or car loans.",
      },
      {
        q: "Will bankruptcy wipe out all my debts?",
        a: "No. It erases many unsecured debts like credit cards and medical bills, but generally not student loans, recent taxes, child support, alimony, or court fines. A lawyer reviews exactly which of your debts are dischargeable.",
      },
      {
        q: "Will I lose my house and car if I file?",
        a: "Usually not. Exemptions protect equity in your home, car, and personal property, and Chapter 13 is designed to help you keep property while catching up on payments. Your lawyer structures the filing to maximize protection.",
      },
      {
        q: "How long does bankruptcy stay on my credit report?",
        a: "Chapter 7 stays 10 years, Chapter 13 stays 7. But most filers start rebuilding within a year or two of discharge using secured cards — scores often recover faster than expected.",
      },
    ],
  },
  {
    slug: "estate-planning-attorney",
    title: "Estate Planning Attorney",
    shortTitle: "Estate Planning",
    metaDescription:
      "Find an estate planning attorney near you. Wills, trusts, power of attorney and probate — explained plainly.",
    directAnswer:
      "What does an estate planning attorney do? An estate planning attorney decides what happens to your property, children, and medical choices if you're incapacitated or pass away — drafting wills, trusts, powers of attorney, and healthcare directives that save your family stress and expense later.",
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
        a: "Yes. A will isn't just about money — it names guardians for your children, directs who handles your affairs, and stops the state from deciding for you. Every adult should have a basic will, power of attorney, and healthcare directive.",
      },
      {
        q: "Will vs. trust — what's the difference?",
        a: "A will takes effect after death and usually goes through probate court. A living trust takes effect immediately, lets a successor manage your affairs if you're incapacitated, and typically avoids probate — faster and more private, but costlier to set up.",
      },
      {
        q: "What happens if I die without a will?",
        a: "Your state's intestacy laws decide who gets what — usually spouse and children in fixed shares — and a court picks guardians for minor children. It's slower, more expensive, and may not match your wishes at all.",
      },
      {
        q: "How often should I update my estate plan?",
        a: "Review every 3–5 years and after major life events: marriage, divorce, a new child, death of a beneficiary, property purchases, or moving states — estate laws differ by state.",
      },
    ],
  },
  {
    slug: "dui-attorney",
    title: "DUI Attorney",
    shortTitle: "DUI",
    metaDescription:
      "Find a DUI attorney near you. How DUI lawyers challenge tests, protect your license, and what a DUI costs — explained plainly.",
    directAnswer:
      "What does a DUI attorney do? A DUI attorney defends people charged with driving under the influence — fighting both the criminal charge and the license suspension, which have separate deadlines. A lawyer who knows local DUI procedures can often reduce penalties dramatically.",
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
        a: "Usually temporarily — most states suspend your license automatically unless you request a DMV hearing within a short window (often 10–30 days). Your lawyer handles this hearing separately from the criminal case. Missing the deadline means automatic suspension.",
      },
      {
        q: "Can a DUI charge be reduced or dismissed?",
        a: "Often. Lawyers challenge the stop's legality, breath-test accuracy, and officer procedures. Many cases resolve as reduced charges like reckless driving — especially first offenses with borderline BAC readings.",
      },
      {
        q: "DUI vs. DWI — what's the difference?",
        a: "Essentially the same thing — impaired driving — but terminology varies by state. Some use DUI (under the influence), others DWI (while intoxicated), and some use both for different offense levels.",
      },
      {
        q: "Should I refuse a breathalyzer test?",
        a: "Depends on your state. Under implied-consent laws, refusing triggers automatic license suspension — sometimes longer than a failed test. But refusal also denies prosecutors key evidence. Discuss your state's rules with a local DUI lawyer.",
      },
    ],
  },
  {
    slug: "workers-compensation-attorney",
    title: "Workers' Compensation Attorney",
    shortTitle: "Workers' Comp",
    metaDescription:
      "Find a workers' comp attorney near you. Denied claims, benefits, settlements and FAQs — explained plainly.",
    directAnswer:
      "What does a workers' compensation attorney do? A workers' comp attorney helps employees hurt on the job get the medical care and wage benefits they're owed — filing claims correctly, appealing denials, and negotiating settlements that reflect future medical needs. Fees are capped by state law.",
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
        a: "Medical treatment for the work injury, a portion of lost wages, permanent disability benefits if you don't fully recover, and vocational retraining in some states. It doesn't cover pain and suffering — that's the tradeoff of the no-fault system.",
      },
      {
        q: "Can I be fired for filing a workers' comp claim?",
        a: "No — retaliation for filing is illegal in every state. If your employer fires, demotes, or punishes you for filing, you may have a separate retaliation claim on top of your workers' comp case.",
      },
      {
        q: "What if my claim is denied?",
        a: "Denials are common and often reversible. You can appeal, usually starting with a hearing before a workers' comp judge. A lawyer gathers the medical evidence and presents your case — many denied claims win on appeal.",
      },
      {
        q: "Can I sue my employer instead of filing workers' comp?",
        a: "Generally no — workers' comp is the exclusive remedy against your employer. Exceptions exist for intentional harm. But you can sue third parties, like equipment manufacturers, whose negligence contributed to your injury.",
      },
    ],
  },
  {
    slug: "real-estate-attorney",
    title: "Real Estate Attorney",
    shortTitle: "Real Estate",
    metaDescription:
      "Find a real estate attorney near you. Closings, title issues, disputes and landlord-tenant help — explained plainly.",
    directAnswer:
      "What does a real estate attorney do? A real estate attorney handles the legal side of property — reviewing purchase contracts, clearing title issues, managing closings, and resolving landlord-tenant or boundary disputes. On the biggest transaction of your life, they're cheap insurance.",
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
        a: "Some states require it; most don't. But even where optional, a lawyer catches contract traps, title defects, and closing-cost errors that agents miss. For first-time buyers, it's strongly recommended.",
      },
      {
        q: "What is title insurance and do I need it?",
        a: "It protects against ownership claims surfacing after purchase — old liens, forged deeds, undisclosed heirs. Lenders require a lender's policy; an owner's policy (one-time fee) protects you. A lawyer explains what yours covers.",
      },
      {
        q: "What happens at a real estate closing?",
        a: "All parties sign transfer documents, funds move through escrow, the deed is recorded, and ownership officially changes hands. Your attorney reviews every document and confirms the title is clean before you sign.",
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
      "Find a business lawyer near you. Formation, contracts, compliance and disputes — explained plainly.",
    directAnswer:
      "What does a business lawyer do? A business lawyer helps companies form, operate, and grow without legal landmines — choosing the right entity, drafting contracts, handling employment issues, and resolving disputes. The cheapest lawsuit is the one your lawyer prevented.",
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
        q: "LLC or corporation — which should I form?",
        a: "It depends on taxes, ownership, and growth plans. LLCs are simpler and flexible — ideal for most small businesses. S-corps can save on self-employment taxes at higher incomes. A business lawyer (with your accountant) picks the right structure.",
      },
      {
        q: "Do I need a lawyer to start a small business?",
        a: "Not legally — but your formation documents, operating agreement, licenses, and first contracts shape everything that follows. A few hundred dollars of legal setup prevents the most common and expensive founder mistakes.",
      },
      {
        q: "Employee vs. independent contractor — what's the difference?",
        a: "It comes down to control: employees work under your direction; contractors control how and when they work. Misclassifying workers triggers back taxes, penalties, and lawsuits — one of the most common small-business traps.",
      },
      {
        q: "How do I protect my business name and brand?",
        a: "An LLC registration doesn't protect your brand — trademarks do. A business lawyer runs a clearance search, files federal trademark applications, and sets up the contracts that keep your intellectual property actually yours.",
      },
    ],
  },
  {
    slug: "truck-accident-attorney",
    title: "Truck Accident Attorney",
    shortTitle: "Truck Accident",
    metaDescription:
      "Find a truck accident attorney near you. FMCSA rules, black box evidence, multi-party liability, and contingency fees — explained plainly.",
    directAnswer:
      "What does a truck accident attorney do? A truck accident attorney represents people hurt in crashes with 18-wheelers and commercial trucks — investigating driver logs, black box data, and maintenance records to hold every liable party accountable: the driver, the trucking company, the cargo loader, and sometimes the freight broker. These cases run on federal FMCSA regulations layered over state law, which is why they demand a specialist, not a general car-accident lawyer.",
    intro:
      "A truck crash is not a big car crash. A loaded tractor-trailer can weigh 80,000 pounds — twenty times a passenger car — and the companies behind those trucks deploy rapid-response defense teams to crash scenes within hours. Truck accident attorneys work against that machinery: firing off spoliation letters to preserve electronic logging device (ELD) data before it can be legally destroyed, downloading the truck's engine control module for speed and braking records, and auditing the carrier's safety history in the FMCSA's public database. Because federal hours-of-service rules, maintenance standards, and insurance minimums govern every interstate truck, these lawyers operate in a regulatory world most personal injury attorneys never enter — and that expertise is often the difference between a lowball offer and full compensation.",
    whatTheyDo: [
      "Send spoliation letters within days of the crash to preserve ELD data, dashcam footage, driver qualification files, and dispatch records before the carrier can legally destroy them.",
      "Download the truck's engine control module (ECM) — the black box — for speed, hard-braking events, RPM, and hours-of-service data from the moments before impact.",
      "Audit the motor carrier's FMCSA safety record: prior hours-of-service violations, out-of-service orders, and crash history are all publicly searchable.",
      "Identify every liable party — the driver, the motor carrier, the freight broker, the shipper or loader, the maintenance shop, and the parts manufacturer — because truck cases rarely have just one defendant.",
      "Reconstruct the crash with accident reconstructionists who specialize in commercial-vehicle physics: stopping distances, underride dynamics, and jackknife mechanics.",
      "Pursue the layered insurance stack — primary liability, excess, and umbrella policies — which on commercial trucks routinely totals in the millions.",
    ],
    whenYouNeed: [
      "You were hit by an 18-wheeler, box truck, delivery van, tanker, or other commercial vehicle.",
      "The trucking company's insurer or investigator contacted you before you had even left the hospital.",
      "The crash involved a fatigued driver, an overloaded or improperly loaded trailer, or visibly neglected truck maintenance.",
      "Multiple vehicles were involved and the trucking company is disputing fault.",
      "You suffered serious or catastrophic injuries — truck crashes cause a disproportionate share of highway fatalities.",
      "A loved one was killed in a commercial truck crash and the carrier is already lawyering up.",
    ],
    fees:
      "Truck accident attorneys work on contingency: you pay nothing upfront, and the lawyer takes a percentage — typically 33% to 40% — of your settlement or verdict, often tiered higher if the case goes to trial. These cases demand expensive experts (reconstructionists, trucking-industry specialists, life-care planners), so ask how case costs are advanced and whether you owe them if the case is lost; reputable firms absorb those costs on a loss. Get the fee agreement in writing before signing anything.",
    faqs: [
      {
        q: "How is a truck accident case different from a car accident case?",
        a: "Four big differences: federal FMCSA regulations apply on top of state law; there are usually multiple defendants (driver, carrier, broker, shipper); critical evidence is electronic and can be destroyed within months; and commercial insurance minimums are far higher, which means the defense fights harder. A lawyer without trucking experience will miss regulatory violations that can make or break the case.",
      },
      {
        q: "What are the FMCSA hours-of-service rules?",
        a: "The Federal Motor Carrier Safety Administration limits property-carrying drivers to 11 hours of driving after 10 consecutive hours off duty, within a 14-hour on-duty window, plus a 30-minute break after 8 cumulative driving hours, and 60/70-hour caps over 7/8 days. When logbooks or ELD data show a driver exceeded these limits, that violation is powerful evidence of negligence.",
      },
      {
        q: "How much insurance must a trucking company carry?",
        a: "Federal law requires a minimum of $750,000 in liability coverage for general freight, rising to $1 million–$5 million for hazardous materials. In practice, many carriers layer excess and umbrella policies worth several million more. Your attorney's job includes finding every applicable policy — carriers rarely volunteer that information.",
      },
      {
        q: "What is truck black box data and how long is it kept?",
        a: "The engine control module (ECM) records speed, braking, throttle, and RPM; ELDs track driving hours and location. Carriers must retain supporting documents for only six months, and some data can be overwritten sooner — which is why attorneys send spoliation letters immediately demanding preservation. Once that data is gone, it is gone forever.",
      },
      {
        q: "Who can be held liable after a truck crash?",
        a: "Potentially many parties: the driver for negligent operation; the motor carrier under vicarious liability and for its own failures in hiring, training, or maintenance; the freight broker for negligently selecting an unsafe carrier; the shipper or loader for overweight or unbalanced cargo; the maintenance provider; and the manufacturer of a defective part. Naming every responsible party is how full compensation gets recovered.",
      },
    ],
  },
  {
    slug: "oil-rig-injury-lawyer",
    title: "Oil Rig Injury Lawyer",
    shortTitle: "Oil Rig Injury",
    metaDescription:
      "Find an oil rig injury lawyer near you. Blowouts, H2S exposure, multi-contractor liability, and third-party claims — explained plainly.",
    directAnswer:
      "What does an oil rig injury lawyer do? An oil rig injury lawyer represents roughnecks, drillers, derrickhands, and other oilfield workers hurt on land-based drilling rigs — investigating blowouts, equipment failures, and hydrogen sulfide exposure, and pursuing claims against rig operators, contractors, and equipment makers. Because a single well site hosts multiple employers at once, these cases routinely go beyond workers' compensation into high-value third-party lawsuits.",
    intro:
      "A land drilling rig is one of the most dangerous workplaces in America: a towering derrick, high-pressure lines, explosive gases, and crews pulling 12-hour shifts in brutal heat, cold, and isolation. When something fails, the injuries are catastrophic — flash burns from blowouts, crush injuries from pipe handling, traumatic brain injuries from falls off the monkey board, lung damage from hydrogen sulfide (H2S) exposure. Oil rig injury lawyers know the patch: the chain of operators, drilling contractors, mudloggers, and fracking crews sharing one well site; OSHA's oil and gas standards; and the hard truth that a workers' comp check rarely covers the real cost of a life-altering injury. Their value is finding the third parties whose negligence actually caused the harm — and making them pay for all of it.",
    whatTheyDo: [
      "Investigate the incident using drilling reports, IADC tour sheets, safety meeting records, equipment maintenance logs, and H2S monitoring data.",
      "Map every company on the well site — the operator, the drilling contractor, directional drillers, mud companies, fracking crews — because each may share liability for your injury.",
      "Pursue third-party claims beyond workers' compensation against negligent contractors, operators, and defective equipment manufacturers.",
      "Work with petroleum engineers and oilfield safety experts to prove what failed mechanically and which safety step was skipped.",
      "Document the long-term harm: burns requiring skin grafts, respiratory damage, TBIs, amputations, and lost earning capacity in a high-wage trade.",
      "Untangle workers' compensation liens against third-party settlements so medical liens don't eat your recovery.",
    ],
    whenYouNeed: [
      "You were injured in a blowout, explosion, or flash fire on a drilling rig.",
      "You were exposed to hydrogen sulfide (H2S) or other toxic gases on site and now have breathing or neurological problems.",
      "Heavy equipment — top drives, drawworks, tongs, pipe handlers — crushed, struck, or caught you.",
      "You fell from the derrick, the monkey board, rig stairs, or a catwalk.",
      "A contractor's crew, the operator's decisions, or defective equipment caused your injury — not just your direct employer.",
      "Workers' compensation doesn't come close to covering your lost wages, medical bills, or permanent disability.",
    ],
    fees:
      "Oil rig injury lawyers take these cases on contingency — typically around one-third of the recovery, rising if the case goes to trial — with no upfront payment from you. Given the catastrophic injuries common on rigs, settlements and verdicts can be substantial, but proving them requires costly experts (petroleum engineers, life-care planners, economists), so confirm the firm advances all case expenses and only recovers them from a win. Never sign a fee agreement you haven't read fully.",
    faqs: [
      {
        q: "Can I sue if I'm already receiving workers' compensation?",
        a: "Yes — and you usually should explore it. Workers' comp covers claims against your direct employer, but it doesn't bar third-party lawsuits against the well operator, other contractors on site, or equipment manufacturers whose negligence caused your injury. Those third-party claims are where the significant compensation lives, because workers' comp alone never pays for pain and suffering or full lost earning capacity.",
      },
      {
        q: "What is hydrogen sulfide (H2S) exposure and why is it so dangerous?",
        a: "H2S is a colorless, highly toxic gas common in oil and gas production — deadly at high concentrations and capable of causing lasting respiratory, neurological, and eye damage even at lower exposures. OSHA sets a 20 ppm ceiling with a 50 ppm peak limit. When operators fail to monitor, alarm, or equip crews with breathing apparatus, H2S injuries become a clear liability case.",
      },
      {
        q: "Who is liable when multiple contractors work the same well site?",
        a: "Potentially all of them. The operator controls the site, the drilling contractor runs the rig, and service companies bring their own crews and equipment — each owes safety duties to workers on location. A thorough investigation of contracts, safety records, and witness accounts determines how fault is shared, and your lawyer names every negligent party rather than letting them point fingers at each other.",
      },
      {
        q: "What if I was classified as an independent contractor, not an employee?",
        a: "Oilfield misclassification is rampant, and it often works in your favor: true independent contractors aren't limited to workers' comp at all and can sue negligent parties directly for full damages. Even if the classification holds, you can still bring third-party claims against everyone except your direct employer. Don't assume a 1099 means you have no case.",
      },
      {
        q: "How long do I have to file an oil rig injury claim?",
        a: "State statutes of limitations — commonly two to three years — set the legal deadline, but the practical deadline is much sooner: rigs move to new locations, crews disperse across states, and equipment gets repaired or scrapped. Critical evidence like tour sheets and gas monitoring logs can vanish within months. Contact a lawyer immediately after a serious rig injury.",
      },
    ],
  },
  {
    slug: "offshore-accident-lawyer",
    title: "Offshore Accident Lawyer",
    shortTitle: "Offshore Accident",
    metaDescription:
      "Find an offshore accident lawyer near you. Jones Act rights, maintenance and cure, unseaworthiness claims — explained plainly.",
    directAnswer:
      "What does an offshore accident lawyer do? An offshore accident lawyer represents seamen, deckhands, and offshore workers injured on vessels, rigs, and platforms — filing claims under the Jones Act, the century-old federal law that gives maritime workers far stronger rights than land-based employees receive. These attorneys also pursue unseaworthiness claims against vessel owners and Longshore Act claims for harbor workers, working in a body of law most personal injury lawyers never touch.",
    intro:
      "Maritime injury law is the oldest in America — and the most generous to workers. Since 1920, the Jones Act (46 U.S.C. § 30104) has let seamen sue their employers for negligence under a featherweight burden of proof, while the ancient doctrine of maintenance and cure obligates employers to pay daily living expenses and medical care regardless of fault. Vessel owners separately owe an absolute, non-delegable duty to furnish a seaworthy vessel. Offshore accident lawyers live in this parallel legal universe: the Jones Act, unseaworthiness, the Longshore and Harbor Workers' Compensation Act, the Outer Continental Shelf Lands Act, and the Death on the High Seas Act — each with its own definitions, deadlines, and remedies. Choosing a lawyer who can't tell a Jones Act seaman from a Longshore harbor worker is how strong maritime claims die quietly.",
    whatTheyDo: [
      "Determine your exact maritime status — Jones Act seaman, Longshore harbor worker, or OCSLA platform worker — because each status unlocks a different set of rights and remedies.",
      "File Jones Act negligence claims, where even the slightest employer fault can establish liability under the Act's famously light causation standard.",
      "Pursue unseaworthiness claims against vessel owners for unsafe conditions, defective gear, or an incompetent or inadequate crew — liability that doesn't require proving negligence at all.",
      "Demand maintenance and cure — your daily stipend plus medical care — which the employer owes from day one with no lawsuit required, and fight back when payments are cut off.",
      "Defeat the McCorpen defense, where employers try to void your entire claim by alleging you concealed a pre-existing condition when hired.",
      "Navigate the three-year Jones Act limitations period and the special jurisdictional rules for injuries beyond the three-mile limit and on the high seas.",
    ],
    whenYouNeed: [
      "You were injured working aboard a ship, tug, barge, supply vessel, fishing boat, or offshore drilling unit.",
      "Your employer stopped paying maintenance and cure, or is pressuring you to sign a release before your treatment is finished.",
      "Defective equipment, an undermanned crew, or unsafe orders at sea caused your injury.",
      "You work on docks, terminals, or in shipyards and were injured on or over navigable waters.",
      "A loved one died working offshore — maritime wrongful death under DOHSA and the Jones Act follows very different rules than state law.",
      "Your injury happened beyond state waters, where state workers' compensation doesn't apply at all.",
    ],
    fees:
      "Offshore accident lawyers work on contingency — typically one-third to 40% of the recovery — with no upfront fees and case costs for maritime experts and vessel inspections advanced by the firm. One critical difference from land cases: maintenance and cure is owed immediately and separately from any lawsuit, so a good maritime lawyer gets those daily payments and medical bills flowing before any settlement is negotiated. If your employer has cut off maintenance, that alone is reason to call.",
    faqs: [
      {
        q: "What is the Jones Act?",
        a: "The Merchant Marine Act of 1920, codified at 46 U.S.C. § 30104, gives seamen — workers who contribute to a vessel's mission and have a substantial connection to it — the right to sue their employers for negligence with a featherweight causation standard: the employer's fault need only have played the slightest part. It also guarantees a jury trial and carries a three-year statute of limitations. It remains the single most powerful worker-protection statute in American injury law.",
      },
      {
        q: "What are maintenance and cure?",
        a: "Two ancient maritime obligations owed to an injured seaman regardless of fault: maintenance, a daily living allowance paid while you're recovering and unable to work, and cure, payment of your medical treatment until you reach maximum medical improvement. The employer owes both from the moment of injury — no lawsuit needed — and willfully refusing to pay can trigger punitive damages under Atlantic Sounding v. Townsend.",
      },
      {
        q: "What's the difference between the Jones Act and the Longshore Act?",
        a: "The Jones Act covers seamen — the crew of vessels — and requires proving employer negligence (though the burden is light), with full tort damages including pain and suffering. The Longshore and Harbor Workers' Compensation Act (33 U.S.C. § 901) covers harbor workers, longshoremen, and shipyard workers: it's a federal workers' comp system that pays without proving fault but doesn't allow pain-and-suffering damages. Your lawyer's first job is determining which one you fall under.",
      },
      {
        q: "What does it mean for a vessel to be unseaworthy?",
        a: "A vessel is unseaworthy when the ship, its equipment, or its crew is not reasonably fit for its intended use — a slippery deck, a frayed line, a broken winch, or an undertrained crew all qualify. The owner's duty to provide a seaworthy vessel is absolute: if unseaworthiness caused your injury, the owner is liable even without negligence. This claim can be brought alongside a Jones Act negligence claim for maximum recovery.",
      },
      {
        q: "Does the Jones Act apply on offshore oil platforms?",
        a: "It depends on the structure. Jack-up rigs and drillships that move on navigable waters generally count as vessels, so their crews are Jones Act seamen. Fixed platforms attached to the seabed fall under the Outer Continental Shelf Lands Act, which typically extends Longshore Act benefits instead. Employers routinely misclassify platform workers to dodge Jones Act liability — status disputes are common, and they're winnable with the right lawyer.",
      },
    ],
  },
  {
    slug: "construction-accident-lawyer",
    title: "Construction Accident Lawyer",
    shortTitle: "Construction Accidents",
    metaDescription:
      "Hurt on a construction site? How construction accident lawyers handle OSHA violations, third-party claims, and workers' comp — explained plainly.",
    directAnswer:
      "What does a construction accident lawyer do? A construction accident lawyer represents workers hurt on job sites — falls, equipment failures, trench collapses, electrocutions — pursuing compensation beyond workers' comp by filing third-party claims against general contractors, subcontractors, property owners, and equipment manufacturers. They turn OSHA violations, safety records, and inspection reports into leverage for full recovery.",
    intro:
      "Construction remains one of America's deadliest industries — about 1,069 construction workers died on the job in 2022 alone, roughly one in five of all U.S. workplace fatalities. OSHA calls the four leading killers the Fatal Four: falls (about 36–39% of construction deaths), struck-by incidents, electrocutions, and caught-in/between accidents, together responsible for roughly 60% of construction deaths. A construction accident lawyer knows that workers' compensation is only the starting point. The real recovery usually comes from third-party claims against the other companies on the site — the general contractor who controlled safety, the subcontractor who created the hazard, or the manufacturer of the defective scaffold, crane, or power tool.",
    whatTheyDo: [
      "Investigate the accident scene: OSHA reports, site safety plans, training records, equipment maintenance logs, and witness statements from the crew.",
      "Identify every liable party beyond your employer — general contractors, subcontractors, property owners, architects, engineers, and equipment manufacturers.",
      "Preserve critical evidence fast: subpoena inspection records, operator certifications, and toolbox-talk logs before they disappear.",
      "Coordinate your workers' comp claim while building the separate third-party lawsuit, which is where the larger recovery comes from.",
      "Work with safety engineers and medical experts to prove how the violation caused your injury and what your lifetime care will cost.",
      "Negotiate with multiple insurers at once — and take the case to trial when contractors blame each other instead of paying.",
    ],
    whenYouNeed: [
      "You fell from a scaffold, ladder, roof, or unprotected edge — falls are the #1 construction killer and the #1 most-cited OSHA violation.",
      "You were struck by falling materials, a swinging crane load, or a backing vehicle on site.",
      "You were electrocuted or shocked by live wires, defective tools, or unmarked power lines.",
      "You were caught in or crushed by machinery, a trench cave-in, or collapsing materials.",
      "Your employer's workers' comp check doesn't cover your lost earning capacity, or a contractor is pressuring you not to report.",
      "A family member was killed on a job site and you need to know whether a wrongful death claim exists alongside workers' comp.",
    ],
    fees:
      "Construction accident lawyers almost always work on contingency for third-party claims — typically about one-third of the recovery, with nothing paid upfront. The workers' comp portion is usually handled under state-regulated fee schedules that cap what the lawyer can take. Because third-party cases involve multiple defendants and insurers, ask in writing how fees apply if the case settles with some defendants but goes to trial against others.",
    faqs: [
      {
        q: "Isn't workers' comp my only option after a construction accident?",
        a: "No — workers' comp is your exclusive remedy against your own employer in most states, but it is not your only option overall. You can separately sue negligent third parties: the general contractor, other subcontractors, the property owner, or equipment manufacturers. These third-party claims are where the real money is — they cover pain and suffering and full lost wages, which workers' comp does not. A lawyer maps every company on the site to find them.",
      },
      {
        q: "What are OSHA's Fatal Four, and why do they matter for my case?",
        a: "The Fatal Four are falls, struck-by incidents, electrocutions, and caught-in/between accidents — they cause roughly 60% of construction deaths. They matter because OSHA has detailed safety standards for each (like 29 CFR 1926.501 for fall protection, the most-cited violation in construction). When an employer or contractor violated one of these standards, that citation becomes powerful evidence of negligence in your lawsuit.",
      },
      {
        q: "What if I was partially at fault for my construction accident?",
        a: "In most states, partial fault reduces but does not eliminate your recovery under comparative negligence rules — a worker found 20% at fault still recovers 80% of damages. And fault is often shared across multiple contractors, which can actually increase the total pool of insurance available. Never assume you have no case because a foreman said you should have been more careful.",
      },
      {
        q: "Can I sue if I am an undocumented construction worker?",
        a: "In most states, yes. Immigration status generally does not bar an injured worker from workers' comp benefits or a third-party personal injury claim, and courts in many jurisdictions limit what defendants can even ask about status. Wage calculations may be disputed, but the right to compensation stands. Speak with a lawyer before discussing status with anyone on the site.",
      },
      {
        q: "How long do I have to file a construction accident lawsuit?",
        a: "Deadlines vary by state — typically 2 to 3 years for the third-party injury claim, but workers' comp has much shorter notice deadlines, sometimes as little as 30 days to report the injury to your employer. Miss the comp notice window and you can lose benefits even with a valid lawsuit. Report the injury in writing immediately and get a lawyer involved early.",
      },
    ],
  },
  {
    slug: "mesothelioma-attorney",
    title: "Mesothelioma Attorney",
    shortTitle: "Mesothelioma",
    metaDescription:
      "Diagnosed with mesothelioma? How asbestos attorneys file trust fund claims and lawsuits, what the $30B in trusts means for you — explained plainly.",
    directAnswer:
      "What does a mesothelioma attorney do? A mesothelioma attorney helps people diagnosed with asbestos-related diseases trace decades-old exposure, then files claims against the $30 billion in asbestos bankruptcy trust funds and lawsuits against the companies responsible. Because mesothelioma takes 20 to 50 years to appear, these lawyers specialize in reconstructing work histories from the 1960s through the 1980s to identify every liable manufacturer.",
    intro:
      "Mesothelioma is a rare, aggressive cancer caused almost exclusively by asbestos exposure — and it hides for 20 to 50 years before symptoms appear. By the time of diagnosis, the companies that made the asbestos products have often gone bankrupt. That is why Congress and the bankruptcy courts created the asbestos trust system: more than 60 active trusts holding roughly $30 billion, set up by companies like Johns Manville (the first, funded with $2.5 billion back in 1988) to pay current and future victims. A mesothelioma attorney's core skill is exposure archaeology — rebuilding your work history product by product, job site by job site, to file claims with every trust you qualify for, usually 20 or more, plus any viable lawsuits.",
    whatTheyDo: [
      "Reconstruct your asbestos exposure history: job sites, military service, products handled, and secondhand exposure from a family member's work clothes.",
      "Identify which of the 60+ asbestos trust funds you qualify for — most victims file with 20 or more trusts at once.",
      "File trust claims under expedited review (often decided within about 90 days) or individual review for stronger, higher-value claims.",
      "Pursue lawsuits against solvent companies that have not gone bankrupt, in addition to trust claims — you can do both.",
      "Handle VA disability claims for veterans, who make up a large share of mesothelioma patients due to Navy and shipyard exposure.",
      "Manage disclosure and setoff rules so trust payments do not undercut your lawsuit recovery under your state's laws.",
    ],
    whenYouNeed: [
      "You or a family member was just diagnosed with mesothelioma, lung cancer, or asbestosis with a history of asbestos exposure.",
      "You worked in construction, shipyards, power plants, refineries, auto repair, or manufacturing before the mid-1980s.",
      "You served in the Navy or worked in shipbuilding — veterans face some of the highest asbestos exposure rates of any group.",
      "A loved one died of mesothelioma and you need to know whether the family can still file claims.",
      "You were exposed secondhand — for example, washing a spouse's or parent's dusty work clothes for years.",
      "An earlier claim was denied or underpaid, or you suspect more trusts apply to your exposure than were originally filed.",
    ],
    fees:
      "Mesothelioma attorneys work on contingency — no upfront cost, with fees typically around one-third to 40% of the recovery, taken only if you win. Because cases involve dozens of trust filings plus possible lawsuits, ask exactly how the fee applies across trust payments versus lawsuit settlements, and whether costs like medical-record retrieval are deducted before or after the fee is calculated. Reputable firms advance all costs.",
    faqs: [
      {
        q: "How much compensation can a mesothelioma case bring?",
        a: "It varies widely. Individual trust claims average around $41,000 according to RAND research, but most victims file with 20 or more trusts, bringing combined trust recoveries to roughly $300,000 to $400,000. Lawsuits against solvent companies can add significantly more — some verdicts reach millions. An attorney evaluates your exposure history to estimate the realistic range before you file anything.",
      },
      {
        q: "What is the statute of limitations for mesothelioma?",
        a: "Typically 2 to 3 years, but the clock starts at diagnosis — not at exposure — because of the 20-to-50-year latency period. This discovery rule exists precisely because no one could have known they were injured decades ago. Still, waiting is dangerous: evidence and witnesses fade, and some trusts have their own filing deadlines. Call promptly after diagnosis.",
      },
      {
        q: "Can I file a trust claim and a lawsuit at the same time?",
        a: "Yes — they are separate systems. Trust claims go through the bankruptcy trusts' administrative process (often resolved in months), while lawsuits target companies that are still in business and can take a year or more. Some states require you to disclose trust payments in the lawsuit, and setoff rules may reduce the lawsuit award by amounts already received, which is why coordinating both through one attorney matters.",
      },
      {
        q: "What if the company that exposed me went bankrupt decades ago?",
        a: "That is exactly what the trust system is for. When asbestos companies filed Chapter 11 bankruptcy, courts forced them to fund trusts for future victims as a condition of protection. Your attorney files a claim directly with each relevant trust — no lawsuit against the bankrupt company needed. With 60+ active trusts, bankrupt manufacturers are often the easiest money in the case, not a dead end.",
      },
      {
        q: "Do veterans get additional help for asbestos exposure?",
        a: "Yes. Veterans exposed during military service — especially Navy veterans who worked around ship insulation, boilers, and engine rooms — can file VA disability claims alongside trust and lawsuit claims. Mesothelioma is typically rated at 100% disability by the VA. A mesothelioma attorney experienced with veterans coordinates all three tracks so nothing is left on the table.",
      },
    ],
  },
  {
    slug: "motorcycle-accident-lawyer",
    title: "Motorcycle Accident Lawyer",
    shortTitle: "Motorcycle Accidents",
    metaDescription:
      "Hurt in a motorcycle crash? How motorcycle accident lawyers fight rider bias, handle helmet and lane-splitting issues — explained plainly.",
    directAnswer:
      "What does a motorcycle accident lawyer do? A motorcycle accident lawyer represents riders hurt in crashes — fighting the built-in bias that motorcyclists are reckless, proving the other driver was at fault, and navigating motorcycle-specific issues like helmet laws, lane-splitting rules, and severe injury valuations. They know that a jury's first instinct about a rider is often wrong, and they build the case to overcome it.",
    intro:
      "Motorcyclists are about 29 times more likely than car occupants to die in a crash per mile traveled — yet when a crash happens, the rider is the one who has to prove they weren't the reckless one. Insurance adjusters and juries carry a quiet bias: they assume the motorcyclist was speeding, weaving, or asking for it. A motorcycle accident lawyer's first job is often dismantling that assumption with evidence — helmet camera footage, black-box data, witness statements, and accident reconstruction. The second job is knowing the motorcycle-specific law cold: which states require helmets, where lane splitting or filtering is legal, and how a state's comparative fault rules interact with a rider's choices.",
    whatTheyDo: [
      "Counter rider bias from the start — frame the case around the driver's negligence, not the motorcycle, in every filing and negotiation.",
      "Preserve bike-specific evidence: helmet damage patterns, gear abrasion, skid marks, bike computer data, and helmet or dash camera footage.",
      "Handle helmet-law issues — in many states, not wearing a helmet can reduce but not eliminate recovery, and the defense must still prove the helmet would have prevented your specific injuries.",
      "Address lane-splitting and filtering questions with your state's actual law — legal only in California for full splitting, with limited filtering now allowed in Utah, Montana, Arizona, Colorado, and Minnesota.",
      "Work with trauma doctors and life-care planners to document catastrophic injuries — road rash, degloving, amputations, traumatic brain injury — that define motorcycle cases.",
      "Stack every available policy: the at-fault driver's liability, your own uninsured/underinsured motorist coverage, and umbrella policies most riders don't know they have.",
    ],
    whenYouNeed: [
      "A driver turned left in front of you, merged into your lane, or opened a door into your path — the classic motorcycle crash scenarios.",
      "The insurance company is blaming you for the crash because you ride a motorcycle, or lowballing because they assume a jury will too.",
      "You suffered serious road rash, fractures, amputation, spinal injury, or traumatic brain injury in the crash.",
      "The at-fault driver is uninsured or underinsured and your own UM/UIM coverage needs to be triggered.",
      "A defective bike part — brakes, tires, steering — contributed to the crash, opening a product liability claim.",
      "A loved one was killed riding and the insurer is already framing it as rider error.",
    ],
    fees:
      "Motorcycle accident lawyers work on contingency — typically about one-third of the settlement, more if the case goes to trial, with nothing owed upfront. Because motorcycle injuries are often catastrophic, cases may involve larger expert costs (accident reconstruction, life-care planning); ask in writing whether those costs come off the top before or after the fee percentage. Most offer free consultations and will review your insurance stack at no charge.",
    faqs: [
      {
        q: "Will not wearing a helmet ruin my motorcycle accident case?",
        a: "Not necessarily — it depends on your state. In states without universal helmet laws, the defense still has to prove a helmet would have prevented your specific injuries; a broken leg has nothing to do with a helmet. Even where helmet non-use is admissible, it typically reduces damages under comparative fault rather than eliminating the claim. Never let an adjuster tell you the case is worthless over a helmet.",
      },
      {
        q: "Is lane splitting legal, and does it affect my claim?",
        a: "Full lane splitting is legal only in California. Limited lane filtering — passing stopped or very slow traffic at low speed — is now legal in Utah, Montana, Arizona, Colorado, and Minnesota, each with specific speed and road conditions. Everywhere else, splitting can be cited as unsafe lane use or reckless driving, which the insurer will use against you. A lawyer checks exactly what your state's law allowed at your crash location.",
      },
      {
        q: "Why do motorcycle cases need a specialist instead of any injury lawyer?",
        a: "Three reasons: bias, injuries, and insurance. Juries and adjusters start skeptical of riders, so the case must be framed differently from a car crash. Injuries are typically far more severe, requiring different medical and life-care expertise. And motorcycle insurance stacks differently — many riders carry UM/UIM on both bike and auto policies without realizing it. A generalist misses these layers.",
      },
      {
        q: "What is my motorcycle accident case worth?",
        a: "Motorcycle cases often value higher than car cases because the injuries are worse — road rash requiring skin grafts, compound fractures, amputations, and TBIs generate large medical bills and lost earning capacity. Value turns on injury severity, permanence, the clarity of the other driver's fault, and available insurance. Severe-injury cases regularly reach six and seven figures when coverage exists.",
      },
      {
        q: "What should I do right after a motorcycle crash?",
        a: "Get medical care immediately — adrenaline masks serious injuries and gaps in treatment hurt claims. Preserve your helmet and gear exactly as they are; damage patterns are evidence. Photograph everything, get witness contacts, and do not give a recorded statement to the other driver's insurer. Then call a lawyer before your bike is repaired or declared a total loss, because the bike itself is evidence.",
      },
    ],
  },
];

export const DISCLAIMER =
  "This is general information, not legal advice. Reading this site does not create an attorney-client relationship. Laws vary by state — consult a licensed attorney in your state about your specific situation.";

export function getState(slug: string): StateInfo | undefined {
  return ALL_STATES.find((s) => s.slug === slug);
}

export function getPractice(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.slug === slug);
}
