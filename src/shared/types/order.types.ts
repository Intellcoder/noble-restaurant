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

type DeliveryArea = {
  name: string;
  fee: number;
};

export const DELIVERY_AREAS: DeliveryArea[] = [
  { name: "Kelebe Mubaraka", fee: 2500 },
  { name: "Demo filling station", fee: 2500 },
  { name: "GRA", fee: 2000 },
  { name: "Oke goshen mallam Tope", fee: 2000 },
  { name: "Ayekaale", fee: 3000 },
  { name: "Elizabeth estate", fee: 3500 },
  { name: "Ota ifun", fee: 2000 },
  { name: "Sogbo area", fee: 1000 },
  { name: "O & A", fee: 1000 },
  { name: "Ibukun oluwa", fee: 1000 },
  { name: "Philadai hostel", fee: 1000 },
  { name: "Highlight hostel", fee: 1000 },
  { name: "Vip lodge", fee: 1000 },
  { name: "Jafariya area", fee: 1000 },
  { name: "Akede yamodeen", fee: 1200 },
  { name: "Akede powerline", fee: 1200 },
  { name: "Akede housing estate", fee: 1500 },
  { name: "Garage ilesa", fee: 1000 },
  { name: "Fountain university", fee: 2000 },
  { name: "Tiper garage", fee: 1700 },
  { name: "Costain okebaale", fee: 1200 },
  { name: "Gangaria side", fee: 1000 },
  { name: "Lilad filling station area", fee: 800 },
  { name: "Olorunkemi ", fee: 600 },
  { name: "Sussy ", fee: 600 },
  { name: "Deluxury hotel area", fee: 1000 },
  { name: "Nipco okebaale ", fee: 700 },
  { name: "Cele pick and pay area ", fee: 1300 },
  { name: "Kings and Queen area ", fee: 1300 },
  { name: "King phoebe ", fee: 1300 },
  { name: "Federal hostel and Ayobami area ", fee: 1300 },
  { name: "Theology, Havana, VIP", fee: 1200 },
  { name: "Table Manner", fee: 1000 },
  { name: "Abike Hostel", fee: 1000 },
  { name: "Roya Crown Hostel", fee: 1000 },
  { name: "Alpha Hostel", fee: 1000 },
  { name: "Ajoke Hostel", fee: 1000 },
  { name: "Prestige Hostel", fee: 1000 },
  { name: "Lick sensation area", fee: 1000 },
  { name: "Second gate area", fee: 1000 },
  { name: "Small gate", fee: 1300 },
  { name: "Osunlepo", fee: 1500 },
  { name: "URP", fee: 1500 },
];
