import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//  import { useDispatch } from "react-redux";
//  import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Home from './views/Home';
import Detail from './views/Detail';
import NavBar from "./components/NavBar/NavBar";
import FormCreateProduct from "./components/Create/FormCreateProduct";
import Search from "./views/Search";
import Cart from "./views/Cart";
import Favorite from "./views/Favorite";
import Account from "./views/Account";
import TopBar from "./components/TopBar/TopBar";
import AppBar from './components/AppBar/AppBar'
import './App.css';
import "tailwindcss/tailwind.css";
import { useAuth0 } from "@auth0/auth0-react";
//import { AppBar } from "@mui/material";

import DashbordAdmin from "./components/DashBordAdmin/DshbordAdmin"
import EditForm from "./components/Create/FormEditProduct"
import SimpleBarCharts from "./components/DashBordAdmin/DashbordAnalitics"
import TopBarDos from "./components/DashBordAdmin/TopBar"
import Users from "./components/DashBordAdmin/UsersFalso"
import Orders from "./components/DashBordAdmin/OrdersFake"

import About from "./views/About";
import Contact from "./views/Contact";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [Desktop, setDesktop] = useState(window.innerWidth > 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isNotAdminPath = location.pathname === '/admin';
  const createPath = location.pathname === '/create'
  const editPath = location.pathname.startsWith('/edit');
  const analaiticas = location.pathname === '/estadistica'
  const top = location.pathname === '/top'
  const fakeUno = location.pathname === '/adminusers'
  const fakeDos = location.pathname === '/orders'

  return (
    <div>
      {isNotAdminPath === true || createPath === true || editPath === true || analaiticas === true || top === true || fakeUno === true || fakeDos === true ? <TopBarDos/> : <TopBar />}
      
      <NavBar/>
      <Routes>
        {/* <Route path= "/top" element={<TopBarDos/>}/>  */}
        <Route path= "/adminusers" element={<Users/>}/> 
        <Route path= "/orders" element={<Orders/>}/> 
        <Route path= "/estadistica" element={<SimpleBarCharts/>}/> 
        <Route path= "/admin" element={<DashbordAdmin/>}/>
        <Route path= "/edit/:id" element={<EditForm/>}/>
      {/* <Route path= "/home" element={<landing/>}/> */}
        <Route path= "/" element={<Home/>}/>
        <Route path= "/:id" element={<Detail/>}/>
        <Route path="/create" element={<FormCreateProduct/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Favorite" element={<Favorite />}/>
        
        {/* Activa linea de abajo para que cuando no esta el email autenticado y quiera air a favorito lo redirija al Home (MATIAS)
        <Route path="/Favorite" element={<PrivateRoute
                  element={<Favorite />}
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                />}/> */}

        <Route path="/Account" element={<Account/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>

      </Routes>
      <div
          className={` fixed bottom-0 left-0 w-full z-[1000]${Desktop === true ? " hidden" : isNotAdminPath === true || createPath === true || editPath === true || analaiticas === true || top === true || fakeUno === true || fakeDos === true ? " hidden" : " "}`}
        >

        <AppBar/>
      </div>
      {/* <div
          className={` fixed bottom-0 left-0 w-full z-[1000] ${
            Desktop ? "hidden" : ""
          }`}
        >
          <AppBar theme={theme} />
        </div> */}
      {/* <div
          className={` fixed bottom-0 left-0 w-full z-[1000] ${
            Desktop ? "hidden" : ""
          }`}
        >
          <AppBar theme={theme} />
        </div> */}
    </div>
  )
}

export default App