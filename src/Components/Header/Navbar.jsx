import React from "react";
import { MdEmojiTransportation } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useTheme } from "../../Contexts/ThemeContext";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // common links
  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-tickets">All Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/become-vendor">Become Vendor</NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      {/* <li>
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </li> */}
    </>
  );

  return (
    <header className="navbar-wrapper">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          <Link to="/" className="brand">
            <MdEmojiTransportation size={22} />
            <span>Ticket Bari</span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-3">
          {/* theme toggle */}
          <input
            type="checkbox"
            className="toggle"
            onChange={toggleTheme}
            checked={isDarkMode}
          />

          {!user ? (
            <Link to="/auth/login" className="btn btn-primary rounded-full">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="profile" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold text-sm px-2">
                  {user.displayName || "User"}
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
