import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartItem } from "../shared/types/cart.type";

type CartStore = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;

  increaseQuantity: (cartId: string) => void;
  decreaseQuantity: (cartId: string) => void;

  updateAddons: (cartId: string, addons: CartItem["addons"]) => void;

  clearCart: () => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
};

const calculateItemTotal = (item: CartItem) => {
  const addonsTotal = (item.addons ?? []).reduce(
    (sum, addon) => sum + addon.price,
    0,
  );

  const packagingFee = item.requirePackaging ? item.packagingFee : 0;

  const total =
    (Number(item.price) + addonsTotal + packagingFee) * item.quantity;

  return total;
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
          set((state) => ({
            items: state.items.map((cartItem) =>
              cartItem.id === item.id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                : cartItem,
            ),
          }));

          return;
        }

        set((state) => ({
          items: [...state.items, item],
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      updateAddons: (cartId, addons) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId
              ? {
                  ...item,
                  addons,
                }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + calculateItemTotal(item),
          0,
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "noble-restaurant-cart",
    },
  ),
);
