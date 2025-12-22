import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaDollarSign,
  FaCalendarAlt,
  FaImage,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaEdit,
  FaArrowLeft,
  FaUpload,
  FaCalculator
} from 'react-icons/fa';
import {
  MdDirectionsBus,
  MdTrain,
  MdDirectionsBoat,
  MdFlight
} from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { imageUpload } from '../../Utils/index';
import LoadingSpinner from '../../LoaderPage/LoadingSpinner';

const UpdateTicket = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();


  const { data: ticket, isLoading: ticketLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // update mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.patch(`/tickets/${id}`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Ticket updated successfully!");
      navigate('/dashboard/my-added-tickets');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update ticket");
    }
  });

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  React.useEffect(() => {
    if (ticket) {
      let formattedDeparture = '';
      if (ticket.departure) {
        const date = new Date(ticket.departure);
        formattedDeparture = date.toISOString().slice(0, 16);
      }

      reset({
        title: ticket.title || '',
        from: ticket.from || '',
        to: ticket.to || '',
        transportType: ticket.transportType || 'Bus',
        price: ticket.price || 0,
        quantity: ticket.quantity || ticket.availableTickets || 1,
        departure: formattedDeparture,
        perks: ticket.perks || []
      });
    }
  }, [ticket, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = ticket?.image;

      // new img upload
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        imageUrl = await imageUpload(imageFile);
      }

      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: Number(data.price),
        quantity: Number(data.quantity),
        totalPrice: Number(data.price) * Number(data.quantity),
        departure: data.departure,
        perks: data.perks || [],
        image: imageUrl,
        vendor: {
          image: user?.photoURL || '',
          name: user?.displayName || user?.email?.split('@')[0],
          email: user?.email,
        }
      };

      await mutateAsync(ticketData);
    } catch (error) {
      toast.error("Failed to update ticket. Please try again.");
    }
  };

  // watch
  const watchedPrice = watch("price");
  const watchedQuantity = watch("quantity");
  
  const currentPrice = typeof watchedPrice === 'number' ? watchedPrice : (ticket?.price || 0);
  const currentQuantity = typeof watchedQuantity === 'number' ? watchedQuantity : (ticket?.quantity || ticket?.availableTickets || 1);
  const totalPrice = currentPrice * currentQuantity;

  // transport icon
  const getTransportIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'bus': return <MdDirectionsBus className="inline mr-2" />;
      case 'train': return <MdTrain className="inline mr-2" />;
      case 'launch': return <MdDirectionsBoat className="inline mr-2" />;
      case 'plane': return <MdFlight className="inline mr-2" />;
      default: return <MdDirectionsBus className="inline mr-2" />;
    }
  };

  // status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FaCheckCircle className="inline mr-1" />;
      case 'pending': return <FaExclamationCircle className="inline mr-1" />;
      case 'rejected': return <FaTimesCircle className="inline mr-1" />;
      default: return <FaExclamationCircle className="inline mr-1" />;
    }
  };

  if (ticketLoading) return <LoadingSpinner />;

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ticket Not Found</h3>
          <button
            onClick={() => navigate('/dashboard/my-added-tickets')}
            className="btn btn-primary gap-2"
          >
            <FaArrowLeft /> Go Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  // check current user-ticket owner
  if (ticket.vendor?.email !== user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h3>
          <p className="text-gray-600 mb-6">You are not authorized to update this ticket.</p>
          <button
            onClick={() => navigate('/dashboard/my-added-tickets')}
            className="btn btn-primary gap-2"
          >
            <FaArrowLeft /> Go Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTicketAlt className="text-4xl text-primary" />
            <h1 className="text-3xl font-bold text-gray-800">Update Ticket</h1>
            <FaEdit className="text-2xl text-blue-500" />
          </div>
          <p className="text-gray-600">Modify your ticket information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold mb-2">{ticket.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    <span>{ticket.from} → {ticket.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTransportIcon(ticket.transportType)}
                    <span>{ticket.transportType}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className={`badge badge-lg ${ticket.status === 'approved' ? 'badge-success' :
                  ticket.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                  {getStatusIcon(ticket.status)}
                  {ticket.status?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaTicketAlt /> Basic Information
              </h3>
              
              <div>
                <label className="block font-medium mb-2 text-gray-700">Ticket Title *</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue={ticket?.title || ''}
                    {...register("title", { required: "Ticket title is required" })}
                    className="input input-bordered w-full pl-10"
                    placeholder="Enter ticket title"
                  />
                  <FaTicketAlt className="absolute left-3 top-3 text-gray-400" />
                </div>
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt /> From *
                  </label>
                  <input
                    type="text"
                    defaultValue={ticket?.from || ''}
                    {...register("from", { required: "From location is required" })}
                    className="input input-bordered w-full"
                    placeholder="Starting location"
                  />
                  {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>}
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt /> To *
                  </label>
                  <input
                    type="text"
                    defaultValue={ticket?.to || ''}
                    {...register("to", { required: "To location is required" })}
                    className="input input-bordered w-full"
                    placeholder="Destination"
                  />
                  {errors.to && <p className="text-red-500 text-sm mt-1">{errors.to.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaBus /> Transport & Pricing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Transport Type *</label>
                  <div className="relative">
                    <select
                      defaultValue={ticket?.transportType || 'Bus'}
                      {...register("transportType", { required: "Transport type is required" })}
                      className="select select-bordered w-full"
                    >
                      <option value="Bus" className="flex items-center gap-2">
                        <MdDirectionsBus /> Bus
                      </option>
                      <option value="Train" className="flex items-center gap-2">
                        <MdTrain /> Train
                      </option>
                      <option value="Launch" className="flex items-center gap-2">
                        <MdDirectionsBoat /> Launch
                      </option>
                      <option value="Plane" className="flex items-center gap-2">
                        <MdFlight /> Plane
                      </option>
                    </select>
                  </div>
                  {errors.transportType && <p className="text-red-500 text-sm mt-1">{errors.transportType.message}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaDollarSign /> Price (per unit) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={ticket?.price || 0}
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                      className="input input-bordered w-full pl-10"
                    />
                    <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>
              </div>

           
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Ticket Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={ticket?.quantity || ticket?.availableTickets || 1}
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" }
                    })}
                    className="input input-bordered w-full"
                  />
                  {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                </div>

                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt /> Departure Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue={ticket?.departure ? new Date(ticket.departure).toISOString().slice(0, 16) : ''}
                    {...register("departure", { required: "Departure is required" })}
                    className="input input-bordered w-full"
                  />
                  {errors.departure && <p className="text-red-500 text-sm mt-1">{errors.departure.message}</p>}
                </div>
              </div>
            </div>

            {/* total price*/}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalculator /> Price Calculation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Price per ticket</span>
                    <FaDollarSign className="text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">${currentPrice.toFixed(2)}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Quantity</span>
                    <FaTicketAlt className="text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{currentQuantity}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg shadow text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span>Total Amount</span>
                    <FaCalculator />
                  </div>
                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  ${currentPrice.toFixed(2)} × {currentQuantity} tickets = <span className="font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            {/* perks */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Perks (Optional)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["AC", "Breakfast", "WiFi", "Meal"].map((perk) => (
                  <label key={perk} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition">
                    <input
                      type="checkbox"
                      defaultChecked={ticket?.perks?.includes(perk)}
                      {...register("perks")}
                      value={perk}
                      className="checkbox checkbox-primary"
                    />
                    <span className="font-medium">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* img upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FaImage /> Ticket Image
              </h3>
              
              {/* current img */}
              {ticket?.image && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Current Image:</p>
                  <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <img
                      src={ticket.image}
                      alt="Current ticket"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* upload image */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    {...register("image")}
                  />
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUpload className="text-2xl text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">Upload New Image</p>
                      <p className="text-sm text-gray-500 mt-1">(Optional - Leave empty to keep current image)</p>
                    </div>
                    <button type="button" className="btn btn-outline btn-primary gap-2">
                      <FaUpload /> Choose File
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {/* vendor*/}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUser /> Vendor Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaUser /> Vendor Name
                  </label>
                  <input
                    value={user?.displayName || user?.email?.split('@')[0] || 'Unknown'}
                    type="text"
                    className="input input-bordered w-full bg-gray-100"
                    disabled
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700 flex items-center gap-2">
                    <FaEnvelope /> Vendor Email
                  </label>
                  <input
                    value={user?.email || 'No email'}
                    type="text"
                    className="input input-bordered w-full bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* ticket status*/}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <FaExclamationCircle /> Important Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Current Status:</span>
                  <div className={`badge ${ticket?.status === 'approved' ? 'badge-success' :
                    ticket?.status === 'pending' ? 'badge-warning' : 'badge-error'} gap-2`}>
                    {getStatusIcon(ticket.status)}
                    {ticket?.status?.toUpperCase() || 'PENDING'}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Available Tickets:</span>
                  <span className="font-bold">{ticket?.availableTickets || 0}</span>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    <FaExclamationCircle className="inline mr-2" />
                    <strong>Note:</strong> After updating this ticket, the status will be reset to "pending" for admin re-verification.
                  </p>
                </div>
              </div>
            </div>

            {/* action btn */}
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/dashboard/my-added-tickets')}
                className="btn btn-outline btn-error flex-1 gap-2"
                disabled={isPending}
              >
                <FaTimesCircle /> Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaEdit /> Update Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTicket;