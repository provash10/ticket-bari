import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllTickets from "../Pages/Tickets/AllTickets";


export const router = createBrowserRouter([
    {
        path: ("/"),
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path:'/all-tickets',
                element: <AllTickets></AllTickets>,
            },
        ]
    },

    // AuthLayout
    {
        path:'/',
        Component: AuthLayout,
        children:[
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,

            },
        ]
    }
])