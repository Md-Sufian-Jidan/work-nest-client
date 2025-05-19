import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";

const Progress = () => {
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const axiosSecure = useAxiosSecure();

  const { data: workRecords = [], isLoading } = useQuery({
    queryKey: ["work-records", selectedEmployee],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-work-records?employee=${selectedEmployee}`);
      return res.data;
    },
  });

  const employees = [...new Set(workRecords.map((item) => item.name))];

  const filteredRecords = workRecords.filter((item) => {
    const recordMonth = new Date(item.date).getMonth() + 1;
    return Number(recordMonth) === Number(selectedMonth);
  });

  const totalHours = filteredRecords.reduce((sum, item) => sum + Number(item.hoursWorked), 0);

  return (
    <>
      <Helmet>
        <title>WorkNest | Progress</title>
      </Helmet>
      <motion.div
        className="p-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6">📈 Progress Tracker</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <select
            className="border p-2 rounded-md w-full md:w-60 bg-white shadow-sm"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map((emp, i) => (
              <option key={i} value={emp}>{emp}</option>
            ))}
          </select>

          <select
            className="border p-2 rounded-md w-full md:w-60 bg-white shadow-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6 shadow-sm">
          <p className="text-blue-800 text-lg font-semibold">
            Total Hours Worked:{" "}
            <span className="font-bold text-blue-900">{totalHours}</span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white shadow">
          {isLoading ? (
            <div className="flex justify-center py-8 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading work records...
            </div>
          ) : filteredRecords?.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No work records found for the selected filters.
            </p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-100 text-gray-700 font-semibold">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Task</th>
                  <th className="p-3">Hours</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{item.name || item?.email}</td>
                    <td className="p-3">{item.task}</td>
                    <td className="p-3">{item.hoursWorked}</td>
                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Progress;