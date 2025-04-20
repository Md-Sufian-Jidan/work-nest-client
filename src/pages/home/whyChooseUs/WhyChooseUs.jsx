import { ShieldCheck, Clock, Zap, Users, TrendingUp } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
        title: "Secure & Reliable",
        desc: "Enterprise-grade protection with encrypted data handling and role-based access control.",
    },
    {
        icon: <Clock className="w-8 h-8 text-blue-600" />,
        title: "Real-Time Updates",
        desc: "Instant data sync for tasks, salaries, and work history across all roles.",
    },
    {
        icon: <Zap className="w-8 h-8 text-blue-600" />,
        title: "Lightning Fast",
        desc: "Optimized for performance with modern React architecture and efficient DB queries.",
    },
    {
        icon: <Users className="w-8 h-8 text-blue-600" />,
        title: "Team Focused",
        desc: "Custom dashboards for Employees, HRs, and Admins to streamline collaboration.",
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
        title: "Analytics & Insights",
        desc: "Track work hours, payment history, and productivity across months in one place.",
    },
];

const WhyChooseUs = () => {
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
                            <div className="mb-4">{feature.icon}</div>
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