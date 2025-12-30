import Link from 'next/link'
import Footer from '@/components/Footer'
import { NavbarCallBtn, CallBtn } from '@/components/CallBtn'

export const metadata = {
    title: 'Contact GutterPro | Get a Free Quote Today',
    description: 'Contact our team for questions about gutter installation, warranties, or to schedule a free estimate in your city.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        GutterPro
                    </Link>
                    <NavbarCallBtn />
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 text-center">Contact Us</h1>
                    <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">
                        We are here to help. Reach out for quotes, support, or general inquiries.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6">Fastest Way to Reach Us</h2>
                            <p className="text-slate-600 mb-8">
                                For immediate quotes and scheduling, please call our 24/7 hotline. We have agents ready to connect you with a local pro.
                            </p>
                            <CallBtn className="w-full py-4 text-lg" label="Call Sales: +1 (858) 898-5338" />

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h3 className="font-bold mb-2">Hours of Operation</h3>
                                <p className="text-slate-500">Monday - Sunday: 24 Hours</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                                <p className="text-slate-600 mb-1">For non-urgent inquiries:</p>
                                <a href="mailto:support@usgutterinstallation.com" className="text-blue-600 font-semibold hover:underline">support@usgutterinstallation.com</a>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-2">Corporate Office</h3>
                                <p className="text-slate-600">
                                    2233 Road Druid<br />
                                    Clearwater, FL<br />
                                    United States
                                </p>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2">Need an Estimate?</h3>
                                <p className="text-blue-700 text-sm mb-4">
                                    The fastest way to get a price is to find your city page and call the local number or use the main hotline.
                                </p>
                                <Link href="/#states" className="text-blue-600 font-bold hover:underline text-sm">
                                    Find Your City &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
