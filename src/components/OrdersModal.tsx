
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoBagHandleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderApi";
import formatPrice from "../helpers/formatCurrency";
import Spinner from "./Spinner";

interface OrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrdersModal = ({ isOpen, onClose }: OrdersModalProps) => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
        enabled: isOpen, // Only fetch when modal is open
    });

    const getDisplayStatus = (order: any) => {
        // If status is specific (cancelled), return it
        if (order.status === "cancelled") return "cancelled";

        // Check if 3 days have passed since creation
        const created = new Date(order.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 3) return "delivered";
        return order.status;
    };

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
                    className="relative bg-white rounded-[2.5rem] p-8 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-all hover:rotate-90"
                    >
                        <IoClose size={28} />
                    </button>

                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
                            <IoBagHandleOutline className="text-[#d87d4a] text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 font-manrope tracking-tight uppercase">
                                Order History
                            </h2>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#d87d4a] mt-1">
                                Your recent purchases
                            </p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex justify-center">
                            <Spinner />
                        </div>
                    ) : orders && orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => {
                                const displayStatus = getDisplayStatus(order);

                                const getStatusStyles = (status: string) => {
                                    switch (status) {
                                        case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
                                        case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
                                        case 'delivered': return 'bg-blue-50 text-blue-600 border-blue-100';
                                        case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
                                        default: return 'bg-slate-50 text-slate-600 border-slate-100';
                                    }
                                };

                                return (
                                    <motion.div
                                        key={order.id}
                                        whileHover={{ y: -4 }}
                                        className="relative group"
                                    >
                                        <Link
                                            to={`/order/${order.id}`}
                                            onClick={onClose}
                                            className="block bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer"
                                        >
                                            <div className="bg-slate-50/50 p-6 flex flex-wrap gap-6 justify-between items-center border-b border-slate-100">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Reference</p>
                                                    <p className="font-black text-slate-900 uppercase font-mono text-sm leading-none">#{order.id.slice(0, 8)}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Date</p>
                                                    <p className="font-bold text-slate-700 text-sm leading-none">
                                                        {new Date(order.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total</p>
                                                    <p className="font-black text-[#d87d4a] text-sm leading-none">{formatPrice(order.total)}</p>
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyles(displayStatus)}`}>
                                                    {displayStatus}
                                                </div>
                                            </div>

                                            <div className="p-6 flex items-center gap-6">
                                                <div className="w-20 h-20 bg-slate-50 rounded-2xl p-3 flex-shrink-0 flex items-center justify-center border border-slate-50">
                                                    <img src={order.items[0].image} alt={order.items[0].title} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 uppercase text-xs mb-1 truncate">{order.items[0].title}</h4>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-xs font-black text-slate-400 font-mono">{formatPrice(order.items[0].price)}</p>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        <p className="text-xs font-black text-slate-900 font-mono">x{order.items[0].quantity}</p>
                                                    </div>

                                                    {order.items.length > 1 && (
                                                        <div className="mt-3 flex items-center gap-1.5">
                                                            <div className="flex -space-x-2">
                                                                {order.items.slice(1, 4).map((item, i) => (
                                                                    <div key={i} className="w-6 h-6 rounded-full bg-white border border-slate-100 p-1">
                                                                        <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider ml-1">
                                                                + {order.items.length - 1} more
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#d87d4a] group-hover:text-white transition-colors">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <IoBagHandleOutline className="text-slate-200 text-4xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
                            <p className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
                                You haven't placed any orders yet. Start shopping to fill your history!
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#d87d4a] transition-all shadow-xl shadow-slate-200"
                            >
                                Start Shopping
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OrdersModal;
