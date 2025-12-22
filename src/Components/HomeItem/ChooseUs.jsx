import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaThumbsUp, FaMobileAlt, FaUsers, FaClock } from 'react-icons/fa';

const ChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-5xl text-blue-500 mb-4" />,
      title: "Verified Listings",
      description: "All properties are verified for authenticity so you can trust what you see."
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-500 mb-4" />,
      title: "Secure Transactions",
      description: "We ensure safe and secure communication between buyers and sellers."
    },
    {
      icon: <FaThumbsUp className="text-5xl text-yellow-500 mb-4" />,
      title: "Easy to Use",
      description: "Simple and intuitive interface for searching, adding, or managing properties."
    },
    {
      icon: <FaMobileAlt className="text-5xl text-pink-500 mb-4" />,
      title: "Mobile Friendly",
      description: "Fully responsive design for smooth experience on mobile and tablet devices."
    },
    {
      icon: <FaUsers className="text-5xl text-purple-500 mb-4" />,
      title: "Community Support",
      description: "Join a large community of buyers, sellers, and real estate enthusiasts."
    },
    {
      icon: <FaClock className="text-5xl text-red-500 mb-4" />,
      title: "Quick Updates",
      description: "Stay updated with the latest property listings and instant notifications."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us</h2>
        <p className="text-gray-600 mb-12">
          Discover why thousands of users trust HomeNest for their real estate needs.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-500"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
