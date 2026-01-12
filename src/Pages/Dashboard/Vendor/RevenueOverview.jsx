import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import {
  FaChartLine, FaMoneyBillWave, FaTicketAlt, FaShoppingCart,
  FaDollarSign, FaChartPie,
  FaArrowUp, FaArrowDown, FaEye
} from 'react-icons/fa';
import {
  PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme(); 

  // fetch revenue data
  const { data: revenueData, isLoading, isError } = useQuery({
    queryKey: ['revenue-overview', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-revenue/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className={`inline-block animate-spin rounded-full h-16 w-16 border-4 border-solid ${
              isDarkMode ? 'border-emerald-400 border-t-transparent' : 'border-emerald-600 border-t-transparent'
            }`}></div>
            <p className={`mt-4 text-lg font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Loading revenue data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'
      }`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className={`text-center p-8 rounded-2xl backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700 text-red-400' 
              : 'bg-white/90 border-white/20 text-red-600'
          }`}>
            <p className="text-lg font-medium">Error loading revenue data</p>
          </div>
        </div>
      </div>
    );
  }

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
  
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
  const percentageChange = 15.5; 

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-emerald-500/10' 
            : 'bg-white/90 border-white/20 shadow-2xl shadow-emerald-500/20'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <FaChartLine className="text-2xl" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Revenue Overview
                </h1>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Track your earnings and ticket sales performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Revenue',
              value: `$${stats.totalRevenue.toLocaleString()}`,
              icon: FaMoneyBillWave,
              color: 'emerald',
              trend: percentageChange,
              trendLabel: 'from last month'
            },
            {
              label: 'Tickets Sold',
              value: stats.totalTicketsSold,
              icon: FaTicketAlt,
              color: 'blue',
              trend: null,
              trendLabel: `From ${stats.completedBookings} bookings`
            },
            {
              label: 'Tickets Added',
              value: stats.totalTicketsAdded,
              icon: FaShoppingCart,
              color: 'purple',
              trend: null,
              trendLabel: `${stats.totalTicketsAdded > 0 ? ((stats.totalTicketsSold / stats.totalTicketsAdded) * 100).toFixed(1) : 0}% sold rate`
            },
            {
              label: 'Avg. Ticket Price',
              value: `$${stats.averageTicketPrice.toLocaleString()}`,
              icon: FaDollarSign,
              color: 'amber',
              trend: null,
              trendLabel: 'Based on sales'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-emerald-500/10' 
                  : 'bg-white/90 border-white/20 shadow-xl shadow-emerald-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                  <h3 className={`text-2xl font-bold mt-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${
                  stat.color === 'emerald' ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') :
                  stat.color === 'blue' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') :
                  stat.color === 'purple' ? (isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600') :
                  (isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600')
                }`}>
                  <stat.icon className="text-2xl" />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {stat.trend !== null ? (
                  <>
                    <span className={`flex items-center gap-1 font-medium ${
                      stat.trend >= 0 
                        ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                        : (isDarkMode ? 'text-red-400' : 'text-red-600')
                    }`}>
                      {stat.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(stat.trend)}%
                    </span>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {stat.trendLabel}
                    </span>
                  </>
                ) : (
                  <span className={`text-sm flex items-center gap-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <FaEye className="text-xs" />
                    {stat.trendLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Monthly Performance Chart */}
          <div className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-emerald-500/10' 
              : 'bg-white/90 border-white/20 shadow-xl shadow-emerald-500/20'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <FaChartLine className="text-lg" />
                </div>
                Monthly Performance
              </h3>
              <span className={`text-sm px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                Last 6 Months
              </span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDarkMode ? '#374151' : '#f0f0f0'} 
                  />
                  <XAxis 
                    dataKey="shortMonth" 
                    stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  />
                  <YAxis 
                    stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`$${value}`, name === 'revenue' ? 'Revenue' : 'Tickets Sold']}
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    name="Revenue ($)"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tickets" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    name="Tickets Sold"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transport Types Distribution Chart */}
          <div className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700 shadow-xl shadow-emerald-500/10' 
              : 'bg-white/90 border-white/20 shadow-xl shadow-emerald-500/20'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  <FaChartPie className="text-lg" />
                </div>
                Ticket Types Distribution
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transportTypeData}
                    cx="50%" 
                    cy="50%"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                    stroke={isDarkMode ? '#374151' : '#ffffff'}
                    strokeWidth={2}
                  >
                    {transportTypeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color || COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Tickets Added`]}
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                      border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* No Data State */}
        {(!apiData || stats.totalTicketsAdded === 0) && (
          <div className={`rounded-2xl shadow-xl p-12 backdrop-blur-sm border transition-all duration-300 text-center ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700 shadow-2xl shadow-emerald-500/10' 
              : 'bg-white/90 border-white/20 shadow-2xl shadow-emerald-500/20'
          }`}>
            <div className={`p-6 rounded-xl inline-block mb-6 ${
              isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
            }`}>
              <FaChartLine className="text-6xl" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              No Sufficient Data Yet
            </h3>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your revenue analytics will appear here once you have sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Start by adding tickets to your inventory
                </p>
              </div>
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Revenue tracking begins with your first sale
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueOverview;