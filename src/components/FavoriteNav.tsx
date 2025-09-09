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
      className="relative cursor-pointer pl-4 md:pl-5 transition-transform hover:scale-105"
      onClick={() => navigate("/favorites")}
    >
      <MdOutlineFavoriteBorder
        size={30}
        className="md:size-[35px] hover:text-[#d87d4a] transition-colors duration-200"
      />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#d87d4a] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center transform scale-100 hover:scale-110 transition-transform">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}

export default FavoriteNav;
