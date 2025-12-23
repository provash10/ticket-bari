import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEye, 
  FaSpinner,
  FaFilter,
  FaSearch,
  FaTicketAlt,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaRoute,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSync,
  FaListAlt
} from 'react-icons/fa';

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [filterType, setFilterType] = useState('all');

  // fetch tickets -admin
  const { 
    data: ticketsData, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery({
    queryKey: ['admin-tickets', filterStatus, filterType, searchTerm],
    queryFn: async () => {
      // const res = await axiosSecure.get('/tickets/admin/pending');
      const res = await axiosSecure.get('/tickets/admin/all',{
        params: {
        status: filterStatus,
        transportType: filterType,
        search: searchTerm
      }
      });
      
      return res.data;
    }
  });

  const tickets = ticketsData?.data || [];

  const updateStatusMutation = useMutation({
    mutationFn: async ({ ticketId, status }) => {
      const res = await axiosSecure.patch(`/tickets/${ticketId}/status`, { status });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['admin-tickets']);
      Swal.fire({
        icon: 'success',
        title: `Ticket ${variables.status === 'approved' ? 'Approved' : 'Rejected'}!`,
        text: `Ticket has been ${variables.status} successfully`,
        showConfirmButton: false,
        timer: 2000
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: error.response?.data?.message || 'Something went wrong'
      });
    }
  });

  const handleStatusUpdate = (ticketId, status, ticketTitle) => {
    Swal.fire({
      title: `Are you sure?`,
      html: `You are about to <strong>${status}</strong> the ticket:<br><strong>"${ticketTitle}"</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${status} it!`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ ticketId, status });
      }
    });
  };

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <FaBus className="inline mr-1 text-blue-600" />;
      case 'train': return <FaTrain className="inline mr-1 text-green-600" />;
      case 'launch': return <FaShip className="inline mr-1 text-purple-600" />;
      case 'plane': return <FaPlane className="inline mr-1 text-red-600" />;
      default: return <FaBus className="inline mr-1 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return (
          <span className="badge badge-warning gap-1">
            <FaExclamationTriangle className="text-yellow-600" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="badge badge-success gap-1">
            <FaCheckCircle className="text-green-600" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="badge badge-error gap-1">
            <FaTimesCircle className="text-red-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="badge badge-ghost gap-1">
            <FaInfoCircle />
            {status}
          </span>
        );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <FaSpinner className="animate-spin text-6xl text-primary mb-4" />
        <p className="text-xl text-gray-600">Loading Tickets...</p>
        <p className="text-gray-500">Please wait while we fetch the data</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-20">
        <div className="alert alert-error max-w-lg mx-auto shadow-lg">
          <FaTimesCircle className="text-3xl" />
          <div>
            <h3 className="font-bold">Failed to Load Tickets!</h3>
            <div className="text-sm">Please check your connection and try again</div>
          </div>
          <button 
            onClick={() => refetch()} 
            className="btn btn-sm btn-outline btn-error"
          >
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
            <div className="p-3 bg-primary/10 rounded-full">
              <FaListAlt className="text-3xl text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Ticket Management
              </h1>
              <p className="text-gray-600 mt-1">
                Review and approve vendor-submitted tickets
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="stat">
              <div className="stat-title text-gray-600">Total Pending</div>
              <div className="stat-value text-primary">{tickets.length}</div>
              <div className="stat-desc">Tickets awaiting review</div>
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
                placeholder="Search by title, vendor, or route..."
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
                Filter by Status
              </span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved Tickets</option>
              <option value="rejected">Rejected Tickets</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Transport Type</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transport Types</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
              <option value="Plane">Plane</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {filterStatus !== 'pending' && (
            <span className="badge badge-info gap-1">
              <FaFilter />
              Status: {filterStatus}
            </span>
          )}
          {filterType !== 'all' && (
            <span className="badge badge-info gap-1">
              {getTransportIcon(filterType)}
              Type: {filterType}
            </span>
          )}
          {searchTerm && (
            <span className="badge badge-info gap-1">
              <FaSearch />
              Search: "{searchTerm}"
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {filterStatus === 'pending' 
                ? "There are no pending tickets for review at the moment." 
                : "No tickets match your current filters. Try adjusting your search criteria."}
            </p>
            <button 
              onClick={() => {
                setFilterStatus('pending');
                setFilterType('all');
                setSearchTerm('');
              }}
              className="btn btn-primary gap-2"
            >
              <FaSync />
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaTicketAlt />
                        Ticket Details
                      </div>
                    </th>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaUser />
                        Vendor Info
                      </div>
                    </th>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaDollarSign />
                        Pricing
                      </div>
                    </th>
                    <th className="font-bold text-gray-700">
                      Status
                    </th>
                    <th className="font-bold text-gray-700 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets
                    .filter(ticket => {
                      if (searchTerm) {
                        const searchLower = searchTerm.toLowerCase();
                        return (
                          ticket.title?.toLowerCase().includes(searchLower) ||
                          ticket.from?.toLowerCase().includes(searchLower) ||
                          ticket.to?.toLowerCase().includes(searchLower) ||
                          ticket.vendor?.name?.toLowerCase().includes(searchLower) ||
                          ticket.vendor?.email?.toLowerCase().includes(searchLower)
                        );
                      }
                      return true;
                    })
                    .filter(ticket => {
                      if (filterStatus !== 'pending') {
                        return ticket.status === filterStatus;
                      }
                      return true;
                    })
                    .filter(ticket => {
                      if (filterType !== 'all') {
                        return ticket.transportType === filterType;
                      }
                      return true;
                    })
                    .map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                        <td>
                          <div className="flex items-start space-x-4">
                            <div className="avatar">
                              <div className="mask mask-squircle w-20 h-20">
                                <img 
                                  src={ticket.image} 
                                  alt={ticket.title}
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/150";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{ticket.title}</h3>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FaRoute className="text-blue-500" />
                                  <span className="font-medium">{ticket.from}</span>
                                  <span className="text-gray-400">→</span>
                                  <span className="font-medium">{ticket.to}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  {getTransportIcon(ticket.transportType)}
                                  <span>{ticket.transportType}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <FaCalendarAlt className="text-purple-500" />
                                  <span>{new Date(ticket.departure).toLocaleString()}</span>
                                </div>
                                {ticket.perks && ticket.perks.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {ticket.perks.map((perk, idx) => (
                                      <span 
                                        key={idx} 
                                        className="badge badge-outline badge-sm"
                                      >
                                        {perk}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                <img 
                                  src={ticket.vendor?.image || "https://via.placeholder.com/150"} 
                                  alt={ticket.vendor?.name}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold">{ticket.vendor?.name}</div>
                              <div className="text-sm text-gray-500">{ticket.vendor?.email}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                <FaCalendarAlt className="inline mr-1" />
                                Added: {new Date(ticket.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FaDollarSign className="text-green-600" />
                              <span className="text-2xl font-bold">${ticket.price}</span>
                              <span className="text-gray-500">per ticket</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-50 p-2 rounded">
                                <div className="text-xs text-gray-500">Total</div>
                                <div className="font-semibold">{ticket.quantity}</div>
                              </div>
                              <div className="bg-gray-50 p-2 rounded">
                                <div className="text-xs text-gray-500">Available</div>
                                <div className="font-semibold">{ticket.availableTickets || 0}</div>
                              </div>
                            </div>
                            <div className="text-lg font-bold text-primary">
                              Total: ${(ticket.price * ticket.quantity).toFixed(2)}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="flex flex-col gap-2">
                            {getStatusBadge(ticket.status)}
                            {ticket.updatedAt && (
                              <div className="text-xs text-gray-500">
                                Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className="flex flex-col gap-2">
                            {ticket.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(ticket._id, 'approved', ticket.title)}
                                  className="btn btn-success btn-sm gap-2"
                                  disabled={updateStatusMutation.isLoading}
                                >
                                  {updateStatusMutation.isLoading ? (
                                    <FaSpinner className="animate-spin" />
                                  ) : (
                                    <FaCheckCircle />
                                  )}
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(ticket._id, 'rejected', ticket.title)}
                                  className="btn btn-error btn-sm gap-2"
                                  disabled={updateStatusMutation.isLoading}
                                >
                                  {updateStatusMutation.isLoading ? (
                                    <FaSpinner className="animate-spin" />
                                  ) : (
                                    <FaTimesCircle />
                                  )}
                                  Reject
                                </button>
                              </>
                            )}
                            <Link
                              to={`/ticket/${ticket._id}`}
                              className="btn btn-outline btn-sm gap-2"
                              target="_blank"
                            >
                              <FaEye />
                              View Details
                            </Link>

                            {ticket.status === 'approved' && (
                              <button
                                onClick={() => handleStatusUpdate(ticket._id, 'rejected', ticket.title)}
                                className="btn btn-warning btn-sm gap-2"
                              >
                                <FaTimesCircle />
                                Mark as Rejected
                              </button>
                            )}

                            {ticket.status === 'rejected' && (
                              <button
                                onClick={() => handleStatusUpdate(ticket._id, 'approved', ticket.title)}
                                className="btn btn-success btn-sm gap-2"
                              >
                                <FaCheckCircle />
                                Mark as Approved
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-600 mb-2 md:mb-0">
                  Showing <span className="font-bold">{tickets.length}</span> tickets
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-warning">
                      {tickets.filter(t => t.status === 'pending').length}
                    </span>
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-success">
                      {tickets.filter(t => t.status === 'approved').length}
                    </span>
                    <span className="text-sm">Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-error">
                      {tickets.filter(t => t.status === 'rejected').length}
                    </span>
                    <span className="text-sm">Rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaInfoCircle className="text-2xl text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-800 text-lg mb-2">Admin Guide</h3>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span><strong>Approve</strong> tickets that have complete and accurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <FaTimesCircle className="text-red-500 mt-1" />
                <span><strong>Reject</strong> tickets with missing information or inappropriate content</span>
              </li>
              <li className="flex items-start gap-2">
                <FaEye className="text-purple-500 mt-1" />
                <span>Always <strong>view details</strong> before making a decision</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCalendarAlt className="text-orange-500 mt-1" />
                <span>Check departure dates and availability before approval</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;