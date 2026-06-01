import {
  ShoppingCart,
  CreditCard,
  CalendarDays,
  TrendingUp,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "245",
      icon: ShoppingCart,
      change: "+12%",
    },
    {
      title: "Revenue",
      value: "₦842,000",
      icon: TrendingUp,
      change: "+18%",
    },
    {
      title: "Pending Payments",
      value: "8",
      icon: CreditCard,
      change: "+2",
    },
    {
      title: "Reservations",
      value: "15",
      icon: CalendarDays,
      change: "+5",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1001",
      customer: "John Doe",
      amount: "₦12,500",
      status: "Preparing",
    },
    {
      id: "#ORD-1002",
      customer: "Sarah James",
      amount: "₦9,000",
      status: "Delivered",
    },
    {
      id: "#ORD-1003",
      customer: "Michael",
      amount: "₦6,500",
      status: "Pending",
    },
  ];

  const pendingPayments = [
    {
      id: "TXN-001",
      customer: "James",
      amount: "₦18,000",
    },
    {
      id: "TXN-002",
      customer: "David",
      amount: "₦6,500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-1">Welcome back Admin 👋</p>
        </div>

        <button className="bg-red-500 text-white px-5 py-3 rounded-xl">
          <Link to={"/admin/product/new"}>Create New Product</Link>
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

                  <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>

                  <p className="text-green-500 text-sm mt-2">{stat.change}</p>
                </div>

                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon size={28} className="text-red-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CONTENT AREA */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* RECENT ORDERS */}

        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">Recent Orders</h2>

            <button className="text-red-500">
              <Link to={"/admin/orders"}>View All</Link>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="text-left py-3">Order</th>

                  <th className="text-left">Customer</th>

                  <th className="text-left">Amount</th>

                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-4">{order.id}</td>

                    <td>{order.customer}</td>

                    <td>{order.amount}</td>

                    <td>
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm

                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : order.status === "Preparing"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAYMENT VERIFICATION */}

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <h2 className="font-bold text-xl">Payment Queue</h2>

            <Clock3 className="text-red-500" />
          </div>

          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{payment.id}</h3>

                    <p className="text-gray-500 text-sm">{payment.customer}</p>
                  </div>

                  <p className="font-bold">{payment.amount}</p>
                </div>

                <button className="w-full mt-4 bg-green-500 text-white rounded-lg py-2">
                  Verify Payment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
