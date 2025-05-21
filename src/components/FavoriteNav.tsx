import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";

import { useFavorites } from "../features/favorites/useFavorites";
import { useUser } from "../features/user/useUser";
import MiniSpinner from "./MiniSpinner";
import { RootState } from "../types/types";

function FavoriteNav() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { data: userFavorites, isLoading: favoriteLoading } = useFavorites(
    user?.id ?? "",
    {
      enabled: isAuthenticated && !!user?.id,
    }
  );

  const guestTotalQuantity = useSelector(
    (state: RootState) => state.favorites.totalQuantity
  );

  const totalQuantity = isAuthenticated
    ? userFavorites?.length ?? 0
    : guestTotalQuantity;

  if (userLoading || favoriteLoading) {
    return <MiniSpinner />;
  }

  return (
    <div
      className="relative cursor-pointer pl-5"
      onClick={() => navigate("/favorites")}
    >
      <MdOutlineFavoriteBorder size={35} className="hover:text-[#d87d4a]" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-2 bg-[#d87d4a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}

export default FavoriteNav;
