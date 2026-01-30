
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    IoArrowBack,
    IoPencil,
    IoSave,
    IoClose,
    IoAdd,
    IoRemove,
    IoCubeOutline,
    IoCheckmarkCircle,
    IoTimeOutline,
    IoCalendarOutline,
    IoLocationOutline,
    IoCardOutline,
    IoInformationCircleOutline,
    IoTrash
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import { getOrderById, updateOrderStatus, updateOrderAddress, updateOrderItems } from "../services/orderApi";
import formatPrice from "../helpers/formatCurrency";
import Spinner from "../components/Spinner";
import ConfirmationModal from "../components/ConfirmationModal";
import toast from "react-hot-toast";
import { OrderItem } from "../types/types";

type EditAddressFormData = {
    address: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
};

function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isLastItemModalOpen, setIsLastItemModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingItems, setIsEditingItems] = useState(false);
    const [editedItems, setEditedItems] = useState<OrderItem[]>([]);

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrderById(id!),
        enabled: !!id,
    });

    const { register, handleSubmit, formState: { errors } } = useForm<EditAddressFormData>();

    const cancelMutation = useMutation({
        mutationFn: () => updateOrderStatus(id!, "cancelled"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order", id] });
            toast.success("Order cancelled successfully");
            navigate("/orders");
        },
        onError: () => toast.error("Failed to cancel order"),
    });

    const updateAddressMutation = useMutation({
        mutationFn: (data: EditAddressFormData) => updateOrderAddress(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order", id] });
            setIsEditing(false);
            toast.success("Address updated successfully");
        },
        onError: () => toast.error("Failed to update address"),
    });

    const updateItemsMutation = useMutation({
        mutationFn: ({ items, total }: { items: OrderItem[], total: number }) => updateOrderItems(id!, items, total),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order", id] });
            setIsEditingItems(false);
            toast.success("Items updated successfully");
        },
        onError: () => toast.error("Failed to update items"),
    });

    const onSubmitAddress = (data: EditAddressFormData) => {
        updateAddressMutation.mutate(data);
    };

    const handleEditItems = () => {
        if (!order) return;
        setEditedItems([...order.items]);
        setIsEditingItems(true);
    };

    const handleUpdateQuantity = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updated = [...editedItems];
        updated[index] = { ...updated[index], quantity: newQuantity };
        setEditedItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        if (editedItems.length === 1) {
            setIsLastItemModalOpen(true);
            return;
        }
        const updated = editedItems.filter((_, i) => i !== index);
        setEditedItems(updated);
    };

    const handleSaveItems = () => {
        const newTotal = editedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        updateItemsMutation.mutate({ items: editedItems, total: newTotal });
    };

    const handleCancelEditItems = () => {
        setIsEditingItems(false);
        setEditedItems([]);
    };

    if (isLoading) return <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa]"><Spinner /></div>;
    if (error || !order) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#fafafa]">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                <IoInformationCircleOutline className="text-rose-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-manrope">Order not found</h2>
            <p className="text-slate-500 mb-8 max-w-sm">The order you're looking for doesn't exist or you don't have permission to view it.</p>
            <Link to="/orders" className="bg-[#d87d4a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c76b3a] transition-all">
                Back to All Orders
            </Link>
        </div>
    );

    const getDisplayStatus = (order: any) => {
        if (order.status === "cancelled") return "cancelled";

        const created = new Date(order.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays > 3) return "delivered";
        return order.status;
    };

    const displayStatus = getDisplayStatus(order);

    const isOrderCancellable = displayStatus === 'confirmed' || displayStatus === 'pending';
    const createdDate = new Date(order.created_at);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
    const isWithinCancelWindow = diffHours < 24;

    const canEditOrCancel = isOrderCancellable && isWithinCancelWindow;

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'confirmed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'delivered': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const statusStyle = getStatusStyles(displayStatus);

    return (
        <div className="bg-[#fafafa] min-h-screen py-8 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Navigation & Title */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <button
                            onClick={() => navigate("/orders")}
                            className="text-slate-400 hover:text-[#d87d4a] mb-4 flex items-center gap-2 transition-colors font-medium group"
                        >
                            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Orders</span>
                        </button>
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-manrope tracking-tight">
                                Order <span className="text-[#d87d4a]">#{order.id.slice(0, 8).toUpperCase()}</span>
                            </h1>
                            <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${statusStyle} shadow-sm`}>
                                {displayStatus}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Order Status Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <IoTimeOutline className="text-[#d87d4a]" size={22} />
                                Order Details
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                            <IoCalendarOutline size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Placed On</p>
                                            <p className="text-sm font-bold text-slate-700">
                                                {createdDate.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    {order.updated_at && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                                <IoCheckmarkCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Last Activity</p>
                                                <p className="text-sm font-bold text-slate-700">
                                                    {new Date(order.updated_at).toLocaleDateString()} at {new Date(order.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#d87d4a]/5 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-[#d87d4a] mb-1">Status Note</p>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed leading-relaxed">
                                        {displayStatus === 'cancelled' ? (
                                            "This order has been cancelled and is no longer being processed."
                                        ) : displayStatus === 'delivered' ? (
                                            "Your order has been successfully delivered. Thank you for shopping with us!"
                                        ) : isWithinCancelWindow ? (
                                            "Your order is being confirmed. You can still modify items or shipping details for the next 24 hours."
                                        ) : (
                                            "Your order is currently in transit. We'll update you as soon as it reaches its destination."
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <IoCubeOutline className="text-[#d87d4a]" size={22} />
                                    Order Items
                                </h2>
                                {canEditOrCancel && !isEditingItems && (
                                    <button
                                        onClick={handleEditItems}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-[#d87d4a] hover:text-white transition-all font-bold text-xs uppercase tracking-widest border border-slate-100"
                                    >
                                        <IoPencil />
                                        <span>Edit Items</span>
                                    </button>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {isEditingItems ? (
                                    <motion.div
                                        key="editing"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-800 text-xs font-medium mb-6 flex items-start gap-3">
                                            <IoInformationCircleOutline className="text-orange-500 mt-0.5" size={18} />
                                            <span>Adjust quantities or remove items. Your total will be recalculated automatically when you save.</span>
                                        </div>
                                        {editedItems.map((item, index) => (
                                            <div key={index} className="group flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-[2rem] hover:shadow-md transition-all">
                                                <div className="w-20 h-20 bg-slate-50 rounded-2xl p-3 flex-shrink-0 flex items-center justify-center">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 truncate uppercase text-sm mb-1">{item.title}</h4>
                                                    <p className="font-bold text-[#d87d4a]">{formatPrice(item.price)}</p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-rose-500 disabled:opacity-50 transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <IoRemove />
                                                        </button>
                                                        <span className="w-10 text-center font-black text-slate-900 font-mono">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-emerald-500 transition-colors"
                                                        >
                                                            <IoAdd />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(index)}
                                                        className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                                        title="Remove item"
                                                    >
                                                        <IoTrash size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-4 justify-end pt-8">
                                            <button
                                                onClick={handleCancelEditItems}
                                                className="px-8 py-3.5 text-slate-400 hover:text-rose-500 font-black text-[11px] uppercase tracking-widest transition-colors"
                                            >
                                                Cancel Changes
                                            </button>
                                            <button
                                                onClick={handleSaveItems}
                                                className="flex items-center gap-3 bg-slate-900 text-white px-10 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all active:scale-95"
                                            >
                                                <IoSave />
                                                <span>Save Order</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="view"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-6 p-4 rounded-[1.5rem] hover:bg-slate-50/50 transition-colors border border-transparent hover:border-slate-100">
                                                <div className="w-20 h-20 bg-slate-50 rounded-2xl p-4 flex-shrink-0 flex items-center justify-center border border-slate-50">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 uppercase text-sm mb-1">{item.title}</h4>
                                                    <p className="text-slate-500 text-xs font-bold font-mono tracking-tight">{formatPrice(item.price)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-0.5">Quantity</p>
                                                    <p className="font-black text-slate-900 font-mono">x{item.quantity}</p>
                                                </div>
                                                <div className="hidden sm:block text-right min-w-[100px]">
                                                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-0.5">Subtotal</p>
                                                    <p className="font-black text-[#d87d4a]">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">

                        {/* Summary Card */}
                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#d87d4a]/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-[#d87d4a]/30 transition-colors duration-700"></div>

                            <h2 className="text-lg font-bold mb-8 flex items-center gap-3 relative z-10 uppercase tracking-widest text-[13px]">
                                <IoCardOutline className="text-[#d87d4a]" size={22} />
                                Price Summary
                            </h2>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total items cost</span>
                                    <span className="font-black font-mono">{formatPrice(order.total)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-white/5">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                    <span className="font-black text-emerald-400 uppercase text-[10px] tracking-widest">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-6 pb-2 border-t border-white/10">
                                    <span className="text-slate-300 font-black uppercase tracking-[0.2em] text-[11px]">Grand Total</span>
                                    <span className="text-2xl font-black text-[#d87d4a] font-mono leading-none">{formatPrice(order.total)}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Payment Method</p>
                                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <IoCardOutline className="text-[#d87d4a]" size={20} />
                                    </div>
                                    <span className="font-bold uppercase tracking-widest text-xs">{order.payment_method?.replace("-", " ")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                                    <IoLocationOutline className="text-[#d87d4a]" size={22} />
                                    Shipping
                                </h2>
                                {canEditOrCancel && !isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-slate-300 hover:text-[#d87d4a] transition-colors"
                                        title="Edit Address"
                                    >
                                        <IoPencil size={18} />
                                    </button>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {isEditing ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onSubmit={handleSubmit(onSubmitAddress)}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Address</label>
                                                <input
                                                    {...register("address", { required: "Address is required" })}
                                                    defaultValue={order.shipping_address?.address}
                                                    className={`w-full px-5 py-3 rounded-2xl bg-slate-50 border outline-none transition-all font-bold text-slate-900 text-sm ${errors.address ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:border-[#d87d4a] focus:bg-white'}`}
                                                />
                                                {errors.address && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.address.message}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                                                    <input
                                                        {...register("city", { required: "City is required" })}
                                                        defaultValue={order.shipping_address?.city}
                                                        className={`w-full px-5 py-3 rounded-2xl bg-slate-50 border outline-none transition-all font-bold text-slate-900 text-sm ${errors.city ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:border-[#d87d4a] focus:bg-white'}`}
                                                    />
                                                    {errors.city && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.city.message}</p>}
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Zip Code</label>
                                                    <input
                                                        {...register("zip", { required: "Zip code is required" })}
                                                        defaultValue={order.shipping_address?.zip}
                                                        className={`w-full px-5 py-3 rounded-2xl bg-slate-50 border outline-none transition-all font-bold text-slate-900 text-sm ${errors.zip ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:border-[#d87d4a] focus:bg-white'}`}
                                                    />
                                                    {errors.zip && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.zip.message}</p>}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</label>
                                                <input
                                                    {...register("country", { required: "Country is required" })}
                                                    defaultValue={order.shipping_address?.country}
                                                    className={`w-full px-5 py-3 rounded-2xl bg-slate-50 border outline-none transition-all font-bold text-slate-900 text-sm ${errors.country ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:border-[#d87d4a] focus:bg-white'}`}
                                                />
                                                {errors.country && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.country.message}</p>}
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone</label>
                                                <input
                                                    {...register("phone", { required: "Phone number is required" })}
                                                    defaultValue={order.shipping_address?.phone}
                                                    className={`w-full px-5 py-3 rounded-2xl bg-slate-50 border outline-none transition-all font-bold text-slate-900 text-sm ${errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-100 focus:border-[#d87d4a] focus:bg-white'}`}
                                                />
                                                {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1 uppercase tracking-wider">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors"
                                            >
                                                <IoClose size={24} />
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                            >
                                                <IoSave /> Save
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-1">
                                            <p className="font-bold text-slate-900 mb-0.5">{order.shipping_address?.address}</p>
                                            <p className="text-slate-500 font-medium text-sm">
                                                {order.shipping_address?.city}, {order.shipping_address?.zip}
                                            </p>
                                            <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">{order.shipping_address?.country}</p>
                                        </div>

                                        <div className="flex h-[1px] bg-slate-100 mx-4"></div>

                                        <div className="px-5 space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Contact Number</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                                    <IoCheckmarkCircle className="text-emerald-500" size={16} />
                                                </div>
                                                <span className="font-black text-slate-700 font-mono tracking-tighter">{order.shipping_address?.phone}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cancel Button */}
                        {canEditOrCancel && (
                            <div className="pt-4 flex flex-col items-center gap-4">
                                <div className="h-[1px] w-full bg-slate-100"></div>
                                <button
                                    onClick={() => setIsCancelModalOpen(true)}
                                    className="text-slate-400 hover:text-rose-500 font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-2 group"
                                >
                                    <IoTrash className="group-hover:scale-110 transition-transform" />
                                    <span>Cancel Entire Order</span>
                                </button>
                                <p className="text-rose-400 text-xs font-bold text-center italic">
                                    * Cancellation window expires in {(24 - diffHours).toFixed(1)} hours
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={() => cancelMutation.mutate()}
                title="Cancel Order?"
                message="Are you sure you want to cancel this order? This action cannot be undone and your items will be returned to inventory."
                confirmText="Yes, Cancel"
                isDestructive={true}
            />

            <ConfirmationModal
                isOpen={isLastItemModalOpen}
                onClose={() => setIsLastItemModalOpen(false)}
                onConfirm={() => {
                    setIsLastItemModalOpen(false);
                    setIsEditingItems(false);
                    setEditedItems([]);
                    cancelMutation.mutate();
                }}
                title="Cancel Order?"
                message="This is the last item in your order. Removing it will cancel the entire order. Do you want to cancel this order?"
                confirmText="Yes, Cancel Order"
                isDestructive={true}
            />
        </div>
    );
}

export default OrderDetails;
