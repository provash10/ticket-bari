import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

import { auth } from "../../Firebase/firebase.init"; 


const BookModal = ({ 
  ticket, 
  isOpen, 
  closeModal, 
  selectedPerks = [], 
  quantity, 
  totalPrice, 
  queryClient,
  user,
  canBook,
  maxQuantity 
}) => {

  const { _id, title, price, vendor, departure, availableTickets, image, from, to, transportType } = ticket || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantity > availableTickets) {
      toast.error(`Only ${availableTickets} tickets available`);
      return;
    }

    if (!canBook) {
      toast.error("Ticket is not available for booking");
      return;
    }

    const departureTime = new Date(departure);
    const now = new Date();
    if (departureTime < now) {
      toast.error("Departure time has passed");
      return;
    }

    if (maxQuantity && quantity > maxQuantity) {
      toast.error(`Maximum ${maxQuantity} tickets allowed`);
      return;
    }

    setIsLoading(true);

    try {
      // token 
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("Please login again");
        navigate("/auth/login");
        return;
      }

      const token = await currentUser.getIdToken();
      if (!token) {
        toast.error("Unable to get access token");
        return;
      }

      //  booking data prepare
      const bookingData = {
        ticketId: _id,
        title: title,
        image: image,
        price: price,
        quantity: quantity,
        totalPrice: totalPrice,
        vendor: {
          email: vendor?.email || "",
          name: vendor?.name || "",
          from: from,
          to: to,
          transportType: transportType
        },
        departure: departure,
        customer: {
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          uid: user.uid,
        },
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: new Date(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`, 
        bookingData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Booking request submitted successfully!");
        closeModal();

        if (queryClient) {
          queryClient.invalidateQueries(['my-bookings', user.email]);
          queryClient.invalidateQueries(['ticket', _id]);
        }
        
        setTimeout(() => {
          navigate("/dashboard/my-bookings");
        }, 1000);
      } else {
        toast.error(response.data.message || "Booking failed");
      }

    } catch (error) {
      console.error("Booking API error:", error);
      
      if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Validation error");
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/auth/login");
      } else if (error.response?.status === 404) {
        toast.error("Ticket not found");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={closeModal}>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
          <DialogTitle className="text-xl font-bold text-center mb-4">
            Confirm Booking
          </DialogTitle>
          
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{user?.displayName || user?.email?.split('@')[0]}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user?.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Route:</span>
              <span>{from} → {to}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Transport:</span>
              <span>{transportType}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Departure:</span>
              <span>{new Date(departure).toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Price per Ticket:</span>
              <span>$ {price}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Quantity:</span>
              <span>{quantity}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-semibold">Available:</span>
              <span>{availableTickets} tickets</span>
            </div>
            
            {selectedPerks.length > 0 && (
              <div className="flex justify-between">
                <span className="font-semibold">Perks:</span>
                <span className="text-right">{selectedPerks.join(", ")}</span>
              </div>
            )}
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-green-600">$ {totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleBooking} 
              disabled={isLoading || !canBook}
              className="btn btn-success w-full sm:flex-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Processing...
                </span>
              ) : "Confirm Booking"}
            </button>
            
            <button 
              onClick={closeModal}
              disabled={isLoading}
              className="btn btn-error w-full sm:flex-1"
            >
              Cancel
            </button>
          </div>
          
          {!canBook && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">
                 This ticket is not available for booking
              </p>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookModal;
