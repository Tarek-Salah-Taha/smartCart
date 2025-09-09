import { FaPlus, FaMinus, FaHeart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import formatPrice from "../helpers/formatCurrency";
import { useUser } from "../features/user/useUser";
import { useFavorites } from "../features/favorites/useFavorites";
import { useCart } from "../features/cart/useCart";
import GuestWarningModal from "./GuestWarningModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
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
      <div className="fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl max-h-[90vh] p-6 relative overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-bold text-gray-700 hover:text-black"
          >
            ×
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Left (smaller) */}
            <div className="flex-shrink-0 w-full lg:w-2/5 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-60 object-contain rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Details Right (wider) */}
            <div className="flex-1 space-y-4 pl-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 pr-10">
                {product.title}
              </h2>
              <p className="text-xl font-semibold text-green-600">
                <span className="text-base font-semibold text-gray-800 space-x-1">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-2xl text-red-600 font-bold">
                        {formatPrice(product.price)}
                      </span>
                      <span className="line-through text-md text-gray-500">
                        {formatPrice(priceWithoutDiscount)}
                      </span>
                      <p className="mt-2">
                        <span className="text-lg text-teal-500 font-bold">
                          Saving: {formatPrice(savedQuantity)}
                        </span>
                      </p>
                    </>
                  ) : (
                    <span className="text-green-600 font-bold">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </span>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
                {/* Add to Cart and Favorite - side by side */}
                <div className="flex items-center gap-3">
                  {quantity === 0 ? (
                    <motion.button
                      onClick={handleAddToCart}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 8px rgba(216,125,74,0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 text-base font-semibold text-white bg-[#d87d4a] hover:bg-[#c76b3a] px-4 py-5 rounded-lg shadow transition duration-300"
                    >
                      Add to Cart
                    </motion.button>
                  ) : (
                    <div className="flex-1 flex items-center justify-between bg-white py-5 px-4 rounded-full shadow-sm border border-[#d87d4a]">
                      <button
                        onClick={handleDecreaseQuantity}
                        className="p-2 bg-[#d87d4a] text-white rounded-lg shadow hover:bg-[#c76b3a] transition duration-300"
                      >
                        {quantity === 1 ? (
                          <MdOutlineDelete size={16} />
                        ) : (
                          <FaMinus size={16} />
                        )}
                      </button>
                      <span className="text-2xl font-semibold px-4">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncreaseQuantity}
                        className="p-2 bg-[#d87d4a] text-white rounded-lg shadow hover:bg-[#c76b3a] transition duration-300"
                      >
                        <FaPlus size={16} />
                      </button>
                    </div>
                  )}

                  {/* Favorite Button (beside Add to Cart) */}
                  <motion.button
                    onClick={handleToggleFavorite}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 flex items-center justify-center rounded-full border transition duration-200 ${
                      isFavorite
                        ? "bg-transparent text-red-600 border-red-300"
                        : "bg-transparent text-red-500 border-red-300"
                    }`}
                  >
                    {isFavorite ? <FaHeart size={30} /> : <CiHeart size={35} />}
                  </motion.button>
                </div>
              </div>

              {/* Product Specs & Description */}
              <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6 text-sm text-gray-700 border border-gray-100">
                {/* Specs */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                    Product Details:
                  </h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
                    <div className="font-medium text-gray-800">Brand:</div>
                    <div className="capitalize">{product.brand}</div>

                    <div className="font-medium text-gray-800">Model:</div>
                    <div className="capitalize">{product.model}</div>

                    <div className="font-medium text-gray-800">Color:</div>
                    <div className="capitalize">{product.color}</div>

                    <div className="font-medium text-gray-800">Category:</div>
                    <div className="capitalize">{product.category}</div>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed tracking-wide">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
