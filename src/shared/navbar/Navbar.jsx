import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = "text-sm font-semibold px-3 py-1 transition duration-200 rounded hover:bg-blue-100";
  const activeClass = "bg-blue-100 text-blue-700";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/features" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
          Features
        </NavLink>
      </li>
      <li>
        <NavLink to="/appointment" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
          Appointments
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
          Contact
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
      {user ? (
        <li>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline font-semibold">Logout</button>
        </li>
      ) : (
        <li>
          <NavLink to="/signIn" className={({ isActive }) => isActive ? `${linkClass} ${activeClass}` : linkClass}>
            Sign In
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">WorkNest</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-4">{navLinks}</ul>

        {/* Hamburger for Mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="bg-white md:hidden px-4 py-4 shadow-md"
          >
            <ul className="space-y-2">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
