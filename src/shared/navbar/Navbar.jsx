import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";
import useDarkMode from "../../hooks/useDarkMode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const [isDark, setIsDark] = useDarkMode();

  const linkClass = "w-full text-sm font-medium px-3 py-2 rounded transition";
  const activeClass = "text-primary bg-blue-100 dark:bg-blue-900 dark:text-white";

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
      <li><NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Home</NavLink></li>
      <li><NavLink to="/features" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Features</NavLink></li>
      <li><NavLink to="/contact" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Contact</NavLink></li>

      {user && (
        <>
          <li><NavLink
            to={`${role === 'employee' ? '/dashboard/work-sheet' : role === 'hr' ? '/dashboard/employee-list' : role === 'admin' && '/dashboard/all-employee-list'}`}
            className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>
            Dashboard
          </NavLink></li>
          <li><NavLink to="/profile" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Profile</NavLink></li>
          <li><NavLink to="/overview" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Overview</NavLink></li>
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
          <li><NavLink to="/login" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Login</NavLink></li>
          <li><NavLink to="/register" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : `${linkClass} text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary`}>Register</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-bold text-primary tracking-tight dark:text-white">WorkNest</Link>

        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center font-body space-x-2">{navLinks}</ul>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
          </button>

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
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-800" size={20} />}
          </button>

          {user && (
            <div className="avatar">
              <div className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                <img alt="User" src={user.photoURL} />
              </div>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-white">
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
            className="bg-white dark:bg-gray-900 shadow-md md:hidden px-4 pb-4"
          >
            <ul className="flex flex-col space-y-2 font-body">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;