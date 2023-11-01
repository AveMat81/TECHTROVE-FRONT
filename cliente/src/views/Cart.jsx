import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setQuantity, removeItem } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";


const Cart = (product) => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    const handleAddOne = (id) => {
      dispatch(setQuantity({ id, act: "+" }));
      toast.success("Added item successfully ");
    };
  
    const handleRemoveOne = (id) => {
      dispatch(setQuantity({ id, act: "-" }));
      toast.success("item removed successfully ");
    };
  
    const handleRemoveItem = (id) => {
      dispatch(removeItem(id));
      toast.success("item removed successfully ");
    };
    return (

        <body>
             <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md">
    <h1>MY SHOPPING CART</h1>
    {cart.items.map((item) => (
      <div class="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start items-center">
          <img  src={item.image} alt={item.name}  />
          <h2>{item.name}</h2>
          <p>{item.size}</p>
          <div >
            <button onClick={() => handleAddOne(item.id)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleRemoveOne(item.id)}>-</button>
            <p>${item.price} </p>
          
          <svg onClick={() => handleRemoveItem(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
          </div>
          
        </div>
      ))}
      
                   <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
             
              <hr class="my-4" />
              <div class="flex justify-between">
                <p class="text-lg font-bold">Total</p>
                <div class="">
                  <p class="mb-1 text-lg font-bold">${cart.totalPrice} </p>
                  <button class="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-black-600">Check out</button>
                </div>
              </div>
             
            </div>
              </div>
       
      </body>
    )
}

export default  Cart
