import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../../LoaderPage/LoadingSpinner';
import { FaClock,FaCheckCircle, FaTimesCircle, FaExclamationCircle,FaMoneyBillWave,FaRoute,FaCalendarAlt,FaTicketAlt,FaDollarSign,FaEye} from 'react-icons/fa';

const MyBookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [countdowns, setCountdowns] = useState({});
  const [departureStatus, setDepartureStatus] = useState({});

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-bookings');
      return res.data;
    },
    enabled: !!user?.email,
  });

  // countdown 
  useEffect(() => {
    if (!bookings.length) return;

    const intervals = {};
    
    bookings.forEach(booking => {
      if (booking.status === 'rejected' || booking.status === 'paid') return;
      
      intervals[booking._id] = setInterval(() => {
        const now = new Date().getTime();
        const dep = new Date(booking.departure).getTime();
        const diff = dep - now;
        
        if (diff <= 0) {
          setCountdowns(prev => ({...prev, [booking._id]: "Departed"}));
          setDepartureStatus(prev => ({...prev, [booking._id]: true}));
          clearInterval(intervals[booking._id]);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          let timeStr = "";
          if (days > 0) timeStr += `${days}d `;
          if (hours > 0 || days > 0) timeStr += `${hours}h `;
          timeStr += `${minutes}m ${seconds}s`;
          
          setCountdowns(prev => ({...prev, [booking._id]: timeStr}));
          setDepartureStatus(prev => ({...prev, [booking._id]: false}));
        }
      }, 1000);
    });
    
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [bookings]);

  const handlePayNow = async (booking) => {
    try {
      const isDeparted = departureStatus[booking._id] || new Date(booking.departure) < new Date();
      if (isDeparted) {
        toast.error("Cannot pay for departed ticket");
        return;
      }
      
      if (booking.status !== "accepted") {
        toast.error("Booking not accepted yet");
        return;
      }
      
      if (booking.paymentStatus === "paid" || booking.status === "paid") {
        toast.error("Payment already completed");
        return;
      }

      const paymentInfo = {
        bookingId: booking._id,
        ticketId: booking.ticketId,
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
      toast.error(err.response?.data?.message || "Failed to start payment");
    }
  };


  const renderStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return (
          <span className="badge badge-warning gap-1">
            <FaExclamationCircle /> Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="badge badge-info gap-1">
            <FaCheckCircle /> Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="badge badge-error gap-1">
            <FaTimesCircle /> Rejected
          </span>
        );
      case 'paid':
        return (
          <span className="badge badge-success gap-1">
            <FaMoneyBillWave /> Paid
          </span>
        );
      default:
        return <span className="badge badge-ghost">{status}</span>;
    }
  };

  // action btn
  const renderActionButton = (booking) => {
    const isDeparted = departureStatus[booking._id] || new Date(booking.departure) < new Date();
    
    if (booking.status === 'accepted' && !isDeparted) {
      return (
        <button
          onClick={() => handlePayNow(booking)}
          className="btn btn-primary w-full mt-2 gap-2"
        >
          <FaMoneyBillWave /> Pay Now
        </button>
      );
    }
    
    return null;
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <h3 className="text-xl font-semibold text-red-600 mb-2">Failed to load bookings</h3>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center mt-10">
        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <FaTicketAlt /> My Booked Tickets
        </h3>
        <div className="bg-gray-100 p-8 rounded-lg max-w-md mx-auto">
          <p className="text-gray-600 mb-4">You haven't booked any tickets yet.</p>
          <a href="/all-tickets" className="btn btn-primary gap-2">
            <FaEye /> Browse Tickets
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaTicketAlt /> My Booked Tickets ({bookings.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const isDeparted = departureStatus[booking._id] || new Date(booking.departure) < new Date();
          
          return (
            <div key={booking._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
              <figure className="h-48">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-lg">{booking.title}</h2>
                
                <div className="space-y-3">
              
                  <p className="flex items-center gap-2">
                    <FaRoute className="text-gray-500 flex-shrink-0" />
                    <strong className="min-w-[60px]">Route:</strong>
                    <span>{booking.vendor?.from || booking.from} → {booking.vendor?.to || booking.to}</span>
                  </p>
                  
                  
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500 flex-shrink-0" />
                    <strong className="min-w-[60px]">Departure:</strong>
                    <span>{new Date(booking.departure).toLocaleString()}</span>
                  </p>
                  
             
                  <p className="flex items-center gap-2">
                    <FaTicketAlt className="text-gray-500 flex-shrink-0" />
                    <strong className="min-w-[60px]">Quantity:</strong>
                    <span>{booking.quantity}</span>
                  </p>
                  
           
                  <p className="flex items-center gap-2">
                    <FaDollarSign className="text-gray-500 flex-shrink-0" />
                    <strong className="min-w-[60px]">Total:</strong>
                    <span className="text-green-600 font-semibold">$ {booking.price * booking.quantity}</span>
                  </p>
                  
               
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    {renderStatusBadge(booking.status)}
                  </div>
                  
               
                  {booking.status !== 'rejected' && !isDeparted && countdowns[booking._id] && (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-red-500 flex-shrink-0" />
                      <strong>Countdown:</strong>
                      <span className="text-red-600 font-semibold">{countdowns[booking._id]}</span>
                    </div>
                  )}
                  
                 
                  {isDeparted && booking.status !== 'rejected' && (
                    <p className="text-red-500 font-semibold flex items-center gap-2">
                      <FaClock className="flex-shrink-0" /> Departure time passed
                    </p>
                  )}
                </div>

               
                <div className="card-actions mt-4 space-y-2">
                  {renderActionButton(booking)}
                  
                  
                  <a 
                    href={`/ticket/${booking.ticketId}`}
                    className="btn btn-outline btn-sm w-full gap-2"
                  >
                    <FaEye /> View Details
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookedTickets;
