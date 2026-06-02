export type Order = {
  id: string;
  phoneNumber: string;
  deliveryAddress?: string;
  items: {
    foodName: string;
    unitPrice: number;
    quantity: number;
    imageUrl: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  orderNumber: string;

  deliveryType: string;
  paymentMethod: "Card_Payment" | "Bank_Transfer";
  paymentStatus: string;
  paymentReference: string;
  orderStatus: string;

  createdAt: string;
};
