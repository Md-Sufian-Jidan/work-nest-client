import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history/${user?.email}`);
            return res.data;
        }
    });
    
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const paginated = payments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(payments.length / rowsPerPage);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">💸 Payment History</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-blue-100 text-left">
                            <th className="p-2 border">Month</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((pay, i) => (
                            <tr key={i} className="border-t">
                                <td className="p-2 border">{pay.month}</td>
                                <td className="p-2 border">{pay.employeeSalary}</td>
                                <td className="p-2 border">{pay.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PaymentHistory;