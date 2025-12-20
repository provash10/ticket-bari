import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { imageUpload } from '../../../Utils/index';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../../../LoaderPage/LoadingSpinner';

const AddTicket = () => {
    const { user } = useAuth();

    const { mutateAsync, isPending, isError, reset: mutationReset } = useMutation({
        mutationFn: async (payload) => {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/tickets`,
                payload
            );
            return res.data;
        },
        onSuccess: data => {
            console.log(data);
            toast.success("Ticket added successfully");
            mutationReset();
        },
        onError: error => {
            console.log(error);
            toast.error("Failed to add ticket");
        },
        onMutate: payload => {
            console.log('Posting this data--->', payload);
        },
        onSettled: (data, error) => {
            console.log('From onSettled--->', data);
            if (error) console.log(error);
        },
        retry: 3,
    });

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
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
                status: "approved",  // ডিফল্ট
                vendor: {
                    image: user?.photoURL,
                    name: user?.displayName,
                    email: user?.email,
                },
                createdAt: new Date().toISOString()  // নতুন ticket creation time
            };

            reset();  // form reset
            await mutateAsync(ticketData);  // server-এ post
        } catch (error) {
            console.error(error);
            toast.error("Failed to add ticket. Please try again.");
        }
    };

    if (isPending) return <LoadingSpinner />;
    if (isError) return <div>Error occurred while adding ticket.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Ticket Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="input w-full border border-gray-300 rounded p-2"
                        placeholder="Enter ticket title"
                    />
                    {errors.title && <p className="text-red-600">Ticket title is required</p>}
                </div>

                {/* From & To */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">From</label>
                        <input
                            type="text"
                            {...register("from", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.from && <p className="text-red-600">From location is required</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">To</label>
                        <input
                            type="text"
                            {...register("to", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.to && <p className="text-red-600">To location is required</p>}
                    </div>
                </div>

                {/* Transport Type & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Transport Type</label>
                        <select
                            {...register("transportType", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                        >
                            <option value="">Select Transport Type</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Launch">Launch</option>
                            <option value="Plane">Plane</option>
                        </select>
                        {errors.transportType && <p className="text-red-600">Transport type is required</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Price (per unit)</label>
                        <input
                            type="number"
                            {...register("price", { required: true, min: 0 })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.price && <p className="text-red-600">Price is required</p>}
                    </div>
                </div>

                {/* Quantity & Departure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Ticket Quantity</label>
                        <input
                            type="number"
                            {...register("quantity", { required: true, min: 1 })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.quantity && <p className="text-red-600">Quantity is required</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Departure Date & Time</label>
                        <input
                            type="datetime-local"
                            {...register("departure", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                        />
                        {errors.departure && <p className="text-red-600">Departure is required</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Total Price</label>
                        <input
                            type="number"
                            value={
                                (Number(watch("price")) || 0) * (Number(watch("quantity")) || 0)
                            }
                            className="input w-full border border-gray-300 rounded p-2 bg-gray-100"
                            disabled
                        />
                    </div>
                </div>

                {/* Perks */}
                <div>
                    <label className="block font-semibold mb-1">Perks</label>
                    <div className="flex flex-wrap gap-4">
                        {["AC", "Breakfast", "WiFi", "Meal"].map((perk) => (
                            <label key={perk} className="flex items-center gap-2">
                                <input type="checkbox" {...register("perks")} value={perk} />
                                {perk}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="p-4 w-full rounded-lg">
                    <label className="block font-semibold mb-2">Ticket Image</label>
                    <div className="border-4 border-dotted border-gray-300 rounded-lg py-6 text-center">
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                {...register("image", { required: "Image is required" })}
                            />
                            <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                Upload Image
                            </div>
                        </label>
                        {errors.image && <p className="text-red-600 text-sm mt-2">{errors.image.message}</p>}
                    </div>
                </div>

                {/* Vendor Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Vendor Name</label>
                        <input value={user?.displayName} type="text" className="input w-full border border-gray-300 rounded p-2 bg-gray-100" disabled />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Vendor Email</label>
                        <input value={user?.email} type="text" className="input w-full border border-gray-300 rounded p-2 bg-gray-100" disabled />
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                        {isPending ? "Adding..." : "Save & Continue"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTicket;
