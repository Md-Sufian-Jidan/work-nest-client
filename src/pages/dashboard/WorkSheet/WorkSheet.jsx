import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const taskOptions = ["Sales", "Support", "Content", "Paper-work", "Design", "Marketing"];

const WorkSheet = () => {
    const [date, setDate] = useState(new Date());
    // const [workLogs, setWorkLogs] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: works = [], refetch } = useQuery({
        queryKey: ['workSheet'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/work-sheet/${user?.email}`);
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        const entry = {
            task: data.task,
            hoursWorked: data.hoursWorked,
            date: date.toISOString().split("T")[0],
            email: user?.email,
        };
        const res = await axiosSecure.post("/work-sheet", entry);
        if (res.data.insertedId) {
            Swal.fire({
                icon: 'success',
                title: 'Your work has been recorded successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
            reset();
            setDate(new Date());
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📋 Work Sheet</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center gap-4 mb-6">
                {/* Task Dropdown */}
                <select
                    {...register("task", { required: true })}
                    className="border p-2 rounded w-full md:w-auto"
                >
                    <option value="">Select Task</option>
                    {taskOptions.map((task, idx) => (
                        <option key={idx} value={task}>{task}</option>
                    ))}
                </select>

                {/* Hours Worked */}
                <input
                    type="number"
                    placeholder="Hours Worked"
                    {...register("hoursWorked", { required: true, min: 1 })}
                    className="border p-2 rounded w-full md:w-40"
                />

                {/* Date Picker */}
                <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    className="border p-2 rounded w-full md:w-48"
                />

                {/* Submit */}
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
                    <thead className="bg-blue-100 text-left">
                        <tr>
                            <th className="p-2 border">Task</th>
                            <th className="p-2 border">Hours</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {works.length === 0 ? (
                            <tr><td colSpan="3" className="p-4 text-center text-gray-500">No logs yet.</td></tr>
                        ) : (
                            works.map((log, i) => (
                                <tr key={i}>
                                    <td className="p-2 border">{log.task}</td>
                                    <td className="p-2 border">{log.hoursWorked}</td>
                                    <td className="p-2 border">{log.date}</td>
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