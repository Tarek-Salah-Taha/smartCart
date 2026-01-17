import { motion } from "framer-motion";
import { FaHeart, FaMinus, FaPlus, FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import formatPrice from "../helpers/formatCurrency";
import { MdOutlineDelete, MdOutlineShoppingBag } from "react-icons/md";
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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-transparent hover:border-gray-100"
      >
        {/* Floating Actions (Favorite & Discount) */}
        <div className="absolute top-3 left-3 z-30">
          {product.discount > 0 && (
            <div className="bg-[#d87d4a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg mb-2">
              -{product.discount}%
            </div>
          )}
        </div>

        <motion.button
          onClick={handleToggleFavorite}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          className="absolute top-3 right-3 z-30 p-2.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <CiHeart className="text-xl stroke-[0.5]" />
          )}
        </motion.button>

        {/* Image Section */}
        <div
          className="relative bg-gray-50 h-[220px] sm:h-[260px] flex items-center justify-center p-6 overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply relative z-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Quick View Button (Appears on Hover) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <FaEye /> Quick View
            </div>
          </motion.div>

        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Brand/Category Tag (Optional - using category here) */}
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {product.category || "Audio"}
          </div>

          <h3
            className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight cursor-pointer hover:text-[#d87d4a] transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            {product.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-3 min-h-[40px] leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="mt-auto pt-2 flex items-end justify-between border-t border-dashed border-gray-100">
            <div className="flex flex-col">
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through mb-0.5">
                  {formatPrice(priceWithoutDiscount)}
                </span>
              )}
              <span className="text-xl font-extrabold text-[#d87d4a]">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {!items?.some((item) => item.itemId === product.id) ? (
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 hover:bg-[#d87d4a] text-white p-3 rounded-xl shadow-lg transition-colors duration-300 flex items-center justify-center"
                  aria-label="Add to cart"
                >
                  <MdOutlineShoppingBag size={22} />
                </motion.button>
              ) : (
                // Quantity Controls
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <motion.button
                    onClick={handleDecreaseQuantity}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                  >
                    {quantity === 1 ? <MdOutlineDelete size={16} /> : <FaMinus size={10} />}
                  </motion.button>

                  <span className="w-8 text-center font-bold text-sm text-gray-800">{quantity}</span>

                  <motion.button
                    onClick={handleIncreaseQuantity}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <FaPlus size={10} />
                  </motion.button>
                </div>
              )}
            </div>
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
