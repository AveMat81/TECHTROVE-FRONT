import React from "react";
import queryString from "query-string";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cleanCart } from "../../redux/slices/cartSlice"
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

const SuccessPayment  =  ()=>{
    
    //const cart = useSelector((state) => state.cart); 
    const currentUser = useSelector((state) => state.user);
  
    console.log("usuario en succespayment",currentUser);
    const [orederCreate, setOrederCreate ] = useState(false)
    const dispatch = useDispatch()
   
    useEffect(() => {
        const params = queryString.parse(window.location.search);
        
        const infoJson = JSON.parse(params.data); // 
        console.log("infoJson en succespayment ---",infoJson);
        const cart = JSON.parse(window.localStorage.getItem("cart"))
        const user = JSON.parse(window.localStorage.getItem("userData"))
        
        console.log("CARRITO DEL LOCALL STORAGE", cart)
        console.log("ID DEL USER PARA MANDAR A LA ORDEN", user)
        const dataOrder ={
            paymentId: infoJson.payment_id,
            email: user.email,
            products: cart.items,
            status: infoJson.status,
            total: cart.totalPrice,
            preferenceId: infoJson.preference_id,
            userId: user.id            
        }
        console.log("ID DEL USER ENVIADO!!!", dataOrder)
        

        const sendDataToServer = async () => {
            try {              
               const response = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/orders/`, dataOrder); //success o pending
               const responseII = await axios.post(`${VITE_VERCEL_API_URL_BASE}/api/payment/webhook/`, dataOrder) //envio de email
                setOrederCreate(true)
                console.log("La RESPONSE ENVIO" ,response)
                console.log("La RESPONSEII ENVIO" ,responseII)
           
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
        <div>
            <h1>
                PAGO SUCCES PAGAMENT EXITOSO!!! GROSO
            </h1>
        </div>
    )
}

export default  SuccessPayment;