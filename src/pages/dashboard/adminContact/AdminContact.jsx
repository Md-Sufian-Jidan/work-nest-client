import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";

const AdminContact = () => {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const res = await axios.get("/api/contact-messages");
      return res.data;
    },
  });

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl font-bold text-blue-600 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        📬 Contact Messages
      </motion.h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className="border rounded-lg p-4 shadow bg-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">From: <span className="font-medium text-gray-700">{msg.email}</span></p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.timestamp || Date.now()).toLocaleString()}
                </p>
              </div>
              <p className="text-gray-800">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminContact;