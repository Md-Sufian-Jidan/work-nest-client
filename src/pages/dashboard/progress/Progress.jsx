import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Progress = () => {
    const { user } = useAuth();
    const [selectedEmployee, setSelectedEmployee] = useState("");
    // const [selectedEmail, setSelectedEmail] = useState();

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // default = current month
    const [filteredRecords, setFilteredRecords] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: workRecords = [], isLoading, refetch } = useQuery({
        queryKey: ["work-records"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-work-records?employee=${selectedEmployee}`); // from all employees
            return res.data;
        },
    });

    const employees = [...new Set(workRecords.map((item) => item.name))];

    useEffect(() => {
        const filtered = workRecords.filter((item) => {
            const itemMonth = new Date(item.date).getMonth() + 1;
            const byMonth = itemMonth === Number(selectedMonth);
            const byEmployee = selectedEmployee ? item.employeeName === selectedEmployee : true;
            return byMonth && byEmployee;
        });

        setFilteredRecords(filtered);
    }, [selectedMonth, selectedEmployee, workRecords]);

    const totalHours = filteredRecords.reduce((sum, item) => sum + Number(item.hoursWorked), 0);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📈 Progress Tracker</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                <select
                    className="border p-2 rounded"
                    value={selectedEmployee}
                    onChange={(e) => {
                        setSelectedEmployee(e.target.value);
                        console.log(e.target.value);
                        refetch();
                    }}
                >
                    <option value="">All Employees</option>
                    {employees.map((emp, i) => (
                        <option key={i} value={emp}>{emp}</option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                        </option>
                    ))}
                </select>
            </div>

            {/* Summary */}
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded mb-6">
                <p className="text-blue-800 text-lg font-medium">
                    Total Hours Worked: <span className="font-bold">{totalHours}</span>
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-lg shadow-sm">
                {isLoading ? (
                    <p className="text-center py-4">Loading...</p>
                ) : filteredRecords.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No records found for selected filters.</p>
                ) : (
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th className="p-3">Employee</th>
                                <th className="p-3">Task</th>
                                <th className="p-3">Hours</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.task}</td>
                                    <td className="p-3">{item.hoursWorked}</td>
                                    <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Progress;