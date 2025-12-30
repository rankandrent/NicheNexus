import { supabase } from '@/lib/supabase'
import ServicePage from '@/components/ServicePage'
// import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// Allow ISR
export const revalidate = 3600
export const dynamicParams = true

import { getCityData, getRelatedCities } from '@/lib/data-fetching'

interface PageProps {
    params: Promise<{
        state: string
        city: string
    }>
}

import { getMetaTitle } from '@/lib/state-meta-patterns'

// ... existing imports ...

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    const { state, city } = params

    // Fetch data for accurate State Name
    const cityData = await getCityData(state, city)

    // Format City/State for display
    const formattedCity = cityData?.city || city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const stateCode = cityData?.state_id || state.toUpperCase()
    const stateName = cityData?.state_name || stateCode

    const metaTitle = getMetaTitle(formattedCity, stateCode, stateName)

    return {
        title: metaTitle,
        description: `Looking for top-rated gutter installers in ${formattedCity}, ${stateCode}? We provide seamless gutter installation, guards, and cleaning. Get a fast free quote today!`,
        alternates: {
            canonical: `/${state}/${city}`
        },
        openGraph: {
            title: `Best Gutter Installation in ${formattedCity}, ${stateCode}`,
            description: `We are the #1 rated gutter experts in ${formattedCity}. Call now for seamless gutters, guards, and repairs. Lifetime warranty included.`,
            url: `https://gutterpro.com/${state}/${city}`,
        }
    }
}



export default async function Page(props: PageProps) {
    const params = await props.params
    const { state, city } = params

    const cityData = await getCityData(state, city)

    // If data found, use it to populate the component. 
    // If not found, we fall back to URL params for robustness or show 404.
    // We'll map the DB columns to the component props.
    const cityName = cityData?.city || city
    const stateName = cityData?.state_name || state
    const stateCodeProper = cityData?.state_id || state

    // Parse zip codes from space-separated string
    const zipCodes = cityData?.zips ? cityData.zips.split(' ').filter(Boolean) : []

    // Fetch related cities
    const relatedCities = await getRelatedCities(stateCodeProper, cityName)

    return <ServicePage
        city={cityName}
        state={stateName}
        stateCode={stateCodeProper}
        zipCodes={zipCodes}
        relatedCities={relatedCities}
        latitude={cityData?.lat}
        longitude={cityData?.lng}
    />
}
