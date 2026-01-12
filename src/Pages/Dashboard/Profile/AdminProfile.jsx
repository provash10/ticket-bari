import {
  FaEnvelope,
  FaEdit,
  FaUserCircle,
  FaCrown,
  FaCog,
  FaCheckCircle,
  FaUserShield,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const AdminProfile = ({ user, role }) => {
  return (
    <div
      className="
        min-h-screen transition-all duration-300
        bg-gradient-to-br
        from-red-50 via-pink-50 to-rose-50
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      "
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div
          className="
            rounded-2xl shadow-xl mb-8 p-6 backdrop-blur-sm border
            bg-white/90 border-white/20
            dark:bg-gray-800/90 dark:border-gray-700
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                p-3 rounded-xl
                bg-red-100 text-red-600
                dark:bg-red-500/20 dark:text-red-400
              "
            >
              <FaCrown className="text-2xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Admin Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                System Administration Panel
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="
            rounded-2xl shadow-xl overflow-hidden border
            bg-white/90 border-white/20
            dark:bg-gray-800/90 dark:border-gray-700
          "
        >
          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-red-500 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute top-4 right-4 opacity-20">
              <FaShieldAlt className="text-6xl text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <FaUserCircle className="text-7xl text-red-500 mb-2" />

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {user?.name || "Admin User"}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {role || "Administrator"}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaEnvelope className="text-red-500" />
                <span>{user?.email || "admin@email.com"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaUserShield className="text-red-500" />
                <span>Full Access</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaLock className="text-red-500" />
                <span>Secure Account</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaCheckCircle className="text-green-500" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
              p-6 border-t flex gap-4
              border-gray-200
              dark:border-gray-700
            "
          >
            <Link
              to="/dashboard/settings"
              className="
                px-4 py-2 rounded-lg
                bg-red-500 hover:bg-red-600
                text-white flex items-center gap-2
              "
            >
              <FaCog /> Settings
            </Link>

            <button
              className="
                px-4 py-2 rounded-lg border
                border-gray-300 text-gray-700
                dark:border-gray-600 dark:text-gray-300
                flex items-center gap-2
              "
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
