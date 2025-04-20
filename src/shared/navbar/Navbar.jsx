import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();

    const linkClass = "w-full text-sm text-black font-medium px-3 py-2 rounded transition hover:bg-blue-100 hover:text-blue-600";
    const activeClass = "w-full text-blue-600 bg-blue-200";

    const handleLogout = () => {
        logOut()
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Logout successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Home</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Contact</NavLink></li>
            {user && (
                <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Dashboard</NavLink></li>
            )}
            {user ? (
                <li><button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:underline">Logout</button></li>
            ) : (
                <>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Login</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>Register</NavLink></li>
                </>
            )}
        </>
    );

    return (
        <nav className="w-full fixed top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600 tracking-tight">WorkNest</div>

                <div className="hidden md:flex items-center gap-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center space-x-2">{navLinks}</ul>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user?.photoURL} />
                        </div>
                    </div>
                    {/* Hamburger Button */}
                    <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="bg-white shadow-md md:hidden px-4 pb-4"
                    >
                        <ul className="space-y-2 pt-2">{navLinks}</ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar