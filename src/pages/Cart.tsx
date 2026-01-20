import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import formatPrice from "../helpers/formatCurrency";
import { useUser } from "../features/user/useUser";
import { useCart } from "../features/cart/useCart";
import { Item } from "../types/types";
import Spinner from "../components/Spinner";
import { useCartManager } from "../features/cart/useCartManager";
import { MdOutlineShoppingBag } from "react-icons/md";

import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { guestCart, removeItem, updateQuantity, clearCart } = useCartManager();

  const { user, isAuthenticated } = useUser();
  const { data: userCart = [], isLoading } = useCart(user?.id ?? "", {
    enabled: isAuthenticated && !!user?.id,
  });

  const items = isAuthenticated ? userCart : guestCart;

  const totalPrice = items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleIncreaseQuantity(item: Item) {
    try {
      updateQuantity(item.itemId, item.quantity + 1);
    } catch (err) {
      console.error("Increase quantity failed:", err);
    }
  }

  function handleDecreaseQuantity(item: Item) {
    try {
      if (item.quantity === 1) {
        removeItem(item.itemId);
      } else {
        updateQuantity(item.itemId, item.quantity - 1);
      }
    } catch (err) {
      console.error("Decrease quantity failed:", err);
    }
  }

  function handleRemoveItem(item: Item) {
    try {
      removeItem(item.itemId);
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  }

  function handleClearCart() {
    try {
      clearCart();
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 border-b border-gray-100 pb-6 flex items-center gap-3">
        Shopping Cart
        <span className="text-lg font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {items?.length || 0} items
        </span>
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : !items || items?.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6 text-[#d87d4a]">
            <MdOutlineShoppingBag size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <motion.a
            href="/allProducts" // Assuming you have a products link or use useNavigate
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#d87d4a] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-[#c76b3a] transition-colors"
          >
            Start Shopping
          </motion.a>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {items?.map((item) => (
              <motion.div
                key={item.itemId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-lg font-bold text-[#d87d4a]">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-red-500 transition-colors"
                    >
                      {item.quantity === 1 ? <AiOutlineDelete size={16} /> : <FaMinus size={10} />}
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="w-8 h-8 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-green-600 transition-colors"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* Remove Button (Desktop right, Mobile top-right via absolute maybe? Using standard flow for now) */}
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="hidden sm:block p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Remove Item"
                >
                  <AiOutlineDelete size={20} />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Checkout Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-gray-400 hover:text-red-500 underline transition-colors"
              >
                Clear Cart
              </button>

              <div className="flex items-center gap-4 sm:gap-8">
                <div className="text-right">
                  <span className="block text-sm text-gray-500 font-medium">Total</span>
                  <span className="block text-3xl font-bold text-gray-900">{formatPrice(+(totalPrice ?? 0).toFixed(2))}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/checkout")}
                  className="bg-black text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-[#d87d4a] transition-colors text-lg"
                >
                  Checkout
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
