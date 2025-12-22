import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import useRole from "../../../Hooks/useRole";

import { 
  FaUser, 
  FaUserTie, 
  FaUserShield, 
  FaTicketAlt, 
  FaHistory,
  FaUserPlus,
  FaPlusCircle,
  FaListAlt,
  FaHandshake,
  FaChartLine,
  FaCheckCircle,
  FaCog,
  FaUsers,
  FaBullhorn
} from "react-icons/fa";

const Sidebar = () => {
    const { user } = useAuth();
    const { role, isLoading } = useRole();
    
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="flex">
            <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-5 shadow-xl">
                <div className="mb-8 pb-6 border-b border-gray-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="avatar">
                            <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-gray-900">
                                <img 
                                    src={user?.photoURL || "https://via.placeholder.com/150"} 
                                    alt={user?.displayName || "User"}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{user?.displayName || "User"}</h3>
                            <p className="text-sm text-gray-300">{user?.email}</p>
                            <span className={`px-2 py-1 rounded text-xs font-bold mt-1 inline-block ${
                                role === "admin" ? "bg-green-600" : 
                                role === "vendor" ? "bg-blue-600" : 
                                "bg-purple-600"
                            }`}>
                                {role?.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavLink 
                        to="profile" 
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                isActive 
                                ? "bg-blue-600 text-white shadow-lg" 
                                : "hover:bg-gray-700 hover:text-white text-gray-300"
                            }`
                        }
                    >
                        {role === "admin" ? (
                            <FaUserShield className="text-lg" />
                        ) : role === "vendor" ? (
                            <FaUserTie className="text-lg" />
                        ) : (
                            <FaUser className="text-lg" />
                        )}
                        <span>
                            {role === "admin"
                                ? "Admin Profile"
                                : role === "vendor"
                                    ? "Vendor Profile"
                                    : "User Profile"}
                        </span>
                    </NavLink>

                    {role === "user" && (
                        <>
                            <NavLink 
                                to="my-bookings" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaTicketAlt className="text-lg" />
                                <span>My Booked Tickets</span>
                            </NavLink>
                            
                            <NavLink 
                                to="transactions" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaHistory className="text-lg" />
                                <span>Transaction History</span>
                            </NavLink>
                            
                            <NavLink 
                                to="become-vendor" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaUserPlus className="text-lg" />
                                <span>Become A Vendor</span>
                            </NavLink>
                        </>
                    )}

                    {role === "vendor" && (
                        <>
                            <NavLink 
                                to="add-ticket" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaPlusCircle className="text-lg" />
                                <span>Add Ticket</span>
                            </NavLink>
                            
                            <NavLink 
                                to="my-added-tickets" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaListAlt className="text-lg" />
                                <span>My Added Tickets</span>
                            </NavLink>
                            
                            <NavLink 
                                to="requested-bookings" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaHandshake className="text-lg" />
                                <span>Requested Bookings</span>
                            </NavLink>
                            
                            <NavLink 
                                to="revenue-overview" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaChartLine className="text-lg" />
                                <span>Revenue Overview</span>
                            </NavLink>
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <NavLink 
                                to="approved-vendors" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaCheckCircle className="text-lg" />
                                <span>Approved Vendors</span>
                            </NavLink>
                            
                            <NavLink 
                                to="manage-tickets" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaCog className="text-lg" />
                                <span>Manage Tickets</span>
                            </NavLink>
                            
                            <NavLink 
                                to="manage-users" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaUsers className="text-lg" />
                                <span>Manage Users</span>
                            </NavLink>
                            
                            <NavLink 
                                to="advertise" 
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                        isActive 
                                        ? "bg-blue-600 text-white shadow-lg" 
                                        : "hover:bg-gray-700 hover:text-white text-gray-300"
                                    }`
                                }
                            >
                                <FaBullhorn className="text-lg" />
                                <span>Advertise Tickets</span>
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-700">
                    <div className="text-center text-gray-400 text-sm">
                        <p className="font-medium">TicketBari Dashboard</p>
                        <p className="text-xs mt-1">© 2024 All rights reserved</p>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;