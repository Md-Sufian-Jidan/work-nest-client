import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditProfileModal = ({ isOpen, onClose, profile, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: profile.name,
            designation: profile.designation,
            bank_account_no: profile.bank_account_no,
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/update-profile/${profile.email}`, data);
            if (res.data.modifiedCount > 0) {
                toast.success("Profile updated successfully!");
                onClose();
                reset();
                refetch();
            } else {
                toast.info("No changes made.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">Edit Profile</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium">User Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Jhon Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm">User name is required.</p>}
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block text-sm font-medium">Designation</label>
                        <input
                            type="text"
                            {...register("designation", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Developer"
                        />
                        {errors.designation && <p className="text-red-500 text-sm">Designation is required.</p>}
                    </div>

                    {/* Bank Account */}
                    <div>
                        <label className="block text-sm font-medium">Bank Account No</label>
                        <input
                            type="text"
                            {...register("bank_account_no", { required: true })}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. 1234567890"
                        />
                        {errors.bank_account_no && <p className="text-red-500 text-sm">Bank account is required.</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {isSubmitting ? "Saving..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;