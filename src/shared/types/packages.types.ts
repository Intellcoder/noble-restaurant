export type Rider = {
  id: string;
  fullName: string;
  phoneNumber: string;
  status: string;
  totalDeliveries: number;
};

export type PackageOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  amount: number;
  orderStatus:
    | "PENDING_PAYMENT"
    | "PAID"
    | "PREPARING"
    | "CONFIRMED"
    | "DELIVERED"
    | "CANCELLED"
    | "FAILED"
    | "OUT_FOR_DELIVERY";
  assignedRider?: {
    id: string;
    fullName: string;
  } | null;
};
