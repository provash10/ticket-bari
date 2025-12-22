import React from "react";
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
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router";


const VendorProfile = ({ user, role }) => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Vendor Profile</h1>
                    <p className="text-gray-600 mt-2">Ticket Management Dashboard</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-600"></div>

                    <div className="p-6 md:p-8 -mt-16">
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-4">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user?.displayName || "Vendor"}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaUserCircle className="text-6xl text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0">
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500 text-white font-bold text-sm">
                                        <FaStore className="text-xs" />
                                        <span>VENDOR</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || "Vendor"}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Business Name</p>
                                        <p className="font-semibold">{user?.displayName || "Not set"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Business Email</p>
                                        <p className="font-semibold">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaIdCard className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Vendor ID</p>
                                        <p className="font-mono text-sm truncate">{user?.uid?.substring(0, 20)}...</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Vendor Since</p>
                                        <p className="font-semibold">
                                            {user?.metadata?.creationTime ? 
                                                new Date(user.metadata.creationTime).toLocaleDateString() : 
                                                "Recently"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Vendor Tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Link
                                    to="/dashboard/add-ticket"
                                    className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaPlusCircle className="text-blue-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Add Ticket</h4>
                                    <p className="text-sm text-gray-600">Create new listings</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/my-added-tickets"
                                    className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaStore className="text-blue-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">My Tickets</h4>
                                    <p className="text-sm text-gray-600">Manage inventory</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/requested-bookings"
                                    className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaHandshake className="text-blue-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Bookings</h4>
                                    <p className="text-sm text-gray-600">Manage requests</p>
                                </Link>
                                
                                <Link 
                                    to="/dashboard/revenue-overview"
                                    className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <FaChartLine className="text-blue-500 text-xl" />
                                        <FaArrowRight className="text-gray-400 text-sm" />
                                    </div>
                                    <h4 className="font-semibold">Revenue</h4>
                                    <p className="text-sm text-gray-600">Track earnings</p>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <button className="btn btn-primary gap-2">
                                <FaEdit />
                                Edit Business Profile
                            </button>
                            <button className="btn btn-outline gap-2">
                                <FaKey />
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