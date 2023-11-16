
import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logoproduct from "../../utils/images/Logo/logoproduct.png"


const OrderCard = ({paymentId, status,total,paymentMethod, products}) => {

    console.log("product en order card", products);
    const dispatch = useDispatch();
    
         return (
           <Link to={{
            pathname: `/order/detail/${paymentId}`, // Utiliza una ruta única para cada detalle de pedido
            state: { products } // Pasa los productos como parte del estado de la ubicación
          }}>
    <div className="bg-white rounded-lg p-4 pl-1 ml-4 mr-4 mb-4 shadow-xl flex items-center">
x
      <img
          src={logoproduct}
          className="w-[92px] h-[74px] rounded-full border-4 border-white object-cover mr-2"
      />
      <div className="mb-2 mr-4">
        <strong>Status:</strong> {status}
      </div>
      <div className="mb-2 mr-3">
        <strong>Total:</strong> ${total}
      </div>
      <div className="mb-2 text-[14px]">
        <strong>Payment Method:</strong> {paymentMethod}
      </div>


    </div>
    </Link> 
  );
};

export default OrderCard;
