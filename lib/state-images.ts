/**
 * State hero images for /attorneys/[state] pages.
 * One state-relevant photo per state (skyline, capitol, or landmark),
 * sourced from Wikimedia Commons (public domain / Creative Commons).
 * Every URL was HEAD-verified (HTTP 200, image content-type) on
 * 2026-10-25 before being added. Photo credit + license per entry;
 * the credit line is rendered under the hero on each state page.
 * NOTE: attorney profile photos are never used here or on profiles —
 * profiles show a generated initials avatar only (site policy).
 */

export interface StateImage {
  url: string;
  alt: string;
  /** Photographer + license, e.g. "Jane Doe (CC BY-SA 4.0)". */
  credit: string;
  /** Wikimedia Commons file page for the credit link. */
  page: string;
}

export const STATE_IMAGES: Record<string, StateImage> = {
  "alabama": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Birmingham%2C_Alabama_skyline.jpg/1280px-Birmingham%2C_Alabama_skyline.jpg",
    alt: "Birmingham skyline — Alabama",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Birmingham,_Alabama_skyline.jpg",
  },
  "alaska": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Anchorage%2C_Alaska_skyline.jpg/1280px-Anchorage%2C_Alaska_skyline.jpg",
    alt: "Anchorage skyline — Alaska",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Anchorage,_Alaska_skyline.jpg",
  },
  "arizona": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Downtown_Phoenix_Skyline_%286974043971%29.jpg/1280px-Downtown_Phoenix_Skyline_%286974043971%29.jpg",
    alt: "Phoenix skyline — Arizona",
    credit: "Alan Stark from Goodyear, AZ, United States (CC BY-SA 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Downtown_Phoenix_Skyline_(6974043971).jpg",
  },
  "arkansas": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Little_Rock%2C_Arkansas_skyline.jpg/1280px-Little_Rock%2C_Arkansas_skyline.jpg",
    alt: "Little Rock skyline — Arkansas",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Little_Rock,_Arkansas_skyline.jpg",
  },
  "california": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Skyline_of_Los_Angeles%2C_Downtown_Los_Angeles%2C_California_13.jpg/1280px-Skyline_of_Los_Angeles%2C_Downtown_Los_Angeles%2C_California_13.jpg",
    alt: "Los Angeles skyline — California",
    credit: "Levi Clancy (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Skyline_of_Los_Angeles,_Downtown_Los_Angeles,_California_13.jpg",
  },
  "colorado": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Denver%2C_Colorado_skyline.jpg/1280px-Denver%2C_Colorado_skyline.jpg",
    alt: "Denver skyline — Colorado",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Denver,_Colorado_skyline.jpg",
  },
  "connecticut": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Hartford%2C_Connecticut_skyline.jpg/1280px-Hartford%2C_Connecticut_skyline.jpg",
    alt: "Hartford skyline — Connecticut",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Hartford,_Connecticut_skyline.jpg",
  },
  "delaware": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Wilmington%2C_Delaware_skyline.jpg/1280px-Wilmington%2C_Delaware_skyline.jpg",
    alt: "Wilmington skyline — Delaware",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Wilmington,_Delaware_skyline.jpg",
  },
  "florida": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Downtown_Miami_skyline_20100305.jpg/1280px-Downtown_Miami_skyline_20100305.jpg",
    alt: "Miami skyline — Florida",
    credit: "Dori (CC BY-SA 3.0)",
    page: "https://commons.wikimedia.org/wiki/File:Downtown_Miami_skyline_20100305.jpg",
  },
  "georgia": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/Midtown_Atlanta_skyline_viewed_from_the_National_Center_for_Civil_and_Human_Rights.jpg/1280px-Midtown_Atlanta_skyline_viewed_from_the_National_Center_for_Civil_and_Human_Rights.jpg",
    alt: "Atlanta skyline — Georgia",
    credit: "Marc Merlin (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Midtown_Atlanta_skyline_viewed_from_the_National_Center_for_Civil_and_Human_Rights.jpg",
  },
  "hawaii": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Skyline_of_Honolulu_Hawaii.JPG/1280px-Skyline_of_Honolulu_Hawaii.JPG",
    alt: "Honolulu and Waikiki — Hawaii",
    credit: "Ueutyi (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Skyline_of_Honolulu_Hawaii.JPG",
  },
  "idaho": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Boise_Skyline%2C_JUMP.jpg/1280px-Boise_Skyline%2C_JUMP.jpg",
    alt: "Boise skyline — Idaho",
    credit: "Tamanoeconomico (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Boise_Skyline,_JUMP.jpg",
  },
  "illinois": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Chicago_Skyline_-_August_2026_-_01.jpg/1280px-Chicago_Skyline_-_August_2026_-_01.jpg",
    alt: "Chicago skyline — Illinois",
    credit: "NorbertNagel (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Chicago_Skyline_-_August_2026_-_01.jpg",
  },
  "indiana": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Indianapolis_Skyline_and_Canal_2025-10-14.jpg/1280px-Indianapolis_Skyline_and_Canal_2025-10-14.jpg",
    alt: "Indianapolis skyline — Indiana",
    credit: "TheWxResearcher (CC0)",
    page: "https://commons.wikimedia.org/wiki/File:Indianapolis_Skyline_and_Canal_2025-10-14.jpg",
  },
  "iowa": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Des_Moines_skyline_%2855298344286%29.jpg/1280px-Des_Moines_skyline_%2855298344286%29.jpg",
    alt: "Des Moines skyline — Iowa",
    credit: "Gage Skidmore (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Des_Moines_skyline_(55298344286).jpg",
  },
  "kansas": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Wichita%2C_Kansas_skyline.jpg/1280px-Wichita%2C_Kansas_skyline.jpg",
    alt: "Wichita skyline — Kansas",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Wichita,_Kansas_skyline.jpg",
  },
  "kentucky": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Louisville%2C_Kentucky_skyline_at_night_%282021%29.jpg/1280px-Louisville%2C_Kentucky_skyline_at_night_%282021%29.jpg",
    alt: "Louisville skyline — Kentucky",
    credit: "Charles Delano, U.S. Army Corps of Engineers Louisville District (CC BY 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Louisville,_Kentucky_skyline_at_night_(2021).jpg",
  },
  "louisiana": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/New_Orleans_skyline_from_the_Mississippi_River.JPG/1280px-New_Orleans_skyline_from_the_Mississippi_River.JPG",
    alt: "New Orleans skyline — Louisiana",
    credit: "MusikAnimal (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:New_Orleans_skyline_from_the_Mississippi_River.JPG",
  },
  "maine": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Portland%2C_Maine_skyline.jpg/1280px-Portland%2C_Maine_skyline.jpg",
    alt: "Portland skyline — Maine",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Portland,_Maine_skyline.jpg",
  },
  "maryland": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Baltimore_Inner_Harbor_Skyline_Night_Panorama.jpg/1280px-Baltimore_Inner_Harbor_Skyline_Night_Panorama.jpg",
    alt: "Baltimore skyline — Maryland",
    credit: "Joe Ravi (CC BY-SA 3.0)",
    page: "https://commons.wikimedia.org/wiki/File:Baltimore_Inner_Harbor_Skyline_Night_Panorama.jpg",
  },
  "massachusetts": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Boston_skyline_from_Cambridge_November_2015_panorama_1.jpg/1280px-Boston_skyline_from_Cambridge_November_2015_panorama_1.jpg",
    alt: "Boston skyline — Massachusetts",
    credit: "King of Hearts (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Boston_skyline_from_Cambridge_November_2015_panorama_1.jpg",
  },
  "michigan": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Detroit_Skyline_%28Nov2021%29.jpg/1280px-Detroit_Skyline_%28Nov2021%29.jpg",
    alt: "Detroit skyline — Michigan",
    credit: "Lrgjr72 (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Detroit_Skyline_(Nov2021).jpg",
  },
  "minnesota": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Downtown_Minneapolis_skyline_across_the_Mississippi_River.jpg/1280px-Downtown_Minneapolis_skyline_across_the_Mississippi_River.jpg",
    alt: "Minneapolis skyline — Minnesota",
    credit: "Guywelch2000 (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Downtown_Minneapolis_skyline_across_the_Mississippi_River.jpg",
  },
  "mississippi": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Jackson_December_2018_63_%28skyline%29.jpg/1280px-Jackson_December_2018_63_%28skyline%29.jpg",
    alt: "Jackson skyline — Mississippi",
    credit: "Michael Barera (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Jackson_December_2018_63_(skyline).jpg",
  },
  "missouri": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/St._Louis_Skyline_Gateway_Arch_The_Thunderbirds_June_12%2C_2017.jpg/1280px-St._Louis_Skyline_Gateway_Arch_The_Thunderbirds_June_12%2C_2017.jpg",
    alt: "St. Louis skyline and the Gateway Arch — Missouri",
    credit: "Tech. Sgt. Christopher Boitz (Public domain)",
    page: "https://commons.wikimedia.org/wiki/File:St._Louis_Skyline_Gateway_Arch_The_Thunderbirds_June_12,_2017.jpg",
  },
  "montana": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Glacier_National_Park%2C_Montana%2C_US_-_2022_1.jpg/1280px-Glacier_National_Park%2C_Montana%2C_US_-_2022_1.jpg",
    alt: "Glacier National Park, Montana — Montana",
    credit: "TerryDOtt (CC BY 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Glacier_National_Park,_Montana,_US_-_2022_1.jpg",
  },
  "nebraska": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Omaha_skyline_on_I-480_over_the_Missouri_River.jpg/1280px-Omaha_skyline_on_I-480_over_the_Missouri_River.jpg",
    alt: "Omaha skyline — Nebraska",
    credit: "SounderBruce (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Omaha_skyline_on_I-480_over_the_Missouri_River.jpg",
  },
  "nevada": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Las_Vegas_%28Nevada%2C_USA%29%2C_The_Strip_--_2012_--_6215.jpg/1280px-Las_Vegas_%28Nevada%2C_USA%29%2C_The_Strip_--_2012_--_6215.jpg",
    alt: "Las Vegas skyline — Nevada",
    credit: "Dietmar Rabich (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Las_Vegas_(Nevada,_USA),_The_Strip_--_2012_--_6215.jpg",
  },
  "new-hampshire": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Mount_Washington_Cog_Railway_October_2021_024.jpg/1280px-Mount_Washington_Cog_Railway_October_2021_024.jpg",
    alt: "White Mountains, New Hampshire — New Hampshire",
    credit: "King of Hearts (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Mount_Washington_Cog_Railway_October_2021_024.jpg",
  },
  "new-jersey": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Lower_Manhattan_from_Jersey_City_November_2014_panorama_1.jpg/1280px-Lower_Manhattan_from_Jersey_City_November_2014_panorama_1.jpg",
    alt: "Manhattan skyline viewed from Jersey City — New Jersey",
    credit: "King of Hearts (CC BY-SA 3.0)",
    page: "https://commons.wikimedia.org/wiki/File:Lower_Manhattan_from_Jersey_City_November_2014_panorama_1.jpg",
  },
  "new-mexico": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Albuquerque%2C_New_Mexico_skyline.jpg/1280px-Albuquerque%2C_New_Mexico_skyline.jpg",
    alt: "Albuquerque skyline — New Mexico",
    credit: "Quintin Soloviev (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Albuquerque,_New_Mexico_skyline.jpg",
  },
  "new-york": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Brooklyn_Bridge_and_the_Lower_Manhattan_skyline_from_Pebble_Beach%2C_New_York.jpg/1280px-Brooklyn_Bridge_and_the_Lower_Manhattan_skyline_from_Pebble_Beach%2C_New_York.jpg",
    alt: "New York City skyline — New York",
    credit: "Christian David (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Brooklyn_Bridge_and_the_Lower_Manhattan_skyline_from_Pebble_Beach,_New_York.jpg",
  },
  "north-carolina": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Uptown_Charlotte_2018_taking_by_DJI_Phantom_4_pro_-_Perspective_Corrected_Edit.jpg/1280px-Uptown_Charlotte_2018_taking_by_DJI_Phantom_4_pro_-_Perspective_Corrected_Edit.jpg",
    alt: "Charlotte skyline — North Carolina",
    credit: "Precisionviews; edits (perspective correction and colour correction) made by Cma (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Uptown_Charlotte_2018_taking_by_DJI_Phantom_4_pro_-_Perspective_Corrected_Edit.jpg",
  },
  "north-dakota": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Little_Missouri_in_Theodore_Roosevelt_NP_ND1.jpg/1280px-Little_Missouri_in_Theodore_Roosevelt_NP_ND1.jpg",
    alt: "Theodore Roosevelt National Park, North Dakota — North Dakota",
    credit: "Acroterion (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Little_Missouri_in_Theodore_Roosevelt_NP_ND1.jpg",
  },
  "ohio": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Columbus_Skyline_Panorama.jpg/1280px-Columbus_Skyline_Panorama.jpg",
    alt: "Columbus skyline — Ohio",
    credit: "pasa47 (CC BY 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Columbus_Skyline_Panorama.jpg",
  },
  "oklahoma": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Chickasaw_Bricktown_Ballpark%2C_Oklahoma_City_Skyline_at_night.jpg/1280px-Chickasaw_Bricktown_Ballpark%2C_Oklahoma_City_Skyline_at_night.jpg",
    alt: "Oklahoma City skyline — Oklahoma",
    credit: "Spatms (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Chickasaw_Bricktown_Ballpark,_Oklahoma_City_Skyline_at_night.jpg",
  },
  "oregon": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Portland%2C_Oregon_Skyline_Sunset_%2822767146885%29.jpg/1280px-Portland%2C_Oregon_Skyline_Sunset_%2822767146885%29.jpg",
    alt: "Portland, Oregon skyline — Oregon",
    credit: "Tony Webster from Minneapolis, Minnesota (CC BY-SA 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Portland,_Oregon_Skyline_Sunset_(22767146885).jpg",
  },
  "pennsylvania": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Philadelphia_skyline_sunset.jpg/1280px-Philadelphia_skyline_sunset.jpg",
    alt: "Philadelphia skyline — Pennsylvania",
    credit: "Ed Yakovich (Emy111 at en.wikipedia) (Public domain)",
    page: "https://commons.wikimedia.org/wiki/File:Philadelphia_skyline_sunset.jpg",
  },
  "rhode-island": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Providence_skyline_01.jpg/1280px-Providence_skyline_01.jpg",
    alt: "Providence skyline — Rhode Island",
    credit: "Farragutful (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Providence_skyline_01.jpg",
  },
  "south-carolina": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Battery_Place%2C_Charleston_SC.jpg/1280px-Battery_Place%2C_Charleston_SC.jpg",
    alt: "Charleston, South Carolina — South Carolina",
    credit: "Photoartel (CC BY-SA 3.0)",
    page: "https://commons.wikimedia.org/wiki/File:Battery_Place,_Charleston_SC.jpg",
  },
  "south-dakota": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Aerial_view_of_Mount_Rushmore%2C_South_Dakota_LCCN2010630618_%28straightened%2C_enhanced%29.jpg/1280px-Aerial_view_of_Mount_Rushmore%2C_South_Dakota_LCCN2010630618_%28straightened%2C_enhanced%29.jpg",
    alt: "Mount Rushmore — South Dakota",
    credit: "Carol M. Highsmith (Public domain)",
    page: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Mount_Rushmore,_South_Dakota_LCCN2010630618_(straightened,_enhanced).jpg",
  },
  "tennessee": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Nashville_Skyline_from_Ft_Negly_2024.jpg/1280px-Nashville_Skyline_from_Ft_Negly_2024.jpg",
    alt: "Nashville skyline — Tennessee",
    credit: "Jschnake (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Nashville_Skyline_from_Ft_Negly_2024.jpg",
  },
  "texas": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Austin%2C_Texas_Skyline_2018.jpg/1280px-Austin%2C_Texas_Skyline_2018.jpg",
    alt: "Austin skyline — Texas",
    credit: "Sk5893 (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Austin,_Texas_Skyline_2018.jpg",
  },
  "utah": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Salt_Lake_City%2C_Utah%2C_United_States_skyline.jpg/1280px-Salt_Lake_City%2C_Utah%2C_United_States_skyline.jpg",
    alt: "Salt Lake City skyline — Utah",
    credit: "888emmanuelc888 (CC BY 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Salt_Lake_City,_Utah,_United_States_skyline.jpg",
  },
  "vermont": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Green_Mountains_banner_View_from_Killington_Peak.jpg/1280px-Green_Mountains_banner_View_from_Killington_Peak.jpg",
    alt: "Vermont mountain landscape — Vermont",
    credit: "Mimicamilleri (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Green_Mountains_banner_View_from_Killington_Peak.jpg",
  },
  "virginia": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Richmond%2C_Virginia_skyline_01.jpg/1280px-Richmond%2C_Virginia_skyline_01.jpg",
    alt: "Richmond skyline — Virginia",
    credit: "Ɱ (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Richmond,_Virginia_skyline_01.jpg",
  },
  "washington": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/1280px-SeattleI5Skyline.jpg",
    alt: "Seattle skyline — Washington",
    credit: "Cacophony (CC BY-SA 3.0)",
    page: "https://commons.wikimedia.org/wiki/File:SeattleI5Skyline.jpg",
  },
  "west-virginia": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/The_West_Virginia_State_Capitol_building_-_Dome.jpg/1280px-The_West_Virginia_State_Capitol_building_-_Dome.jpg",
    alt: "West Virginia State Capitol, Charleston — West Virginia",
    credit: "Daniel G Rego (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:The_West_Virginia_State_Capitol_building_-_Dome.jpg",
  },
  "wisconsin": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Doors_Open_Milwaukee_2025_15_%28Milwaukee_skyline%29.jpg/1280px-Doors_Open_Milwaukee_2025_15_%28Milwaukee_skyline%29.jpg",
    alt: "Milwaukee skyline — Wisconsin",
    credit: "Michael Barera (CC BY-SA 4.0)",
    page: "https://commons.wikimedia.org/wiki/File:Doors_Open_Milwaukee_2025_15_(Milwaukee_skyline).jpg",
  },
  "wyoming": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Grand_Teton_National_Park_-_Wyoming2.jpg/1280px-Grand_Teton_National_Park_-_Wyoming2.jpg",
    alt: "Grand Teton, Wyoming — Wyoming",
    credit: "Watts (CC BY 2.0)",
    page: "https://commons.wikimedia.org/wiki/File:Grand_Teton_National_Park_-_Wyoming2.jpg",
  },
};

export function getStateImage(slug: string): StateImage | undefined {
  return STATE_IMAGES[slug];
}
