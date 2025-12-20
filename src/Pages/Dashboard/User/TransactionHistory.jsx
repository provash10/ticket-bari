import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-transactions');
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading transactions...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Ticket Title</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction,index) => (
            <tr key={transaction._id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{transaction.transactionId}</td>
              <td className="px-4 py-2">{transaction.ticketTitle}</td>
              <td className="px-4 py-2">$ {(transaction.amount/100).toFixed(2)}</td>
              <td className="px-4 py-2">{new Date(transaction.paymentDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
