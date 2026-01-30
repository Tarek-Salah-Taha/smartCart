
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IoBagHandleOutline, IoArrowBack, IoChevronForward } from "react-icons/io5";
import { getOrders } from "../services/orderApi";
import formatPrice from "../helpers/formatCurrency";
import Spinner from "../components/Spinner";

function Orders() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const getDisplayStatus = (order: any) => {
        if (order.status === "cancelled") return "cancelled";

        const created = new Date(order.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 3) return "delivered";
        return order.status;
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'delivered': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa]">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#fafafa]">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                    <IoBagHandleOutline className="text-rose-500 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-outfit">Oops! Failed to load orders</h2>
                <p className="text-slate-500 mb-8 max-w-sm">There was a problem retrieving your order history. Please check your connection and try again.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[#d87d4a] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#d87d4a]/20 hover:bg-[#c76b3a] transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#fafafa] min-h-screen py-8 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <button
                            onClick={() => navigate("/")}
                            className="text-slate-400 hover:text-[#d87d4a] mb-4 flex items-center gap-2 transition-colors font-medium group"
                        >
                            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Store</span>
                        </button>
                        <h1 className="text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">
                            My <span className="text-[#d87d4a]">Orders</span>
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Manage and track all your purchases in one place.
                        </p>
                    </div>
                </div>

                {orders && orders.length > 0 ? (
                    <div className="grid gap-6">
                        {orders.map((order) => {
                            const displayStatus = getDisplayStatus(order);
                            const statusStyle = getStatusStyles(displayStatus);

                            return (
                                <div
                                    key={order.id}
                                    className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Order Card Header */}
                                    <div className="px-6 py-5 border-b border-slate-50 flex flex-wrap gap-y-4 items-center justify-between bg-white group-hover:bg-slate-50/30 transition-colors">
                                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Order Ref</p>
                                                <p className="font-bold text-slate-900 font-mono">#{order.id.slice(0, 8).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Placed On</p>
                                                <p className="font-bold text-slate-700">
                                                    {new Date(order.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Total Amount</p>
                                                <p className="font-bold text-[#d87d4a] text-lg">{formatPrice(order.total)}</p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${statusStyle} shadow-sm`}>
                                            {displayStatus}
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-5">
                                                {/* Mini Product Gallery (showing first item) */}
                                                <div className="relative group/img">
                                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all">
                                                        <img
                                                            src={order.items[0].image}
                                                            alt={order.items[0].title}
                                                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                        x{order.items[0].quantity}
                                                    </div>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-[#d87d4a] uppercase tracking-wider mb-1">Item(s)</p>
                                                    <h3 className="font-bold text-slate-900 truncate uppercase text-sm md:text-base mb-1">
                                                        {order.items[0].title}
                                                    </h3>
                                                    {order.items.length > 1 ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold">
                                                            + {order.items.length - 1} other item{order.items.length > 2 ? 's' : ''} in this order
                                                        </span>
                                                    ) : (
                                                        <p className="text-slate-400 text-xs font-medium">Single item order</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                            <Link
                                                to={`/order/${order.id}`}
                                                className="group/btn flex items-center justify-center gap-3 bg-white border-2 border-slate-900 text-slate-900 px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
                                            >
                                                <span>{displayStatus === 'cancelled' || displayStatus === 'delivered' ? 'View Details' : 'View & Edit Details'}</span>
                                                <IoChevronForward className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-12 sm:p-20 text-center border border-slate-100 shadow-xl shadow-slate-200/40">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <IoBagHandleOutline className="text-slate-300 text-4xl" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 font-outfit tracking-tight">Your order list is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
                            Looks like you haven't made your first purchase yet. Explore our premium collection and start shopping today!
                        </p>
                        <Link
                            to="/allProducts"
                            className="inline-block bg-[#d87d4a] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#d87d4a]/30 hover:bg-[#c76b3a] hover:-translate-y-1 transition-all"
                        >
                            Discover Products
                        </Link>
                    </div>
                )}

                {/* FAQ/Support Section */}
                <div className="mt-20 p-8 rounded-[2.5rem] bg-slate-900 text-white flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold mb-2">Need help with an order?</h3>
                    <p className="text-slate-400 text-sm mb-6 max-w-md">Our support team is available 24/7 to assist you with tracking, modifications, or any questions about your purchases.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/faqs" className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-white/10">View FAQs</Link>
                        <Link to="/contactSupport" className="text-[#d87d4a] hover:underline text-xs font-black uppercase tracking-widest px-6 py-2.5 transition-all">Contact Support</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
