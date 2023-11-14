

import {Link} from "react-router-dom"
import imagePaths from "../AppBar/imagePaths";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const OrderCard = ({paymentId, status,total,paymentMethod, product}) => {

    console.log(product);
         const dispatch = useDispatch();


  return (
    <div className="inline-flex flex-col gap-[8px] relative">
        {/* <div className="w-[160px] h-[160px] relative bg-violet-50 rounded-3xl items-start"> */}
        <div className="relative bg-blue-100 rounded-3xl flex justify-center items-center">
          
          
        
        <img 
              alt="Home"
              className="w-8 h-8 opacity-80 absolute top-1 right-1"
              />
        </div>
      

      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
        {status}</div>
      </div>
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-left text-stone-900 text-sm font-semibold font-jakarta-sans leading-[21px] tracking-normal">
        {status}</div>
      </div>

      <div className="w-full justify-around items-center">
        <div className="justify-between flex text-blue-600 text-lg font-semibold font-jakarta-sans leading-[28px] tracking-normal text-[20px]">
        $ {paymentId}
        

        </div>

      </div>

      
    </div>
  );
};

export default OrderCard;
