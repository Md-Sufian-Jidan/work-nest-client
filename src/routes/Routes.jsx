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
                path: '/dashboard/all-employee-list',
                element: <PrivateRoute><AllEmployeeList /></PrivateRoute>
            },
        ]
    }
]);