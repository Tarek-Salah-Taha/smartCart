import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { signUp, uploadAvatar } from "../services/userApi";

export default function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let avatarUrl: string | undefined;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      await signUp({ firstName, lastName, email, password, avatarUrl });

      queryClient.clear(); // Ensure fresh state for the new user
      toast.success("Sign up successful!");
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Sign up failed. Please try again.");
        toast.error("Sign up failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 sm:pt-4 px-4 py-6">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#d87d4a] mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-sm">
            Join our community and start your journey
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-4 sm:space-y-0 space-y-4">
            <motion.div
              className="w-full"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                required
              />
            </motion.div>

            <motion.div
              className="w-full"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d87d4a] focus:border-transparent transition-all"
                required
              />
            </motion.div>
          </div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 ml-1"
            >
              Email
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
                placeholder="Create a secure password"
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

          {/* Avatar Upload */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Profile Photo (Optional)
            </label>
            <div className="relative w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                disabled={isLoading}
                id="avatar-upload"
              />
              <div className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <span
                  className={`truncate max-w-[70%] ${avatarFile ? "text-gray-800" : "text-gray-500"
                    }`}
                >
                  {avatarFile ? avatarFile.name : "No file chosen"}
                </span>
                <span className="text-sm text-[#d87d4a] font-medium">
                  Choose File
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full mt-6 bg-[#d87d4a] text-white py-3 rounded-lg font-medium hover:bg-[#c76b3a] transition duration-300 shadow-md hover:shadow-lg"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 text-center bg-red-50 py-2 rounded-lg border border-red-100 text-sm"
          >
            {error}
          </motion.p>
        )}

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#d87d4a] font-medium hover:underline transition-all"
          >
            Sign in here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
