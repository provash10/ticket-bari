// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { Link, useSearchParams } from 'react-router'
// import { IoBagCheckOutline } from 'react-icons/io5'
// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams()
//   const sessionId = searchParams.get('session_id')

//   console.log(sessionId);

//   useEffect(() => {
//     if (sessionId) {
//         //fetch
//       axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
//         sessionId,
//       })
//     }
//   }, [sessionId])
//   return (
//     <div className='flex flex-col items-center justify-center'>
//       <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
//         <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
//         <h1 className='text-3xl font-bold text-gray-800 mb-2'>
//           Payment Successful!
//         </h1>
//         <p className='text-gray-600 mb-6'>
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <Link
//           to='/dashboard/my-orders'
//           className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
//         >
//           Go to My Orders
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default PaymentSuccess

import axios from 'axios';
import { useEffect, useState } from 'react';

import { IoBagCheckOutline } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading'); 

  useEffect(() => {
    if (sessionId) {
      const verifyPayment = async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId });
          console.log("Payment verified:", res.data);
          setStatus('success');
        } catch (err) {
          console.error("Payment verification failed:", err);
          setStatus('error');
        }
      };
      verifyPayment();
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return <p className="text-center mt-10">Verifying payment...</p>;
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-red-500 font-bold">Payment verification failed!</p>
        <Link to="/tickets" className="mt-4 text-blue-600 underline">Go back to tickets</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link
          to="/dashboard/my-orders"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

