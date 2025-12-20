// import React from 'react';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useRole = () => {
//     const {user, loading} = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const {data: role, isLoading: isRoleLoading} = useQuery({
//         // enabled: !loading && user?.email,
//          enabled: !loading && !!user?.email ,
//         queryKey: ['role', user?.email],
//         queryFn: async () => {
//             // const {data} = await axiosSecure(`/user/role/${user?.email}`)
//             const {data} = await axiosSecure(`/user/role`)
//             return data.role
//         },
            
//     })
//     // return {role, isRoleLoading}
//     return [role, isRoleLoading]
// }

// export default useRole;

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: isRoleLoading } = useQuery({
      
        enabled: !loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async () => {
          
            const { data } = await axiosSecure.get(`/user/role`);
            console.log('Role from server:', data.role);
            return data.role;
        },
      
        retry: false 
    });

    return [role, isRoleLoading];
};

export default useRole;