import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import LoadingSpinner from "../../LoaderPage/LoadingSpinner";
import { Button } from "@headlessui/react";
import BookModal from "../Modal/BookModal";
import Heading from "../Shared/Heading";
import useAuth from "../../Hooks/useAuth";

const TicketDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { data: ticket = {}, isLoading, isError } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tickets/${id}`);
      return res.data;
    },
  });

  if (isError) return <div className="text-red-500 text-center mt-8">Error loading ticket details</div>;

  const {
    title,
    image,
    from,
    to,
    transportType,
    perks = [],
    price,
    availableTickets,
    departure,
    vendor = {},
  } = ticket || {};

  const totalPrice = price * quantity;

  useEffect(() => {
    if (!departure) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dep = new Date(departure).getTime();
      const diff = dep - now;
      if (diff <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [departure]);

  if (isLoading) return <LoadingSpinner />;

  const isExpired = ticket?.isDeparted || new Date(departure) < new Date();
  const isSoldOut = !ticket?.isAvailable || availableTickets === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl hover:scale-105 transform transition duration-300">
          <img src={image} alt={title} className="w-full h-80 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white font-semibold text-lg">{title}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border p-8 space-y-6">
          <Heading title={title} subtitle={`Route: ${from} → ${to}`} />

          {/* Ticket Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p className="font-medium"><span className="text-gray-600 dark:text-gray-400">Transport:</span> {transportType}</p>
            <p className="font-medium"><span className="text-gray-600 dark:text-gray-400">Departure:</span> {new Date(departure).toLocaleString()}</p>
            <p className="font-medium"><span className="text-gray-600 dark:text-gray-400">Available:</span> {availableTickets}</p>
            <p className={`font-semibold ${countdown === "Departed" ? "text-red-600" : "text-green-500"} animate-pulse`}>
              Countdown: {countdown}
            </p>
          </div>

          {/* Vendor Info */}
          {vendor?.name && (
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                <img src={vendor.photoURL || "/default-avatar.png"} alt={vendor.name} className="w-full h-full object-cover"/>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{vendor.name}</p>
                <p className="text-gray-500 dark:text-gray-400">{vendor.email}</p>
              </div>
            </div>
          )}

          {/* Perks */}
          <div>
            <p className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Perks</p>
            <div className="flex flex-wrap gap-2">
              {perks.map((perk, i) => (
                <label key={i} className="badge badge-outline cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200 px-3 py-1 rounded-full">
                  <input
                    type="checkbox"
                    className="mr-1 accent-primary"
                    checked={selectedPerks.includes(perk)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedPerks([...selectedPerks, perk]);
                      else setSelectedPerks(selectedPerks.filter(p => p !== perk));
                    }}
                  />
                  {perk}
                </label>
              ))}
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Quantity</span>
              <input
                type="number"
                min={1}
                max={ticket?.canBook ? availableTickets : 0}
                value={quantity}
                className="w-16 border rounded-md px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= availableTickets && val >= 1) setQuantity(val);
                }}
              />
            </div>

            <p className="text-xl font-bold text-primary dark:text-primary-light">$ {price} / ticket</p>
          </div>

          <p className="text-lg font-bold text-green-600 dark:text-green-400">Total: $ {totalPrice}</p>

          {/* Book Button */}
          <Button
            onClick={() => setIsOpen(true)}
            disabled={!ticket?.canBook || isExpired || isSoldOut}
            className={`w-full py-3 rounded-2xl font-semibold text-white transition-transform duration-200 ${
              !ticket?.canBook || isExpired || isSoldOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-secondary hover:scale-105"
            }`}
          >
            {!ticket?.canBook ? "Not Available" :
              isSoldOut ? "Sold Out" :
                isExpired ? "Departed" : "Book Now"}
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookModal
        ticket={ticket}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        selectedPerks={selectedPerks}
        quantity={quantity}
        totalPrice={totalPrice}
        queryClient={queryClient}
        user={user}
        canBook={ticket?.canBook}
        maxQuantity={ticket?.availableTickets || 0}
      />
    </div>
  );
};

export default TicketDetails;

