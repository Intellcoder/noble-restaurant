import {
  LayoutDashboard,
  Grid2X2,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  CalendarDays,
  Truck,
} from "lucide-react";

export const menuItems = [
  {
    title: "Main",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
      },
      {
        name: "Categories",
        icon: Grid2X2,
        path: "/admin/categories",
      },
      {
        name: "Products",
        icon: ShoppingBag,
        path: "/admin/products",
      },
      {
        name: "Orders",
        icon: ShoppingCart,
        path: "/admin/orders",
      },
      {
        name: "Combos",
        icon: ShoppingCart,
        path: "/admin/combos",
      },
      {
        name: "Riders",
        icon: Truck,
        path: "/admin/riders",
      },
      {
        name: "Verify Payments",
        icon: CreditCard,
        path: "/admin/payments",
      },
      {
        name: "Reservations",
        icon: CalendarDays,
        path: "/admin/reservations",
      },
    ],
  },
];
