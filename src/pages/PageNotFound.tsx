import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiFileWarningLine } from "react-icons/ri";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 px-4 min-h-screen">
      <motion.div
        className="text-center max-w-2xl w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Icon with subtle background */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 rounded-full transform scale-125 -z-10"></div>
            <RiFileWarningLine
              size={120}
              className="text-[#d87d4a] drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Content section */}
        <div className="space-y-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Oops! The page you are looking for doesn't exist or has been moved.
          </motion.p>
        </div>

        {/* Button with enhanced styling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-4"
        >
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-[#d87d4a] text-white rounded-xl text-lg font-semibold hover:bg-[#c76b3a] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
