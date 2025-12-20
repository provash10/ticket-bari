import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    const handleMakeUser = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} Marked as Admin.`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            })
    }

    const handleRemoveAdmin = user =>{
        const roleInfo = {role: 'user'}
         axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} Remove from Admin.`,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            })
    }
    return (
        <div>
            <h3> Users : {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr>
                                <td>
                                    {index + 1}
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.role}
                                </td>

                                <td>
                                    {user.role === 'admin' ?
                                        <button onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-700'>
                                            <FiShieldOff />
                                            
                                        </button>
                                        :
                                        <button onClick={()=>handleMakeUser(user)} className='btn bg-green-700'>
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    }

                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UsersManagement;