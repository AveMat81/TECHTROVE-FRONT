//import React from "react";
import { Link } from "react-router-dom";

const MenuItem = (to, theme, currentPath, icon, text) => {
    const isActive = currentPath === to;

    return (
        <Link to={to}>
            <div className={`menu-item ${isActive ? "active" : ""}`}>
                <img
                    alt={text}
                    src={theme == "dark" ? icon.dark : icon.inactive}
                    className="w-6 h-6"
                />
                <div className= {`text-xs font-medium ${isActive ? "active-text" : ""}`}>
                    {text}
                </div>
            </div>
        </Link>
    )
}

export default MenuItem;