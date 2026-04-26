import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";

export const loginWithGoogle = async (callback) => {
  var provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();
    await callback(user, idToken);
  } catch (error) {
    console.log(error)
    throw error;
  }
};
