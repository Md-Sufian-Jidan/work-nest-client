import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parse } from "date-fns";

const groupByMonth = (messages) => {
  const grouped = {};

  messages.forEach(msg => {
    const monthYear = format(parse(msg.date, "dd/MM/yyyy", new Date()), "MMMM yyyy");
    grouped[monthYear] = (grouped[monthYear] || 0) + 1;
  });

  return Object.entries(grouped).map(([month, count]) => ({ month, count }));
};

const findMostActiveDay = (messages) => {
  const dateCount = {};

  messages.forEach(msg => {
    dateCount[msg.date] = (dateCount[msg.date] || 0) + 1;
  });

  const sorted = Object.entries(dateCount).sort((a, b) => b[1] - a[1]);
  return sorted[0];
};

const ContactAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-contact");
      return res.data;
    },
  });

  const total = messages.length;
  const mostActive = findMostActiveDay(messages);
  const chartData = groupByMonth(messages);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">📈 Contact Analytics</h2>

      {isLoading ? (
        <p className="text-center text-blue-600 animate-pulse">Loading analytics...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-4 text-center border-t-4 border-blue-500">
              <p className="text-sm text-gray-500">Total Messages</p>
              <h3 className="text-2xl font-bold text-blue-700">{total}</h3>
            </div>

            <div className="bg-white shadow rounded-lg p-4 text-center border-t-4 border-green-500">
              <p className="text-sm text-gray-500">Most Active Day</p>
              {mostActive ? (
                <h3 className="text-xl font-semibold text-gray-800">
                  {mostActive[0]} — {mostActive[1]} message(s)
                </h3>
              ) : (
                <p className="text-gray-400">No data yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Monthly Message Overview</h4>
            {chartData.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">Not enough data to display chart.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ContactAnalytics;