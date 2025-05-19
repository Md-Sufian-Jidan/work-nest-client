import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart3, Users, BadgeCheck, Clock, DollarSign } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-overview?email=${user.email}`);
      return res.data;
    },
  });

  const cards = {
    admin: [
      {
        title: "Total Employees",
        icon: <Users className="text-blue-500" />,
        value: overview.totalEmployees || 0,
      },
      {
        title: "Total HRs",
        icon: <BadgeCheck className="text-green-500" />,
        value: overview.totalHRs || 0,
      },
      {
        title: "Fired Users",
        icon: <BarChart3 className="text-red-500" />,
        value: overview.totalFired || 0,
      },
    ],
    hr: [
      {
        title: "Managed Employees",
        icon: <Users className="text-purple-500" />,
        value: overview.managedEmployees || 0,
      },
      {
        title: "Tasks Submitted",
        icon: <BarChart3 className="text-indigo-500" />,
        value: overview.tasksThisMonth || 0,
      },
      {
        title: "Avg Work Hours",
        icon: <Clock className="text-yellow-500" />,
        value: overview.avgWorkHours || 0,
      },
    ],
    employee: [
      {
        title: "Hours This Month",
        icon: <Clock className="text-blue-600" />,
        value: overview.totalHours || 0,
      },
      {
        title: "Last Payment",
        icon: <DollarSign className="text-green-600" />,
        value: `$${overview.lastPayment || 0}`,
      },
      {
        title: "Status",
        icon: <BadgeCheck className="text-gray-700" />,
        value: overview.status || "N/A",
      },
    ],
  };

  const role = overview?.role || "employee";
  const dashboardCards = cards[role] || [];

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        👋 Welcome, {user?.displayName || "User"}
      </h2>

      {isLoading ? (
        <p className="text-center py-6 text-gray-500">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, i) => (
            <motion.div
              key={i}
              className="p-5 bg-white border rounded-lg shadow hover:shadow-md transition"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 p-2 rounded-full">{card.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800">{card.title}</h4>
              </div>
              <p className="text-3xl font-bold text-blue-700">{card.value}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Overview;