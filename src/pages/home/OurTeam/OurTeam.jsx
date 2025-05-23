import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ayaan Rahman",
    role: "CEO & Founder",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Meher Fatima",
    role: "Head of HR",
    image: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "Rohan Sen",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Sarah Jain",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=23",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
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

const OurTeam = () => {
  return (
    <section className="py-20 bg-bg-soft dark:bg-bg-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary dark:text-accent font-heading mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          className="text-text-secondary dark:text-text-secondary font-body mb-12 max-w-2xl mx-auto text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          A group of passionate experts driving innovation, collaboration, and impact at WorkNest.
        </motion.p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="bg-bg-soft dark:bg-card-bg-dark p-6 rounded-xl shadow-md dark:shadow-lg hover:shadow-xl transition duration-300 text-center group"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-primary/30 dark:ring-accent/30 shadow mb-4 transform group-hover:scale-105 transition duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold font-heading text-text-main dark:text-white">
                {member.name}
              </h4>
              <p className="text-sm text-text-secondary dark:text-gray-400 font-body">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
