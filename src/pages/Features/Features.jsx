import { motion } from "framer-motion";
import { UserCog, Users, ClipboardList } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const roleFeatures = [
  {
    role: "Admin",
    icon: <UserCog className="w-6 h-6 text-white" />,
    color: "bg-blue-500 dark:bg-blue-600",
    features: [
      "View all employees",
      "Adjust salaries",
      "Promote/demote roles",
      "Remove access",
    ],
  },
  {
    role: "HR",
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    color: "bg-green-500 dark:bg-green-600",
    features: [
      "Verify employees",
      "Manage payments",
      "Track team progress",
      "View employee details",
    ],
  },
  {
    role: "Employee",
    icon: <Users className="w-6 h-6 text-white" />,
    color: "bg-yellow-500 dark:bg-yellow-600",
    features: [
      "Submit work sheets",
      "Track payment history",
      "Manage profile",
      "View performance",
    ],
  },
];

const Features = () => {
  return (
    <>
      <Helmet>
        <title>WorkNest | Features</title>
      </Helmet>
      <div className="pt-20 pb-10 bg-bg-soft dark:bg-gray-900 font-body text-text-main dark:text-white">
        {/* Hero Section */}
        <section className="text-center px-4">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-primary dark:text-accent font-heading mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All-in-One Workforce Management
          </motion.h1>
          <motion.p
            className="text-text-secondary dark:text-text-secondary max-w-xl mx-auto mb-6 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            From task tracking to secure payments and HR workflows, WorkNest is built for modern teams.
          </motion.p>
          <Link to="/register">
            <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition">
              Get Started
            </button>
          </Link>
        </section>

        {/* Role-Based Features */}
        <section className="mt-16 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-text-main dark:text-accent mb-8 font-heading">
            Features by Role
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {roleFeatures.map((role, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md dark:shadow-none hover:shadow-lg transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${role.color}`}>
                  {role.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-heading">{role.role}</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-5 space-y-1">
                  {role.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Highlights */}
        <section className="mt-20 px-4 space-y-16">
          {/* Highlight 1 */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co/WWsc7nxH/42852-1.jpg"
              alt="Work Sheet"
              className="rounded-xl shadow-md dark:shadow-none w-full h-96 object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold text-text-main dark:text-white font-heading mb-3">
                Smart Work Sheet Tracking
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Employees can log tasks daily, track hours worked, and stay organized. HRs can view entries by month and employee.
              </p>
            </div>
          </motion.div>

          {/* Highlight 2 */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 items-center flex-row-reverse"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co/23F68Jyf/2149631015-1.jpg"
              alt="Salary Management"
              className="rounded-xl shadow-md dark:shadow-none w-full h-96 object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold font-heading text-text-main dark:text-white mb-3">
                Secure Salary Management
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Verified HRs can pay salaries via Stripe, and employees can track their payment history with complete transparency.
              </p>
            </div>
          </motion.div>

          {/* Highlight 3 */}
          <motion.div
            className="grid md:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co/gMXtHLyM/22112340-6534502-1-1.jpg"
              alt="Secure Platform"
              className="rounded-xl shadow-md dark:shadow-none w-full h-96 object-cover"
            />
            <div>
              <h3 className="text-2xl font-semibold font-heading text-text-main dark:text-white mb-3">
                Secure, Role-Based Access
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Built with JWT authentication, Firestore, and role-based logic, WorkNest ensures your data stays secure and segmented.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 text-center bg-bg-soft dark:bg-card-bg-dark text-text-main py-12 px-4 rounded-lg mx-4 md:mx-20">
          <h3 className="text-2xl font-heading font-bold mb-3">Ready to simplify your team's workflow?</h3>
          <p className="text-text-secondary mb-5 max-w-xl mx-auto text-sm">
            Start using WorkNest today — no installation required. Just create an account and invite your team.
          </p>
          <Link to="/register">
            <button className="mt-6 px-6 py-2 bg-btn dark:bg-primary text-white font-semibold rounded-full hover:bg-btn-hover dark:hover:bg-btn-hover transition duration-300 shadow-lg dark:shadow-xl">
              Try for Free
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Features;
