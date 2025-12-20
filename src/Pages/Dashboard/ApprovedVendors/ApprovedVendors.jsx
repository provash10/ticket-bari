import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserCheck } from 'react-icons/fa';
import { MdDeleteForever, MdPersonRemoveAlt1 } from 'react-icons/md';
import Swal from 'sweetalert2';

const ApprovedVendors = () => {
    const axiosSecure = useAxiosSecure();
    const { data: vendors = [],refetch } = useQuery({
        queryKey: ['vendors', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendors');
            return res.data;
        }
    })

    const updateVendorStatus = (vendor, status) =>{
        const updateInfo = { status: status, email: vendor.email }
        axiosSecure.patch(`/vendors/${vendor._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Vendor has been ${status}.` ,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            })
    }

    const handleApproval = vendor => {
        updateVendorStatus(vendor, 'approved');
    }
    const handleRejection = vendor =>{
        updateVendorStatus(vendor, 'rejected');
    }
    const handleDelete = vendor =>{
        updateVendorStatus(vendor, 'deleted');
    }
    return (
        <div>
            <h2 className='text-3xl'>Vendors Pending Approval : {vendors.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            {/* <th>Business Name</th>
        <th>Address</th> */}
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor, index) => (
                            <tr key={vendor._id}>
                                <th>{index + 1}</th>
                                <td>{vendor.name}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.phone}</td>
                                {/* <td>{vendor.businessName}</td> */}
                                {/* <td>{vendor.address}</td>  */}
                                {/* <td>{vendor.status}</td> */}
                                <td>
                                    <p className={`${vendor.status === 'approved' ?
                                        'text-green-800' : 'text-red-500'}`}>{vendor.status}</p>
                                </td>
                                <td>
                                    <button onClick={() => handleApproval(vendor)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleRejection(vendor)} className='btn'>
                                        <MdPersonRemoveAlt1 />
                                    </button>
                                    <button onClick={() => handleDelete(vendor)} className='btn'>
                                        <MdDeleteForever />
                                    </button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedVendors;