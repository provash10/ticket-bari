import React, { useState } from 'react';
import { useTheme } from '../../Contexts/ThemeContext';
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronUp,
  FaTicketAlt,
  FaCreditCard,
  FaHeadset,
  FaShieldAlt
} from 'react-icons/fa';

const FAQ = () => {
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Booking",
      icon: FaTicketAlt,
      questions: [
        {
          question: "How do I book a ticket on Ticket Bari?",
          answer: "Simply search for your destination, select your preferred ticket, fill in passenger details, and complete the payment. You'll receive your e-ticket instantly via email."
        },
        {
          question: "Can I cancel or modify my booking?",
          answer: "Yes, you can cancel or modify your booking up to 2 hours before departure. Cancellation charges may apply based on the operator's policy."
        },
        {
          question: "How far in advance can I book tickets?",
          answer: "You can book tickets up to 30 days in advance. We recommend booking early to get the best prices and seat availability."
        }
      ]
    },
    {
      category: "Payment",
      icon: FaCreditCard,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), and bank transfers. All payments are processed securely."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely! We use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is completely secure."
        },
        {
          question: "What if my payment fails?",
          answer: "If your payment fails, the amount will be automatically refunded to your account within 3-5 business days. You can try booking again with a different payment method."
        }
      ]
    },
    {
      category: "Support",
      icon: FaHeadset,
      questions: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach our 24/7 customer support via phone, email, or live chat. We're always here to help with any questions or issues."
        },
        {
          question: "What if I face issues during my journey?",
          answer: "Contact our support team immediately. We'll coordinate with the transport operator to resolve any issues and ensure your comfort."
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) => 
    category.questions.map((q, qIndex) => ({
      ...q,
      category: category.category,
      icon: category.icon,
      id: `${categoryIndex}-${qIndex}`
    }))
  );

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <FaQuestionCircle className="text-2xl" />
            </div>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Frequently Asked Questions
            </h2>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Find answers to common questions about booking, payments, and our services
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {faqs.map((category, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600 hover:border-blue-400' 
                  : 'bg-white border-gray-200 hover:border-blue-400'
              } hover:shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-2">
                <category.icon className={`text-xl ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {category.category}
                </h3>
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {category.questions.length} questions
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {allQuestions.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-white border-gray-200'
              } hover:shadow-lg`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <faq.icon className="text-sm" />
                  </div>
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-wide ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {faq.category}
                    </span>
                    <h3 className={`font-semibold text-lg ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className={`p-2 rounded-full transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                } ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <FaChevronDown />
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className={`pl-12 pt-4 border-t ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-200'
                  }`}>
                    <p className={`leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className={`mt-12 p-8 rounded-2xl text-center ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
        }`}>
          <FaHeadset className={`text-4xl mx-auto mb-4 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <h3 className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Still have questions?
          </h3>
          <p className={`mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our friendly support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801234567890"
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Call Support
            </a>
            <a
              href="mailto:support@ticketbari.com"
              className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900' 
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;