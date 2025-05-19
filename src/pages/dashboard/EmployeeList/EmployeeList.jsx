import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, X, Eye, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmployeeDetailsModal from "../../../components/employeeDetailsModal/EmployeeDetailsModal";
import { Helmet } from "react-helmet";

const columnHelper = createColumnHelper();

const EmployeeList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Fetch employee list
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ["employees"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/employees-list");
      return res.data;
    },
  });

  // Mutation for verification toggle
  const toggleVerify = useMutation({
    mutationFn: async (emp) => {
      const update = { verified: !emp.verified };
      return axiosSecure.patch(`/verify-employee/${emp._id}`, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  const handleVerify = (emp) => {
    Swal.fire({
      title: "Verify Employee?",
      text: `Toggle verification for ${emp?.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, toggle it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleVerify.mutate(emp, {
          onSuccess: () => {
            Swal.fire({
              title: "Updated!",
              text: `${emp?.name} is now ${!emp?.verified ? "unverified" : "verified"}.`,
              icon: "success",
            });
          },
        });
      }
    });
  };

  const handleView = (emp) => {
    setSelectedEmployee(emp);
    setViewModalOpen(true);
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <span className="text-sm text-gray-700">{info.getValue()}</span>,
    }),
    columnHelper.accessor("verified", {
      header: "Verified",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <button
            onClick={() => handleVerify(emp)}
            className={`text-xl ${emp.verified ? "text-green-500" : "text-red-500"}`}
            title={emp.verified ? "Verified - Click to unverify" : "Not verified - Click to verify"}
          >
            {emp.verified ? <Check /> : <X />}
          </button>
        );
      },
    }),
    columnHelper.accessor("bank_account_no", {
      header: "Bank Account",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("salary", {
      header: "Salary",
      cell: (info) => (
        <span className="text-blue-600 font-semibold">${info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: "pay",
      header: "Pay",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <Link
            to={`/dashboard/payment/${emp.email}`}
            className={`px-3 py-1 rounded text-white flex items-center gap-1 justify-center text-sm font-medium ${emp.verified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed pointer-events-none"
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
            onClick={() => handleView(emp)}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
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
    <>
      <Helmet>
        <title>WorkNest | EmployeeList</title>
      </Helmet>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">👥 Employee List</h2>

        <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 text-left border-b font-medium text-gray-600">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 border-b">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="py-6 text-center text-gray-500"
                  >
                    No employee data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {viewModalOpen && selectedEmployee && (
          <EmployeeDetailsModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            employee={selectedEmployee}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeList;