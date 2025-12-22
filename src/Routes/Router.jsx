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

import BecomeVendor from "../Pages/Dashboard/User/BecomeVendor";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import ApprovedVendors from "../Pages/Dashboard/ApprovedVendors/ApprovedVendors";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import LatestTickets from "../Components/HomeItem/LatestTickets";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets";
import UpdateTicket from "../Components/Tickets/UpdateTicket";
import RevenueOverview from "../Pages/Dashboard/Vendor/RevenueOverview";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
// import ProfileWrapper from "../Pages/Dashboard/Profile/ProfileWrapper";
import ProfileWrapper from "../Pages/Dashboard/Profile/ProfileWrapper.jsx";
import UserRoute from "./UserRoute";
import VendorRoute from "./VendorRoute";



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
                element: <PrivateRoute>
                    <AllTickets></AllTickets>
                </PrivateRoute>,
            },
            {
                path: 'latest-tickets',
                element: <LatestTickets></LatestTickets>,
            },
            {
                path: 'ticket/:id',
                element: <PrivateRoute>
                    <TicketDetails></TicketDetails>
                </PrivateRoute>,
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess></PaymentSuccess>,
            },
            {
                path: "become-vendor",
                element: <BecomeVendor></BecomeVendor>,
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
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'profile',
                element: <ProfileWrapper></ProfileWrapper>
            },
            {
                path: 'approved-vendors',
                element: <AdminRoute>
                    <ApprovedVendors></ApprovedVendors>
                </AdminRoute>,
            },

            // User/customer pages
            {
                path: "my-bookings",
                element: <UserRoute>
                    <MyBookedTickets></MyBookedTickets>
                    </UserRoute>,
            },
            {
                path: "transactions",
                element: <UserRoute>
                    <TransactionHistory></TransactionHistory>
                    </UserRoute>,
            },

            // Vendor pages
            {
                path: "add-ticket",
                element: <VendorRoute>
                    <AddTicket></AddTicket>
                </VendorRoute>,
            },
            {
                path: "my-added-tickets",
                element: <VendorRoute>
                    <MyAddedTickets></MyAddedTickets>
                    </VendorRoute>,
            },
            {
                path: "update-ticket/:id",
                element: <VendorRoute>
                    <UpdateTicket></UpdateTicket>
                    </VendorRoute>,
            },
            {
                path: "requested-bookings",
                element: <VendorRoute>
                    <RequestedBookings></RequestedBookings>
                    </VendorRoute>,
            },
            {
                path: "revenue-overview",
                element: <VendorRoute>
                    <RevenueOverview></RevenueOverview>
                    </VendorRoute>,
            },

            // Admin pages
            {
                path: "manage-tickets",
                element: <AdminRoute>
                    <ManageTickets></ManageTickets>
                </AdminRoute>,
            },
            {
                path: "manage-users",
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>,
            },
            {
                path: "advertise",
                element: <AdminRoute>
                    <AdvertiseTickets></AdvertiseTickets>
                </AdminRoute>,
            },

        ]
    }
])