import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuantity, removeItem, replaceCart} from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 


const Cart = () => {
  const cart = useSelector((state) => state.cart); // Selecciona el carrito desde Redux
  const currentUser = useSelector((state)=> state.user);
  const [preferenceData, setPreferenceData] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();
  



const dispatch = useDispatch();


useEffect(() => {
  // Guardar el estado del carrito en el localStorage cuando cambie
  
  window.localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  // Obtener el estado del carrito del localStorage al cargar el componente
  const savedCart = JSON.parse(window.localStorage.getItem("cart"));
  
  if (savedCart) {
    dispatch(replaceCart(savedCart)); // Dispara la acción replaceCart con los datos del localStorage
  }
}, [dispatch]);



  const handleAddOne = (id) => {
    dispatch(setQuantity({ id, act: "+" }));
    toast.success("Added item successfully");
  };

  const handleRemoveOne = (id) => {
    dispatch(setQuantity({ id, act: "-" }));
    toast.success("Item removed successfully");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success("Item removed successfully");
  };

  
  const handleCheckout = async () => {
    
    if(!isAuthenticated){
      Swal.fire({
        icon: 'warning',
        title: 'Please log in...',
        text: 'You must log in to make payment.',
        allowOutsideClick: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return
    }

    if(user && !user.email_verified){
      Swal.fire({
        icon: 'warning',
        title: 'Verify your email',
        text: 'You must verify your email before accessing this page.',
        allowOutsideClick: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      return
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
   try {
    const { data } = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/payment/create-order`, 
      { cart: cart.items, email: currentUser.user.email });
      location.href = data.result;
    
   } catch (error) {
    console.log(error.message)
   }
    };

      return (

      

        <body className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
          <h1>MY SHOPPING CART</h1>
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
          {cart.items.map((item, i) => (
            <div key={i} className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
                    <svg onClick={() => handleRemoveItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
                <img  src={item.image} alt={item.name}  />
                <h2>{item.name}</h2>
                <p>{item.size}</p>
                <div >
                  <button onClick={() => handleAddOne(item.id)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleRemoveOne(item.id)}>-</button>
                  <p>${item.price} </p>
          
           </div>
          
        </div>
      ))}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">     
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${cart.totalPrice} </p>
                  <button onClick={handleCheckout}
                  className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-black-600"
                  >Checkout with mercado pago</button>
                </div>
              </div>
             
           </div>
         </div>
       
      </body>
    )
};

export default Cart;


