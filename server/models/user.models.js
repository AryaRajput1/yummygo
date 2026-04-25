import mongoose from "mongoose";
import { AVAILABLE_ROLES } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Password is not required for Google-authenticated users
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: AVAILABLE_ROLES,
      default: "USER",
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordOtpExpiry: {
      type: Date,
    },
    isResetPasswordOtpVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
