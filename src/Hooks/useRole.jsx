import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoaderPage/LoadingSpinner';

const useRole = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: role = 'user', isLoading} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async()=>{
            
            // Temporary admin override for messi_afa2025@gmail.com ok
            if (user?.email === 'messi_afa2025@gmail.com') {
                return 'admin';
            }
            
            try{
                const res = await axiosSecure.get(`/users/${user.email}/role`);
                return res.data?.role || 'user';
            }
            catch(error){
                // Fallback: try to get all users and find by email
                try {
                    const allUsersRes = await axiosSecure.get('/users');
                    const currentUser = allUsersRes.data?.find(u => u.email === user.email);
                    return currentUser?.role || 'user';
                } catch (fallbackError) {
                    return 'user';
                }
            }
        },
         enabled: !loading && !!user?.email,
         retry: 1
    })
    
    return {role, isLoading}
};

export default useRole;

