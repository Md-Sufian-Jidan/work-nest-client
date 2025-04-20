import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useaxiosPublic";
import { useEffect, useState } from "react";

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

const Services = () => {
    const axiosPublic = useAxiosPublic();
    // const [services, setServices] = useState();

    useEffect(() => {
        const { data = [] } = useQuery({
            queryKey: ['services'],
            queryFn: async () => {
                const res = await axiosPublic.get('/services')
                // setServices(res?.data);
                return res.data;
            }
        });
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-blue-600 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Services
                </motion.h2>

                <motion.p
                    className="text-gray-600 mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Explore powerful tools designed to help you manage employees, HR processes, and payroll—fast and efficiently.
                </motion.p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((service, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all border-t-4 border-blue-500"
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            custom={i}
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Services;