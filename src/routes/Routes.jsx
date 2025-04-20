import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/home/Home";
import Login from "../components/Login/Login";
import Register from "../components/register/Register";
import WorkSheet from "../pages/dashboard/WorkSheet/WorkSheet";

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
        path:'/dashboard/workSheet',
        element: <WorkSheet />
    }
]);