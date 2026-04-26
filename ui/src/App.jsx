import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  useGetCurrentUser();
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};
export default App;
