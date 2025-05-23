import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Mail, Clock } from "lucide-react";
import { parse, format } from "date-fns";
import { Helmet } from "react-helmet";

const AdminContact = () => {
  const axiosSecure = useAxiosSecure();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-contact");
      return res.data;
    },
  });

  const sortedMessages = [...messages].sort((a, b) => {
    const dateTimeA = parse(`${a.date} ${a.time}`, "dd/MM/yyyy hh:mm a", new Date());
    const dateTimeB = parse(`${b.date} ${b.time}`, "dd/MM/yyyy hh:mm a", new Date());
    return dateTimeB - dateTimeA;
  });

  return (
    <>
      <Helmet>
        <title>WorkNest | AdminContact</title>
      </Helmet>

      <motion.div
        className="p-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold text-primary dark:text-accent mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          📬 Contact Messages
        </motion.h2>

        {isLoading ? (
          <div className="text-center text-primary dark:text-accent animate-pulse">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-text-main dark:text-text-secondary flex flex-col items-center mt-10">
            <Mail className="w-10 h-10 mb-2 text-text-main dark:text-text-secondary" />
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMessages.map((msg, i) => (
              <motion.div
                key={i}
                className="bg-card-bg dark:bg-card-bg-dark border-l-4 border-primary dark:border-accent rounded-md shadow-sm dark:shadow-md p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-text-main dark:text-text-secondary">
                    <Mail className="inline-block w-4 h-4 mr-1 text-primary dark:text-accent" />
                    <span className="font-medium">{msg.email}</span>
                  </p>
                  <p className="text-xs text-text-main dark:text-text-secondary flex items-center gap-1">
                    <Clock size={14} />
                    {msg?.date} at {msg?.time}
                  </p>
                </div>
                <p className="text-text-main text-sm leading-relaxed">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AdminContact;