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
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-0 z-50"
    >
      <motion.div
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center"
        initial={{ y: "-20px" }}
        animate={{ y: "0px" }}
        exit={{ y: "-20px" }}
        transition={{ duration: 0.3 }}
      >
        {/* Close (×) button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Sign in to save your items across devices
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Or continue as guest (data saved only on this device).
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => {
              onContinueAsGuest();
              onClose();
            }}
            className="px-4 py-2 border rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Continue as Guest
          </motion.button>
          <motion.button
            onClick={() => {
              onSignIn();
              onClose();
            }}
            className="px-4 py-2 bg-[#d87d4a] text-white rounded-md hover:bg-[#c76b3a] transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Sign In / Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
