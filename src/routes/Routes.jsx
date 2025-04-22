import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/home/Home";
import Login from "../components/Login/Login";
import Register from "../components/register/Register";
import WorkSheet from "../pages/dashboard/WorkSheet/WorkSheet";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import EmployeeList from "../pages/dashboard/EmployeeList/EmployeeList";
import AllEmployeeList from "../pages/dashboard/allEmployeeList.jsx/AllEmployeeList";
import ContactUs from "../pages/contactUs/ContactUs";
import AdminContact from "../pages/dashboard/adminContact/AdminContact";
import Progress from "../pages/dashboard/progress/Progress";
import AdminRoute from "./AdminRoute";
import Payment from "../pages/dashboard/PaymentHistory/Payment";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/contact',
                element: <PrivateRoute><ContactUs /></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/work-sheet',
                element: <PrivateRoute><WorkSheet /></PrivateRoute>
            },
            {
                path: '/dashboard/payment-history',
                element: <PrivateRoute><PaymentHistory /></PrivateRoute>
            },
            {
                path: '/dashboard/employee-list',
                element: <PrivateRoute><EmployeeList /></PrivateRoute>
            },
            {
                path: '/dashboard/payment/:email',
                element: <PrivateRoute><Payment /></PrivateRoute>,
            },
            {
                path: '/dashboard/progress',
                element: <PrivateRoute><Progress /></PrivateRoute>
            },
            {
                path: '/dashboard/all-employee-list',
                element: <AdminRoute><AllEmployeeList /></AdminRoute>
            },
            {
                path: '/dashboard/contact-us',
                element: <AdminRoute><AdminContact /></AdminRoute>
            },
        ]
    }
]);