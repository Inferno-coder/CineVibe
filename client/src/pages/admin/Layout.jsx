import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-red-500/30">
      <AdminNavbar />
      <div className="flex relative">
        <AdminSidebar />
        <div className="flex-1 w-full min-h-[calc(100vh-73px)]">
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
