import { useState } from "react"
import { Mail, Check } from "lucide-react"

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
        <section className="py-2 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/70 backdrop-blur-xl shadow-xl px-8 py-20 sm:px-16">

                    {/* Background glow */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-3xl" />
                    </div>

                    <div className="relative max-w-3xl mx-auto text-center">
                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                            Stay in the loop
                        </h2>

                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            Get early access to new arrivals, exclusive offers,
                            and product updates — no noise, just value.
                        </p>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-14 flex flex-col sm:flex-row gap-4"
                        >
                            <div className="relative flex-1">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-14 w-full rounded-2xl border border-gray-300 bg-white
                  pl-14 pr-4 text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="h-14 rounded-2xl px-10 font-medium text-white
                bg-gradient-to-r from-gray-900 to-gray-800
                hover:from-gray-800 hover:to-gray-700
                transition-all active:scale-[0.97] whitespace-nowrap"
                            >
                                {submitted ? "Subscribed" : "Subscribe"}
                            </button>
                        </form>

                        {/* Success message */}
                        {submitted && (
                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                                <Check className="h-4 w-4" />
                                Thanks for subscribing — we’ll keep it meaningful
                            </div>
                        )}

                        {/* Trust hint */}
                        <p className="mt-5 text-xs text-gray-500">
                            No spam. Unsubscribe anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
