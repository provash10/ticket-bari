import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePayNow = async (booking) => {
    try {
      const paymentInfo = {
        bookingId: booking._id,
        ticketId: booking.ticketId || booking.ticketId, // ticketId থাকলে use করো
        title: booking.title,
        price: booking.price,
        quantity: booking.quantity,
        totalPrice: booking.price * booking.quantity,
        vendor: booking.vendor,
        departure: booking.departure,
        user: {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      window.location.href = data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start payment. Try again.");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading your bookings...</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        My Booked Tickets ({bookings.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={booking.image}
                alt={booking.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{booking.title}</h2>
              <p>
                <strong>Route:</strong> {booking.vendor?.from || booking.from} → {booking.vendor?.to || booking.to}
              </p>
              <p>
                <strong>Departure:</strong> {new Date(booking.departure).toLocaleString()}
              </p>
              <p>
                <strong>Quantity:</strong> {booking.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> $ {booking.price * booking.quantity}
              </p>

              <button
                onClick={() => handlePayNow(booking)}
                className="btn btn-primary w-full mt-2"
              >
                Pay Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookedTickets;
