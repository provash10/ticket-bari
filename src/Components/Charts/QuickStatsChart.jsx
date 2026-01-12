import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTheme } from '../../Contexts/ThemeContext';
import {
  FaUsers, FaTicketAlt, FaMoneyBillWave, FaChartLine
} from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const QuickStatsChart = ({ type = 'admin' }) => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  // Fetch data based on type
  const { data: statsData = [] } = useQuery({
    queryKey: [`quick-stats-${type}`],
    queryFn: async () => {
      if (type === 'admin') {
        const [usersRes, ticketsRes] = await Promise.all([
          axiosSecure.get('/users/admin/all'),
          axiosSecure.get('/tickets/admin/all')
        ]);
        
        const users = usersRes.data || [];
        const tickets = ticketsRes.data || [];
        
        return [
          { name: 'Users', value: users.length, color: '#3b82f6' },
          { name: 'Tickets', value: tickets.length, color: '#10b981' },
          { name: 'Approved', value: tickets.filter(t => t.status === 'approved').length, color: '#f59e0b' },
          { name: 'Pending', value: tickets.filter(t => t.status === 'pending').length, color: '#ef4444' }
        ];
      }
      return [];
    },
    enabled: type === 'admin'
  });

  if (!statsData.length) {
    return (
      <div className={`p-6 rounded-2xl shadow-lg ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            <FaChartLine className="text-lg" />
          </div>
          <h3 className={`text-lg font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Quick Stats
          </h3>
        </div>
        <div className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Loading stats...
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl shadow-lg ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
        }`}>
          <FaChartLine className="text-lg" />
        </div>
        <h3 className={`text-lg font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Platform Overview
        </h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="name" 
              stroke={isDarkMode ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDarkMode ? '#f3f4f6' : '#1f2937'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuickStatsChart;