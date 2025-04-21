import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Clock, Zap, Users, TrendingUp } from "lucide-react";
import useAxiosPublic from "../../../hooks/useaxiosPublic";

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
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Why Choose WorkNest?</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    We combine performance, security, and user experience to provide the ultimate employee management platform.
                </p>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-left">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-blue-500"
                        >
                            {iconMap[feature.icon]}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;