import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import CheckOut from "./CheckOut";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();

  const {
    data: employee = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["single-employee", email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-employee/${email}`);
      return res.data;
    },
  });

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading payment information...
      </div>
    );
  }

  if (isError || !employee?._id) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load employee information. Please try again.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-card-bg dark:bg-card-bg-dark shadow rounded-md mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-primary dark:text-accent text-center mb-6">💳 Pay Salary</h2>

      <div className="mb-6 p-4 border rounded-md bg-bg-soft dark:bg-bg-dark text-text-secondary text-sm">
        <p><strong>Employee:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Salary:</strong> <span className="text-green-600 font-medium">${employee.salary}</span></p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckOut singleEmployee={employee} />
      </Elements>
    </motion.div>
  );
};

export default Payment;