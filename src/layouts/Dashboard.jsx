import { NavLink, Outlet } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const { role, isLoading } = useRole();
  const { user, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const linksByRole = {
    employee: [
      { name: "Work Sheet", to: "/dashboard/work-sheet" },
      { name: "Payment History", to: "/dashboard/payment-history" },
    ],
    hr: [
      { name: "Employee List", to: "/dashboard/employee-list" },
      { name: "Progress", to: "/dashboard/progress" },
    ],
    admin: [
      { name: "All Employees", to: "/dashboard/all-employee-list" },
      { name: "Contact Us", to: "/dashboard/contact-us" },
      { name: "Contact Analytics", to: "/dashboard/contact-analytics" },
    ],
  };

  const navLinks = linksByRole[role] || [];

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>WorkNest | Dashboard</title>
      </Helmet>
      <div className="flex min-h-screen bg-gray-50 relative">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed z-50 md:static w-64 bg-white shadow-lg p-4 min-h-screen"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">WorkNest</h2>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                  <X />
                </button>
              </div>

              <ul className="space-y-2">
                {navLinks.length > 0 ? (
                  navLinks.map((link, i) => (
                    <li key={i}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded transition border-l-4 ${isActive
                            ? "bg-blue-50 text-blue-700 border-blue-600"
                            : "text-gray-700 border-transparent hover:bg-gray-100"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400">No menu items available for this role.</li>
                )}
                <div className="border-t my-2"></div>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded transition ${isActive
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded transition ${isActive
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
                <Menu />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              {user?.photoURL && (
                <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.displayName}</p>
                <p className="text-xs text-blue-600 capitalize">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:bg-red-100 px-2 py-1 rounded flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;