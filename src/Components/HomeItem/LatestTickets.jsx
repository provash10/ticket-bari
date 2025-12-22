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
    }
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tickets.map(ticket => (
          <TicketsCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
