import React from 'react';

const RequestedBookings = () => {
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <h3 className='text-2xl font-bold mb-6'>Requested Bookings</h3>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    User Name / Email
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Ticket Title
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Booking Quantity
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Total Price
                  </th>
                  <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*static rows */}
                <tr className='bg-white border-b'>
                  <td className='px-5 py-5 text-sm'>John Doe / john@example.com</td>
                  <td className='px-5 py-5 text-sm'>Concert Ticket</td>
                  <td className='px-5 py-5 text-sm'>2</td>
                  <td className='px-5 py-5 text-sm'>৳ 2000</td>
                  <td className='px-5 py-5 text-sm'>
                    <button className='bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600'>
                      Accept
                    </button>
                    <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                      Reject
                    </button>
                  </td>
                </tr>
                <tr className='bg-white border-b'>
                  <td className='px-5 py-5 text-sm'>Jane Smith / jane@example.com</td>
                  <td className='px-5 py-5 text-sm'>Movie Ticket</td>
                  <td className='px-5 py-5 text-sm'>1</td>
                  <td className='px-5 py-5 text-sm'>৳ 500</td>
                  <td className='px-5 py-5 text-sm'>
                    <button className='bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600'>
                      Accept
                    </button>
                    <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                      Reject
                    </button>
                  </td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
