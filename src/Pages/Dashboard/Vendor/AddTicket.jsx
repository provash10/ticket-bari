import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useTheme } from '../../../Contexts/ThemeContext';
import { imageUpload } from '../../../Utils/index';
import { useMutation } from '@tanstack/react-query';
import {
  FaBus, FaTrain, FaShip, FaPlane, FaTicketAlt,
  FaSpinner, FaPlus, FaCalculator, FaUpload, 
  FaCheckCircle, FaCamera, FaGift
} from 'react-icons/fa';

const AddTicket = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme();

  const { mutateAsync, isPending, reset: mutationReset } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post('/tickets', payload);
      return res.data;
    },
    onSuccess: (data) => {
      console.log('Ticket added:', data);
      toast.success("Ticket added successfully!");
      mutationReset();
    },
    onError: (error) => {
      console.error('Add ticket error:', error);
      const message = error.response?.data?.message || "Failed to add ticket";
      toast.error(message);
    }
  });

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!data.image || data.image.length === 0) {
        toast.error("Please upload an image");
        return;
      }

      const imageFile = data.image[0];
      const imageUrl = await imageUpload(imageFile);

      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: Number(data.price),
        quantity: Number(data.quantity),
        totalPrice: Number(data.price) * Number(data.quantity),
        departure: data.departure,
        perks: data.perks ? data.perks.split(',').map(perk => perk.trim()).filter(perk => perk) : [],
        image: imageUrl,
        vendor: {
          image: user?.photoURL || '',
          name: user?.displayName || user?.email?.split('@')[0],
          email: user?.email,
        }
      };

      await mutateAsync(ticketData);
      reset(); 
    } catch (error) {
      console.error('Submit error:', error);
      toast.error("Image upload failed or invalid data.");
    }
  };

  const currentPrice = watch("price") || 0;
  const currentQuantity = watch("quantity") || 0;
  const totalPrice = currentPrice * currentQuantity;
  const selectedImage = watch("image");
  const selectedTransport = watch("transportType");

  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <FaBus className={`text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />;
      case 'train': return <FaTrain className={`text-2xl ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />;
      case 'launch': return <FaShip className={`text-2xl ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />;
      case 'plane': return <FaPlane className={`text-2xl ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />;
      default: return <FaTicketAlt className={`text-2xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />;
    }
  };

  if (isPending) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
        <div className="flex flex-col justify-center items-center h-96">
          <FaSpinner className="animate-spin text-6xl mb-4" />
          <p className="text-xl mb-2">Adding Ticket...</p>
          <p>Please wait while we process your ticket</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      <div className="min-h-screen p-4 md:p-6">

        {/* Header */}
        <div className={`mb-8 p-6 rounded-2xl shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-indigo-900 to-purple-900' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}>
                <FaPlus className={`text-3xl ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Add New Ticket</h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Create and submit a new ticket for approval</p>
              </div>
            </div>

            {/* Transport Type Preview */}
            {selectedTransport && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-200'}`}>
                {getTransportIcon(selectedTransport)}
                <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{selectedTransport}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-6xl mx-auto">

          {/* Basic Info */}
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Ticket Title" {...register("title", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
              <input type="text" placeholder="From" {...register("from", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
              <input type="text" placeholder="To" {...register("to", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
            </div>
          </div>

          {/* Transport & Pricing */}
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Transport & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select {...register("transportType")} className={`select select-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                <option value="">Select Transport Type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>
              <input type="number" placeholder="Price" {...register("price", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
              <input type="number" placeholder="Quantity" {...register("quantity", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
              <input type="datetime-local" {...register("departure", { required: true })} className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`} />
            </div>
          </div>

          {/* Image Upload */}
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                <FaCamera className="text-lg" />
              </div>
              Ticket Image
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <FaUpload className="inline mr-2" />
                  Upload Ticket Image *
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  {...register("image", { required: true })} 
                  className={`file-input file-input-bordered w-full ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Supported formats: JPG, PNG, WebP (Max: 5MB)
                </p>
              </div>

              {/* Image Preview */}
              {selectedImage && selectedImage.length > 0 && (
                <div className={`p-4 rounded-lg border-2 border-dashed ${
                  isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                      <FaCheckCircle className="text-lg" />
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Image Selected
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedImage[0]?.name} ({(selectedImage[0]?.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                <FaGift className="text-lg" />
              </div>
              Additional Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Perks & Amenities (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., AC, WiFi, Meal, Entertainment"
                  {...register("perks")} 
                  className={`input input-bordered w-full ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Separate multiple perks with commas
                </p>
              </div>

              {/* Price Summary */}
              {currentPrice > 0 && currentQuantity > 0 && (
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCalculator className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Price Summary
                      </span>
                    </div>
                    <div className={`text-right ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      <p className="text-sm">
                        ৳{currentPrice} × {currentQuantity} tickets
                      </p>
                      <p className="text-lg font-bold">
                        Total: ৳{totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg px-12 py-4 text-lg font-bold shadow-xl hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3"><FaPlus /> Add Ticket</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTicket;
