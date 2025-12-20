 import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const BookModal = ({ ticket, isOpen, closeModal, selectedPerks = [], quantity, totalPrice, queryClient }) => {
  const { _id, title, price, vendor, departure, availableTickets, image } = ticket || {};
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (quantity < 1 || quantity > availableTickets) {
      toast.error(`Invalid booking quantity. Available: ${availableTickets}`);
      return;
    }
    
    try {
      const token = await user.getIdToken();
      if (!token) {
        toast.error("Unable to get access token, please login again.");
        return;
      }

      const bookingData = {
        ticketId: _id,
        title: title,
        image: image,
        price: price,
        quantity,
        totalPrice,
        vendor: vendor,
        departure: departure,
        customer: {
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        },
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: new Date(),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Booking request submitted!");
      closeModal();
      navigate("/dashboard/my-bookings");

      if (queryClient) {
        queryClient.invalidateQueries(['my-bookings', user.email]);
      }

    } catch (error) {
      console.error("Booking API error:", error);
      toast.error(error.response?.data?.message || "Booking failed, please try again.");
    }
  };

 
  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
        <DialogPanel className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
          <DialogTitle className="text-lg font-bold text-center">Confirm Booking</DialogTitle>
          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Name:</strong> {user?.displayName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Route:</strong> {vendor?.from || ticket.from} → {vendor?.to || ticket.to}</p>
            <p><strong>Transport Type:</strong> {vendor?.transportType || ticket.transportType}</p>
            <p><strong>Price per Ticket:</strong> $ {price}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p><strong>Available Tickets:</strong> {availableTickets}</p>
            {selectedPerks.length > 0 && <p><strong>Perks:</strong> {selectedPerks.join(", ")}</p>}
            <p className="text-green-600 font-bold">Total Price: $ {totalPrice}</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
            <button onClick={handleBooking} className="btn btn-success w-full sm:w-auto">
              Book Now
            </button>
            {/* <button onClick={handlePayment} className="btn btn-primary w-full sm:w-auto">
              Book & Pay Now
            </button> */}
            <button onClick={closeModal} className="btn btn-error w-full sm:w-auto">
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookModal;
