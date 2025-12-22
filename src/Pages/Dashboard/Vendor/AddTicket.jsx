import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { imageUpload } from '../../../Utils/index';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../../../LoaderPage/LoadingSpinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddTicket = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
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
                perks: data.perks || [],
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

    // watch values for real-time cal
    const currentPrice = watch("price") || 0;
    const currentQuantity = watch("quantity") || 0;
    const totalPrice = currentPrice * currentQuantity;
    const selectedImage = watch("image");

    if (isPending) return <LoadingSpinner />;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block font-semibold mb-1">Ticket Title *</label>
                    <input
                        type="text"
                        {...register("title", { required: "Ticket title is required" })}
                        className="input w-full border border-gray-300 rounded p-2"
                        placeholder="Enter ticket title"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">From *</label>
                        <input
                            type="text"
                            {...register("from", { required: "From location is required" })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="e.g., Dhaka"
                        />
                        {errors.from && <p className="text-red-600 text-sm mt-1">{errors.from.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">To *</label>
                        <input
                            type="text"
                            {...register("to", { required: "To location is required" })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="e.g., Chittagong"
                        />
                        {errors.to && <p className="text-red-600 text-sm mt-1">{errors.to.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Transport Type *</label>
                        <select
                            {...register("transportType", { required: "Transport type is required" })}
                            className="input w-full border border-gray-300 rounded p-2"
                        >
                            <option value="">Select Transport Type</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Launch">Launch</option>
                            <option value="Plane">Plane</option>
                        </select>
                        {errors.transportType && <p className="text-red-600 text-sm mt-1">{errors.transportType.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Price (per unit) *</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register("price", { 
                                required: "Price is required",
                                min: { value: 0, message: "Price must be positive" }
                            })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="e.g., 500"
                        />
                        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Ticket Quantity *</label>
                        <input
                            type="number"
                            min="1"
                            {...register("quantity", { 
                                required: "Quantity is required",
                                min: { value: 1, message: "Quantity must be at least 1" }
                            })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="e.g., 10"
                        />
                        {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Departure Date & Time *</label>
                        <input
                            type="datetime-local"
                            {...register("departure", { required: "Departure is required" })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.departure && <p className="text-red-600 text-sm mt-1">{errors.departure.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-1">Total Price (Auto)</label>
                    <input
                        type="text"
                        value={`$${totalPrice.toFixed(2)}`}
                        className="input w-full border border-gray-300 rounded p-2 bg-gray-100 font-bold"
                        disabled
                        readOnly
                    />
                    <p className="text-sm text-gray-500 mt-1">Price × Quantity = Total</p>
                </div>

                {/* Perks */}
                <div>
                    <label className="block font-semibold mb-1">Perks (Optional)</label>
                    <div className="flex flex-wrap gap-4">
                        {["AC", "Breakfast", "WiFi", "Meal"].map((perk) => (
                            <label key={perk} className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    {...register("perks")} 
                                    value={perk}
                                    className="checkbox checkbox-sm"
                                />
                                <span>{perk}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="p-4 w-full rounded-lg">
                    <label className="block font-semibold mb-2">Ticket Image *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg py-8 text-center hover:border-blue-400 transition">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                {...register("image", { required: "Image is required" })}
                            />
                            <div className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer transition">
                                {selectedImage?.[0] ? selectedImage[0].name : "Upload Image"}
                            </div>
                        </label>
                        <p className="text-sm text-gray-500 mt-2">
                            {selectedImage?.[0] ? `Selected: ${selectedImage[0].name}` : "Click to upload ticket image"}
                        </p>
                        {errors.image && <p className="text-red-600 text-sm mt-2">{errors.image.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Vendor Name</label>
                        <input 
                            value={user?.displayName || user?.email?.split('@')[0] || 'Unknown'} 
                            type="text" 
                            className="input w-full border border-gray-300 rounded p-2 bg-gray-100" 
                            disabled 
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Vendor Email</label>
                        <input 
                            value={user?.email || 'No email'} 
                            type="text" 
                            className="input w-full border border-gray-300 rounded p-2 bg-gray-100" 
                            disabled 
                            readOnly
                        />
                    </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                        <strong>Note:</strong> After adding, ticket status will be "pending" until admin approval.
                    </p>
                </div>

                <div className="text-center mt-6">
                    <button 
                        type="submit" 
                        className="btn btn-primary w-full py-3 text-lg font-bold" 
                        disabled={isPending}
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center">
                                <span className="loading loading-spinner loading-sm mr-2"></span>
                                Adding Ticket...
                            </span>
                        ) : "Add Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTicket;