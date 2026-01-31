import { motion } from "framer-motion";
import { GuestWarningModalProps } from "../types/types";
import { useEscapeKey } from "../Hooks/useEscapeKey";

export default function GuestWarningModal({
  open,
  onClose,
  onContinueAsGuest,
  onSignIn,
}: GuestWarningModalProps) {
  useEscapeKey(onClose);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/10 z-[60] p-4"
    >
      <motion.div
        className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center border border-gray-200"
        initial={{ y: "-20px", scale: 0.95 }}
        animate={{ y: "0px", scale: 1 }}
        exit={{ y: "-20px", scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Close (×) button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Sign in to save your items
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Or continue as guest (data saved only on this device).
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <motion.button
            onClick={() => {
              onContinueAsGuest();
              onClose();
            }}
            className="px-5 py-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue as Guest
          </motion.button>
          <motion.button
            onClick={() => {
              onSignIn();
              onClose();
            }}
            className="px-5 py-3 bg-[#d87d4a] text-white rounded-lg hover:bg-[#c76b3a] transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In / Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
