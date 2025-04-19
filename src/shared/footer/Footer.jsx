
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 gap-8">

                {/* <!-- Logo & Intro --> */}
                <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-3">WorkNest</h2>
                    <p className="text-sm">
                        Simplifying employee management with smart tools for HR, Admins, and your whole team.
                    </p>
                </div>

                {/* <!-- Company Links --> */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Company</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
                        <li><a href="/dashboard" className="hover:text-blue-600 transition">Dashboard</a></li>
                        <li><a href="/contact" className="hover:text-blue-600 transition">Contact Us</a></li>
                    </ul>
                </div>

                {/* <!-- Resources --> */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Resources</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Help Center</a></li>
                    </ul>
                </div>

                {/* <!-- Contact --> */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Contact</h4>
                    <p className="text-sm">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                    <p className="text-sm mt-2">Email: support@worknest.io</p>
                </div>
            </div>

            {/* <!-- Bottom --> */}
            <div className="text-center mt-8 text-sm text-gray-500 border-t pt-4">
                © {new Date().getFullYear()} WorkNest. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
