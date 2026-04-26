import { useSelector } from "react-redux";
import UserDashboard from "../components/dashboard/UserDashboard";
import OwnerDashboard from "../components/dashboard/OwnerDashboard";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  let dashboardComponent = null;
  if (user.role === "USER") {
    dashboardComponent = <UserDashboard />;
  } else if (user.role === "OWNER") {
    dashboardComponent = <OwnerDashboard />;
  } else if (user.role === "DELIVERY_PERSON") {
    dashboardComponent = <DeliveryPersonDashboard />;
  }
  return dashboardComponent && (
    <div className="min-h-screen w-full bg-blue-50/40">
      {dashboardComponent}
    </div>
  );
};
export default Home;
