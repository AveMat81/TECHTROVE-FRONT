import './App.css';
import "tailwindcss/tailwind.css";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './views/Home';
import Detail from './views/Detail';
import NavBar from "./components/NavBar/NavBar";
import FormCreateProduct from "./components/Create/FormCreateProduct";
import Search from "./views/Search";
import Cart from "./views/Cart";
import Favorite from "./views/Favorite";
import Account from "./views/Account";
import AdminUsers from "./views/AdminUsers";
import TopBar from "./components/TopBar/TopBar";
import AppBar from './components/AppBar/AppBar'
import DetailUsers from "./views/DetailUsers";
import FormEdit from "./views/FormEditUser";
//import { AppBar } from "@mui/material";

function App() {
  const [Desktop, setDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <TopBar />
      <NavBar/>
      <Routes>
      {/* <Route path= "/home" element={<landing/>}/> */}

        <Route path= "/" element={<Home/>}/>
        <Route path= "/:id" element={<Detail/>}/>
        <Route path="/Create" element={<FormCreateProduct/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Favorite" element={<Favorite/>}/>
        <Route path="/Account" element={<Account/>}/>
        <Route path="/AdminUsers" element={<AdminUsers/>}/>
        <Route path="/users/:id" element={<DetailUsers/>}/>
        <Route path="/update/:id" element={<FormEdit/>}/>
      </Routes>
      <div
          className={` fixed bottom-0 left-0 w-full z-[1000]${Desktop === true ? " hidden" : " "}`}
        >

        {/* <AppBar/> */}
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