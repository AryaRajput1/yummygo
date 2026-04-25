import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.USER,
    to,
    subject: "Your OTP for Reset Password",
    text: `Your OTP for YummyGo is: ${otp}. It is valid for 5 minutes.`,
  });
};
