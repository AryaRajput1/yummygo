import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCity, setUser } from "../store/slices/userSlice";
import apiWrapper from "../utils/apiWrapper";

const useGetCity = () => {
  // This hook will fetch the current user's city using navigator.geolocation and update the Redux store with the city information.
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const { data } = await apiWrapper.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${import.meta.env.VITE_GEO_API_KEY}`,
            {
              withCredentials: false,
            },
          );
          if (data.features.length) {
            const city = data.features[0].properties.city;

            dispatch(setCity(city));
          } else {
            dispatch(setCity(null));
          }
        } catch (error) {
          dispatch(setCity(null));
        }
      });
    })();
  }, [dispatch]);
};

export default useGetCity;
