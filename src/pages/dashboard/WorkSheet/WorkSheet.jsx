import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

const taskOptions = ["Sales", "Support", "Content", "Paper-work", "Design", "Marketing"];

const WorkSheet = () => {
  const [date, setDate] = useState(new Date());
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
      hoursWorked: parseFloat(data.hoursWorked),
      date: format(date, "dd/MM/yyyy"),
      name: user?.displayName,
      email: user?.email,
    };
    const res = await axiosSecure.post("/work-sheet", entry);
    if (res.data.insertedId) {
      Swal.fire({
        icon: 'success',
        title: 'Work logged successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
      reset();
      setDate(new Date());
    }
  };

  return (
    <>
      <Helmet>
        <title>WorkNest | WorkSheet</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary dark:text-accent mb-6">📋 Work Sheet</h2>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-5 gap-4 mb-8">
          {/* Task */}
          <div className="col-span-2">
            <select
              {...register("task", { required: true })}
              className="w-full border border-gray-300 dark:border-text-secondary rounded px-3 py-2 text-sm bg-white dark:bg-bg-soft text-text-main dark:text-text-main"
            >
              <option value="">Select Task</option>
              {taskOptions.map((task, idx) => (
                <option key={idx} value={task}>
                  {task}
                </option>
              ))}
            </select>
            {errors.task && (
              <span className="text-sm text-red-500 dark:text-red-400">Task is required</span>
            )}
          </div>

          {/* Hours Worked */}
          <div>
            <input
              type="number"
              placeholder="Hours"
              {...register("hoursWorked", { required: true, min: 1 })}
              className="w-full border border-gray-300 dark:border-text-secondary rounded px-3 py-2 text-sm bg-white dark:bg-bg-soft text-text-main dark:text-text-main"
            />
            {errors.hoursWorked && (
              <span className="text-sm text-red-500 dark:text-red-400">Hours must be at least 1</span>
            )}
          </div>

          {/* Date */}
          <div>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="w-full border border-gray-300 dark:border-text-secondary rounded px-3 py-2 text-sm bg-white dark:bg-bg-soft text-text-main dark:text-text-main"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* Button */}
          <div className="flex items-center">
            <button
              type="submit"
              className="w-full bg-btn text-white font-medium py-2 px-4 rounded hover:bg-btn-hover dark:hover:bg-accent transition"
            >
              Add
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded shadow bg-white dark:bg-bg-soft dark:shadow-md">
          <table className="min-w-full text-sm border border-gray-300 dark:border-text-secondary text-text-main dark:text-text-secondary bg-bg-soft dark:bg-bg-dark">
            <thead className="bg-bg-soft dark:bg-bg-dark text-left text-text-secondary">
              <tr>
                <th className="p-3 border border-gray-300 dark:border-text-secondary">Name</th>
                <th className="p-3 border border-gray-300 dark:border-text-secondary">Task</th>
                <th className="p-3 border border-gray-300 dark:border-text-secondary">Hours</th>
                <th className="p-3 border border-gray-300 dark:border-text-secondary">Date</th>
              </tr>
            </thead>
            <tbody>
              {works.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-text-secondary"
                  >
                    No work records yet.
                  </td>
                </tr>
              ) : (
                works.map((log, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-300 dark:border-text-secondary hover:bg-bg-soft transition"
                  >
                    <td className="p-3 border border-gray-300 dark:border-text-secondary">
                      {log.name}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-text-secondary">
                      {log.task}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-text-secondary">
                      {log.hoursWorked}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-text-secondary">
                      {log.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WorkSheet;