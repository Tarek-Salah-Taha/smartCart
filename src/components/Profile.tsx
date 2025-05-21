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
        <div className="flex items-center space-x-2">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-10 rounded-full object-cover aspect-square"
            />
          ) : (
            <p className="text-lg font-bold">{user.firstName}</p>
          )}
          <IoLogOutOutline
            size={35}
            className="cursor-pointer hover:text-red-500"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/signUp")}
        >
          <IoPersonCircleOutline size={30} className="hover:text-[#d87d4a]" />
        </div>
      )}
    </div>
  );
}

export default Profile;
