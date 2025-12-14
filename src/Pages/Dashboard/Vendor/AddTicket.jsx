import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddTicket = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        console.log(data);
        toast.success("Ticket data captured (UI only)!");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Ticket</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* ticket title */}
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
                        <label className="block font-semibold mb-1">From (Location)</label>
                        <input
                            type="text"
                            {...register("from", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="From"
                        />
                        {errors.from && <p className="text-red-600">From location is required</p>}
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">To (Location)</label>
                        <input
                            type="text"
                            {...register("to", { required: true })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="To"
                        />
                        {errors.to && <p className="text-red-600">To location is required</p>}
                    </div>
                </div>

                {/* transport type & price */}
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
                            placeholder="Price"
                        />
                        {errors.price && <p className="text-red-600">Price is required</p>}
                    </div>
                </div>

                {/* Ticket Quantity & Departure - date/time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Ticket Quantity</label>
                        <input
                            type="number"
                            {...register("quantity", { required: true, min: 1 })}
                            className="input w-full border border-gray-300 rounded p-2"
                            placeholder="Total tickets available"
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
                        {errors.departure && <p className="text-red-600">Departure date/time is required</p>}
                    </div>
                </div>

                {/* Perks (checkboxes) */}
                <div>
                    <label className="block font-semibold mb-1">Perks</label>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("perks")} value="AC" />
                            AC
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("perks")} value="Breakfast" />
                            Breakfast
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("perks")} value="WiFi" />
                            WiFi
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("perks")} value="Meal" />
                            Meal
                        </label>
                    </div>
                </div>

                {/* image */}
                <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input
                        type="text"
                        {...register("image", { required: true })}
                        className="input w-full border border-gray-300 rounded p-2"
                        placeholder="Enter image URL"
                    />
                    {errors.image && <p className="text-red-600">Image URL is required</p>}
                </div>

                {/* vendor  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Vendor Name</label>
                        <input type="text" className="input w-full border border-gray-300 rounded p-2 bg-gray-100" disabled value="Vendor Name" />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Vendor Email</label>
                        <input type="text" className="input w-full border border-gray-300 rounded p-2 bg-gray-100" disabled value="vendor@example.com" />
                    </div>
                </div>

                
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        {loading ? "Adding..." : "Add Ticket"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTicket;
