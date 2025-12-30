import { supabase } from '@/lib/supabase'
import { servicesData } from '@/lib/services-data'

export const revalidate = 86400 // Cache for 1 day

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const baseUrl = 'https://usgutterinstallation.com'

    // 1. Handle Static Sitemap
    if (id === 'static.xml') {
        const staticRoutes = [
            '', // Home
            '/about',
            '/contact',
            '/privacy',
            '/terms',
        ]

        const urlSet = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes.map(route => `
    <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
</urlset>`

        return new Response(urlSet, { headers: { 'Content-Type': 'application/xml' } })
    }

    // 2. Handle State Sitemaps (e.g., TX.xml)
    // Validate if it looks like a state XML (2 chars + .xml)
    const stateMatch = id.match(/^([a-zA-Z]{2})\.xml$/)
    if (!stateMatch) {
        return new Response('Not Found', { status: 404 })
    }

    const stateCode = stateMatch[1].toUpperCase()

    // Fetch cities for this state
    const { data: cities } = await supabase
        .from('usa city name')
        .select('city, state_id')
        .ilike('state_id', stateCode)
        .order('city', { ascending: true })

    if (!cities || cities.length === 0) {
        // Return empty sitemap or 404? Empty might be safer.
        return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
            headers: { 'Content-Type': 'application/xml' }
        })
    }

    // State Page URL
    const stateUrl = `
    <url>
        <loc>${baseUrl}/${stateCode}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>`

    // City & Service URLs
    const cityUrls = cities.map(city => {
        const citySlug = city.city.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        const mainCityUrl = `
    <url>
        <loc>${baseUrl}/${stateCode}/${citySlug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`

        const serviceUrls = Object.values(servicesData).map(service => `
    <url>
        <loc>${baseUrl}/${stateCode}/${citySlug}/${service.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`).join('')

        return mainCityUrl + serviceUrls
    }).join('')

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${stateUrl}
    ${cityUrls}
</urlset>`

    return new Response(sitemapXML, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
