
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IoArrowBack,
    IoMailOutline,
    IoCallOutline,
    IoLocationOutline,
    IoChatbubbleEllipsesOutline,
    IoSendOutline,
    IoCheckmarkCircleOutline
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function ContactSupport() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            toast.success("Message sent successfully!");
        }, 1500);
    };

    return (
        <div className="bg-[#fafafa] min-h-screen py-8 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-400 hover:text-[#d87d4a] mb-8 flex items-center gap-2 transition-colors font-medium group"
                >
                    <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 font-manrope tracking-tight mb-4">
                                Get in <span className="text-[#d87d4a]">touch</span>
                            </h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                Have questions about an order or our products? Our dedicated team is here to help you 24/7.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Contact Methods */}
                            <div className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <IoMailOutline className="text-[#d87d4a] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Email us</h3>
                                    <p className="text-slate-500 text-sm mb-2">Expect a response within 2 hours.</p>
                                    <p className="font-bold text-[#d87d4a]">support@smartcart.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <IoCallOutline className="text-emerald-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Call us</h3>
                                    <p className="text-slate-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                                    <p className="font-bold text-emerald-600">+1 (555) 000-0000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <IoLocationOutline className="text-blue-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">Our Office</h3>
                                    <p className="text-slate-500 text-sm mb-2">Come say hello at our headquarters.</p>
                                    <p className="font-bold text-blue-600">123 Commerce St, Tech City</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links or Live Chat CTA */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d87d4a]/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#d87d4a]/30 transition-colors duration-500"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Live Chat</h4>
                                    <p className="text-slate-400 text-sm">Instant help from an agent</p>
                                </div>
                                <div className="w-12 h-12 bg-[#d87d4a] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                                    <IoChatbubbleEllipsesOutline className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 sm:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <h2 className="text-2xl font-bold text-slate-900 mb-8 font-manrope">Send us a message</h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="John"
                                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#d87d4a] focus:bg-white transition-all font-bold text-slate-900"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Doe"
                                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#d87d4a] focus:bg-white transition-all font-bold text-slate-900"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#d87d4a] focus:bg-white transition-all font-bold text-slate-900"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                                                <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#d87d4a] focus:bg-white transition-all font-bold text-slate-900 appearance-none">
                                                    <option>Order Inquiry</option>
                                                    <option>Product Question</option>
                                                    <option>Shipping Issue</option>
                                                    <option>Return/Refund</option>
                                                    <option>Technical Support</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    placeholder="How can we help you?"
                                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#d87d4a] focus:bg-white transition-all font-bold text-slate-900 resize-none"
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:translate-y-0 flex items-center justify-center gap-3 active:scale-95"
                                            >
                                                {isLoading ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <IoSendOutline className="text-lg" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center"
                                    >
                                        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <IoCheckmarkCircleOutline className="text-emerald-500 text-6xl" />
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 font-manrope">Message Sent!</h2>
                                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg lg:text-xl">
                                            Thank you for reaching out. We've received your inquiry and our team will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="inline-block bg-[#d87d4a] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-[#d87d4a]/30 hover:bg-[#c76b3a] transition-all"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSupport;
