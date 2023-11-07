import React from "react";
import queryString from "query-string";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SuccessPayment  =  ()=>{
    
    const cart = useSelector((state) => state.cart); 
    const currentUser = useSelector((state) => state.user);
    console.log("carrito en succespayment",cart);
    console.log("usuario en cart",currentUser);
   
    useEffect(() => {
        const params = queryString.parse(window.location.search);
        console.log(params)
        const infoJson = JSON.parse(params.data); // Convertir a JSON si es necesario
        console.log("Datos de la URL:", infoJson);

        const dataOrder ={
            payment_id: infoJson.payment_id,
            //email: currentUser.email,
            products: ["SUPER mEGA AGUANTE"],
            status: infoJson.status,
            total: 889,
            preferenceId: infoJson.preferenceId
        }

        const sendDataToServer = async () => {
            try {
                // Envia los datos a tu backend para procesarlos
                await axios.post("http://localhost:3001/api/orders/", dataOrder);
                console.log("Datos enviados al servidor",dataOrder);
            } catch (error) {
                console.log("Error al enviar datos al servidor:", error);
            }
        };

        sendDataToServer(); 
    }, []);
    
    return (
        <div>
            <h1>
                PAGO SUCCES PAGAMENT EXITOSO!!! GROSO
            </h1>
        </div>
    )
}

export default  SuccessPayment;