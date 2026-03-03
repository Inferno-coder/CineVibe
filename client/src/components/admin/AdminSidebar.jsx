import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ListVideo, Ticket } from "lucide-react";

const AdminSidebar = () => {
  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Add Shows",
      path: "/admin/add-shows",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "List Shows",
      path: "/admin/list-shows",
      icon: <ListVideo size={20} />,
    },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: <Ticket size={20} />,
    },
  ];

  return (
    <div className="w-64 min-h-[calc(100vh-73px)] border-r border-white/10 bg-black/50 backdrop-blur-xl hidden md:block shrink-0 relative z-40">
      <div className="flex flex-col gap-2 p-4 pt-8 sticky top-[73px]">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === "/admin/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-red-600/10 text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.15)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent hover:border-white/10"
              }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
