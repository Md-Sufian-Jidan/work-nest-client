import { motion, AnimatePresence } from "framer-motion";

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
    
    if (!isOpen || !employee) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    key="modal"
                    className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-blue-600">
                            👤 {employee.name}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-red-500 text-lg font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Role:</strong> {employee.role}</p>
                        <p><strong>Designation:</strong> {employee.designation}</p>
                        <p><strong>Bank Account:</strong> {employee.bank_account_no}</p>
                        <p><strong>Salary:</strong> ${employee.salary}</p>
                        <p><strong>Status:</strong> {employee.status}</p>
                        <p><strong>Verified:</strong> {employee.verified ? "Yes ✅" : "No ❌"}</p>
                    </div>

                    {employee.photo && (
                        <div className="mt-4">
                            <img
                                src={employee.photo}
                                alt={employee.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto border"
                            />
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default EmployeeDetailsModal