import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import brandData from "../data/brandData"

const featuredBrands = brandData.filter((b) => b.isFeatured).slice(0, 6)

export default function FeaturedBrands() {
  return (
    <section className="py-2 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block mb-4 rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
            Brands
          </span>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Trusted by Leading Brands
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            We partner with globally recognized brands to deliver
            reliable, high-performance technology.
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-12 items-center">
          {featuredBrands.map((brand) => (
            <Link
              key={brand.title}
              to={brand.link}
              className="group flex items-center justify-center"
            >
              <motion.img
                src={brand.image}
                alt={brand.title}
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="max-h-14 object-contain
                grayscale opacity-70
                transition-all duration-300
                group-hover:grayscale-0
                group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 rounded-full
            border border-gray-300 px-8 py-3
            text-sm font-semibold text-gray-900
            hover:bg-gray-900 hover:text-white
            transition"
          >
            View all brands
          </Link>
        </div>

      </div>
    </section>
  )
}
