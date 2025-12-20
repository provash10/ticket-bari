import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPages from "../LoaderPage/ErrorPages";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";


import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";

import TicketDetails from "../Components/Tickets/TicketDetails";
import AllTickets from "../Pages/Home/AllTickets";
import PaymentSuccess from "../Components/Payment/PaymentSuccess";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";
import Profile from "../Pages/Dashboard/Profile/Profile";
import BecomeVendor from "../Pages/Dashboard/User/BecomeVendor";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import ApprovedVendors from "../Pages/Dashboard/ApprovedVendors/ApprovedVendors";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
// import Payment from "../Pages/Dashboard/OnlinePayment/Payment";



export const router = createBrowserRouter([
    //MainLayout
    {
        path: ("/"),
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPages></ErrorPages>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'all-tickets',
                element: <AllTickets></AllTickets>,
            },
            {
                path: 'ticket/:id',
                element: <TicketDetails></TicketDetails>,
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess></PaymentSuccess>,
            },
        ]
    },

    // AuthLayout
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },

    //DashboardLayout
    {
        path: '/dashboard',
        element:
            (<PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>),

        children: [
            {
                index: true,
                element: <Profile></Profile>  
            },

            {
                path: 'approved-vendors',
                element: <ApprovedVendors></ApprovedVendors>,
            },

            // User/customer pages
            { 
                path: "my-bookings", 
                 element: <MyBookedTickets></MyBookedTickets>
            },

            { 
                path: "become-vendor", 
                element: <BecomeVendor></BecomeVendor>,
            },
            { 
                path: "transactions", 
                element: <TransactionHistory></TransactionHistory>
            },

            // Vendor pages
            {
                path: "add-ticket",
                element: <AddTicket /> 
            },
            // { path: "my-tickets", element: <MyAddedTickets /> },
            {
                path: "requested-bookings",
                element: <RequestedBookings></RequestedBookings>
            },
            // { path: "revenue-overview", element: <RevenueOverview /> },

            // Admin pages
            {
                path: "manage-tickets",
                element: <ManageTickets></ManageTickets>,
            },
            // { path: "manage-users", element: <ManageUsers /> },
            // { path: "advertise", element: <AdvertiseTickets /> },
            {
                path:'users-management',
                element: <AdminRoute>
                    <UsersManagement></UsersManagement>,
                </AdminRoute>,
            },
        ]
    }
])