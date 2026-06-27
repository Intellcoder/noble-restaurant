import { X, ChevronRight, LogOut } from "lucide-react";

import SidebarItem from "./SideBarItem";
import { menuItems } from "../../../shared/constants/menuItem";
import { useAuthStore } from "../../../store/auth.store";

type Props = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: Props) => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <SidebarOverlay isOpen={isOpen} onClose={closeSidebar} />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0
          w-[280px] h-screen
          bg-[#07152E] text-white
          z-50 flex flex-col
          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <SidebarHeader onClose={closeSidebar} />

        <SidebarNavigation closeSidebar={closeSidebar} />

        <SidebarFooter onLogout={handleLogout} />
      </aside>
    </>
  );
};

export default Sidebar;

/* -------------------------------- */
/* Overlay */
/* -------------------------------- */

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SidebarOverlay = ({ isOpen, onClose }: OverlayProps) => (
  <div
    onClick={onClose}
    className={`
      fixed inset-0 bg-black/50 z-40 lg:hidden
      transition-opacity duration-300
      ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
    `}
  />
);

/* -------------------------------- */
/* Header */
/* -------------------------------- */

type HeaderProps = {
  onClose: () => void;
};

const SidebarHeader = ({ onClose }: HeaderProps) => (
  <div className="p-6 border-b border-white/10">
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
          🍽️
        </div>

        <div>
          <h1 className="font-bold">Noble Restaurant</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
      </div>

      <button
        className="lg:hidden hover:text-red-400 transition-colors"
        onClick={onClose}
      >
        <X />
      </button>
    </div>
  </div>
);

/* -------------------------------- */
/* Navigation */
/* -------------------------------- */

type NavigationProps = {
  closeSidebar: () => void;
};

const SidebarNavigation = ({ closeSidebar }: NavigationProps) => (
  <div className="flex-1 overflow-y-auto p-4">
    {menuItems.map((section) => (
      <div key={section.title} className="mb-8">
        <h3 className="text-xs uppercase text-gray-500 px-3 mb-4">
          {section.title}
        </h3>

        <div className="space-y-2">
          {section.items.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              closeSidebar={closeSidebar}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/* -------------------------------- */
/* Footer */
/* -------------------------------- */

type FooterProps = {
  onLogout: () => void;
};

const SidebarFooter = ({ onLogout }: FooterProps) => (
  <div className="p-4 border-t border-white/10 space-y-3">
    {/* User Card */}
    <div className="bg-white/5 rounded-xl p-3 flex justify-between items-center">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100"
          alt="Admin avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h3 className="font-medium">Admin</h3>
          <p className="text-xs text-gray-400">Super Admin</p>
        </div>
      </div>

      <ChevronRight size={18} />
    </div>

    {/* Logout */}
    <button
      onClick={onLogout}
      className="
        w-full
        bg-red-600 hover:bg-red-700
        transition-colors
        rounded-xl
        py-3
        flex items-center justify-center gap-2
        font-medium
      "
    >
      <LogOut size={18} />
      Logout
    </button>
  </div>
);
