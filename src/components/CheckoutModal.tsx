import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmark, IoClose } from "react-icons/io5";


interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl overflow-hidden"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <IoClose size={24} />
                    </button>
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-[#d87d4a] rounded-full flex items-center justify-center mb-6">
                            <IoCheckmark className="text-white text-3xl" />
                        </div>
                        <h2 className="text-3xl font-bold uppercase text-gray-900 mb-4 leading-tight">
                            Thank you<br />for your order
                        </h2>
                        <p className="text-gray-500">
                            You will receive an email confirmation shortly.
                        </p>
                    </div>



                    <button
                        onClick={onClose}
                        className="w-full bg-[#d87d4a] text-white py-4 rounded-none uppercase font-bold text-sm tracking-widest hover:bg-[#c76b3a] transition-colors"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CheckoutModal;
