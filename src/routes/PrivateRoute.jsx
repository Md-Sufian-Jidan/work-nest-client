import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-16 w-16 border-4 border-dashed rounded-full animate-spin border-primary dark:border-accent mx-auto mt-20"></div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;