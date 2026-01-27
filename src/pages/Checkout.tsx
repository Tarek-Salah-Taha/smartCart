
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import formatPrice from "../helpers/formatCurrency";
import { useUser } from "../features/user/useUser";
import { useCart } from "../features/cart/useCart";
import CheckoutModal from "../components/CheckoutModal";
import { sendOrderConfirmation } from "../services/emailService";
import { useCartManager } from "../features/cart/useCartManager";
import Spinner from "../components/Spinner";

// Define form data types
type CheckoutFormData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    paymentMethod: "e-money" | "cash";
    eMoneyNumber?: string;
    eMoneyPin?: string;
    termsAccepted: boolean;
};

function Checkout() {
    const navigate = useNavigate();
    const { guestCart } = useCartManager();
    const { user, isAuthenticated } = useUser();
    const { data: userCart = [], isLoading } = useCart(user?.id ?? "", {
        enabled: isAuthenticated && !!user?.id,
    });

    const items = isAuthenticated ? userCart : guestCart;

    const totalPrice = items?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    ) ?? 0;

    const shippingCost = 50; // Flat rate for now
    const vat = totalPrice * 0.20; // 20% VAT
    const grandTotal = totalPrice + shippingCost;

    const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
        defaultValues: {
            paymentMethod: "e-money",
            termsAccepted: false
        }
    });

    const paymentMethod = watch("paymentMethod");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderId, setOrderId] = useState("");

    const onSubmit = async (data: CheckoutFormData) => {
        if (!items) return;
        console.log("Form Data:", data);
        console.log("Cart Items:", items);

        const newOrderId = Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderId(newOrderId);

        // Send email confirmation
        await sendOrderConfirmation({
            orderId: newOrderId,
            customerName: data.name,
            customerEmail: data.email,
            items: items.map(item => ({
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            total: grandTotal,
            shipping: shippingCost,
            tax: vat
        });

        // TODO: Implement actual checkout logic (API call)
        // toast.success("Order placed successfully!"); // Moved to modal or kept as immediate feedback? maybe remove if modal shows
        setIsModalOpen(true);
    };

    const handleFinish = () => {
        setIsModalOpen(false);
        navigate("/");
    };

    if (isLoading) return <div className="flex justify-center py-20"><Spinner /></div>;

    if (!items || items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
                <Link to="/allProducts" className="text-gray-500 hover:text-[#d87d4a] mb-8 inline-flex items-center gap-2 transition-colors">
                    <IoArrowBack /> Go Back
                </Link>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">You need to add items to your cart before checking out.</p>
                    <Link to="/allProducts" className="bg-[#d87d4a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#c76b3a] transition-colors">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f2f2] min-h-screen py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <Link
                    to="/cart"
                    className="text-gray-500 hover:text-[#d87d4a] mb-8 inline-flex items-center gap-2 transition-colors font-medium"
                >
                    <IoArrowBack /> Go Back
                </Link>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Checkout Form */}
                    <div className="flex-1 bg-white p-6 sm:p-10 rounded-2xl shadow-sm w-full">
                        <h1 className="text-3xl font-bold mb-10 text-gray-900 uppercase">Checkout</h1>

                        {/* Billing Details */}
                        <section className="mb-10">
                            <h2 className="text-[#d87d4a] text-sm font-bold uppercase tracking-wide mb-6">Billing Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.name ? "text-red-500" : "text-gray-900"}`}>Name</label>
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        type="text"
                                        placeholder="Alexei Ward"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.email ? "text-red-500" : "text-gray-900"}`}>Email Address</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email"
                                        placeholder="alexei@mail.com"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.phone ? "text-red-500" : "text-gray-900"}`}>Phone Number</label>
                                    <input
                                        {...register("phone", { required: "Phone number is required" })}
                                        type="tel"
                                        placeholder="+1 202-555-0136"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                                </div>
                            </div>
                        </section>

                        {/* Shipping Info */}
                        <section className="mb-10">
                            <h2 className="text-[#d87d4a] text-sm font-bold uppercase tracking-wide mb-6">Shipping Info</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2">
                                    <label className={`block text-xs font-bold mb-2 ${errors.address ? "text-red-500" : "text-gray-900"}`}>Address</label>
                                    <input
                                        {...register("address", { required: "Address is required" })}
                                        type="text"
                                        placeholder="1137 Williams Avenue"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address.message}</span>}
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.zip ? "text-red-500" : "text-gray-900"}`}>ZIP Code</label>
                                    <input
                                        {...register("zip", { required: "ZIP Code is required" })}
                                        type="text"
                                        placeholder="10001"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.zip ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.zip && <span className="text-red-500 text-xs mt-1 block">{errors.zip.message}</span>}
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.city ? "text-red-500" : "text-gray-900"}`}>City</label>
                                    <input
                                        {...register("city", { required: "City is required" })}
                                        type="text"
                                        placeholder="New York"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.city && <span className="text-red-500 text-xs mt-1 block">{errors.city.message}</span>}
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold mb-2 ${errors.country ? "text-red-500" : "text-gray-900"}`}>Country</label>
                                    <input
                                        {...register("country", { required: "Country is required" })}
                                        type="text"
                                        placeholder="United States"
                                        className={`w-full px-6 py-4 rounded-lg border ${errors.country ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                    />
                                    {errors.country && <span className="text-red-500 text-xs mt-1 block">{errors.country.message}</span>}
                                </div>
                            </div>
                        </section>

                        {/* Payment Details */}
                        <section className="mb-6">
                            <h2 className="text-[#d87d4a] text-sm font-bold uppercase tracking-wide mb-6">Payment Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold mb-2 text-gray-900">Payment Method</label>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <label className={`flex items-center gap-4 px-6 py-4 rounded-lg border cursor-pointer hover:border-[#d87d4a] transition-all ${paymentMethod === 'e-money' ? 'border-[#d87d4a] bg-orange-50/10' : 'border-gray-300'}`}>
                                        <input
                                            {...register("paymentMethod")}
                                            type="radio"
                                            value="e-money"
                                            className="accent-[#d87d4a] w-5 h-5"
                                        />
                                        <span className="font-bold text-sm text-gray-900">e-Money</span>
                                    </label>
                                    <label className={`flex items-center gap-4 px-6 py-4 rounded-lg border cursor-pointer hover:border-[#d87d4a] transition-all ${paymentMethod === 'cash' ? 'border-[#d87d4a] bg-orange-50/10' : 'border-gray-300'}`}>
                                        <input
                                            {...register("paymentMethod")}
                                            type="radio"
                                            value="cash"
                                            className="accent-[#d87d4a] w-5 h-5"
                                        />
                                        <span className="font-bold text-sm text-gray-900">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            {/* Dynamic Payment Inputs */}
                            {paymentMethod === 'e-money' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className={`block text-xs font-bold mb-2 ${errors.eMoneyNumber ? "text-red-500" : "text-gray-900"}`}>e-Money Number</label>
                                        <input
                                            {...register("eMoneyNumber", { required: paymentMethod === 'e-money' ? "e-Money Number is required" : false })}
                                            type="text"
                                            placeholder="238521993"
                                            className={`w-full px-6 py-4 rounded-lg border ${errors.eMoneyNumber ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                        />
                                        {errors.eMoneyNumber && <span className="text-red-500 text-xs mt-1 block">{errors.eMoneyNumber.message}</span>}
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-bold mb-2 ${errors.eMoneyPin ? "text-red-500" : "text-gray-900"}`}>e-Money PIN</label>
                                        <input
                                            {...register("eMoneyPin", { required: paymentMethod === 'e-money' ? "e-Money PIN is required" : false })}
                                            type="text"
                                            placeholder="6891"
                                            className={`w-full px-6 py-4 rounded-lg border ${errors.eMoneyPin ? "border-red-500" : "border-gray-300"} focus:border-[#d87d4a] focus:ring-1 focus:ring-[#d87d4a] outline-none font-bold text-sm`}
                                        />
                                        {errors.eMoneyPin && <span className="text-red-500 text-xs mt-1 block">{errors.eMoneyPin.message}</span>}
                                    </div>
                                </div>
                            )}
                            {paymentMethod === 'cash' && (
                                <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
                                    <div className="w-12 h-12 flex-shrink-0 text-[#d87d4a]">
                                        {/* Cash Icon Placeholder */}
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M42 6H6C3.79086 6 2 7.79086 2 10V38C2 40.2091 3.79086 42 6 42H42C44.2091 42 46 40.2091 46 38V10C46 7.79086 44.2091 6 42 6Z" stroke="#D87D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M24 24C28.4183 24 32 20.4183 32 16C32 11.5817 28.4183 8 24 8C19.5817 8 16 11.5817 16 16C16 20.4183 19.5817 24 24 24Z" stroke="#D87D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M36.79 38C36.79 32.74 31.06 28 24 28C16.94 28 11.21 32.74 11.21 38" stroke="#D87D4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        The "Cash on Delivery" option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                                    </p>
                                </div>
                            )}
                        </section>
                        <div className="mt-8">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    {...register("termsAccepted", { required: "You must accept the terms" })}
                                    className="w-5 h-5 accent-[#d87d4a]"
                                />
                                <span className="text-sm font-medium text-gray-500">I accept the <Link to="/termsAndPolicies" className="text-[#d87d4a] underline">Terms and Conditions</Link></span>
                            </label>
                            {errors.termsAccepted && <span className="text-red-500 text-xs mt-1 block">{errors.termsAccepted.message}</span>}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm w-full lg:w-[350px] shrink-0 self-start">
                        <h2 className="text-lg font-bold uppercase tracking-wide mb-8 text-gray-900">Summary</h2>
                        <div className="space-y-6 mb-8">
                            {items?.map((item) => (
                                <div key={item.itemId} className="flex items-center justify-between gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-900 text-sm truncate uppercase">{item.title}</p>
                                        <p className="text-sm font-bold text-gray-400">{formatPrice(item.price)}</p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-400">x{item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="uppercase text-gray-500 text-sm font-medium">Total</span>
                                <span className="font-bold text-lg text-gray-900">{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="uppercase text-gray-500 text-sm font-medium">Shipping</span>
                                <span className="font-bold text-lg text-gray-900">{formatPrice(shippingCost)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="uppercase text-gray-500 text-sm font-medium">VAT (Included)</span>
                                <span className="font-bold text-lg text-gray-900">{formatPrice(vat)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                                <span className="uppercase text-gray-500 text-sm font-medium">Grand Total</span>
                                <span className="font-bold text-lg text-[#d87d4a]">{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#d87d4a] text-white py-4 rounded-none uppercase font-bold text-sm tracking-widest hover:bg-[#c76b3a] transition-colors"
                        >
                            Continue & Pay
                        </motion.button>
                    </div>

                </form>
            </div>
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGoHome={handleFinish}
                orderId={orderId}
                grandTotal={grandTotal}
                shipping={shippingCost}
                vat={vat}
                items={items}
            />
        </div>
    );
}

export default Checkout;
