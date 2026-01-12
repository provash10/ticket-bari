import { useState } from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaHeadset,
  FaQuestionCircle,
  FaBug,
  FaLightbulb
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone Support",
      details: "+880 1234 567890",
      subtext: "Available 24/7",
      color: "green"
    },
    {
      icon: FaEnvelope,
      title: "Email Support",
      details: "support@ticketbari.com",
      subtext: "Response within 2 hours",
      color: "blue"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office Address",
      details: "123 Gulshan Avenue, Dhaka 1212",
      subtext: "Visit us Mon-Fri 9AM-6PM",
      color: "red"
    },
    {
      icon: FaClock,
      title: "Business Hours",
      details: "24/7 Online Support",
      subtext: "Office: Mon-Fri 9AM-6PM",
      color: "purple"
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: FaQuestionCircle },
    { value: 'support', label: 'Technical Support', icon: FaHeadset },
    { value: 'bug', label: 'Report Bug', icon: FaBug },
    { value: 'feature', label: 'Feature Request', icon: FaLightbulb }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: '#', color: 'bg-blue-600', name: 'Facebook' },
    { icon: FaTwitter, url: '#', color: 'bg-blue-400', name: 'Twitter' },
    { icon: FaInstagram, url: '#', color: 'bg-pink-600', name: 'Instagram' },
    { icon: FaLinkedin, url: '#', color: 'bg-blue-700', name: 'LinkedIn' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const getColorClasses = (color) => {
    const colors = {
      green: isDarkMode ? 'text-green-400 bg-green-500/20' : 'text-green-600 bg-green-100',
      blue: isDarkMode ? 'text-blue-400 bg-blue-500/20' : 'text-blue-600 bg-blue-100',
      red: isDarkMode ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100',
      purple: isDarkMode ? 'text-purple-400 bg-purple-500/20' : 'text-purple-600 bg-purple-100'
    };
    return colors[color] || colors.blue;
  };

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
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white'
                } shadow-lg hover:shadow-xl`}
              >
                <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${
                  getColorClasses(info.color)
                }`}>
                  <info.icon className="text-xl" />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {info.title}
                </h3>
                <p className={`font-semibold mb-1 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {info.details}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {info.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Send us a Message
              </h2>
              <p className={`text-lg mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none`}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    } focus:outline-none`}
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white shadow-lg`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Visit Our Office
              </h2>
              
              {/* Map Placeholder */}
              <div className={`w-full h-64 rounded-2xl mb-6 flex items-center justify-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div className="text-center">
                  <FaMapMarkerAlt className={`text-4xl mb-2 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Interactive Map Coming Soon
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className={`p-6 rounded-2xl mb-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Office Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Monday - Friday
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Saturday
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Sunday
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Closed
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      Online Support
                    </span>
                    <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 rounded-lg ${social.color} text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`}
                      title={social.name}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Can't find what you're looking for? Check out our comprehensive FAQ section.
          </p>
          <a
            href="/#faq"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            <FaQuestionCircle />
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;