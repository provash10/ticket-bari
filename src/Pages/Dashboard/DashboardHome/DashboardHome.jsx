import React from "react";

import { 
  FaTachometerAlt, 
  FaUser, 
  FaChartLine, 
  FaTicketAlt,
  FaArrowRight,
  FaCalendarAlt,
  FaEnvelope,
  FaCog,
  FaStore,
  FaUsers,
  FaCheckCircle,
  FaHistory,
  FaKey,
  FaUserShield,
  FaUserTie,
  FaHome
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import { Link } from "react-router";

const DashboardHome = () => {
    const { user } = useAuth();
    const { role, isLoading } = useRole();
    
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    // Role-based config
    const roleConfig = {
        admin: {
            title: "Admin Dashboard",
            description: "System Administration Panel",
            color: "from-red-500 to-pink-600",
            badgeColor: "bg-red-500",
            icon: FaUserShield,
            features: [
                { title: "Manage Users", icon: FaUsers, path: "/dashboard/manage-users", color: "text-red-500" },
                { title: "Approve Vendors", icon: FaCheckCircle, path: "/dashboard/approved-vendors", color: "text-red-500" },
                { title: "System Settings", icon: FaCog, path: "/dashboard/manage-tickets", color: "text-red-500" }
            ]
        },
        vendor: {
            title: "Vendor Dashboard",
            description: "Ticket Management Panel",
            color: "from-blue-500 to-cyan-600",
            badgeColor: "bg-blue-500",
            icon: FaUserTie,
            features: [
                { title: "Add Ticket", icon: FaTicketAlt, path: "/dashboard/add-ticket", color: "text-blue-500" },
                { title: "My Tickets", icon: FaStore, path: "/dashboard/my-added-tickets", color: "text-blue-500" },
                { title: "Revenue", icon: FaChartLine, path: "/dashboard/revenue-overview", color: "text-blue-500" }
            ]
        },
        user: {
            title: "User Dashboard",
            description: "Customer Account Panel",
            color: "from-green-500 to-emerald-600",
            badgeColor: "bg-green-500",
            icon: FaUser,
            features: [
                { title: "My Bookings", icon: FaTicketAlt, path: "/dashboard/my-bookings", color: "text-green-500" },
                { title: "Transaction History", icon: FaHistory, path: "/dashboard/transactions", color: "text-green-500" },
                { title: "Become Vendor", icon: FaUserTie, path: "/become-vendor", color: "text-green-500" }
            ]
        }
    };

    const config = roleConfig[role] || roleConfig.user;
    const RoleIcon = config.icon;

    return (
        <div className="p-4 md:p-6">
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${config.color}`}>
                        <FaTachometerAlt className="text-white text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{config.title}</h1>
                        <p className="text-gray-600">
                            Welcome back, <span className="font-semibold">{user?.displayName || user?.email}</span>
                        </p>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold mb-6">
                    <div className={`${config.badgeColor} px-4 py-2 rounded-full flex items-center gap-2`}>
                        <RoleIcon className="text-sm" />
                        <span className="uppercase">{role}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
                        <FaUser className="text-blue-500 text-xl" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <FaUser className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{user?.displayName || "Not set"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Account Status</h3>
                        <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-2xl font-bold text-green-600">Active</p>
                            <p className="text-gray-500 text-sm mt-1">Account is verified</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCalendarAlt className="text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="font-medium">
                                    {user?.metadata?.creationTime ? 
                                        new Date(user.metadata.creationTime).toLocaleDateString() : 
                                        "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                        <FaArrowRight className="text-purple-500 text-xl" />
                    </div>
                    <div className="space-y-3">
                        <Link
                            to="/dashboard/profile" 
                            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <FaUser className="text-gray-500" />
                                <span className="font-medium">View Profile</span>
                            </div>
                            <FaArrowRight className="text-gray-400" />
                        </Link>
                        <Link 
                            to="/dashboard/profile" 
                            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <FaKey className="text-gray-500" />
                                <span className="font-medium">Change Password</span>
                            </div>
                            <FaArrowRight className="text-gray-400" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* role features */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {config.features.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                            <Link 
                                key={index}
                                to={feature.path}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg bg-gray-50`}>
                                        <FeatureIcon className={`text-2xl ${feature.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                        <p className="text-gray-500 text-sm">
                                            Access {feature.title.toLowerCase()} features
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Getting Started</h2>
                        <p className="text-gray-600 mb-4">
                            Welcome to your {role} dashboard. Use the navigation menu to access all 
                            features available for your account type.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link 
                                to="/dashboard/profile" 
                                className="btn btn-primary flex items-center gap-2"
                            >
                                <FaUser />
                                View Profile
                            </Link>
                            <Link 
                                to="/" 
                                className="btn btn-outline flex items-center gap-2"
                            >
                                <FaHome />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${config.color}`}>
                            <RoleIcon className="text-white text-4xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;