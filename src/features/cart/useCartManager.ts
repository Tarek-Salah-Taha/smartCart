import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addToCart as addItemRedux,
  removeFromCart as removeItemRedux,
  increaseQuantity as increaseQuantityRedux,
  decreaseQuantity as decreaseQuantityRedux,
  clearCart as clearCartRedux,
} from "../cart/cartSlice";
import {
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearUserCart,
} from "../../services/cartApi";
import { useUser } from "../user/useUser";
import { CartItem, RootState } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCartManager() {
  const dispatch = useAppDispatch();
  const guestCart = useAppSelector((state: RootState) => state.cart.items);
  const { user, isAuthenticated } = useUser();

  const queryClient = useQueryClient();

  const addItemMutation = useMutation({
    mutationFn: (item: CartItem) => addToCart(user!.id, item),

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user!.id] });

      const previousCart = queryClient.getQueryData<CartItem[]>([
        "cart",
        user!.id,
      ]);

      queryClient.setQueryData<CartItem[]>(["cart", user!.id], (old = []) => {
        const exists = old.find((item) => item.itemId === newItem.itemId);
        if (exists) {
          return old.map((item) =>
            item.itemId === newItem.itemId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        return [...old, newItem];
      });

      return { previousCart };
    },

    onError: (_err, _newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", user!.id], context.previousCart);
      }
      toast.error("Failed to add item to cart.");
    },

    onSuccess: () => {
      toast.success("Added to cart!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user!.id] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: number) => removeFromCart(user!.id, itemId),
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user!.id] });

      const previousCart = queryClient.getQueryData<CartItem[]>([
        "cart",
        user!.id,
      ]);

      queryClient.setQueryData<CartItem[]>(["cart", user!.id], (old = []) =>
        old.filter((item) => item.itemId !== itemId)
      );

      return { previousCart };
    },
    onError: (_err, _itemId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", user!.id], context.previousCart);
      }
      toast.error("Failed to remove item.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user!.id] });
    },
    onSuccess: () => toast.success("Removed from cart!"),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({
      itemId,
      newQuantity,
    }: {
      itemId: number;
      newQuantity: number;
    }) => updateItemQuantity(user!.id, itemId, newQuantity),
    onMutate: async ({ itemId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", user!.id] });

      const previousCart = queryClient.getQueryData<CartItem[]>([
        "cart",
        user!.id,
      ]);

      queryClient.setQueryData<CartItem[]>(["cart", user!.id], (old = []) =>
        old.map((item) =>
          item.itemId === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", user!.id], context.previousCart);
      }
      toast.error("Failed to update quantity.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user!.id] });
    },
    onSuccess: () => toast.success("Updated quantity!"),
  });

  const clearCartMutation = useMutation({
    mutationFn: () => clearUserCart(user!.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart", user!.id] });

      const previousCart = queryClient.getQueryData<CartItem[]>([
        "cart",
        user!.id,
      ]);

      queryClient.setQueryData(["cart", user!.id], []);

      return { previousCart };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", user!.id], context.previousCart);
      }
      toast.error("Failed to clear cart.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user!.id] });
    },
    onSuccess: () => toast.success("Cleared cart!"),
  });

  function addItem(item: CartItem) {
    if (isAuthenticated && user) {
      addItemMutation.mutate(item);
    } else {
      dispatch(addItemRedux(item));
    }
  }

  function removeItem(itemId: number) {
    if (isAuthenticated && user) {
      removeItemMutation.mutate(itemId);
    } else {
      dispatch(removeItemRedux(itemId));
    }
  }

  function updateQuantity(itemId: number, newQuantity: number) {
    if (isAuthenticated && user) {
      updateQuantityMutation.mutate({ itemId, newQuantity });
    } else {
      const item = guestCart.find((i) => i.itemId === itemId);
      if (!item) return;

      const diff = newQuantity - item.quantity;

      if (diff > 0) {
        for (let i = 0; i < diff; i++) dispatch(increaseQuantityRedux(itemId));
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++)
          dispatch(decreaseQuantityRedux(itemId));
      }
    }
  }

  async function clearCart() {
    if (isAuthenticated && user) {
      clearCartMutation.mutate();
    } else {
      dispatch(clearCartRedux());
    }
  }

  return {
    guestCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
