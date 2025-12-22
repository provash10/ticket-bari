import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { 
  FaBullhorn, 
  FaToggleOn, 
  FaToggleOff, 
  FaEye, 
  FaSpinner,
  FaSearch,
  FaFilter,
  FaTicketAlt,
  FaChartBar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaRoute,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaDollarSign,
  FaUserTie
} from 'react-icons/fa';
import { Link } from 'react-router';

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTransport, setFilterTransport] = useState('all');

  const { 
    data: ticketsData, 
    isLoading: ticketsLoading, 
    isError: ticketsError, 
    refetch: refetchTickets 
  } = useQuery({
    queryKey: ['advertise-tickets', filterTransport],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/approved');
      return res.data;
    }
  });

  const { 
    data: advertisedData, 
    isLoading: advertisedLoading,
    refetch: refetchAdvertised 
  } = useQuery({
    queryKey: ['advertised-tickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/current');
      return res.data;
    }
  });

  const { 
    data: statsData, 
    isLoading: statsLoading 
  } = useQuery({
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
        html: `
          <div class="text-left">
            <p class="font-bold">${error.response?.data?.message || 'Something went wrong'}</p>
            ${error.response?.data?.currentCount ? 
              `<p class="mt-2">Currently advertising: <strong>${error.response.data.currentCount}/6</strong></p>` 
              : ''}
          </div>
        `,
        confirmButtonText: 'OK'
      });
    }
  });

  const handleToggleAdvertise = (ticketId, currentStatus, ticketTitle) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'advertise' : 'unadvertise';

    Swal.fire({
      title: `${newStatus ? 'Advertise' : 'Unadvertise'} Ticket?`,
      html: `
        <div class="text-left">
          <p>You are about to <strong>${action}</strong> the ticket:</p>
          <p class="font-bold text-lg my-2">"${ticketTitle}"</p>
          ${newStatus && stats.availableSlots <= 0 ? 
            `<div class="alert alert-error mt-3">
              <FaExclamationTriangle class="inline mr-2" />
              <strong>Warning:</strong> No available slots (6/6 advertised)
            </div>` 
            : ''}
          ${newStatus ? 
            `<p class="text-blue-600 mt-2">Available slots: <strong>${stats.availableSlots}/6</strong></p>` 
            : ''}
        </div>
      `,
      icon: newStatus ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus ? '#3b82f6' : '#6b7280',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: `Yes, ${action} it`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        toggleAdvertiseMutation.mutate({ 
          ticketId, 
          advertise: newStatus 
        });
      }
    });
  };

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <FaBus className="inline mr-1 text-blue-500" />;
      case 'train': return <FaTrain className="inline mr-1 text-green-500" />;
      case 'launch': return <FaShip className="inline mr-1 text-purple-500" />;
      case 'plane': return <FaPlane className="inline mr-1 text-red-500" />;
      default: return <FaBus className="inline mr-1 text-gray-500" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTransport = filterTransport === 'all' || 
      ticket.transportType === filterTransport;

    return matchesSearch && matchesTransport;
  });

  if (ticketsLoading || advertisedLoading || statsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <FaSpinner className="animate-spin text-6xl text-primary mb-4" />
        <p className="text-xl text-gray-600">Loading Advertise Tickets...</p>
        <p className="text-gray-500">Fetching data from database</p>
      </div>
    );
  }

  if (ticketsError) {
    return (
      <div className="text-center py-20">
        <div className="alert alert-error max-w-lg mx-auto shadow-lg">
          <FaTimesCircle className="text-3xl" />
          <div>
            <h3 className="font-bold">Failed to Load Tickets!</h3>
            <div className="text-sm">Please check your connection</div>
          </div>
          <button onClick={() => refetchTickets()} className="btn btn-sm btn-outline btn-error">
            <FaSync className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaBullhorn className="text-3xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Advertise Tickets
              </h1>
              <p className="text-gray-600 mt-1">
                Promote tickets on homepage (Max 6 at a time)
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="stat">
              <div className="stat-title text-gray-600">Advertised</div>
              <div className={`stat-value ${stats.isFull ? 'text-red-600' : 'text-blue-600'}`}>
                {stats.totalAdvertised}/6
              </div>
              <div className="stat-desc">
                {stats.isFull ? 'Full - No slots available' : `${stats.availableSlots} slots available`}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-blue-500">
                <FaTicketAlt className="text-2xl" />
              </div>
              <div className="stat-title">Approved Tickets</div>
              <div className="stat-value">{stats.totalApproved}</div>
              <div className="stat-desc">Available for advertising</div>
            </div>
          </div>

          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-green-500">
                <FaBullhorn className="text-2xl" />
              </div>
              <div className="stat-title">Currently Advertised</div>
              <div className="stat-value">{stats.totalAdvertised}</div>
              <div className="stat-desc">Showing on homepage</div>
            </div>
          </div>

          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-purple-500">
                <FaChartBar className="text-2xl" />
              </div>
              <div className="stat-title">Available Slots</div>
              <div className="stat-value">{stats.availableSlots}</div>
              <div className="stat-desc">Out of 6 maximum</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaSearch className="text-gray-500" />
                Search Tickets
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, route, or vendor..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                Filter by Transport
              </span>
            </label>
            <select
              className="select select-bordered w-full"
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
              <span className="label-text">Actions</span>
            </label>
            <button
              onClick={() => {
                refetchTickets();
                refetchAdvertised();
              }}
              className="btn btn-outline gap-2"
            >
              <FaSync />
              Refresh Data
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {filterTransport !== 'all' && (
            <span className="badge badge-info gap-1">
              <FaFilter />
              Transport: {filterTransport}
            </span>
          )}
          {searchTerm && (
            <span className="badge badge-info gap-1">
              <FaSearch />
              Search: "{searchTerm}"
            </span>
          )}
          <span className="badge badge-neutral">
            Showing: {filteredTickets.length} tickets
          </span>
          {stats.isFull && (
            <span className="badge badge-error gap-1">
              <FaExclamationTriangle />
              MAX LIMIT REACHED (6/6)
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaTicketAlt className="text-blue-500" />
                Approved Tickets for Advertising
                <span className="badge badge-primary ml-2">
                  {filteredTickets.length}
                </span>
              </h2>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Tickets Found
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? `No tickets match "${searchTerm}"`
                    : "No approved tickets available for advertising"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="font-bold">Ticket Details</th>
                      <th className="font-bold">Vendor</th>
                      <th className="font-bold">Status</th>
                      <th className="font-bold text-center">Advertise</th>
                      <th className="font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50">
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
                              <div className="font-bold">{ticket.title}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <FaRoute />
                                {ticket.from} → {ticket.to}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                {getTransportIcon(ticket.transportType)}
                                {ticket.transportType}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <FaDollarSign />
                                ${ticket.price} / ticket
                              </div>
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
                              <div className="font-medium">{ticket.vendor?.name}</div>
                              <div className="text-xs text-gray-500">{ticket.vendor?.email}</div>
                            </div>
                          </div>
                        </td>

                        <td>
                          {ticket.isAdvertised ? (
                            <span className="badge badge-success gap-1">
                              <FaBullhorn />
                              Advertised
                              {ticket.advertisedAt && (
                                <div className="text-xs mt-1">
                                  {new Date(ticket.advertisedAt).toLocaleDateString()}
                                </div>
                              )}
                            </span>
                          ) : (
                            <span className="badge badge-ghost">Not Advertised</span>
                          )}
                        </td>

                        <td>
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised, ticket.title)}
                              disabled={toggleAdvertiseMutation.isLoading || (stats.isFull && !ticket.isAdvertised)}
                              className={`btn btn-sm gap-2 ${
                                ticket.isAdvertised
                                  ? 'btn-error'
                                  : stats.isFull
                                  ? 'btn-disabled'
                                  : 'btn-primary'
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
                              className="btn btn-outline btn-xs gap-1"
                              target="_blank"
                            >
                              <FaEye />
                              View
                            </Link>
                            {ticket.isAdvertised && (
                              <div className="text-xs text-green-600 font-semibold">
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

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
            <div className="p-4 border-b bg-green-50">
              <h2 className="text-xl font-bold flex items-center gap-2 text-green-700">
                <FaBullhorn className="text-green-600" />
                Currently Advertised
                <span className="badge badge-success ml-2">
                  {advertisedTickets.length}/6
                </span>
              </h2>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
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
                  <FaBullhorn className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tickets are currently advertised</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Select tickets from the list to advertise
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {advertisedTickets.map((ticket, index) => (
                    <div
                      key={ticket._id}
                      className="p-3 border rounded-lg hover:bg-green-50 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold flex items-center gap-2">
                            <span className="badge badge-success badge-sm">
                              {index + 1}
                            </span>
                            {ticket.title}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {ticket.from} → {ticket.to}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Advertised: {new Date(ticket.advertisedAt || ticket.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleAdvertise(ticket._id, true, ticket.title)}
                          className="btn btn-error btn-xs"
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

              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <FaExclamationTriangle />
                  Instructions
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>Maximum 6 tickets can be advertised</li>
                  <li>Advertised tickets appear on homepage</li>
                  <li>Only approved tickets can be advertised</li>
                  <li>Click toggle to advertise/unadvertise</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FaBullhorn className="text-2xl text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-purple-800 text-lg mb-2">
              Advertising Guide
            </h3>
            <ul className="text-purple-700 space-y-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span>Advertise tickets with high availability and upcoming departure</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span>Regularly update advertised tickets for freshness</span>
              </li>
              <li className="flex items-start gap-2">
                <FaExclamationTriangle className="text-yellow-500 mt-1" />
                <span>Never exceed 6 advertised tickets at once</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span>Prioritize tickets with good ratings and complete information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;