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

 // const orderRaiting = useSelector((state) => state.orderR.orderId);
  const { id } = useParams();
  console.log(typeof id)
  // console.log(orderRaiting, "orderRaiting")
  // const productosRaiting = orderRaiting.filter(o => o.paymentId !== id)
  // console.log(productosRaiting, "productosRaiting")
  const orderR = useSelector((state) => state.orderR.orderId);
  const order = orderR.find((o) => o.paymentId === Number(id));
  const products = order ? order.products : [];


  const [value, setValue] = React.useState(0);

  const [raitingBack, setRaitingBack] = useState({
    rating: 0,
  })
  console.log(raitingBack, "raitin objeto para mandar al put")
  console.log(value, "raitin estrellas")
  const handlerraitingBack = (e) =>{
    console.log(e, "a dormiiiiiitr")
    setRaitingBack({rating: e})
  }

  const handlerSubmmitRating = async (idProduct) =>{
    console.log(idProduct, "producto id en el puttttttt")
    await axios.put(`${VITE_VERCEL_API_URL_BASE}/api/products/rating/${idProduct}`, raitingBack)
    //dispatch(updateRating())
    toast.success("Your rating has been successfully updated!");
    
  }
  useEffect(() => {
    const { state } = location;
    
    
    if (state && state.products) {
      // Aquí deberías tener acceso a los productos relacionados
      //console.log("Productos en DetailOrder:", state.products);
      // Puedes realizar más acciones, como cargar detalles adicionales si es necesario
    }

   // dispatch(fetchProductById(id));
  }, [dispatch, id, location]);

  //const order = useSelector((state) => state.orderR);
  //console.log(raitingBack, "vamoooossss")
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

          {/* <div className="flex items-center mb-2">
            <input
              type="number"
              value={raitingBack.rating}
              onChange={handlerraitingBack}
              className="mr-2 p-2 border border-gray-300"
              min="1"
              max="5"
            /> */}
            <div className="flex items-center mb-2">
              {/* Utiliza el componente SimpleRating */}
              <StarRating totalStars={5} value={value} setValue={setValue} handlerraitingBack={handlerraitingBack} />
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setRaitingBack({rating:newValue})
          }}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        />
      </Box> */}
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
