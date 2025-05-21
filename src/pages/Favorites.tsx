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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Favorites</h1>

      {favoriteLoading || cartLoading ? (
        <Spinner />
      ) : favorites.length === 0 ? (
        <p className="text-center text-xl text-gray-700 py-6 rounded-xl">
          You have no favorites yet.
        </p>
      ) : (
        <div className="space-y-8">
          {favorites.map((item) => {
            const quantity = getCartQuantity(item.id);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price ?? 0)}
                  </p>
                </div>

                {!quantity ? (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="text-md font-medium text-white bg-[#d87d4a] hover:bg-[#c76b3a] px-3 py-1.5 rounded-lg transition duration-300"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleDecreaseQuantity(item, quantity)}
                      className="px-2 py-1 text-lg rounded  bg-gray-200 hover:bg-gray-300"
                    >
                      {quantity === 1 ? (
                        <MdOutlineDelete size={20} />
                      ) : (
                        <FaMinus size={16} />
                      )}
                    </motion.button>

                    <span className="mx-2 text-gray-700 font-medium">
                      {quantity}
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleIncreaseQuantity(item, quantity)}
                      className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaPlus size={14} />
                    </motion.button>
                  </div>
                )}

                <button
                  onClick={() => handleRemoveFromFavorite(item)}
                  className="ml-4 text-red-600 text-sm hover:underline"
                >
                  <CiCircleRemove size={40} className="text-red-600" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleClearFavorites}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-lg text-sm font-semibold transition duration-300"
          >
            Remove All Favorites
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
