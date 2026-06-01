import { X, ChevronRight } from "lucide-react";

import SidebarItem from "./SideBarItem";
import { menuItems } from "../../../shared/constants/menuItem";

type Props = {
  isOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = ({ isOpen, closeSidebar }: Props) => {
  return (
    <>
      <div
        onClick={closeSidebar}
        className={`
          fixed inset-0
          bg-black/50
          z-40
          lg:hidden

          ${isOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          w-[280px]
          h-screen
          bg-[#07152E]
          text-white
          z-50
          flex flex-col
          transition-transform

          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                🍽️
              </div>

              <div>
                <h1 className="font-bold">Noble Restaurant</h1>

                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>

            <button className="lg:hidden" onClick={closeSidebar}>
              <X />
            </button>
          </div>
        </div>

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

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 flex justify-between">
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/100"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h3>Admin</h3>

                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>

            <ChevronRight size={18} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
