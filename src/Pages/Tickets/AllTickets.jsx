import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const AllTickets = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey:['tickets'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/tickets`);
            return result.data;
        }
    })
    console.log(data)

    return (
        <div>
            <h3>All Tickets</h3>
        </div>
    );
};

export default AllTickets;