import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">US Gutter Installation</h4>
                        <p className="text-sm">America&apos;s trusted gutter installation partner. Connecting homeowners with local experts nationwide.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Find Your City</Link></li>
                            <li><Link href="/#states" className="hover:text-white transition-colors">Browse States</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Get A Quote</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="cursor-default">Seamless Gutters</span></li>
                            <li><span className="cursor-default">Gutter Guards</span></li>
                            <li><span className="cursor-default">Cleaning & Repair</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    &copy; {currentYear} US Gutter Installation. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
