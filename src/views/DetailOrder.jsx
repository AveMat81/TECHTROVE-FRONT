import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import fetchProductById from "../redux/actions/fetchProductById";
import { updateRating } from "../redux/actions/getProducts";
import { useParams, useLocation } from "react-router-dom";
//import SimpleRating from "../components/SimpleRating";
import StarRating from "../components/StarRating"
const VITE_VERCEL_API_URL_BASE = import.meta.env.VITE_VERCEL_API_URL_BASE 

import axios from "axios";

const DetailOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { id } = useParams();
  const orderR = useSelector((state) => state.orderR.orderId);
  const order = orderR.find((o) => o.paymentId === Number(id));
  const products = order ? order.products : [];


  const [value, setValue] = React.useState(0);

  const [raitingBack, setRaitingBack] = useState({
    rating: 0,
  })

  const handlerraitingBack = (e) =>{
    console.log(e, "a dormiiiiiitr")
    setRaitingBack({rating: e})
  }

  const handlerSubmmitRating = async (idProduct) =>{
    await axios.put(`${VITE_VERCEL_API_URL_BASE}/api/products/rating/${idProduct}`, raitingBack)
    toast.success("Your rating has been successfully updated!");
    
  }
  useEffect(() => {
    const { state } = location;
    
    
    if (state && state.products) {
      
    }

  }, [dispatch, id, location]);

  return (
    <div className="my-4">
      <h2 className="text-lg font-bold mb-2">Calificaciones de productos</h2>
      {order && order.products && order.products.map((product) => (
        <div key={product.productId} className="mb-4">
          <p className="font-semibold">{product.name}</p>
            <div className="bg-blue-400 rounded-t-lg p-2 flex flex-col items-center ">
          <img
            src={product.image}
            className="w-36 h-36 rounded-full border-4 border-white object-cover mt-2 mb-0"
          />

            <div className="flex items-center mb-2">
              {/* Utiliza el componente SimpleRating */}
              <StarRating totalStars={5} value={value} setValue={setValue} handlerraitingBack={handlerraitingBack} />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={() => handlerSubmmitRating(product.id)}
            >
              Update Rating
            </button>
          </div>
        </div>
        </div>

      ))}
    </div>
  );
};

export default DetailOrder;
