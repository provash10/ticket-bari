import { Link } from "react-router";

const TicketsCard = ({ ticket }) => {
  // console.log(ticket)
  const {
    _id,
    title,
    image,
    from,
    to,
    transportType,
    perks = [],
    price,
    availableTickets,
    bookingQuantity,
    departure,
    totalPrice,
    vendor= {},
  } = ticket || {};

  return (
    <div className="card bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl transition h-full">

      {/* image */}
      <figure className="h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body space-y-2">

        {/* title */}
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* transport type */}
        <p className="text-sm text-gray-600">
          <strong>Transport:</strong> {transportType}
        </p>

        {/* route */}
        <p className="text-sm text-gray-700">
          <strong>Route:</strong> {from} → {to}
        </p>

        {/* perks */}
        <div className="space-x-1">
          {perks.map((perk, index) => (
            <span
              key={index}
              className="badge badge-outline badge-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* departure */}
        <p className="text-sm text-gray-600">
          <strong>Departure:</strong>{" "}
          {new Date(departure).toLocaleString()}
        </p>

        <div className="flex justify-between items-center">
          {/* available tickets */}
          <p className="text-lg font-normal">
            <strong>Available:</strong> {availableTickets}
          </p>

          {/* price */}
          <p className="text-lg font-bold text-primary">
            ৳ {price}
            <span className="text-sm font-normal text-gray-500">
              {" "} / ticket
            </span>
          </p>
        </div>

        {/* see deatails btn*/}
        <Link
          to={`/ticket/${_id}`}
          className="btn btn-primary btn-sm w-full mt-2"
        >
          See Details
        </Link>
      </div>

      {/* <div className="flex justify-between items-center">
        <h3 className="text-xs">Vendor: {vendor.name}</h3>
        <h3 className="text-xs">Email: {vendor.email}</h3>
      </div> */}
      
      {/* vendor info */}
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
    </div>
  );
};

export default TicketsCard;
