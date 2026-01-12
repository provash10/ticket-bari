import React from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaMapMarkerAlt, 
  FaTicketAlt, 
  FaStar,
  FaArrowRight
} from 'react-icons/fa';

const PopularDestinations = () => {
  const { isDarkMode } = useTheme();

  const destinations = [
    {
      name: "Dhaka to Chittagong",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      tickets: "150+ tickets",
      rating: 4.8,
      price: "From $15",
      description: "Experience the port city's beauty"
    },
    {
      name: "Dhaka to Sylhet",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      tickets: "120+ tickets",
      rating: 4.7,
      price: "From $18",
      description: "Explore the tea capital of Bangladesh"
    },
    {
      name: "Dhaka to Cox's Bazar",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
      tickets: "200+ tickets",
      rating: 4.9,
      price: "From $25",
      description: "World's longest natural sea beach"
    },
    {
      name: "Dhaka to Rajshahi",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      tickets: "80+ tickets",
      rating: 4.6,
      price: "From $12",
      description: "The silk city of Bangladesh"
    },
    {
      name: "Dhaka to Khulna",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
      tickets: "90+ tickets",
      rating: 4.5,
      price: "From $14",
      description: "Gateway to the Sundarbans"
    },
    {
      name: "Dhaka to Rangpur",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
      tickets: "70+ tickets",
      rating: 4.4,
      price: "From $16",
      description: "Northern charm and culture"
    }
  ];

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Popular Destinations
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover the most loved travel routes with the best prices and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-2xl`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.price}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-white text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {destination.name}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {destination.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <FaTicketAlt className={`text-sm ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {destination.tickets}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className={`text-sm ${
                      isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`} />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Popular Route
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } hover:scale-105`}>
                  View Tickets
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/all-tickets"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Explore All Destinations
            <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;