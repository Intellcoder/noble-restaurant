import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartItem } from "../shared/types/cart.type";

type CartStore = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  getTotalPrice: () => number;

  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existingItem = get().items.find(
          (cartItem) => cartItem.id === item.id,
        );

        if (existingItem) {
          set({
            items: get().items.map((cartItem) =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            ),
          });
        } else {
          set({
            items: [...get().items, item],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      increaseQuantity: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "noble-restaurant-cart",
    },
  ),
);
