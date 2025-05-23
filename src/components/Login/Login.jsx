import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          role: "employee",
          status: "active",
        };
        await axiosPublic.post("/users", userInfo);
        Swal.fire({
          title: "Success",
          text: "Logged in with Google",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>WorkNest | Login</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-bg-soft dark:bg-bg-dark px-4 py-10">
        <div className="max-w-md w-full bg-bg-soft dark:bg-bg-soft rounded-xl shadow-md dark:shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary dark:text-accent text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-text-main">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-text-main">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2 pr-10"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500 dark:text-text-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary/90 transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center text-gray-400 dark:text-text-secondary text-sm">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-3">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Google Auth */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full gap-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <FaGoogle className="text-green-500" />
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Register Redirect */}
          <p className="text-center text-sm mt-4 text-text-secondary">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline dark:text-primary"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;