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
];

export const DISCLAIMER =
  "This is general information, not legal advice. Reading this site does not create an attorney-client relationship. Laws vary by state — consult a licensed attorney in your state about your specific situation.";

export function getState(slug: string): StateInfo | undefined {
  return ALL_STATES.find((s) => s.slug === slug);
}

export function getPractice(slug: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((p) => p.slug === slug);
}
