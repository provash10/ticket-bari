import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { useTheme } from '../../../Contexts/ThemeContext';
import { 
  FaCheckCircle, FaTimesCircle, FaEye, FaSpinner, FaFilter, FaSearch, 
  FaTicketAlt, FaUser, FaCalendarAlt, FaDollarSign, FaBus, 
  FaTrain, FaShip, FaPlane, FaExclamationTriangle, FaInfoCircle, 
  FaSync, FaListAlt, FaClock, FaMapMarkerAlt,
  FaChartLine, FaGift
} from 'react-icons/fa';

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { isDarkMode } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [filterType, setFilterType] = useState('all');

  // fetch tickets - admin
  const { data: ticketsData, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-tickets', filterStatus, filterType, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/admin/all', {
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['admin-tickets']);
      Swal.fire({
        icon: 'success',
        title: `Ticket ${variables.status === 'approved' ? 'Approved' : 'Rejected'}!`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  });

  const handleStatusUpdate = (ticketId, status, ticketTitle) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `You are about to <b>${status}</b> this ticket:<br/>"${ticketTitle}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: status === 'approved' ? '#10b981' : '#ef4444'
    }).then((res) => {
      if (res.isConfirmed) {
        updateStatusMutation.mutate({ ticketId, status });
      }
    });
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'bus': return <FaBus />;
      case 'train': return <FaTrain />;
      case 'launch': return <FaShip />;
      case 'plane': return <FaPlane />;
      default: return <FaBus />;
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50'
      }`}>
        <FaSpinner className="animate-spin text-5xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <button onClick={refetch} className="btn btn-error gap-2">
          <FaSync /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`rounded-2xl shadow-xl ${
        isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white'
      }`}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                <th>Ticket</th>
                <th>Vendor</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket._id}>
                  <td>
                    <FaTicketAlt className="inline mr-2" />
                    {ticket.title}
                  </td>
                  <td>{ticket.vendor?.name}</td>
                  <td>${ticket.price}</td>
                  <td>{ticket.status}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, 'approved', ticket.title)}
                      className="btn btn-success btn-xs"
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, 'rejected', ticket.title)}
                      className="btn btn-error btn-xs"
                    >
                      <FaTimesCircle />
                    </button>
                    <Link to={`/ticket/${ticket._id}`} className="btn btn-outline btn-xs">
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;
