import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

const VendorBookingsDataRow = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const {
    title,
    price = 0,
    quantity = 1,
    totalPrice = price * quantity,
    user = "N/A",
  } = booking || {};

  return (
    <tr className="border-b border-gray-200 bg-white">
      {/* Ticket title */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">{title}</p>
      </td>

      {/* user or customer Name / email */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">{user}</p>
      </td>

      {/* price */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">৳ {price}</p>
      </td>

      {/* booking quantity */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">{quantity}</p>
      </td>

      {/* total */}
      <td className="px-5 py-5 text-sm">
        <p className="text-gray-900">৳ {totalPrice}</p>
      </td>

      {/* action btn */}
      <td className="px-5 py-5 text-sm">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
            Accept
          </button>
          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
            Reject
          </button>
        </div>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  );
};

export default VendorBookingsDataRow;
