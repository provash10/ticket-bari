import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { useTheme } from '../../../Contexts/ThemeContext';
import {
  FaUser, FaUserShield, FaUserTie, FaSearch, FaFilter,
  FaExclamationTriangle, FaEye, FaSpinner, FaUsers, FaUserCheck,
  FaUserTimes, FaBan, FaCheckCircle, FaTimesCircle,
  FaSync, FaCrown, FaStore, FaUserFriends
} from 'react-icons/fa';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme(); 

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showFraudOnly, setShowFraudOnly] = useState(false);

  // fetch users
  const { data: usersData, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-users', filterRole, showFraudOnly, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/admin/all', {
        params: {
          role: filterRole !== 'all' ? filterRole : undefined,
          search: searchTerm || undefined
        }
      });
      return res.data;
    }
  });

  const users = usersData?.data || [];
  const stats = usersData?.stats || { total: 0, admins: 0, vendors: 0, users: 0 };

  const filteredUsers = showFraudOnly
    ? users.filter(user => user.isFraudulent)
    : users;

  // update role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { role });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['admin-users']);
      Swal.fire({
        icon: 'success',
        title: 'Role Updated!',
        text: data.message,
        timer: 2000,
        showConfirmButton: false
      });
    }
  });

  // mark fraud
  const markFraudMutation = useMutation({
    mutationFn: async ({ userId, isFraudulent }) => {
      const res = await axiosSecure.patch(`/users/${userId}/fraud`, { isFraudulent });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-users']);
    }
  });

  const getRoleBadge = (role) => {
    const map = {
      admin: <span className="badge badge-success"><FaUserShield /> Admin</span>,
      vendor: <span className="badge badge-info"><FaUserTie /> Vendor</span>,
      user: <span className="badge badge-primary"><FaUser /> User</span>
    };
    return map[role] || map.user;
  };

  // loading
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <FaSpinner className="animate-spin text-5xl" />
      </div>
    );
  }

  // error
  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button onClick={refetch} className="btn btn-error gap-2">
          <FaSync /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-colors ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* Header */}
      <div className={`p-6 rounded-2xl mb-6 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaUsers /> User Management
        </h1>
        <p className="text-sm opacity-70">Manage roles & fraud vendors</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Admins</div>
          <div className="stat-value">{stats.admins}</div>
        </div>
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Vendors</div>
          <div className="stat-value">{stats.vendors}</div>
        </div>
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
        </div>
      </div>

      {/* Table */}
      <div className={`overflow-x-auto rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
              <th>Fraud</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm opacity-70">{user.email}</div>
                </td>
                <td>{getRoleBadge(user.role)}</td>
                <td>
                  <Link to="/dashboard/profile" className="btn btn-sm btn-outline">
                    <FaEye /> View
                  </Link>
                </td>
                <td>
                  {user.role === 'vendor' && (
                    <button
                      onClick={() =>
                        markFraudMutation.mutate({
                          userId: user._id,
                          isFraudulent: !user.isFraudulent
                        })
                      }
                      className={`btn btn-sm ${user.isFraudulent ? 'btn-success' : 'btn-error'}`}
                    >
                      {user.isFraudulent ? <FaCheckCircle /> : <FaBan />}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
