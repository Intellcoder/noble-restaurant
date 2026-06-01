import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  item: {
    name: string;
    icon: React.ElementType;
    path: string;
    badge?: number;
  };
  closeSidebar: () => void;
};

const SidebarItem = ({ item, closeSidebar }: Props) => {
  const Icon = item.icon;

  // 👇 detect exact dashboard route match
  const isDashboard = item.path === "/admin";

  return (
    <NavLink
      to={item.path}
      end={isDashboard}
      onClick={closeSidebar}
      className={({ isActive }) =>
        [
          "flex items-center justify-between px-4 py-3 rounded-xl transition",
          isActive
            ? "bg-red-500/20 border-l-4 border-red-500 text-red-400"
            : "text-gray-300 hover:bg-white/5",
        ].join(" ")
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span>{item.name}</span>
      </div>

      <div className="flex items-center gap-2">
        {item.badge && (
          <span className="bg-green-500 px-2 py-1 rounded-full text-xs">
            {item.badge}
          </span>
        )}
        <ChevronRight size={15} />
      </div>
    </NavLink>
  );
};

export default SidebarItem;
