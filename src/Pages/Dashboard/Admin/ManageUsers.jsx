import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';


import {
  FaUser,
  FaUserShield,
  FaUserTie,
  FaUserSlash,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaEye,
  FaSpinner,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaChartPie,
  FaBan,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
  FaShieldAlt
} from 'react-icons/fa';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showFraudOnly, setShowFraudOnly] = useState(false);

  // fetch all users
  const {
    data: usersData,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['admin-users', filterRole, showFraudOnly],
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

  // filter fraud -vendors 
  const filteredUsers = showFraudOnly
    ? users.filter(user => user.isFraudulent)
    : users;

  // mutationrole update
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
        showConfirmButton: false,
        timer: 2000
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: error.response?.data?.message || 'Something went wrong'
      });
    }
  });

  // mutation fraud mark
  const markFraudMutation = useMutation({
    mutationFn: async ({ userId, isFraudulent }) => {
      const res = await axiosSecure.patch(`/users/${userId}/fraud`, { isFraudulent });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['admin-users']);
      Swal.fire({
        icon: data.message.includes('marked as fraud') ? 'warning' : 'success',
        title: data.message.includes('marked as fraud') ? 'Vendor Marked as Fraud!' : 'Fraud Status Removed!',
        html: `
          <div class="text-left">
            <p>${data.message}</p>
            ${data.ticketsHidden > 0 ? 
              `<p class="mt-2 text-red-600"><strong>${data.ticketsHidden} tickets</strong> have been hidden from the platform.</p>` 
              : ''}
          </div>
        `,
        confirmButtonText: 'OK'
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed!',
        text: error.response?.data?.message || 'Something went wrong'
      });
    }
  });

  const handleRoleUpdate = (userId, currentRole, newRole, userName) => {
    if (currentRole === newRole) {
      Swal.fire({
        icon: 'info',
        title: 'Same Role!',
        text: `User is already a ${newRole}`,
        timer: 1500
      });
      return;
    }

    Swal.fire({
      title: `Change Role?`,
      html: `Change <strong>${userName}</strong> from <span class="badge badge-${getRoleBadgeColor(currentRole)}">${currentRole}</span> to <span class="badge badge-${getRoleBadgeColor(newRole)}">${newRole}</span>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, make ${newRole}`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ userId, role: newRole });
      }
    });
  };

  const handleMarkFraud = (userId, userName, isCurrentlyFraud) => {
    const action = isCurrentlyFraud ? 'remove from fraud' : 'mark as fraud';
    
    Swal.fire({
      title: `${isCurrentlyFraud ? 'Remove Fraud Status?' : 'Mark as Fraud?'}`,
      html: `
        <div class="text-left">
          <p>You are about to <strong>${action}</strong> for vendor:</p>
          <p class="font-bold text-lg my-2">${userName}</p>
          ${!isCurrentlyFraud ? `
            <div class="alert alert-warning mt-3">
              <FaExclamationTriangle class="inline mr-2" />
              <strong>Warning:</strong> This will:
              <ul class="list-disc pl-5 mt-1">
                <li>Hide all tickets from this vendor</li>
                <li>Prevent vendor from adding new tickets</li>
                <li>Mark vendor profile as fraudulent</li>
              </ul>
            </div>
          ` : ''}
        </div>
      `,
      icon: isCurrentlyFraud ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyFraud ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        markFraudMutation.mutate({ 
          userId, 
          isFraudulent: !isCurrentlyFraud 
        });
      }
    });
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { 
        color: 'badge-success', 
        icon: <FaUserShield className="mr-1" />,
        text: 'Admin'
      },
      vendor: { 
        color: 'badge-info', 
        icon: <FaUserTie className="mr-1" />,
        text: 'Vendor'
      },
      user: { 
        color: 'badge-primary', 
        icon: <FaUser className="mr-1" />,
        text: 'User'
      }
    };

    const badge = badges[role] || badges.user;
    
    return (
      <span className={`badge ${badge.color} gap-1`}>
        {badge.icon}
        {badge.text}
      </span>
    );
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'success',
      vendor: 'info',
      user: 'primary'
    };
    return colors[role] || 'primary';
  };

  // loading state
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <FaSpinner className="animate-spin text-6xl text-primary mb-4" />
        <p className="text-xl text-gray-600">Loading Users...</p>
        <p className="text-gray-500">Fetching user data from database</p>
      </div>
    );
  }

  // error
  if (isError) {
    return (
      <div className="text-center py-20">
        <div className="alert alert-error max-w-lg mx-auto shadow-lg">
          <FaTimesCircle className="text-3xl" />
          <div>
            <h3 className="font-bold">Failed to Load Users!</h3>
            <div className="text-sm">Please check your connection</div>
          </div>
          <button onClick={() => refetch()} className="btn btn-sm btn-outline btn-error">
            <FaSync className="mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* header */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FaUsers className="text-3xl text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                User Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage user roles and permissions
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="stat">
              <div className="stat-title text-gray-600">Total Users</div>
              <div className="stat-value text-primary">{stats.total}</div>
              <div className="stat-desc">Across the platform</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-success">
                <FaUserShield className="text-2xl" />
              </div>
              <div className="stat-title">Admins</div>
              <div className="stat-value">{stats.admins}</div>
              <div className="stat-desc">Platform administrators</div>
            </div>
          </div>

          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-info">
                <FaUserTie className="text-2xl" />
              </div>
              <div className="stat-title">Vendors</div>
              <div className="stat-value">{stats.vendors}</div>
              <div className="stat-desc">Ticket providers</div>
            </div>
          </div>

          <div className="stats shadow bg-white">
            <div className="stat">
              <div className="stat-figure text-primary">
                <FaUser className="text-2xl" />
              </div>
              <div className="stat-title">Users</div>
              <div className="stat-value">{stats.users}</div>
              <div className="stat-desc">Regular customers</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaSearch className="text-gray-500" />
                Search Users
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                Filter by Role
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins Only</option>
              <option value="vendor">Vendors Only</option>
              <option value="user">Users Only</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Fraud Status</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  className="toggle toggle-warning"
                  checked={showFraudOnly}
                  onChange={(e) => setShowFraudOnly(e.target.checked)}
                />
                <span className="flex items-center gap-1">
                  <FaExclamationTriangle className="text-warning" />
                  Show Fraud Vendors Only
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {filterRole !== 'all' && (
            <span className="badge badge-info gap-1">
              <FaFilter />
              Role: {filterRole}
            </span>
          )}
          {searchTerm && (
            <span className="badge badge-info gap-1">
              <FaSearch />
              Search: "{searchTerm}"
            </span>
          )}
          {showFraudOnly && (
            <span className="badge badge-warning gap-1">
              <FaExclamationTriangle />
              Fraud Vendors Only
            </span>
          )}
          <span className="badge badge-neutral">
            Showing: {filteredUsers.length} users
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {showFraudOnly
                ? "No fraudulent vendors found. That's a good sign!"
                : "No users match your search criteria. Try adjusting your filters."}
            </p>
            <button
              onClick={() => {
                setFilterRole('all');
                setSearchTerm('');
                setShowFraudOnly(false);
              }}
              className="btn btn-primary gap-2"
            >
              <FaSync />
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaUser />
                        User Details
                      </div>
                    </th>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt />
                        Role
                      </div>
                    </th>
                    <th className="font-bold text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaUserCheck />
                        Make Admin/Vendor
                      </div>
                    </th>
                    <th className="font-bold text-gray-700 text-center">
                      <div className="flex items-center gap-2">
                        <FaUserTimes />
                        Fraud Actions
                      </div>
                    </th>
                    <th className="font-bold text-gray-700 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td>
                        <div className="flex items-center space-x-4">
                          <div className="avatar">
                            <div className="mask mask-circle w-14 h-14">
                              <img
                                src={user.image || "https://via.placeholder.com/150"}
                                alt={user.name}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-lg">{user.name}</div>
                            <div className="text-gray-600">{user.email}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Joined: {new Date(user.created_at).toLocaleDateString()}
                            </div>
                            {user.isFraudulent && (
                              <div className="mt-2">
                                <span className="badge badge-error gap-1">
                                  <FaExclamationTriangle />
                                  FRAUD VENDOR
                                </span>
                                {user.fraudMarkedAt && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Marked: {new Date(user.fraudMarkedAt).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* role Column */}
                      <td>
                        <div className="flex flex-col gap-2">
                          {getRoleBadge(user.role)}
                          {user.updatedAt && (
                            <div className="text-xs text-gray-500">
                              Updated: {new Date(user.updatedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-col gap-2">

                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleRoleUpdate(user._id, user.role, 'admin', user.name)}
                              className="btn btn-success btn-sm gap-2"
                              disabled={updateRoleMutation.isLoading}
                            >
                              {updateRoleMutation.isLoading ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaUserShield />
                              )}
                              Make Admin
                            </button>
                          )}

                          {user.role !== 'vendor' && (
                            <button
                              onClick={() => handleRoleUpdate(user._id, user.role, 'vendor', user.name)}
                              className="btn btn-info btn-sm gap-2"
                              disabled={updateRoleMutation.isLoading}
                            >
                              {updateRoleMutation.isLoading ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaUserTie />
                              )}
                              Make Vendor
                            </button>
                          )}

                          {(user.role === 'admin' || user.role === 'vendor') && (
                            <button
                              onClick={() => handleRoleUpdate(user._id, user.role, 'user', user.name)}
                              className="btn btn-primary btn-sm gap-2"
                              disabled={updateRoleMutation.isLoading}
                            >
                              {updateRoleMutation.isLoading ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaUser />
                              )}
                              Make Regular User
                            </button>
                          )}
                        </div>
                      </td>

                      <td>
                        {user.role === 'vendor' ? (
                          <div className="flex justify-center">
                            {user.isFraudulent ? (
                              <button
                                onClick={() => handleMarkFraud(user._id, user.name, true)}
                                className="btn btn-success btn-sm gap-2"
                                disabled={markFraudMutation.isLoading}
                              >
                                {markFraudMutation.isLoading ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  <FaCheckCircle />
                                )}
                                Remove Fraud Mark
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkFraud(user._id, user.name, false)}
                                className="btn btn-error btn-sm gap-2"
                                disabled={markFraudMutation.isLoading}
                              >
                                {markFraudMutation.isLoading ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  <FaBan />
                                )}
                                Mark as Fraud
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <FaTimesCircle className="inline mr-1" />
                            N/A for {user.role}s
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/dashboard/profile`}
                            className="btn btn-outline btn-sm gap-2"
                          >
                            <FaEye />
                            View Profile
                          </Link>

                          {user.role === 'vendor' && (
                            <button
                              className="btn btn-outline btn-sm gap-2"
                              onClick={() => {
                              
                                Swal.fire({
                                  title: 'Vendor Tickets',
                                  text: `Viewing tickets for ${user.name}`,
                                  icon: 'info'
                                });
                              }}
                            >
                              <FaEye />
                              View Tickets
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-600 mb-2 md:mb-0">
                  Showing <span className="font-bold">{filteredUsers.length}</span> of{" "}
                  <span className="font-bold">{stats.total}</span> users
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="badge badge-success mr-2">{stats.admins}</span>
                    Admins
                  </div>
                  <div className="text-sm">
                    <span className="badge badge-info mr-2">{stats.vendors}</span>
                    Vendors
                  </div>
                  <div className="text-sm">
                    <span className="badge badge-primary mr-2">{stats.users}</span>
                    Users
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaShieldAlt className="text-2xl text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-800 text-lg mb-2">Admin Guide</h3>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-start gap-2">
                <FaUserShield className="text-green-500 mt-1" />
                <span><strong>Make Admin:</strong> Grant full platform access and management permissions</span>
              </li>
              <li className="flex items-start gap-2">
                <FaUserTie className="text-blue-500 mt-1" />
                <span><strong>Make Vendor:</strong> Allow user to add and sell tickets</span>
              </li>
              <li className="flex items-start gap-2">
                <FaBan className="text-red-500 mt-1" />
                <span><strong>Mark as Fraud:</strong> Hide all vendor tickets and prevent new additions</span>
              </li>
              <li className="flex items-start gap-2">
                <FaExclamationTriangle className="text-yellow-500 mt-1" />
                <span>Fraud marking is <strong>irreversible</strong> without admin action</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;