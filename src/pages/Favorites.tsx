import formatPrice from "../helpers/formatCurrency";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { motion } from "framer-motion";
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
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Favorites
        </h1>
        {favorites.length > 0 && (
          <motion.button
            onClick={handleClearFavorites}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Remove All Favorites
          </motion.button>
        )}
      </div>

      {favoriteLoading || cartLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <div className="text-gray-400 text-6xl mb-4">❤️</div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-500">
            Items you add to your favorites will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((item) => {
            const quantity = getCartQuantity(item.id);

            return (
              <motion.div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-gray-50 p-2 rounded-lg"
                  loading="lazy"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-medium text-gray-800 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-md font-semibold text-[#d87d4a]">
                    {formatPrice(item.price ?? 0)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {!quantity ? (
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className="text-sm font-medium text-white bg-[#d87d4a] hover:bg-[#c76b3a] px-4 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  ) : (
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleDecreaseQuantity(item, quantity)}
                        className="p-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        {quantity === 1 ? (
                          <MdOutlineDelete size={18} className="text-red-500" />
                        ) : (
                          <FaMinus size={14} />
                        )}
                      </motion.button>

                      <span className="mx-1 text-gray-800 font-medium min-w-[20px]">
                        {quantity}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleIncreaseQuantity(item, quantity)}
                        className="p-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={14} />
                      </motion.button>
                    </div>
                  )}

                  <motion.button
                    onClick={() => handleRemoveFromFavorite(item)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Remove from favorites"
                  >
                    <CiCircleRemove size={24} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
