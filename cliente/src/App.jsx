import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Home from './views/Home';
import Detail from './views/Detail';
import './App.css';
import NavBar from "./components/NavBar/NavBar";

function App() {
 

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/detail/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App