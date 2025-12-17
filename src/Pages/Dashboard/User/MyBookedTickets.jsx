import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import CustomerDataRows from "../../../Components/TableRows/CustomerDataRows";

const MyBookedTickets = () => {
  const { user } = useAuth();
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-bookings/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load tickets. Try again later.
      </p>
    );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Image
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Name
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Transport
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Price
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Quantity
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Total Price
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Status
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* <CustomerDataRows bookings={bookings} /> */}
              {
                bookings.map(booking => <CustomerDataRows key={booking._id} booking={booking}></CustomerDataRows>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookedTickets;
