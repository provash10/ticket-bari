 import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
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
  FaTicketAlt
} from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
            <div className="text-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-2">Loading tickets...</p>
            </div>
        );
    }

    console.log('total:', tickets.length);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaTicketAlt /> My Added Tickets ({tickets.length})
            </h2>
            
            {tickets.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">No tickets added yet.</p>
                    <Link to="/dashboard/add-ticket" className="btn btn-primary gap-2">
                        <FaEdit /> Add Your First Ticket
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket, index) => {
                        console.log(`Rendering ticket ${index + 1}:`, ticket.title, 'Status:', ticket.status);
                        
                        return (
                            <div key={ticket._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
                                <figure className="h-48 relative">
                                    <img 
                                        src={ticket.image} 
                                        alt={ticket.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                    {ticket.status === 'rejected' && (
                                        <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                <FaTimesCircle className="inline mr-2" /> REJECTED
                                            </span>
                                        </div>
                                    )}
                                </figure>
                                
                                <div className="card-body">
                                    <h3 className="card-title">{ticket.title}</h3>
                                    
                                    <div className="space-y-3">
                                        {/* route */}
                                        <p className="flex items-center gap-2">
                                            <FaRoute className="text-gray-500 flex-shrink-0" />
                                            <span className="font-semibold">Route:</span>
                                            <span>{ticket.from} → {ticket.to}</span>
                                        </p>
                                        
                                        {/* transport type */}
                                        <p className="flex items-center gap-2">
                                            {getTransportIcon(ticket.transportType)}
                                            <span className="font-semibold">Type:</span>
                                            <span>{ticket.transportType}</span>
                                        </p>
                                        
                                        {/* price */}
                                        <p className="flex items-center gap-2">
                                            <FaDollarSign className="text-gray-500 flex-shrink-0" />
                                            <span className="font-semibold">Price:</span>
                                            <span>${ticket.price} / ticket</span>
                                        </p>
                                        
                                        {/* available tickets */}
                                        <p className="flex items-center gap-2">
                                            <FaTicketAlt className="text-gray-500 flex-shrink-0" />
                                            <span className="font-semibold">Available:</span>
                                            <span>{ticket.quantity} tickets</span>
                                        </p>
                                        
                                        {/* Departure */}
                                        <p className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-gray-500 flex-shrink-0" />
                                            <span className="font-semibold">Departure:</span>
                                            <span>{new Date(ticket.departure).toLocaleString()}</span>
                                        </p>
                                        
                                        {/* status badge */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="font-semibold">Status:</span>
                                            <span className={`badge ${ticket.status === 'approved' ? 'badge-success' : 
                                                            ticket.status === 'pending' ? 'badge-warning' : 'badge-error'} gap-1`}>
                                                {ticket.status === 'approved' ? <FaCheckCircle /> : 
                                                 ticket.status === 'rejected' ? <FaTimesCircle /> : 
                                                 <span className="loading loading-spinner loading-xs"></span>}
                                                {ticket.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* warning -rejected tickets */}
                                        {ticket.status === 'rejected' && (
                                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                                <p className="text-red-600 text-sm flex items-center gap-1">
                                                    <FaExclamationTriangle /> This ticket was rejected by admin
                                                </p>
                                            </div>
                                        )}

                                        {/* perks */}
                                        {ticket.perks && ticket.perks.length > 0 && (
                                            <div className="mt-2">
                                                <p className="font-semibold mb-1">Perks:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {ticket.perks.map((perk, idx) => (
                                                        <span key={idx} className="badge badge-outline badge-sm">
                                                            {perk}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* action btn */}
                                    <div className="card-actions justify-end mt-4">
                                        {/* update btn */}
                                        <Link 
                                            to={ticket.status === 'rejected' ? '#' : `/dashboard/update-ticket/${ticket._id}`}
                                            className={`btn btn-sm btn-primary gap-1 ${ticket.status === 'rejected' ? 
                                                'btn-disabled opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                            onClick={(e) => {
                                                if (ticket.status === 'rejected') {
                                                    e.preventDefault();
                                                    // console.log(' update rejected ticket:', ticket._id);
                                                }
                                            }}
                                            title={ticket.status === 'rejected' ? 'Cannot update rejected ticket' : 'Update ticket'}
                                        >
                                            <FaEdit /> Update
                                        </Link>
                                        
            
                                        <button 
                                            onClick={() => {
                                                // console.log('Delete clicked for:', ticket.title);
                                                handleDelete(ticket._id, ticket.status, ticket.title);
                                            }}
                                            disabled={ticket.status === 'rejected'}
                                            className={`btn btn-sm btn-error gap-1 ${ticket.status === 'rejected' ? 
                                                'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                                            title={ticket.status === 'rejected' ? 'Cannot delete rejected ticket' : 'Delete ticket'}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyAddedTickets;