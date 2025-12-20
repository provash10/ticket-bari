import React from 'react';
import useAuth from '../../Hooks/useAuth';


const UserProfile = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <p>Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default UserProfile;
