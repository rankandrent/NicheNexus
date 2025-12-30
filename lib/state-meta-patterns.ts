// This file defines unique meta title patterns for every state to maximize SEO diversity.
// {0} = City Name
// {1} = State Code (e.g. TX)
// {2} = State Name (e.g. Texas)

// KEYWORD STRATEGY:
// Top Entities: Installation, Repair, Cleaning, Seamless Gutters, Gutter Guards, Replacement, Downspouts.
// Modifiers: Best, Affordable, Local, Near me, Top Rated, Pro, Expert.

export const stateMetaPatterns: Record<string, string> = {
    // A
    "AL": "Best Gutter Installation & Repair in {0}, {1} | Seamless Gutters",
    "AK": "{0} Gutter Services: Installation & Ice Dam Removal | Alaska",
    "AZ": "Gutter Installation, Cleaning & Repair {0} | Top Rated {1}",
    "AR": "Affordable Gutter Installers {0} Near Me | Repair & Clean",

    // C
    "CA": "Seamless Gutter Installation {0}, CA | Repair & Cleaning",
    "CO": "Heavy Duty Gutter Installation {0}, CO | Snow Guards & Repair",
    "CT": "Gutter Cleaning, Installation & Repair {0} {1}",

    // D - G
    "DE": "{0} Gutter Replacement & Repair Services | Delaware Installers",
    "DC": "Gutter Installation & Cleaning Washington DC | Metro Repair",
    "FL": "Seamless Gutter Installation {0} FL | 6-Inch & 7-Inch Gutters",
    "GA": "Gutter Guards & Installation in {0} | #1 Rated Georgia Pros",

    // H - I
    "HI": "Rain Gutter Installation {0}, Hawaii | Copper & Aluminum",
    "ID": "{0} Gutter Company: Installation & Ice Melt Systems | {1}",
    "IL": "Top Rated Gutter Installation {0}, IL | Cleaning & Repair",
    "IN": "{0} Seamless Gutters: Installation, Guards & Repair",
    "IA": "Gutter Replacement & Cleaning {0} | Iowa Local Experts",

    // K - M
    "KS": "Reliable Gutter Installers in {0}, KS | Storm Repair",
    "KY": "{0} Gutter Services: Installation, Leaf Guards & Cleaning",
    "LA": "Rain Gutter Installation {0}, LA | Repair & Leaf Protection",
    "ME": "Gutter Installation & Ice Dam Prevention {0}, Maine",
    "MD": "Maryland Gutter Experts: Installation & Cleaning in {0}",
    "MA": "Gutter Installation, Cleaning & Repair {0} Near Me",
    "MI": "{0} Gutter Contractors: Guards, Cleaning & New Install",
    "MN": "Seamless Gutters & Ice Dam Removal {0} MN | Install & Repair",
    "MS": "Affordable Gutter Repair & Installation {0}, Mississippi",
    "MO": "Gutter Solutions {0}, MO: Installation & Leaf Guards",
    "MT": "Montana Gutter Installers in {0} | Heavy Duty Systems",

    // N
    "NE": "Gutter Installation & Repair Services {0}, NE",
    "NV": "Gutter Installation {0} NV | Seamless Rain Gutters",
    "NH": "{0} Gutter & Roofing Services | New Hampshire Installers",
    "NJ": "Best Gutter Cleaning & Installation {0}, NJ | Repair Pros",
    "NM": "Gutter & Downspout Installation {0}, New Mexico",
    "NY": "Gutter Installation, Cleaning & Repair {0} Near Me",
    "NC": "North Carolina Gutter Pros: {0} Installation & Repair",
    "ND": "Durable Gutter Installation {0}, ND | Winter Ready Systems",

    // O - P
    "OH": "{0} Gutter Experts: Installation, Guards & Cleaning",
    "OK": "Storm Ready Gutters: Installation in {0}, Oklahoma",
    "OR": "Rain Gutter Specialists {0}, OR | Seamless & Micro-Mesh",
    "PA": "Gutter Installation, Cleaning & Repair {0} | Pennsylvania",

    // R - S
    "RI": "Rhode Island Gutter Installers: Serving {0} Areas",
    "SC": "Seamless Gutter Installation {0}, SC | Low Country Pros",
    "SD": "South Dakota Gutter Services: {0} Install & Repair",

    // T
    "TN": "{0} Gutter Installers: Cleaning & Repair | Tennessee",
    "TX": "Gutter Installation, Cleaning & Repair {0} Near Me",

    // U - V
    "UT": "Utah Gutter Solutions: {0} Installation & Heat Tape",
    "VT": "Vermont Gutter & Roof Protection in {0} | Local Pros",
    "VA": "Virginia Gutter Defense: {0} Installation & Cleaning",

    // W
    "WA": "Rain Gutter Installation {0}, WA | Leaf Filters & Guards",
    "WV": "West Virginia Gutter Pros: Serving {0} & Nearby",
    "WI": "Wisconsin Gutter Services {0}: Install, Clean, Thaw",
    "WY": "Wyoming Gutter & Snow Stops: {0} Installation Services"
}

// Fallback if state is missing
export const defaultMetaPattern = "Gutter Installation, Cleaning & Repair {0} Near Me"

export function getMetaTitle(city: string, stateCode: string, stateName: string): string {
    const pattern = stateMetaPatterns[stateCode.toUpperCase()] || defaultMetaPattern

    return pattern
        .replace("{0}", city)
        .replace("{1}", stateCode)
        .replace("{2}", stateName)
}
