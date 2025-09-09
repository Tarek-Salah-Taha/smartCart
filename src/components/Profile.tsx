import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MiniSpinner from "./MiniSpinner";
import { useUser } from "../features/user/useUser";
import { logout } from "../services/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { clearFavorites } from "../features/favorites/favoritesSlice";

function Profile() {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(clearCart());
      dispatch(clearFavorites());
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.error("Error logging out:", error.message);
      } else {
        console.error("Unknown error occurred during logout");
      }
    },
  });
  const handleLogout = () => {
    mutation.mutate();
  };

  if (isLoading) return <MiniSpinner />;

  return (
    <div className="relative">
      {isAuthenticated && user ? (
        <div className="flex items-center space-x-3 md:space-x-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-transparent hover:border-[#d87d4a] transition-colors duration-200"
            />
          ) : (
            <p className="text-base md:text-lg font-semibold text-gray-700 hover:text-[#d87d4a] transition-colors duration-200">
              {user.firstName}
            </p>
          )}
          <IoLogOutOutline
            size={28}
            className="md:size-[32px] cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div
          className="relative cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => navigate("/signUp")}
        >
          <IoPersonCircleOutline
            size={28}
            className="md:size-[32px] text-gray-600 hover:text-[#d87d4a] transition-colors duration-200"
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
