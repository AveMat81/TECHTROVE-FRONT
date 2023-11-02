import { Routes, Route } from "react-router-dom";
//  import { useEffect } from "react";
//  import { useDispatch } from "react-redux";
//  import { useSelector } from "react-redux";
import Home from './views/Home';
import Detail from './views/Detail';
//import NavBar from "./components/NavBar/NavBar";
import FormCreateProduct from "./components/Create/FormCreateProduct";
import Search from "./views/Search";
import Cart from "./views/Cart";
import Favorite from "./views/Favorite";
import Categories from "./views/Categories";
import Contact from "./views/Contact";
import About from "./views/About";
import Account from "./views/Account";
import TopBar from "./components/TopBar/TopBar";
import AppBar from './components/AppBar/AppBar'
import './App.css';
import "tailwindcss/tailwind.css";
//import { AppBar } from "@mui/material";

function App() {
 

  return (
    <div>
      <TopBar />
      {/* <NavBar/> */}
      <Routes>
      {/* <Route path= "/home" element={<landing/>}/> */}

        <Route path= "/" element={<Home/>}/>
        <Route path= "/:id" element={<Detail/>}/>
        <Route path="/Create" element={<FormCreateProduct/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Favorite" element={<Favorite/>}/>
        <Route path="/Account" element={<Account/>}/>
        <Route path="/Categories" element={<Categories/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/About" element={<About/>}/>

      </Routes>
      <div
          className={` fixed bottom-0 left-0 w-full z-[1000]`}
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

export default App;