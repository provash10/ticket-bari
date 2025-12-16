import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const BookModal = ({
  ticket,
  isOpen,
  closeModal,
  selectedPerks = [],
  quantity,
  totalPrice,
  refetch,
}) => {
  const { user } = useAuth();

  const {
    _id,
    title,
    price,
    vendor,
    departure,
  } = ticket || {};

  const handlePayment = async () => {
    if (quantity < 1 || quantity > ticket.availableTickets) {
      toast.error("Invalid booking quantity");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const paymentInfo = {
      ticketId: _id,
      title,
      price,
      quantity,
      totalPrice,
      selectedPerks,
      vendor,
      departure,
      user: {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        image: user.photoURL,
      },
      status: "pending",
    };

    const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    // console.log(data); //url checked
    window.location.href =data.url
  };

  return (
    // <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
    //   <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
    //     <DialogPanel
    //       className="
    //         w-full
    //         max-w-sm
    //         sm:max-w-md
    //         md:max-w-lg
    //         bg-white
    //         p-4 sm:p-6
    //         rounded-2xl
    //         shadow-xl
    //       "
    //     >
    //       <DialogTitle className="text-base sm:text-lg font-bold text-center">
    //         Confirm Booking
    //       </DialogTitle>

    //       <div className="mt-4 space-y-2 text-xs sm:text-sm">
    //         <p><strong>Name:</strong> {user?.name}</p>
    //         <p><strong>Email:</strong> {user?.email}</p>
    //         <p><strong>Route:</strong> {ticket.from} → {ticket.to}</p>
    //         <p><strong>Transport:</strong> {ticket.transportType}</p>
    //         <p><strong>Price per Ticket:</strong> ৳ {ticket.price}</p>
    //         <p><strong>Quantity:</strong> {quantity}</p>

    //         {selectedPerks.length > 0 && (
    //           <p className="break-words">
    //             <strong>Perks:</strong> {selectedPerks.join(", ")}
    //           </p>
    //         )}

    //         <p className="text-base sm:text-lg font-bold text-green-600">
    //           Total Price: ৳ {totalPrice}
    //         </p>
    //       </div>

    //       <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
    //         <button
    //           onClick={handlePayment}
    //           className="btn btn-success w-full sm:w-auto"
    //         >
    //           Pay
    //         </button>
    //         <button
    //           onClick={closeModal}
    //           className="btn btn-error w-full sm:w-auto"
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </DialogPanel>
    //   </div>
    // </Dialog>
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={closeModal}>
  <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
    <DialogPanel className="
        w-full
        max-w-sm
        sm:max-w-md
        md:max-w-lg
        bg-white
        p-4 sm:p-6
        rounded-2xl
        shadow-xl
      ">
      <DialogTitle className="text-base sm:text-lg font-bold text-center">
        Confirm Booking
      </DialogTitle>

      <div className="mt-4 space-y-2 text-xs sm:text-sm">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Route:</strong> {ticket.from} → {ticket.to}</p>
        <p><strong>Transport:</strong> {ticket.transportType}</p>
        <p><strong>Price per Ticket:</strong> ৳ {ticket.price}</p>
        <p><strong>Quantity:</strong> {quantity}</p>

        {selectedPerks.length > 0 && (
          <p className="break-words">
            <strong>Perks:</strong> {selectedPerks.join(", ")}
          </p>
        )}

        <p className="text-base sm:text-lg font-bold text-green-600">
          Total Price: ৳ {totalPrice}
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          onClick={handlePayment}
          className="btn btn-success w-full sm:w-auto"
        >
          Pay
        </button>
        <button
          onClick={closeModal}
          className="btn btn-error w-full sm:w-auto"
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
