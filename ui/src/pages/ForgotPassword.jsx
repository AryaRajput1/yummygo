import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AVAILABLE_ROLES } from "../constants";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  resetPasswordFormSchema,
  sendOtpFormSchema,
  signUpFormSchema,
  verifyOtpFormSchema,
} from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import apiWrapper from "../utils/apiWrapper";
import { toast } from "react-toastify";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SendOtp = ({ onIncreaseStep }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(sendOtpFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await apiWrapper.post("/auth/send-otp-reset-password", {
        email: data.email,
      });
      onIncreaseStep({ email: data.email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <FaLongArrowAltLeft
            onClick={() => navigate("/signin")}
            className="text-md font-bold text-blue-500 cursor-pointer"
          />
          <h2 className="text-md font-bold text-blue-500">Forgot Password</h2>
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

        {/* Sign Up Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

const VerifyOtp = ({ onIncreaseStep, email }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(verifyOtpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await apiWrapper.post(
        "/auth/verify-otp-reset-password",
        {
          email,
          otp: data.otp,
        },
      );
      onIncreaseStep();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to verify OTP. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <FaLongArrowAltLeft
            onClick={() => navigate("/signin")}
            className="text-md font-bold text-blue-500 cursor-pointer"
          />
          <h2 className="text-md font-bold text-blue-500">Forgot Password</h2>
        </div>

        {/* otp */}
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Verify OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            {...register("otp")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter OTP"
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ResetPassword = ({ onIncreaseStep, email }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await apiWrapper.post("/auth/reset-password", {
        email,
        ...data,
      });
      navigate("/signin");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to verify OTP. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-blue-50/40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <FaLongArrowAltLeft
            onClick={() => navigate("/signin")}
            className="text-md font-bold text-blue-500 cursor-pointer"
          />
          <h2 className="text-md font-bold text-blue-500">Forgot Password</h2>
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="text"
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

        {/* confirm password */}
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Confirm new password"
            />
            {/* Password visibility toggle react-icons*/}
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Sign Up Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState({});

  const onIncreaseStep = (options) => {
    setStep((prev) => prev + 1);
    setOptions((prev) => ({ ...prev, ...options }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SendOtp onIncreaseStep={onIncreaseStep} />;
      case 2:
        return (
          <VerifyOtp onIncreaseStep={onIncreaseStep} email={options.email} />
        );
      case 3:
        return <ResetPassword email={options.email} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default ForgotPassword;
