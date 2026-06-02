import {
  LayoutDashboard,
  Grid2X2,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  CalendarDays,
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

  //   {
  //     title: "Business",
  //     items: [
  //       {
  //         name: "Customers",
  //         icon: Users,
  //         path: "/admin/customers",
  //       },
  //       {
  //         name: "Reports",
  //         icon: BarChart3,
  //         path: "/admin/reports",
  //       },
  //       {
  //         name: "Reviews",
  //         icon: Star,
  //         path: "/admin/reviews",
  //       },
  //       {
  //         name: "Promotions",
  //         icon: Megaphone,
  //         path: "/admin/promotions",
  //       },
  //       {
  //         name: "Settings",
  //         icon: Settings,
  //         path: "/admin/settings",
  //       },
  //     ],
  //   },
];
