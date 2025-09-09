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
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        Your Cart
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : !items || items?.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-xl text-gray-700 mb-2">Your cart is empty</p>
          <p className="text-gray-500">
            Start shopping and add items to your cart!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {items?.map((item) => (
            <div
              key={item.itemId}
              className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-white p-2 rounded-md border border-gray-200"
                loading="lazy"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-base font-medium text-gray-700">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    item.quantity > 1 && handleDecreaseQuantity(item)
                  }
                  disabled={item.quantity <= 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    item.quantity <= 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  } transition-colors duration-200`}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span className="w-10 text-center text-gray-700 font-medium text-lg">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-700 transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                aria-label="Remove item"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}

          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <button
              onClick={handleClearCart}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Remove All Items
            </button>

            <div className="w-full sm:w-auto text-center sm:text-right">
              <div className="text-lg text-gray-600 mb-1">Total</div>
              <div className="text-2xl font-bold text-gray-800">
                {formatPrice(+(totalPrice ?? 0).toFixed(2))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
