import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ContactUs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const message = {
      email: data.email,
      message: data.message,
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    const res = await axiosSecure.post("/contact-us", message);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Message Sent!",
        text: "We appreciate your feedback 💬",
        icon: "success",
      });
      reset();
    }
  };

  return (
    <>
      <Helmet>
        <title>WorkNest | ContactUs</title>
      </Helmet>
      <motion.div
        className="max-w-4xl mx-auto p-6 space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-primary"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          ✉ Contact Us
        </motion.h2>

        {/* Company Info */}
        <motion.div
          className="bg-primary/10 p-6 rounded-lg shadow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Office</h3>
          <p className="text-gray-600 text-sm">
            WorkNest Headquarters<br />
            123 Nest Street, Tech Valley<br />
            Innovation City, CodeState, 45678<br />
            Email: <a href="mailto:info@worknest.com" className="text-primary hover:underline">info@worknest.com</a>
          </p>
        </motion.div>

        {/* Contact Form OR Login Prompt */}
        {user ? (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 shadow rounded-lg space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                {...register("email", { required: true })}
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium mb-1">Your Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                {...register("message", { required: true })}
                className="w-full border p-2 rounded"
              ></textarea>
              {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
            </motion.div>

            <motion.button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center bg-red-50 border border-red-200 rounded-lg p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-red-600 text-lg font-medium mb-3">
              Please log in to send us a message.
            </p>
            <Link to="/login">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Go to Login
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ContactUs;