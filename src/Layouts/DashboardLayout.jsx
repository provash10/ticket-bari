import React from "react";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";
import ApprovedVendors from "../Pages/Dashboard/ApprovedVendors/ApprovedVendors";


const DashboardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
      
       <div className="flex min-h-screen">
      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
