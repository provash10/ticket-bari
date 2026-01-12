import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import { 
  FaEdit, 
  FaTrash, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle,
  FaRoute,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCalendarAlt,
  FaDollarSign,
  FaTicketAlt,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // console.log('current user email:', user?.email);

    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ['my-added-tickets', user?.email],
        queryFn: async () => {
            // console.log('fecth tickets for user:', user?.email);
            const res = await axiosSecure.get(`/my-added-tickets/${user?.email}`);
            // console.log('fetch:', res.data.length, 'tickets');
            // console.log('tickets data:', res.data);
            return res.data;
        },
        enabled: !!user?.email
    });

    const getTransportIcon = (type) => {
        switch(type?.toLowerCase()) {
            case 'bus': return <FaBus className="inline mr-1" />;
            case 'train': return <FaTrain className="inline mr-1" />;
            case 'launch': return <FaShip className="inline mr-1" />;
            case 'plane': return <FaPlane className="inline mr-1" />;
            default: return <FaBus className="inline mr-1" />;
        }
    };

    // Filter tickets based on search and status
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.transportType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const stats = {
        total: tickets.length,
        approved: tickets.filter(t => t.status === 'approved').length,
        pending: tickets.filter(t => t.status === 'pending').length,
        rejected: tickets.filter(t => t.status === 'rejected').length
    };

    const handleDelete = async (id, status, title) => {
        // console.log({ id, status, title });
        
        if (status === 'rejected') {
            // console.log('rejected');
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete',
                text: 'Rejected tickets cannot be deleted',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ticket: "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // console.log('user confirmed deletion');
                try {
                    // console.log('sending delete request ticket id:', id);
                    await axiosSecure.delete(`/tickets/${id}`);
                    // console.log('Ticket deleted successfully');
                    refetch();
                    Swal.fire('Deleted!', 'Ticket has been deleted.', 'success');
                } catch (error) {
                    console.error('Delete error:', error);
                    Swal.fire('Error!', 'Failed to delete ticket.', 'error');
                }
            } else {
                console.log('User cancelled deletion');
            }
        });
    };

    if (isLoading) {
        console.log('loading....');
        return (
            <div className={`min-h-screen transition-all duration-300 ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                    : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50'
            }`}>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className={`inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid ${
                            isDarkMode ? 'border-teal-400 border-t-transparent' : 'border-teal-600 border-t-transparent'
                        }`}></div>
                        <p className={`mt-4 text-lg font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Loading your tickets...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    console.log('total:', tickets.length);

    return (
        <div className={`min-h-screen transition-all duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                : 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50'
        }`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-teal-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-teal-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${
                                isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'
                            }`}>
                                <FaTicketAlt className="text-2xl" />
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    My Added Tickets
                                </h1>
                                <p className={`${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    Manage and track your ticket listings
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Total Tickets', value: stats.total, icon: FaTicketAlt, color: 'teal' },
                        { label: 'Approved', value: stats.approved, icon: FaCheckCircle, color: 'green' },
                        { label: 'Pending', value: stats.pending, icon: FaExclamationTriangle, color: 'yellow' },
                        { label: 'Rejected', value: stats.rejected, icon: FaTimesCircle, color: 'red' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                isDarkMode 
                                    ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-teal-500/10' 
                                    : 'bg-white/90 border-white/20 shadow-xl shadow-teal-500/20'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium ${
                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {stat.label}
                                    </p>
                                    <p className={`text-3xl font-bold mt-1 ${
                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                    }`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-xl ${
                                    stat.color === 'teal' ? (isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600') :
                                    stat.color === 'green' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                                    stat.color === 'yellow' ? (isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600') :
                                    (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')
                                }`}>
                                    <stat.icon className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Filter Section */}
                <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-teal-500/10' 
                        : 'bg-white/90 border-white/20 shadow-2xl shadow-teal-500/20'
                }`}>
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                            <input
                                type="text"
                                placeholder="Search tickets by title, route, or transport type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
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
                                className={`pl-12 pr-8 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                }`}
                            >
                                <option value="all">All Status</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Tickets Section */}
                {filteredTickets.length === 0 ? (
                    <div className={`rounded-2xl shadow-xl p-12 backdrop-blur-sm border transition-all duration-300 text-center ${
                        isDarkMode 
                            ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-teal-500/10' 
                            : 'bg-white/90 border-white/20 shadow-2xl shadow-teal-500/20'
                    }`}>
                        <div className={`p-4 rounded-xl inline-block mb-4 ${
                            isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'
                        }`}>
                            <FaTicketAlt className="text-4xl" />
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                            {tickets.length === 0 ? 'No tickets added yet' : 'No tickets match your search'}
                        </h3>
                        <p className={`mb-6 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {tickets.length === 0 
                                ? 'Start by adding your first ticket to begin selling.' 
                                : 'Try adjusting your search terms or filters.'
                            }
                        </p>
                        {tickets.length === 0 && (
                            <Link 
                                to="/dashboard/add-ticket" 
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                                    isDarkMode 
                                        ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25' 
                                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/25'
                                }`}
                            >
                                <FaEdit /> Add Your First Ticket
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredTickets.map((ticket, index) => {
                            console.log(`Rendering ticket ${index + 1}:`, ticket.title, 'Status:', ticket.status);
                            
                            return (
                                <div 
                                    key={ticket._id} 
                                    className={`rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                                        isDarkMode 
                                            ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-teal-500/10' 
                                            : 'bg-white/90 border-white/20 shadow-xl shadow-teal-500/20'
                                    }`}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={ticket.image} 
                                            alt={ticket.title} 
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                                        />
                                        {ticket.status === 'rejected' && (
                                            <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-white font-bold text-lg flex items-center gap-2">
                                                    <FaTimesCircle /> REJECTED
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                                                ticket.status === 'approved' 
                                                    ? 'bg-green-500 text-white' 
                                                    : ticket.status === 'pending' 
                                                    ? 'bg-yellow-500 text-white' 
                                                    : 'bg-red-500 text-white'
                                            }`}>
                                                {ticket.status === 'approved' ? <FaCheckCircle /> : 
                                                 ticket.status === 'rejected' ? <FaTimesCircle /> : 
                                                 <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                                {ticket.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className={`text-xl font-bold mb-4 ${
                                            isDarkMode ? 'text-white' : 'text-gray-800'
                                        }`}>
                                            {ticket.title}
                                        </h3>
                                        
                                        <div className="space-y-3 mb-6">
                                            {/* Route */}
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'
                                                }`}>
                                                    <FaRoute className="text-sm" />
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-medium ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        Route
                                                    </p>
                                                    <p className={`font-semibold ${
                                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                                    }`}>
                                                        {ticket.from} → {ticket.to}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Transport Type */}
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    isDarkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'
                                                }`}>
                                                    {getTransportIcon(ticket.transportType)}
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-medium ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        Transport
                                                    </p>
                                                    <p className={`font-semibold capitalize ${
                                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                                    }`}>
                                                        {ticket.transportType}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Price & Quantity */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                                                    }`}>
                                                        <FaDollarSign className="text-sm" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs font-medium ${
                                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            Price
                                                        </p>
                                                        <p className={`font-bold ${
                                                            isDarkMode ? 'text-green-400' : 'text-green-600'
                                                        }`}>
                                                            ${ticket.price}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        <FaTicketAlt className="text-sm" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs font-medium ${
                                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                        }`}>
                                                            Available
                                                        </p>
                                                        <p className={`font-bold ${
                                                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                                        }`}>
                                                            {ticket.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Departure */}
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                                                }`}>
                                                    <FaCalendarAlt className="text-sm" />
                                                </div>
                                                <div>
                                                    <p className={`text-xs font-medium ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                        Departure
                                                    </p>
                                                    <p className={`font-semibold text-sm ${
                                                        isDarkMode ? 'text-white' : 'text-gray-800'
                                                    }`}>
                                                        {new Date(ticket.departure).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Warning for rejected tickets */}
                                        {ticket.status === 'rejected' && (
                                            <div className={`p-3 rounded-xl mb-4 border ${
                                                isDarkMode 
                                                    ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                                    : 'bg-red-50 border-red-200 text-red-600'
                                            }`}>
                                                <p className="text-sm flex items-center gap-2">
                                                    <FaExclamationTriangle /> This ticket was rejected by admin
                                                </p>
                                            </div>
                                        )}

                                        {/* Perks */}
                                        {ticket.perks && ticket.perks.length > 0 && (
                                            <div className="mb-4">
                                                <p className={`text-sm font-medium mb-2 ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    Perks:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {ticket.perks.map((perk, idx) => (
                                                        <span 
                                                            key={idx} 
                                                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                                isDarkMode 
                                                                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' 
                                                                    : 'bg-teal-100 text-teal-700 border border-teal-200'
                                                            }`}
                                                        >
                                                            {perk}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <Link 
                                                to={ticket.status === 'rejected' ? '#' : `/dashboard/update-ticket/${ticket._id}`}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                                    ticket.status === 'rejected'
                                                        ? 'opacity-50 cursor-not-allowed pointer-events-none bg-gray-300 text-gray-500'
                                                        : isDarkMode 
                                                        ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25 hover:scale-105' 
                                                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/25 hover:scale-105'
                                                }`}
                                                onClick={(e) => {
                                                    if (ticket.status === 'rejected') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                title={ticket.status === 'rejected' ? 'Cannot update rejected ticket' : 'Update ticket'}
                                            >
                                                <FaEdit className="text-sm" /> Update
                                            </Link>
                                            
                                            <button 
                                                onClick={() => {
                                                    handleDelete(ticket._id, ticket.status, ticket.title);
                                                }}
                                                disabled={ticket.status === 'rejected'}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                                    ticket.status === 'rejected'
                                                        ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                                                        : isDarkMode 
                                                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 hover:scale-105' 
                                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 hover:scale-105'
                                                }`}
                                                title={ticket.status === 'rejected' ? 'Cannot delete rejected ticket' : 'Delete ticket'}
                                            >
                                                <FaTrash className="text-sm" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAddedTickets;