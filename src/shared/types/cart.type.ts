export type CartItem = {
  cartId: string;
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;

  requirePackaging: boolean;
  packagingFee: number;

  addons: CartAddon[];
};

export type CartAddon = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const TAKEAWAY_PACKAGING_FEE = 400;
