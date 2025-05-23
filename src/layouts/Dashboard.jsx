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
      <div className="min-h-screen flex items-center justify-center text-primary dark:text-accent font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>WorkNest | Dashboard</title>
      </Helmet>

      <div className="flex min-h-screen bg-bg-soft dark:bg-bg-dark relative">
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
              className="fixed z-50 md:static w-64 bg-bg-soft dark:bg-bg-dark shadow-lg dark:shadow-xl p-4 min-h-screen"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-primary dark:text-accent">WorkNest</h2>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden text-text-secondary">
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
                          `block px-3 py-2 rounded transition border-l-4 
                        ${isActive ? "bg-bg-soft text-primary dark:text-accent border-primary dark:border-accent"
                            : "text-text-secondary border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-text-secondary">No menu items available for this role.</li>
                )}
                <div className="border-t dark:border-gray-600 my-2"></div>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded transition border-l-4 ${isActive
                        ? "bg-blue-50 dark:bg-bg-dark text-blue-700 dark:text-primary border-blue-600 dark:border-primary"
                        : "text-gray-700 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent"
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
                      `block px-3 py-2 rounded transition border-l-4 ${isActive
                        ? "bg-blue-50 dark:bg-accent text-blue-700 dark:text-primary border-blue-600 dark:border-primary"
                        : "text-gray-700 dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent"
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
          <header className="bg-bg-soft dark:bg-bg-dark shadow-md dark:shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600 dark:text-text-secondary">
                <Menu />
              </button>
              <h1 className="text-xl font-semibold text-text-main dark:text-text-secondary hidden md:block">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              {user?.photoURL && (
                <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-text-main dark:text-text-secondary">{user?.displayName}</p>
                <p className="text-xs text-blue-600 dark:text-primary capitalize">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900 px-2 py-1 rounded flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-y-auto text-text-main dark:text-text-secondary">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;