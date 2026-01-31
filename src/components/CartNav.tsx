import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../features/cart/useCart";
import { useUser } from "../features/user/useUser";
import { useSelector } from "react-redux";
import { RootState } from "../types/types";

function CartNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  const { data: userCart } = useCart(user?.id ?? "", {
    enabled: isAuthenticated && !!user?.id,
  });

  const guestTotalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const totalQuantity = isAuthenticated
    ? userCart?.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    ) ?? 0
    : guestTotalQuantity;

  return (
    <div
      className="relative cursor-pointer pl-4 md:pl-5 transition-transform hover:scale-105"
      onClick={() => navigate("/cart")}
    >
      <HiOutlineShoppingCart
        size={30}
        className="md:size-[35px] text-gray-700 hover:text-[#d87d4a] transition-colors duration-200"
      />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#d87d4a] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transform scale-100 hover:scale-110 transition-transform shadow-sm">
          {totalQuantity > 9 ? "9+" : totalQuantity}
        </span>
      )}
    </div>
  );
}

export default CartNav;
