 import React from "react";
import { Link } from "react-router";

const TicketsCard = ({ ticket }) => {
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
    departure,
    vendor = {},
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
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-600">
          <strong>Transport:</strong> {transportType}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Route:</strong> {from} → {to}
        </p>

        <div className="flex flex-wrap gap-1">
          {perks.map((perk, index) => (
            <span
              key={index}
              className="badge badge-outline badge-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600">
          <strong>Departure:</strong>{" "}
          {new Date(departure).toLocaleString()}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-sm">
            <strong>Available:</strong> {availableTickets}
          </p>

          <p className="text-lg font-bold text-primary">
            $ {price}
            <span className="text-sm font-normal text-gray-500">
              {" "} / ticket
            </span>
          </p>
        </div>

        <Link
          to={`/ticket/${_id}`}
          className="btn btn-primary btn-sm w-full mt-2"
        >
          See Details
        </Link>
      </div>

      {/* Vvendor */}
      {vendor?.name && (
        <div className="flex items-center gap-2 p-3 border-t border-gray-200">
          {/* {vendor.image && (
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-8 h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          )} */}
          <div className="text-xs text-gray-600">
            <p><strong>Vendor:</strong> {vendor.name}</p>
            <p>{vendor.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsCard;
