import { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaIdCard,
  FaUserCircle,
  FaStore,
  FaPlusCircle,
  FaChartLine,
  FaHandshake,
  FaArrowRight,
  FaCamera,
  FaCheck,
  FaLock
} from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../../../Contexts/ThemeContext";

const VendorProfile = ({ user }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50'
        }`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-blue-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-blue-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${
                                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                            }`}>
                                <FaStore className="text-2xl" />
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    Vendor Profile
                                </h1>
                                <p className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Ticket Management Dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Profile Card */}
                <div className={`rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-blue-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-blue-500/20'
                }`}>
                    {/* Cover Section */}
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 opacity-20">
                            <FaStore className="text-6xl text-white" />
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 md:p-8 -mt-20 relative">
                        {/* Avatar Section */}
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-8">
                            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                                        {user?.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user?.displayName || "Vendor"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center ${
                                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                                            }`}>
                                                <FaUserCircle className={`text-6xl ${
                                                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Camera Icon Overlay */}
                                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                        <FaCamera className="text-white text-2xl" />
                                    </div>

                                    {/* Vendor Badge */}
                                    <div className="absolute -bottom-2 -right-2">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white font-bold text-sm shadow-lg">
                                            <FaStore className="text-xs" />
                                            <span>VENDOR</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left">
                                    <h2 className={`text-3xl font-bold mb-2 ${
                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {user?.displayName || "Vendor"}
                                    </h2>
                                    <p className={`text-lg mb-2 ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {user?.email}
                                    </p>
                                    <div className="flex items-center justify-center lg:justify-start gap-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className={`text-sm font-medium ${
                                            isDarkMode ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                            Active Vendor
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Vendor Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-0">
                                <div className={`text-center p-4 rounded-xl ${
                                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>0</p>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Tickets Added
                                    </p>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${
                                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>$0</p>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Revenue
                                    </p>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${
                                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-2"></div>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Online
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Business Information */}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gray-700/30 border-gray-600' 
                                    : 'bg-gray-50/50 border-gray-200'
                            }`}>
                                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    <div className={`p-2 rounded-lg ${
                                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        <FaUser className="text-lg" />
                                    </div>
                                    Business Information
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-gray-600/50' : 'bg-white'
                                        }`}>
                                            <FaUser className={`text-lg ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Business Name
                                            </p>
                                            <p className={`text-lg font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {user?.displayName || "Not set"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-gray-600/50' : 'bg-white'
                                        }`}>
                                            <FaEnvelope className={`text-lg ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Business Email
                                            </p>
                                            <p className={`text-lg font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {user?.email}
                                            </p>
                                        </div>
                                        <div className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                                            <span className="flex items-center gap-1">
                                                <FaCheck className="text-xs" /> Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gray-700/30 border-gray-600' 
                                    : 'bg-gray-50/50 border-gray-200'
                            }`}>
                                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    <div className={`p-2 rounded-lg ${
                                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        <FaIdCard className="text-lg" />
                                    </div>
                                    Account Details
                                </h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-gray-600/50' : 'bg-white'
                                        }`}>
                                            <FaIdCard className={`text-lg ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Vendor ID
                                            </p>
                                            <p className={`text-sm font-mono break-all ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {user?.uid?.substring(0, 20)}...
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-gray-600/50' : 'bg-white'
                                        }`}>
                                            <FaCalendarAlt className={`text-lg ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Vendor Since
                                            </p>
                                            <p className={`text-lg font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {user?.metadata?.creationTime ? 
                                                    new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) : 
                                                    "Recently"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-gray-600/50' : 'bg-white'
                                        }`}>
                                            <FaLock className={`text-lg ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                                Account Status
                                            </p>
                                            <p className={`text-lg font-semibold ${
                                                isDarkMode ? 'text-green-400' : 'text-green-600'
                                            }`}>
                                                Active
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vendor Tools */}
                        <div className="mb-8">
                            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                                <div className={`p-2 rounded-lg ${
                                    isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    <FaStore className="text-lg" />
                                </div>
                                Vendor Tools
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { title: "Add Ticket", icon: FaPlusCircle, path: "/dashboard/add-ticket", desc: "Create new listings" },
                                    { title: "My Tickets", icon: FaStore, path: "/dashboard/my-added-tickets", desc: "Manage inventory" },
                                    { title: "Bookings", icon: FaHandshake, path: "/dashboard/requested-bookings", desc: "Manage requests" },
                                    { title: "Revenue", icon: FaChartLine, path: "/dashboard/revenue-overview", desc: "Track earnings" },
                                ].map((tool, idx) => (
                                    <Link
                                        key={idx}
                                        to={tool.path}
                                        className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                                            isDarkMode 
                                                ? 'bg-gray-700/30 border-gray-600 hover:bg-blue-500/10' 
                                                : 'bg-blue-50/50 border-blue-200 hover:bg-blue-100/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-xl transition-all duration-300 ${
                                                isDarkMode 
                                                    ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' 
                                                    : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                                            }`}>
                                                <tool.icon className="text-2xl" />
                                            </div>
                                            <FaArrowRight className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <h4 className={`font-bold text-lg mb-2 ${
                                            isDarkMode ? 'text-white' : 'text-gray-800'
                                        }`}>
                                            {tool.title}
                                        </h4>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {tool.desc}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                            }`}>
                                <FaEdit className="text-lg" />
                                Edit Business Profile
                            </button>
                            
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                            }`}>
                                <FaKey className="text-lg" />
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;