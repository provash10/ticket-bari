import React from "react";

const CustomerDataRows = ({ booking }) => {
  if (!booking)
    return (
      <tr>
        <td colSpan="7" className="text-center py-5 text-gray-500">
          No booked tickets found.
        </td>
      </tr>
    );

  const {
    _id,
    title,
    image = "https://via.placeholder.com/150",
    from,
    to,
    transportType,
    price,
    quantity: bookingQuantity = 1,
    totalPrice = price * bookingQuantity,
    status = "Pending",
  } = booking;

  return (
    <tr key={_id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          src={image}
          alt={title}
          className="w-16 h-10 object-cover rounded"
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {title}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {transportType}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ৳ {price}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {bookingQuantity}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        ৳ {totalPrice}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : status === "Accepted"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status === "Accepted" && (
          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            Pay Now
          </button>
        )}
      </td>
    </tr>
  );
};

export default CustomerDataRows;
