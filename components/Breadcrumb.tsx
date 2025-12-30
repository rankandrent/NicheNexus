import Link from 'next/link'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const schemaItems = [
        { label: 'Home', href: '/' },
        ...items.map(item => ({ label: item.label, href: item.href }))
    ]

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": schemaItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://usgutterinstallation.com${item.href}` // Replace with actual domain in production
        }))
    }

    return (
        <nav aria-label="Breadcrumb" className="py-3 bg-slate-100 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <li>
                        <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            {index === items.length - 1 ? (
                                <span className="font-semibold text-slate-900" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    )
}
