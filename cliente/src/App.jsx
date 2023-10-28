import { Routes, Route } from "react-router-dom";
//  import { useEffect } from "react";
//  import { useDispatch } from "react-redux";
//  import { useSelector } from "react-redux";
import Home from './views/Home';
import Detail from './views/Detail';
import NavBar from "./components/NavBar/NavBar";
import FormCreateProduct from "./components/Create/FormCreateProduct";
import Search from "./views/Search";
import './App.css';
import "tailwindcss/tailwind.css";

function App() {
 

  return (
    <div>
      <NavBar/>
      <Routes>
      {/* <Route path= "/home" element={<landing/>}/> */}

        <Route path= "/home" element={<Home/>}/>
        <Route path= "/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<FormCreateProduct/>}/>
        <Route path="/search" element={<Search/>}/>


      </Routes>
    </div>
  )
}

export default App