import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../LoaderPage/LoadingSpinner';
import {
  FaChartLine, FaMoneyBillWave, FaTicketAlt, FaShoppingCart,
  FaCalendarAlt, FaUsers, FaArrowUp, FaArrowDown,
  FaDollarSign, FaChartBar, FaChartPie, FaPercentage
} from 'react-icons/fa';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch revenue data
  const { data: revenueData, isLoading, isError } = useQuery({
    queryKey: ['revenue-overview', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-revenue/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading revenue data</div>;

  
  const apiData = revenueData?.data;

  
  const stats = {
    totalRevenue: apiData?.totalRevenue ?? 0,
    totalTicketsSold: apiData?.totalTicketsSold ?? 0,
    totalTicketsAdded: apiData?.totalTicketsAdded ?? 0,
    pendingBookings: apiData?.pendingBookings ?? 0,
    completedBookings: apiData?.completedBookings ?? 0,
    averageTicketPrice: apiData?.averageTicketPrice ?? 0,
  };

  
  const monthlyRevenueData = apiData?.monthlyData || [];
  const transportTypeData = apiData?.transportDistribution || [];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const percentageChange = 15.5; 

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
     
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FaChartLine className="text-3xl text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Revenue Overview</h1>
        </div>
        <p className="text-gray-600">Track your earnings and ticket sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaMoneyBillWave className="text-2xl text-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1 ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentageChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(percentageChange)}%
            </span>
            <span className="text-gray-500 text-sm">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Tickets Sold</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalTicketsSold}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaTicketAlt className="text-2xl text-green-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaUsers className="text-gray-400" />
            <span>From {stats.completedBookings} bookings</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Tickets Added</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalTicketsAdded}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaShoppingCart className="text-2xl text-purple-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaPercentage className="text-gray-400" />
            <span>{stats.totalTicketsAdded > 0 ? ((stats.totalTicketsSold / stats.totalTicketsAdded) * 100).toFixed(1) : 0}% sold rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Avg. Ticket Price</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats.averageTicketPrice.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaDollarSign className="text-2xl text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaCalendarAlt className="text-gray-400" />
            <span>Based on sales</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaChartLine /> Monthly Performance (Last 6 Months)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="shortMonth" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue ($)" />
                <Line type="monotone" dataKey="tickets" stroke="#10b981" strokeWidth={2} name="Tickets Sold" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaChartPie /> Ticket Types Distribution
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transportTypeData}
                  cx="50%" cy="50%"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {transportTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Tickets Added`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {(!apiData || stats.totalTicketsAdded === 0) && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FaChartLine className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Sufficient Data Yet</h3>
          <p className="text-gray-500 mb-6">Your revenue analytics will appear here once you have sales.</p>
        </div>
      )}
    </div>
  );
};

export default RevenueOverview;