import React, { useEffect, useState,} from "react";
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

if (isError) return <div>Error loading ticket details</div>;

  const { title, image, from, to, transportType, perks = [], price, availableTickets, departure, vendor = {} } = ticket || {};
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
const canBook = ticket?.canBook && !isExpired && !isSoldOut;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <img src={image} alt={title} className="w-full h-72 object-cover" />
        </div>

        <div className="bg-white rounded-2xl shadow border p-6 space-y-4">
          <Heading title={title} subtitle={`Route: ${from} → ${to}`} />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Transport:</strong> {transportType}</p>
            <p><strong>Departure:</strong> {new Date(departure).toLocaleString()}</p>
            <p><strong>Available:</strong> {availableTickets}</p>
            <p className="text-red-600 font-semibold">Countdown: {countdown}</p>
          </div>

          {vendor?.name && (
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="text-sm">
                <p className="font-semibold">{vendor.name}</p>
                <p className="text-gray-500">{vendor.email}</p>
              </div>
            </div>
          )}

          <div>
            <p className="font-semibold mb-2">Perks</p>
            <div className="flex flex-wrap gap-2">
              {perks.map((perk, i) => (
                <label key={i} className="badge badge-outline cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-1"
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

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Quantity</span>
              <input
  type="number"
  min={1}
  max={ticket?.canBook ? availableTickets : 0}
  value={quantity}
  onChange={(e) => {
    const val = Number(e.target.value);
    if (val <= availableTickets && val >= 1) {
      setQuantity(val);
    }
  }}
/>
            </div>

            <p className="text-xl font-bold text-primary">$ {price} / ticket</p>
          </div>

          <p className="text-lg font-bold text-green-600">Total: $ {totalPrice}</p>

          <Button
  onClick={() => setIsOpen(true)}
  disabled={!ticket?.canBook || isExpired || isSoldOut}
  className="btn btn-primary w-full"
>
  {!ticket?.canBook ? "Not Available" : 
   isSoldOut ? "Sold Out" : 
   isExpired ? "Departed" : "Book Now"}
</Button>
        </div>
      </div>

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
