import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Item } from "../types/types";
import formatPrice from "../helpers/formatCurrency";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGoHome: () => void;
    orderId: string;
    grandTotal: number;
    shipping: number;
    vat: number;
    items: Item[];
}

const CheckoutModal = ({
    isOpen,
    onClose,
    onGoHome,
    orderId,
    grandTotal,
    items
}: CheckoutModalProps) => {
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
                        <p className="text-gray-500 mb-4">
                            You will receive an email confirmation shortly.
                        </p>
                        {orderId && (
                            <p className="text-sm font-bold text-gray-400 uppercase">
                                Order ID: <span className="text-[#d87d4a]">{orderId}</span>
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-8 grid md:grid-cols-2">
                        <div className="p-6">
                            {items.length > 0 && (
                                <div className="border-b border-gray-200/50 pb-3 mb-3">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-md p-1 flex-shrink-0">
                                            <img src={items[0].image} alt={items[0].title} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 text-sm truncate uppercase">{items[0].title}</p>
                                            <p className="text-xs font-bold text-gray-500">{formatPrice(items[0].price)}</p>
                                        </div>
                                        <span className="text-sm font-bold text-gray-500">x{items[0].quantity}</span>
                                    </div>
                                </div>
                            )}
                            {items.length > 1 && (
                                <p className="text-xs font-bold text-gray-500 text-center">
                                    and {items.length - 1} other item(s)
                                </p>
                            )}
                        </div>
                        <div className="bg-black p-6 flex flex-col justify-center">
                            <p className="text-sm font-medium text-white/50 uppercase mb-2">Grand Total</p>
                            <p className="text-lg font-bold text-white">{formatPrice(grandTotal)}</p>
                        </div>
                    </div>

                    <button
                        onClick={onGoHome}
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
