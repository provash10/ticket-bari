import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../LoaderPage/LoadingSpinner";
import { Button } from "@headlessui/react";
import BookModal from "../Modal/BookModal";
import Heading from "../Shared/Heading";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";


const TicketDetails = () => {
  const {user} = useAuth();
  const { id } = useParams();
  // console.log(id) //checked
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [quantity, setQuantity] = useState(1);




  const { data: ticket = {}, isLoading, refetch } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tickets/${id}`);
      toast.success("Booking successful!");
      return res.data;
       
    },

  });
  // console.log(ticket)

  const {
    _id, title, image, from, to, transportType,
    perks = [], price, availableTickets, bookingQuantity,
    departure, totalPrice, vendor = {},
  } = ticket || {};

  const calculatedTotalPrice = price * quantity;


  // Countdown timer
  useEffect(() => {
    if (!ticket.departure) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const departure = new Date(ticket.departure).getTime();
      const distance = departure - now;

      if (distance <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket.departure]);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  const departureDate = new Date(ticket.departure);
  const now = new Date();
  const isDeparturePassed = departureDate < now;
  const isSoldOut = ticket.availableTickets === 0;
  const disableBook = isDeparturePassed || isSoldOut;


  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* info */}
        <div className="flex-1 flex  items-center flex-col gap-6">
          <Heading> title={title} subtitle={`Route: ${from} → ${to}`}</Heading>
          <Heading title={title} subtitle={`Route: ${from} - ${to}`} />


          <p><strong>Transport:</strong> {transportType}</p>

           {/* vendor */}
          {vendor.name && (
            <div className="flex justify-between items-center gap-2 mt-2 p-2 border-t border-gray-200">
              {vendor.image && (
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-6 h-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="text-xs">
                <div>Vendor: {vendor.name}</div>
                <div>Email: {vendor.email}</div>
              </div>
            </div>
          )}

          <p><strong>Departure:</strong> {departureDate.toLocaleString()} ({countdown})</p>

          <p><strong>Available Tickets:</strong> {availableTickets}</p>

          <div className="flex flex-wrap gap-2">
            {perks.map((perk, i) => (
              <label key={i} className="badge badge-outline cursor-pointer">
                <input
                  type="checkbox"
                  value={perk}
                  checked={selectedPerks.includes(perk)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPerks([...selectedPerks, perk]);
                    } else {
                      setSelectedPerks(selectedPerks.filter(p => p !== perk));
                    }
                  }}
                  className="mr-1"
                />
                {perk}
              </label>
            ))}
          </div>

          <div className="flex justify-between items-center gap-4">
            <p className="text-2xl font-bold bg-amber-400 px-3 py-2 rounded-full">Price: ৳ {price}</p>

            {/* booking quantity  */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">Quantity:</span>
              <input
                type="number"
                min={1}
                max={availableTickets}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* total price */}
          <p className="text-xl font-bold text-green-600">
            Total Price: ৳ {calculatedTotalPrice}
          </p>


          <Button
            onClick={() => setIsOpen(true)}
            disabled={disableBook}
            className="btn btn-primary mt-2"
          >
            {isSoldOut ? "Sold Out" : "Book Now"}
          </Button>

        </div>
      </div>

      <BookModal
        ticket={ticket}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        selectedPerks={selectedPerks}
        quantity={quantity}
        totalPrice={calculatedTotalPrice}
        refetch={refetch}
        user={user}
      />
    </div>
  );
};

export default TicketDetails;
