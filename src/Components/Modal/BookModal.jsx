import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import { auth } from "../../Firebase/firebase.init";
import { useTheme } from "../../Contexts/ThemeContext";
import { 
  FaTicketAlt, 
  FaUser, 
  FaEnvelope, 
  FaBus, 
  FaDollarSign, 
  FaHashtag, 
  FaCheck, 
  FaTimes, 
  FaSpinner,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
  FaUserShield
} from "react-icons/fa"; 


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
  const { isDarkMode } = useTheme(); 

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
      {/* Backdrop */}
      <div className={`fixed inset-0 transition-all duration-300 ${
        isDarkMode ? 'bg-black/60' : 'bg-black/40'
      } backdrop-blur-sm`} />
      
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className={`w-full max-w-2xl max-h-[90vh] transform transition-all duration-300 scale-100 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700 shadow-2xl shadow-blue-500/20' 
            : 'bg-white border border-gray-200 shadow-2xl shadow-blue-500/10'
        } rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col`}>
          
          {/* Header Section - Fixed */}
          <div className={`relative px-6 py-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}>
            <div className="absolute inset-0 bg-black/10"></div>
            
            <div className="relative flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <FaTicketAlt className="text-xl text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white mb-1">
                  Confirm Booking
                </DialogTitle>
                <p className="text-white/80 text-xs">
                  Review details before confirming
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Ticket Preview Card - Compact */}
            <div className={`p-3 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-700/30 border-gray-600' 
                : 'bg-blue-50/50 border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                {image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={image} 
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className={`font-bold text-base ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className={`text-xs ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <span className={`text-xs font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {from} → {to}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Combined Customer & Booking Info */}
            <div className={`p-3 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-700/30 border-gray-600' 
                : 'bg-gray-50/50 border-gray-200'
            }`}>
              <h4 className={`font-bold text-sm mb-3 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <FaUser className={`text-xs ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                Booking Information
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Customer
                  </p>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {user?.displayName || user?.email?.split('@')[0]}
                  </p>
                </div>

                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Transport
                  </p>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {transportType}
                  </p>
                </div>

                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Departure
                  </p>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {new Date(departure).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Quantity
                  </p>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {quantity} ticket{quantity > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-300/20">
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Available: {availableTickets} tickets
                  </span>
                  {availableTickets < 10 && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                      Limited
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Perks Section - Compact */}
            {selectedPerks.length > 0 && (
              <div className={`p-3 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-700/30 border-gray-600' 
                  : 'bg-green-50/50 border-green-200'
              }`}>
                <h4 className={`font-bold text-sm mb-2 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  <FaStar className={`text-xs ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  Perks Included
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedPerks.map((perk, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDarkMode 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Total Price Section - Compact */}
            <div className={`p-4 rounded-xl border-2 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Total Amount
                  </p>
                  <p className={`text-2xl font-bold ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    ৳ {totalPrice}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-green-500/10' : 'bg-green-50'
                }`}>
                  <FaDollarSign className={`text-xl ${
                    isDarkMode ? 'text-green-400' : 'text-green-500'
                  }`} />
                </div>
              </div>
            </div>

            {/* Warning Message - Compact */}
            {!canBook && (
              <div className={`p-3 rounded-xl border-2 ${
                isDarkMode 
                  ? 'bg-red-600/20 border-red-500/30' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className={`text-sm ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`} />
                  <div>
                    <p className={`font-bold text-sm ${
                      isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      Booking Not Available
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className={`px-4 py-3 border-t ${
            isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
          }`}>
            <div className="flex gap-3">
              <button 
                onClick={handleBooking} 
                disabled={isLoading || !canBook}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg text-sm ${
                  canBook && !isLoading
                    ? isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/25' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/25'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-xs" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCheck className="text-xs" />
                    Confirm Booking
                  </>
                )}
              </button>
              
              <button 
                onClick={closeModal}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold border-2 transition-all duration-300 hover:scale-105 text-sm ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <FaTimes className="text-xs" />
                Cancel
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookModal;
