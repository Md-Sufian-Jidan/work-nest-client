import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Bell, BarChart3, Users, Folder } from "lucide-react";

const tools = [
  {
    icon: <CreditCard className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Stripe Payments",
    description: "Fast, secure, and globally trusted payments integration with complete transaction tracking.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Secure Login",
    description: "Two-factor authentication and OAuth for safe and seamless access control.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Analytics Dashboard",
    description: "Visualize performance and usage with real-time data-driven insights.",
  },
  {
    icon: <Bell className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Smart Notifications",
    description: "In-app alerts and email notifications to stay updated and responsive.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Team Collaboration",
    description: "Real-time editing, sharing, and feedback tools for seamless teamwork.",
  },
  {
    icon: <Folder className="w-8 h-8 text-primary dark:text-accent" />,
    title: "Document Vault",
    description: "Secure file storage and role-based access to critical documentation.",
  },
];

const cardVariants = {
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

const FeaturedTools = () => {
  return (
    <section className="py-20 bg-bg-soft dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-primary dark:text-accent mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Tools
        </motion.h2>

        <motion.p
          className="text-base md:text-lg font-body text-text-secondary dark:text-text-secondary mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Powerful features that make WorkNest the best choice for HR and team management.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-card-bg-dark border-t-4 border-primary dark:border-accent rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 text-left"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <div className="mb-4">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-text-main dark:text-white font-heading mb-2">
                {tool.title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 font-body">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
