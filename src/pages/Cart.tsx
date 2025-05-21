import { AiOutlineDelete } from "react-icons/ai";

import formatPrice from "../helpers/formatCurrency";
import { useUser } from "../features/user/useUser";
import { useCart } from "../features/cart/useCart";
import { Item } from "../types/types";
import Spinner from "../components/Spinner";
import { useCartManager } from "../features/cart/useCartManager";

function Cart() {
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>

      {isLoading ? (
        <Spinner />
      ) : !items || items?.length === 0 ? (
        <p className="text-center text-xl text-gray-700 py-6 rounded-xl">
          Your cart is currently empty. Start shopping and add items to your
          cart!
        </p>
      ) : (
        <div className="space-y-8">
          {items?.map((item) => (
            <div
              key={item.itemId}
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
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    item.quantity > 1 && handleDecreaseQuantity(item)
                  }
                  disabled={item.quantity <= 1}
                  className={`px-2 py-1 text-lg rounded ${
                    item.quantity <= 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  −
                </button>

                <span className="mx-2 text-gray-700 font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item)}
                className="text-sm text-red-600 hover:underline"
              >
                <AiOutlineDelete size={30} />
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-lg text-sm font-semibold transition duration-300"
            >
              Remove All Items
            </button>

            <div className="text-xl font-bold text-gray-800">
              Total: {formatPrice(+(totalPrice ?? 0).toFixed(2))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
