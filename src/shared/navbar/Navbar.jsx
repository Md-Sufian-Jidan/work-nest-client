import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();

    const linkClass = "w-full text-sm font-medium px-3 py-2 rounded transition";
    const activeClass = "text-primary bg-blue-100";

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out successfully!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    timer: 1500,
                    showConfirmButton: false
                });
            });
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Home</NavLink></li>
            <li><NavLink to="/features" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Features</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Contact</NavLink></li>

            {user && (
                <>
                    <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Dashboard</NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Profile</NavLink></li>
                    <li><NavLink to="/overview" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Overview</NavLink></li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 text-sm text-red-600 font-semibold hover:underline"
                        >
                            Logout
                        </button>
                    </li>
                </>
            )}

            {!user && (
                <>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Login</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 hover:text-primary`}>Register</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-heading font-bold text-primary tracking-tight">WorkNest</div>

                <div className="hidden md:flex items-center gap-4">
                    <ul className="flex items-center font-body space-x-2">{navLinks}</ul>

                    {user && (
                        <div tabIndex={0} className="avatar">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                <img alt="User Avatar" src={user.photoURL} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center gap-2">
                    {user && (
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                                <img alt="User" src={user.photoURL} />
                            </div>
                        </div>
                    )}
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="bg-white shadow-md md:hidden px-4 pb-4"
                    >
                        <ul className="flex flex-col space-y-2 font-body">{navLinks}</ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;