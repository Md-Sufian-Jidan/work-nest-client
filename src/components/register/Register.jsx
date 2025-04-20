import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useaxiosPublic";
import { toast } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet";

const VITE_IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [show, setShow] = useState(false);
    const location = useLocation();
    const from = location.state?.from || "/";

    const onSubmit = async (data) => {
        if (data.password.length < 6) {
            return toast.error('Your password should at least 6 character long');
        }
        if (!/[A-Z]/.test(data.password)) {
            return toast.error('Your password should contain a Capital letter');
        }
        if (!/[a-z]/.test(data.password)) {
            return toast.error('Your password should contain a lower letter');
        }
        const image_file = { image: data?.photo[0] };
        const res = await axiosPublic.post(image_hosting_api, image_file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                role: data.role,
                                designation: data.designation,
                                bank_account_no: data.bank,
                                salary: data.salary,
                                photo: data.photo
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/');
                                    }
                                })
                        })
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                // console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                await axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            title: "Success",
                            text: "User Login Successfully",
                            icon: "success"
                        });
                        navigate(from, { replace: true });
                    }
                    )
            })
            .catch(res => {
                console.log(res);
                navigate('/');
            })
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Helmet>
                <title>WorkNest | Home</title>
            </Helmet>
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
                        <div className="relative">
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type={show ? 'text' : 'password'}
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                                        message:
                                            "Password must include upper & lowercase letters, a number, a special character, and be at least 6 characters long.",
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="••••••"
                            />
                            {show ? <Eye onClick={() => setShow(!show)} className="absolute top-9 right-5 cursor" /> : <EyeOff onClick={() => setShow(!show)} className="absolute top-9 right-5 cursor" />}
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
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
                    </form>
                    {/* Social Login */}
                    <div className="mt-4 text-center space-y-2">
                        <p className="text-sm text-gray-500">or sign up with</p>
                        <button onClick={handleGoogleSignIn} className="bg-gray-100 p-2 rounded hover:shadow w-2/4">
                            <div className="flex justify-center items-center font-bold text-green-500 gap-2">
                                <FaGoogle /> <span>Google</span>
                            </div>
                        </button>
                        <p><Link className="hover:underline" to={'/login'}>Already have an account? Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;