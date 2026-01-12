import { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import useRole from "../../../Hooks/useRole";
import { useTheme } from "../../../Contexts/ThemeContext";

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
  FaBullhorn,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaCrown,
  FaStore,
  FaUserCircle
} from "react-icons/fa";

const Sidebar = () => {
    const { user } = useAuth();
    const { role, isLoading } = useRole();
    const { isDarkMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    if (isLoading) {
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
                            Loading dashboard...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Role-specific themes
    const getRoleTheme = () => {
        switch(role) {
            case 'admin':
                return {
                    gradient: isDarkMode ? 'from-red-600 to-pink-600' : 'from-red-500 to-pink-500',
                    badge: 'bg-red-500',
                    accent: isDarkMode ? 'text-red-400' : 'text-red-600',
                    accentBg: isDarkMode ? 'bg-red-500/20' : 'bg-red-100',
                    activeLink: isDarkMode ? 'bg-red-600' : 'bg-red-500'
                };
            case 'vendor':
                return {
                    gradient: isDarkMode ? 'from-blue-600 to-indigo-600' : 'from-blue-500 to-indigo-500',
                    badge: 'bg-blue-500',
                    accent: isDarkMode ? 'text-blue-400' : 'text-blue-600',
                    accentBg: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
                    activeLink: isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                };
            default:
                return {
                    gradient: isDarkMode ? 'from-green-600 to-emerald-600' : 'from-green-500 to-emerald-500',
                    badge: 'bg-green-500',
                    accent: isDarkMode ? 'text-green-400' : 'text-green-600',
                    accentBg: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
                    activeLink: isDarkMode ? 'bg-green-600' : 'bg-green-500'
                };
        }
    };

    const theme = getRoleTheme();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className={`lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                        ? 'bg-gray-800 text-white border border-gray-700' 
                        : 'bg-white text-gray-800 border border-gray-200 shadow-lg'
                }`}
            >
                {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-72 
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                ${isDarkMode 
                    ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
                }
                backdrop-blur-xl border-r transition-all duration-300
                ${isDarkMode ? 'border-gray-700' : 'border-gray-700'}
                shadow-2xl
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Header Section */}
                    <div className="mb-8 pb-6 border-b border-gray-700">
                        {/* Dark Mode Toggle */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${theme.accentBg}`}>
                                    {role === 'admin' && <FaCrown className={`text-lg ${theme.accent}`} />}
                                    {role === 'vendor' && <FaStore className={`text-lg ${theme.accent}`} />}
                                    {role === 'user' && <FaUser className={`text-lg ${theme.accent}`} />}
                                </div>
                                <span className="text-white font-bold text-lg">Dashboard</span>
                            </div>
                        </div>

                        {/* User Profile Section */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl ring-2 ring-white/20 ring-offset-2 ring-offset-gray-800 overflow-hidden shadow-xl">
                                    {user?.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt={user?.displayName || "User"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                            <FaUserCircle className="text-3xl text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Online Status */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-white truncate">
                                    {user?.displayName || "User"}
                                </h3>
                                <p className="text-sm text-gray-300 truncate">
                                    {user?.email}
                                </p>
                                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mt-2 ${theme.badge} text-white shadow-lg`}>
                                    {role === 'admin' && <FaCrown className="text-xs" />}
                                    {role === 'vendor' && <FaStore className="text-xs" />}
                                    {role === 'user' && <FaUser className="text-xs" />}
                                    <span>{role?.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 overflow-y-auto">
                        <NavLink 
                            to="profile" 
                            onClick={closeMobileMenu}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                    isActive 
                                    ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                    : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                }`
                            }
                        >
                            <div className={`p-2 rounded-lg transition-all duration-300 ${
                                ({ isActive }) => isActive ? 'bg-white/20' : 'group-hover:bg-white/10'
                            }`}>
                                {role === "admin" ? (
                                    <FaUserShield className="text-lg" />
                                ) : role === "vendor" ? (
                                    <FaUserTie className="text-lg" />
                                ) : (
                                    <FaUser className="text-lg" />
                                )}
                            </div>
                            <span className="font-medium">
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
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaTicketAlt className="text-lg" />
                                    </div>
                                    <span className="font-medium">My Booked Tickets</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="transactions" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaHistory className="text-lg" />
                                    </div>
                                    <span className="font-medium">Transaction History</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="become-vendor" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaUserPlus className="text-lg" />
                                    </div>
                                    <span className="font-medium">Become A Vendor</span>
                                </NavLink>

                                <NavLink 
                                    to="analytics" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaChartLine className="text-lg" />
                                    </div>
                                    <span className="font-medium">My Analytics</span>
                                </NavLink>
                            </>
                        )}

                        {role === "vendor" && (
                            <>
                                <NavLink 
                                    to="add-ticket" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaPlusCircle className="text-lg" />
                                    </div>
                                    <span className="font-medium">Add Ticket</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="my-added-tickets" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaListAlt className="text-lg" />
                                    </div>
                                    <span className="font-medium">My Added Tickets</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="requested-bookings" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaHandshake className="text-lg" />
                                    </div>
                                    <span className="font-medium">Requested Bookings</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="revenue-overview" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaChartLine className="text-lg" />
                                    </div>
                                    <span className="font-medium">Revenue Overview</span>
                                </NavLink>
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <NavLink 
                                    to="approved-vendors" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaCheckCircle className="text-lg" />
                                    </div>
                                    <span className="font-medium">Approved Vendors</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="manage-tickets" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaCog className="text-lg" />
                                    </div>
                                    <span className="font-medium">Manage Tickets</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="manage-users" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaUsers className="text-lg" />
                                    </div>
                                    <span className="font-medium">Manage Users</span>
                                </NavLink>
                                
                                <NavLink 
                                    to="advertise" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaBullhorn className="text-lg" />
                                    </div>
                                    <span className="font-medium">Advertise Tickets</span>
                                </NavLink>

                                <NavLink 
                                    to="admin-analytics" 
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                                            isActive 
                                            ? `${theme.activeLink} text-white shadow-lg shadow-blue-500/25` 
                                            : "hover:bg-gray-700/50 hover:text-white text-gray-300"
                                        }`
                                    }
                                >
                                    <div className="p-2 rounded-lg transition-all duration-300 group-hover:bg-white/10">
                                        <FaChartLine className="text-lg" />
                                    </div>
                                    <span className="font-medium">Platform Analytics</span>
                                </NavLink>
                            </>
                        )}
                    </nav>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="text-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-700/30'
                            }`}>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-gray-300 text-sm font-medium">System Online</span>
                            </div>
                            <div className="mt-4 text-gray-400 text-sm">
                                <p className="font-medium">TicketBari Dashboard</p>
                                <p className="text-xs mt-1">© 2026 All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;