import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        author: "Sarah Chen",
        role: "Senior Tech Analyst",
        company: "TechFlow Inc.",
        content:
            "SmartCart transformed our office setup. Exceptional quality, fast delivery, and truly professional support.",
        rating: 5,
        avatar: "SC",
        accent: "from-blue-500 to-cyan-400",
    },
    {
        author: "Marcus Rodriguez",
        role: "Lead Developer",
        company: "Digital Solutions Co.",
        content:
            "Outstanding value for money. Ordered 20 laptops — flawless delivery and zero issues. Highly recommended.",
        rating: 5,
        avatar: "MR",
        accent: "from-emerald-500 to-teal-400",
    },
    {
        author: "Jessica Park",
        role: "Creative Director",
        company: "Studio Nova",
        content:
            "Premium gear that exceeded expectations. The quality and reliability are exactly what professionals need.",
        rating: 5,
        avatar: "JP",
        accent: "from-purple-500 to-pink-400",
    },
    {
        author: "David Miller",
        role: "IT Manager",
        company: "Global Systems",
        content:
            "Three years of usage, zero failures. Their warranty and support saved us serious downtime costs.",
        rating: 5,
        avatar: "DM",
        accent: "from-amber-500 to-orange-400",
    },
]

export default function Testimonials() {
    return (
        <section className="py-2 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                        Customer Stories
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
                        Trusted by Professionals Worldwide
                    </h2>

                    <p className="text-lg text-gray-600">
                        Thousands of teams rely on SmartCart for performance,
                        reliability, and long-term value.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.author}
                            className="group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Subtle accent */}
                            <div
                                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${t.accent} opacity-0 group-hover:opacity-10 transition duration-500`}
                            />

                            {/* Quote */}
                            <Quote className="h-8 w-8 text-gray-300 mb-6" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-700 leading-relaxed mb-8">
                                “{t.content}”
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200 mt-auto">
                                <div
                                    className={`h-11 w-11 rounded-xl bg-gradient-to-br ${t.accent} flex items-center justify-center font-bold text-white`}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {t.author}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-3 gap-12 text-center">
                    {[
                        { value: "4.9/5", label: "Average Rating" },
                        { value: "10,000+", label: "Verified Reviews" },
                        { value: "99%", label: "Recommend Us" },
                    ].map((s) => (
                        <div key={s.label}>
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {s.value}
                            </div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
