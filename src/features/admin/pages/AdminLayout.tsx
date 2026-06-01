import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile navbar */}

        <header className="lg:hidden h-16 bg-white px-5 flex items-center shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h1 className="ml-4 font-bold">Noble Admin</h1>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
