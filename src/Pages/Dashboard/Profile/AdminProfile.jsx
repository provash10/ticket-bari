import React from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaIdCard,
  FaUserCircle,
  FaCrown,
  FaUsers,
  FaCog,
  FaCheckCircle,
  FaBullhorn,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router";


const AdminProfile = ({ user, role }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
                    <p className="text-gray-600 mt-2">System Administration Panel</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-40 bg-gradient-to-r from-red-500 to-pink-600"></div>

                    <div className="p-6 md:p-8 -mt-16">
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName || "Admin"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaUserCircle className="text-6xl text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white font-bold text-sm">
                                        <FaCrown className="text-xs" />
                                        <span>ADMINISTRATOR</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || "Admin"}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Administrator</p>
                                        <p className="font-semibold">{user?.displayName || "System Admin"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Admin Email</p>
                                        <p className="font-semibold">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaIdCard className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Admin ID</p>
                                        <p className="font-mono text-sm truncate">{user?.uid?.substring(0, 20)}...</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Admin Since</p>
                                        <p className="font-semibold">
                                            {user?.metadata?.creationTime ? 
                                                new Date(user.metadata.creationTime).toLocaleDateString() : 
                                                "System"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Admin Tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Link
                                    to="/dashboard/manage-users"
                                    className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaUsers className="text-red-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Manage Users</h4>
                                    <p className="text-sm text-gray-600">Control user accounts</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/approved-vendors"
                                    className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaCheckCircle className="text-red-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Approve Vendors</h4>
                                    <p className="text-sm text-gray-600">Verify applications</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/manage-tickets"
                                    className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaCog className="text-red-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">System Settings</h4>
                                    <p className="text-sm text-gray-600">Configure platform</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/advertise"
                                    className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaBullhorn className="text-red-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Advertisements</h4>
                                    <p className="text-sm text-gray-600">Manage promotions</p>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <button className="btn btn-primary gap-2">
                                <FaEdit />
                                Edit Admin Profile
                            </button>
                            <button className="btn btn-outline gap-2">
                                <FaKey />
                                Change Password
                            </button>
                            <Link 
                                to="/dashboard/manage-users"
                                className="btn btn-error gap-2"
                            >
                                <FaUsers />
                                Manage System
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;