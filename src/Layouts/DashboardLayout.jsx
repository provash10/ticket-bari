import React from "react";
import useAuth from "../Hooks/useAuth";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Navbar from "../Components/Header/Navbar";

const DashboardLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-base-200 min-h-screen">
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="bg-base-100 rounded-2xl shadow-sm min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

