import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, LayoutGrid, Table, Pencil } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import IncreaseSalaryModal from "../../../components/IncreaseSalaryModal/IncreaseSalaryModal";
import { Helmet } from "react-helmet";

const AllEmployeeList = () => {
  const [view, setView] = useState("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: employees = [] } = useQuery({
    queryKey: ["all-employees"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/all-verified-employees");
      return res.data;
    },
  });

  const updateSalary = useMutation({
    mutationFn: async ({ id, newSalary }) => {
      return axiosSecure.patch(`/update-salary/${id}`, { salary: newSalary });
    },
    onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
  });

  const makeHR = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/make-hr/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
  });

  const fireUser = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/fired-user/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries(["all-employees"]),
  });

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleConfirm = (newSalary) => {
    updateSalary.mutate({ id: selectedUser._id, newSalary });
    Swal.fire({
      title: "Success!",
      text: `${selectedUser.role} salary has been updated.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
    setModalOpen(false);
  };

  const handleMakeHr = (user) => {
    Swal.fire({
      title: "Promote to HR?",
      text: `Are you sure you want to promote ${user.name} to HR?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        makeHR.mutate(user._id, {
          onSuccess: () => {
            Swal.fire("Promoted!", `${user.name} is now HR.`, "success");
          },
        });
      }
    });
  };

  const handleFire = (user) => {
    Swal.fire({
      title: "Fire Employee?",
      text: `Are you sure you want to fire ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fireUser.mutate(user._id, {
          onSuccess: () => {
            Swal.fire("Fired!", `${user.name} has been removed.`, "success");
          },
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>WorkNest | AllEmployeeList</title>
      </Helmet>
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary dark:text-accent">👑 All Verified Employees</h2>
          <button
            onClick={() => setView(view === "table" ? "grid" : "table")}
            className="flex items-center gap-2 text-primary dark:text-accent border px-3 py-1 rounded hover:bg-blue-50 transition"
          >
            {view === "table" ? <LayoutGrid size={18} /> : <Table size={18} />}
            {view === "table" ? "Grid View" : "Table View"}
          </button>
        </div>

        {/* Table View */}
        {view === "table" && (
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-bg-soft dark:bg-bg-dark">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Salary</th>
                  <th className="p-3">Make HR</th>
                  <th className="p-3">Fire</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {employees.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="border-t"
                    >
                      <td className="p-3">{user.name}</td>
                      <td className="p-3 capitalize">{user.role}</td>
                      <td className="p-3">
                        ${user.salary}
                        <button
                          onClick={() => openModal(user)}
                          className="text-primary ml-2 hover:underline"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                      <td className="p-3">
                        {user.role === "employee" ? (
                          <button
                            onClick={() => handleMakeHr(user)}
                            className="text-green-600 hover:underline"
                          >
                            Promote
                          </button>
                        ) : (
                          <span className="text-text-secondary">—</span>
                        )}
                      </td>
                      <td className="p-3">
                        {user.status === "fired" ? (
                          <span className="text-red-500 font-semibold">Fired</span>
                        ) : (
                          <button
                            onClick={() => handleFire(user)}
                            className="text-red-500 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Fire
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <AnimatePresence>
              {employees.map((user) => (
                <motion.div
                  key={user._id}
                  className="border rounded-lg p-4 shadow-sm bg-card-bg dark:bg-card-bg-dark"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                  <p className="text-sm capitalize">Role: {user.role}</p>
                  <p className="text-sm">Salary: ${user.salary}</p>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    {user.role === "employee" && (
                      <button
                        onClick={() => handleMakeHr(user)}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"
                      >
                        Make HR
                      </button>
                    )}

                    <button
                      onClick={() => openModal(user)}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      Adjust Salary
                    </button>

                    {user.status === "fired" ? (
                      <span className="text-red-500 font-medium">Fired</span>
                    ) : (
                      <button
                        onClick={() => handleFire(user)}
                        className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm"
                      >
                        Fire
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-bg-soft dark:bg-bg-dark rounded-lg p-6 shadow-lg w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                {selectedUser && (
                  <IncreaseSalaryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirm}
                    currentSalary={selectedUser.salary}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default AllEmployeeList;