import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import VendorBookingsDataRow from "../../../Components/TableRows/VendorBookingsDataRow";

const RequestedBookings = () => {
  const { user } = useAuth();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["requestedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/manage-bookings/${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load bookings. Try again later.
      </p>
    );

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  Ticket Title
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  User
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  Price
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  Quantity
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  Total Price
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-800 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-gray-500">
                    No requested bookings found.
                  </td>
                </tr>
              )}

              {bookings.map((booking) => (
                <VendorBookingsDataRow key={booking._id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
