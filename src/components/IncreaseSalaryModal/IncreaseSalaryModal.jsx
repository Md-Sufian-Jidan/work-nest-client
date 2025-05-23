import { toast } from "react-toastify";

const IncreaseSalaryModal = ({ isOpen, onClose, onConfirm, currentSalary }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newSalary = parseInt(form.newSalary.value);

        if (isNaN(newSalary) || newSalary <= currentSalary) {
            toast.error(`New salary must be greater than current salary: $${currentSalary}`);
            return;
        }

        onConfirm(newSalary);
        form.reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-bg-soft dark:bg-bg-dark flex items-center justify-center">
            <div className="bg-bg-soft dark:bg-bg-dark rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold text-primary dark:text-accent mb-4">Increase Salary</h3>
                <p className="text-text-main dark:text-text-secondary mb-4">
                    Current Salary: <span className="font-bold">${currentSalary}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">New Salary</label>
                        <input
                            type="number"
                            name="newSalary"
                            required
                            min={parseFloat(currentSalary) + 1}
                            className="w-full border p-2 rounded"
                            placeholder={`Greater than ${currentSalary}`}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default IncreaseSalaryModal;