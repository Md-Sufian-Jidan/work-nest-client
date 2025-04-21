import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, UserPlus, LayoutGrid, Table, Pencil } from "lucide-react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import IncreaseSalaryModal from "../../../components/IncreaseSalaryModal/IncreaseSalaryModal";

const AllEmployeeList = () => {

    const [view, setView] = useState("table"); // table | grid
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

    const makeHR = useMutation({
        mutationFn: async (id) => {
            return axios.patch(`/api/users/${id}/make-hr`);
        },
        onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
    });

    const fireUser = useMutation({
        mutationFn: async (id) => {
            return axios.patch(`/api/users/${id}/fire`);
        },
        onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
    });

    const updateSalary = useMutation({
        mutationFn: async ({ id, newSalary }) => {
            return axiosSecure.patch(`/update-salary/${id}`, { salary: newSalary });
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

    const handleFire = (id) => {
        const confirmFire = confirm("Are you sure you want to fire this user?");
        if (confirmFire) {
            fireUser.mutate(id);
        }
    };


    return (
        <div className="p-6">
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
                            {employees?.map((user) => (
                                <tr key={user._id} className="border-t">
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
                                                onClick={() => makeHR.mutate(user._id)}
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
                                                onClick={() => handleFire(user._id)}
                                                className="text-red-500 hover:underline flex items-center gap-1"
                                            >
                                                <Trash2 size={16} /> Fire
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* GRID VIEW */}
            {view === "grid" && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {employees?.map((user) => (
                        <div key={user._id} className="border rounded-lg p-4 shadow-sm">
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
                        </div>
                    ))}
                </div>
            )}

            {selectedUser && (
                <IncreaseSalaryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirm}
                    currentSalary={selectedUser.salary}
                />
            )}

        </div>
    );
}

export default AllEmployeeList