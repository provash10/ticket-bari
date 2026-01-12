import { useState } from "react";
import Tickets from "../../Components/Tickets/Tickets";
import Container from "../Container/Container";
import { useTheme } from "../../Contexts/ThemeContext";
import { getVisibilityClasses } from "../../Utils/visibilityHelpers";
import {
  FaSearch, FaMapMarkerAlt, FaRoute, FaBus, FaTrain, FaPlane, FaShip,
  FaSort, FaFilter, FaTicketAlt, FaSync
} from "react-icons/fa";

const AllTickets = () => {
  const { isDarkMode } = useTheme();
  const visibilityClasses = getVisibilityClasses(isDarkMode);
  const [searchText, setSearchText] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportType, setTransportType] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const getTransportIcon = (type) => {
    switch(type) {
      case 'bus': return <FaBus className="text-blue-500" />;
      case 'train': return <FaTrain className="text-green-500" />;
      case 'plane': return <FaPlane className="text-red-500" />;
      case 'launch': return <FaShip className="text-purple-500" />;
      default: return <FaTicketAlt className="text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <Container>
        {/* Header Section */}
        <div className={`mb-8 p-6 rounded-2xl shadow-xl transition-all duration-300 border ${
          visibilityClasses.bg.card
        } ${visibilityClasses.border.primary}`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isDarkMode ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-800' : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200'
              }`}>
                <FaTicketAlt className={`text-3xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${visibilityClasses.text.primary}`}>
                  All Tickets
                </h1>
                <p className={`mt-1 ${visibilityClasses.text.tertiary}`}>
                  Find and book your perfect journey
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className={`stats shadow transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-white border border-gray-200'
              }`}>
                <div className="stat py-2 px-4">
                  <div className={`stat-title text-xs ${visibilityClasses.text.tertiary}`}>
                    Available
                  </div>
                  <div className={`stat-value text-lg ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <FaTicketAlt className="inline mr-1" />
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters Section */}
        <div className={`mb-8 p-6 rounded-2xl shadow-lg transition-all duration-300 border ${
          visibilityClasses.bg.card
        } ${visibilityClasses.border.primary}`}>
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${visibilityClasses.text.primary}`}>
            <FaFilter className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            Search & Filter Tickets
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label className="label">
                <span className={`label-text flex items-center gap-2 font-medium ${visibilityClasses.text.secondary}`}>
                  <FaSearch className={visibilityClasses.text.tertiary} />
                  Search Tickets
                </span>
              </label>
              <input
                type="search"
                placeholder="Search by title, route, or vendor..."
                className={`input input-bordered w-full transition-all duration-300 focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* From Location */}
            <div className="relative">
              <label className="label">
                <span className={`label-text flex items-center gap-2 font-medium ${visibilityClasses.text.secondary}`}>
                  <FaMapMarkerAlt className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  From Location
                </span>
              </label>
              <input
                type="text"
                placeholder="Departure city..."
                className={`input input-bordered w-full transition-all duration-300 focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-green-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>

            {/* To Location */}
            <div className="relative">
              <label className="label">
                <span className={`label-text flex items-center gap-2 font-medium ${visibilityClasses.text.secondary}`}>
                  <FaRoute className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  To Location
                </span>
              </label>
              <input
                type="text"
                placeholder="Destination city..."
                className={`input input-bordered w-full transition-all duration-300 focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                }`}
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>

            {/* Transport Type */}
            <div className="relative">
              <label className="label">
                <span className={`label-text flex items-center gap-2 font-medium ${visibilityClasses.text.secondary}`}>
                  {getTransportIcon(transportType)}
                  Transport Type
                </span>
              </label>
              <select
                className={`select select-bordered w-full transition-all duration-300 focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-orange-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                }`}
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
              >
                <option value="all">All Transport Types</option>
                <option value="bus">🚌 Bus</option>
                <option value="train">🚂 Train</option>
                <option value="plane">✈️ Plane</option>
                <option value="launch">🚢 Launch</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <label className="label">
                <span className={`label-text flex items-center gap-2 font-medium ${visibilityClasses.text.secondary}`}>
                  <FaSort className={`${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  Sort By
                </span>
              </label>
              <select
                className={`select select-bordered w-full transition-all duration-300 focus:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-yellow-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-yellow-500'
                }`}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">🆕 Newest First</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="popular">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 flex flex-wrap gap-2">
            {searchText && (
              <span className={`badge gap-1 ${isDarkMode ? 'badge-outline border-blue-500 text-blue-400' : 'badge-outline border-blue-500 text-blue-600'}`}>
                <FaSearch className="text-xs" />
                Search: {searchText}
              </span>
            )}
            {fromLocation && (
              <span className={`badge gap-1 ${isDarkMode ? 'badge-outline border-green-500 text-green-400' : 'badge-outline border-green-500 text-green-600'}`}>
                <FaMapMarkerAlt className="text-xs" />
                From: {fromLocation}
              </span>
            )}
            {toLocation && (
              <span className={`badge gap-1 ${isDarkMode ? 'badge-outline border-purple-500 text-purple-400' : 'badge-outline border-purple-500 text-purple-600'}`}>
                <FaRoute className="text-xs" />
                To: {toLocation}
              </span>
            )}
            {transportType !== 'all' && (
              <span className={`badge gap-1 ${isDarkMode ? 'badge-outline border-orange-500 text-orange-400' : 'badge-outline border-orange-500 text-orange-600'}`}>
                {getTransportIcon(transportType)}
                {transportType.charAt(0).toUpperCase() + transportType.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Tickets Section */}
        <div className={`rounded-2xl shadow-lg transition-all duration-300 border ${
          visibilityClasses.bg.card
        } ${visibilityClasses.border.primary} overflow-hidden`}>
          <div className={`p-4 border-b ${visibilityClasses.border.primary}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold flex items-center gap-2 ${visibilityClasses.text.primary}`}>
                <FaTicketAlt className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                Available Tickets
              </h3>
              <button 
                onClick={() => window.location.reload()}
                className={`btn btn-sm gap-2 ${visibilityClasses.button.outline}`}
              >
                <FaSync className="text-sm" />
                Refresh
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <Tickets
              searchText={searchText}
              fromLocation={fromLocation}
              toLocation={toLocation}
              transportType={transportType}
              sortOption={sortOption}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllTickets;
