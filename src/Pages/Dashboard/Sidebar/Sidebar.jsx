import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router";
import Navbar from "../../../Components/Header/Navbar";

const Sidebar = () => {
    const { userDB } = useAuth();
    //   const role = userDB?.role;
    // const role = userDB?.role === "admin" 
    //     ? "admin" 
    //     : userDB?.role === "vendor" 
    //         ? "vendor" 
    //         : "user";

    const role = "user";

    return (
           <div>
                <aside className="w-64 bg-white shadow-lg min-h-screen p-5">
                    <h2 className="text-xl font-bold mb-2">Dashboard</h2>

                    {/* user */}
                    <div className="mb-3">
                        <h2 className="btn bg-amber-500 mb-1">User Dashboard</h2>
                        {role === "user" && (
                            <ul className="space-y-1">
                                <li>
                                    <NavLink to="profile" className="sidebar-link">
                                        User Profile
                                    </NavLink>
                                </li>
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
                            </ul>
                        )}
                    </div>

                    {/* vendor */}
                    <div className="mb-3">
                        <h2 className="btn bg-amber-500 mb-1">Vendor Dashboard</h2>
                        {role === "vendor" && (
                            <ul className="space-y-1">
                                <li>
                                    <NavLink to="profile" className="sidebar-link">
                                        Vendor Profile
                                    </NavLink>
                                </li>
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
                    </div>

                    {/* admin */}
                    <div className="mb-3">
                        <h2 className="btn bg-amber-500 mb-1">Admin Dashboard</h2>
                        {role === "admin" && (
                            <ul className="space-y-1">
                                <li>
                                    <NavLink to="profile" className="sidebar-link">
                                        Admin Profile
                                    </NavLink>
                                </li>
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
                    </div>
                </aside>
            </div>
        
    );
};

export default Sidebar;
