const services = [
    {
        title: "Employee Management",
        description: "Track employee tasks, roles, and progress in real-time with our centralized dashboard.",
        icon: "👨‍💼",
    },
    {
        title: "Payroll Automation",
        description: "Seamlessly calculate and pay employee salaries with bank integration and tracking.",
        icon: "💰",
    },
    {
        title: "HR Tools",
        description: "Manage hiring, verification, and role assignment with ease using built-in HR features.",
        icon: "📋",
    },
    {
        title: "Secure Authentication",
        description: "Secure email/password and social login support for employees and HR admins.",
        icon: "🔐",
    },
    {
        title: "Real-Time Reporting",
        description: "Generate salary reports, performance charts, and monthly work summaries instantly.",
        icon: "📊",
    },
    {
        title: "Responsive Design",
        description: "Optimized for desktop, tablet, and mobile so you can manage your team anywhere.",
        icon: "📱",
    },
];

const Services = () => {
    console.log("Services component is rendering...");

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Our Services</h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Explore powerful tools designed to help you manage employees, HR processes, and payroll—fast and efficiently.
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-all border-t-4 border-blue-500"
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;