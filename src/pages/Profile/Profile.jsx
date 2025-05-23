import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import EditProfileModal from "./EditProfileModal";
import { Helmet } from "react-helmet";

const Profile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setModalOpen] = useState(false);

    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/profile/${user?.email}`);
            return res.data;
        },
    });

    if (loading || isLoading) {
        return (
            <div className="text-center py-10 text-blue-600 dark:text-accent font-semibold">
                Loading Profile...
            </div>
        );
    }

    if (!profile?.email) {
        return (
            <div className="text-center py-10 text-gray-500 dark:text-text-secondary">
                No profile data found.
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>WorkNest | User Profile</title>
            </Helmet>
            <motion.div
                className="max-w-3xl mx-auto p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-primary dark:text-accent mb-6 text-center">
                    👤 My Profile
                </h2>

                <div className=" dark:bg-bg-dark rounded-lg shadow dark:shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border-t-4 border-primary dark:border-accent">
                    <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary dark:border-accent"
                    />
                    <div className="w-full space-y-2 text-text-main dark:text-text-secondary">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Role:</strong> {profile.role}</p>
                        <p><strong>Designation:</strong> {profile.designation}</p>
                        <p><strong>Bank Account:</strong> {profile.bank_account_no}</p>
                        <p><strong>Salary:</strong> ${profile.salary}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={
                                    profile.status === "fired"
                                        ? "text-red-500 dark:text-red-400"
                                        : "text-green-600 dark:text-green-400"
                                }
                            >
                                {profile.status}
                            </span>
                        </p>
                        <p><strong>Verified:</strong> {profile.verified ? "✅ Yes" : "❌ No"}</p>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 bg-primary dark:bg-btn text-white rounded hover:bg-blue-700 dark:hover:bg-btn/90 transition"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Optional Modal */}
                {isModalOpen && (
                    <EditProfileModal
                        profile={profile}
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        refetch={refetch}
                    />
                )}
            </motion.div>
        </>
    );
};

export default Profile;
