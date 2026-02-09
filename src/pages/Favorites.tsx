import formatPrice from "../helpers/formatCurrency";
import { CiCircleRemove } from "react-icons/ci";
import { FaHeartBroken, FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineDelete, MdOutlineShoppingBag } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../features/user/useUser";
import { useFavorites } from "../features/favorites/useFavorites";
import { Favorite } from "../types/types";
import Spinner from "../components/Spinner";
import { useCartManager } from "../features/cart/useCartManager";
import { useFavoritesManager } from "../features/favorites/useFavoritesManager";
import { useCart } from "../features/cart/useCart";

function Favorites() {
  const { guestCart, addItem, updateQuantity, removeItem } = useCartManager();
  const { guestFavorites, remove, clear } = useFavoritesManager();

  const { user, isAuthenticated } = useUser();
  const { data: userFavorites = [], isLoading: favoriteLoading } = useFavorites(
    user?.id ?? "",
    {
      enabled: isAuthenticated && !!user?.id,
    }
  );

  const { data: userCart = [], isLoading: cartLoading } = useCart(
    user?.id ?? "",
    {
      enabled: isAuthenticated && !!user?.id,
    }
  );

  const favorites = isAuthenticated ? userFavorites : guestFavorites;

  const items = isAuthenticated ? userCart : guestCart;

  function getCartQuantity(itemId: number): number {
    const found = items?.find((el) => el.itemId === itemId);
    return found?.quantity ?? 0;
  }

  function handleAddToCart(item: Favorite) {
    try {
      addItem({
        itemId: item.id,
        title: item.title,
        image: item.image,
        quantity: 1,
        price: item.price,
        userId: user?.id ?? "",
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  }

  function handleIncreaseQuantity(item: Favorite, currentQty: number) {
    try {
      updateQuantity(item.id, currentQty + 1);
    } catch (err) {
      console.error("Increase quantity failed:", err);
    }
  }

  function handleDecreaseQuantity(item: Favorite, currentQty: number) {
    try {
      if (currentQty === 1) {
        removeItem(item.id);
      } else {
        updateQuantity(item.id, currentQty - 1);
      }
    } catch (err) {
      console.error("Decrease quantity failed:", err);
    }
  }

  function handleRemoveFromFavorite(item: Favorite) {
    try {
      remove(item.id);
    } catch (error) {
      console.error("Remove from favorites failed:", error);
    }
  }

  function handleClearFavorites() {
    try {
      clear();
    } catch (error) {
      console.error("Clear favorites failed:", error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
          My Wishlist
          <span className="text-lg font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            {favorites.length} items
          </span>
        </h1>
        {favorites.length > 0 && (
          <motion.button
            onClick={handleClearFavorites}
            className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {favoriteLoading || cartLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6 text-gray-300">
            <FaHeartBroken size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Items you add to your wishlist will appear here. Start curating your specific list!
          </p>
          <motion.a
            href="/products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
          >
            Find Products
          </motion.a>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {favorites.map((item) => {
              const quantity = getCartQuantity(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left w-full">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-lg font-bold text-[#d87d4a]">
                      {formatPrice(item.price ?? 0)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    {!quantity ? (
                      <motion.button
                        onClick={() => handleAddToCart(item)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-[#d87d4a] transition-all cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MdOutlineShoppingBag size={20} />
                        Add to Cart
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleDecreaseQuantity(item, quantity)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-red-500 transition-colors"
                        >
                          {quantity === 1 ? (
                            <MdOutlineDelete size={18} />
                          ) : (
                            <FaMinus size={12} />
                          )}
                        </motion.button>

                        <span className="w-8 text-center font-bold text-gray-800 text-lg">
                          {quantity}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleIncreaseQuantity(item, quantity)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:text-green-600 transition-colors"
                        >
                          <FaPlus size={12} />
                        </motion.button>
                      </div>
                    )}

                    <motion.button
                      onClick={() => handleRemoveFromFavorite(item)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all border border-transparent hover:border-red-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remove from Wishlist"
                    >
                      <CiCircleRemove size={28} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Favorites;
