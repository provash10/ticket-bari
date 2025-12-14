import { Link } from "react-router";

const TicketsCard = () => {
  return (
    <div className="card bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl transition h-full">

      {/* image */}
      <figure className="h-48 overflow-hidden rounded-t-xl">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Ticket"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* card body */}
      <div className="card-body space-y-2">

        {/* ticket title */}
        <h3 className="text-lg font-semibold">
          Dhaka → Cox&apos;s Bazar Luxury Bus
        </h3>

        {/* route/path */}
        <p className="text-sm text-gray-700">
          <strong>Route:</strong> Dhaka → Cox&apos;s Bazar
        </p>

        {/* transport */}
        <p className="text-sm text-gray-600">
          <strong>Transport:</strong> Bus
        </p>

        {/* perks */}
        <p className="text-sm text-gray-600">
          <strong>Perks:</strong> AC, Breakfast
        </p>

        {/* departure */}
        <p className="text-sm text-gray-600">
          <strong>Departure:</strong> 20 Dec 2025, 08:00 AM
        </p>

        {/* Available Tickets */}
        <p className="text-sm">
          <strong>Available Tickets:</strong> 30
        </p>

        {/* booking quantity */}
        <p className="text-sm">
          <strong>Booking Quantity:</strong> 2
        </p>

        {/* unit price */}
        <p className="text-sm">
          <strong>Unit Price:</strong> ৳1200
        </p>

        {/* total price */}
        <p className="text-xl font-bold text-primary">
          Total: ৳2400
        </p>

        {/* status */}
        <span className="badge badge-warning w-fit">Pending</span>
        {/* Variations: badge-success = paid, badge-error = rejected, badge-info = accepted */}

        {/* countdown */}
        <p className="text-sm text-gray-500 mt-1">
          Departure in: 2d 5h 30m
        </p>

        {/* action btn */}
        <Link
          to="/ticket/1"
          className="btn btn-primary btn-sm w-full mt-2"
        >
          See Details
        </Link>

      </div>
    </div>
  );
};

export default TicketsCard;
