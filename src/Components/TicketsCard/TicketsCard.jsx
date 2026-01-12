import { Link } from "react-router";
import { useTheme } from "../../Contexts/ThemeContext";
import { getVisibilityClasses } from "../../Utils/visibilityHelpers";
import { 
  FaMapMarkerAlt, FaRoute, FaClock, FaTicketAlt, 
  FaBus, FaTrain, FaPlane, FaShip, FaUser, FaEye 
} from "react-icons/fa";

const TicketsCard = ({ ticket }) => {
  const { isDarkMode } = useTheme();
  const visibilityClasses = getVisibilityClasses(isDarkMode);
  
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

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <FaBus className="text-blue-500" />;
      case 'train': return <FaTrain className="text-green-500" />;
      case 'plane': return <FaPlane className="text-red-500" />;
      case 'launch': return <FaShip className="text-purple-500" />;
      default: return <FaTicketAlt className="text-gray-500" />;
    }
  };

  const getAvailabilityColor = () => {
    if (availableTickets > 10) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (availableTickets > 5) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (availableTickets > 0) return isDarkMode ? 'text-orange-400' : 'text-orange-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
      visibilityClasses.bg.card
    } ${visibilityClasses.border.primary} flex flex-col h-full`}>
      
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Transport Type Badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm ${
          isDarkMode ? 'bg-gray-900/80 border border-gray-700' : 'bg-white/90 border border-gray-200'
        }`}>
          {getTransportIcon(transportType)}
          <span className={`text-xs font-medium ${visibilityClasses.text.primary}`}>
            {transportType}
          </span>
        </div>

        {/* Price Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-sm ${
          isDarkMode ? 'bg-blue-900/80 border border-blue-700' : 'bg-blue-100/90 border border-blue-200'
        }`}>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ${price}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        
        {/* Title */}
        <h3 className={`text-lg font-bold line-clamp-2 group-hover:text-blue-500 transition-colors duration-300 ${
          visibilityClasses.text.primary
        }`}>
          {title}
        </h3>

        {/* Route */}
        <div className={`flex items-center gap-2 p-3 rounded-xl ${
          isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-50 border border-gray-200'
        }`}>
          <FaMapMarkerAlt className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-sm font-medium ${visibilityClasses.text.secondary}`}>
            {from}
          </span>
          <FaRoute className={`${visibilityClasses.text.tertiary}`} />
          <span className={`text-sm font-medium ${visibilityClasses.text.secondary}`}>
            {to}
          </span>
        </div>

        {/* Departure Time */}
        <div className="flex items-center gap-2">
          <FaClock className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <span className={`text-sm ${visibilityClasses.text.tertiary}`}>
            {new Date(departure).toLocaleDateString()} at {new Date(departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaTicketAlt className={getAvailabilityColor()} />
            <span className={`text-sm font-medium ${visibilityClasses.text.secondary}`}>
              Available:
            </span>
            <span className={`text-sm font-bold ${getAvailabilityColor()}`}>
              {availableTickets}
            </span>
          </div>
          
          {availableTickets === 0 && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              isDarkMode ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-red-100 text-red-600 border border-red-200'
            }`}>
              Sold Out
            </span>
          )}
        </div>

        {/* Perks */}
        {perks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {perks.slice(0, 3).map((perk, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isDarkMode 
                    ? 'bg-purple-900/50 text-purple-400 border border-purple-800' 
                    : 'bg-purple-100 text-purple-600 border border-purple-200'
                }`}
              >
                {perk}
              </span>
            ))}
            {perks.length > 3 && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                +{perks.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/ticket/${_id}`}
          className={`btn w-full mt-auto rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
            availableTickets > 0 
              ? visibilityClasses.button.primary
              : visibilityClasses.button.secondary
          }`}
          disabled={availableTickets === 0}
        >
          <FaEye />
          {availableTickets > 0 ? 'View Details' : 'View Details (Sold Out)'}
        </Link>
      </div>

      {/* Vendor Section */}
      {vendor?.name && (
        <div className={`border-t px-5 py-3 ${visibilityClasses.border.primary}`}>
          <div className="flex items-center gap-2">
            <FaUser className={`text-sm ${visibilityClasses.text.tertiary}`} />
            <div>
              <p className={`text-xs font-medium ${visibilityClasses.text.secondary}`}>
                Vendor: {vendor.name}
              </p>
              {vendor.email && (
                <p className={`text-xs ${visibilityClasses.text.tertiary}`}>
                  {vendor.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default TicketsCard;

