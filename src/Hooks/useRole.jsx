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
            
            try{
                const res =await axiosSecure.get(`/users/${user.email}/role`);
            console.log('in the useRole', res.data);
            return res.data?.role || 'user';
            }
            catch(error){
                console.error(error);
                return 'user';
            }
        },
         enabled: !loading && !!user?.email,
         retry: 1
    })
    
    return {role, isLoading}
};

export default useRole;