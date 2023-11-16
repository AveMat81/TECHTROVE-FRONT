import './App.css';
import "tailwindcss/tailwind.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//  import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
import DetailOrder from "./views/DetailOrder";
import FormEdit from "./views/FormEditUser";
import AboutTeam from "./components/About/AboutTeam";
import { useAuth0 } from "@auth0/auth0-react";

import DashbordAdmin from "./components/DashBordAdmin/DshbordAdmin"
import EditForm from "./components/Create/FormEditProduct"
import SimpleBarCharts from "./components/DashBordAdmin/DashbordAnalitics"
import TopBarDos from "./components/DashBordAdmin/TopBar"
import Orders from "./components/DashBordAdmin/OrdersFake"
import SuccessPayment from "./components/PaymentCase/SuccessPayment"
import NotVerified from "./components/NotVerified/NotVerified";
import NotFoundPage from "./views/NotFound";
import MyOrders from "../src/components/MyOrders/MyOrders"
import PrivateRoute from "./PrivateRoute"
import CreateBrand from './views/CreateBrand';
import BrandEdit from './views/BrandEdit';
import Brand from './views/Brand';


import About from "./views/About";
import Contact from "./views/Contact";
import EditProfile from "./components/EditProfile/editProfile";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [Desktop, setDesktop] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isNotAdminPath = location.pathname === '/admin'; // ruta prote
  const createPath = location.pathname === '/create'  // ruta prote
  const editPath = location.pathname.startsWith('/edit'); // ruta prote
  const analaiticas = location.pathname === '/estadistica' // ruta prote
  const top = location.pathname === '/top'
  const fakeUno = location.pathname === '/adminusers' // ruta prote
  const fakeDos = location.pathname === '/orders' // ruta prote
  const brand = location.pathname === '/brands' 
  const createBrand = location.pathname === '/createBrand' 

  const usersAdmin = location.pathname.startsWith('/users');
  const editUser = location.pathname.startsWith('/update');

  return (
    <div>
      {isNotAdminPath === true || createPath === true || editPath === true || analaiticas === true || top === true || fakeUno === true || fakeDos === true || editUser || usersAdmin || brand || createBrand ? <TopBarDos/> : <TopBar />}
      
      <NavBar/>
      <Routes>
        {/* <Route path= "/top" element={<TopBarDos/>}/>  */}
        <Route path="/fail" element={<NotVerified />} />        
        <Route path= "/orders" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <Orders /> : <Orders />}/> 
        <Route path= "/estadistica" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <SimpleBarCharts /> : <SimpleBarCharts />}/> 
        <Route
          path="/admin"
          element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <DashbordAdmin /> : <DashbordAdmin />}
        />
       
        <Route path= "/edit/:id" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <EditForm /> : <EditForm />}/>

      {/* <Route path= "/home" element={<landing/>}/> */}
        <Route path= "/" element={<Home/>}/>
        <Route path= "/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <FormCreateProduct /> : <FormCreateProduct />}/>

        <Route path="/search" element={<Search/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/favorite" element={<Favorite />}/>
        <Route path="/myorders/:id" element={<MyOrders />}/>
        <Route path="/rating/:id" element={<MyOrders />}/>
        <Route path="/paymentsucces" element={<SuccessPayment />}/>
        
         {/* Activa linea de abajo para que cuando no esta el email autenticado y quiera air a favorito lo redirija al Home (MATIAS) */}
        {/* <Route path="/favorite" element={<PrivateRoute
                  element={<Favorite />}
                  isAuthenticated={isAuthenticated}
                  isLoading={isLoading}
                />}/>  */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/account" element={<Account/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile-edit" element={<EditProfile/>}/>
        <Route path="/about-team" element={<AboutTeam/>}/>
        
        

        <Route path="/adminUsers" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <AdminUsers /> : <AdminUsers />}/>
        <Route path="/users/:id" element={<DetailUsers/>}/>
        <Route path="/order/detail/:id" element={<DetailOrder/>}/>
        <Route path="/update/:id" element={<FormEdit/>}/>
        <Route path="/brands" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <Brand /> : <Brand/>}/>
        <Route path="/editBrand/:id" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <BrandEdit /> : <BrandEdit/>}/>
        <Route path="/createBrand" element={currentUser.user === null  || !isAuthenticated ||  currentUser.user === null && !currentUser.user.isAdmin ? <Navigate to="/" /> : currentUser.user.isAdmin ? <CreateBrand /> : <CreateBrand/>}/>
      </Routes>
      <div
          className={` fixed bottom-0 left-0 w-full z-[1000]${Desktop === true ? " hidden" : isNotAdminPath === true || createPath === true || editPath === true || analaiticas === true || top === true || fakeUno === true || fakeDos === true || editUser || usersAdmin || createBrand || brand ? " hidden" : " "}`}
        >

        <AppBar/>
      </div>
    </div>
  )
}

export default App;