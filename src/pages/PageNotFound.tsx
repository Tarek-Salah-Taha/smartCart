import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiFileWarningLine } from "react-icons/ri";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 px-4 pt-16 sm:pt-24 pb-12 min-h-screen">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Center the icon and give it margin below */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RiFileWarningLine
            size={200}
            className="text-[#d87d4a] mb-4 drop-shadow-lg"
          />
        </motion.div>

        <motion.p
          className="text-2xl text-gray-700 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! The page you are looking for does not exist.
        </motion.p>

        {/* Center the button and add animation */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/"
            className="px-8 py-4 bg-[#d87d4a] text-white rounded-xl text-lg font-semibold hover:bg-[#c76b3a] transform hover:scale-105 transition duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
