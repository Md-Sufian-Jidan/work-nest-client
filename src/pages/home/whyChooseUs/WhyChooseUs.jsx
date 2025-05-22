import { motion } from "framer-motion";
import { ShieldCheck, Clock, Zap, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconMap = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-white" />,
  Clock: <Clock className="w-6 h-6 text-white" />,
  Zap: <Zap className="w-6 h-6 text-white" />,
  Users: <Users className="w-6 h-6 text-white" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-white" />,
};

const WhyChooseUs = () => {
  const axiosPublic = useAxiosPublic();
  const { data: features = [] } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const res = await axiosPublic.get("/features");
      return res.data;
    },
  });

  return (
    <section className="py-20 px-4 md:px-8 bg-bg-soft dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary dark:text-accent font-heading"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose WorkNest?
        </motion.h2>
        <motion.p
          className="text-text-secondary dark:text-text-secondary font-body mt-4 max-w-xl mx-auto text-base md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          A smart, secure, and scalable platform tailored to modern workplace needs.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-card-bg dark:bg-card-bg-dark p-6 rounded-xl shadow-card dark:shadow-md hover:shadow-xl dark:hover:shadow-lg transition transform hover:scale-[1.015] border-t-4 border-accent h-full flex flex-col"
            variants={cardVariants}
          >
            <div className="w-12 h-12 bg-primary dark:bg-accent rounded-full flex items-center justify-center mb-4 shadow-md">
              {iconMap[feature.icon]}
            </div>
            <h4 className="text-lg font-semibold text-text-main dark:text-white font-heading mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-text-secondary dark:text-text-secondary font-body">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
