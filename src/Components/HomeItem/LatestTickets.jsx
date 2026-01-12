import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import TicketsCard from '../TicketsCard/TicketsCard';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['latestTickets'],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/tickets/latest`,
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
  });

  if (isLoading) return <LoadingSpinner />;

  if (!tickets.length) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-400">
        No latest tickets available at the moment.
      </div>
    );
  }

  return (
    <section className="my-16 bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          Latest Tickets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tickets.map(ticket => (
            <div
              key={ticket._id}
              className="relative bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-md dark:shadow-gray-700 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <TicketsCard ticket={ticket} />

              {/* Decorative hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/all-tickets"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Tickets
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestTickets;
