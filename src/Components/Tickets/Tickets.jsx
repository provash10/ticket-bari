import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';
import TicketsCard from '../TicketsCard/TicketsCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTheme } from '../../Contexts/ThemeContext';
import { getVisibilityClasses } from '../../Utils/visibilityHelpers';
import { FaTicketAlt, FaExclamationTriangle } from 'react-icons/fa';

const Tickets = ({searchText, fromLocation, toLocation, transportType, sortOption}) => {
   const { isDarkMode } = useTheme();
   const visibilityClasses = getVisibilityClasses(isDarkMode);
   const axiosSecure = useAxiosSecure();
   
   const getSortParams = () => {
    if (sortOption === 'price-low') return { sortBy: 'price', sortOrder: 'asc' };
    if (sortOption === 'price-high') return { sortBy: 'price', sortOrder: 'desc' };
    return { sortBy: 'createdAt', sortOrder: 'desc' };
  };
  
  const { sortBy, sortOrder } = getSortParams();

  const { data: tickets = [], isLoading, isError } = useQuery({
    queryKey: ['tickets', searchText, fromLocation, toLocation, transportType, sortBy, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets', {
        params: {
          searchText,
          from: fromLocation,
          to: toLocation,
          transportType: transportType === 'all' ? '' : transportType,
          sortBy,
          sortOrder
        }
      });
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (isError) {
    return (
      <div className={`text-center mt-10 p-6 rounded-xl border ${visibilityClasses.bg.card} ${visibilityClasses.border.error}`}>
        <FaExclamationTriangle className={`text-4xl mx-auto mb-4 ${visibilityClasses.text.error}`} />
        <p className={`text-lg font-semibold ${visibilityClasses.text.error}`}>
          Failed to load tickets
        </p>
        <p className={`mt-2 ${visibilityClasses.text.tertiary}`}>
          Please try again later or refresh the page
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaTicketAlt className={`text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`text-xl font-bold ${visibilityClasses.text.primary}`}>
            Available Tickets
          </h3>
          <span className={`badge ${isDarkMode ? 'badge-outline border-blue-500 text-blue-400' : 'badge-outline border-blue-500 text-blue-600'}`}>
            {tickets.length} found
          </span>
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {tickets.map(ticket => (
            <TicketsCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 px-6 rounded-xl border-2 border-dashed ${
          isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
        }`}>
          <FaTicketAlt className={`text-6xl mx-auto mb-4 ${visibilityClasses.text.muted}`} />
          <h4 className={`text-xl font-semibold mb-2 ${visibilityClasses.text.secondary}`}>
            No tickets found
          </h4>
          <p className={`${visibilityClasses.text.tertiary}`}>
            {searchText || fromLocation || toLocation || transportType !== 'all' 
              ? "Try adjusting your search filters to find more results" 
              : "No tickets are currently available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tickets;
