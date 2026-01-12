import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import {
  FaChartLine, FaTicketAlt, FaMoneyBillWave, FaCalendarAlt,
  FaChartPie, FaHistory, FaRoute
} from 'react-icons/fa';
import { HiArrowTrendingUp } from 'react-icons/hi2'; 
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const UserAnalytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  // Fetch user's bookings
  const { data: bookingsData = [] } = useQuery({
    queryKey: ['user-analytics-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-bookings');
      return res.data;
    },
    enabled: !!user?.email
  });

  // Fetch user's transactions
  const { data: transactionsData = [] } = useQuery({
    queryKey: ['user-analytics-transactions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-transactions');
      return res.data;
    },
    enabled: !!user?.email
  });

  // Process charts data
  const processSpendingHistory = () => {
    const monthlySpending = {};
    transactionsData.forEach(transaction => {
      if (transaction.date && transaction.amount) {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + transaction.amount;
      }
    });

    return Object.entries(monthlySpending)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        spending: amount
      }));
  };

  const processTransportPreferences = () => {
    const transportCounts = {};
    bookingsData.forEach(booking => {
      const type = booking.ticket?.transportType || booking.transportType || 'Unknown';
      transportCounts[type] = (transportCounts[type] || 0) + 1;
    });
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    return Object.entries(transportCounts).map(([type, count], index) => ({
      name: type,
      value: count,
      color: colors[index % colors.length]
    }));
  };

  const processBookingFrequency = () => {
    const monthlyBookings = {};
    bookingsData.forEach(booking => {
      if (booking.bookingDate || booking.createdAt) {
        const date = new Date(booking.bookingDate || booking.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyBookings[monthKey] = (monthlyBookings[monthKey] || 0) + 1;
      }
    });

    return Object.entries(monthlyBookings)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        bookings: count
      }));
  };

  const processPopularRoutes = () => {
    const routeCounts = {};
    bookingsData.forEach(booking => {
      const route = `${booking.ticket?.from || booking.from || 'Unknown'} → ${booking.ticket?.to || booking.to || 'Unknown'}`;
      routeCounts[route] = (routeCounts[route] || 0) + 1;
    });

    return Object.entries(routeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([route, count]) => ({
        route: route.length > 20 ? route.substring(0, 20) + '...' : route,
        count
      }));
  };

  const spendingData = processSpendingHistory();
  const transportData = processTransportPreferences();
  const bookingFrequencyData = processBookingFrequency();
  const popularRoutesData = processPopularRoutes();

  // Summary stats
  const totalBookings = bookingsData.length;
  const totalSpent = transactionsData.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgBookingValue = totalBookings > 0 ? totalSpent / totalBookings : 0;
  const completedBookings = bookingsData.filter(b => b.status === 'confirmed' || b.status === 'completed').length;

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Header */}
      <div className={`mb-8 p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <FaChartLine className="text-3xl" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Travel Analytics</h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your booking patterns and travel insights</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Bookings', value: totalBookings, icon: FaTicketAlt, color: 'blue' },
          { title: 'Total Spent', value: `৳${totalSpent.toLocaleString()}`, icon: FaMoneyBillWave, color: 'green' },
          { title: 'Avg. Booking Value', value: `৳${avgBookingValue.toFixed(0)}`, icon: HiArrowTrendingUp, color: 'purple' },
          { title: 'Completed Trips', value: completedBookings, icon: FaCalendarAlt, color: 'emerald' }
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${
                stat.color === 'blue' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') :
                stat.color === 'green' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                stat.color === 'purple' ? (isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600') :
                (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')
              }`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Spending History */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <FaMoneyBillWave className="text-lg" />
            </div>
            <h3 className="text-xl font-bold">{isDarkMode ? 'text-gray-100' : 'text-gray-800'}Spending History</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip formatter={(value) => [`৳${value}`, 'Spending']} />
                <Area type="monotone" dataKey="spending" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transport Preferences */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <FaChartPie className="text-lg" />
            </div>
            <h3 className="text-xl font-bold">{isDarkMode ? 'text-gray-100' : 'text-gray-800'}Transport Preferences</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={transportData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {transportData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Frequency */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <FaHistory className="text-lg" />
            </div>
            <h3 className="text-xl font-bold">{isDarkMode ? 'text-gray-100' : 'text-gray-800'}Booking Frequency</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Routes */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
              <FaRoute className="text-lg" />
            </div>
            <h3 className="text-xl font-bold">{isDarkMode ? 'text-gray-100' : 'text-gray-800'}Most Traveled Routes</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularRoutesData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis type="number" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis type="category" dataKey="route" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={10} width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserAnalytics;
