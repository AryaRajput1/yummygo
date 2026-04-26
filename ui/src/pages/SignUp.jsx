import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AVAILABLE_ROLES } from "../constants";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import apiWrapper from "../utils/apiWrapper";
import { toast } from "react-toastify";
import { loginWithGoogle } from "../utils/loginWithGoogle";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("USER");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiWrapper.post("/auth/register", {
        ...data,
        role,
      });

      toast.success(
        response.data.message || "Sign up successful! Please sign in.",
      );

      dispatch(setUser(response.data.user));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during sign up",
      );
    }
  };

  const handleLoginWithGoogle = async () => {
    const { mobile } = getValues();

    if (!mobile) {
      toast.error(
        "Please enter your mobile number before signing in with Google.",
      );
      return;
    }
    loginWithGoogle(async (user, token) => {
      try {
        const response = await apiWrapper.post("/auth/login-with-google", {
          token,
          mobile,
        });
        toast.success(
          `Welcome, ${user.displayName}! You have signed in with Google.`,
        );
        dispatch(setUser(response.data.user));
        navigate("/");
      } catch (error) {
        toast.error(
          error.message || "Google sign-in failed. Please try again.",
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-6"
      >
        <div className="w-full mb-4 border-b border-gray-300 pb-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            onClick={handleLoginWithGoogle}
          >
            <FcGoogle />
            Sign Up with Google
          </button>
        </div>
        <h2 className="text-2xl font-bold text-blue-500">YummyGo</h2>
        <p className="mb-6 text-gray-600 text-sm">
          Create your account to get started with delicious food delivery!
        </p>

        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile
          </label>
          <input
            type="mobile"
            id="mobile"
            name="mobile"
            {...register("mobile")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="123-456-7890"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
            {/* Password visibility toggle react-icons*/}
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Role with buttons */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="flex space-x-2 w-full">
            {Object.entries(AVAILABLE_ROLES).map(([key, value]) => (
              <button
                key={key}
                type="button"
                className={`px-4 py-2 border rounded-md w-full ${
                  role === key
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => setRole(key)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
