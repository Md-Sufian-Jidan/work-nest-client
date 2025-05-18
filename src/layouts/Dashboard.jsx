import { NavLink, Outlet } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { role, isLoading } = useRole();
    const { user, logOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        ],
    };
    const navLinks = linksByRole[role] || [];
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

    if (isLoading) return <span>Loading...</span>;
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`w-64 bg-white shadow-lg p-4 md:block ${sidebarOpen ? 'block' : 'hidden'} md:relative`}>
                <div className="text-xl font-bold text-blue-600 mb-8">WorkNest</div>
                <ul className="space-y-2">
                    {navLinks.map((link, i) => (
                        <li key={i}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded transition ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <div className="divider"></div>
                    <li><NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded transition ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }>Home</NavLink>
                    </li>
                    <li><NavLink
                        to={'/contact'}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded transition ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                            }`
                        }>Contact
                    </NavLink></li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow-md flex justify-between items-center px-6 py-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
                        <Menu />
                    </button>
                    <div className="flex items-center gap-3">
                        <img src={user?.photoURL} alt="Avatar" className="w-9 h-9 rounded-full" />
                        <span className="text-gray-700 font-medium">{user?.displayName}</span>
                        <button onClick={handleLogout} className="text-red-500 hover:underline text-sm">
                            <LogOut size={18} />
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;