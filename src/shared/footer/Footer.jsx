const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-6 border-t">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-left">
        {/* Brand + Intro */}
        <div>
          <h2 className="text-2xl font-bold text-primary font-heading mb-3">WorkNest</h2>
          <p className="text-sm text-gray-600 font-body leading-relaxed">
            Simplifying employee management with smart tools for HRs, Admins, and teams to work better together.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 font-heading">Company</h4>
          <ul className="space-y-2 text-sm font-body">
            <li>
              <a href="/" className="hover:text-primary transition duration-200">Home</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-primary transition duration-200">Dashboard</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary transition duration-200">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 font-heading">Contact</h4>
          <p className="text-sm text-gray-600 font-body">
            123 Business Ave, Suite 100<br />
            New York, NY 10001
          </p>
          <p className="text-sm mt-2 text-gray-600 font-body">
            Email: <a href="mailto:support@worknest.io" className="hover:underline text-primary">support@worknest.io</a>
          </p>
        </div>

        {/* Social / Extras */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 font-heading">Follow Us</h4>
          <ul className="space-y-2 text-sm font-body">
            <li><a href="#" className="hover:text-primary transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-primary transition">Twitter</a></li>
            <li><a href="#" className="hover:text-primary transition">Facebook</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-12 text-sm text-gray-500 font-body border-t pt-4">
        © {new Date().getFullYear()} <span className="font-semibold text-primary">WorkNest</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;