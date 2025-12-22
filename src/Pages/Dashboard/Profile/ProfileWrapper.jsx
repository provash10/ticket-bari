import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../LoaderPage/LoadingSpinner";
import UserProfile from "./UserProfile";
import VendorProfile from "./VendorProfile";
import AdminProfile from "./AdminProfile";

const ProfileWrapper = () => {
    const { user } = useAuth();
    const { role, isLoading } = useRole();
    
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Please login to view profile</p>
                </div>
            </div>
        );
    }

    switch(role) {
        case 'admin':
            return <AdminProfile user={user} role={role} />;
        case 'vendor':
            return <VendorProfile user={user} role={role} />;
        case 'user':
            return <UserProfile user={user} role={role} />;
        default:
            return <UserProfile user={user} role={role} />;
    }
};

export default ProfileWrapper;