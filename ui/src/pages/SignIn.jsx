import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AVAILABLE_ROLES } from "../constants";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import apiWrapper from "../utils/apiWrapper";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiWrapper.post("/auth/login", {
        ...data,
      });

      toast.success(response.data.message || "Sign In successful.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during sign in",
      );
    }
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
          >
            <FcGoogle />
            Sign In with Google
          </button>
        </div>
        <h2 className="text-2xl font-bold text-blue-500">YummyGo</h2>
        <p className="mb-6 text-gray-600 text-sm">
          Sign In your account to get started with delicious food delivery!
        </p>

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
        {/* forget password */}
        <div className="mb-4">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline flex justify-end text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign Up Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignIn;
