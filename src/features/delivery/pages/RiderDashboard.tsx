// src/pages/RiderDashboard.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RiderStats from "../components/RiderStats";
import ActiveDeliveryCard from "../components/ActiveDeliveryCard";
import DeliveryHistoryTable from "../components/DeliveryHistoryTable";
import logo from "../../../assets/noble-restaurant-logo-osogbo.png";

const navItems = [
  { label: "Dashboard", path: "/rider/:id", icon: "ti-layout-dashboard" },
  { label: "Active deliveries", path: "/rider/active", icon: "ti-truck" },
  { label: "History", path: "/rider/history", icon: "ti-history" },
  { label: "Profile", path: "/rider/profile", icon: "ti-user" },
];

const RiderDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={logo} alt="" />
          </div>
          <span className="font-semibold text-gray-900 text-[15px]">
            Rider panel
          </span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-red-50 text-[#B80000]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <i
                  className={`ti ${item.icon} text-[18px]`}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-400 truncate">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-900"
              aria-label="Open menu"
            >
              <i className="ti ti-menu-2 text-xl" aria-hidden="true" />
            </button>
            <h1 className="text-base lg:text-lg font-semibold text-gray-900">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Notifications"
            >
              <i className="ti ti-bell text-[20px]" aria-hidden="true" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#B80000] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 lg:hidden">
              JD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl">
          {/* Welcome */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Welcome back, John
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here's what's happening with your deliveries today.
            </p>
          </div>

          {/* Stats */}
          <RiderStats />

          {/* Active deliveries */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Active deliveries
              </h3>
              <Link
                to="/rider/active"
                className="text-sm font-medium text-[#B80000] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <ActiveDeliveryCard />
              <ActiveDeliveryCard />
            </div>
          </section>

          {/* History */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Recent deliveries
              </h3>
              <Link
                to="/rider/history"
                className="text-sm font-medium text-[#B80000] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <DeliveryHistoryTable />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RiderDashboard;
