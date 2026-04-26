import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState } from "react";
import useGetCity from "../../hooks/useGetCity";
import apiWrapper from "../../utils/apiWrapper";
import { toast } from "react-toastify";
import { setCity, setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  useGetCity();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { user, city } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiWrapper.post("/auth/logout");
      setUser(null);
      setCity(null);
      navigate("/signin");
      toast.success(`${user.fullName} has been logged out successfully.`);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <div className="w-full h-20 fixed top-0 flex md:justify-center justify-between items-center gap-7 px-4">
        {/* on mobile screen */}

        {showMobileSearch && (
          <div className="flex shadow-md items-center p-2 w-full fixed top-20 md:hidden gap-3">
            <div className="flex w-40 items-center border-r-2 border-gray-500 px-4 gap-2">
              <FaLocationDot size={15} />
              <span className="truncate">{city || "No City"}</span>
            </div>
            <div className="flex items-center w-full">
              <IoIosSearch />
              <input
                type="text"
                placeholder="Search for food..."
                className="ml-2 p-1 rounded-md outline-0 w-full"
              />
            </div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-blue-500">YummyGo</h1>
        <div className="md:flex shadow-md items-center p-2 hidden w-[40%] gap-5">
          <div className="flex w-40 items-center border-r-2 border-gray-500 px-4 gap-2">
            <FaLocationDot size={15} />
            <span className="truncate">{city || "No City"}</span>
          </div>
          <div className="flex items-center w-full">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search for food..."
              className="ml-2 p-1 rounded-md outline-0 w-full"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            className="md:hidden block"
            onClick={() => setShowMobileSearch((prev) => !prev)}
          >
            {showMobileSearch ? (
              <FaXmark size={25} />
            ) : (
              <IoIosSearch size={25} />
            )}
          </div>
          <div className="relative">
            <MdOutlineShoppingCart size={25} />
            <span className="absolute bottom-[56%] left-[50%] bg-blue-300 border border-blue-500 text-blue-500 rounded-full text-xs size-4 flex items-center justify-center">
              0
            </span>
          </div>
          {/* My Orders */}
          <button className="bg-blue-200 border text-sm border-blue-500 text-blue-500 rounded-2xl px-4 py-1 hidden md:block font-semibold">
            My Orders
          </button>
          {/* Profile */}
          <div className="relative">
            <button
              className="text-sm bg-blue-500 text-white rounded-full size-8 flex items-center justify-center font-bold"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              {user.fullName?.charAt(0)}
            </button>
            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="w-40 absolute top-12 right-0 bg-white shadow-lg rounded-md py-2">
                <span className="text-center block w-full text-bold px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {user.fullName}
                </span>
                <button className="w-full block md:hidden px-4 py-2 text-sm text-blue-500 hover:bg-gray-100">
                  My Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
