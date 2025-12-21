 import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router";
import Navbar from "../../../Components/Header/Navbar";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";

const Sidebar = () => {
    const { user, isRoleLoading } = useAuth();
    // const [role,isLoading] = userDB?.role;
    // const role = user?.role === "admin" 
    //     ? "admin" 
    //     : user?.role === "vendor" 
    //         ? "vendor" 
    //         : "user";

    // const role = "user";
    // const role = "vendor";
    const role = "admin";

       if (isRoleLoading) return <LoadingSpinner />;

    return (
        <div>
            <li><NavLink to="users-management" className="font-bold">User Management</NavLink></li>
            {/* <h2 className="text-xl font-bold mb-20">User Management</h2> */}
            <aside className="w-64 bg-white shadow-lg min-h-screen p-5">
                {/* <h2 className="text-xl font-bold mb-4">Dashboard</h2> */}

                {/* common profile */}
                <ul className="space-y-1">
                    <li>
                        <NavLink to="profile" className="sidebar-link">
                            {role === "admin"
                                ? "Admin Profile"
                                : role === "vendor"
                                    ? "Vendor Profile"
                                    : "User Profile"}
                        </NavLink>
                    </li>
                </ul>

                
                {role === "user" && (
                    <ul className="mt-4 space-y-1">
                        <li>
                            <NavLink to="my-bookings" className="sidebar-link">
                                My Booked Tickets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="transactions" className="sidebar-link">
                                Transaction History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="become-vendor" className="sidebar-link">
                                Become A Vendor
                            </NavLink>
                        </li>
                    </ul>
                )}

           
                {role === "vendor" && (
                    <ul className="mt-4 space-y-1">
                        <li>
                            <NavLink to="add-ticket" className="sidebar-link">
                                Add Ticket
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="my-tickets" className="sidebar-link">
                                My Added Tickets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="requested-bookings" className="sidebar-link">
                                Requested Bookings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="revenue-overview" className="sidebar-link">
                                Revenue Overview
                            </NavLink>
                        </li>
                    </ul>
                )}

            
                {role === "admin" && (
                    <ul className="mt-4 space-y-1">
                        <li>
                            <NavLink to="manage-tickets" className="sidebar-link">
                                Manage Tickets
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="manage-users" className="sidebar-link">
                                Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="advertise" className="sidebar-link">
                                Advertise Tickets
                            </NavLink>
                        </li>
                    </ul>
                )}
            </aside>
        </div>

    );
};

export default Sidebar;

