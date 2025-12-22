import React from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';
import Container from '../../Pages/Container/Container';
import TicketsCard from '../TicketsCard/TicketsCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Tickets = ({searchText, fromLocation, toLocation, transportType, sortOption}) => {
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
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load tickets. Try again later.</p>;

  return (
    <Container>
      <h3 className="text-2xl font-bold mb-6 text-center">All Tickets ({tickets.length})</h3>
      {tickets.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {tickets.map(ticket => (
            <TicketsCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {searchText ? `No tickets found for "${searchText}"` : "No tickets available."}
        </p>
      )}
    </Container>
  );
};

export default Tickets;
