import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // toggle for demo

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">WorkNest</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:text-blue-600 transition">{link.name}</a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-9 h-9 rounded-full"
              />
              <button className="text-sm text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="text-sm text-blue-600 hover:underline">Login</a>
              <a
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Register
              </a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg px-4 py-4"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-4 font-medium text-gray-700">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="block hover:text-blue-600 transition">{link.name}</a>
                </li>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <button className="text-sm text-red-500 hover:underline">Logout</button>
                  </div>
                </>
              ) : (
                <>
                  <a href="/login" className="text-sm text-blue-600 hover:underline">Login</a>
                  <a
                    href="/register"
                    className="block px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg text-sm text-center hover:bg-blue-700"
                  >
                    Register
                  </a>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}