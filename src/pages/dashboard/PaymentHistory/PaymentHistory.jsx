import { useState, useEffect } from "react";

const dummyPayments = [
    { month: "January 2024", amount: "$2,500", transactionId: "TX123456" },
    { month: "February 2024", amount: "$2,500", transactionId: "TX123789" },
    { month: "March 2024", amount: "$2,500", transactionId: "TX124012" },
    { month: "April 2024", amount: "$2,700", transactionId: "TX124310" },
    { month: "May 2024", amount: "$2,700", transactionId: "TX124501" },
    { month: "June 2024", amount: "$2,800", transactionId: "TX124999" },
];

const PaymentHistory = () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const paginated = dummyPayments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const totalPages = Math.ceil(dummyPayments.length / rowsPerPage);

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
                                <td className="p-2 border">{pay.amount}</td>
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