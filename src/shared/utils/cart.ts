import { TAKEAWAY_PACKAGING_FEE, type CartItem } from "../types/cart.type";

export const calculateCartItemTotal = (item: CartItem) => {
  const addonsTotal = (item.addons ?? []).reduce(
    (sum, addon) => sum + addon.price,
    0,
  );

  const packagingFee = item.requirePackaging ? TAKEAWAY_PACKAGING_FEE : 0;

  return (Number(item.price) + addonsTotal + packagingFee) * item.quantity;
};
