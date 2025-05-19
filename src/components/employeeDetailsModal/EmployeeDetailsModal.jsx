import { motion, AnimatePresence } from "framer-motion";

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
    if (!isOpen || !employee) return null;

    const badgeColor = {
        admin: "bg-purple-100 text-purple-700",
        hr: "bg-green-100 text-green-700",
        employee: "bg-blue-100 text-blue-700",
        default: "bg-gray-100 text-gray-700"
    };

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    key="modal"
                    className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    {/* Avatar */}
                    {employee.photo && (
                        <div className="flex justify-center mb-4">
                            <img
                                src={employee.photo}
                                alt={employee.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                            />
                        </div>
                    )}

                    {/* Name and Role */}
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{employee.name}</h3>
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${
                                badgeColor[employee.role] || badgeColor.default
                            }`}
                        >
                            {employee.role}
                        </span>
                    </div>

                    {/* Employee Details */}
                    <div className="text-sm space-y-2 text-gray-700">
                        <p><span className="font-medium text-gray-600">📧 Email:</span> {employee.email}</p>
                        <p><span className="font-medium text-gray-600">🎯 Designation:</span> {employee.designation}</p>
                        <p><span className="font-medium text-gray-600">🏦 Bank Account:</span> {employee.bank_account_no}</p>
                        <p><span className="font-medium text-gray-600">💰 Salary:</span> ${employee.salary}</p>
                        <p><span className="font-medium text-gray-600">📌 Status:</span> {employee.status}</p>
                        <p>
                            <span className="font-medium text-gray-600">✅ Verified:</span>{" "}
                            <span className={employee.verified ? "text-green-600" : "text-red-500"}>
                                {employee.verified ? "Yes" : "No"}
                            </span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EmployeeDetailsModal;