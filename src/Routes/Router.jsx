import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllTickets from "../Pages/Tickets/AllTickets";
import ErrorPage from "../Pages/ErrorPages/ErrorPage";





export const router = createBrowserRouter([
    {
        path: ("/"),
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path:'all-tickets',
                element: <AllTickets></AllTickets>,
            },
        ]
    },

    // AuthLayout
    {
        path:'/auth',
        element: <AuthLayout></AuthLayout>,
        children:[
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path: 'register',
                element:<Register></Register>
            },
        ]
    }
])