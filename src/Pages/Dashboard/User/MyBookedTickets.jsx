// import useAuth from "../../../Hooks/useAuth";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const MyBookedTickets = () => {
//   const { user } = useAuth();

//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ["myBookings", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `http://localhost:5000/bookings/${user.email}`
//       );
//       return res.data;
//     }
//   });

//   if (isLoading) return <span className="loading loading-spinner" />;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {bookings.map(ticket => (
//         <div key={ticket._id} className="card bg-base-100 shadow">
//           <figure>
//             <img src={ticket.image} alt="" />
//           </figure>
//           <div className="card-body">
//             <h2 className="font-bold">{ticket.ticketTitle}</h2>
//             <p>{ticket.from} → {ticket.to}</p>
//             <p>Qty: {ticket.bookingQuantity}</p>
//             <p>
//               Total: ৳{ticket.bookingQuantity * ticket.unitPrice}
//             </p>

//             <span className={`badge ${
//               ticket.status === "pending" && "badge-warning"
//             }`}>
//               {ticket.status}
//             </span>

//             {ticket.status === "accepted" && (
//               <button className="btn btn-primary btn-sm">
//                 Pay Now
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyBookedTickets;

import React from 'react';

const MyBookedTickets = () => {
  return (
    <div>
      <h3>MyBookedTickets</h3>
    </div>
  );
};

export default MyBookedTickets;
