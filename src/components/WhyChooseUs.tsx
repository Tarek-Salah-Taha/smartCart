import { Truck, Lock, Zap, Award } from "lucide-react"

const features = [
    {
        icon: Truck,
        title: "Lightning Fast Delivery",
        description: "Free shipping on orders over $100 with 1-2 day express delivery",
        color: "bg-gradient-to-br from-blue-500 to-cyan-400",
        shadow: "shadow-blue-100"
    },
    {
        icon: Lock,
        title: "Bank-Level Security",
        description: "256-bit SSL encryption & PCI DSS compliance for all transactions",
        color: "bg-gradient-to-br from-emerald-500 to-green-400",
        shadow: "shadow-emerald-100"
    },
    {
        icon: Award,
        title: "Premium Warranty",
        description: "3-year warranty & 24/7 dedicated customer support team",
        color: "bg-gradient-to-br from-amber-500 to-orange-400",
        shadow: "shadow-amber-100"
    },
    {
        icon: Zap,
        title: "Price Guarantee",
        description: "Best price match with 30-day refund policy on all products",
        color: "bg-gradient-to-br from-purple-500 to-pink-400",
        shadow: "shadow-purple-100"
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-20 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-6">
                        <Zap className="w-4 h-4 mr-2" />
                        Why ElectroHub
                    </span>

                    <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Experience the Difference
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Where premium quality meets exceptional service, delivering unbeatable value with every purchase
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group relative h-full"
                            >
                                {/* Floating Card Effect */}
                                <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                                    {/* Animated Background Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Gradient Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-100 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-primary/10 to-transparent" />
                                    </div>

                                    {/* Icon Container */}
                                    <div className="relative mb-8">
                                        <div className={`absolute inset-0 ${feature.color} opacity-10 blur-2xl rounded-3xl transition-all duration-500 group-hover:opacity-20`} />
                                        <div className={`relative w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                                            <Icon className="w-10 h-10 text-white" />
                                        </div>
                                        {/* Decorative Dots */}
                                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full" />
                                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative space-y-4 flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-gray-800 transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {feature.description}
                                        </p>

                                        {/* Animated Underline */}
                                        <div className="pt-4 mt-auto">
                                            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500" />
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-3 h-3 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Divider with Icon */}
                <div className="mt-20 flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-px bg-gradient-to-r from-transparent to-gray-300" />
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-24 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-20 pt-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "50K+", label: "Happy Customers", suffix: "⭐" },
                            { value: "24/7", label: "Support Team", suffix: "🛡️" },
                            { value: "98%", label: "Satisfaction", suffix: "❤️" },
                            { value: "3-Day", label: "Avg. Delivery", suffix: "⚡" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative text-5xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {stat.value}
                                        <span className="text-2xl ml-1">{stat.suffix}</span>
                                    </div>
                                </div>
                                <div className="text-gray-600 text-lg font-medium tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}