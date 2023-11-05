// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setQuantity, removeItem } from "../redux/slices/cartSlice";
// import { toast } from "react-hot-toast";
// import { initMercadoPago   } from "@mercadopago/sdk-react";
// import {createPayment} from "../components/Cart/CreatePayment"

// const publicKey = 'TEST-dc97b69f-7789-424f-8254-81f321f3d7ab';

// const Cart = (product) => {
  

//   const cart = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
  
//   const handleAddOne = (id) => {
//       dispatch(setQuantity({ id, act: "+" }));
//       toast.success("Added item successfully ");
//     };
  
//     const handleRemoveOne = (id) => {
//       dispatch(setQuantity({ id, act: "-" }));
//       toast.success("item removed successfully ");
//     };
  
//     const handleRemoveItem = (id) => {
//       dispatch(removeItem(id));
//       toast.success("item removed successfully ");
//     };
//     manejador del pago 
//     const handleCheckout = async () => {
//       const items = cart.items.map((item) => ({
//         id: item.id,
//         title: item.name,
//         description: item.description.slice(0, 240) + "...",
//         picture_url: item.image[0],
//         quantity: item.quantity,
//         unit_price: item.price,
//       });
  
//       const amount = cart.totalPrice;
  
//       const preference = {
//         items,
//         userId: user.id,
//         transaction_amount: amount,
//         back_urls: {
//           success: 'http://localhost:3000/success',
//           failure: 'http://localhost:3000/failure',
//           pending: 'http://localhost:3000/pending',
//         },
//       };
//       try {
//         const paymentData = await createPayment(preference, publicKey);
//         window.location.href = paymentData.init_point; // Redirige a la URL de Mercado Pago para el pago
//       } catch (error) {
//         console.error('Error en el proceso de pago:', error);

//       }

//     }
// funcion de crear pago 
  
//     return (

      

//         <body>
//         <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
//           <h1>MY SHOPPING CART</h1>
//           {cart.items.map((item) => (
//             <div class="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
//                 <img  src={item.image} alt={item.name}  />
//                 <h2>{item.name}</h2>
//                 <p>{item.size}</p>
//                 <div >
//                   <button onClick={() => handleAddOne(item.id)}>+</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => handleRemoveOne(item.id)}>-</button>
//                   <p>${item.price} </p>
          
//                     <svg onClick={() => handleRemoveItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
//               </svg>
//            </div>
          
//         </div>
//       ))}
//         <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">     
//               <hr class="my-4" />
//               <div class="flex justify-between">
//                 <p class="text-lg font-bold">Total</p>
//                 <div class="">
//                   <p class="mb-1 text-lg font-bold">${cart.totalPrice} </p>
//                   <button onClick={handleCheckout}
//                   class="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-black-600"
//                   >Check out with mercado pago</button>
//                 </div>
//               </div>
             
//            </div>
//          </div>
       
//       </body>
//     )
// }

// export default  Cart


import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuantity, removeItem } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
//import CreatePayment  from "../components/Cart/CreatePayment"

const publicKey = 'TEST-dc97b69f-7789-424f-8254-81f321f3d7ab'; 


const Cart = () => {
  const cart = useSelector((state) => state.cart); // Selecciona el carrito desde Redux
  const user = 1;
  const [preferenceData, setPreferenceData] = useState(null);

  console.log("user en front ",user);
  console.log("cart en front", cart);

  const dispatch = useDispatch();

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

   try {
    console.log("este es el cart ", cart)
    const { data } = await axios.post("http://localhost:3001/api/payment/create-order", { cart: cart.items, email: "userdeprueba@gmail" });

    console.log(data)
    location.href = data.result;
    
   } catch (error) {
    console.log(error.message)
   }
    };


    // try {
    //   const paymentData = await CreatePayment(preference, publicKey);
    //   window.location.href = paymentData.init_point; // Redirige a la URL de Mercado Pago para el pago
    // } catch (error) {
    //   console.error('Error en el proceso de pago:', error);
    // }
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Aquí generas la preferencia en el front (simulando un carrito de compras, por ejemplo)
  //       const preference = {
  //         items: [
  //           {
  //             id: '1',
  //             title: 'Producto 1',
  //             description: 'Descripción del producto 1',
  //             quantity: 1,
  //             unit_price: 1000,
  //           },
  //           {
  //             id: '2',
  //             title: 'Producto 2',
  //             description: 'Descripción del producto 2',
  //             quantity: 1,
  //             unit_price: 1500,
  //           },
  //         ],
  //         transaction_amount: 2500,
  //         userId: 'ID_DEL_USUARIO', // Reemplaza con el ID del usuario real
  //       };

  //       // Llamas a la función CreatePayment para obtener la preferencia desde el backend
  //       //const preferenceResponse = await CreatePayment(preference);

  //       //setPreferenceData(preferenceResponse); // Actualiza el estado con la preferencia generada
  //     } catch (error) {
  //       console.error('Error al obtener la preferencia de pago:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>MY SHOPPING CART</h1>
      {cart.items.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>{item.size}</p>
          <div>
            <button onClick={() => handleAddOne(item.id)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleRemoveOne(item.id)}>-</button>
            <p>${item.price}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div>
        <p>Total: ${cart.totalPrice}</p>
        <h1>Preferencia de Pago:</h1>
        <button onClick={handleCheckout}>Checkout with Mercado Pago</button>
      </div>
    </div>
  );
};

export default Cart;


