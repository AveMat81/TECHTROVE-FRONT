import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const menuItems = [
    { to: "/", text: "Home"},
    { to: "/Cart", text: "Cart"},
    { to: "/Search", text: "Search"},
    { to: "/Wishlist", text: "Favorite"},
    { to: "/Account", text: "Account" },


    // { to: "/", text: "Home", icon: imagePaths.Home },
    // { to: "/Cart", text: "Cart", icon: imagePaths.Cart },
    // { to: "/Search", text: "Search", icon: imagePaths.Search },
    // { to: "/Wishlist", text: "Wishlist", icon: imagePaths.Wishlist },
    // { to: "/Account", text: "Account", icon: imagePaths.Account },
];

function AppBar(theme) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className={`app-bar ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
        <div className="app-bar">
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              to={menuItem.to}
              text={menuItem.text}
              icon={menuItem.icon}
              theme={theme}
              currentPath={currentPath}
            />
          ))}
        </div>
      </div> 
    );
};

export default AppBar;