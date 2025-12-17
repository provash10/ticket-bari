import React from "react";

const MyBookedTickets = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Ticket"
            className="w-full h-40 object-cover border"
          />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">Dhaka → Cox’s Bazar</h3>

            <p className="text-sm text-gray-600">
              From <span className="font-medium">Dhaka</span> →{" "}
              <span className="font-medium">Cox’s Bazar</span>
            </p>

            <p className="text-sm">
              Departure: <span className="font-medium">25 Dec 2025, 10:00 AM</span>
            </p>

            <p className="text-sm">
              Booking Quantity: <span className="font-medium">2</span>
            </p>

            <p className="text-sm">
              Total Price: <span className="font-semibold">৳ 6,000</span>
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                Pending
              </span>

              <span className="text-sm text-gray-500">
                 3d 5h 20m left
              </span>
            </div>
          </div>
        </div>

        {/* accepted */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Ticket"
            className="w-full h-40 object-cover"
          />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">Dhaka → Sylhet</h3>

            <p className="text-sm text-gray-600">
              From <span className="font-medium">Dhaka</span> →{" "}
              <span className="font-medium">Sylhet</span>
            </p>

            <p className="text-sm">
              Departure: <span className="font-medium">30 Dec 2025, 8:30 AM</span>
            </p>

            <p className="text-sm">
              Booking Quantity: <span className="font-medium">1</span>
            </p>

            <p className="text-sm">
              Total Price: <span className="font-semibold">৳ 2,500</span>
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                Accepted
              </span>

              <span className="text-sm text-gray-500">
                 5d 2h left
              </span>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Pay Now
            </button>
          </div>
        </div>

        {/* rejected */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Ticket"
            className="w-full h-40 object-cover"
          />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">Chattogram → Dhaka</h3>

            <p className="text-sm text-gray-600">
              From <span className="font-medium">Chattogram</span> →{" "}
              <span className="font-medium">Dhaka</span>
            </p>

            <p className="text-sm">
              Departure: <span className="font-medium">20 Dec 2025, 6:00 PM</span>
            </p>

            <p className="text-sm">
              Booking Quantity: <span className="font-medium">3</span>
            </p>

            <p className="text-sm">
              Total Price: <span className="font-semibold">৳ 7,500</span>
            </p>

            <div className="mt-3">
              <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                Rejected
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyBookedTickets;
