import { useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../features/cart/useCart";
import { useUser } from "../features/user/useUser";
import { useSelector } from "react-redux";
import MiniSpinner from "./MiniSpinner";
import { RootState } from "../types/types";

function CartNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();

  const { data: userCart, isLoading: cartLoading } = useCart(user?.id ?? "", {
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

  if (userLoading || cartLoading) {
    return <MiniSpinner />;
  }

  return (
    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
      <HiOutlineShoppingCart size={35} className="hover:text-[#d87d4a]" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-2 bg-[#d87d4a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}

export default CartNav;
