import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { 
  FaFire, 
  FaTicketAlt, 
  FaRoute, 
  FaDollarSign, 
  FaSpinner,
  FaBullhorn,
  FaExclamationCircle
} from 'react-icons/fa';

const AdvertisementSection = () => {
  const axiosSecure = useAxiosSecure();
  
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
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
            <p className="text-gray-600">Loading featured tickets...</p>
            <p className="text-sm text-gray-500 mt-1">Please wait while we fetch promotions</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error('Advertisement fetch error:', error);
    return (
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="alert alert-warning max-w-2xl mx-auto">
            <FaExclamationCircle className="text-2xl" />
            <div>
              <h3 className="font-bold">Unable to load featured tickets</h3>
              <div className="text-sm">Advertisement section temporarily unavailable</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No advertise tickets
  if (!advertisedTickets || advertisedTickets.length === 0) {
    return null; 
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FaBullhorn className="text-2xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Featured Tickets
              </h2>
              <p className="text-gray-600 mt-1">
                Promoted tickets selected by our team
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <FaTicketAlt className="text-blue-500" />
            <span className="font-semibold text-gray-700">
              {advertisedTickets.length} 
              <span className="text-gray-500 ml-1">Featured</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisedTickets.map((ticket, index) => (
            <div 
              key={ticket._id} 
              className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-xl overflow-hidden group"
            >
              <figure className="h-48 relative overflow-hidden">
                <img 
                  src={ticket.image} 
                  alt={ticket.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Ticket+Image";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="absolute top-3 right-3">
                  <div className="badge badge-primary gap-1 px-3 py-2 font-bold">
                    <FaFire className="text-sm" />
                    Featured #{index + 1}
                  </div>
                </div>
  
                {ticket.vendor?.name && (
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={ticket.vendor.image || "https://via.placeholder.com/150"} 
                          alt={ticket.vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {ticket.vendor.name}
                      </span>
                    </div>
                  </div>
                )}
              </figure>
              
              <div className="card-body p-5">
                <h3 className="card-title text-lg font-bold line-clamp-1">
                  <FaTicketAlt className="inline mr-2 text-blue-500 flex-shrink-0" />
                  {ticket.title}
                </h3>
                
                <div className="space-y-3 mt-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaRoute className="text-green-500 flex-shrink-0" />
                    <span className="font-medium">{ticket.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">{ticket.to}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <FaDollarSign className="text-green-600" />
                      <span className="text-2xl font-bold text-primary">${ticket.price}</span>
                      <span className="text-gray-500 text-sm">per person</span>
                    </div>
                    
                    {ticket.availableTickets > 0 ? (
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          ticket.availableTickets <= 5 
                            ? 'bg-red-100 text-red-800' 
                            : ticket.availableTickets <= 10
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {ticket.availableTickets} seats left
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        Sold Out
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Transport:</span>
                    <span className="badge badge-outline">{ticket.transportType}</span>
                  </div>
                  
                  {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ticket.perks.slice(0, 3).map((perk, idx) => (
                        <span 
                          key={idx} 
                          className="badge badge-sm badge-outline"
                        >
                          {perk}
                        </span>
                      ))}
                      {ticket.perks.length > 3 && (
                        <span className="badge badge-sm badge-ghost">
                          +{ticket.perks.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="card-actions mt-5">
                  <Link 
                    to={`/ticket/${ticket._id}`} 
                    className="btn btn-primary w-full gap-2 hover:gap-3 transition-all"
                  >
                    <FaTicketAlt />
                    Book Now
                    <span className="text-sm opacity-90">
                      ${ticket.price * 1} total
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/all-tickets" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            View all tickets
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
