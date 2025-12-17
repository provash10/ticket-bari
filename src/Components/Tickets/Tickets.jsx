import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';
import Container from '../../Pages/Container/Container';
import TicketsCard from '../TicketsCard/TicketsCard';

const Tickets = () => {
  const { data: tickets = [], isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load tickets. Try again later.</p>;

  return (
    <Container>
      <h3 className="text-2xl font-bold mb-6 text-center">All Tickets</h3>
      {tickets.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {tickets.map(ticket => (
            <TicketsCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tickets available</p>
      )}
    </Container>
  );
};

export default Tickets;
