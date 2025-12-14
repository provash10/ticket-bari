import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
  const { user } = useAuth();
  // const [role] = useRole();
  const { role, isRoleLoading } = useRole();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 overflow-hidden">
        {/* Cover Image */}
        <img
          alt="cover"
          src="image33.png"
          className="w-full h-56 object-cover"
        />

        {/* Profile Card */}
        <div className="flex flex-col items-center p-6 -mt-16">
          <div className="relative w-24 h-24 mb-2">
            <img
              src={user?.photoURL}
              alt="profile"
              className="rounded-full border-4 border-white object-cover w-full h-full"
            />
          </div>

          {/* <span className="text-xs px-3 py-1 rounded-full bg-lime-500 text-white mb-2">
            {role}
          </span> */}
          <span className="text-xs px-3 py-1 rounded-full bg-lime-500 text-white mb-2">
            {role || "user"}
          </span>

          <h2 className="text-lg font-semibold text-gray-800">User ID: {user?.uid}</h2>

          <div className="flex flex-wrap justify-between w-full mt-4 text-sm text-gray-600">
            <div className="flex flex-col mb-2 md:mb-0">
              <span className="text-gray-500">Name</span>
              <span className="font-bold text-gray-800">{user?.displayName}</span>
            </div>

            <div className="flex flex-col mb-2 md:mb-0">
              <span className="text-gray-500">Email</span>
              <span className="font-bold text-gray-800">{user?.email}</span>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <button className="bg-lime-500 hover:bg-lime-700 text-white px-10 py-2 rounded-lg">
                Update Profile
              </button>
              <button className="bg-lime-500 hover:bg-lime-700 text-white px-7 py-2 rounded-lg">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
