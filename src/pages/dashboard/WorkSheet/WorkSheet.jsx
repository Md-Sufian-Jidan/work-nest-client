import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const taskOptions = ["Sales", "Support", "Content", "Paper-work", "Design", "Marketing"];

const WorkSheet = () => {
    const [task, setTask] = useState("");
    const [hours, setHours] = useState("");
    const [date, setDate] = useState(new Date());
    const [workData, setWorkData] = useState([]);

    // Simulate fetching employee-specific data from DB
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("workLogs") || "[]");
        setWorkData(stored);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            task,
            hours: Number(hours),
            date: date.toISOString().split("T")[0], // YYYY-MM-DD
            id: Date.now(),
        };

        const updated = [newEntry, ...workData];
        setWorkData(updated);
        localStorage.setItem("workLogs", JSON.stringify(updated));

        // Clear
        setTask("");
        setHours("");
        setDate(new Date());
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">📝 Work Sheet</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <select
                    required
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border p-2 rounded w-full md:w-auto"
                >
                    <option value="">Select Task</option>
                    {taskOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </select>

                <input
                    type="number"
                    value={hours}
                    required
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="Hours Worked"
                    className="border p-2 rounded w-full md:w-40"
                />

                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    className="border p-2 rounded w-full md:w-48"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </form>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-blue-100 text-left">
                            <th className="p-2 border">Task</th>
                            <th className="p-2 border">Hours</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workData.length === 0 ? (
                            <tr><td colSpan="3" className="text-center p-4 text-gray-500">No data found.</td></tr>
                        ) : (
                            workData.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="p-2 border">{entry.task}</td>
                                    <td className="p-2 border">{entry.hours}</td>
                                    <td className="p-2 border">{entry.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WorkSheet;