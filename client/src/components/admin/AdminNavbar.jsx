import React from "react";
import { UserCircle } from "lucide-react";
import { assets } from "../../assets/assets";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src={assets.logo} alt="Logo" className="h-8" />
        <span className="text-white text-xl font-bold tracking-wider hidden sm:block">
          ADMIN PANEL
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition border border-transparent hover:border-white/10">
          <img
            src={assets.profile}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-white/20 object-cover"
          />
          <span className="text-sm font-medium text-gray-300 hidden sm:block">
            Admin User
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
