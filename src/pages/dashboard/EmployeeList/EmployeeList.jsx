import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, } from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Check, X, Eye, DollarSign } from "lucide-react";

const columnHelper = createColumnHelper();

const EmployeeList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // ✅ 1. Fetch employees
    const { data: employees = [] } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await axios.get("/employees-list");
            console.log(res.data);
            return res.data;
        },
    });

    // ✅ 2. Toggle verification
    const toggleVerifyMutation = useMutation({
        mutationFn: async (employee) => {
            const updated = { isVerified: !employee.isVerified };
            await axios.patch(`/api/employees/${employee._id}/verify`, updated);
        },
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    // ✅ 3. Pay salary
    const payMutation = useMutation({
        mutationFn: async (paymentInfo) => {
            await axios.post("/api/payments", paymentInfo);
        },
        onSuccess: () => {
            setModalOpen(false);
            queryClient.invalidateQueries(["employees"]);
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

    // ✅ 4. Columns definition
    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("isVerified", {
            header: "Verified",
            cell: ({ row }) => {
                const emp = row.original;
                return (
                    <button
                        onClick={() => handleVerify(emp)}
                        className={`text-xl ${emp.isVerified ? "text-green-500" : "text-red-500"}`}
                    >
                        {emp.isVerified ? <Check /> : <X />}
                    </button>
                );
            },
        }),
        columnHelper.accessor("bank", {
            header: "Bank Account",
            cell: info => info.getValue() || "N/A",
        }),
        columnHelper.accessor("salary", {
            header: "Salary",
            cell: info => `$${info.getValue()}`,
        }),
        columnHelper.display({
            id: "pay",
            header: "Pay",
            cell: ({ row }) => {
                const emp = row.original;
                return (
                    <button
                        onClick={() => openPayModal(emp)}
                        disabled={!emp.isVerified}
                        className={`px-3 py-1 rounded text-white flex items-center gap-1 ${emp.isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        <DollarSign size={16} /> Pay
                    </button>
                );
            },
        }),
        columnHelper.display({
            id: "details",
            header: "Details",
            cell: ({ row }) => {
                const emp = row.original;
                return (
                    <button
                        onClick={() => navigate(`/dashboard/details/${emp._id}`)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                        <Eye size={16} /> View
                    </button>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">👥 Employee List</h2>

            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-left">
                    <thead className="bg-blue-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="p-3 border-b font-medium">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-3 border-b">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pay Modal */}
            {modalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h3 className="text-lg font-bold text-blue-600 mb-4">
                            💸 Pay {selectedEmployee.name}
                        </h3>
                        <form onSubmit={handlePay} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Amount</label>
                                <input
                                    type="text"
                                    value={selectedEmployee.salary}
                                    disabled
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="month"
                                    placeholder="Month (e.g. April)"
                                    required
                                    className="flex-1 p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="year"
                                    placeholder="Year (e.g. 2025)"
                                    required
                                    className="flex-1 p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                    Confirm Pay
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