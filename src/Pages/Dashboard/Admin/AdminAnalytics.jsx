import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import {
  FaChartLine, FaUsers, FaTicketAlt, FaMoneyBillWave,
  FaChartBar, FaChartPie, FaCalendarAlt
} from 'react-icons/fa';
import { HiArrowTrendingUp } from 'react-icons/hi2';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  // Fetch all users
  const { data: usersData = [] } = useQuery({
    queryKey: ['admin-analytics-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/admin/all');
      return res.data;
    }
  });

  // Fetch all tickets
  const { data: ticketsData = [] } = useQuery({
    queryKey: ['admin-analytics-tickets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tickets/admin/all');
      return res.data;
    }
  });

  // Process charts data
  const processUserGrowthData = () => {
    const monthlyData = {};
    usersData.forEach(user => {
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
      }
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        users: count
      }));
  };

  const processTransportDistribution = () => {
    const transportCounts = {};
    ticketsData.forEach(ticket => {
      const type = ticket.transportType || 'Unknown';
      transportCounts[type] = (transportCounts[type] || 0) + 1;
    });
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    return Object.entries(transportCounts).map(([type, count], index) => ({
      name: type,
      value: count,
      color: colors[index % colors.length]
    }));
  };

  const processTicketStatusData = () => {
    const statusCounts = { approved: 0, pending: 0, rejected: 0 };
    ticketsData.forEach(ticket => {
      const status = ticket.status || 'pending';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return [
      { status: 'Approved', count: statusCounts.approved, color: '#10b981' },
      { status: 'Pending', count: statusCounts.pending, color: '#f59e0b' },
      { status: 'Rejected', count: statusCounts.rejected, color: '#ef4444' }
    ];
  };

  const processRoleDistribution = () => {
    const roleCounts = { user: 0, vendor: 0, admin: 0 };
    usersData.forEach(user => {
      const role = user.role || 'user';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });

    return [
      { role: 'Users', count: roleCounts.user, color: '#3b82f6' },
      { role: 'Vendors', count: roleCounts.vendor, color: '#10b981' },
      { role: 'Admins', count: roleCounts.admin, color: '#ef4444' }
    ];
  };

  const userGrowthData = processUserGrowthData();
  const transportData = processTransportDistribution();
  const ticketStatusData = processTicketStatusData();
  const roleData = processRoleDistribution();

  const totalUsers = usersData.length;
  const totalTickets = ticketsData.length;
  const approvedTickets = ticketsData.filter(t => t.status === 'approved').length;
  const pendingTickets = ticketsData.filter(t => t.status === 'pending').length;

  return (
    <div className={`min-h-screen transition-colors duration-300 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* Header */}
      <div className={`mb-8 p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <FaChartLine className="text-3xl" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Admin Analytics Dashboard
            </h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Platform performance and user insights
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: totalUsers, icon: FaUsers, color: 'blue' },
          { title: 'Total Tickets', value: totalTickets, icon: FaTicketAlt, color: 'green' },
          { title: 'Approved Tickets', value: approvedTickets, icon: HiArrowTrendingUp, color: 'emerald' },
          { title: 'Pending Review', value: pendingTickets, icon: FaCalendarAlt, color: 'yellow' }
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${
                stat.color === 'blue' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') :
                stat.color === 'green' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                stat.color === 'emerald' ? (isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') :
                (isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600')
              }`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">

        {/* User Growth */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <FaChartLine className="text-lg" />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>User Growth Trend</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip contentStyle={{backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937'}} />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transport Distribution */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <FaChartPie className="text-lg" />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Transport Types</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={transportData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {transportData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ticket Status */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <FaChartBar className="text-lg" />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Ticket Status Overview</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="status" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip contentStyle={{backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937'}} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles */}
        <div className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
              <FaUsers className="text-lg" />
            </div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>User Roles Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis type="number" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis type="category" dataKey="role" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <Tooltip contentStyle={{backgroundColor: isDarkMode ? '#1f2937' : '#ffffff', border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`, borderRadius: '8px', color: isDarkMode ? '#f3f4f6' : '#1f2937'}} />
                <Bar dataKey="count" fill="#ef4444" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
