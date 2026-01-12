import { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaIdCard,
  FaUserCircle,
  FaTicketAlt,
  FaHistory,
  FaUserPlus,
  FaArrowRight,
  FaCamera,
  FaCheck,
  FaLock
} from "react-icons/fa";
import { Link } from "react-router";
import { useTheme } from "../../../Contexts/ThemeContext";

const UserProfile = ({ user }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'
        }`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-green-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-green-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${
                                isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                            }`}>
                                <FaUser className="text-2xl" />
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    My Profile
                                </h1>
                                <p className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Customer Account Dashboard
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Profile Card */}
                <div className={`rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-green-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-green-500/20'
                }`}>
                    {/* Cover Section */}
                    <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 opacity-20">
                            <FaUser className="text-6xl text-white" />
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
                                                alt={user?.displayName || "User"}
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

                                    {/* Customer Badge */}
                                    <div className="absolute -bottom-2 -right-2">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500 text-white font-bold text-sm shadow-lg">
                                            <FaUser className="text-xs" />
                                            <span>CUSTOMER</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center lg:text-left">
                                    <h2 className={`text-3xl font-bold mb-2 ${
                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {user?.displayName || "User"}
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
                                            Active Customer
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-0">
                                <div className={`text-center p-4 rounded-xl ${
                                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-green-400' : 'text-green-600'
                                    }`}>0</p>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Bookings
                                    </p>
                                </div>
                                <div className={`text-center p-4 rounded-xl ${
                                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                }`}>
                                    <p className={`text-2xl font-bold ${
                                        isDarkMode ? 'text-green-400' : 'text-green-600'
                                    }`}>$0</p>
                                    <p className={`text-sm ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        Spent
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
                            {/* Personal Information */}
                            <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gray-700/30 border-gray-600' 
                                    : 'bg-gray-50/50 border-gray-200'
                            }`}>
                                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    <div className={`p-2 rounded-lg ${
                                        isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                                    }`}>
                                        <FaUser className="text-lg" />
                                    </div>
                                    Personal Information
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
                                                Full Name
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
                                                Email Address
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
                                        isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
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
                                                User ID
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
                                                Member Since
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

                        {/* Customer Features */}
                        <div className="mb-8">
                            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                                <div className={`p-2 rounded-lg ${
                                    isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                                }`}>
                                    <FaTicketAlt className="text-lg" />
                                </div>
                                Customer Features
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: "My Bookings", icon: FaTicketAlt, path: "/dashboard/my-bookings", desc: "View your ticket bookings" },
                                    { title: "Transactions", icon: FaHistory, path: "/dashboard/transactions", desc: "View payment history" },
                                    { title: "Become Vendor", icon: FaUserPlus, path: "/dashboard/become-vendor", desc: "Start selling tickets" },
                                ].map((feature, idx) => (
                                    <Link
                                        key={idx}
                                        to={feature.path}
                                        className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${
                                            isDarkMode 
                                                ? 'bg-gray-700/30 border-gray-600 hover:bg-green-500/10' 
                                                : 'bg-green-50/50 border-green-200 hover:bg-green-100/50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-xl transition-all duration-300 ${
                                                isDarkMode 
                                                    ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
                                                    : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                                            }`}>
                                                <feature.icon className="text-2xl" />
                                            </div>
                                            <FaArrowRight className={`text-lg transition-transform duration-300 group-hover:translate-x-1 ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        </div>
                                        <h4 className={`font-bold text-lg mb-2 ${
                                            isDarkMode ? 'text-white' : 'text-gray-800'
                                        }`}>
                                            {feature.title}
                                        </h4>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {feature.desc}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25' 
                                    : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                            }`}>
                                <FaEdit className="text-lg" />
                                Edit Profile
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

export default UserProfile;