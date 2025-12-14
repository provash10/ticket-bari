import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPages from "../LoaderPage/ErrorPages";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../Layouts/DashboardLayout";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import Profile from "../Pages/Dashboard/Profile/Profile";
import TicketDetails from "../Components/Tickets/TicketDetails";
import AllTickets from "../Pages/Home/AllTickets";



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
                path: '/ticket/:id',
                element: <TicketDetails></TicketDetails>,
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
           ( <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>),

        children: [
            {
                index: true,
                element: <Profile />
            },

            // User pages
            { path: "my-bookings", element: <MyBookedTickets /> },
            { path: "transactions", element: <TransactionHistory /> },

            // Vendor pages
            { path: "add-ticket", element: <AddTicket /> },
            // { path: "my-tickets", element: <MyAddedTickets /> },
            // { path: "requested-bookings", element: <RequestedBookings /> },
            // { path: "revenue-overview", element: <RevenueOverview /> },

            // Admin pages
            // { path: "manage-tickets", element: <ManageTickets /> },
            // { path: "manage-users", element: <ManageUsers /> },
            // { path: "advertise", element: <AdvertiseTickets /> },
        ]
    }
])