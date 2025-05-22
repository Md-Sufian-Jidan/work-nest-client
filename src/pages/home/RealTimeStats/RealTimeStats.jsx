import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaClock, FaTasks, FaBuilding } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, label: "Registered Users", value: 12847 },
  { icon: <FaClock />, label: "Hours Logged", value: 93214 },
  { icon: <FaTasks />, label: "Tasks Completed", value: 17420 },
  { icon: <FaBuilding />, label: "Active Teams", value: 312 },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const RealTimeStats = () => {
  return (
    <section className="py-20 bg-bg-soft dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-text-main dark:text-accent text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Real-Time Stats
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-card-bg-dark rounded-2xl p-6 shadow-md dark:shadow-lg text-center flex flex-col items-center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <div className="text-3xl text-btn dark:text-accent mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-text-main dark:text-white mb-2">
                <CountUp end={stat.value} duration={2} separator="," />
              </div>
              <p className="text-sm text-text-secondary dark:text-gray-400 font-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealTimeStats;
