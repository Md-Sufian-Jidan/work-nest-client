import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "@tanstack/react-table";
import axios from "axios";
import { Check, X, Eye, DollarSign } from "lucide-react";

const EmployeeList = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axios.get("/employees-list");
            return res.data;
        },
    });

    const toggleVerifyMutation = useMutation({
        mutationFn: async (employee) => {
            const updated = { isVerified: !employee.isVerified };
            await axios.patch(`/api/employees/${employee._id}/verify`, updated);
        },
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const payMutation = useMutation({
        mutationFn: async (paymentInfo) => {
            await axios.post("/api/payments", paymentInfo);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["employees"]);
            setModalOpen(false);
        },
    });

    const handleVerify = (emp) => {
        toggleVerifyMutation.mutate(emp);
    };

    const openPayModal = (emp) => {
        setSelectedEmployee(emp);
        setModalOpen(true);
    };

    const handlePay = (e) => {
        e.preventDefault();
        const form = e.target;
        const month = form.month.value;
        const year = form.year.value;
        const paymentInfo = {
            employeeId: selectedEmployee._id,
            amount: selectedEmployee.salary,
            month,
            year,
        };
        payMutation.mutate(paymentInfo);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">👥 Employee List</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-blue-50 text-left">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Verified</th>
                            <th className="p-3 border">Bank Account</th>
                            <th className="p-3 border">Salary</th>
                            <th className="p-3 border">Pay</th>
                            <th className="p-3 border">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp._id} className="border-t">
                                <td className="p-3 border">{emp.name}</td>
                                <td className="p-3 border">{emp.email}</td>
                                <td className="p-3 border text-center">
                                    <button
                                        onClick={() => handleVerify(emp)}
                                        className={`text-xl ${emp.isVerified ? "text-green-500" : "text-red-500"}`}
                                        title={emp.isVerified ? "Verified" : "Click to verify"}
                                    >
                                        {emp.isVerified ? <Check /> : <X />}
                                    </button>
                                </td>
                                <td className="p-3 border">{emp.bank || "N/A"}</td>
                                <td className="p-3 border">${emp.salary}</td>
                                <td className="p-3 border text-center">
                                    <button
                                        onClick={() => openPayModal(emp)}
                                        disabled={!emp.isVerified}
                                        className={`px-3 py-1 rounded text-white flex items-center gap-1 ${emp.isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                                            }`}
                                    >
                                        <DollarSign size={16} /> Pay
                                    </button>
                                </td>
                                <td className="p-3 border text-center">
                                    <button
                                        onClick={() => navigate(`/dashboard/details/${emp._id}`)}
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <Eye size={16} /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pay Modal */}
            {modalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">💸 Pay {selectedEmployee.name}</h3>
                        <form onSubmit={handlePay} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-1">Amount</label>
                                <input
                                    type="text"
                                    disabled
                                    value={selectedEmployee.salary}
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium block mb-1">Month</label>
                                    <input name="month" type="text" placeholder="e.g. April" required className="w-full p-2 border rounded" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium block mb-1">Year</label>
                                    <input name="year" type="number" placeholder="e.g. 2025" required className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                    Confirm Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployeeList;