import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/userApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import supabase from "../services/supabase";

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Check if user is authenticated (link usually signs them in)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // If for some reason the magic link didn't log them in, or they just visited the page directly
                // we might want to redirect them or they can't update.
                // However, Supabase reset password flow technically should have logged them in.
                // Or they might have a has fragment with access_token.
                // Let's assume supabase client handles the hash and restores session.
                // If no session after a brief delay, maybe redirect to login.
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {
                // ensure we are in a state to update
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("Password updated successfully! Please login with your new password.");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update password");
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }
        mutate(password);
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:py-16">
            <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#d87d4a] mb-2">
                        Set New Password
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Please enter your new password below.
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#d87d4a] transition duration-200 p-1"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IoEyeOffSharp size={20} /> : <IoEyeOutline size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-8 bg-[#d87d4a] text-white py-3 rounded-lg font-medium hover:bg-[#c76b3a] transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    whileTap={{ scale: 0.98 }}
                >
                    {isPending ? (
                        <span className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Updating...
                        </span>
                    ) : (
                        "Update Password"
                    )}
                </motion.button>
            </motion.form>
        </div>
    );
}
