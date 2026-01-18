// Optimization: Pre-computed patterns for better performance
// {0} = City, {1} = State Code

export const stateMetaPatterns: Record<string, string> = {
    "AL": "Best Sump Pump Installation & Repair in {0}, {1} | Basement Waterproofing",
    "AK": "Sump Pump Repair & Freeze Protection {0}, AK | Arctic Systems",
    "AZ": "Sump Pump Installation, Cleaning & Repair {0} | Top Rated {1}",
    "AR": "Basement Sump Pump Installation {0}, AR | Flood Prevention",
    "CA": "Submersible Sump Pump Installation {0}, CA | Repair & Battery Backup",
    "CO": "Heavy Duty Sump Pump Installation {0}, CO | French Drains",
    "CT": "Basement Waterproofing & Sump Pumps {0}, CT | High Water Table",
    "DE": "Sump Pump Services {0}, DE | Coastal Flood Prevention",
    "FL": "Sump Pump Installation {0} FL | Storm Ready Systems",
    "GA": "Basement & Crawlspace Sump Pumps {0}, GA | Waterproofing",
    "HI": "Sump Pump Installation {0}, Hawaii | Tropical Storm Protection",
    "ID": "Sump Pump Repair & Installation {0}, ID | Basement Systems",
    "IL": "Top Rated Sump Pump Installation {0}, IL | Battery Backups",
    "IN": "Sump Pump Replacement {0}, IN | Basement Waterproofing",
    "IA": "Sump Pump Installation & Repair {0}, IA | Flood Control",
    "KS": "Emergency Sump Pump Services {0}, KS | Tornado Alley Protection",
    "KY": "Licensed Sump Pump Installers {0}, KY | Basement Solutions",
    "LA": "Sump Pump Installation {0}, LA | Flood & Swamp Control",
    "ME": "Sump Pump Installation & Frozen Pipe Protection {0}, Maine",
    "MD": "Sump Pump Services {0}, MD | Chesapeake Bay Area",
    "MA": "Sump Pump Installation, Cleaning & Repair {0} Near Me",
    "MI": "Basement Sump Pump Systems {0}, MI | Lake Effect Protection",
    "MN": "Sump Pump Installation {0}, MN | Frozen Discharge Prevention",
    "MS": "Sump Pump Repair {0}, MS | Flood Control Systems",
    "MO": "Sump Pump Installation {0}, MO | Basement & Crawlspace",
    "MT": "Sump Pump Services {0}, MT | Snow Melt Protection",
    "NE": "Sump Pump Installation & Repair Services {0}, NE",
    "NV": "Sump Pump Installation {0} NV | Desert Flash Flood Systems",
    "NH": "Basement Waterproofing & Sump Pumps {0}, NH",
    "NJ": "Sump Pump Installation {0}, NJ | High Water Table Solutions",
    "NM": "Sump Pump Services {0}, NM | Monsoon Protection",
    "NY": "Sump Pump Installation, Cleaning & Repair {0} Near Me",
    "NC": "Sump Pump Installation {0}, NC | Hurricane Ready Systems",
    "ND": "Durable Sump Pump Installation {0}, ND | Winter Ready Systems",
    "OH": "Sump Pump Installation {0}, OH | Basement Waterproofing",
    "OK": "Tornado Shelter Sump Pumps {0}, OK | Flood Protection",
    "OR": "Heavy Rain Sump Pump Systems {0}, OR | Pacific NW",
    "PA": "Sump Pump Installation, Cleaning & Repair {0} | Pennsylvania",
    "RI": "Basement Sump Pumps {0}, RI | Coastal Flooding",
    "SC": "Sump Pump Installation {0}, SC | Low Country Pros",
    "SD": "Sump Pump Services {0}, SD | Meltwater Protection",
    "TN": "Basement Waterproofing & Pumps {0}, TN | Heavy Rain",
    "TX": "Sump Pump Installation, Cleaning & Repair {0} Near Me",
    "UT": "Sump Pump Services {0}, UT | Snow Melt & Flash Flood",
    "VT": "Basement Sump Systems {0}, VT | Spring Thaw Protection",
    "VA": "Sump Pump Installation {0}, VA | Coastal & Inland",
    "WA": "Sump Pump Installation {0}, WA | Continuous Rain Systems",
    "WV": "Hillside Sump Pump Systems {0}, WV | Runoff Control",
    "WI": "Sump Pump Installation {0}, WI | Basement Flooding Experts",
    "WY": "Sump Pump Repair {0}, WY | Reliable Systems"
}

export const defaultMetaPattern = "Sump Pump Installation, Cleaning & Repair {0} Near Me"

export function getMetaTitle(city: string, stateCode: string, stateName?: string): string {
    const pattern = stateMetaPatterns[stateCode.toUpperCase()] || defaultMetaPattern
    return pattern.replace('{0}', city).replace('{1}', stateName || stateCode)
}
