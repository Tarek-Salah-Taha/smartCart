import { Star, Quote, Sparkles } from "lucide-react"

const testimonials = [
    {
        author: "Sarah Chen",
        role: "Senior Tech Analyst",
        company: "TechFlow Inc.",
        content: "ElectroHub completely transformed our office setup. The quality is unmatched and delivery was faster than promised. Their support team is exceptional!",
        rating: 5,
        avatar: "SC",
        color: "bg-gradient-to-br from-blue-500 to-cyan-400"
    },
    {
        author: "Marcus Rodriguez",
        role: "Lead Developer",
        company: "Digital Solutions Co.",
        content: "The performance-to-price ratio is incredible. Ordered 20 laptops for our team - all arrived perfect. This is now our go-to tech supplier.",
        rating: 5,
        avatar: "MR",
        color: "bg-gradient-to-br from-emerald-500 to-teal-400"
    },
    {
        author: "Jessica Park",
        role: "Creative Director",
        company: "Studio Nova",
        content: "As a professional photographer, the gear quality is crucial. ElectroHub delivered premium equipment that exceeded expectations. Stunning results!",
        rating: 5,
        avatar: "JP",
        color: "bg-gradient-to-br from-purple-500 to-pink-400"
    },
    {
        author: "David Miller",
        role: "IT Manager",
        company: "Global Systems",
        content: "Our entire infrastructure runs on ElectroHub products. 3 years, zero failures. The warranty support saved us thousands in potential downtime.",
        rating: 5,
        avatar: "DM",
        color: "bg-gradient-to-br from-amber-500 to-orange-400"
    },
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 mb-6">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                            Trusted by Professionals
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Voices of Satisfaction
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of professionals who trust ElectroHub for their technology needs
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.author}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 hover:shadow-xl group transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                        >
                            {/* Quote Icon */}
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-white rounded-xl flex items-center justify-center mb-6 border border-gray-100 group-hover:border-primary/20">
                                <Quote className="w-6 h-6 text-gray-300 group-hover:text-primary/50 transition-colors" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <blockquote className="text-base text-gray-700 mb-6 leading-relaxed flex-1">
                                "{testimonial.content}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-auto">
                                <div className={`w-10 h-10 ${testimonial.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-sm font-bold text-white">
                                        {testimonial.avatar}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 truncate">{testimonial.author}</p>
                                    <p className="text-xs text-gray-600 truncate">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-20 pt-12 border-t border-gray-200 text-center">
                    <div className="inline-flex items-center gap-8 flex-wrap justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">4.9/5</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">10K+</div>
                            <div className="text-gray-600">Verified Reviews</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">99%</div>
                            <div className="text-gray-600">Recommend Us</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}