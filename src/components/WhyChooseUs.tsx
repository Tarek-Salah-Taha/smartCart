import { Truck, Lock, Zap, Award } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description: "Free express shipping on orders over $100 worldwide",
        accent: "from-blue-500 to-cyan-400",
    },
    {
        icon: Lock,
        title: "Secure Payments",
        description: "256-bit SSL encryption with PCI-DSS compliance",
        accent: "from-emerald-500 to-green-400",
    },
    {
        icon: Award,
        title: "Premium Warranty",
        description: "3-year warranty with 24/7 customer support",
        accent: "from-amber-500 to-orange-400",
    },
    {
        icon: Zap,
        title: "Best Price",
        description: "30-day price match & money-back guarantee",
        accent: "from-purple-500 to-pink-400",
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-2 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                        <Zap className="w-4 h-4" />
                        Why Choose Us
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-5">
                        Built for Speed, Security & Trust
                    </h2>

                    <p className="text-lg text-gray-600">
                        A premium shopping experience designed to deliver quality, safety,
                        and unbeatable value.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(({ icon: Icon, title, description, accent }) => (
                        <div
                            key={title}
                            className="group relative rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                        >
                            {/* Hover Gradient */}
                            <div
                                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-10 transition duration-500`}
                            />

                            {/* Icon */}
                            <div
                                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center mb-6 shadow-md`}
                            >
                                <Icon className="w-7 h-7 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="relative text-xl font-semibold text-gray-900 mb-3">
                                {title}
                            </h3>

                            <p className="relative text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {[
                        { value: "50K+", label: "Customers" },
                        { value: "98%", label: "Satisfaction" },
                        { value: "24/7", label: "Support" },
                        { value: "3 Days", label: "Delivery" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-4xl font-bold text-gray-900 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm tracking-wide uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
