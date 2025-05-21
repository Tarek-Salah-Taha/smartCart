import { useState } from "react";
import { signUp, uploadAvatar } from "../services/userApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";

export default function SignUp() {
  const navigate = useNavigate();

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
    <div className="flex justify-center items-start min-h-screen bg-gray-50  sm:pt-2 px-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#d87d4a]">
          Sign Up
        </h2>

        <motion.input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-4 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
          required
          whileHover={{ scale: 1.05 }}
        />
        <motion.input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-4 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
          required
          whileHover={{ scale: 1.05 }}
        />
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-4 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
          required
          whileHover={{ scale: 1.05 }}
        />
        <div className="relative mb-4">
          <motion.input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
            required
            whileHover={{ scale: 1.05 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#d87d4a] transition duration-200"
            tabIndex={-1} // Prevents tab focus on icon
          >
            {showPassword ? (
              <IoEyeOffSharp size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="relative w-full mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            className="absolute opacity-0 w-full h-full cursor-pointer"
            disabled={isLoading}
          />
          <div className="w-full p-4 border rounded-lg flex items-center justify-center cursor-pointer bg-gray-100">
            {avatarFile ? (
              <span>{avatarFile.name}</span>
            ) : (
              <span className="text-gray-500">Upload Avatar (Optional)</span>
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-[#d87d4a] text-white py-3 rounded-lg hover:bg-[#c76b3a] transition duration-300"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </motion.button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#d87d4a] hover:underline">
            Login here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
