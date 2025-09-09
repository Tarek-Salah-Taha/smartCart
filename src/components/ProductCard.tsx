import { motion } from "framer-motion";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import formatPrice from "../helpers/formatCurrency";
import { MdOutlineDelete } from "react-icons/md";
import ProductDetailModal from "./ProductDetailModal";
import { useUser } from "../features/user/useUser";
import { useFavorites } from "../features/favorites/useFavorites";
import { useCart } from "../features/cart/useCart";
import { useState } from "react";
import GuestWarningModal from "./GuestWarningModal";
import { useNavigate } from "react-router-dom";
import { ProductCardProps } from "../types/types";
import { useCartManager } from "../features/cart/useCartManager";
import { useFavoritesManager } from "../features/favorites/useFavoritesManager";

function ProductCard({ product }: ProductCardProps) {
  const { guestCart, addItem, updateQuantity, removeItem } = useCartManager();
  const { guestFavorites, add, remove } = useFavoritesManager();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-full sm:max-w-sm bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col group"
      >
        {/* Favorite Icon */}
        <motion.button
          onClick={handleToggleFavorite}
          whileHover={{ scale: 1.2, color: "#dc2626" }} // red-600 hex
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 left-2 z-10 bg-white p-2 rounded-full shadow transition-colors duration-300"
        >
          {isFavorite ? (
            <FaHeart className="text-red-600" />
          ) : (
            <CiHeart size={20} />
          )}
        </motion.button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <motion.div
            className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-xl shadow-lg z-10 cursor-default select-none"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Save {product.discount}%
          </motion.div>
        )}

        {/* Image */}
        <div className="bg-gray-50 p-2 sm:p-4 flex justify-center items-center h-40 sm:h-48 rounded-t-xl">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105 mt-10 sm:mt-0"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between gap-4 p-4 flex-grow">
          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-3 leading-snug">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex justify-between items-center">
            <div className="space-x-2 text-sm">
              {product.discount > 0 && (
                <span className="line-through text-gray-400 font-medium text-md">
                  {formatPrice(priceWithoutDiscount)}
                </span>
              )}
              <span className="text-[#d87d4a] font-bold text-lg sm:text-xl">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            {/* Add to Cart or Quantity Controls first (desktop left, mobile below View Details visually) */}
            {!items?.some((item) => item.itemId === product.id) ? (
              <motion.button
                onClick={handleAddToCart}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 8px rgba(216,125,74,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 text-base font-semibold text-white bg-[#d87d4a] hover:bg-[#c76b3a] px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow transition duration-300 h-12 sm:h-auto sm:order-1 order-2 sm:text-base text-md"
              >
                Add to Cart
              </motion.button>
            ) : (
              <div
                className="flex flex-1 items-center justify-center gap-4 bg-white px-4 py-2 rounded-lg text-black text-base font-semibold shadow-md
                 h-12 sm:h-auto
                 sm:order-1 order-2"
                style={{
                  minWidth: "0",
                  boxShadow: "0 2px 6px rgba(216,125,74,0.4)",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleDecreaseQuantity}
                  className="flex items-center justify-center p-1 rounded hover:bg-[#d87d4a] hover:text-white transition-colors"
                >
                  {quantity === 1 ? (
                    <MdOutlineDelete size={22} />
                  ) : (
                    <FaMinus size={16} />
                  )}
                </motion.button>

                <motion.span
                  key={quantity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.3, 0.95, 1], opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="px-3 text-lg"
                >
                  {quantity}
                </motion.span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleIncreaseQuantity}
                  className="flex items-center justify-center p-1 rounded hover:bg-[#d87d4a] hover:text-white transition-colors"
                >
                  <FaPlus size={16} />
                </motion.button>
              </div>
            )}

            {/* View Details button second (desktop right, mobile on top) */}
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex-1 text-base font-semibold text-gray-700 bg-transparent border border-gray-300 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition duration-200 h-12 sm:h-auto sm:order-2 order-1 sm:text-base text-md"
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      {isModalOpen && (
        <ProductDetailModal
          product={{
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            description: product.description,
            brand: product.brand,
            model: product.model,
            color: product.color,
            category: product.category,
            discount: product.discount,
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Guest Warning Modal */}
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

export default ProductCard;
