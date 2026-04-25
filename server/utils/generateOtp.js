export const generateOtp = (len) => {
  return Math.floor(Math.random() * Math.pow(10, len))
    .toString()
    .padStart(len, "0");
};
