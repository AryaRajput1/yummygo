import { Router } from "express";
import {
  resetPassword,
  sendOtpResetPassword,
  signIn,
  signOut,
  signUp,
  verifyOtpResetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", signIn);
router.post("/register", signUp);
router.post("/logout", signOut);
router.post("/send-otp-reset-password", sendOtpResetPassword);
router.post("/verify-otp-reset-password", verifyOtpResetPassword);
router.post("/reset-password", resetPassword);

export default router;
