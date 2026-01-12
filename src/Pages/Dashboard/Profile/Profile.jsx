import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { useTheme } from "../../../Contexts/ThemeContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaIdCard,
  FaCrown,
  FaStore,
  FaUserCircle,
  FaUserShield,
  FaCog,
  FaBell,
  FaLock,
  FaCamera,
  FaCheck
} from "react-icons/fa";

const Profile = () => {
    const { user } = useAuth();
    const { role, isLoading: isRoleLoading } = useRole(); 
    const { isDarkMode } = useTheme();

    if (isRoleLoading) {
        return (
            <div className={`min-h-screen transition-all duration-300 ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
            }`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className={`inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid ${
                            isDarkMode ? 'border-blue-400 border-t-transparent' : 'border-blue-600 border-t-transparent'
                        }`}></div>
                        <p className={`mt-4 text-lg font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Loading profile...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Role-specific color themes
    const getRoleTheme = () => {
        switch(role) {
            case 'admin':
                return {
                    gradient: isDarkMode ? 'from-red-600 to-pink-600' : 'from-red-500 to-pink-500',
                    badge: 'bg-red-500',
                    accent: isDarkMode ? 'text-red-400' : 'text-red-600',
                    accentBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
                };
            case 'vendor':
                return {
                    gradient: isDarkMode ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500',
                    badge: 'bg-blue-500',
                    accent: isDarkMode ? 'text-blue-400' : 'text-blue-600',
                    accentBg: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                };
            default:
                return {
                    gradient: isDarkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
                    badge: 'bg-green-500',
                    accent: isDarkMode ? 'text-green-400' : 'text-green-600',
                    accentBg: isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
                };
        }
    };

    const theme = getRoleTheme();

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
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
                            <div className={`p-3 rounded-xl ${theme.accentBg} ${theme.accent}`}>
                                {role === 'admin' && <FaCrown className="text-2xl" />}
                                {role === 'vendor' && <FaStore className="text-2xl" />}
                                {role === 'user' && <FaUser className="text-2xl" />}
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    {role === 'admin' ? 'Admin Profile' : 
                                     role === 'vendor' ? 'Vendor Profile' : 
                                     'User Profile'}
                                </h1>
                                <p className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Manage your account information and settings
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
                    <div className={`h-48 bg-gradient-to-r ${theme.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 opacity-20">
                            {role === 'admin' && <FaUserShield className="text-6xl text-white" />}
                            {role === 'vendor' && <FaStore className="text-6xl text-white" />}
                            {role === 'user' && <FaUser className="text-6xl text-white" />}
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

                                    {/* Role Badge */}
                                    <div className="absolute -bottom-2 -right-2">
                                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg ${theme.badge}`}>
                                            {role === 'admin' && <FaCrown className="text-xs" />}
                                            {role === 'vendor' && <FaStore className="text-xs" />}
                                            {role === 'user' && <FaUser className="text-xs" />}
                                            <span>{role?.toUpperCase()}</span>
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
                                        <div className={`w-3 h-3 rounded-full bg-green-500 animate-pulse`}></div>
                                        <span className={`text-sm font-medium ${
                                            isDarkMode ? 'text-green-400' : 'text-green-600'
                                        }`}>
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats for Vendor/Admin */}
                            {(role === 'vendor' || role === 'admin') && (
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-0">
                                    {role === 'vendor' && (
                                        <>
                                            <div className={`text-center p-4 rounded-xl ${
                                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                            }`}>
                                                <p className={`text-2xl font-bold ${theme.accent}`}>0</p>
                                                <p className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    Tickets Added
                                                </p>
                                            </div>
                                            <div className={`text-center p-4 rounded-xl ${
                                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                            }`}>
                                                <p className={`text-2xl font-bold ${theme.accent}`}>$0</p>
                                                <p className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    Revenue
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    {role === 'admin' && (
                                        <>
                                            <div className={`text-center p-4 rounded-xl ${
                                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                            }`}>
                                                <p className={`text-2xl font-bold ${theme.accent}`}>0</p>
                                                <p className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    Total Users
                                                </p>
                                            </div>
                                            <div className={`text-center p-4 rounded-xl ${
                                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                            }`}>
                                                <p className={`text-2xl font-bold ${theme.accent}`}>0</p>
                                                <p className={`text-sm ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    Active Vendors
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    <div className={`text-center p-4 rounded-xl ${
                                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                                    }`}>
                                        <div className={`w-3 h-3 rounded-full bg-green-500 mx-auto mb-2`}></div>
                                        <p className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            Online
                                        </p>
                                    </div>
                                </div>
                            )}
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
                                    <div className={`p-2 rounded-lg ${theme.accentBg} ${theme.accent}`}>
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
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            user?.emailVerified 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-yellow-500 text-white'
                                        }`}>
                                            {user?.emailVerified ? (
                                                <span className="flex items-center gap-1">
                                                    <FaCheck className="text-xs" /> Verified
                                                </span>
                                            ) : (
                                                'Unverified'
                                            )}
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
                                    <div className={`p-2 rounded-lg ${theme.accentBg} ${theme.accent}`}>
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
                                                Last Sign In
                                            </p>
                                            <p className={`text-lg font-semibold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {user?.metadata?.lastSignInTime ? 
                                                    new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    }) : 
                                                    "Today"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? `${theme.badge} hover:opacity-90 text-white shadow-lg shadow-blue-500/25` 
                                    : `${theme.badge} hover:opacity-90 text-white shadow-lg shadow-blue-600/25`
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

                            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                            }`}>
                                <FaCog className="text-lg" />
                                Settings
                            </button>

                            {role !== 'admin' && (
                                <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-all duration-300 hover:scale-105 ${
                                    isDarkMode 
                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                                }`}>
                                    <FaBell className="text-lg" />
                                    Notifications
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;