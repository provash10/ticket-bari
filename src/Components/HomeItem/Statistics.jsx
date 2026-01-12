import React from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaTicketAlt, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaStar,
  FaCheckCircle,
  FaBus
} from 'react-icons/fa';

const Statistics = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      icon: FaTicketAlt,
      number: "50,000+",
      label: "Tickets Booked",
      color: "blue"
    },
    {
      icon: FaUsers,
      number: "25,000+",
      label: "Happy Customers",
      color: "green"
    },
    {
      icon: FaMapMarkerAlt,
      number: "100+",
      label: "Destinations",
      color: "purple"
    },
    {
      icon: FaBus,
      number: "500+",
      label: "Transport Partners",
      color: "red"
    },
    {
      icon: FaStar,
      number: "4.8/5",
      label: "Average Rating",
      color: "yellow"
    },
    {
      icon: FaCheckCircle,
      number: "99.9%",
      label: "Success Rate",
      color: "indigo"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: isDarkMode ? 'text-blue-300 bg-blue-500/20' : 'text-blue-600 bg-blue-100',
      green: isDarkMode ? 'text-green-300 bg-green-500/20' : 'text-green-600 bg-green-100',
      purple: isDarkMode ? 'text-purple-300 bg-purple-500/20' : 'text-purple-600 bg-purple-100',
      red: isDarkMode ? 'text-red-300 bg-red-500/20' : 'text-red-600 bg-red-100',
      yellow: isDarkMode ? 'text-yellow-300 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-100',
      indigo: isDarkMode ? 'text-indigo-300 bg-indigo-500/20' : 'text-indigo-600 bg-indigo-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Trusted by Thousands
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of satisfied customers who trust us for their travel needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-white'
              } shadow-lg hover:shadow-xl`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                getColorClasses(stat.color)
              }`}>
                <stat.icon className="text-2xl" />
              </div>
              <div className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;