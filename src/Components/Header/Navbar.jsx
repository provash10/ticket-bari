import React from 'react';
import { MdEmojiTransportation } from 'react-icons/md';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const {user, logOut} = useAuth();
   const navigate = useNavigate();
    // const location = useLocation();
    // console.log('after logout', location);

  const handleLogOut=()=>{
    logOut()
    .then(result=>{
      toast.success("LogOut successful !!");
      console.log(result.user)
      //  navigate(location?.state || '/');
      navigate('/');
    })
    .catch(error=>{
      console.log(error)
    })
  }

    const links = (
    <>
    {/* <NavLink to="/" className={({ isActive }) => isActive ? "font-bold active" : "font-bold"}>Home</NavLink>
    <NavLink to="/all-tickets" className={({ isActive }) => isActive ? "font-bold active" : "font-bold"}>All Tickets</NavLink>
    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "font-bold active" : "font-bold"}>Dashboard</NavLink> */}

      <li><NavLink to='/' className="font-bold">Home</NavLink></li>
      <li><NavLink to='/all-tickets' className="font-bold">All Tickets</NavLink></li>
      <li><NavLink to='/dashboard' className="font-bold">Dashboard</NavLink></li>
      <li><NavLink to="become-vendor" className="font-bold">Become A Vendor</NavLink></li>
      {/* <li><NavLink to="approved-vendors" className="font-bold">Approved Vendor</NavLink></li> */}
      {/* <li><NavLink to="users-management" className="font-bold">User Management</NavLink></li> */}
     
    </>
  )

    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><MdEmojiTransportation />Ticket Bari</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end flex items-center gap-2">
    {/* <a className="btn">Login</a> */}
    {
      user? <>
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt="User Profile" 
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      )} <a onClick={handleLogOut} className="btn">Logout</a></>
       :  <Link to='/auth/login' className="btn">Login</Link>
    }
  </div>
</div>
    );
};

export default Navbar;