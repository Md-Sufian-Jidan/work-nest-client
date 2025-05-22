import { Link } from "react-router-dom";
import useRole from "../../hooks/useRole";

const Footer = () => {
  const { role } = useRole();
  return (
    <footer className="bg-white dark:bg-bg-dark text-gray-700 dark:text-gray-300 pt-16 pb-6 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-left">
        {/* Brand + Intro */}
        <div>
          <h2 className="text-2xl font-bold text-primary font-heading mb-3">WorkNest</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-body leading-relaxed">
            Simplifying employee management with smart tools for HRs, Admins, and teams to work better together.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 font-heading">Company</h4>
          <ul className="space-y-2 text-sm font-body">
            <li>
              <Link to="/" className="hover:text-primary dark:hover:text-accent transition duration-200">Home</Link>
            </li>
            <li>
              <Link
                to={`${role === 'admin' ? '/dashboard/all-employee-list' : role === 'hr' ? '/dashboard/employee-list' : '/dashboard/work-sheet'}`}
                className="hover:text-primary dark:hover:text-accent transition duration-200">Dashboard</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary dark:hover:text-accent transition duration-200">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 font-heading">Contact</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
            123 Business Ave, Suite 100<br />
            New York, NY 10001
          </p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 font-body">
            Email: <a href="mailto:support@worknest.io" className="hover:underline text-primary dark:text-accent">support@worknest.io</a>
          </p>
        </div>

        {/* Social / Extras */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 font-heading">Follow Us</h4>
          <ul className="space-y-2 text-sm font-body">
            <li>
              <a href="#" className="hover:text-primary dark:hover:text-accent transition">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary dark:hover:text-accent transition">Twitter</a>
            </li>
            <li>
              <a href="#" className="hover:text-primary dark:hover:text-accent transition">Facebook</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400 font-body border-t dark:border-gray-700 pt-4">
        © {new Date().getFullYear()} <span className="font-semibold text-primary dark:text-accent">WorkNest</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
