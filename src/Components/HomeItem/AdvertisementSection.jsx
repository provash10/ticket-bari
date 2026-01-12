import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaFire, 
  FaTicketAlt, 
  FaRoute, 
  FaDollarSign, 
  FaSpinner,
  FaBullhorn,
  FaExclamationCircle
} from 'react-icons/fa';
import { Link } from 'react-router';

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();
  
  const { 
    data: advertisedData, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['homepage-advertised-tickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/advertise/current');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  const advertisedTickets = advertisedData?.data || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <FaSpinner className="animate-spin text-5xl text-indigo-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Fetching featured tickets...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-yellow-100 px-6 py-4 rounded-xl shadow">
            <FaExclamationCircle className="text-3xl text-yellow-600" />
            <div>
              <h3 className="font-bold text-yellow-800">Unable to load featured tickets</h3>
              <p className="text-sm text-yellow-700">Try refreshing the page or come back later</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!advertisedTickets.length) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-full shadow">
              <FaBullhorn className="text-3xl text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                Featured Tickets
              </h2>
              <p className="text-gray-600 mt-1">Handpicked promotions for you</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-md">
            <FaTicketAlt className="text-indigo-500" />
            <span className="font-semibold text-gray-700">{advertisedTickets.length} Featured</span>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advertisedTickets.map((ticket, idx) => (
            <div key={ticket._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
              
              {/* Ticket Image */}
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <img 
                  src={ticket.image} 
                  alt={ticket.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Ticket+Image'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <div className="badge badge-primary flex items-center gap-1 px-3 py-2 font-bold">
                    <FaFire className="text-sm" /> Featured #{idx + 1}
                  </div>
                </div>

                {/* Vendor */}
                {ticket.vendor?.name && (
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                    <img 
                      src={ticket.vendor.image || 'https://via.placeholder.com/150'} 
                      alt={ticket.vendor.name} 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700">{ticket.vendor.name}</span>
                  </div>
                )}
              </div>

              {/* Ticket Info */}
              <div className="p-5 flex flex-col justify-between h-[280px]">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 flex items-center gap-2">
                    <FaTicketAlt className="text-indigo-500" /> {ticket.title}
                  </h3>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <FaRoute className="text-green-500" /> 
                      {ticket.from} → {ticket.to}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-baseline gap-1">
                        <FaDollarSign className="text-green-600" />
                        <span className="text-xl font-bold text-primary">${ticket.price}</span>
                        <span className="text-gray-500 text-sm">per person</span>
                      </div>
                      {ticket.availableTickets > 0 ? (
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          ticket.availableTickets <= 5 ? 'bg-red-100 text-red-800' :
                          ticket.availableTickets <= 10 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>{ticket.availableTickets} seats left</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-sm">Sold Out</span>
                      )}
                    </div>

                    {/* {ticket.transportType && (
                      <span className="badge badge-outline">{ticket.transportType}</span>
                    )} */}

{ticket.transportType && (
  <span
    className={`
      px-2 py-1 text-sm font-medium rounded-full
      border border-gray-300 text-gray-700 bg-white/80
      dark:border-gray-500 dark:text-gray-200 dark:bg-gray-700/80
    `}
  >
    {ticket.transportType}
  </span>
)}


                    {ticket.perks?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ticket.perks.slice(0, 3).map((perk, i) => (
                          <span 
                            key={i} 
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              isDarkMode 
                                ? 'bg-blue-600/80 text-blue-100 border border-blue-500' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {perk}
                          </span>
                        ))}
                        {ticket.perks.length > 3 && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            isDarkMode ? 'bg-gray-600 text-gray-100 border border-gray-500' : 'bg-gray-200 text-gray-700 border border-gray-300'
                          }`}>
                            +{ticket.perks.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Book Now Button */}
                <Link
                  to={`/ticket/${ticket._id}`} 
                  className="btn btn-primary w-full mt-4 hover:scale-105 transition-transform flex justify-between items-center"
                >
                  <span className="flex items-center gap-2">
                    <FaTicketAlt /> Book Now
                  </span>
                  <span className="text-sm opacity-90">${ticket.price}</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link 
            to="/all-tickets" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            View All Tickets
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;

