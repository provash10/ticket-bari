import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useRole from '../../../Hooks/useRole';
import { useTheme } from '../../../Contexts/ThemeContext';
import Swal from 'sweetalert2';
import {
  FaUserTie, FaPhone, FaEnvelope, FaBuilding, FaMapMarkerAlt,
  FaIdCard, FaFileContract, FaBus, FaSpinner, FaCheckCircle,
  FaClock, FaExclamationTriangle
} from 'react-icons/fa';

const BecomeVendor = () => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm(); 
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useTheme();
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user already has a vendor application
    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (user?.email) {
                try {
                    const res = await axiosSecure.get(`/vendors/status/${user.email}`);
                    setApplicationStatus(res.data.status);
                } catch (error) {
                    // No application found, user can apply
                    setApplicationStatus(null);
                }
                setLoading(false);
            }
        };
        
        checkApplicationStatus();
    }, [user?.email, axiosSecure]);

    const handleVendorApplication = async (data) => {
        try {
            const res = await axiosSecure.post('/vendors', {
                ...data,
                email: user?.email,
                status: 'pending'
            });
            if (res.data.insertedId) {
                setApplicationStatus('pending');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Vendor Application has been submitted. We will review it within 7 days.",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Application Failed",
                text: "Something went wrong. Please try again.",
            });
        }
    }

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <div className="text-center">
                    <FaSpinner className={`animate-spin text-4xl mb-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Checking application status...
                    </p>
                </div>
            </div>
        );
    }

    // If user is already a vendor
    if (role === 'vendor') {
        return (
            <div className={`min-h-screen transition-colors duration-300 p-6 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl text-center ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                        <FaCheckCircle className="text-4xl" />
                    </div>
                    <h1 className={`text-3xl font-bold mb-4 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                        You're Already a Vendor!
                    </h1>
                    <p className={`text-lg mb-6 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Your vendor account is active. You can now manage your tickets and bookings.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/dashboard/add-ticket"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Add New Ticket
                        </a>
                        <a
                            href="/dashboard/my-added-tickets"
                            className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                                isDarkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            My Tickets
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // If user has pending application
    if (applicationStatus === 'pending') {
        return (
            <div className={`min-h-screen transition-colors duration-300 p-6 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl text-center ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                        <FaClock className="text-4xl" />
                    </div>
                    <h1 className={`text-3xl font-bold mb-4 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                        Application Under Review
                    </h1>
                    <p className={`text-lg mb-6 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Your vendor application has been submitted and is currently under review. 
                        We'll notify you within 7 business days.
                    </p>
                    <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                    }`}>
                        <p className={`text-sm ${
                            isDarkMode ? 'text-blue-300' : 'text-blue-700'
                        }`}>
                            <strong>What's next?</strong> Our team will review your application and verify your documents. 
                            You'll receive an email notification once the review is complete.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // If application was rejected
    if (applicationStatus === 'rejected') {
        return (
            <div className={`min-h-screen transition-colors duration-300 p-6 ${
                isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
                <div className={`max-w-2xl mx-auto p-8 rounded-2xl shadow-xl text-center ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                }`}>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                    }`}>
                        <FaExclamationTriangle className="text-4xl" />
                    </div>
                    <h1 className={`text-3xl font-bold mb-4 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                        Application Not Approved
                    </h1>
                    <p className={`text-lg mb-6 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Unfortunately, your vendor application was not approved. 
                        Please contact support for more information or to reapply.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="/contact"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Contact Support
                        </a>
                        <button
                            onClick={() => setApplicationStatus(null)}
                            className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                                isDarkMode 
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Apply Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 p-6 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            {/* Header */}
            <div className={`mb-8 p-6 rounded-2xl shadow-xl ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                        <FaUserTie className="text-3xl" />
                    </div>
                    <div>
                        <h1 className={`text-3xl font-bold ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            Become a Vendor
                        </h1>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Join our platform and start selling tickets
                        </p>
                    </div>
                </div>
            </div>

            {/* Application Form */}
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(handleVendorApplication)} className="space-y-8">
                    
                    {/* Personal Information */}
                    <div className={`p-6 rounded-2xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                    }`}>
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            <div className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                            }`}>
                                <FaUserTie className="text-lg" />
                            </div>
                            Personal Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaUserTie className="inline mr-2" />
                                    Full Name *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('name', { required: true })} 
                                    defaultValue={user?.displayName}
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
                                    <FaPhone className="inline mr-2" />
                                    Phone Number *
                                </label>
                                <input 
                                    type="tel" 
                                    {...register('phone', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaEnvelope className="inline mr-2" />
                                    Email Address *
                                </label>
                                <input 
                                    type="email" 
                                    {...register('email', { required: true })} 
                                    defaultValue={user?.email}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaIdCard className="inline mr-2" />
                                    National ID (NID) *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('nid', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your National ID"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className={`p-6 rounded-2xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                    }`}>
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            <div className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                            }`}>
                                <FaBuilding className="text-lg" />
                            </div>
                            Business Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaBuilding className="inline mr-2" />
                                    Business Name *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('businessName', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your business name"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaBus className="inline mr-2" />
                                    Business Type *
                                </label>
                                <select 
                                    {...register('businessType', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                >
                                    <option value="">Select business type</option>
                                    <option value="Bus">Bus Service</option>
                                    <option value="Train">Train Service</option>
                                    <option value="Launch">Launch Service</option>
                                    <option value="Plane">Airline Service</option>
                                </select>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaMapMarkerAlt className="inline mr-2" />
                                    Business Address *
                                </label>
                                <textarea 
                                    {...register('address', { required: true })} 
                                    rows="3"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your complete business address"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaFileContract className="inline mr-2" />
                                    Trade License Number *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('tradeLicense', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter trade license number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin inline mr-2" />
                                    Submitting Application...
                                </>
                            ) : (
                                <>
                                    <FaUserTie className="inline mr-2" />
                                    Submit Vendor Application
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // Default: Show application form for new users
    return (
        <div className={`min-h-screen transition-colors duration-300 p-6 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            {/* Header */}
            <div className={`mb-8 p-6 rounded-2xl shadow-xl ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
            }`}>
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${
                        isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                        <FaUserTie className="text-3xl" />
                    </div>
                    <div>
                        <h1 className={`text-3xl font-bold ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            Become a Vendor
                        </h1>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Join our platform and start selling tickets
                        </p>
                    </div>
                </div>
            </div>

            {/* Application Form */}
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(handleVendorApplication)} className="space-y-8">
                    
                    {/* Personal Information */}
                    <div className={`p-6 rounded-2xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                    }`}>
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            <div className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                            }`}>
                                <FaUserTie className="text-lg" />
                            </div>
                            Personal Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaUserTie className="inline mr-2" />
                                    Full Name *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('name', { required: true })} 
                                    defaultValue={user?.displayName}
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
                                    <FaPhone className="inline mr-2" />
                                    Phone Number *
                                </label>
                                <input 
                                    type="tel" 
                                    {...register('phone', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaEnvelope className="inline mr-2" />
                                    Email Address *
                                </label>
                                <input 
                                    type="email" 
                                    {...register('email', { required: true })} 
                                    defaultValue={user?.email}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaIdCard className="inline mr-2" />
                                    National ID (NID) *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('nid', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your National ID"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className={`p-6 rounded-2xl shadow-lg ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                    }`}>
                        <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${
                            isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                            <div className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                            }`}>
                                <FaBuilding className="text-lg" />
                            </div>
                            Business Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaBuilding className="inline mr-2" />
                                    Business Name *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('businessName', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your business name"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaBus className="inline mr-2" />
                                    Business Type *
                                </label>
                                <select 
                                    {...register('businessType', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                >
                                    <option value="">Select business type</option>
                                    <option value="Bus">Bus Service</option>
                                    <option value="Train">Train Service</option>
                                    <option value="Launch">Launch Service</option>
                                    <option value="Plane">Airline Service</option>
                                </select>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaMapMarkerAlt className="inline mr-2" />
                                    Business Address *
                                </label>
                                <textarea 
                                    {...register('address', { required: true })} 
                                    rows="3"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 resize-none ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter your complete business address"
                                />
                            </div>
                            
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <FaFileContract className="inline mr-2" />
                                    Trade License Number *
                                </label>
                                <input 
                                    type="text" 
                                    {...register('tradeLicense', { required: true })} 
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } focus:outline-none`}
                                    placeholder="Enter trade license number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin inline mr-2" />
                                    Submitting Application...
                                </>
                            ) : (
                                <>
                                    <FaUserTie className="inline mr-2" />
                                    Submit Vendor Application
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BecomeVendor;
