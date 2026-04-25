import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";

export const loginWithGoogle = async (callback) => {
  var provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    callback(result.user);
  } catch (error) {
    throw error;
  }
};
