import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const VendorForm = () => {
    const { register, handleSubmit} = useForm(); 
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleVendorApplication = data => {
        console.log(data);
        axiosSecure.post('/vendors', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Vendor Application has been submitted. We will review it within 7 days.",
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            })
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h3 className='text-3xl font-semibold mb-4 text-center'>Vendor Registration</h3>

            <form onSubmit={handleSubmit(handleVendorApplication)} className='space-y-4'>

                <fieldset className="space-y-2 border p-3 rounded">
                    <legend className='font-semibold'>Vendor Details</legend>

                    <input type="text" {...register('name')} defaultValue={user?.displayName} className="input w-full input-sm" placeholder="Vendor Name" />
                    <input type="text" {...register('phone')} className="input w-full input-sm" placeholder="Phone Number" />
                    <input type="email" {...register('email')} defaultValue={user?.email} className="input w-full input-sm" placeholder="Vendor Email" />
                    <input type="text" {...register('businessName')} className="input w-full input-sm" placeholder="Business Name" />
                    <input type="text" {...register('address')} className="input w-full input-sm" placeholder="Business Address" />
                </fieldset>

                <fieldset className="space-y-2 border p-3 rounded">
                    <legend className='font-semibold'>Additional Details</legend>

                    <input type="text" {...register('tradeLicense')} className="input w-full input-sm" placeholder="Trade License Number" />
                    <input type="text" {...register('nid')} className="input w-full input-sm" placeholder="National ID (NID)" />
                    <input type="text" {...register('businessType')} className="input w-full input-sm" placeholder="Business Type (Bus, Train)" />
                </fieldset>

                <button type="submit" className='btn btn-primary w-full text-black'>Apply as a Vendor</button>
            </form>
        </div>
    );
};

export default VendorForm;
