import React from "react";
import queryString from "query-string";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { cleanCart } from "../../redux/slices/cartSlice"
import pagosuccess from "../../utils/images/PaymentCase/pagosuccess.png"
import successperson from "../../utils/images/PaymentCase/successperson-removebg-preview.png"
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const SuccessPayment  =  ()=>{
    
    //const cart = useSelector((state) => state.cart); 
    const currentUser = useSelector((state) => state.user);
  
    
    const [orederCreate, setOrederCreate ] = useState(false)
    const dispatch = useDispatch()
   
    useEffect(() => {
        const params = queryString.parse(window.location.search);
        
        const infoJson = JSON.parse(params.data); // 
        
        const cart = JSON.parse(window.localStorage.getItem("cart"))
        const user = JSON.parse(window.localStorage.getItem("userData"))
        
        
        
        const dataOrder ={
            paymentId: infoJson.payment_id,
            email: user.email,
            products: cart.items,
            status: infoJson.status,
            total: cart.subtotal,
            preferenceId: infoJson.preference_id,
            userId: user.id            
        }
        
        

        const sendDataToServer = async () => {
            try {              
               const response = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/orders/`, dataOrder); //success o pending
               const responseII = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/payment/webhook/`, dataOrder) //envio de email
                setOrederCreate(true)
                
                
           
            } catch (error) {
                console.log("Error al enviar datos al servidor:", error);
            }
        };

       sendDataToServer(); 

       
    }, []);

   
    
    useEffect(()=>{
       setOrederCreate(true)

        
        if(orederCreate === true){
            window.localStorage.setItem("cart", JSON.stringify({
                            items: [],
                            subtotal: 0,
                            shippingPrice: 15,
                            tax: 5,
                            quantity: 0,
                            totalPrice: 0,
                          })) 
                         
                          
        dispatch(cleanCart())
        
        }

    }, [dispatch, orederCreate])
    
    return (
        <div class=" mt-0, mt-[-20px] overflow-hidden w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div class="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
          <img
            className="relative w-auto h-auto object-cover mt-0"
            alt="Rectangle"
            src={pagosuccess}
          />
        
        <p class="text-4xl md:text-5xl lg:text-4xl font-bold tracking-wider text-green-600 ">
        Successful payment       
        </p>
        <div className="mt-8" />
        <Link to="/">
                <div className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-gray-100 px-6 py-4 rounded transition duration-150">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path
                        fillRule="evenodd"
                        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                    <span className="font-bold">Return Home</span>
                </div>
                </Link>
      </div>
      <div class="que es esto w-1/2 sm:h-full flex lg:items-end justify-center ">
      <img
            className="relative w-auto h-auto object-cover mt-[-20px] "
            alt="Rectangle"
            src={successperson}
          />
       
      </div>
    </div>
    
  );
}

export default  SuccessPayment;