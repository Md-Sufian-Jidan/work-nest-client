import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, LayoutGrid, Table, Pencil } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import IncreaseSalaryModal from "../../../components/IncreaseSalaryModal/IncreaseSalaryModal";

const AllEmployeeList = () => {
    const [view, setView] = useState("table");
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { data: employees = [] } = useQuery({
        queryKey: ["all-employees"],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/all-verified-employees");
            return res.data;
        }
    });

    const updateSalary = useMutation({
        mutationFn: async ({ id, newSalary }) => {
            return axiosSecure.patch(`/update-salary/${id}`, { salary: newSalary });
        },
        onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
    });

    const makeHR = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.patch(`/make-hr/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
    });

    const fireUser = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.patch(`/fired-user/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
    });

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleConfirm = (newSalary) => {
        updateSalary.mutate({ id: selectedUser._id, newSalary });
        Swal.fire({
            title: "Success!",
            text: `${selectedUser.role} salary has increased.`,
            icon: "success"
        });
        setModalOpen(false);
    };

    const handleMakeHr = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You wanna make the user HR!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                makeHR.mutate(user?._id, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Promoted!",
                            text: `${user?.name} has been promoted to HR.`,
                            icon: "success"
                        });
                    }
                });

            }
        });
    }

    const handleFire = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to fired the ${user?.role}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fireUser.mutate(user?._id, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Fired!",
                            text: `${user?.name} has been Fired`,
                            icon: "success"
                        });
                    }
                });

            }
        });
    };

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600">👑 All Verified Employees</h2>
                <button
                    onClick={() => setView(view === "table" ? "grid" : "table")}
                    className="flex items-center gap-2 text-blue-600 border px-3 py-1 rounded hover:bg-blue-50"
                >
                    {view === "table" ? <LayoutGrid size={18} /> : <Table size={18} />}
                    {view === "table" ? "Grid View" : "Table View"}
                </button>
            </div>

            {/* TABLE VIEW */}
            {view === "table" && (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="p-2">Name</th>
                                <th className="p-2">Designation</th>
                                <th className="p-2">Salary</th>
                                <th className="p-2">Make HR</th>
                                <th className="p-2">Fire</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {employees?.map((user) => (
                                    <motion.tr
                                        key={user._id}
                                        className="border-t"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2 capitalize">{user.role}</td>
                                        <td className="p-2">
                                            ${user.salary}{" "}
                                            <button
                                                onClick={() => openModal(user)}
                                                className="text-blue-500 ml-2"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        </td>
                                        <td className="p-2">
                                            {user.role === "employee" ? (
                                                <button
                                                    onClick={() => handleMakeHr(user)}
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Make HR
                                                </button>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="p-2">
                                            {user.status === "fired" ? (
                                                <span className="text-red-500 font-semibold">Fired</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleFire(user)}
                                                    className="text-red-500 hover:underline flex items-center gap-1"
                                                >
                                                    <Trash2 size={16} /> Fire
                                                </button>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
            {/* GRID VIEW */}
            {view === "grid" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {employees?.map((user) => (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="border rounded-lg p-4 shadow-sm"
                            >
                                <h4 className="text-lg font-semibold">{user.name}</h4>
                                <p className="text-sm text-gray-600 capitalize">Role: {user.role}</p>
                                <p className="text-sm text-gray-600">Salary: ${user.salary}</p>

                                <div className="mt-3 flex gap-2 flex-wrap">
                                    {user.role === "employee" && (
                                        <button
                                            onClick={() => makeHR.mutate(user._id)}
                                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"
                                        >
                                            Make HR
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleSalaryUpdate(user._id, user.salary)}
                                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                                    >
                                        Adjust Salary
                                    </button>

                                    {user.status === "fired" ? (
                                        <span className="text-red-500 font-medium">Fired</span>
                                    ) : (
                                        <button
                                            onClick={() => handleFire(user._id)}
                                            className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm"
                                        >
                                            Fire
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            {selectedUser && (
                                <IncreaseSalaryModal
                                    isOpen={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    onConfirm={handleConfirm}
                                    currentSalary={selectedUser.salary}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AllEmployeeList