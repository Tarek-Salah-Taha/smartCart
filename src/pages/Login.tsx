import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import { useUser } from "../features/user/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.clear(); // Ensure we start with a completely fresh state for the new user
      toast.success("Logged in successfully!");
      navigate("/");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password });
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
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to access your account
          </p>
        </div>

        <div className="space-y-6">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
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
              placeholder="Enter your email address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
              required
            />
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 ml-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#d87d4a] transition duration-200 p-1"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffSharp size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full mt-8 bg-[#d87d4a] text-white py-3 rounded-lg font-medium hover:bg-[#c76b3a] transition duration-300 shadow-md hover:shadow-lg"
          whileTap={{ scale: 0.98 }}
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 text-center bg-red-50 py-2 rounded-lg border border-red-100 text-sm"
          >
            {error.message}
          </motion.p>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#d87d4a] font-medium hover:underline transition-all"
            >
              Sign up here
            </a>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
