import React from 'react';
import TicketsCard from './TicketsCard';

const Tickets = () => {
    return (
        <div>
            <h3>All Tickets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <TicketsCard></TicketsCard>
                <TicketsCard></TicketsCard>
                <TicketsCard></TicketsCard>
                <TicketsCard></TicketsCard>
            </div>
        </div>
    );
};

export default Tickets;