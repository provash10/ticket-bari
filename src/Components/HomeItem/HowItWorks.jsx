import React from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaSearch, 
  FaTicketAlt, 
  FaCreditCard, 
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

const HowItWorks = () => {
  const { isDarkMode } = useTheme();

  const steps = [
    {
      icon: FaSearch,
      title: "Search & Compare",
      description: "Browse through hundreds of tickets and compare prices, timings, and amenities",
      color: "blue"
    },
    {
      icon: FaTicketAlt,
      title: "Select Your Ticket",
      description: "Choose the perfect ticket that matches your travel preferences and budget",
      color: "green"
    },
    {
      icon: FaCreditCard,
      title: "Secure Payment",
      description: "Complete your booking with our secure payment system and multiple payment options",
      color: "purple"
    },
    {
      icon: FaCheckCircle,
      title: "Travel & Enjoy",
      description: "Receive your e-ticket instantly and enjoy a comfortable journey to your destination",
      color: "red"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: isDarkMode ? 'text-blue-300 bg-blue-500/20 border-blue-400' : 'text-blue-600 bg-blue-100 border-blue-200',
      green: isDarkMode ? 'text-green-300 bg-green-500/20 border-green-400' : 'text-green-600 bg-green-100 border-green-200',
      purple: isDarkMode ? 'text-purple-300 bg-purple-500/20 border-purple-400' : 'text-purple-600 bg-purple-100 border-purple-200',
      red: isDarkMode ? 'text-red-300 bg-red-500/20 border-red-400' : 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            How It Works
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Book your perfect journey in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              } hover:shadow-xl`}>
                {/* Step Number */}
                <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  getColorClasses(step.color)
                } border-2`}>
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  getColorClasses(step.color)
                }`}>
                  <step.icon className="text-2xl" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-4 text-center ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-center leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <FaArrowRight className={`text-2xl ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/all-tickets"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            Start Booking Now
            <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;