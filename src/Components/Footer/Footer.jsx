
import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          

          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">TicketBari</h2>
            </div>
            <p className="text-gray-300 text-sm">
              Book bus, train, launch & flight tickets easily with our platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/all-tickets" className="text-gray-300 hover:text-white">All Tickets</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">support@ticketbari.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaFacebook className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">/ticketbari</span>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white text-black text-xs font-bold py-2 px-1 rounded text-center">Stripe</div>
              <div className="bg-blue-600 text-white text-xs font-bold py-2 px-1 rounded text-center">VISA</div>
              <div className="bg-red-600 text-white text-xs font-bold py-2 px-1 rounded text-center">Master</div>
              <div className="bg-green-600 text-white text-xs font-bold py-2 px-1 rounded text-center">bKash</div>
              <div className="bg-red-700 text-white text-xs font-bold py-2 px-1 rounded text-center">Nagad</div>
              <div className="bg-blue-500 text-white text-xs font-bold py-2 px-1 rounded text-center">PayPal</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">© 2025 TicketBari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;