import React from 'react';
import { FaCheckCircle, FaUserShield, FaThumbsUp, FaMobileAlt, FaUsers, FaClock } from 'react-icons/fa';

const ChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-6xl text-gradient-to-r from-blue-400 to-blue-600 mb-4" />,
      title: "Verified Listings",
      description: "All properties are verified for authenticity so you can trust what you see."
    },
    {
      icon: <FaUserShield className="text-6xl text-gradient-to-r from-green-400 to-green-600 mb-4" />,
      title: "Secure Transactions",
      description: "We ensure safe and secure communication between buyers and sellers."
    },
    {
      icon: <FaThumbsUp className="text-6xl text-gradient-to-r from-yellow-400 to-yellow-600 mb-4" />,
      title: "Easy to Use",
      description: "Simple and intuitive interface for searching, adding, or managing properties."
    },
    {
      icon: <FaMobileAlt className="text-6xl text-gradient-to-r from-pink-400 to-pink-600 mb-4" />,
      title: "Mobile Friendly",
      description: "Fully responsive design for smooth experience on mobile and tablet devices."
    },
    {
      icon: <FaUsers className="text-6xl text-gradient-to-r from-purple-400 to-purple-600 mb-4" />,
      title: "Community Support",
      description: "Join a large community of buyers, sellers, and real estate enthusiasts."
    },
    {
      icon: <FaClock className="text-6xl text-gradient-to-r from-red-400 to-red-600 mb-4" />,
      title: "Quick Updates",
      description: "Stay updated with the latest property listings and instant notifications."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          Why Choose Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg md:text-xl">
          Discover why thousands of users trust HomeNest for their real estate needs.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white/90 dark:bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-lg dark:shadow-gray-700 hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500 group"
            >
              <div className="flex flex-col items-center">
                <div className="transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold mt-4 mb-3 text-gray-800 dark:text-gray-100 group-hover:text-indigo-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </div>

              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-100/30 dark:bg-indigo-500/20 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pink-100/20 dark:bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

