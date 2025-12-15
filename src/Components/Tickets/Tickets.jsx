import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';
import Container from '../../Pages/Container/Container';
import TicketsCard from '../TicketsCard/TicketsCard';

const Tickets = () => {
    // const query = useQuery
    const { data: tickets = [], isLoading, isError } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/tickets`)
            return result.data
        },

    })
    console.log(tickets)
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h3>All Tickets</h3>

             {tickets && tickets.length > 0 ? (
                <div className='p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                    {tickets.map(ticket => (
                        <TicketsCard key={ticket._id} ticket={ticket} ></TicketsCard>
                    ))}
                </div>
            ) : null}
            
        </div>
        // <Container>
        //     {tickets && tickets.length > 0 ? (
        //         <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        //             {tickets.map(ticket => (
        //                 <TicketsCard key={ticket._id} ticket={ticket} ></TicketsCard>
        //             ))}
        //         </div>
        //     ) : null}
        // </Container>
    );
};

export default Tickets;