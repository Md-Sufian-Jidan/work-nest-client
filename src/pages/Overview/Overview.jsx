import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart3, Users, BadgeCheck, Clock, DollarSign } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

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
        icon: <Users className="text-primary dark:text-accent" />,
        value: overview.totalEmployees || 0,
      },
      {
        title: "Total HRs",
        icon: <BadgeCheck className="text-primary dark:text-accent" />,
        value: overview.totalHRs || 0,
      },
      {
        title: "Fired Users",
        icon: <BarChart3 className="text-primary dark:text-accent" />,
        value: overview.totalFired || 0,
      },
    ],
    hr: [
      {
        title: "Managed Employees",
        icon: <Users className="text-primary dark:text-accent" />,
        value: overview.managedEmployees || 0,
      },
      {
        title: "Tasks Submitted",
        icon: <BarChart3 className="text-primary dark:text-accent" />,
        value: overview.tasksThisMonth || 0,
      },
      {
        title: "Avg Work Hours",
        icon: <Clock className="text-primary dark:text-accent" />,
        value: overview.avgWorkHours || 0,
      },
    ],
    employee: [
      {
        title: "Hours This Month",
        icon: <Clock className="text-primary dark:text-accent" />,
        value: overview.totalHours || 0,
      },
      {
        title: "Last Payment",
        icon: <DollarSign className="text-primary dark:text-accent" />,
        value: `$${overview.lastPayment || 0}`,
      },
      {
        title: "Status",
        icon: <BadgeCheck className="text-primary dark:text-accent" />,
        value: overview.status || "N/A",
      },
    ],
  };

  const role = overview?.role || "employee";
  const dashboardCards = cards[role] || [];

  return (
    <>
      <Helmet>
        <title>WorkNest | Overview</title>
      </Helmet>
      <section className="p-6 max-w-6xl mx-auto mt-5">
        <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">
          👋 Welcome, {user?.displayName || "User"}
        </h2>

        {isLoading ? (
          <p className="text-center py-6 text-text-secondary dark:text-text-secondary">
            Loading dashboard data...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, i) => (
              <motion.div
                key={i}
                className="p-5 bg-bg-soft dark:bg-bg-dark border dark:border-gray-700 rounded-lg shadow hover:shadow-md dark:shadow-lg transition"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-text-main dark:text-text-secondary">
                    {card.title}
                  </h4>
                </div>
                <p className="text-3xl font-bold text-primary dark:text-primary">
                  {card.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Overview;