import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import AccessDenied from "../pages/AccessDenied";

const ProtectAdmin = ({ children }) => {
  const { userData, userDataLoading } = useContext(AppContext);

  if (userDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400 font-medium">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="animate-pulse">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  if (!userData || userData.role !== "admin") {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectAdmin;
