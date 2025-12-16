import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const BookModal = ({
  ticket,
  isOpen,
  closeModal,
  selectedPerks = [],
  quantity,
  totalPrice,
}) => {

  const handleBooking = async () => {
    if (quantity < 1 || quantity > ticket.availableTickets) {
      toast.error("Invalid booking quantity");
      return;
    }

    try {
      const bookingData = {
        ticketId: ticket._id,
        title: ticket.title,
        bookingQuantity: quantity,
        totalPrice,
        selectedPerks,
        status: "pending",
        departure: ticket.departure,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData
      );

      toast.success("Booking successful!");
      closeModal();
    } catch (error) {
      toast.error("Booking failed");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl ml-0">
          <DialogTitle className="text-lg font-bold text-center">
            Confirm Booking
          </DialogTitle>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Route:</strong> {ticket.from} → {ticket.to}</p>
            <p><strong>Transport:</strong> {ticket.transportType}</p>
            <p><strong>Price per Ticket:</strong> ৳ {ticket.price}</p>
            <p><strong>Quantity:</strong> {quantity}</p>

            {selectedPerks.length > 0 && (
              <p><strong>Perks:</strong> {selectedPerks.join(", ")}</p>
            )}

            <p className="text-lg font-bold text-green-600">
              Total Price: ৳ {totalPrice}
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBooking}
              className="btn btn-success"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="btn btn-error"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookModal;
