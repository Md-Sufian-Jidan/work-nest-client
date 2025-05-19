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
import Features from "../pages/Features/Features";
import ContactAnalytics from "../pages/dashboard/ContactAnalytics/ContactAnalytics";
import Profile from "../pages/Profile/Profile";

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
                path: '/features',
                element: <Features />
            },
            {
                path: '/contact',
                element: <ContactUs />
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
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
            // employee
            {
                path: '/dashboard/work-sheet',
                element: <PrivateRoute><WorkSheet /></PrivateRoute>
            },
            {
                path: '/dashboard/payment-history',
                element: <PrivateRoute><PaymentHistory /></PrivateRoute>
            },
            // Hr
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
            // Admin
            {
                path: '/dashboard/all-employee-list',
                element: <AdminRoute><AllEmployeeList /></AdminRoute>
            },
            {
                path: '/dashboard/contact-us',
                element: <AdminRoute><AdminContact /></AdminRoute>
            },
            {
                path: '/dashboard/contact-analytics',
                element: <AdminRoute><ContactAnalytics /></AdminRoute>
            },
        ]
    }
]);