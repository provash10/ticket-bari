import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import { getVisibilityClasses } from '../../../Utils/visibilityHelpers';
import Swal from 'sweetalert2';
import { 
  FaBullhorn, FaToggleOn, FaToggleOff, FaEye, FaSpinner, FaSearch, FaFilter, 
  FaTicketAlt, FaChartBar, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, 
  FaSync, FaRoute, FaBus, FaTrain, FaShip, FaPlane, FaDollarSign, FaUserTie
} from 'react-icons/fa';
import { Link } from 'react-router';

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();
  const visibilityClasses = getVisibilityClasses(isDarkMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTransport, setFilterTransport] = useState('all');

  const { data: ticketsData, isLoading: ticketsLoading, isError: ticketsError, refetch: refetchTickets } = useQuery({
    queryKey: ['advertise-tickets', filterTransport],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/approved');
      return res.data;
    }
  });

  const { data: advertisedData, isLoading: advertisedLoading, refetch: refetchAdvertised } = useQuery({
    queryKey: ['advertised-tickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/current');
      return res.data;
    }
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['advertise-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/stats');
      return res.data;
    }
  });

  const tickets = ticketsData?.data || [];
  const advertisedTickets = advertisedData?.data || [];
  const stats = statsData?.data || { 
    totalApproved: 0, 
    totalAdvertised: 0, 
    availableSlots: 6, 
    maxLimit: 6, 
    isFull: false 
  };

  const toggleAdvertiseMutation = useMutation({
    mutationFn: async ({ ticketId, advertise }) => {
      const res = await axiosSecure.patch(`/tickets/${ticketId}/advertise`, { advertise });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['advertise-tickets']);
      queryClient.invalidateQueries(['advertised-tickets']);
      queryClient.invalidateQueries(['advertise-stats']);
      Swal.fire({
        icon: 'success',
        title: variables.advertise ? 'Advertised!' : 'Unadvertised!',
        text: data.message,
        showConfirmButton: false,
        timer: 2000
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed!',
        html: `<div class="text-left"><p class="font-bold">${error.response?.data?.message || 'Something went wrong'}</p>${error.response?.data?.currentCount ? `<p class="mt-2">Currently advertising: <strong>${error.response.data.currentCount}/6</strong></p>` : ''}</div>`,
        confirmButtonText: 'OK'
      });
    }
  });

  const handleToggleAdvertise = (ticketId, currentStatus, ticketTitle) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'advertise' : 'unadvertise';
    
    Swal.fire({
      title: `${newStatus ? 'Advertise' : 'Unadvertise'} Ticket?`,
      html: `<div class="text-left"><p>You are about to <strong>${action}</strong> the ticket:</p><p class="font-bold text-lg my-2">"${ticketTitle}"</p>${newStatus && stats.availableSlots <= 0 ? `<div class="alert alert-error mt-3"><FaExclamationTriangle class="inline mr-2" /><strong>Warning:</strong> No available slots (6/6 advertised)</div>` : ''}${newStatus ? `<p class="text-blue-600 mt-2">Available slots: <strong>${stats.availableSlots}/6</strong></p>` : ''}</div>`,
      icon: newStatus ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus ? '#3b82f6' : '#6b7280',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: `Yes, ${action} it`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        toggleAdvertiseMutation.mutate({ ticketId, advertise: newStatus });
      }
    });
  };

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <FaBus className={`inline mr-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />;
      case 'train': return <FaTrain className={`inline mr-1 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`} />;
      case 'launch': return <FaShip className={`inline mr-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />;
      case 'plane': return <FaPlane className={`inline mr-1 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`} />;
      default: return <FaBus className={`inline mr-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTransport = filterTransport === 'all' || ticket.transportType === filterTransport;
    
    return matchesSearch && matchesTransport;
  });

  if (ticketsLoading || advertisedLoading || statsLoading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="flex flex-col justify-center items-center h-96">
          <FaSpinner className={`animate-spin text-6xl mb-4 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <p className={`text-xl mb-2 ${visibilityClasses.text.secondary}`}>
            Loading Advertise Tickets...
          </p>
          <p className={visibilityClasses.text.tertiary}>
            Fetching data from database
          </p>
        </div>
      </div>
    );
  }

  if (ticketsError) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center py-20">
          <div className={`alert alert-error max-w-lg mx-auto shadow-lg ${
            visibilityClasses.alert.error
          }`}>
            <FaTimesCircle className="text-3xl" />
            <div>
              <h3 className="font-bold">Failed to Load Tickets!</h3>
              <div className="text-sm">Please check your connection</div>
            </div>
            <button 
              onClick={() => refetchTickets()} 
              className={`btn btn-sm ${visibilityClasses.button.error}`}
            >
              <FaSync className="mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen p-4 md:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header Section */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <FaBullhorn className={`text-3xl ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Advertise Tickets
                </h1>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Promote tickets on homepage (Max 6 at a time)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Stats Card */}
              <div className={`stats shadow transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
              }`}>
                <div className="stat">
                  <div className={`stat-title ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Advertised
                  </div>
                  <div className={`stat-value ${
                    stats.isFull 
                      ? 'text-red-500' 
                      : isDarkMode ? 'text-blue-300' : 'text-blue-600'
                  }`}>
                    {stats.totalAdvertised}/6
                  </div>
                  <div className={`stat-desc ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {stats.isFull ? 'Full - No slots available' : `${stats.availableSlots} slots available`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`stats shadow transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="stat">
                <div className={`stat-figure ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  <FaTicketAlt className="text-2xl" />
                </div>
                <div className={`stat-title ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Approved Tickets
                </div>
                <div className={`stat-value ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {stats.totalApproved}
                </div>
                <div className={`stat-desc ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Available for advertising
                </div>
              </div>
            </div>

            <div className={`stats shadow transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="stat">
                <div className={`stat-figure ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>
                  <FaBullhorn className="text-2xl" />
                </div>
                <div className={`stat-title ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Currently Advertised
                </div>
                <div className={`stat-value ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {stats.totalAdvertised}
                </div>
                <div className={`stat-desc ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Showing on homepage
                </div>
              </div>
            </div>

            <div className={`stats shadow transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className="stat">
                <div className={`stat-figure ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                  <FaChartBar className="text-2xl" />
                </div>
                <div className={`stat-title ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Available Slots
                </div>
                <div className={`stat-value ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {stats.availableSlots}
                </div>
                <div className={`stat-desc ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Out of 6 maximum
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={`mb-6 p-4 rounded-xl shadow-lg transition-all duration-300 ${
          isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className={`label-text flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaSearch className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  Search Tickets
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, route, or vendor..."
                  className={`input input-bordered w-full pl-10 transition-colors duration-300 ${
                    visibilityClasses.input
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className={`absolute left-3 top-3.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className={`label-text flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaFilter className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  Filter by Transport
                </span>
              </label>
              <select
                className={`select select-bordered w-full transition-colors duration-300 ${
                  visibilityClasses.input
                }`}
                value={filterTransport}
                onChange={(e) => setFilterTransport(e.target.value)}
              >
                <option value="all">All Transport Types</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className={`label-text ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Actions
                </span>
              </label>
              <button
                onClick={() => {
                  refetchTickets();
                  refetchAdvertised();
                }}
                className={`btn gap-2 transition-colors duration-300 ${
                  visibilityClasses.button.outline
                }`}
              >
                <FaSync />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {filterTransport !== 'all' && (
              <span className={`badge gap-1 ${visibilityClasses.badge.primary}`}>
                <FaFilter />
                Transport: {filterTransport}
              </span>
            )}
            {searchTerm && (
              <span className={`badge gap-1 ${visibilityClasses.badge.primary}`}>
                <FaSearch />
                Search: "{searchTerm}"
              </span>
            )}
            <span className={`badge gap-1 ${visibilityClasses.badge.default}`}>
              Showing: {filteredTickets.length} tickets
            </span>
            {stats.isFull && (
              <span className={`badge gap-1 ${visibilityClasses.badge.error}`}>
                <FaExclamationTriangle />
                MAX LIMIT REACHED (6/6)
              </span>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Tickets Table */}
          <div className="xl:col-span-2">
            <div className={`rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className={`p-4 border-b transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  <FaTicketAlt className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                  Approved Tickets for Advertising
                  <span className={`badge ml-2 ${visibilityClasses.badge.primary}`}>{filteredTickets.length}</span>
                </h2>
              </div>

              {filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <FaTicketAlt className={`text-6xl mx-auto mb-4 ${visibilityClasses.text.muted}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${visibilityClasses.text.secondary}`}>
                    No Tickets Found
                  </h3>
                  <p className={`mb-6 ${visibilityClasses.text.tertiary}`}>
                    {searchTerm 
                      ? `No tickets match "${searchTerm}"` 
                      : "No approved tickets available for advertising"
                    }
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className={`table w-full ${visibilityClasses.table.background}`}>
                    <thead>
                      <tr className={`transition-colors duration-300 ${visibilityClasses.table.header}`}>
                        <th className={`font-bold ${visibilityClasses.text.primary}`}>
                          Ticket Details
                        </th>
                        <th className={`font-bold ${visibilityClasses.text.primary}`}>
                          Vendor
                        </th>
                        <th className={`font-bold ${visibilityClasses.text.primary}`}>
                          Status
                        </th>
                        <th className={`font-bold text-center ${visibilityClasses.text.primary}`}>
                          Advertise
                        </th>
                        <th className={`font-bold ${visibilityClasses.text.primary}`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket) => (
                        <tr 
                          key={ticket._id} 
                          className={`transition-colors duration-300 ${visibilityClasses.table.row}`}
                        >
                          <td>
                            <div className="flex items-start space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-16 h-16">
                                  <img
                                    src={ticket.image}
                                    alt={ticket.title}
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className={`font-bold ${visibilityClasses.text.primary}`}>
                                  {ticket.title}
                                </div>
                                <div className={`text-sm flex items-center gap-1 ${visibilityClasses.text.secondary}`}>
                                  <FaRoute />
                                  {ticket.from} → {ticket.to}
                                </div>
                                <div className={`text-sm flex items-center gap-1 ${visibilityClasses.text.secondary}`}>
                                  {getTransportIcon(ticket.transportType)}
                                  {ticket.transportType}
                                </div>
                                <div className={`text-sm flex items-center gap-1 ${visibilityClasses.text.secondary}`}>
                                  <FaDollarSign />
                                  ${ticket.price} / ticket
                                </div>
                                {/* Perks section */}
                                {ticket.perks && ticket.perks.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {ticket.perks.slice(0, 3).map((perk, index) => (
                                      <span 
                                        key={index}
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                                          isDarkMode 
                                            ? 'bg-purple-500/20 text-purple-200 border border-purple-400' 
                                            : 'bg-purple-100 text-purple-700 border border-purple-200'
                                        }`}
                                      >
                                        {perk}
                                      </span>
                                    ))}
                                    {ticket.perks.length > 3 && (
                                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        isDarkMode 
                                          ? 'bg-gray-600 text-gray-200 border border-gray-500' 
                                          : 'bg-gray-200 text-gray-700 border border-gray-300'
                                      }`}>
                                        +{ticket.perks.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="avatar">
                                <div className="mask mask-circle w-10 h-10">
                                  <img
                                    src={ticket.vendor?.image || "https://via.placeholder.com/150"}
                                    alt={ticket.vendor?.name}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className={`font-medium ${visibilityClasses.text.primary}`}>
                                  {ticket.vendor?.name}
                                </div>
                                <div className={`text-xs ${visibilityClasses.text.tertiary}`}>
                                  {ticket.vendor?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {ticket.isAdvertised ? (
                              <span className={`badge gap-1 ${visibilityClasses.badge.success}`}>
                                <FaBullhorn />
                                Advertised
                                {ticket.advertisedAt && (
                                  <div className="text-xs mt-1">
                                    {new Date(ticket.advertisedAt).toLocaleDateString()}
                                  </div>
                                )}
                              </span>
                            ) : (
                              <span className={`badge ${visibilityClasses.badge.default}`}>
                                Not Advertised
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised, ticket.title)}
                                disabled={toggleAdvertiseMutation.isLoading || (stats.isFull && !ticket.isAdvertised)}
                                className={`btn btn-sm gap-2 transition-all duration-300 ${
                                  ticket.isAdvertised
                                    ? visibilityClasses.button.error
                                    : stats.isFull
                                    ? 'btn-disabled'
                                    : visibilityClasses.button.primary
                                }`}
                              >
                                {toggleAdvertiseMutation.isLoading ? (
                                  <FaSpinner className="animate-spin" />
                                ) : ticket.isAdvertised ? (
                                  <>
                                    <FaToggleOff />
                                    Unadvertise
                                  </>
                                ) : (
                                  <>
                                    <FaToggleOn />
                                    Advertise
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="flex flex-col gap-2">
                              <Link
                                to={`/ticket/${ticket._id}`}
                                className={`btn btn-outline btn-xs gap-1 transition-colors duration-300 ${
                                  visibilityClasses.button.outline
                                }`}
                                target="_blank"
                              >
                                <FaEye />
                                View
                              </Link>
                              {ticket.isAdvertised && (
                                <div className={`text-xs font-semibold ${
                                  isDarkMode ? 'text-green-300' : 'text-green-600'
                                }`}>
                                  On Homepage
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Currently Advertised Sidebar */}
          <div className="xl:col-span-1">
            <div className={`rounded-xl shadow-lg overflow-hidden h-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800/90 shadow-gray-700' : 'bg-white shadow-md'
            }`}>
              <div className={`p-4 border-b transition-colors duration-300 ${
                isDarkMode ? 'bg-green-500/20 border-green-400' : 'bg-green-50 border-green-200'
              }`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-green-200' : 'text-green-700'
                }`}>
                  <FaBullhorn className={isDarkMode ? 'text-green-300' : 'text-green-600'} />
                  Currently Advertised
                  <span className={`badge ml-2 ${visibilityClasses.badge.success}`}>{advertisedTickets.length}/6</span>
                </h2>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className={`flex justify-between text-sm mb-1 ${visibilityClasses.text.secondary}`}>
                    <span>Advertised Slots</span>
                    <span>{advertisedTickets.length}/6</span>
                  </div>
                  <progress
                    className={`progress w-full ${
                      advertisedTickets.length >= 6
                        ? 'progress-error'
                        : advertisedTickets.length >= 4
                        ? 'progress-warning'
                        : 'progress-success'
                    }`}
                    value={advertisedTickets.length}
                    max="6"
                  ></progress>
                </div>

                {advertisedTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <FaBullhorn className={`text-4xl mx-auto mb-3 ${visibilityClasses.text.muted}`} />
                    <p className={visibilityClasses.text.tertiary}>
                      No tickets are currently advertised
                    </p>
                    <p className={`text-sm mt-2 ${visibilityClasses.text.quaternary}`}>
                      Select tickets from the list to advertise
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {advertisedTickets.map((ticket, index) => (
                      <div
                        key={ticket._id}
                        className={`p-3 border rounded-lg transition-all duration-300 ${
                          isDarkMode 
                            ? 'border-gray-600 hover:bg-green-500/10' 
                            : 'border-gray-200 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className={`font-semibold flex items-center gap-2 ${
                              visibilityClasses.text.primary
                            }`}>
                              <span className={`badge badge-sm ${visibilityClasses.badge.success}`}>{index + 1}</span>
                              {ticket.title}
                            </div>
                            <div className={`text-sm mt-1 ${visibilityClasses.text.secondary}`}>
                              {ticket.from} → {ticket.to}
                            </div>
                            <div className={`text-xs mt-1 ${visibilityClasses.text.tertiary}`}>
                              Advertised: {new Date(ticket.advertisedAt || ticket.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            onClick={() => handleToggleAdvertise(ticket._id, true, ticket.title)}
                            className={`btn btn-xs ${visibilityClasses.button.error}`}
                            disabled={toggleAdvertiseMutation.isLoading}
                          >
                            {toggleAdvertiseMutation.isLoading ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              'Remove'
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`mt-6 p-3 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  }`}>
                    <FaExclamationTriangle className={isDarkMode ? 'text-blue-300' : 'text-blue-600'} />
                    Instructions
                  </h3>
                  <ul className={`text-sm space-y-1 ${
                    isDarkMode ? 'text-blue-100' : 'text-blue-700'
                  }`}>
                    <li>• Maximum 6 tickets can be advertised</li>
                    <li>• Advertised tickets appear on homepage</li>
                    <li>• Only approved tickets can be advertised</li>
                    <li>• Click toggle to advertise/unadvertise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advertising Guide */}
        <div className={`mt-6 border rounded-xl p-6 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-600' 
            : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <FaBullhorn className={`text-2xl ${
                isDarkMode ? 'text-purple-300' : 'text-purple-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${
                isDarkMode ? 'text-purple-200' : 'text-purple-800'
              }`}>
                Advertising Guide
              </h3>
              <ul className={`space-y-2 ${
                isDarkMode ? 'text-purple-100' : 'text-purple-700'
              }`}>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                    isDarkMode ? 'text-green-300' : 'text-green-500'
                  }`} />
                  <span>Advertise tickets with high availability and upcoming departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                    isDarkMode ? 'text-green-300' : 'text-green-500'
                  }`} />
                  <span>Regularly update advertised tickets for freshness</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaExclamationTriangle className={`mt-1 flex-shrink-0 ${
                    isDarkMode ? 'text-yellow-300' : 'text-yellow-500'
                  }`} />
                  <span>Never exceed 6 advertised tickets at once</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                    isDarkMode ? 'text-green-300' : 'text-green-500'
                  }`} />
                  <span>Prioritize tickets with good ratings and complete information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;