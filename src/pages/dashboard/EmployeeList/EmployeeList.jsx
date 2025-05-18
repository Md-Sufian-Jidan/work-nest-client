import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, } from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, X, Eye, DollarSign } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EmployeeDetailsModal from "../../../components/employeeDetailsModal/EmployeeDetailsModal";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper();

const EmployeeList = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    // 1. Fetch employees
    const { data: employees = [], refetch } = useQuery({
        queryKey: ["employees"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/employees-list");
            return res.data;
        },
    });

    // 2. Toggle verification
    const toggleVerifyMutation = useMutation({
        mutationFn: async (employee) => {
            const updated = { verified: !employee?.verified };
            await axiosSecure.patch(`/verify-employee/${employee._id}`, updated);
        },
        onSuccess: () => queryClient.invalidateQueries(["employees"]),
    });

    const handleVerify = (emp) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to Verify the ${emp?.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                toggleVerifyMutation.mutate(emp, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Verified!",
                            text: `${emp?.name} has been Verified`,
                            icon: "success"
                        });
                    }
                });
                refetch();
            }
        });
    };

    const handleView = (user) => {
        setSelectedEmployee(user);
        setViewModalOpen(true);
    };

    const handleViewEmployee = (emp) => {
        handleView(emp);
    };

    // 4. Columns definition
    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("verified", {
            header: "Verified",
            cell: ({ row }) => {
                const emp = row.original;
                return (
                    <button
                        onClick={() => handleVerify(emp)}
                        className={`text-xl ${emp.verified ? "text-green-500" : "text-red-500"}`}
                    >
                        {emp.verified ? <Check /> : <X />}
                    </button>
                );
            },
        }),
        columnHelper.accessor("bank_account_no", {
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
                    <Link
                        to={`/dashboard/payment/${emp.email}`}
                        // onClick={() => openPayModal(emp)}
                        disabled={!emp.verified}
                        className={`px-3 py-1 rounded text-white flex items-center gap-1 ${emp.verified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                            }`}
                    >
                        <DollarSign size={16} /> Pay
                    </Link>
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
                        onClick={() => handleViewEmployee(emp)}
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
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="border-t">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="p-3 border-b">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={table.getAllColumns().length} className="text-center py-4 text-gray-500">
                                    No employee data available.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

            {/* view details modal */}
            {
                viewModalOpen && selectedEmployee && <EmployeeDetailsModal
                    isOpen={viewModalOpen}
                    onClose={() => setViewModalOpen(false)}
                    employee={selectedEmployee}
                />
            }
        </div>
    );
}

export default EmployeeList;