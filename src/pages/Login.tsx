import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userApi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Logged in successfully!");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ email, password });
    navigate("/");
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 px-4 pt-20 sm:pt-32">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white border rounded-lg shadow-xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
          required
          whileHover={{ scale: 1.03 }}
        />

        <div className="relative">
          <motion.input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 pr-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#d87d4a]"
            required
            whileHover={{ scale: 1.03 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#d87d4a]"
            tabIndex={-1}
          >
            {showPassword ? (
              <IoEyeOffSharp size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </button>
        </div>

        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#d87d4a] hover:bg-[#c76b3a] text-white py-3 rounded-lg font-semibold tracking-wide"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          {isPending ? "Logging in..." : "Login"}
        </motion.button>

        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </form>
    </div>
  );
}
