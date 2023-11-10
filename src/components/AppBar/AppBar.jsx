import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import imagePaths from "./imagePaths";
import { useAuth0 } from "@auth0/auth0-react";
import postUser from "../../redux/actions/postUser";
import { useEffect } from "react";

const AppBar = ({ theme }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentUser = useSelector((state) => state.user);
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  
  const dispatch = useDispatch();
  console.log("log de Linea 14 AppBar", user)
  


  const handleLogin = () => {
    console.log("en el handle login");
    loginWithRedirect();
  };  
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(postUser(user));
    }
  }, [isAuthenticated,]);


  
  return (
    <div
      className={`bg-neutral-800 absolute bottom-0 left-0 font-general-sans w-full h-[80px] justify-around items-center inline-flex ${
        theme === "dark"
          ? "dark:bg-neutral-950 border-t border-white border-opacity-20"
          : "bg-neutral-800 border-t border-black border-opacity-20"
      }`}
    >
      <div className="w-full h-[80px] border-t border-black border-opacity-20 justify-around items-center inline-flex">
        <Link to={currentPath === "/" ? "/" : "/"}>
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="Home"
              src={
                theme === "dark" && currentPath === "/"
                  ? imagePaths.Home.inactive
                  : theme === "dark"
                  ? imagePaths.Home.dark
                  : theme !== "dark" && currentPath === "/"
                  ? imagePaths.Home.active
                  : imagePaths.Home.inactive
              }
              className="w-6 h-6"
            />
            <div
              className={` text-xs font-medium ${
                theme === "dark" && currentPath === "/"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-300"
                  : theme !== "dark" && currentPath === "/"
                  ? "text-white opacity-80"
                  : "text-white opacity-80"
              }`}
            >
              Home
            </div>
          </div>
        </Link>

        <Link to="/Search">
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="Search"
              src={
                theme === "dark" && currentPath === "/Search"
                  ? imagePaths.Search.inactive
                  : theme === "dark"
                  ? imagePaths.Search.dark
                  : theme !== "dark" && currentPath === "/Search"
                  ? imagePaths.Search.active
                  : imagePaths.Search.inactive
              }
              className="w-6 h-6"
            />
            <div
              className={`text-xs font-medium ${
                theme === "dark" && currentPath === "/Search"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-400"
                  : theme !== "dark" && currentPath === "/Search"
                  ? "text-white opacity-80"
                  : "text-white opacity-80"
              }`}
            >
              Search
            </div>
          </div>
        </Link>

        <Link to="/Cart">
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="MyCart"
              src={
                theme === "dark" && currentPath === "/Cart"
                  ? imagePaths.Cart.inactive
                  : theme === "dark"
                  ? imagePaths.Cart.dark
                  : theme !== "dark" && currentPath === "/Cart"
                  ? imagePaths.Cart.active
                  : imagePaths.Cart.inactive
              }
              className="w-16 h-16 mb-16"
            />
            {/* <div
              className={`text-xs font-medium ${
                theme === "dark" && currentPath === "/Cart"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-400"
                  : theme !== "dark" && currentPath === "/Cart"
                  ? "text-white opacity-80"
                  : "text-white opacity-80"
              }`}
            >
              Cart
            </div> */}
          </div>
        </Link>

        {
          <Link to="/Favorite">
            <div className="flex-col justify-start items-center inline-flex">
              <img
                alt="Favorite"
                src={
                  theme === "dark" && currentPath === "/Favorite"
                    ? imagePaths.Wishlist.inactive
                    : theme === "dark"
                    ? imagePaths.Wishlist.dark
                    : theme !== "dark" && currentPath === "/Favorite"
                    ? imagePaths.Wishlist.active
                    : imagePaths.Wishlist.inactive
                }
                className="w-6 h-6"
              />
              <div
                className={`text-xs font-medium ${
                  theme === "dark" && currentPath === "/Favorite"
                    ? "text-red-500"
                    : theme === "dark"
                    ? "text-gray-400"
                    : theme !== "dark" && currentPath === "/Favorite"
                    ? "text-white opacity-80"
                    : "text-white opacity-80"
                }`}
              >
                Favorite
              </div>
            </div>
          </Link>
        }

        {!isAuthenticated ? (
          <button onClick={handleLogin}>
            <div className="flex-col justify-start items-center inline-flex">
              <img
                alt="Account"
                src={
                  theme === "dark" && currentPath === "/Account"
                    ? imagePaths.Account.inactive
                    : theme === "dark"
                    ? imagePaths.Account.dark
                    : theme !== "dark" && currentPath === "/Account"
                    ? imagePaths.Account.active
                    : imagePaths.Account.inactive
                }
                className="w-6 h-6"
              />
              <div
                className={`text-xs font-medium ${
                  theme === "dark" && currentPath === "/Account"
                    ? "text-red-500"
                    : theme === "dark"
                    ? "text-gray-400"
                    : theme !== "dark" && currentPath === "/Account"
                    ? "text-white opacity-80"
                    : "text-white opacity-80"
                }`}
              >
                Account
              </div>
            </div>
          </button>
        ) : (
          <Link to="/Account">
            <div className="flex-col justify-start items-center inline-flex">
              <img
                alt="Account"
                src={
                  theme === "dark" && currentPath === "/Account"
                    ? imagePaths.Account.inactive
                    : theme === "dark"
                    ? imagePaths.Account.dark
                    : theme !== "dark" && currentPath === "/Account"
                    ? imagePaths.Account.active
                    : imagePaths.Account.inactive
                }
                className="w-6 h-6"
              />
              <div
                className={`text-xs font-medium ${
                  theme === "dark" && currentPath === "/Account"
                    ? "text-red-500"
                    : theme === "dark"
                    ? "text-gray-400"
                    : theme !== "dark" && currentPath === "/Account"
                    ? "text-white opacity-80"
                    : "text-white opacity-80"
                }`}
              >
                Account
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppBar;