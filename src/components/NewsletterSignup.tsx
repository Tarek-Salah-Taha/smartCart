import { useState } from "react"
import { Mail } from "lucide-react"

export default function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setEmail("")
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 px-10 py-16 sm:px-16 lg:px-24">

                    {/* Background decoration */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/40 to-transparent" />

                    <div className="relative max-w-4xl mx-auto text-center">
                        {/* Heading */}
                        <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
                            Stay in the loop
                        </h2>
                        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                            Subscribe for early access to new arrivals, special offers, and product updates
                        </p>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-12 flex flex-col sm:flex-row items-stretch gap-3"
                        >
                            <div className="relative flex-1">
                                <Mail className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-14 w-full rounded-xl border border-gray-300 bg-white
                             pl-14 pr-4 text-gray-900 placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                                />
                            </div>

                            <button
                                type="submit"
                                className="h-14 rounded-xl bg-gray-900 px-10
                           text-white font-medium
                           transition hover:bg-gray-800 active:scale-[0.98]
                           whitespace-nowrap"
                            >
                                {submitted ? "Subscribed" : "Subscribe"}
                            </button>
                        </form>

                        {/* Success Message */}
                        {submitted && (
                            <p className="mt-6 text-sm text-gray-700 font-medium">
                                ✓ Thanks for subscribing — we’ll keep it valuable
                            </p>
                        )}

                        {/* Trust hint */}
                        <p className="mt-4 text-xs text-gray-500">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
