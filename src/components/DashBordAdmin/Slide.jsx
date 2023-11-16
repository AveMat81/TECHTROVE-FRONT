import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import backImage from "../../utils/images/DashBordBar/Dashbordchevron left.png"
import boxImage from "../../utils/images/DashBordBar/Dashbordiconbox.png"
import cartImage from "../../utils/images/DashBordBar/Dashbordicon cart.png"
import personImage from "../../utils/images/DashBordBar/Dashbordperson.png"
import dashbordImage from "../../utils/images/DashBordBar/Dashbordbar chart.png"
import { SiBrandfolder } from "react-icons/si";


function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Agrega un event listener para detectar clics fuera del Sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Agrega el event listener al montar el componente
    document.addEventListener("click", handleClickOutside);

    // Limpia el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full bg-gray-100 ${
        isSidebarOpen ? "overflow-hidden" : "lg:hidden"
      }`}
    >
      <div ref={sidebarRef}>
        <nav className="bg-black p-4 ">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className=" text-gray-600 hover:text-gray-800 w-auto"
            >
              {isSidebarOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 bg-black"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>

        <aside
          className={`fixed top-0 left-0 h-full w-80 bg-zinc-100 shadow transform ${
            isSidebarOpen ? "" : "-translate-x-full"
          }  transition-transform duration-300 ease-in-out`}
          style={{ zIndex: isSidebarOpen ? "10" : "-1" }}
        >
          <div className="mt-3 p-4 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-9 h-9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <ul className="py-6 space-y-2 ml-6 text-left">
            <li>
              <Link
                to="/Account"
                className="text-black text-xl font-extrabold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                <img src={backImage} alt="back" className="w-6 h-8 mr-3" />
                ACCOUNT
              </Link>
            </li>
            <li>
              <Link

                to="/estadistica"
                className="text-black text-xl font-semibold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                <img src={dashbordImage} alt="back" className="w-6 h-6 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="text-black text-xl font-semibold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                <img src={boxImage} alt="back" className="w-6 h-6 mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/adminusers"
                className="text-black text-xl font-semibold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                <img src={personImage} alt="back" className="w-6 h-6 mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="text-black text-xl font-semibold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                <img src={cartImage} alt="back" className="w-6 h-6 mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/brands"
                className="text-black text-xl font-semibold font-jakarta-sans block mb-8 flex items-center"
                onClick={toggleSidebar}
              >
                 <SiBrandfolder className={`text-black-500 text-[35px] font-semibold`} />
                Brands
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;