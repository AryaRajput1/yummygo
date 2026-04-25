import jwt from "jsonwebtoken";
export const generateAuthToken = async (user) => {
  try {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};
