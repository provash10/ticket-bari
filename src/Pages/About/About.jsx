import React from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaTicketAlt, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaStar,
  FaCheckCircle,
  FaBus,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaAward,
  FaHeart,
  FaRocket
} from 'react-icons/fa';

const About = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { icon: FaTicketAlt, number: "50,000+", label: "Tickets Booked" },
    { icon: FaUsers, number: "25,000+", label: "Happy Customers" },
    { icon: FaMapMarkerAlt, number: "100+", label: "Destinations" },
    { icon: FaBus, number: "500+", label: "Transport Partners" }
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Safe",
      description: "Your payments and personal information are protected with industry-standard security measures."
    },
    {
      icon: FaClock,
      title: "24/7 Service",
      description: "Round-the-clock customer support and booking services for your convenience."
    },
    {
      icon: FaCheckCircle,
      title: "Instant Confirmation",
      description: "Get your e-tickets instantly after booking with real-time confirmation."
    },
    {
      icon: FaHeadset,
      title: "Customer Support",
      description: "Dedicated support team to help you with any queries or issues."
    }
  ];

  const team = [
    {
      name: "Ahmed Rahman",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      description: "Visionary leader with 10+ years in travel industry"
    },
    {
      name: "Fatima Khan",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      description: "Tech expert ensuring seamless platform experience"
    },
    {
      name: "Mohammad Ali",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      description: "Operations specialist managing transport partnerships"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      {/* Hero Section */}
      <section className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            About Ticket Bari
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for seamless travel experiences across Bangladesh. 
            We connect you to your destinations with comfort, reliability, and convenience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Our Mission
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To revolutionize travel booking in Bangladesh by providing a seamless, 
                secure, and user-friendly platform that connects travelers with reliable 
                transport services across the country.
              </p>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FaRocket className="text-2xl" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Innovation First
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Constantly improving our platform for better user experience
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600"
                alt="Our Mission"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <FaHeart className="text-3xl text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Our Impact
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Numbers that speak for our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <stat.icon className="text-2xl" />
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Why Choose Us
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              What makes Ticket Bari the preferred choice for travelers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white'
                } shadow-lg hover:shadow-xl`}
              >
                <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  <feature.icon className="text-xl" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Meet Our Team
            </h2>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The passionate people behind Ticket Bari
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaAward className="text-white text-sm" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {member.name}
                </h3>
                <p className={`text-blue-500 font-semibold mb-3`}>
                  {member.role}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-blue-900 to-purple-900' 
          : 'bg-gradient-to-r from-blue-600 to-purple-600'
      }`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers and experience hassle-free travel booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/all-tickets"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Book Your Ticket
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;