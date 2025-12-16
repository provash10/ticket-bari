
import React from "react";

const MyBookedTickets = () => {
  return (
    // <div className="container mx-auto px-4 sm:px-8 py-8">
    //   <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>
    //   <div className="overflow-x-auto">
    //     <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
    //       <table className="min-w-full divide-y divide-gray-200 bg-white">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             {["Image", "Title", "Route", "Departure", "Quantity", "Total Price", "Status"].map((title) => (
    //               <th
    //                 key={title}
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {title}
    //               </th>
    //             ))}
    //           </tr>
    //         </thead>
    //         <tbody className="divide-y divide-gray-200">
    //           {[1, 2, 3].map((_, idx) => (
    //             <tr key={idx} className="hover:bg-gray-100 transition">
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">Img</div>
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sample Ticket</td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">City A → City B</td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-12-31 10:00 AM</td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2</td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">৳2000</td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
    //                   Pending
    //                 </span>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Ticket</th>
              <th className="py-2 px-4 text-left">From → To</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 flex items-center">
                <img
                  src="https://via.placeholder.com/80x50"
                  className="h-12 w-20 object-cover rounded mr-2"
                  alt="Ticket"
                />
                Dhaka → Chittagong
              </td>
              <td className="py-2 px-4">Dhaka → Chittagong</td>
              <td className="py-2 px-4">2025-12-20, 10:00 AM</td>
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">$40</td>
              <td className="py-2 px-4 text-blue-600 font-semibold">Pending</td>
              <td className="py-2 px-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Pay Now
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-2 px-4 flex items-center">
                <img
                  src="https://via.placeholder.com/80x50"
                  className="h-12 w-20 object-cover rounded mr-2"
                  alt="Ticket"
                />
                Sylhet → Dhaka
              </td>
              <td className="py-2 px-4">Sylhet → Dhaka</td>
              <td className="py-2 px-4">2025-12-22, 03:00 PM</td>
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">$20</td>
              <td className="py-2 px-4 text-green-600 font-semibold">Paid</td>
              <td className="py-2 px-4">
                <button className="bg-gray-300 text-white px-3 py-1 rounded cursor-not-allowed" disabled>
                  Pay Now
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-2 px-4 flex items-center">
                <img
                  src="https://via.placeholder.com/80x50"
                  className="h-12 w-20 object-cover rounded mr-2"
                  alt="Ticket"
                />
                Chittagong → Cox's Bazar
              </td>
              <td className="py-2 px-4">Chittagong → Cox's Bazar</td>
              <td className="py-2 px-4">2025-12-25, 09:00 AM</td>
              <td className="py-2 px-4">3</td>
              <td className="py-2 px-4">$60</td>
              <td className="py-2 px-4 text-red-600 font-semibold">Rejected</td>
              <td className="py-2 px-4">
                <button className="bg-gray-300 text-white px-3 py-1 rounded cursor-not-allowed" disabled>
                  Pay Now
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookedTickets;
