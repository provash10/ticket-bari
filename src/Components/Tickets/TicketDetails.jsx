import React from "react";

const TicketDetails = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        Home / All Tickets /{" "}
        <span className="font-semibold text-gray-700">
          Dhaka → Cox&apos;s Bazar
        </span>
      </nav>

      {/* main section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* image */}
        <div className="rounded-xl overflow-hidden shadow-lg border">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Ticket"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between border p-6 rounded-xl">
          <div className="space-y-3">

            {/* Ticket title */}
            <h2 className="text-3xl font-bold">
              Dhaka → Cox&apos;s Bazar Luxury Bus
            </h2>

            {/* transport type & perks */}
            <p className="text-gray-600">Bus • AC • Breakfast included</p>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <span className="badge badge-primary">Bus</span>
              <span className="badge badge-secondary">AC</span>
              <span className="badge badge-success">Breakfast</span>
            </div>

            {/* route */}
            <p><strong>From:</strong> Dhaka</p>
            <p><strong>To:</strong> Cox&apos;s Bazar</p>

            {/* Departure */}
            <p><strong>Departure:</strong> 20 Dec 2025, 08:00 AM</p>

            {/* Available Tickets */}
            <p><strong>Available Tickets:</strong> 30</p>

            {/* Booking Quantity */}
            <p><strong>Booking Quantity:</strong> 2</p>

            {/* Unit Price */}
            <p><strong>Unit Price:</strong> ৳1200</p>

            {/* Total Price */}
            <p className="text-xl font-bold text-primary">
              Total: ৳2400
            </p>

            {/* Status */}
            <span className="badge badge-warning w-fit">Pending</span>
          

            {/* Countdown */}
            <p className="text-sm text-gray-500 mt-1">
              Departure in: 2d 5h 30m
            </p>

          </div>

          {/* Action Button */}
          <button className="btn btn-primary btn-lg mt-6">
            Book Now
          </button>
        </div>
      </div>

      {/* Perks Section */}
      <div className="mt-14 border p-6 rounded-xl">
        <h3 className="text-2xl font-semibold mb-4">Ticket Perks</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>AC Bus Service</li>
          <li>Free Breakfast</li>
          <li>WiFi on board</li>
          <li>Comfortable Seats</li>
        </ul>
      </div>

    </div>
  );
};

export default TicketDetails;
