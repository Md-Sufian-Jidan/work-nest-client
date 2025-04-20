import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (!user) return <div>no user</div>

    if (loading) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600 mx-auto max-w-16"></div>

    if (user) return children;

    return <Navigate state={location?.pathname} to={'/login'} />
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;