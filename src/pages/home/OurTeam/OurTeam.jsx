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

export default function OurTeam() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A group of passionate people dedicated to making employee management seamless and smart.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
              />
              <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
