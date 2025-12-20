import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import LoadingSpinner from '../LoaderPage/LoadingSpinner';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const {user, loading} =useAuth();
    const {role, roleLoading} = useRole();

    if(loading || roleLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;