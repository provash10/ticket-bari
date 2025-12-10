import React from 'react';
import showAuthImg from '../assets/showauthimg.png'
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';

const AuthLayout = () => {
    return (
        <div className="w-full">

            <Navbar />

            <div className="flex w-full">

                {/* Left Image Section (Optional) */}
                {/* <div className="flex-1">
                    <img src={showAuthImg} alt="" className="w-full h-full object-cover" />
                </div> */}

                {/* Right Content / Form */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
