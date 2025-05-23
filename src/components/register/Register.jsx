import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const VITE_IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`;

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = async (data) => {
    if (data.password.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }
    if (!/[A-Z]/.test(data.password)) {
      return toast.error('Password must include at least one uppercase letter');
    }
    if (!/[a-z]/.test(data.password)) {
      return toast.error('Password must include at least one lowercase letter');
    }
    if (!/\d/.test(data.password)) {
      return toast.error('Password must include at least one number');
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(data.password)) {
      return toast.error('Password must include at least one special character');
    }
    if (!/\d/.test(data.bank)) {
      return toast.error('Password must include at least one number');
    }

    if (!data.role || !data.designation) {
      return toast.error('Please select both role and designation');
    }

    if (!data.photo || data.photo.length === 0) {
      return toast.error('Please upload a profile photo');
    }

    const image_file = { image: data?.photo[0] };
    const res = await axiosPublic.post(image_hosting_api, image_file, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      createUser(data.email, data.password)
        .then(() => {
          updateUserProfile(data.name, res.data.data.display_url).then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              role: data.role,
              designation: data.designation,
              bank_account_no: data.bank,
              salary: data.salary,
              photo: res.data.data.display_url,
              status: "active",
              verified: false,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "User registered successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from);
              }
            });
          });
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 1500,
          })
        );
    }
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
      .catch(() => {
        navigate("/");
      });
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
        <title>WorkNest | Register</title>
      </Helmet>

      <div className="min-h-screen bg-bg-soft dark:bg-bg-dark flex items-center justify-center px-4 py-10">
        <div className="max-w-2xl w-full bg-bg-soft dark:bg-card-bg-dark p-8 rounded-xl shadow-md dark:shadow-lg">
          <h2 className="text-3xl font-bold text-primary dark:text-accent text-center mb-6">
            Create Your WorkNest Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-main">👤 Basic Info</h3>

              <div>
                <label className="block mb-1 font-medium text-text-main">Full Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium text-text-main">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label className="block mb-1 font-medium text-text-main">Password</label>
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                      message: "Must include uppercase, lowercase, number, special character, and 6+ characters.",
                    },
                  })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                  placeholder="••••••"
                />
                <div className="absolute top-9 right-4 cursor-pointer text-gray-500 dark:text-text-secondary">
                  {show ? <EyeOff onClick={() => setShow(false)} /> : <Eye onClick={() => setShow(true)} />}
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-text-main">🧑‍💼 Job Details</h3>

              <div>
                <label className="block mb-1 font-medium text-text-main">Role</label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-bg-soft dark:bg-transparent text-text-main rounded-md p-2"
                >
                  <option value="">Select Role</option>
                  <option value="employee">Employee</option>
                  <option value="hr">HR</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium text-text-main">Designation</label>
                <input
                  {...register("designation", { required: "Designation is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent  text-text-main rounded-md p-2"
                  placeholder="e.g. Frontend Developer"
                />
                {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
              </div>
            </div>

            {/* Bank Details */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-text-main">🏦 Bank Details</h3>

              <div>
                <label className="block mb-1 font-medium text-text-main">Bank Account No</label>
                <input
                  {...register("bank", { required: "Bank account is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                  placeholder="1234567890"
                />
                {errors.bank && <p className="text-red-500 text-sm">{errors.bank.message}</p>}
              </div>

              <div>
                <label className="block mb-1 font-medium text-text-main">Salary</label>
                <input
                  type="number"
                  {...register("salary", { required: "Salary is required" })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-text-main rounded-md p-2"
                  placeholder="50000"
                />
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
              </div>
            </div>

            {/* Upload Photo */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <label className="block mb-1 font-medium text-text-main">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Photo is required" })}
                onChange={handleImageChange}
                className="w-full text-text-main"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full mt-2 border object-cover"
                />
              )}
              {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition"
            >
              Register
            </button>
          </form>

          {/* Social Auth */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-text-secondary">or sign up with</p>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full gap-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <FaGoogle className="text-green-500" />
              <span className="font-medium">Continue with Google</span>
            </button>
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium dark:text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;