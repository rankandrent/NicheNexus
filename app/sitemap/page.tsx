import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 86400 // Cache for 1 day

interface LocationData {
    state_id: string
    city: string
}

const STATE_NAMES: Record<string, string> = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
    HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
    MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
    MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
    NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
    SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
    VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
    DC: "District of Columbia"
}

export default async function HtmlSitemap() {
    // Fetch all cities and states using a loop to bypass 1000-row limit
    let allLocations: LocationData[] = []
    let from = 0
    const step = 999

    while (true) {
        const { data: chunk, error } = await supabase
            .from('usa city name')
            .select('state_id, city')
            .order('state_id', { ascending: true })
            .order('city', { ascending: true })
            .range(from, from + step)

        if (error || !chunk || chunk.length === 0) {
            console.error('Sitemap fetch error or complete:', error)
            break
        }

        allLocations = [...allLocations, ...chunk]

        if (chunk.length < step) {
            break // We reached the end
        }

        from += step + 1
    }

    const locations = allLocations

    if (!locations) {
        return <div className="p-12 text-center">Failed to load sitemap.</div>
    }

    // Group by State
    const sitemapData = locations.reduce((acc, loc: LocationData) => {
        const stateCode = loc.state_id.toUpperCase()
        if (!acc[stateCode]) {
            acc[stateCode] = []
        }
        acc[stateCode].push(loc.city)
        return acc
    }, {} as Record<string, string[]>)

    const sortedStates = Object.keys(sitemapData).sort()

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 border-b border-slate-200 pb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Site Directory</h1>
                    <p className="text-xl text-slate-600">
                        Browse all our {locations.length.toLocaleString()} service locations across the United States.
                    </p>
                    <div className="mt-4">
                        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                            &larr; Back to Home
                        </Link>
                    </div>
                </header>

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sortedStates.map(stateCode => (
                        <div key={stateCode} className="bg-white rounded-lg shadow-sm p-6 border border-slate-100 hover:shadow-md transition-shadow">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center justify-between">
                                <span className="truncate mr-2" title={STATE_NAMES[stateCode] || stateCode}>
                                    {STATE_NAMES[stateCode] || stateCode}
                                </span>
                                <Link
                                    href={`/${stateCode.toLowerCase()}`}
                                    className="text-sm font-normal text-blue-600 hover:underline whitespace-nowrap"
                                >
                                    View State
                                </Link>
                            </h2>
                            <ul className="space-y-2 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                {sitemapData[stateCode].map(city => {
                                    const citySlug = city.toLowerCase().replace(/ /g, '-')
                                    return (
                                        <li key={`${stateCode}-${city}`}>
                                            <Link
                                                href={`/${stateCode.toLowerCase()}/${citySlug}`}
                                                className="text-slate-600 hover:text-blue-600 hover:underline block truncate text-sm"
                                            >
                                                {city}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="mt-4 pt-2 border-t text-xs text-slate-400 text-right">
                                {sitemapData[stateCode].length} Locations
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
