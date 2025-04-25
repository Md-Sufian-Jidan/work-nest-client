import { motion } from "framer-motion";
import { ShieldCheck, Clock, Zap, Users, TrendingUp } from "lucide-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const WhyChooseUs = () => {
    const axiosPublic = useAxiosPublic();
    const { data: features = [] } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const res = await axiosPublic.get('/features');
            return res.data;
        },
    });
    const iconMap = {
        ShieldCheck: <ShieldCheck className="w-8 h-8 text-blue-600" />,
        Clock: <Clock className="w-8 h-8 text-blue-600" />,
        Zap: <Zap className="w-8 h-8 text-blue-600" />,
        Users: <Users className="w-8 h-8 text-blue-600" />,
        TrendingUp: <TrendingUp className="w-8 h-8 text-blue-600" />
    };
    return (
        <section className="py-12 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-blue-600"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Why Choose WorkNest?
                </motion.h2>
                <motion.p
                    className="text-gray-600 mt-3 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    A smart, secure, and scalable platform tailored to modern workplace needs.
                </motion.p>
            </div>

            <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all"
                        variants={cardVariants}
                    >
                        {iconMap[feature.icon]}
                        <h4 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default WhyChooseUs;
