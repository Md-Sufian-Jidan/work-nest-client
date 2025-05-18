import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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

const Services = () => {
  const axiosPublic = useAxiosPublic();

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosPublic.get("/services");
      return res.data;
    },
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>

        <motion.p
          className="text-gray-600 font-body text-base md:text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Powerful tools to help you manage employees, streamline HR tasks, and handle payroll efficiently and securely.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="bg-white h-full flex flex-col justify-start text-left rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 border-t-4 border-primary"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
            >
              <div className="text-primary text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold font-heading text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 font-body">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;