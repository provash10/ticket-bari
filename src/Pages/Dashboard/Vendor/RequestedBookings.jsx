import { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../../../Contexts/ThemeContext';
import { 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaTicketAlt, 
  FaDollarSign, 
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaEye,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEnvelope
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const RequestedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useTheme(); 
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['requested-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-bookings/${user?.email}`);
            return res.data;
        }
    });

    // Filter bookings based on search and status
    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = 
            booking.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.title?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        accepted: bookings.filter(b => b.status === 'accepted').length,
        rejected: bookings.filter(b => b.status === 'rejected').length,
        totalRevenue: bookings
            .filter(b => b.status === 'accepted')
            .reduce((sum, b) => sum + (b.price * b.quantity), 0)
    };

    const handleStatusUpdate = async (bookingId, status, bookingTitle) => {
        const action = status === 'accepted' ? 'accept' : 'reject';
        const result = await Swal.fire({
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} Booking?`,
            text: `Are you sure you want to ${action} the booking for "${bookingTitle}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: status === 'accepted' ? '#10b981' : '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/bookings/status/${bookingId}`, { status });
                refetch();
                Swal.fire({
                    title: `Booking ${action}ed!`,
                    text: `The booking has been ${action}ed successfully.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: `Failed to ${action} the booking. Please try again.`,
                    icon: 'error'
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className={`min-h-screen transition-all duration-300 ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
            }`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className={`inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid ${
                            isDarkMode ? 'border-orange-400 border-t-transparent' : 'border-orange-600 border-t-transparent'
                        }`}></div>
                        <p className={`mt-4 text-lg font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Loading bookings...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
        }`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-orange-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-orange-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${
                                isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                            }`}>
                                <FaTicketAlt className="text-2xl" />
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    Requested Bookings
                                </h1>
                                <p className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Manage customer booking requests
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {[
                        { label: 'Total Bookings', value: stats.total, icon: FaTicketAlt, color: 'orange' },
                        { label: 'Pending', value: stats.pending, icon: FaClock, color: 'yellow' },
                        { label: 'Accepted', value: stats.accepted, icon: FaCheckCircle, color: 'green' },
                        { label: 'Rejected', value: stats.rejected, icon: FaTimesCircle, color: 'red' },
                        { label: 'Revenue', value: `$${stats.totalRevenue}`, icon: FaDollarSign, color: 'emerald' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                isDarkMode 
                                    ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-orange-500/10' 
                                    : 'bg-white/90 border-white/20 shadow-xl shadow-orange-500/20'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {stat.label}
                                    </p>
                                    <p className={`text-2xl font-bold mt-1 ${
                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl ${
                                    stat.color === 'orange' ? (isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600') :
                                    stat.color === 'yellow' ? (isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600') :
                                    stat.color === 'green' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                                    stat.color === 'red' ? (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600') :
                                    (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')
                                }`}>
                                    <stat.icon className="text-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filter Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-orange-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-orange-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                                type="text"
                                placeholder="Search by customer name, email, or ticket title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                            />
                        </div>
                        
                        {/* Status Filter */}
                        <div className="relative">
                            <FaFilter className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={`pl-12 pr-8 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                {filteredBookings.length === 0 ? (
                    <div className={`rounded-2xl shadow-xl p-12 backdrop-blur-sm border transition-all duration-300 text-center ${
                        isDarkMode 
                            ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-orange-500/10' 
                            : 'bg-white/90 border-white/20 shadow-2xl shadow-orange-500/20'
                    }`}>
                        <div className={`p-4 rounded-xl inline-block mb-4 ${
                            isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                        }`}>
                            <FaTicketAlt className="text-4xl" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                            {bookings.length === 0 ? 'No booking requests yet' : 'No bookings match your search'}
                        </h3>
                        <p className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {bookings.length === 0 
                                ? 'Booking requests will appear here when customers book your tickets.' 
                                : 'Try adjusting your search terms or filters.'
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className={`hidden lg:block rounded-2xl shadow-xl backdrop-blur-sm border transition-all duration-300 overflow-hidden ${
                            isDarkMode 
                                ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-orange-500/10' 
                                : 'bg-white/90 border-white/20 shadow-2xl shadow-orange-500/20'
                        }`}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className={`${
                                        isDarkMode ? 'bg-gray-700/50' : 'bg-orange-50/50'
                                    }`}>
                                        <tr>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Customer
                                            </th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Ticket
                                            </th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Quantity
                                            </th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Total Price
                                            </th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Status
                                            </th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${
                                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredBookings.map((booking, index) => (
                                            <tr 
                                                key={booking._id}
                                                className={`transition-colors duration-200 ${
                                                    isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-orange-50/30'
                                                }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${
                                                            isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                                                        }`}>
                                                            <FaUser className="text-sm" />
                                                        </div>
                                                        <div>
                                                            <p className={`font-medium ${
                                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                                            }`}>
                                                                {booking.customer?.name || 'N/A'}
                                                            </p>
                                                            <p className={`text-sm ${
                                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                            }`}>
                                                                {booking.customer?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 font-medium ${
                                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                                }`}>
                                                    {booking.title}
                                                </td>
                                                <td className={`px-6 py-4 ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    {booking.quantity}
                                                </td>
                                                <td className={`px-6 py-4 font-bold ${
                                                    isDarkMode ? 'text-green-400' : 'text-green-600'
                                                }`}>
                                                    ${booking.price * booking.quantity}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                                                        booking.status === 'accepted' 
                                                            ? 'bg-green-500 text-white' 
                                                            : booking.status === 'rejected' 
                                                            ? 'bg-red-500 text-white' 
                                                            : 'bg-yellow-500 text-white'
                                                    }`}>
                                                        {booking.status === 'accepted' ? <FaCheckCircle /> : 
                                                         booking.status === 'rejected' ? <FaTimesCircle /> : 
                                                         <FaClock />}
                                                        {booking.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {booking.status === 'pending' && (
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => handleStatusUpdate(booking._id, 'accepted', booking.title)}
                                                                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                                                                    isDarkMode 
                                                                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25' 
                                                                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                                                                }`}
                                                            >
                                                                <FaCheck className="text-xs" /> Accept
                                                            </button>
                                                            <button 
                                                                onClick={() => handleStatusUpdate(booking._id, 'rejected', booking.title)}
                                                                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                                                                    isDarkMode 
                                                                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' 
                                                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                                                                }`}
                                                            >
                                                                <FaTimes className="text-xs" /> Reject
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Card View */}
                        <div className="lg:hidden space-y-6">
                            {filteredBookings.map((booking, index) => (
                                <div 
                                    key={booking._id}
                                    className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                        isDarkMode 
                                            ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-orange-500/10' 
                                            : 'bg-white/90 border-white/20 shadow-xl shadow-orange-500/20'
                                    }`}
                                >
                                    {/* Status Badge */}
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                                            booking.status === 'accepted' 
                                                ? 'bg-green-500 text-white' 
                                                : booking.status === 'rejected' 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-yellow-500 text-white'
                                        }`}>
                                            {booking.status === 'accepted' ? <FaCheckCircle /> : 
                                             booking.status === 'rejected' ? <FaTimesCircle /> : 
                                             <FaClock />}
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-3 rounded-xl ${
                                            isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'
                                        }`}>
                                            <FaUser className="text-lg" />
                                        </div>
                                        <div>
                                            <p className={`font-bold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {booking.customer?.name || 'N/A'}
                                            </p>
                                            <p className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {booking.customer?.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span className={`font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                Ticket:
                                            </span>
                                            <span className={`font-bold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {booking.title}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={`font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                Quantity:
                                            </span>
                                            <span className={`font-bold ${
                                                isDarkMode ? 'text-white' : 'text-gray-800'
                                            }`}>
                                                {booking.quantity}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className={`font-medium ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                Total Price:
                                            </span>
                                            <span className={`font-bold text-lg ${
                                                isDarkMode ? 'text-green-400' : 'text-green-600'
                                            }`}>
                                                ${booking.price * booking.quantity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {booking.status === 'pending' && (
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => handleStatusUpdate(booking._id, 'accepted', booking.title)}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                                    isDarkMode 
                                                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25' 
                                                        : 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25'
                                                }`}
                                            >
                                                <FaCheck /> Accept
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(booking._id, 'rejected', booking.title)}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                                    isDarkMode 
                                                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' 
                                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                                                }`}
                                            >
                                                <FaTimes /> Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RequestedBookings;