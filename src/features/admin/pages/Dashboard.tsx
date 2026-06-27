import {
  ShoppingCart,
  CreditCard,
  CalendarDays,
  TrendingUp,
  Bike,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../shared/api";
import { toast } from "react-hot-toast";

/* ================= TYPES ================= */

type DashboardStats = {
  totalOrders: number;
  totalRevenue: number;
  pendingPayments: number;
  totalReservations: number;
  delivery: number;
};

type Order = {
  orderNumber: string;
  phoneNumber: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
};

type DashboardResponse = {
  stats: DashboardStats;
  recentOrders: Order[];
  pendingPayments: Order[];
};

/* ================= COMPONENT ================= */

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin");
        setDashboard(res.data); // adjust if backend shape differs
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return <div>No dashboard data found</div>;
  }

  console.log("Dashboard stats:", dashboard.stats.totalRevenue);
  /* ================= STATS ================= */

  const stats = [
    {
      title: "Total Orders",
      value: dashboard.stats.totalOrders,
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: `₦${dashboard.stats.totalRevenue}`,
      icon: TrendingUp,
    },
    {
      title: "Pending Payments",
      value: dashboard.stats.pendingPayments,
      icon: CreditCard,
    },
    {
      title: "Reservations",
      value: dashboard.stats.totalReservations,
      icon: CalendarDays,
    },
    {
      title: "Delivered Orders",
      value: dashboard.stats.delivery,
      icon: Bike,
    },
  ];

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-1">Welcome back Admin 👋</p>
        </div>

        <Link
          to="/admin/product/new"
          className="bg-red-500 text-white px-5 py-3 rounded-xl"
        >
          Create New Product
        </Link>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>

                  <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon size={28} className="text-red-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= CONTENT ================= */}

      <div className="grid grid-cols-1  gap-6">
        {/* RECENT ORDERS */}

        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">Recent Orders</h2>

            <Link to="/admin/orders" className="text-red-500">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left px-3">Customer</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentOrders.map((order) => (
                  <tr key={order.orderNumber} className="border-b">
                    <td className="py-4">{order.orderNumber}</td>

                    <td className="px-3">{order.phoneNumber}</td>

                    <td>₦{order.totalAmount.toLocaleString()}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.orderStatus === "DELIVERED"
                            ? "bg-green-100 text-green-600"
                            : order.orderStatus === "PREPARING"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PENDING PAYMENTS */}

        {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">Payment Queue</h2>

            <Clock3 className="text-red-500" />
          </div>

           <div className="space-y-4">
            {dashboard.pendingPayments.map((payment) => (
              <div key={payment.id} className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{payment.id}</h3>

                    <p className="text-gray-500 text-sm">
                      {payment.customerName}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₦{payment.totalAmount.toLocaleString()}
                  </p>
                </div>

                <button className="w-full mt-4 bg-green-500 text-white rounded-lg py-2">
                  Verify Payment
                </button>
              </div>
            ))}
          </div> 
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
