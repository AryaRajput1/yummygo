import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import apiWrapper from "../utils/apiWrapper";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await apiWrapper.get("/user/current");
        const user = response.data.user;

        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUser(null));
      }
    };

    getCurrentUser();
  }, [dispatch]);
};

export default useGetCurrentUser;