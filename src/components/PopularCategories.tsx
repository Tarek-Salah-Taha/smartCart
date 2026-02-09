import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categoryData from "../data/categoryData";
import { FaArrowRight } from "react-icons/fa";

const MotionLink = motion(Link);

function PopularCategories() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Decorative background elements with float animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 font-manrope tracking-tight"
          >
            Explore Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto"
          >
            Discover our wide range of premium products tailored to your lifestyle.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {categoryData.map((category) => (
            <MotionLink
              key={category.title}
              to={`categories/${category.link}`}
              className="group relative h-64 md:h-80 w-full overflow-hidden rounded-3xl bg-white shadow-lg border border-white/20"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
              whileHover="hover"
              initial="initial"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <motion.div
                  className="absolute inset-0 bg-black/40 z-10"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.1 }
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
                <motion.div
                  className="flex flex-col"
                  variants={{
                    initial: { y: 20 },
                    hover: { y: 0 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Icon & Title Row */}
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-sm ring-1 ring-white/30"
                      variants={{
                        initial: { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff" },
                        hover: { backgroundColor: "#fff", color: "#000" }
                      }}
                    >
                      <category.icon className="text-xl" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white capitalize font-manrope tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Description - Expands on hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    variants={{
                      initial: { height: 0, opacity: 0 },
                      hover: { height: "auto", opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 font-roboto line-clamp-3 pt-2">
                      {category.description}
                    </p>

                    <div className="flex items-center text-white font-semibold text-sm tracking-wide gap-2">
                      <span>Shop Now</span>
                      <motion.span
                        variants={{
                          initial: { x: 0 },
                          hover: { x: 5 }
                        }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </MotionLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PopularCategories;
