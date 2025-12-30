import { supabase } from '@/lib/supabase'

export const revalidate = 86400 // Cache for 1 day

export async function GET() {
    const baseUrl = 'https://usgutterinstallation.com'

    // Fetch all distinct states
    // Note: Supabase doesn't support 'distinct' easily in standard query builder without .rpc, 
    // but we can fetch 'state_id' and process in JS as the list is small (50 states).
    // Or simpler: We know the 50 states or we fetch distinct state_id from cities.
    // Fetching all might be heavy? No, "usa city name" is ~40k rows. 
    // Selecting just state_id is fast enough (few MBs max data transfer), but better to use a dedicated query if possible.
    // Let's just fetch all and dedupe. It's safe for build/ISR.

    // Better optimization: Use a postgres function `.rpc('get_distinct_states')` if we could, 
    // but without database access to create functions, we'll fetch 'state_id' with head:false/count? 
    // No, we need values.
    // We'll trust standard select.

    const { data: cities } = await supabase
        .from('usa city name')
        .select('state_id')
    // We assume this table has all states.

    if (!cities) {
        return new Response('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>', {
            headers: { 'Content-Type': 'application/xml' }
        })
    }

    const uniqueStates = Array.from(new Set(cities.map(c => c.state_id))).sort()

    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${baseUrl}/sitemap/static.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    ${uniqueStates.map(state => `
    <sitemap>
        <loc>${baseUrl}/sitemap/${state}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    `).join('')}
</sitemapindex>`

    return new Response(sitemapIndexXML, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
