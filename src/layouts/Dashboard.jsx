import { FaBook, FaCartArrowDown, FaCommentDots, FaEnvelope, FaHome, FaList, FaMendeley, FaRegCalendarAlt, FaShoppingCart, FaUsers, FaUtensilSpoon } from "react-icons/fa";
import { FaMarsAndVenus } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    // TODO: get isAdmin value from the database
    const useDesignation = useDesignation();
    const isAdmin = false
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4 space-y-3">
                    {isAdmin ?
                        <>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/adminHome">
                                    <FaHome size={20} />Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/cart">
                                    <FaCartArrowDown size={20} />My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/paymentHistory">
                                    <FaMarsAndVenus size={20} />Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/addItems">
                                    <FaUtensilSpoon size={20} />Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/manageItems">
                                    <FaList size={20} />Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/bookings">
                                    <FaBook size={20} />Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/users">
                                    <FaUsers size={20} />All User
                                </NavLink>
                            </li>
                        </>
                        : <>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/userHome">
                                    <FaHome size={20} />User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/reservation">
                                    <FaRegCalendarAlt size={20} />Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/cart">
                                    <FaShoppingCart size={20} />My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/review">
                                    <FaCommentDots size={20} />Reviews
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'bg-purple-700 text-white' : ''} to="/dashboard/lists">
                                    <FaList size={20} />My Bookings
                                </NavLink>
                            </li></>}
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome size={20} />Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaMendeley size={20} />Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope size={20} />Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;