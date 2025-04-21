import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ContactUs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const res = await axiosSecure.post("/contact-us", data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Message Sent!",
        text: "We appreciate your feedback 💬",
        icon: "success"
      });
      reset();
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-blue-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        ✉ Contact Us
      </motion.h2>

      {/* Company Info */}
      <motion.div
        className="bg-blue-50 p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Office</h3>
        <p className="text-gray-600">
          WorkNest Headquarters<br />
          123 Nest Street, Tech Valley<br />
          Innovation City, CodeState, 45678<br />
          Email: info@worknest.com
        </p>
      </motion.div>

      {/* Contact Form */}
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
            placeholder="you@example.com"
            defaultValue={user?.email}
            readOnly
            {...register("email", { required: true })}
            className="w-full border p-2 rounded"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}

export default ContactUs;