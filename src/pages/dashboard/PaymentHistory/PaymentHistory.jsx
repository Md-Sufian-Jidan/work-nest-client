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
        <h2 className="text-3xl font-bold text-primary dark:text-accent mb-6 text-center">
          💸 Payment History
        </h2>

        {isLoading ? (
          <p className="text-center text-primary dark:text-accent animate-pulse">
            Loading payments...
          </p>
        ) : payments.length === 0 ? (
          <div className="text-center text-text-secondary dark:text-text-main mt-10 flex flex-col items-center">
            <CreditCard className="w-10 h-10 text-text-secondary dark:text-text-main mb-2" />
            <p>No payment history yet.</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto bg-bg-soft dark:bg-bg-dark shadow rounded-lg dark:shadow-md">
              <table className="min-w-full text-sm border rounded border-gray-300 dark:border-text-secondary text-text-main dark:text-text-secondary">
                <thead>
                  <tr>
                    <th className="p-3 text-left border-b border-gray-300 dark:border-text-secondary">
                      Month
                    </th>
                    <th className="p-3 text-left border-b border-gray-300 dark:border-text-secondary">
                      Amount
                    </th>
                    <th className="p-3 text-left border-b border-gray-300 dark:border-text-secondary">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((pay, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-300 dark:border-text-secondary hover:bg-bg-soft transition-colors"
                    >
                      <td className="p-3">{pay.month}</td>
                      <td className="p-3 text-green-600 dark:text-green-400 font-medium">
                        ${pay.employeeSalary}
                      </td>
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
                    className={`px-4 py-1.5 rounded border text-sm font-medium transition
                ${page === i + 1
                        ? "bg-btn text-white border-btn dark:bg-accent dark:border-accent"
                        : "bg-white text-primary border-gray-300 hover:bg-bg-soft dark:bg-bg-soft dark:text-text-main dark:border-text-secondary dark:hover:bg-bg-dark"
                      }
              `}
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
