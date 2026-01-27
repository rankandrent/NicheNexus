import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { CallBtn, NavbarCallBtn } from '@/components/CallBtn'
import Breadcrumb from '@/components/Breadcrumb'
import { ServiceDetail } from '@/lib/services-data'
import CityMap from '@/components/CityMap'

interface ServiceSpecificPageProps {
    city: string
    state: string
    stateCode: string
    service: ServiceDetail
    relatedCities?: {
        city: string
        state_id: string
    }[]
}

// Service-specific extended content for semantic SEO - Gutter Services
const serviceExtendedContent: Record<string, {
    whatIs: string
    process: string[]
    materials: { name: string; description: string }[]
    faqs: { q: string; a: string }[]
    priceRange: string
    duration: string
    warranty: string
}> = {
    "seamless-gutter-installation": {
        whatIs: "Seamless gutter installation involves custom-fabricating continuous aluminum gutters on-site to perfectly fit your home's roofline. Unlike sectional gutters, seamless systems have no joints along the run, dramatically reducing leaks, clogs, and maintenance while providing superior water management.",
        process: [
            "Complete roofline measurement and assessment",
            "Custom on-site gutter fabrication with portable machine",
            "Removal of old gutters and inspection of fascia boards",
            "Installation of new hidden hangers every 24 inches",
            "Seamless gutter mounting with proper slope for drainage",
            "Downspout connection and water flow testing"
        ],
        materials: [
            { name: "Aluminum Coil Stock", description: "0.027-0.032 gauge aluminum, available in 30+ colors" },
            { name: "Hidden Hangers", description: "Heavy-duty brackets that mount inside the gutter" },
            { name: "Gutter Sealant", description: "Professional-grade silicone for watertight connections" },
            { name: "Aluminum Downspouts", description: "2x3 or 3x4 inch corrugated or smooth styles" }
        ],
        faqs: [
            { q: "How long do seamless gutters last?", a: "With proper maintenance, aluminum seamless gutters last 20-30 years. Copper can last 50+ years." },
            { q: "What colors are available?", a: "We offer 30+ factory-baked colors. Custom color matching is also available for an additional fee." },
            { q: "Do seamless gutters really prevent leaks?", a: "Yes! The only seams are at corners and downspouts, reducing leak points by 90% compared to sectional." }
        ],
        priceRange: "$8-15 per linear foot",
        duration: "1 day for most homes",
        warranty: "20-year material, 5-year labor"
    },
    "gutter-guards-leaf-protection": {
        whatIs: "Gutter guards are protective covers installed over your gutters to prevent leaves, debris, and pests from clogging your drainage system. Our micro-mesh and solid-cover options allow rainwater to flow freely while blocking even small debris like pine needles and shingle grit.",
        process: [
            "Complete gutter cleaning and inspection",
            "Assessment of debris type (leaves, needles, seeds)",
            "Selection of appropriate guard type for your situation",
            "Professional installation with secure fastening",
            "Testing with water to ensure proper flow",
            "Final adjustment of guard angle for optimal performance"
        ],
        materials: [
            { name: "Micro-Mesh Guards", description: "Surgical-grade stainless steel mesh blocks smallest debris" },
            { name: "Solid Cover Guards", description: "Aluminum covers with surface tension technology" },
            { name: "Foam Inserts", description: "Budget-friendly option that blocks large debris" },
            { name: "Brush Guards", description: "Polypropylene bristles that let water through" }
        ],
        faqs: [
            { q: "Do gutter guards really work?", a: "Yes! Quality guards reduce cleaning by 90-95%. Some fine debris may still require occasional maintenance." },
            { q: "Will they void my gutter warranty?", a: "Professional installation maintains warranties. DIY installation may void them." },
            { q: "Which type is best for pine trees?", a: "Micro-mesh guards are ideal for pine needles - they block needles while allowing water flow." }
        ],
        priceRange: "$7-20 per linear foot",
        duration: "4-8 hours for most homes",
        warranty: "Lifetime clog-free guarantee available"
    },
    "gutter-cleaning-maintenance": {
        whatIs: "Professional gutter cleaning removes leaves, debris, and buildup from your gutters and downspouts to ensure proper water drainage. Regular maintenance prevents water damage, foundation issues, and extends the life of your gutter system significantly.",
        process: [
            "Roof and gutter inspection for damage",
            "Manual debris removal from all gutters",
            "Downspout clearing and flushing",
            "Gutter realignment if sagging detected",
            "Seam and connection inspection",
            "Water flow testing to verify drainage"
        ],
        materials: [
            { name: "Gutter Scoops", description: "Specialized tools for efficient debris removal" },
            { name: "High-Pressure Flush", description: "Clears packed downspouts and stubborn clogs" },
            { name: "Ladder Stabilizers", description: "Safe access equipment for all roof types" },
            { name: "Gutter Sealant", description: "For minor repairs discovered during cleaning" }
        ],
        faqs: [
            { q: "How often should I clean gutters?", a: "At minimum twice yearly - spring and fall. Homes with many trees may need quarterly cleaning." },
            { q: "Can clogged gutters damage my home?", a: "Yes! Overflowing gutters cause foundation damage, basement flooding, fascia rot, and landscape erosion." },
            { q: "Do you repair while cleaning?", a: "Minor repairs like resealing seams are included. Major repairs are quoted separately." }
        ],
        priceRange: "$150-350 per cleaning",
        duration: "1-3 hours",
        warranty: "30-day clog-free guarantee"
    },
    "downspout-installation-extensions": {
        whatIs: "Downspout installation and extensions ensure rainwater is properly directed away from your foundation. We install new downspouts, replace damaged ones, and add extensions to discharge water at least 6 feet from your home to prevent flooding and foundation damage.",
        process: [
            "Water flow assessment and discharge planning",
            "Downspout sizing based on roof drainage area",
            "Secure mounting with aluminum straps",
            "Elbow and extension installation",
            "Underground drain connection if applicable",
            "Testing to verify proper water flow direction"
        ],
        materials: [
            { name: "Aluminum Downspouts", description: "2x3 or 3x4 inch in matching gutter colors" },
            { name: "Extension Pieces", description: "Above-ground extensions in various lengths" },
            { name: "Splash Blocks", description: "Concrete or plastic dispersal bases" },
            { name: "Flip-Up Extensions", description: "Retractable for easy lawn mowing" }
        ],
        faqs: [
            { q: "How far should water drain from foundation?", a: "Minimum 6 feet, ideally 10 feet. We can install underground drains for longer distances." },
            { q: "Can downspouts connect underground?", a: "Yes! We install buried drain lines to pop-up emitters for invisible water management." },
            { q: "How many downspouts do I need?", a: "Generally one downspout per 35-40 feet of gutter run. Large roof areas may need more." }
        ],
        priceRange: "$75-200 per downspout",
        duration: "2-4 hours",
        warranty: "5-year installation warranty"
    },
    "soffit-fascia-repair": {
        whatIs: "Soffit and fascia are the finishing pieces under your roof overhang that protect rafters and provide ventilation. Damaged soffit or fascia can lead to water intrusion, pest entry, and gutter failure. We repair or replace these critical components to maintain your home's integrity.",
        process: [
            "Inspection of existing soffit and fascia condition",
            "Removal of damaged sections and gutter detachment",
            "Wood rot repair or complete board replacement",
            "New fascia board installation with aluminum capping",
            "Vented soffit installation for proper attic airflow",
            "Gutter reattachment and painting if needed"
        ],
        materials: [
            { name: "Aluminum Fascia Cover", description: "Maintenance-free wrap over wood fascia" },
            { name: "Vinyl Soffit Panels", description: "Vented panels for attic ventilation" },
            { name: "PVC Fascia Boards", description: "Rot-proof composite alternative to wood" },
            { name: "Pressure-Treated Lumber", description: "Durable wood for structural replacement" }
        ],
        faqs: [
            { q: "Why is my fascia rotting?", a: "Usually from gutter overflow or ice dams. We fix the cause and replace the damaged wood." },
            { q: "Can you wrap existing fascia?", a: "If the wood is solid, yes. Rotted wood must be replaced before covering with aluminum." },
            { q: "Does soffit affect energy bills?", a: "Yes! Proper soffit ventilation reduces attic heat buildup and can lower cooling costs." }
        ],
        priceRange: "$6-20 per linear foot",
        duration: "1-2 days",
        warranty: "10-year material, 2-year labor"
    },
    "copper-gutter-systems": {
        whatIs: "Copper gutter systems are the premium choice for discerning homeowners. These hand-crafted gutters develop a beautiful patina over time, last 50-100 years, and add significant curb appeal and value to historic homes, luxury properties, and custom builds.",
        process: [
            "Detailed measurements and custom design",
            "Material ordering and lead time planning",
            "Careful removal of existing gutters",
            "Expert copper soldering of all joints",
            "Installation with copper hangers and hardware",
            "Sealing and initial patina treatment options"
        ],
        materials: [
            { name: "16-oz Copper Sheet", description: "Standard weight for residential copper gutters" },
            { name: "20-oz Copper Sheet", description: "Heavy-duty for commercial or large homes" },
            { name: "Copper Hangers", description: "Matching hardware for seamless appearance" },
            { name: "Lead-Free Solder", description: "Professional joints that last decades" }
        ],
        faqs: [
            { q: "How long until copper patinas?", a: "Bronze color develops in months, full green patina takes 15-20 years depending on climate." },
            { q: "Can I keep copper shiny?", a: "Yes, with regular polishing. Most owners prefer the natural patina as a mark of quality." },
            { q: "Are copper gutters worth the cost?", a: "For the right home, absolutely. They last 3-4x longer than aluminum and add significant value." }
        ],
        priceRange: "$25-50 per linear foot",
        duration: "2-4 days",
        warranty: "Lifetime material, 10-year labor"
    },
    "commercial-gutter-services": {
        whatIs: "Commercial gutter services handle the high-capacity drainage needs of businesses, apartment complexes, warehouses, and industrial facilities. We design and install large-scale gutter systems, box gutters, internal drainage, and high-volume downspout systems.",
        process: [
            "Site survey and drainage load calculation",
            "Engineering review and code compliance",
            "Custom fabrication of oversized gutters",
            "Crane or lift installation for large buildings",
            "Commercial-grade securing and waterproofing",
            "Final inspection and drainage verification"
        ],
        materials: [
            { name: "Box Gutters", description: "Built-in gutters for flat commercial roofs" },
            { name: "6-Inch K-Style", description: "High-capacity for large roof areas" },
            { name: "Industrial Downspouts", description: "4x5 or 5x6 inch for maximum flow" },
            { name: "Stainless Steel", description: "Corrosion-resistant for industrial environments" }
        ],
        faqs: [
            { q: "Do you handle multi-story buildings?", a: "Yes, we have lift equipment and OSHA-certified crews for buildings up to 6 stories." },
            { q: "Can you install during business hours?", a: "We offer flexible scheduling including nights and weekends to minimize disruption." },
            { q: "Do you offer maintenance contracts?", a: "Yes, commercial properties benefit from quarterly inspections and cleaning plans." }
        ],
        priceRange: "Custom quote required",
        duration: "1-2 weeks for large projects",
        warranty: "Commercial warranty terms apply"
    },
    "storm-damage-repair": {
        whatIs: "Storm damage repair restores your gutter system after severe weather events. High winds, falling branches, hail, and ice can crush, detach, or puncture gutters. Our rapid response team assesses damage, works with insurance, and restores your drainage system quickly.",
        process: [
            "Emergency assessment and documentation",
            "Insurance claim assistance and photos",
            "Temporary repairs if needed for active leaks",
            "Damaged section removal and disposal",
            "Matching material sourcing and fabrication",
            "Complete restoration and testing"
        ],
        materials: [
            { name: "Replacement Gutter Sections", description: "Matched to existing system color and style" },
            { name: "New Hangers", description: "Replace bent or pulled-out brackets" },
            { name: "Fascia Repair Materials", description: "Often damaged alongside gutters" },
            { name: "Sealant", description: "Waterproof all new connections" }
        ],
        faqs: [
            { q: "Will insurance cover this?", a: "Most homeowners policies cover sudden storm damage. We provide detailed documentation for claims." },
            { q: "How fast can you respond?", a: "For active water intrusion, we offer same-day emergency service in most areas." },
            { q: "Can you match my old gutters?", a: "We stock 30+ colors and can source specialty materials to match existing systems." }
        ],
        priceRange: "$200-2000+ depending on damage",
        duration: "Same-day to 2 days",
        warranty: "Standard installation warranty"
    },
    "ice-dam-removal": {
        whatIs: "Ice dam removal safely eliminates dangerous ice buildup at roof edges that traps water and causes interior leaks. We use steam equipment and safe techniques to clear ice without roof damage, and install prevention systems to stop future ice dam formation.",
        process: [
            "Roof and attic heat loss assessment",
            "Safe ice dam removal using steam equipment",
            "Gutter and downspout ice clearing",
            "Inspection for water damage",
            "Heat cable installation for prevention",
            "Attic ventilation improvement recommendations"
        ],
        materials: [
            { name: "Heat Cables", description: "Self-regulating cables for roof edges and gutters" },
            { name: "Ice Melt Panels", description: "Aluminum panels with integrated heating" },
            { name: "Attic Ventilation", description: "Ridge vents and soffit baffles" },
            { name: "Ice & Water Shield", description: "Membrane underlayment for new roofs" }
        ],
        faqs: [
            { q: "Why do ice dams form?", a: "Heat escaping through the roof melts snow, which refreezes at cold eaves creating dams." },
            { q: "Are heat cables worth it?", a: "For problem areas, yes. They prevent costly water damage from ice dam leaks." },
            { q: "Can I remove ice myself?", a: "We don't recommend it - improper removal damages shingles. Steam is the safe solution." }
        ],
        priceRange: "$400-800 removal, $600-1500 prevention",
        duration: "2-6 hours",
        warranty: "Heat cable manufacturer warranty"
    },
    "underground-drain-solutions": {
        whatIs: "Underground drain solutions move rainwater from downspouts to a safe discharge point far from your foundation. We install buried drain lines, pop-up emitters, French drains, and dry wells to eliminate soggy yards and protect foundations from water damage.",
        process: [
            "Site grading and water flow assessment",
            "Drain path planning to avoid utilities",
            "Trenching to proper depth and slope",
            "Solid or perforated pipe installation",
            "Pop-up emitter or dry well termination",
            "Backfilling and landscape restoration"
        ],
        materials: [
            { name: "Corrugated Drain Pipe", description: "Flexible, easy to route around obstacles" },
            { name: "Solid PVC Pipe", description: "Durable option for long runs" },
            { name: "Pop-Up Emitters", description: "Opens when water flows, closes when dry" },
            { name: "Dry Wells", description: "Underground basins for water absorption" }
        ],
        faqs: [
            { q: "How deep are drains buried?", a: "Typically 12-18 inches, below the frost line where required by code." },
            { q: "Will this kill my grass?", a: "Trenching disturbs sod, but we restore it. Within weeks, you won't see the line." },
            { q: "Can drains freeze?", a: "Properly sloped drains empty completely and won't freeze. We ensure correct installation." }
        ],
        priceRange: "$15-30 per linear foot",
        duration: "1-2 days",
        warranty: "10-year drain system warranty"
    },
    "color-gutter-matching": {
        whatIs: "Color gutter matching ensures your new or replacement gutters perfectly complement your home's exterior. We offer 30+ factory-baked aluminum colors, custom color matching, and advice on choosing colors that enhance your curb appeal and coordinate with trim and roofing.",
        process: [
            "On-site color consultation with samples",
            "Existing trim and roof color assessment",
            "Factory color selection or custom match",
            "Material ordering in specified color",
            "Professional installation with color-matched hardware",
            "Touch-up paint for any installation marks"
        ],
        materials: [
            { name: "Factory-Baked Aluminum", description: "30+ standard colors that won't peel or fade" },
            { name: "Custom Color Matching", description: "Match any existing color for additions" },
            { name: "Painted Copper", description: "Copper gutters with factory finish" },
            { name: "Color-Matched Accessories", description: "Downspouts, elbows, end caps in same color" }
        ],
        faqs: [
            { q: "Will the color fade?", a: "Factory-baked finishes resist fading for 20+ years. Low-quality paint will fade." },
            { q: "Can you match my old gutters?", a: "Usually yes. We have color charts and can custom order to match existing systems." },
            { q: "What colors are most popular?", a: "White, cream, brown, and bronze. Dark colors like black are trending for modern homes." }
        ],
        priceRange: "$1-3 upcharge per linear foot for specialty colors",
        duration: "No additional time",
        warranty: "Color fade warranty included"
    },
    "emergency-gutter-repair": {
        whatIs: "Emergency gutter repair provides rapid response when gutters fail during storms or after damage. Overflowing, detached, or crushed gutters cause immediate water intrusion. Our 24/7 service stabilizes the situation and performs permanent repairs quickly.",
        process: [
            "Rapid dispatch and phone assessment",
            "Temporary measures to stop water intrusion",
            "Damage documentation for insurance",
            "Emergency repair or replacement",
            "Downspout clearing if blocked",
            "Full system inspection for hidden damage"
        ],
        materials: [
            { name: "Emergency Patch Materials", description: "Quick-set repairs for immediate stop-gap" },
            { name: "Replacement Sections", description: "Trucks stocked with common sizes and colors" },
            { name: "Heavy-Duty Hangers", description: "Reinforce failing connections" },
            { name: "Sealant", description: "Stop active leaks immediately" }
        ],
        faqs: [
            { q: "Do you come out in storms?", a: "For safety, we wait for active severe weather to pass, but respond immediately after." },
            { q: "Is there an emergency fee?", a: "After-hours calls include a dispatch fee. We provide upfront pricing before work begins." },
            { q: "Can you do permanent repairs same day?", a: "Often yes for common repairs. Specialty materials may require a follow-up visit." }
        ],
        priceRange: "$150-500+ depending on repair",
        duration: "1-3 hours for most repairs",
        warranty: "Standard repair warranty applies"
    }
}

export default function ServiceSpecificPage({ city, state, stateCode, service, relatedCities }: ServiceSpecificPageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Get extended content for this service
    const extendedContent = serviceExtendedContent[service.slug] || serviceExtendedContent["seamless-gutter-installation"]

    // Build comprehensive schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.title} in ${formattedCity}, ${stateCode}`,
        "description": service.description(formattedCity, formattedState),
        "provider": {
            "@type": "HomeAndConstructionBusiness",
            "name": "US Gutter Installation",
            "telephone": "+18588985338",
            "url": "https://usgutterinstallation.com",
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": formattedCity,
                "addressRegion": stateCode,
                "addressCountry": "US"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": formattedCity,
            "containedInPlace": {
                "@type": "State",
                "name": formattedState
            }
        },
        "serviceType": service.title,
        "offers": {
            "@type": "Offer",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "USD",
                "price": extendedContent.priceRange
            },
            "availability": "https://schema.org/InStock"
        },
        "termsOfService": extendedContent.warranty,
        "url": `https://usgutterinstallation.com/${stateCode}/${city}/${service.slug}`
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": extendedContent.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">

            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        US Gutter Installation
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Locations</Link>
                            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                        </div>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            {service.title} in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-6 leading-tight tracking-tight">
                            {service.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{formattedCity}, {stateCode.toUpperCase()}</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 font-light">
                            {service.description(formattedCity, formattedState)}
                        </p>

                        {/* Quick Info Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                💰 {extendedContent.priceRange}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                ⏱️ {extendedContent.duration}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                🛡️ {extendedContent.warranty}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105" label="Get Free Quote" showNumber={true} />
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            {/* Professional Dynamic Service Image */}
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={service.heroImage}
                                    alt={`${service.title} - Professional Service`}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: state, href: `/${stateCode}` },
                { label: formattedCity, href: `/${stateCode}/${city}` },
                { label: service.title, href: `/${stateCode}/${city}/${service.slug}` }
            ]} />

            {/* What Is This Service Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                        What is {service.title}?
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {extendedContent.whatIs}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Key Features of Our {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.features.map((feature, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our {service.title} Process in {formattedCity}
                    </h2>
                    <div className="space-y-6">
                        {extendedContent.process.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-slate-700">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials Section */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Equipment & Options for {service.title}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {extendedContent.materials.map((material, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{material.name}</h3>
                                <p className="text-slate-600">{material.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Benefits of Professional {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl mb-4">
                                    {['✅', '⭐', '🏆', '💎'][i % 4]}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{benefit}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Expert {service.title.toLowerCase()} delivers this lasting value.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Service Area */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            {service.title} Service Area in {formattedCity}
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            We provide {service.title.toLowerCase()} services throughout {formattedCity} and the surrounding {stateCode.toUpperCase()} areas. Our local crews are familiar with {formattedCity}'s climate, drainage requirements, and local building codes.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Licensed & Insured in {stateCode.toUpperCase()}
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Local {formattedCity} Experts
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Same-day or next-day quotes available
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Top Rated in {stateCode}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <CityMap city={formattedCity} state={stateCode} />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {service.title} FAQs for {formattedCity} Homeowners
                    </h2>
                    <div className="space-y-4">
                        {extendedContent.faqs.map((faq, i) => (
                            <details key={i} className="group bg-slate-50 p-6 rounded-xl border border-slate-200 open:border-blue-300 open:bg-blue-50 transition-all">
                                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Info */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">{service.title} Pricing in {formattedCity}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">💵</div>
                            <div className="text-sm text-slate-500 mb-1">Typical Price Range</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.priceRange}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">⏰</div>
                            <div className="text-sm text-slate-500 mb-1">Time to Complete</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.duration}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">🛡️</div>
                            <div className="text-sm text-slate-500 mb-1">Warranty Included</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.warranty}</div>
                        </div>
                    </div>
                    <p className="text-slate-500 mt-6 text-sm">
                        *Prices vary based on home size, gutter condition, and material selection. Request a free quote for exact pricing.
                    </p>
                </div>
            </section>

            {/* Nearby Cities */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-white border-t border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            {service.title} Also Available in Nearby {stateCode.toUpperCase()} Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}/${service.slug}`}
                                    className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center text-slate-700 font-medium truncate"
                                    title={`${service.title} in ${cityData.city}`}
                                >
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready for {service.title} in {formattedCity}?
                    </h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                        Get a free, no-obligation quote from our local {formattedCity} experts. We respond within 24 hours with transparent pricing.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl" label="Call Now for Free Quote" showNumber={true} />
                </div>
            </section>

            <TrustBadges />
            <RelatedServices city={formattedCity} state={stateCode} />
            <Footer />
        </div>
    )
}
