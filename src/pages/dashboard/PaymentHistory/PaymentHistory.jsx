import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
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
    <>
      <Helmet>
        <title>WorkNest | PaymentHistory</title>
      </Helmet>
      <motion.div
        className="p-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          💸 Payment History
        </h2>

        {isLoading ? (
          <p className="text-center text-blue-600 animate-pulse">Loading payments...</p>
        ) : payments.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 flex flex-col items-center">
            <CreditCard className="w-10 h-10 text-gray-400 mb-2" />
            <p>No payment history yet.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full text-sm border rounded">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">Month</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((pay, i) => (
                    <tr
                      key={i}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3">{pay.month}</td>
                      <td className="p-3 text-green-600 font-medium">${pay.employeeSalary}</td>
                      <td className="p-3">{pay.transactionId}</td>
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
                    className={`px-4 py-1.5 rounded border text-sm font-medium transition ${page === i + 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-gray-300 hover:bg-blue-50"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};

export default PaymentHistory;