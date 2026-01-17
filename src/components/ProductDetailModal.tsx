import { FaPlus, FaMinus, FaHeart } from "react-icons/fa";
import { MdOutlineDelete, MdClose, MdOutlineShoppingBag } from "react-icons/md";

import formatPrice from "../helpers/formatCurrency";
import { useUser } from "../features/user/useUser";
import { useFavorites } from "../features/favorites/useFavorites";
import { useCart } from "../features/cart/useCart";
import GuestWarningModal from "./GuestWarningModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { ProductDetailModalProps } from "../types/types";
import { useEscapeKey } from "../Hooks/useEscapeKey";
import { useCartManager } from "../features/cart/useCartManager";
import { useFavoritesManager } from "../features/favorites/useFavoritesManager";

function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  useEscapeKey(onClose);

  const navigate = useNavigate();

  const { guestCart, addItem, updateQuantity, removeItem } = useCartManager();
  const { guestFavorites, add, remove } = useFavoritesManager();

  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [actionAfterPrompt, setActionAfterPrompt] = useState<
    "cart" | "favorite" | null
  >(null);

  function hasSeenGuestPrompt(): boolean {
    return localStorage.getItem("guestPromptShown") === "true";
  }

  function markGuestPromptSeen() {
    localStorage.setItem("guestPromptShown", "true");
  }

  function handleContinueAsGuest() {
    markGuestPromptSeen();
    if (actionAfterPrompt === "cart") handleAddToCart();
    else if (actionAfterPrompt === "favorite") handleToggleFavorite();
  }

  function handleSignInRedirect() {
    navigate("/signup"); // Redirect to sign-in page
  }

  const { user, isAuthenticated } = useUser();
  const { data: userFavorites = [] } = useFavorites(user?.id ?? "");

  const { data: userCart = [] } = useCart(user?.id ?? "");

  const favorites = isAuthenticated ? userFavorites : guestFavorites;

  const items = isAuthenticated ? userCart : guestCart;

  const getItemQuantity = (id: number) =>
    items?.find((item) => item.itemId === id)?.quantity || 0;

  const quantity = getItemQuantity(product.id);

  const isFavorite = favorites.some((item) => item.id === product.id);

  const priceWithoutDiscount = product.price * (1 + product.discount / 100);

  const savedQuantity = priceWithoutDiscount - product.price;

  function handleAddToCart() {
    try {
      if (!isAuthenticated && !hasSeenGuestPrompt()) {
        setActionAfterPrompt("cart");
        setShowGuestPrompt(true);
        return;
      }

      addItem({
        itemId: product.id,
        title: product.title,
        quantity: 1,
        image: product.image,
        price: product.price,
        userId: user?.id ?? "",
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }

  function handleIncreaseQuantity() {
    try {
      const newQuantity = quantity + 1;
      updateQuantity(product.id, newQuantity);
    } catch (err) {
      console.error("Increase quantity failed:", err);
    }
  }

  function handleDecreaseQuantity() {
    try {
      const newQuantity = quantity - 1;
      if (newQuantity < 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, newQuantity);
      }
    } catch (err) {
      console.error("Decrease quantity failed:", err);
    }
  }

  function handleToggleFavorite() {
    try {
      if (!isAuthenticated && !hasSeenGuestPrompt()) {
        setActionAfterPrompt("favorite");
        setShowGuestPrompt(true);
        return;
      }

      if (isFavorite) {
        remove(product.id);
      } else {
        add({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
        });
      }
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  }

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[800px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md border border-gray-100 shadow-sm"
            >
              <MdClose size={24} className="text-gray-700" />
            </button>

            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8 lg:p-12 relative overflow-hidden group">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain max-h-[300px] lg:max-h-[500px] relative z-10 mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right Side - Details */}
            <div className="w-full lg:w-1/2 flex flex-col p-6 lg:p-10 overflow-y-auto">

              <div className="flex-1">
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block text-xs font-bold tracking-wider text-[#d87d4a] uppercase bg-orange-50 px-3 py-1 rounded-full mb-3">
                    {product.brand}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                    {product.title}
                  </h2>
                  <div className="text-sm font-medium text-gray-400 capitalize">
                    {product.category} Series
                  </div>
                </div>

                {/* Price & Savings */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-[#d87d4a]">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xl text-gray-400 line-through decoration-gray-400/50">
                        {formatPrice(priceWithoutDiscount)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-green-600 font-semibold text-sm mt-1 flex items-center gap-2">
                      <span className="bg-green-100 px-2 py-0.5 rounded">Save {formatPrice(savedQuantity)}</span>
                      <span>({product.discount}% OFF)</span>
                    </div>
                  )}
                </div>

                {/* Spec Blocks Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Model</div>
                    <div className="text-gray-900 font-semibold">{product.model}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Color</div>
                    <div className="text-gray-900 font-semibold capitalize">{product.color}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Action Footer (Sticky bottom on mobile if needed, but here inline) */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
                {/* Add to Cart / Qty */}
                {quantity === 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#d87d4a] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <MdOutlineShoppingBag size={24} /> Add to Cart
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-2xl p-2">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="w-12 h-12 bg-white text-gray-900 rounded-xl shadow-sm hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      {quantity === 1 ? <MdOutlineDelete size={20} /> : <FaMinus size={16} />}
                    </button>
                    <span className="text-xl font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="w-12 h-12 bg-white text-gray-900 rounded-xl shadow-sm hover:text-green-600 flex items-center justify-center transition-colors"
                    >
                      <FaPlus size={16} />
                    </button>
                  </div>
                )}

                {/* Favorite */}
                <button
                  onClick={handleToggleFavorite}
                  className={`w-[60px] flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ${isFavorite
                      ? "border-red-100 bg-red-50 text-red-500"
                      : "border-gray-200 hover:border-[#d87d4a] hover:text-[#d87d4a] text-gray-400"
                    }`}
                >
                  {isFavorite ? <FaHeart size={28} /> : <CiHeart size={32} strokeWidth={1} />}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {showGuestPrompt && (
        <GuestWarningModal
          open={showGuestPrompt}
          onClose={() => setShowGuestPrompt(false)}
          onContinueAsGuest={handleContinueAsGuest}
          onSignIn={handleSignInRedirect}
        />
      )}
    </>
  );
}

export default ProductDetailModal;
