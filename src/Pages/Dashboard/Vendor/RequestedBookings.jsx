import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const RequestedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['requested-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-bookings/${user?.email}`);
            return res.data;
        }
    });

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            await axiosSecure.patch(`/bookings/status/${bookingId}`, { status });
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Ticket</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.customer?.name || booking.customer?.email}</td>
                            <td>{booking.title}</td>
                            <td>{booking.quantity}</td>
                            <td>${booking.price * booking.quantity}</td>
                            <td>
                                <span className={`badge ${booking.status === 'accepted' ? 'badge-success' : 
                                                booking.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                {booking.status === 'pending' && (
                                    <>
                                        <button 
                                            onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                            className="btn btn-sm btn-success mr-2"
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                            className="btn btn-sm btn-error"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestedBookings;