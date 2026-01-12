import React, { useState } from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaCheckCircle,
  FaBell,
  FaGift,
  FaPercent
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Simulate subscription
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    }, 1000);
  };

  const benefits = [
    {
      icon: FaPercent,
      title: "Exclusive Discounts",
      description: "Get up to 30% off on selected routes"
    },
    {
      icon: FaBell,
      title: "Early Access",
      description: "Be the first to know about new routes"
    },
    {
      icon: FaGift,
      title: "Special Offers",
      description: "Receive personalized travel deals"
    }
  ];

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-full">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Stay Updated
              </h2>
            </div>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and never miss out on amazing travel deals, 
              exclusive discounts, and the latest updates from Ticket Bari.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <benefit.icon className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className={`p-8 rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'
          } backdrop-blur-sm border border-white/20`}>
            {!isSubscribed ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Join 25,000+ Subscribers
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400' 
                          : 'bg-white/90 border-white/30 text-gray-900 placeholder-gray-500 focus:border-white'
                      } focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <FaPaperPlane />
                    Subscribe Now
                  </button>
                </form>

                <p className="text-blue-100 text-sm text-center mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Welcome Aboard! 
                </h3>
                <p className="text-blue-100">
                  You're now subscribed to our newsletter. Check your email for a welcome message!
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="mt-4 text-blue-200 hover:text-white underline text-sm"
                >
                  Subscribe another email
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">25K+</div>
            <div className="text-blue-100 text-sm">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Weekly</div>
            <div className="text-blue-100 text-sm">Updates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">30%</div>
            <div className="text-blue-100 text-sm">Max Discount</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-blue-100 text-sm">Spam Emails</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;