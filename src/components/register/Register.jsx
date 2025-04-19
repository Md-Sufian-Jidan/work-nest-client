import { useForm } from "react-hook-form";
import { useState } from "react";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Full Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[\W_]).*$/,
                                    message: "Must include 1 capital letter & 1 special character",
                                },
                            })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block mb-1 font-medium">Role</label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select Role</option>
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="block mb-1 font-medium">Designation</label>
                        <input
                            {...register("designation", { required: "Designation is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="e.g. Digital Marketer"
                        />
                        {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
                    </div>

                    {/* Bank Account No */}
                    <div>
                        <label className="block mb-1 font-medium">Bank Account No</label>
                        <input
                            {...register("bank", { required: "Bank account is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="e.g. 1234567890"
                        />
                        {errors.bank && <p className="text-red-500 text-sm">{errors.bank.message}</p>}
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block mb-1 font-medium">Salary</label>
                        <input
                            type="number"
                            {...register("salary", { required: "Salary is required" })}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="50000"
                        />
                        {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block mb-1 font-medium">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("photo", { required: "Photo is required" })}
                            onChange={handleImageChange}
                            className="w-full"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full mt-2" />
                        )}
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                    {/* Social Login */}
                    <div className="mt-4 text-center space-y-2">
                        <p className="text-sm text-gray-500">or sign up with</p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-gray-100 p-2 rounded hover:shadow">
                                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                            </button>
                            <button className="bg-gray-100 p-2 rounded hover:shadow">
                                <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;