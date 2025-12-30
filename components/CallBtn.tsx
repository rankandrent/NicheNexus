import Link from 'next/link'

export const PHONE_NUMBER = "+1 (858) 898-5338"
export const PHONE_HREF = "tel:+18588985338"

export function CallBtn({
    className = "",
    variant = "primary",
    label = "Call Now",
    showNumber = false
}: {
    className?: string,
    variant?: "primary" | "secondary" | "outline",
    label?: string,
    showNumber?: boolean
}) {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 transform active:scale-95"

    const variants = {
        primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30 rounded-full",
        secondary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-xl",
        outline: "border-2 border-white/20 hover:bg-white/10 text-white rounded-xl backdrop-blur-sm"
    }

    return (
        <a
            href={PHONE_HREF}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <span className="mr-2 text-xl">📞</span>
            <span>{label} {showNumber && <span className="ml-1 font-mono tracking-tighter opacity-90 block sm:inline"> | {PHONE_NUMBER}</span>}</span>
        </a>
    )
}

export function FloatingCallBtn() {
    return (
        <div className="fixed bottom-6 right-6 z-50 md:hidden animate-bounce-slow">
            <a
                href={PHONE_HREF}
                className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl border-4 border-white/20 font-bold text-lg"
            >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    📞
                </div>
                Call Now for Estimate
            </a>
        </div>
    )
}

export function NavbarCallBtn() {
    return (
        <a
            href={PHONE_HREF}
            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
        >
            <span className="animate-pulse">📞</span>
            <span>{PHONE_NUMBER}</span>
        </a>
    )
}
