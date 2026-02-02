import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/userApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const { mutate, isPending, isSuccess, reset } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success("Password reset link sent to your email!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to send reset link");
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        mutate(email);
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:py-16">
            <motion.div
                className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/login"
                    className="inline-flex items-center text-gray-500 hover:text-[#d87d4a] transition-colors mb-6 text-sm"
                >
                    <IoArrowBack className="mr-1" /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#d87d4a] mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8 bg-green-50 rounded-lg border border-green-100"
                    >
                        <div className="mb-4 text-green-500 flex justify-center">
                            <svg
                                className="w-12 h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-green-800 mb-2">
                            Check your email
                        </h3>
                        <p className="text-green-600 text-sm px-4">
                            We&apos;ve sent a password reset link to <strong>{email}</strong>
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => reset()}
                                className="text-sm text-green-700 underline hover:text-green-800"
                            >
                                Didn&apos;t receive the email? Try again
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex. mail@example.com"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#d87d4a] text-white py-3 rounded-lg font-medium hover:bg-[#c76b3a] transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            whileTap={{ scale: 0.98 }}
                        >
                            {isPending ? (
                                <span className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
