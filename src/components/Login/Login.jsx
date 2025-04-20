import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
    };

    return (
        <>
            <Helmet>
            <title>WorkNest | Login</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Sign In</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-md p-2"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block font-medium mb-1">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••"
                                className="w-full border border-gray-300 rounded-md p-2 pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <button
                                type="button"
                                className="absolute top-9 right-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="text-center text-gray-400 text-sm my-4">or</div>

                    </form>
                    {/* Social Login (You can wire this up to Firebase/Google) */}
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition">
                            <FaGoogle />
                            Sign in with Google
                        </button>
                        <Link className="hover:underline text-center" to={'/register'}>Do not have an account? Register one</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;